const app = require('express').Router()
const User = require('../../model/User')
const passport = require('passport')
const auth = require('../auth')

app.post('/', (req, res, next) => {

    let item = new User()
    item.username = req.body.username
    item.email = req.body.email
    item.setPassword(req.body.password)
    console.log(item);
    item.save((err, itemStored) => {
        if (!itemStored) return res.status(500).json({
            msg: "Error on insert user",
            mongoMsg: err
        })

        res.status(200).json(itemStored.toAuthJSON())
    })

})


app.post('/login', (req, res, next) => {
    if(!req.body.email){
        return res.status(422).json({errors: "User can't be blank"});
    }

    if(!req.body.password){
        return res.status(422).json({errors: "Password can't be blank"});
    }

    passport.authenticate('local', {session : false}, (err, user, info) => {
        if(err){ return next(err); }

        if(user){
            return res.status(200).json(user.toAuthJSON());
        } else {
            console.log(info)
            return res.status(422).json(info);
        }
    })(req, res, next);

})

app.get('/', (req, res) => {
    console.log('get users')
    User.find({}, (err, items) => {
        if (!items) return res.status(500).send('BD not find')
        res.status(200).json(items)
    })

})

app.get('/user',auth.required ,(req, res, next) => {
    console.log(req.payload)
    User.findById(req.payload.id).then((item) => {
        if (!item) return res.status(500).send('user not find')
        res.status(200).json(item.toAuthJSON())
    })
})

app.put('/user', auth.required, (req, res, next) => {
    console.log(req.payload, req.body)
    User.findById(req.payload.id).then((user) => {
        user.name = req.body.name
        user.username = req.body.username
        user.email = req.body.email
        user.bio = req.body.bio
        user.image = req.body.image
        if(typeof req.body.password !== 'undefined'){
            user.setPassword(req.body.user.password);
        }
    user.save().then((itemStored)=> {
        res.status(200).json(itemStored.toAuthJSON())
    })
    })
})

app.get('/socialLogin', (req, res) => {
    let memorystore = req.sessionStore;
    let sessions = memorystore.sessions;
    let sessionUser;
    for(var key in sessions){
        sessionUser = (JSON.parse(sessions[key]).passport.user);
    }
    console.log(sessionUser);
    User.findById(sessionUser, function(err, item) {
        if (!item) return res.status(500).send('user not found')
        // if the user is found then log them in
        if (item) {
            console.log(item.toAuthJSON());
            return res.json({user: item.toAuthJSON()});// user found, return that user
        } else {
            return res.status(422).json(err);
        }
    });

})

app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback',
    passport.authenticate('github',{
        successRedirect : 'http://localhost:7070/#!/auth/sociallogin',
        failureRedirect: '/' }));


module.exports = app
