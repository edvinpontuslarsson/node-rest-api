'use strict'

const Message = require('./Message')
const authDAL = require('./authDAL')
const sanitize = require('mongo-sanitize')

/**
 * @param {*} rawRequest raw router request
 * @throws {customError.ForbiddenError} if auth is incorrect
 * @returns {String} promise with message id
 */
const storeMessage = rawRequest =>
  new Promise(async resolve => {
    const req = sanitize(rawRequest)

    // throws error if auth is incorrect
    const auth = await authDAL.getAuthData(req)

    const message = new Message({
      title: req.body.title,
      message: req.body.message,
      userID: auth.id,
      username: auth.username
    })
    await message.save()
    resolve(message._id)
  })

module.exports = {
  storeMessage
}
