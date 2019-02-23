'use strict'

const router = require('express').Router()
const indexView = require('../views/index')

router.route('/')
    .get((req, res) => {
        const view = indexView(req.headers.host)
        res.send(view)
    })

module.exports = router
