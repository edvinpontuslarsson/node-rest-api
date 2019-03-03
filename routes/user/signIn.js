'use strict'

const router = require('express').Router()
const signInView = require('../../views/user/v_signIn')
const authDAL = require('../../models/authDAL')
const utils = require('../../utils/utils')

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
      res.json(view)
    } catch (error) {
      const statusCode = utils.getHttpErrorCode(error)
      res.sendStatus(statusCode)
    }
  })

module.exports = router
