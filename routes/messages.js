'use strict'

const router = require('express').Router()
const messagesView = require('../views/messages')
const messageDAL = require('../models/messageDAL')
const customError = require('../models/customError')

// perhaps get middleware function verify from authDAL

router.route('/messages')
    .get((req, res) => {
        const view =
            messagesView.getMessagesView(req.headers.host)
        res.status(200)
        res.send(view)
    })

    .post(async (req, res) => {
        try {
            await messageDAL.storeMessage(req)
            res.send('mkay')
        } catch (err) {
            if (err instanceof customError.InternalServerError)
                res.sendStatus(500)
            if (err instanceof customError.ForbiddenError)
                res.sendStatus(403)
        }
    })

module.exports = router
