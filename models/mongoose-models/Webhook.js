'use strict'

const mongoose = require('mongoose')

const webhookSchema = mongoose.Schema(
  {
    webhook_url: { type: String, required: true },
    userID: { type: String, required: true },
    username: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now }
  }
)

const Webhook = mongoose.model('Webhook', webhookSchema)

module.exports = Webhook
