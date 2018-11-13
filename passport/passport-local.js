const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/userModel');

// passport-local is for authenticating the user using only the uername and the password 
// but we will use the email as the unique param for finding or loging in the users 

passport.use('local-signup', new LocalStrategy({

    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true

}, (req, email, password, done) => {
    User.findOne({ email: 'email' }, (err, done) => {
        if (err) return done(err);
        if (user) {
            return done(null, false, req.send('User with the email already exists'));
        }

        else {
            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.passport  // we need to encrypt the password
            });
        }

        newUser.save((err) => {
            done(null, newUser);
        });

    });
}

));
