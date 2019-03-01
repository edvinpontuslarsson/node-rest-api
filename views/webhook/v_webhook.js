'use strict'

/**
 * @param {Object} webhookData webhook object
 */
const getWebhookView = (hostname, webhookData) => {
  return {
    rel: `${webhook}/${webhookData._id}`,
    href: `${hostname}/${webhook}/${webhookData._id}`,
    webhhok_url: webhookData.webhhok_url,
    actions: [
      { method: get },
      {
        method: patch,
        headers: [
          {
            name: 'Authorization',
            type: string,
            format: 'Bearer <access_token>'
          }
        ],
        fields: [
          {
            name: 'webhook_url',
            type: string,
            required: false,
            info: 'Remains unedited if field is omitted'
          }
        ]
      },
      {
        method: httpDelete,
        headers: [
          {
            name: 'Authorization',
            type: string,
            format: 'Bearer <access_token>'
          }
        ]
      }
    ]
  }
}

const get = 'GET'
const patch = 'PATCH'
const httpDelete = 'DELETE'
const string = 'string'

const webhook = 'webhook'

module.exports = {
  getWebhookView
}
