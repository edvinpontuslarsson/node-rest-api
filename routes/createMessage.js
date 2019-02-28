'use strict'

const router = require('express').Router()
const createMessageView = require('../views/v_createMessage')
const messageDAL = require('../models/messageDAL')
const customError = require('../models/customError')

router.route('/create-message')
  .get((req, res) => {
    const view =
            createMessageView.getMessagesView(req.headers.host)
    res.status(200)
    res.json(view)
  })

  .post(async (req, res) => {
    try {
      const message =
        await messageDAL.storeMessage(req)
      const view = createMessageView.getCreatedMessageRes(
        req.headers.host, message
      )

      res.status(201)
      res.json(view)
    } catch (err) {
      if (err instanceof customError.InternalServerError) { res.sendStatus(500) }
      if (err instanceof customError.ForbiddenError) { res.sendStatus(403) }
    }
  })

module.exports = router
