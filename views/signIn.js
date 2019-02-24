'use strict'

/**
 * @param {String} hostname 
 * @returns JSON with links & instructions
 */
const getSignInView = hostname => 
    JSON.stringify(
        {
            rel: signIn,
            href: `${hostname}/${signIn}`,
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

const signIn = 'sign-in'

const username = 'username'
const password = 'password'

module.exports = { getSignInView }
