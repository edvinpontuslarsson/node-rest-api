'use strict'

const getIndexView = hostname => {
    const obj = {
        greeting: 'Welcome to the MessageBoard API!',
        links: []
    }

    obj.links.push(
        getMessagesObj(hostname),
        getSignUpObj(hostname),
        getSignInObj(hostname),
    )

    return JSON.stringify(obj)
}

const getMessagesObj = hostname => {
    return {
        rel: messages,
        href: `${hostname}/${messages}`,
        actions: [
            { method: get },
            {
                method: post,
                fields: [
                    { name: 'jwt_token', type: string },
                    { name: 'title', type: string },
                    { name: 'message', type: string }
                ]
            }
        ]
    }
}

const getSignUpObj = hostname => {
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
                    { name: repeatPassword, type: string }
                ]
            }
        ]
    }
}

const getSignInObj = hostname => {
    return {
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
}

const get = 'GET'
const post = 'POST'
const string = 'string'

const messages = 'messages'
const signUp = 'sign-up'
const signIn = 'sign-in'

const username = 'username'
const password = 'password'
const repeatPassword = 'repeat-password'

module.exports = getIndexView
