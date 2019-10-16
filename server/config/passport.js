const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const GitHubStrategy = require('passport-github').Strategy
require('dotenv').config({path: require('path').join(__dirname, '/../.env')})

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // console.log(`id: ${id}`);
  User.findById(id)
      .then(user => {
        done(null, user);
      })
      .catch(error => {
        console.log(`Error: ${error}`);
      });
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function (email, password, done) {
    User.findOne({email: email}).then(function (user) {
        if (!user || !user.validPassword(password)) {
            return done(null, false, {errors: {'email or password': 'is invalid'}});
        }

        return done(null, user);
    }).catch(done);
}));

passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK,
        passReqToCallback: true
    },
    (request, accessToken, refreshToken, profile, done) => {
        User.findOne({'social': profile.id}, function (err, user) {
            if (err)
                return done(err);

            // if the user is found then log them in
            if (user) {
                return done(null, user);
            } else {
                console.log(profile.photos)
                let user = new User({
                    social: profile.id,
                    username: profile.username,
                    email: profile.email ? profile.email : `${profile.username}github@no.valid`,
                    type: "client",
                    image: profile.photos[0].value,
                });
                user.save((err) => {
                        return done(err, user);
                });
            }
        });
    }
))

