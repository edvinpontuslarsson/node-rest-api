'use strict'

const User = require('./User')
const customError = require('./customError')
const sanitize = require('mongo-sanitize')
const jwt = require('jsonwebtoken')
require('dotenv').config()

/**
 * @returns {Promise} auth token
 */
const authUser = (rawUsername, rawPassword) =>
  new Promise((resolve, reject) => {
    const username = sanitize(rawUsername)
    const password = sanitize(rawPassword)
    
    User.findOne({ username }, (err, user) => {
      if (err) throw new customError.InternalServerError()
      if (!user) return reject('forbidden')

      user.validatePassword(password, (err, isCorrect) => {
        if (err) throw new customError.InternalServerError()
        if (!isCorrect) throw new customError.WrongUsernameOrPasswordError()

        const payload = {
          id: user._id,
          username: user.username
        }
        const token = jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: '10h' }
        )

        resolve(token)
      })
    })
  })

/**
 * @param cleanReq sanitized router request
 * @throws {customError.ForbiddenError} if auth is incorrect
 * @returns promise object with string properties id & username
 */
const getAuthData = cleanReq =>
  new Promise(resolve => {
    if (!cleanReq.headers['authorization']) { throw new customError.ForbiddenError() }

    const token = getExtractedToken(
      cleanReq.headers['authorization']
    )

    jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
      if (err) throw new customError.ForbiddenError()
      resolve(authData)
    }
    )
  })

/**
 * @param {String} authHeader ['authorization']
 */
const getExtractedToken = authHeader =>
  authHeader.split(' ')[1]

module.exports = {
  authUser,
  getAuthData
}
