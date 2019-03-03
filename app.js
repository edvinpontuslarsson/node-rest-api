'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const dbconfig = require('./config/dbConfig')
require('dotenv').config()

dbconfig.connect()
const app = express()

app.use(bodyParser.json())

/**
 * sets routes
 */
// index
app.use('/', require('./routes/home/index'))
// user routes
app.use('/', require('./routes/user/signUp'))
app.use('/', require('./routes/user/signIn'))
// message routes
app.use('/', require('./routes/message/createMessage'))
app.use('/', require('./routes/message/listMessages'))
app.use('/', require('./routes/message/message'))
// webhook routes
app.use('/', require('./routes/webhook/registerWebhook'))
app.use('/', require('./routes/webhook/listWebhooks'))

const port = process.env.PORT

app.listen(port, () => {
  console.log(`The API is now running on port ${port}`)
})
