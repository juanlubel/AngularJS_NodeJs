const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const UserSchema = new mongoose.Schema({
  social: {type:String,unique:true},
  username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
  email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
  name: {type: String, default: 'App User'},
  bio: String,
  image: String,
/*  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],*/
  hash: String,
  salt: String
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

UserSchema.methods.validPassword = function(password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.generateJWT = function() {
  let today = new Date();
  let exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, secret);
};

UserSchema.pre('validate', function() {
  this.image = `https://ui-avatars.com/api/?name=${this.name.split(' ').join('+')}`
})

UserSchema.methods.toAuthJSON = function(){
  return {
    username: this.username,
    email: this.email,
    name: this.name,
    token: this.generateJWT(),
    bio: this.bio,
    image: this.image || `https://ui-avatars.com/api/?name=${this.name.split(' ').join('+')}`
  };
};

UserSchema.methods.toProfileJSONFor = function(user){
  return {
    username: this.username,
    bio: this.bio,
    name: this.name,
    image: this.image || `https://ui-avatars.com/api/?name=${this.name.split(' ').join('+')}`,
/*    following: user ? user.isFollowing(this._id) : false*/
  };
};
module.exports = mongoose.model('User', UserSchema);
