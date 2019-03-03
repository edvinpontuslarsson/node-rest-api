'use strict'

const Message = require('./mongoose-models/Message')
const authDAL = require('./authDAL')
const sanitize = require('mongo-sanitize')
const customError = require('./customError')

/**
 * @param {Object} rawRequest - raw router request
 * @returns promise object with message data, properties:
 * _id, title, message, userID, username
 * @throws {customError.ForbiddenError} if auth is incorrect
 */
const storeMessage = rawRequest =>
  new Promise(async (resolve, reject) => {
    try {
      const req = sanitize(rawRequest)
      
      if (!req.body.title || !req.body.message) {
        return reject(new customError.BadRequestError())
      }

      // rejects ForbiddenError if auth is incorrect
      const auth = await authDAL.getAuthData(req)

      const message = new Message({
        title: req.body.title,
        message: req.body.message,
        userID: auth.id,
        username: auth.username
      })
      await message.save()
      resolve(message)
    } catch (error) {
      return reject(error)
    }
  })

/**
 * @returns promise with message data object
 * @throws {customError.NotFoundError}
 */
const getMessageData = rawMessageID => 
  new Promise((resolve, reject) => {
    const messageID = sanitize(rawMessageID)
    try {
      Message.findById(messageID, (err, msg) => {
        if (err) {
          return reject(new customError.NotFoundError())
        }
        resolve(msg)
      })
    } catch (error) {
      return reject(new customError.NotFoundError())
    }
  })

/**
 * @param {Object} rawRequest - raw router request
 * @returns {Object} edited message, as promise
 * @throws {customError.ForbiddenError} if auth is incorrect
 * @throws {customError.NotFoundError}
 * @throws {customError.InternalServerError}
 */
const editMessage = rawRequest =>
  new Promise(async (resolve, reject) => {
    try {
      const req = sanitize(rawRequest)

      const messageData = await getMessageData(
        req.params.id
      )
      
      // rejects ForbiddenError if auth is incorrect
      const auth = await authDAL.getAuthData(req)

      if (messageData.userID !== auth.id) {
        return reject(new customError.ForbiddenError())
      }

      // present messageData if undefined in req
      const newData = {
        title: req.body.title || messageData.title,
        message: req.body.message || messageData.message
      }

      Message.findByIdAndUpdate(
        req.params.id,
        newData,
        { new: true },
        (err, editedMsg) => {
          if (err) {
            return reject(new customError.InternalServerError())
          }

          resolve(editedMsg)
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
const deleteMessage = rawRequest =>
  new Promise(async (resolve, reject) => {
    try {
      const req = sanitize(rawRequest)

      const messageData = await getMessageData(
        req.params.id
      )


      const auth = await authDAL.getAuthData(req)

      if (messageData.userID !== auth.id) {
        return reject(new customError.ForbiddenError())
      }

      await Message.findOneAndRemove({ _id: req.params.id })
      resolve()
    } catch (error) {
      console.log(error)
      if (error instanceof customError.NotFoundError) {
        return reject(new customError.NotFoundError())
      }
      if (error instanceof customError.ForbiddenError) {
        return reject(new customError.ForbiddenError())
      }
    }
  })

/**
 * @returns {Array} promise array with
 * objects with properties:
 * _id, title, message, userID, username
 */
const getAllMessages = () =>
  Message.find({}).sort({ createdAt: 'descending' }).exec()

module.exports = {
  storeMessage,
  getMessageData,
  getAllMessages,
  editMessage,
  deleteMessage
}
