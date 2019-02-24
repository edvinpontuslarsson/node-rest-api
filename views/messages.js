'use strict'

const getMessagesView = hostname => {
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

const get = 'GET'
const post = 'POST'
const string = 'string'

const messages = 'messages'

module.exports = { getMessagesView }
