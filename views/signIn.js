'use strict'

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

const get = 'GET'
const post = 'POST'
const string = 'string'

const sign_in = 'sign_in'

const username = 'username'
const password = 'password'

module.exports = { getSignInView }
