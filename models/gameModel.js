const mongoose = require('mongoose');
const Joi = require('joi');
const {genreSchema} = require('../models/genreModel');


const Game = mongoose.model('Games', new mongoose.Schema({

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

    devTeam: [
        {
            developers: {
                type: String,
                required: true,
                minlength: 5
            }
        },
        {
            publishers: {
                type: String,
                required: true
            }
        },
        {
            directors: {
                type: String,
                required: true
            }
        },
        {
            programmers: {
                type: Array,
                required: true
            }
        },
        {
            artists: {
                type: String,
                required: true
            }
        },
        {
            writers: {
                type: String
            }
        },
        {
            developerAddress: {
                type: Object,
                required: true
            }
        }

    ],
    
    gameSeries: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true
    },

    platforms: {
        type: Array,
        required: true
    },

    releasedDate: {
        type: String,
        required: true
    },

    gameEngine: {
        type: String,
        required: true
    },

    gameModes: {
        type: Array,
        required: true
    },

    summary: {
        type: String
    },

    posters: {
        type: Array
    },

    trailers: {
        type: Array
    },

    minSystemRequirement: {
        type: Object,
        required: true
    },

    rating: [
        {
            steamRating:{
                type: Number,
                min: 1,
                max: 10
            }
        },
        {
            gameSpotRating:{
                type: Number,
                min: 1,
                max: 10
            }
        },
        {
            ignRating:{
                type: Number,
                min: 1,
                max: 10
            }
        },
    ],

    rated: {
        type: String,
        required: true,
        enum: ["RP", "EC", "E", "E10+", "T", "M","AO"],
        uppercase: true,
        default: true
    },
    category: {
        type: String,
        default: true,
        enum: ['movie','tvseries','music','anime', 'games'],
        lowercase: true,
        trim: true
    },

    cast: {
        type: Object,
        required: true
    },

    addOns: {
        type: Object,
        required: true
    },

    diffProducts: {
        type: Array,
        required: true
    },

    gameFacts: {
        type: Object
    },

    officialWebsite: {
        type: String
    },

    releasedState: {
        type: String,
        default: true,
        enum: ['private-beta','open-beta','alpha','early-access', 'launched'],
        lowercase: true,
        trim: true
    },

    isPaid: {
        type: Boolean,
        required: true,
        default: false
    }

}));

function validateGames(games){
    const schema = {

        title: Joi.string().min(5).max(255).required(),
        genreId: Joi.string().required(),
        devTeam: Joi.array().required(),
        gameSeries: Joi.string().required(),
        platforms: Joi.array().required(),
        releasedDate: Joi.string().required(),
        gameEngine: Joi.string().required(),
        gameModes: Joi.array().required(),
        summary: Joi.string().required(),
        posters: Joi.array().required(),
        trailers: Joi.array().required(),
        minSystemRequirement: Joi.object().required(),
        rating: Joi.array().required(),
        rated: Joi.string().required(),
        category: Joi.string().required(),
        cast: Joi.object().required(),
        addOns: Joi.object().required(),
        diffProducts: Joi.array().required(),
        gameFacts: Joi.object().required(),
        officialWebsite: Joi.string().required(),
        releasedDate: Joi.string().required(),
        isPaid: Joi.boolean().required()

    };

    return Joi.validate(games, schema);
}

exports.validate = validateGames;
exports.Game = Game;