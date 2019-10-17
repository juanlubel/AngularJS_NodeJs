const mongoose = require('mongoose')

let CommentSchema = new mongoose.Schema({
    body: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    hotel: {type: mongoose.Schema.Types.ObjectId, ref: 'Hotel'}
},{timestamps: true})

CommentSchema.methods.toJSONFor = function (user) {
    return {
        id: this._id,
        body: this.body,
        createAt: this.createAt,
        author: user.toProfileJSONFor(user)
    }
}

module.exports = mongoose.model('Comment', CommentSchema)
