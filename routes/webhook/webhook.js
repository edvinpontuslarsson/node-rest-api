'use strict'

const router = require('express').Router()
const webhookView = require('../../views/webhook/v_webhook')
const webhookDAL = require('../../models/webhookDAL')
const utils = require('../../utils/utils')

router.route('/webhook/:id')
  .get(async (req, res) => {
    try {
      const webhookData =
                await webhookDAL.getWebhookData(req)
      const view = webhookView.getWebhookView(
        req.headers.host, webhookData
      )
      res.status(200)
      res.json(view)
    } catch (error) {
      const statusCode = utils.getHttpErrorCode(error)
      res.sendStatus(statusCode)
    }
  })

  .patch(async (req, res) => {
    try {
      const editedWebhookData =
                await webhookDAL.editWebhook(req)
      const view = webhookView.getWebhookView(
        req.headers.host, editedWebhookData
      )
      res.status(201)
      res.json(view)
    } catch (error) {
      const statusCode = utils.getHttpErrorCode(error)
      res.sendStatus(statusCode)
    }
  })

  .delete(async (req, res) => {
    try {
      await webhookDAL.deleteWebhook(req)
      const noContent = 204
      res.sendStatus(noContent)
    } catch (error) {
      const statusCode = utils.getHttpErrorCode(error)
      res.sendStatus(statusCode)
    }
  })

module.exports = router
