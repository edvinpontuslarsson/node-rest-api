'use strict'

/**
 * @param {String} hostname
 * @returns JSON with links & instructions
 */
const getMessagesView = hostname =>
  JSON.stringify(
    {
      rel: messages,
      href: `${hostname}/${messages}`,
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
            { name: 'title', type: string },
            { name: 'message', type: string }
          ]
        }
      ]
    }
  )

const get = 'GET'
const post = 'POST'
const string = 'string'

const messages = 'messages'

module.exports = { getMessagesView }
