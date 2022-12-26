const express = require('express')
const mongoose = require('mongoose')
const app = require('./routes/app')
mongoose.connect('mongodb://localhost/10xdatabase', () => {
    console.log('connected to database')
})


app.listen(8000, () => {
    console.log('server up at 8000')
})