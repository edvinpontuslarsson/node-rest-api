'use strict'

const router = require('express').Router()
const webhookView = require('../../views/webhook/v_webhook')
const webhookDAL = require('../../models/webhookDAL')
const customError = require('../../models/customError')

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
