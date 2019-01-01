const passport = require('passport');
const GitHubStrategy = require('passport-github2');
const User = require('../models/userModel');


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});


passport.use(new GitHubStrategy({

    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"

}, (accessToken, refreshToken, profile, done) => {

    // first check if the user already exists 

    

}

));