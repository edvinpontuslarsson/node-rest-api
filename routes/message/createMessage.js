'use strict'

const router = require('express').Router()
const createMessageView = require('../../views/message/v_createMessage')
const messageDAL = require('../../models/messageDAL')
const notification = require('../../notifications/notification')

router.route('/create-message')
  .get((req, res) => {
    const view = createMessageView.getCreateMessageView(
      req.headers.host
    )
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

      /**
       * Webhook notification with info about the new message
       */
      notification.notifyNewMessage(message)

      res.status(201)
      res.json(view)
    } catch (error) {
      const utils = require('../../utils/utils')
      const statusCode = utils.getHttpErrorCode(error)
      res.sendStatus(statusCode)
    }
  })

module.exports = router
