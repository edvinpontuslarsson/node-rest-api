'use strict'

/**
 * @param {Object} messageData message object
 */
const getMessageView = (hostname, messageData) => {
  return {
    rel: `message/${messageData._id}`,
    href: `${hostname}/message/${messageData._id}`,
    title: messageData.title,
    message: messageData.message,
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
            name: 'title',
            type: string,
            required: false,
            info: 'Remains unedited if field is omitted'
          },
          {
            name: 'message',
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

module.exports = {
  getMessageView
}
