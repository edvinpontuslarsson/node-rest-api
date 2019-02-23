'use strict'

const getIndexView = hostname => {
    const obj = {
        greeting: 'Welcome to the MessageBoard API!',
        links: []
    }

    obj.links.push(
        getMessagesGetObj(hostname),
        getSignUpPostObj(hostname),
        getSignInPostObj(hostname),
        getMessagesPostObj(hostname)
    )

    return JSON.stringify(obj)
}

const getMessagesGetObj = hostname => {
    // redo

    // have only one for messages with different actions,
    // see: https://sookocheff.com/post/api/on-choosing-a-hypermedia-format/

    return {
        rel: messages,
        href: `${hostname}/${messages}`,
        action: get
    }
}

const getSignUpPostObj = hostname => {
    return {
        rel: signUp,
        href: `${hostname}/${signUp}`,
        actions: [
            {
                class: signUp,
                href: `${hostname}/${signUp}`,
                method: post,
                fields: [
                    {
                        name: username,
                        type: string
                    },
                    {
                        name: password,
                        type: string
                    },
                    {
                        name: repeatPassword,
                        type: string
                    }
                ]
            }
        ]
    }
}

const getSignInPostObj = hostname => {
    // redo
    return {
        rel: signIn,
        href: `${hostname}/${signIn}`,
        action: post
    }
}

const getMessagesPostObj = hostname => {
    // redo
    return {
        rel: messages,
        href: `${hostname}/${messages}`,
        action: post
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
