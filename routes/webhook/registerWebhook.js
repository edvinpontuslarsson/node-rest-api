'use strict'

const router = require('express').Router()
const registerWebhookView = require('../../views/webhook/v_registerWebhook')
const webhookDAL = require('../../models/webhookDAL')
const customError = require('../../models/customError')

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
    } catch (err) {
      if (err instanceof customError.InternalServerError) { res.sendStatus(500) }
      if (err instanceof customError.ForbiddenError) { res.sendStatus(403) }
    }
  })

module.exports = router
