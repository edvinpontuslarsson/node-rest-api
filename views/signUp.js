'use strict'

/**
 * @param {String} hostname 
 * @returns JSON with links & instructions
 */
const getSignUpView = hostname => 
    JSON.stringify(
        {
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
    )

/**
 * @param {String} hostname 
 * @returns JSON with links & instructions
 */
const getSignUpSuccesRes = hostname => {

}

/**
 * @param {String} hostname 
 * @returns JSON with links & instructions
 */
const getSignUpfailRes = hostname => {

}

const get = 'GET'
const post = 'POST'
const string = 'string'

const signUp = 'sign-up'

const username = 'username'
const password = 'password'
const repeatPassword = 'repeat-password'

module.exports = {
    getSignUpView,
    getSignUpSuccesRes,
    getSignUpfailRes
}
