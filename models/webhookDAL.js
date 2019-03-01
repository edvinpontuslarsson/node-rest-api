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
 * @returns promise with webhook data object
 */
const getWebhookData = rawWebhookID => {
  const webhookID = sanitize(rawWebhookID)

  // TODO: complete this
}

const getAllWebhookObjectsPromise = () =>
  Webhook.find({}).exec()

module.exports = {
  saveWebhook,
  getWebhookData,
  getAllWebhookObjectsPromise
}
