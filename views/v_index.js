'use strict'

const signUpView = require('./v_signUp')
const signInView = require('./v_signIn')
const createMessageView = require('./v_createMessage')

/**
 * @param {String} hostname
 * @returns JSON with links & instructions
 */
const getIndexView = hostname =>
  JSON.stringify(
    {
      info: 'Welcome to the MessageBoard API!',
      links: [
        // objects with links & instructions
        JSON.parse(signUpView.getSignUpView(hostname)),
        JSON.parse(signInView.getSignInView(hostname)),
        JSON.parse(createMessageView.getCreateMessageView(hostname))
      ]
    }
  )

module.exports = { getIndexView }
