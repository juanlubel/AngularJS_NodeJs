'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slug = require('slug')

let HotelSchema = Schema({
    slug: {type: String, lowercase: true, unique: true},
    name: String,
    location: String,
    img: String,
    type: String,
    components: Array,
    rooms: Array
})


/*HotelSchema.pre('validate', (next) => {
    if(!this.slug)  {
        this.slugify()
    }
    next()
})*/

HotelSchema.methods.slugify = () => {
    this.slug = slug(this.name)
}

module.exports = mongoose.model('Hotel', HotelSchema)
