'use strict'

const router = require('express').Router()
const messageView = require('../../views/message/v_message')
const messageDAL = require('../../models/messageDAL')
const utils = require('../../utils/utils')

router.route('/message/:id')
  .get(async (req, res) => {
    try {
      const messageData = await messageDAL.getMessageData(
        req.params.id
      )
      const view = messageView.getMessageView(
        req.headers.host, messageData
      )
      res.status(200)
      res.json(view)
    } catch (error) {
      const notFound = 404
      res.sendStatus(notFound)
    }
  })

  .patch(async (req, res) => {
    try {
      const editedMsgData = await messageDAL.editMessage(req)
      const view = messageView.getMessageView(
        req.headers.host, editedMsgData
      )
      const created = 201
      res.status(created)
      res.json(view)
    } catch (error) {
      const statusCode = utils.getHttpErrorCode(error)
      res.sendStatus(statusCode)
    }
  })

  .delete(async (req, res) => {
    try {
      await messageDAL.deleteMessage(req)
      const noContent = 204
      res.sendStatus(noContent)
    } catch (error) {
      const statusCode = utils.getHttpErrorCode(error)
      res.sendStatus(statusCode)
    }
  })

module.exports = router
