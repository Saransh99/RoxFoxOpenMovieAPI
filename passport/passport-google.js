const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/userModel');

// serializing and deserializing the session in the authentication

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findOne(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new GoogleStrategy({

    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback' || secrets.google.callBackURL,
    passReqToCallBack: true

}, (accessToken, refreshToken, profile, done) => {

    // first check if the user profile already exist
    User.findOne({ google: profile.id }, (err, user) => {
        if (err) return done(err);

        if (user) return done(null, user);

        else {
            const newUser = new User({
                googleId: profile.id,
                emai: profile.emails[0]['value'],
                userImage: profile._json.image_url,
                firstName: profile.name['givenName'],
                lastName: profile.name['familyName']
            });

            newUser.save((err) => {
                if (err) return done(err);
                return done(null, newUser);
            });
        }

    });
}

));
