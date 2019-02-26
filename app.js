'use strict'

require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const dbconfig = require('./config/dbConfig')

dbconfig.connect()
const app = express()

app.use(bodyParser.json())
app.set('jwt_secret', process.env.JWT_SECRET)

// sets routes
app.use('/', require('./routes/index'))
app.use('/', require('./routes/signUp'))
app.use('/', require('./routes/signIn'))

const port = process.env.PORT

app.listen(port, () => {
  console.log(`The API is now running on port ${port}`)
})
