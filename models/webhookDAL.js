'use strict'

const Webhook = require('./mongoose-models/Webhook')
const authDAL = require('./authDAL')
const sanitize = require('mongo-sanitize')
const customError = require('./customError')

/**
 * @param {Object} rawRequest raw router request
 * @throws {customError.ForbiddenError} if auth is incorrect
 * @returns promise object with message data, properties:
 * _id, webhook_url, userID, username
 */
const saveWebhook = rawRequest =>
  new Promise(async (resolve, reject) => {
    try {
      const req = sanitize(rawRequest)

      const auth = await authDAL.getAuthData(req)

      const webhook = new Webhook({
        webhook_url: req.body.webhook_url,
        userID: auth.id,
        username: auth.username
      })
      await webhook.save()
      resolve(webhook)
    } catch (error) {
      return reject(new customError.ForbiddenError())
    }
  })

/**
 * Gets objects with data about webhooks created by user
 * @param {Object} rawRequest raw router request
 * @throws {customError.ForbiddenError} if auth is incorrect
 * @throws {customError.NotFoundError}
 */
const getAllWebhooksByUser = rawRequest =>
  new Promise(async (resolve, reject) => {
    try {
      const req = sanitize(rawRequest)

      const auth = await authDAL.getAuthData(req)

      Webhook.find({ username: auth.username }, (err, hooks) => {
        if (err) return reject(new customError.NotFoundError())
        resolve(hooks)
      })
    } catch (error) {
      return reject(new customError.ForbiddenError())
    }
  })

const getAllWebhookObjectsPromise = () => Webhook.find({}).exec()

module.exports = {
  saveWebhook,
  getAllWebhooksByUser,
  getAllWebhookObjectsPromise
}
