'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config()


const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static('src'))

app.listen(port, () => {
    console.log(`Node server is running on http://localhost:${port}`)
})
