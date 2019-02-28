'use strict'

const User = require('./User')
const customError = require('./customError')
const sanitize = require('mongo-sanitize')

/**
 * Promise, sanitizes input
 * @param {String} rawUsername
 * @param {String} rawPassword
 * @param {String} rawRepeatPass
 * @throws {}
 * @returns {Promise} username
 */
const storeNewUser = (rawUsername, rawPassword, rawRepeatPass) =>
  new Promise(async resolve => {
    const username = sanitize(rawUsername)
    const password = sanitize(rawPassword)
    const repeatpass = sanitize(rawRepeatPass)

    // throws error if not OK
    await validateRegistration(username, password, repeatpass)

    const user = new User({username, password})
    await user.save()
    resolve(username)
  })

/**
 * @returns {Promise} empty resolve promise
 */
const validateRegistration = (username, password, repeatpass) =>
  new Promise(async (resolve, reject) => {
    if (username.length < 3) { return reject(new customError.UsernameTooShortError()) }
    if (username.length > 30) { return reject(new customError.UsernameTooLongError()) }
    if (password.length < 5) { return reject(new customError.PasswordTooShortError()) }
    if (password !== repeatpass) { return reject(new customError.PasswordsDoNotMatchError()) }

    const isUsernameTaken = await User.findOne(
      { username },
      err => { if (err) return reject(new customError.InternalServerError()) }
    )

    if (isUsernameTaken !== null) { return reject(new customError.OccupiedUsernameError()) }

    resolve()
  })

module.exports = { storeNewUser }
