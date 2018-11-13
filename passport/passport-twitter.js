const passport = require('passport');
const TwitterStrategy = require('passport-twitter');
const User = require('../models/userModel');
const secrets = require('../secrets/keys');


passport.use(new TwitterStrategy({

}, (token, tokenSecret, profile, callback) => {

}

));