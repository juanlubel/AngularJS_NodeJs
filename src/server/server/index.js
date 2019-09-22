'use strict'
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const main_path = path.join(__dirname, '../../../')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/', express.static(main_path + '/build'))


module.exports = app


