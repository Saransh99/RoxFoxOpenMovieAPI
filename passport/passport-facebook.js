const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const User = require('../models/userModel');

// set up all the keys in the .env file 
// i have not commited the secrets folder into the github therefore i have to configure the env variables inthe .env file again 


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findByid(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new FacebookStrategy({

    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
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