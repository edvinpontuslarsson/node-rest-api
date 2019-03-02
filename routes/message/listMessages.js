'use strict'

const router = require('express').Router()
const listMsgView = require('../../views/message/v_listMessages')
const messageDAL = require('../../models/messageDAL')
const customError = require('../../models/customError')

router.route('/list-messages')
    .get(async (req, res) => {
        const msgObjects = await messageDAL.getAllMessages()

        const view = listMsgView.getListMsgView(
            req.headers.host, msgObjects
        )
        res.status(200)
        res.json(view)
    })

module.exports = router
