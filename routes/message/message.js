'use strict'

const router = require('express').Router()
const messageView = require('../../views/message/v_message')
const messageDAL = require('../../models/messageDAL')
const customError = require('../../models/customError')

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
      if (error instanceof customError.NotFoundError) {
        res.sendStatus(404)
      }
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
      if (error instanceof customError.NotFoundError) {
        res.sendStatus(404)
      }
      if (error instanceof customError.ForbiddenError) {
        res.sendStatus(403)
      }
      if (error instanceof customError.InternalServerError) {
        res.sendStatus(500)
      }
    }
  })

  .delete(async (req, res) => {
    try {
      messageDAL.deleteMessage(req)
      const noContent = 204
      res.sendStatus(noContent)
    } catch (error) {
      if (error instanceof customError.NotFoundError) {
        res.sendStatus(404)
      }
      if (error instanceof customError.ForbiddenError) {
        res.sendStatus(403)
      }
      if (error instanceof customError.InternalServerError) {
        res.sendStatus(500)
      }
    }
  })

module.exports = router
