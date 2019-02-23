'use strict'

module.exports = hostname => {
    return {
        greeting: 'Welcome to the MessageBoard API!',

        links: [
            {
                rel: 'messages',
                href: `${hostname}/messages`,
                action: 'GET',
            },
            {
                rel: 'signup',
                href: `${hostname}/signup`,
                action: 'POST',
            },
            {
                rel: 'signin',
                href: `${hostname}/signin`,
                action: 'POST',
            },
            {
                rel: 'messages',
                href: `${hostname}/messages`,
                action: 'POST'
            }
        ]
    }
}
