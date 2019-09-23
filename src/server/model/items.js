'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemsSchema = Schema({
    name: String,
    sell_price: {type: Number, default: 0},
    buy_price: {type: Number, default: 0},
    description: String,
    type: String,
    category: Number
})

module.exports = mongoose.model('Item', ItemsSchema)
