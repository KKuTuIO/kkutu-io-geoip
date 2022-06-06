const express = require('express')
const logger = require('morgan')
const apiService = require('./routes/api')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/lookup', apiService)

module.exports = app