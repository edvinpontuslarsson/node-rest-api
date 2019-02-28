'use strict'

const createMessageView = require('./v_createMessage')

/**
 * @param {String} hostname
 * @returns JSON with links & instructions
 */
const getSignInView = hostname =>
  JSON.stringify(
    {
      rel: sign_in,
      href: `${hostname}/${sign_in}`,
      actions: [
        { method: get },
        {
          method: post,
          fields: [
            { name: username, type: string },
            { name: password, type: string }
          ]
        }
      ]
    }
  )

const getSignInSuccesRes = (hostname, token) =>
  JSON.stringify(
    {
      info: `You are now logged in!`,
      access_token: token,
      links: [
        JSON.parse(
          createMessageView.getCreateMessageView(hostname)
        )
      ]
    }
  )

/**
 * @param {String} hostname
 * @param {Error} err
 * @returns JSON with links & instructions
 */
const getSignInFailRes = (hostname, err) => {

}

const get = 'GET'
const post = 'POST'
const string = 'string'

const sign_in = 'sign_in'

const username = 'username'
const password = 'password'

module.exports = {
  getSignInView,
  getSignInSuccesRes,
  getSignInFailRes
}
