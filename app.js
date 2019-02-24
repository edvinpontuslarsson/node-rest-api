'use strict'

require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

// sets routes
app.use('/', require('./routes/index'))
app.use('/', require('./routes/signUp'))

const port = process.env.PORT

app.listen(port, () => {
    console.log(`The API is now running on port ${port}`)
})
