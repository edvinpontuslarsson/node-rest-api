'use strict'

const webhookDAL = require('../models/webhookDAL')
const fetch = require('node-fetch')
const validURL = require('valid-url')

/**
 * @param {Object} messageData
 */
const notifyNewMessage = async messageData => {
  const webhookObjects =
        await webhookDAL.getAllWebhookObjectsPromise()

  const publicMessageInfo = {
    title: messageData.title,
    message: messageData.message,
    username: messageData.username,
    createdAt: messageData.createdAt
  }

  webhookObjects.forEach(async hookObj => {
    if (validURL.isUri(hookObj.webhook_url)) {
      await fetch(hookObj.webhook_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(publicMessageInfo)
      })
        .catch(err => console.error(err))
    }
  })
}

module.exports = {
  notifyNewMessage
}
