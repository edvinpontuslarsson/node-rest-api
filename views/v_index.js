'use strict'

const signUpView = require('./v_signUp')
const signInView = require('./v_signIn')
const createMessageView = require('./v_createMessage')

/**
 * @param {String} hostname
 * @returns JSON with links & instructions
 */
const getIndexView = hostname => {
  return {
    info: 'Welcome to the MessageBoard API!',
    links: [
      // objects with links & instructions
      signUpView.getSignUpView(hostname),
      signInView.getSignInView(hostname),
      createMessageView.getCreateMessageView(hostname)
    ]
  }
}

module.exports = { getIndexView }
