'use strict'

const router = require('express').Router()
const listHooksView = require('../../views/webhook/v_listWebhooks')
const webhookDAL = require('../../models/webhookDAL')
const utils = require('../../utils/utils')

router.route('/list-webhooks')
  .get(async (req, res) => {
    try {
      const userWebhooks =
                await webhookDAL.getAllWebhooksByUser(req)
      const view = listHooksView.getListHooksView(
        req.headers.host, userWebhooks
      )
      res.status(200)
      res.json(view)
    } catch (error) {
      const statusCode = utils.getHttpErrorCode(error)
      res.sendStatus(statusCode)
    }
  })

module.exports = router
