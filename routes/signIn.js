'use strict'

const router = require('express').Router()
const signInView = require('../views/signIn')
const authDAL = require('../models/authDAL')

router.route('/sign-in')
    .get((req, res) => {
        const view = 
            signInView.getSignInView(req.headers.host)

        res.status(200)
        res.send(view)
    })

    .post(async (req, res) => {

    })

module.exports = router
