'use strict'

const router = require('express').Router()
const signInView = require('../views/signIn')
const authDAL = require('../models/authDAL')

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
        await authDAL.loginUser(rawUsername, rawPassword)

      // TODO: send token,
      // pass as arg in SignInSuccesRes

      const view = signInView.getSignInSuccesRes(
          req.headers.host,
          token
        )

      res.status(201)
      res.send(view)
    } catch (err) {
      console.log(err)
    }
  })

module.exports = router
