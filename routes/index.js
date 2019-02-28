'use strict'

const router = require('express').Router()
const indexView = require('../views/v_index')

router.route('/')
  .get((req, res) => {
    const view = indexView.getIndexView(req.headers.host)

    res.status(200)
    res.json(view)
  })

module.exports = router
