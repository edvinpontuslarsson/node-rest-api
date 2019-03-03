'use strict'

const router = require('express').Router()
const registerWebhookView = require('../../views/webhook/v_registerWebhook')
const webhookDAL = require('../../models/webhookDAL')
const utils = require('../../utils/utils')

router.route('/register-webhook')
  .get((req, res) => {
    const view = registerWebhookView.getRegisterWebhookView(
      req.headers.host
    )
    res.status(200)
    res.json(view)
  })

  .post(async (req, res) => {
    try {
      const webhook =
                await webhookDAL.saveWebhook(req)
      const view = registerWebhookView.getSuccessNewWebhookView(
        req.headers.host, webhook
      )

      res.status(201)
      res.json(view)
    } catch (error) {
      const statusCode = utils.getHttpErrorCode(error)
      res.sendStatus(statusCode)
    }
  })

module.exports = router
