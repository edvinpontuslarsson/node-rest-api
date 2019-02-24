'use strict'

const messagesView = require('./messages')
const signUpView = require('./signUp')
const signInView = require('./signIn')

const getIndexView = hostname => {
    const obj = {
        greeting: 'Welcome to the MessageBoard API!',
        links: []
    }

    obj.links.push(
        // objects with instructions
        messagesView.getMessagesView(hostname),
        signUpView.getSignUpView(hostname),
        signInView.getSignInView(hostname)
    )

    return JSON.stringify(obj)
}

module.exports = { getIndexView }
