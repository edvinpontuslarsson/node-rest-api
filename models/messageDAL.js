'use strict'

const Message = require('./Message')
const authDAL = require('./authDAL')
const sanitize = require('mongo-sanitize')
const customError = require('./customError')

/**
 * @param {Object} rawRequest raw router request
 * @throws {customError.ForbiddenError} if auth is incorrect
 * @returns promise object with message data, properties:
 * _id, title, message, userID, username
 */
const storeMessage = rawRequest =>
  new Promise(async (resolve, reject) => {
    try {
      const req = sanitize(rawRequest)

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
      return reject(new customError.ForbiddenError())
    }
  })

/**
 * @returns promise with message data object
 */
const getMessageData = rawMessageID => {
  const messageID = sanitize(rawMessageID)

  Message.findById // TODO: complete this
}

module.exports = {
  storeMessage,
  getMessageData
}
