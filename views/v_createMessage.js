'use strict'

const messageView = require('./v_message')

/**
 * @param {String} hostname
 * @returns JSON with links & instructions
 */
const getCreateMessageView = hostname =>
  JSON.stringify(
    {
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
  )

  // TODO: include obj to individual message

const getCreatedMessageRes = (hostname, messageID) =>
  JSON.stringify(
    {
      info: `Message with id: ${messageID} stored successfully`,
      links: [
        JSON.parse(
          messageView.getMessageView(hostname, messageID)
        )
      ]
    }
  )

const get = 'GET'
const post = 'POST'
const string = 'string'

const createMessage = 'create-message'

module.exports = {
  getCreateMessageView,
  getCreatedMessageRes
}
