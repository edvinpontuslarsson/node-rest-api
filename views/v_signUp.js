'use strict'

const signInView = require('./v_signIn')

/**
 * @param {String} hostname
 * @returns JSON with links & instructions
 */
const getSignUpView = hostname => {
  return {
    rel: signUp,
    href: `${hostname}/${signUp}`,
    actions: [
      { method: get },
      {
        method: post,
        fields: [
          { name: username, type: string },
          { name: password, type: string },
          { name: repeat_password, type: string }
        ]
      }
    ]
  }
}

/**
 * @param {String} hostname
 * @returns JSON with links & instructions
 */
const getSignUpSuccesRes = (hostname, regUsername) => {
  return {
    info: `You are now a registered user, welcome aboard ${regUsername}!`,
    links: [
      signInView.getSignInView(hostname)
    ]
  }
}

const get = 'GET'
const post = 'POST'
const string = 'string'

const signUp = 'sign-up'

const username = 'username'
const password = 'password'
const repeat_password = 'repeat_password'

module.exports = {
  getSignUpView,
  getSignUpSuccesRes
}