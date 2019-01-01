const passport = require('passport');
const TwitterStrategy = require('passport-twitter');
const User = require('../models/userModel');


// serializing and deserializing the session in the authentication

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new TwitterStrategy({
    
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"

}, (token, tokenSecret, profile, callback) => {

}

));