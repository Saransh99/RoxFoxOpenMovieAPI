const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

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