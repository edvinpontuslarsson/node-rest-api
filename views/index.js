'use strict'

const messagesView = require('./messages')
const signUpView = require('./signUp')
const signInView = require('./signIn')

/**
 * @param {String} hostname 
 * @returns JSON with links & instructions
 */
const getIndexView = hostname =>
    JSON.stringify(
        {
            greeting: 'Welcome to the MessageBoard API!',
            links: [
                // objects with links & instructions
                JSON.parse(messagesView.getMessagesView(hostname)),
                JSON.parse(signUpView.getSignUpView(hostname)),
                JSON.parse(signInView.getSignInView(hostname))
            ]
        }
    )

module.exports = { getIndexView }
