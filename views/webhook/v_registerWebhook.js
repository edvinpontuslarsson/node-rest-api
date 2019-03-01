'use strict'

const webhookView = require('./v_webhook')

const getRegisterWebhookView = hostname => {
  return {
    rel: registerWebhook,
    href: `${hostname}/${registerWebhook}`,
    actions: [
      { method: get },
      {
        method: post,
        headers: [
          {
            name: 'Authorization',
            type: string,
            format: 'Bearer <access_token>'
          }
        ],
        fields: [
          { name: 'webhook_url', type: string, required: true }
        ]
      }
    ]
  }
}

/**
 * @param {Object} webhookData webhook object
 */
const getSuccessNewWebhookView = (hostname, webhookData) => {
  return {
    info: `Webhook with id: ${webhookData._id} registered successfully`,
    webhook_id: webhookData._id,
    links: [
      webhookView.getWebhookView(hostname, webhookData)
    ]
  }
}

const get = 'GET'
const post = 'POST'
const string = 'string'

const registerWebhook = 'register-webhook'

module.exports = {
  getRegisterWebhookView,
  getSuccessNewWebhookView
}
