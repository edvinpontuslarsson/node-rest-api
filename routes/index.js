'use strict'

const router = require('express').Router()

router.route('/api')
    .get((req, res) => {
        res.json({
            greeting: 'Hello from the API'
        })
    })

    .post((req, res) => {
        const postMessage = req.body.msg
        
        res.json({
            preface: 'You posted this',
            msg: postMessage
        })
    })

module.exports = router
