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

/**
 * @param {Object} rawRequest - raw router request
 * @returns {Object} edited webhook, as promise
 * @throws {customError.ForbiddenError} if auth is incorrect
 * @throws {customError.NotFoundError}
 * @throws {customError.InternalServerError}
 */
const editWebhook = rawRequest =>
  new Promise(async (resolve, reject) => {
    try {
      const req = sanitize(rawRequest)

      // rejects error if auth is incorrect
      const webhookData = await getWebhookData(rawRequest)
      
      // present data if undefined in req
      const newData = {
        webhook_url: req.body.webhook_url || webhookData.webhook_url
      }

      Webhook.findByIdAndUpdate(
        req.params.id,
        newData,
        { new: true },
        (err, editedWebhook) => {
          if (err) return reject(new customError.InternalServerError())
          resolve(editedWebhook)
        }
      )      
    } catch (error) {
      if (error instanceof customError.NotFoundError) {
        return reject(new customError.NotFoundError())
      }
      if (error instanceof customError.ForbiddenError) {
        return reject(new customError.ForbiddenError())
      }
    }
  })

/**
 * @param {Object} rawRequest - raw router request
 * @returns empty promise
 * @throws {customError.ForbiddenError} if auth is incorrect
 * @throws {customError.NotFoundError}
 */
const deleteWebhook = rawRequest =>
  new Promise(async (resolve, reject) => {
    try {
      const req = sanitize(rawRequest)

      // rejects error if auth is incorrect
      await getWebhookData(rawRequest)

      await Webhook.findOneAndRemove({ _id: req.params.id })
      resolve()
    } catch (error) {
      if (error instanceof customError.NotFoundError) {
        return reject(new customError.NotFoundError())
      }
      if (error instanceof customError.ForbiddenError) {
        return reject(new customError.ForbiddenError())
      }
    }
  })

/**
 * @param {Object} rawRequest - raw router request
 * @returns {Object} webhook data, as promise
 * @throws {customError.ForbiddenError} if auth is incorrect
 * @throws {customError.NotFoundError}
 */
const getWebhookData = rawRequest =>
  new Promise((resolve, reject) => {
    try {
      const req = sanitize(rawRequest)

      Webhook.findById(req.params.id, async (err, hook) => {
        if (err) return reject(new customError.NotFoundError())

        const auth = await authDAL.getAuthData(req)

        if (hook.userID !== auth.id) {
          return reject(new customError.ForbiddenError())
        }

        resolve(hook)
      })
    } catch (error) {
        if (error instanceof customError.ForbiddenError) {
          return reject(new customError.ForbiddenError())
        }
    }
  })

const getAllWebhookObjectsPromise = () => Webhook.find({}).exec()

module.exports = {
  saveWebhook,
  getWebhookData,
  getAllWebhooksByUser,
  getAllWebhookObjectsPromise,
  editWebhook,
  deleteWebhook
}
