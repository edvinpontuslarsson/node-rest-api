'use strict'

const messageView = require('./v_message')

const getCreateMessageView = hostname => {
  return {
    rel: createMessage,
    href: `${hostname}/${createMessage}`,
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
          { name: 'title', type: string, required: true },
          { name: 'message', type: string, required: true }
        ]
      }
    ]
  }
}

/**
 * @param {Object} messageData message object
 */
const getCreatedMessageRes = (hostname, messageData) => {
  return {
    info: `Message with id: ${messageData._id} stored successfully`,
    message_id: messageData._id,
    links: [
      messageView.getMessageView(hostname, messageData)
    ]
  }
}

const get = 'GET'
const post = 'POST'
const string = 'string'

const createMessage = 'create-message'

module.exports = {
  getCreateMessageView,
  getCreatedMessageRes
}
