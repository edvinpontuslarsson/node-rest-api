'use strict'

const signUpView = require('./v_signUp')
const signInView = require('./v_signIn')
const createMessageView = require('./v_createMessage')
const registerWebhooksView = require('./webhook/v_registerWebhook')

const getIndexView = hostname => {
  return {
    info: 'Welcome to the MessageBoard API!',
    links: [
      // objects with links & instructions
      signUpView.getSignUpView(hostname),
      signInView.getSignInView(hostname),
      createMessageView.getCreateMessageView(hostname),
      registerWebhooksView.getRegisterWebhookView(hostname)
    ]
  }
}

module.exports = { getIndexView }
