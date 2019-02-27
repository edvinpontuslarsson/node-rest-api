'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const customError = require('./customError')

const messageSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        message: { type: String, required: true },
        userID: { type: String, required: true },
        username: { type: String, required: true },
        createdAt: { type: Date, required: true, default: Date.now }
    }
)

const Message = mongoose.model('Message', messageSchema)

module.exports = Message
