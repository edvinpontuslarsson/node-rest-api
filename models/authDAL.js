'use strict'

const User = require('./User')
const customError = require('./customError')
const sanitize = require('mongo-sanitize')
const jwt = require('jsonwebtoken')
require('dotenv').config()

/**
 * @returns {Promise} auth token
 */
const loginUser = (rawUsername, rawPpassword) =>
  new Promise(resolve => {
    const username = sanitize(rawUsername)
    const password = sanitize(rawPpassword)

    User.findOne({ username }, (err, user) => {
      if (err) throw new customError.InternalServerError()
      if (!user) throw new customError.WrongUsernameOrPasswordError()

      user.validatePassword(password, (err, isCorrect) => {
        if (err) throw new customError.InternalServerError()
        if (!isCorrect) throw new customError.WrongUsernameOrPasswordError()

        const payload = { username: user.username }     
        const token = jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            { expiresIn: '10h' }
        )

        resolve(token)
      })
    })
  })

const isLoggedIn = token => {

}

const isRightUser = (token, username) => {

}

const logOutUser = () => {

}

module.exports = {
  loginUser,
  isLoggedIn,
  isRightUser,
  logOutUser
}
