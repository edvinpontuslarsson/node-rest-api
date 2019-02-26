'use strict'

const router = require('express').Router()
const indexView = require('../views/index')

router.route('/')
  .get((req, res) => {
    const view = indexView.getIndexView(req.headers.host)

    res.status(200)
    res.send(view)
  })

module.exports = router
