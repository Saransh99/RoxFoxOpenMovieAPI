const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/userModel');
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const passport = require('passport');


// auth login
router.get('/login', (req, res)=>{
    res.render('login');
});

// auth logout
router.get('/logout', (req, res)=>{
    res.send('logging out of the API');
});

// auth with google 
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// google callback
router.get('/google/callback', passport.authenticate('google'), (req, res)=>{
    res.send('You have reached the gooogle callback');
});

// auth with github
router.get('/github', (req, res)=>{
    res.send('Login to the github account');
});

router.get('/twitter', (req, res)=>{
    res.send('Login to the twitter account');
});

router.get('/facebook', (req, res)=>{
    res.send('Login to the facebook account');
});

// * this route will provide the authenticated user with the authorization token
// * the token will be displayed as the result on the response header

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    //console.log(user.email);
    if (!user) return res.status(400).send('invalid email or password!!!');

    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if (!validPassword)
        return res.status(400).send('invalid email or password');

    const token = user.generateAuthToken();

    //sending the token to the authenticated user email address
    const transporter = nodemailer.createTransport({
  
        service: 'Gmail',
        host: 'smtp.gmail.com',
        auth: {
              type: 'OAUTH2',
              user: process.env.NODEMAILER_FROM_EMAIL,
              clientId: process.env.GOOGLE_CLIENT_ID,
              clientSecret: process.env.GOOGLE_CLIENT_SECRET,
              refreshToken: process.env.GOOGLE_REFRESH_TOKEN    
        }
      });
      
      const mailOptions = {
        from: process.env.NODEMAILER_FROM_EMAIL,
        to: user.email,
        subject: 'Auth Token',
        text: 'Token valid for 24 hrs only:- '+ token,
        //html: '<b>This is bold </b>'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
              console.log(`Email sent:   Info Response:- ${info.response} Info MessageId:- ${info.messageId}`);
          }
      });

    res.send(token);
});

function validate(req) {
    const schema = {
        email: Joi.string()
            .min(5)
            .max(255)
            .required()
            .email(),
        password: Joi.string()
            .min(5)
            .max(255)
            .required()
    };

    return Joi.validate(req, schema);
}

module.exports = router;
