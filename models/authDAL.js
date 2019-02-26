'use strict'

const User = require('./User')
const customError = require('./customError')
const sanitize = require('mongo-sanitize')
const jwt = require('jsonwebtoken')

const loginUser = () => {

}

const isLoggedIn = () => {

}

const isRightUser = (token, username) => {

}

const logOutUser = () => {

}

module.exports = {
    loginUser,
    isLoggedIn,
    isRightUser,
    logOutUser
}
