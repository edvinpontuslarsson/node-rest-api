'use strict'

const User = require('./User')
const customError = require('./customError')
const sanitize = require('mongo-sanitize')
const jwt = require('jsonwebtoken')
require('dotenv').config()

/**
 * @returns {Promise} auth token
 */
const loginUser = (rawUsername, rawPassword) =>
  new Promise(resolve => {
    const username = sanitize(rawUsername)
    const password = sanitize(rawPassword)

    User.findOne({ username }, (err, user) => {
      if (err) throw new customError.InternalServerError()
      if (!user) throw new customError.WrongUsernameOrPasswordError()

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
 * @param {*} cleanReq sanitized request
 */
const isLoggedIn = cleanReq => 
  new Promise(resolve => {
    if (!cleanReq.headers['authorization']) {
      return false
    }
    const token = getExtractedToken(
      cleanReq.headers['authorization']
    )
    // use getAuthData
  })

const isRightUser = (token, username) => {
  
}

const logOutUser = () => {

}

/**
 * @param {String} authHeader ['authorization']
 */
const getExtractedToken = authHeader => 
  authHeader.split(' ')[1]

/**
 * @returns null if token is incorrect
 */
const getAuthData = token =>
  new Promise(resolve => {
    jwt.verify(
      token, 
      process.env.JWT_SECRET, 
      (err, authData) => {
        if (err) resolve(null)
        resolve(authData)
      }
    )
  })

module.exports = {
  loginUser,
  isLoggedIn,
  isRightUser,
  logOutUser
}
