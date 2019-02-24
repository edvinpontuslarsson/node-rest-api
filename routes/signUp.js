'use strict'

const router = require('express').Router()
const signUpView = require('../views/signUp')

router.route('/sign-up')
    .get((req, res) => {
        res.status(200)
        const view = 
            signUpView.getSignUpView(req.headers.host)
        res.send(view)
    })

module.exports = router
