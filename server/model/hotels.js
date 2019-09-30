'use strict'

const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)

const Schema = mongoose.Schema

// let random = Math.random().toString()

let HotelSchema = Schema({
    name: String,
    slug: {type: String, slug: ["name", Math.random().toString()], lowercase: true, unique: true},
    location: String,
    img: String,
    type: String,
    components: Array,
    rooms: Array,
    updatedAt: Date
})

/*HotelSchema.pre('update', () => {
    console.log('updateAt')
    this.update({},{ $set: { updatedAt: new Date() } })
})*/

module.exports = mongoose.model('Hotel', HotelSchema)
