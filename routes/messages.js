'use strict'

const router = require('express').Router()
const messagesView = require('../views/messages')
const messageDAL = require('../models/messageDAL')
const expressJWT = require('express-jwt')

router.route('/messages')
    .get((req, res) => {
        const view =
            messagesView.getMessagesView(req.headers.host)
        res.status(200)
        res.send(view)
    })

    .post(
        expressJWT({ secret: process.env.JWT_SECRET }), 
        async (req, res) => {
           await messageDAL.storeMessage(req)
           res.send('mkay')
    })

module.exports = router
