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
app.use('/', require('./routes/index'))
// user routes
app.use('/', require('./routes/signUp'))
app.use('/', require('./routes/signIn'))
// message routes
app.use('/', require('./routes/createMessage'))
// webhook routes
app.use('/', require('./routes/webhook/registerWebhook'))

const port = process.env.PORT

app.listen(port, () => {
  console.log(`The API is now running on port ${port}`)
})
