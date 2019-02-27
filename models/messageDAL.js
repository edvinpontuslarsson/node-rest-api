'use strict'

const Message = require('./Message')
const authDAL = require('./authDAL')
const customError = require('./customError')
const sanitize = require('mongo-sanitize')

const storeMessage = rawRequest =>
    new Promise(resolve => {
        const req = sanitize(rawRequest)
        const isLoggedIn = await authDAL.isLoggedIn(req)
        if (!isLoggedIn) throw new customError.ForbiddenError()

        
    })

module.exports = {
    storeMessage
}
