'use strict'

const router = require('express').Router()

router.route('/api')
    .get((req, res) => {
        res.json({
            greeting: 'Hello from the API'
        })
    })

module.exports = router
