'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

// sets routes
app.use('/', require('./routes/index'))

const port = 3000 // TODO: have in .env instead

app.listen(port, () => {
    console.log(`The API is now running on port ${port}`)
})
