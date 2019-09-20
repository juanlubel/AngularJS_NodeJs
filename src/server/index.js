'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const path = require('path')
const swaggerUi = require('swagger-ui-express')

require('dotenv').config()

const port = process.env.API_PORT || 3001
const route = process.env.API_HOST
const main_path = path.join(__dirname, '../../')
const swaggerDocument = require('./swagger.json')

swaggerDocument.host=route + port

const database = process.env.DB_HOST + process.env.DB_PORT + process.env.DB_NAME

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/static', express.static(main_path + '/build'))
app.use('/api_docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument))

mongoose.connect(database,
    (err, res) => {
        if (err) throw err
        console.log('Conectado')
        app.listen(port, () => {
            console.log(`API Rest => http://localhost:${port}`)
        })
    })
