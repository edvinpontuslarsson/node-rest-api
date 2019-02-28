'use strict'

const Message = require('./Message')
const authDAL = require('./authDAL')
const customError = require('./customError')
const sanitize = require('mongo-sanitize')

const storeMessage = rawRequest =>
    new Promise(async resolve => {
        const req = sanitize(rawRequest)
        const auth = await authDAL.getAuthData(req)
        console.log(auth)
    })

module.exports = {
    storeMessage
}
