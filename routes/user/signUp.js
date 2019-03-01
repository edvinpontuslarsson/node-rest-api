'use strict'

const router = require('express').Router()
const signUpView = require('../../views/user/v_signUp')
const userDAL = require('../../models/userDAL')
const customError = require('../../models/customError')

router.route('/sign-up')
  .get((req, res) => {
    const view =
      signUpView.getSignUpView(req.headers.host)

    res.status(200)
    res.json(view)
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
      res.json(view)
    } catch (err) {
      if (err instanceof customError.InternalServerError) { res.sendStatus(500) }
      if (err instanceof customError.WrongUsernameOrPasswordError) { res.sendStatus(403) }
    }
  })

module.exports = router
