'use strict'

const router = require('express').Router()
const createMessageView = require('../views/v_createMessage')
const messageDAL = require('../models/messageDAL')
const customError = require('../models/customError')

// perhaps get middleware function verify from authDAL

router.route('/create-message')
  .get((req, res) => {
    const view =
            createMessageView.getMessagesView(req.headers.host)
    res.status(200)
    res.send(view)
  })

  .post(async (req, res) => {
    try {
      const messageID =
                await messageDAL.storeMessage(req)
      const view = createMessageView.getCreatedMessageRes(
        req.headers.host, messageID
      )

      res.status(201)
      res.send(view)
    } catch (err) {
      if (err instanceof customError.InternalServerError) { res.sendStatus(500) }
      if (err instanceof customError.ForbiddenError) { res.sendStatus(403) }
    }
  })

module.exports = router
