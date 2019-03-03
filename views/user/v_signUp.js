'use strict'

const signInView = require('./v_signIn')

const getSignUpView = hostname => {
  return {
    rel: signUp,
    href: `${hostname}/${signUp}`,
    actions: [
      { method: get },
      {
        method: post,
        fields: [
          {
            name: username,
            type: string,
            format: '3-30 characters long'
          },
          {
            name: password,
            type: string,
            format: 'at least 5 characters long'
          },
          {
            name: repeat_password,
            type: string,
            format: 'Identical to password'
          }
        ]
      }
    ]
  }
}

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
