const Joi = require('joi');

const mongoose = require('mongoose');
const {genreSchema} = require('./genreModel');

const Movie = mongoose.model('Movies', new mongoose.Schema({

    title:{
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    director: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    writers: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    cast: {
        type: Array,
        required: true
    },
    awards: {
        type: String,
        minlength: 5,
        maxlength: 255
    },
    storyLine: {
        type: String,
        required: true,
        minlength: 10
    },
    plot: {
        type: String,
        required: true,
        minlength: 10
    },
    tagLine: {
        type: String,
        minlength: 10
    },
    details: {
        type:Object,
        required: true
    },
    filmingLocations: {
        type: Array
    },
    rated: {
        type: String,
        required: true,
        enum: ["G", "PG", "PG-13", "R", "NC-17"],
        uppercase: true,
        default: true
    },
    runtime: {
        type: String,
        required: true
    },
    boxOffice: {
        budget: {
            type: String,
            required: true
        },
        worldwide: {
            type: String,
            required: true
        }
    },
    technicalSpecs: {
        soundMix:{
            type: String,
            required: true
            },
        aspectRatio: {
            type: String,
        },
    },

    images: {
        type: Array,
        required: true
    },

    trailers: {
        type: Array,
        required: true       
    },

    imdbRating: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },

    category: {
        type: String,
        default: true,
        enum: ['movie','tvseries','music'],
        lowercase: true,
        trim: true
    },

    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator:function(v, callback){
                setTimeout(()=>{
                    const result = v && v.length>0;
                    callback(result);
                },1000)
            },
            message: 'A movie should have atleast one tag'
        }
    }
}));


function validateMovie(movie){
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.string().required(),
        director: Joi.string().min(5).max(255).required(),
        writers: Joi.string().min(5).max(255).required(),
        cast: Joi.array().required(),
        awards: Joi.string().min(5).max(255).required(),
        storyLine: Joi.string().min(10).required(),
        plot: Joi.string().min(10).required(),
        tagLine: Joi.string().min(10).required(),
        details: Joi.object().required(),
        filmingLocations: Joi.array().required(),
        rated: Joi.string().required(),
        runtime: Joi.string().required(),
        boxOffice: Joi.object().required(),
        technicalSpecs: Joi.object().required(),
        images: Joi.array().required(),
        imdbRating: Joi.number().min(1).max(10).required(),
        trailers: Joi.array().required(),
        category: Joi.string().required(),
        tags: Joi.array().required()
    };

    return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;