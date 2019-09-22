const mongoose = require('mongoose')
const path = require('path')
const print = require('./../utils/print')
require('dotenv').config({path:path.join(__dirname, '../.env')})

const database = process.env.DB_HOST + process.env.DB_PORT + process.env.DB_NAME

function connect () {
    mongoose.connect(database, {useNewUrlParser: true, useUnifiedTopology: true},
        (err, res) => {
            if (err) throw err
            print.beauty(database, 'blue', 'DB Server')
        })
}

module.exports = connect
