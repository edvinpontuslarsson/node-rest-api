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
      const view = signUpView.getSignUpView(req.headers.host)

      if (err instanceof customError.InternalServerError) {
        return res.sendStatus(500)
      }
      if (err instanceof customError.UsernameTooShortError) {
        view.info = 'Error! Username needs to be > 3 characters'
      }
      if (err instanceof customError.UsernameTooLongError) {
        view.info = 'Error! Username needs to be < 30 characters'
      }
      if (err instanceof customError.PasswordTooShortError) {
        view.info = 'Error! Password needs to be > 5 characters'
      }
      if (err instanceof customError.PasswordsDoNotMatchError) {
        view.info = 'Error! Passwords do not match'
      }
      if (err instanceof customError.OccupiedUsernameError) {
        view.info = 'Error! Username is occupied, please try with a diffent username'
      }

      res.status(401)
      res.json(view)
    }
  })

module.exports = router
