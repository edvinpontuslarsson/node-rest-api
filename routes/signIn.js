'use strict'

const router = require('express').Router()
const signInView = require('../views/signIn')
const authDAL = require('../models/authDAL')
const customError = require('../models/customError')

router.route('/sign-in')
  .get((req, res) => {
    const view =
            signInView.getSignInView(req.headers.host)

    res.status(200)
    res.send(view)
  })

  .post(async (req, res) => {
    try {
      const rawUsername = req.body.username
      const rawPassword = req.body.password

      const token = 
        await authDAL.authUser(rawUsername, rawPassword)

      const view = signInView.getSignInSuccesRes(
          req.headers.host,
          token
        )

      res.status(201)
      res.send(view)
    } catch (err) {
      if (typeof err === customError.InternalServerError)
          res.sendStatus(500)
      if (typeof err === customError.ForbiddenError)
          res.sendStatus(403)
    }
  })

module.exports = router
