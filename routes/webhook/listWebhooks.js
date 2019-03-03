'use strict'

const router = require('express').Router()
const listHooksView = require('../../views/webhook/v_listWebhooks')
const webhookDAL = require('../../models/webhookDAL')
const customError = require('../../models/customError')

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
