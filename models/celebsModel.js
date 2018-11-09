const mongoose = require('mongoose');
const Joi = require('joi');

const Celeb = mongoose.model('Celebs', new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 255,
        trim: true,
        required: true
    },

    born: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true
    },

    residence: {
        type: Array,
        required: true
    },

    education: {
        type: Array,
        required: true
    },

    yearsActive: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true
    },

    spouses: {
        type: Array,
        required: true
    },

    children: {

        count: {
            type: Number,
            min: 1,
            max: 20,
            required: true
        },
        names: {
            type: Array,
            required: true
        }

    },

    parents: {
        type: Array,
        required: true
    },

    height: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        min: 1,
        max: 120,
        required: true
    },

    isAlive: {
        type: Boolean,
        required: true
    },

    netWorth: {
        type: String
    },

    movies: {
        type: Array
    },

    tvSeries: {
        type: Array
    },

    posters: {
        type: Array
    },

    upcomingProjects: {
        type: Array
    },

    quotes: {
        type: Array
    },

    about: {
        type: String,
        required: true
    },

    socialProfiles: {
        type: Array,
        required: true
    },

    wikipediaPage: {
        type: Array,
        required: true
    },

    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function (v, callback) {
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result);
                }, 1000);
            },
            message: 'A movie should have atleast one tag'
        }
    }

}));

function validateCeleb(celeb) {
    const schema = {
        name: Joi.string().min(5).max(255).required(),
        born: Joi.string().min(5).max(255).required(),
        residence: Joi.array().required(),
        education: Joi.array().required(),
        yearsActive: Joi.string().required(),
        spouses: Joi.array().required(),
        children: Joi.object().required(),
        parents: Joi.array().required(),
        height: Joi.string().required(),
        age: Joi.number().min(1).max(120).required(),
        isAlive: Joi.boolean().required(),
        netWorth: Joi.string().required(),
        movies: Joi.array(),
        tvSeries: Joi.array(),
        posters: Joi.array().required(),
        upcomingProjects: Joi.array(),
        quotes: Joi.array(),
        about: Joi.string().required(),
        socialProfiles: Joi.array().required(),
        wikipediaPage: Joi.array().required(),
        tags: Joi.array().required()
    };

    return Joi.validate(celeb, schema);
}

exports.Celeb = Celeb;
exports.validate = validateCeleb;