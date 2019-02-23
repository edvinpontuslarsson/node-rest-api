'use strict'

const router = require('express').Router()
const start = require('../models/Start')

router.route('/')
    .get((req, res) => {
        const obj = start(req.headers.host)
        res.json(obj)
    })

module.exports = router
