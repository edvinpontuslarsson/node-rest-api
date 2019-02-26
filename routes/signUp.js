'use strict'

const router = require('express').Router()
const signUpView = require('../views/signUp')
const userDAL = require('../models/userDAL')

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
      console.log(err)
    }
  })

module.exports = router
