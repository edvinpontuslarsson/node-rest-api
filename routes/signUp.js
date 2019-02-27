'use strict'

const router = require('express').Router()
const signUpView = require('../views/signUp')
const userDAL = require('../models/userDAL')
const customError = require('../models/customError')

router.route('/sign-up')
  .get((req, res) => {
    const view =
      signUpView.getSignUpView(req.headers.host)

    res.status(200)
    res.send(view)
  })

  .post(async (req, res) => {
    try {
      const regUsername = await userDAL.storeNewUser(
        req.body.username,
        req.body.password,
        req.body.repeat_password
      )

      const view =
        signUpView.getSignUpSuccesRes(
          req.headers.host, regUsername
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
