const Joi = require('joi');
const mongoose = require('mongoose');
const {tvGenreSchema} = require('./tvgenreModel');

const Tvseries = mongoose.model('Tvseries', new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },

    tvGenre: {
        type: tvGenreSchema,
        required: true
    },

    seasons: {

        type: Array,
        required: true

    },

    episodes:[
        {   
            seasonNo: [
                {
                    seasonNumber:{
                        type: Number,
                        required: true,
                        min: 1,
                        max: 255
                    },
                    episodeNumber:{
                        type: Number,
                        required: true,
                        min: 1,
                        max: 255
                    },
        
                    title:{
                        type: String,
                        required: true
                    },
        
                    releasedDate: {
                        type: String,
                        required: true
                    },
        
                    shortPlot: {
                        type: String
                    },
        
                    rating: {
                        type: Number,
                        required: true
                    }
                }
            ] ,        
        }
    ],
    
    creators: {
        type: Array,
        required: true
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
            message: 'Provide atleast one tag for the tv series!!!'
        }
    }
}));

function validateTvseries(tvseries){
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        tvGenreId: Joi.string().required(),
        creators: Joi.array().required(),
        cast: Joi.array().required(),
        awards: Joi.string().min(5).max(255).required(),
        storyLine: Joi.string().min(10).required(),
        plot: Joi.string().min(10).required(),
        tagLine: Joi.string().min(10).required(),
        details: Joi.object().required(),
        filmingLocations: Joi.array().required(),
        rated: Joi.string().required(),
        boxOffice: Joi.object().required(),
        technicalSpecs: Joi.object().required(),
        images: Joi.array().required(),
        imdbRating: Joi.number().min(1).max(10).required(),
        trailers: Joi.array().required(),
        category: Joi.string().required(),
        tags: Joi.array().required(),
        seasons: Joi.array().required(),
        episodes: Joi.array().required()
    };

    return Joi.validate(tvseries, schema);
}

exports.Tvseries = Tvseries;
exports.validate = validateTvseries;