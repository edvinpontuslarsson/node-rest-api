'use strict'

const signUpView = require('../user/v_signUp')
const signInView = require('../user/v_signIn')
const createMessageView = require('../message/v_createMessage')
const registerWebhooksView = require('../webhook/v_registerWebhook')

const getIndexView = hostname => {
  return {
    info: 'Welcome to the MessageBoard API!',
    links: [
      {
        rel: `${listMessages}`,
        href: `${hostname}/${listMessages}`,
        actions: [
          { method: 'GET' }
        ]
      },
      // objects with links & instructions
      signUpView.getSignUpView(hostname),
      signInView.getSignInView(hostname),
      createMessageView.getCreateMessageView(hostname),
      registerWebhooksView.getRegisterWebhookView(hostname),
      {
        rel: `${listWebhooks}`,
        href: `${hostname}/${listWebhooks}`,
        actions: [
          {
            method: 'GET',
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
    ]
  }
}

const listMessages = 'list-messages'
const listWebhooks = 'list-webhooks'
const string = 'string'

module.exports = { getIndexView }
