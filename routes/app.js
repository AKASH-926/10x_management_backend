const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const router = require('./classroutes')
const app = express()

app.use(bodyparser.json())

app.use('/v1/myclass', router)

module.exports = app;