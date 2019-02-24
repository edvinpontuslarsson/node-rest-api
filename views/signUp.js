'use strict'

const getSignUpView = hostname => {
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

const getSignUpSuccesRes = hostname => {

}

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
