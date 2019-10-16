'use strict'

const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const User = require('../model/User')
mongoose.plugin(slug)

const Schema = mongoose.Schema

// let random = Math.random().toString()

let HotelSchema = Schema({
    name: String,
    slug: {
        type: String,
        slug: ["name", (Math.random() * Math.pow(36, 6) | 0).toString(36)],
        lowercase: true,
        unique: true
    },
    favoritesCount: {type: Number, default: 0},
    location: String,
    img: String,
    type: String,
    components: Array,
    rooms: Array,
    favorited: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
})

/*HotelSchema.pre('update', () => {
    console.log('updateAt')
    this.update({},{ $set: { updatedAt: new Date() } })
})*/
HotelSchema.methods.updateFavoriteCount = function () {
    let hotel = this;

    return User.count({favorites: {$in: [hotel._id]}}).then(function (count) {
        hotel.favoritesCount = count;

        return hotel.save();
    });
};

HotelSchema.methods.toJSONFor = function (user) {
    return {
        slug: this.slug,
        name: this.name,
        img: this.img,
        location: this.location,
        type: this.type,
        favorited: user ? user.isFavorite(this._id) : false,
        favoritesCount: this.favoritesCount,
    };
};


module.exports = mongoose.model('Hotel', HotelSchema)
