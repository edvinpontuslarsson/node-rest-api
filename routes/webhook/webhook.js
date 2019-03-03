'use strict'

const router = require('express').Router()
const webhookView = require('../../views/webhook/v_webhook')
const webhookDAL = require('../../models/webhookDAL')
const customError = require('../../models/customError')

router.route('/webook/:id')
    .patch(async (req, res) => {
        try {
            
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
