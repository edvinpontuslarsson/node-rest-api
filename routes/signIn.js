'use strict'

const router = require('express').Router()
const signInView = require('../views/signIn')
const userDAL = require('../models/userDAL')

router.route('/sign-in')
    .get((req, res) => {
        res.status(200)
        const view = 
            signInView.getSignInView(req.headers.host)
        res.send(view)
    })

module.exports = router
