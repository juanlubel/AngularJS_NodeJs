'use strict'
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const router = require('./../routes')
const passport = require('passport')
const session = require('express-session')

const main_path = path.join(__dirname, '../')

app.use(session({ secret: 'hotelium', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/', express.static(main_path + '/build'))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use(passport.initialize());
app.use(passport.session());

app.use(router)

module.exports = app


