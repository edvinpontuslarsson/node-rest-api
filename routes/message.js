'use strict'

// route('/message/:id') get/patch/delete

const router = require('express').Router()
const messageView = require('../views/v_message')
const messageDAL = require('../models/messageDAL')
const customError = require('../models/customError')

router.route('/message/:id')
  .get(async (req, res) => {
    const messageData =
            await messageDAL.getMessageData(req.params.id)
  })

  .patch(async (req, res) => {

  })

  .delete(async (req, res) => {

  })
