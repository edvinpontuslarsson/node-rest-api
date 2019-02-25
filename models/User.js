'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const customError = require('./customError')

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  }
)

/**
 * Salts and hashes password before storing in DB
 * Reuses some code from one of my earlier projects:
 * https://github.com/edvinpontuslarsson/youedvin/blob/master/models/User.js
 */
userSchema.pre('save', function (callback) {
  const user = this
  bcrypt.genSalt(10, function (err, salt) {
    if (err) throw new customError.InternalServerError()

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) throw new customError.InternalServerError()

      user.password = hash
      callback()
    })
  })
})

/**
 * Validates that password is correct,
 * Reuses some code from one of my earlier projects:
 * https://github.com/edvinpontuslarsson/youedvin/blob/master/models/User.js
 */
userSchema.methods.validatePassword =
    function (password, callback) {
      bcrypt.compare(
        password,
        this.password,
        function (err, isCorrect) {
          if (err) throw new customError.InternalServerError()

          callback(null, isCorrect)
        }
      )
    }

const User = mongoose.model('User', userSchema)

module.exports = User
