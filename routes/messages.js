'use strict'

const router = require('express').Router()
const messagesView = require('../views/messages')
const messageDAL = require('../models/messageDAL')

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
            console.log(err)
        }
    })

module.exports = router
