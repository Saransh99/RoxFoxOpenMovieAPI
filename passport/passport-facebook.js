const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const User = require('../models/userModel');
const secrets = require('../secrets/keys');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findOne(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new FacebookStrategy({

    clientID: secrets.facebook.clientId,
    clientSecret: secrets.facebook.clientSecret,
    profileField: ['email', 'displayName', 'photos'],
    callbackURL: 'http://localhost:3000/auth/facebook/callback' || secrets.facebook.callBackURL,
    passReqToCallBack: true

}, (accessToken, refreshToken, profile, cb) => {

    // check if the user is present or not 
    User.findOne({ facebook: profile.id }, (err, user) => {

        if (err) return done(err);
        if (user) return done(null, user);

        else {
            const newUser = new User({
                email: profile._json.email,
                userImage: 'https://graph.facebook.com' + profile.id + '/picture?type=large',
                fbTokens: push({ token: token }),
                facebookId: profile.id,
                // check for the first and the lastname in the profile 
                firstName: profile,
                lastName: profile
            });

            newUser.save((err) => {
                if (err) return done(err);
                return done(null, newUser);
            });
        }

    });
}

));