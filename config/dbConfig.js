'use strict'

const mongoose = require('mongoose')
require('dotenv').config()

/**
 * Reuses code from on of my earlier projects here:
 * https://github.com/edvinpontuslarsson/youedvin/blob/master/config/dbConfig.js
 */
const connect = () => {
  const db = mongoose.connection

  db.on('error', console.error.bind(console, 'connection error:'))

  db.once('open', () => {
    console.log('Connected to DB')
  })

  process.on('SIGINT', () => {
    db.close(() => {
      console.log('DB connection closed')
      process.exit(0)
    })
  })

  mongoose.set('useNewUrlParser', true)
  mongoose.set('useFindAndModify', false)
  mongoose.set('useCreateIndex', true)

  mongoose.connect(process.env.dbURL)
}

module.exports = { connect }
