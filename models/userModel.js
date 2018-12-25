const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
//const Nexmo = require('nexmo');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },

    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },

    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 155,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },

    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    },

    googleId: {
        type: String,
        default: ''
    },

    facebookId: {
        type: String,
        default: ''
    },

    fbTokens: Array,

    userImage: {
        type: String,
        default: 'default.png'
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, isAdmin: this.isAdmin },
        config.get('jwtPrivateKey'),
        { expiresIn: 86400 }  // ! token valid for 24hrs only
    );

    // returing the token to the response header
    return token;
  
};

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        firstName: Joi.string()
            .min(4)
            .max(50)
            .required(),
        lastName: Joi.string()
            .min(3)
            .max(50)
            .required(),
        email: Joi.string()
            .min(5)
            .max(255)
            .required(),
        password: Joi.string()
            .min(5)
            .max(255)
            .required(),
        isAdmin: Joi.boolean().required()
    };
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;


//sending the sms
// check for some reason i cannot send the token in the sms and the sms is coming quite late

// const nexmo = new Nexmo({
//     apiKey: process.env.NEXMO_API_KEY,
//     apiSecret: process.env.NEXMO_API_SECRET
//   });
  
//   const from = 'Nexmo';
//   const to = process.env.NEXMO_TO_NUMBER;
//   const text = 'this is from the userModel';
  
//   nexmo.message.sendSms(from, to, text, (err, responseData)=>{
//       if(err) console.log(err);
//       else console.log(responseData);
//   });
