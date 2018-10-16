const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('../models/genreModel');

const Anime = mongoose.model(
    'Animes',
    new mongoose.Schema({
        title: {
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

        seasons: {
            type: Map,
            off: String
        },

        episodes: [
            {
                seasonNo: [
                    {
                        seasonNumber: {
                            type: Number,
                            required: true,
                            min: 1,
                            max: 255
                        },
                        episodeNumber: {
                            type: Number,
                            required: true,
                            min: 1,
                            max: 255
                        },

                        title: {
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
                ]
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
            type: Object,
            required: true
        },

        rated: {
            type: String,
            required: true,
            enum: ['TV-Y', 'TV-Y7', 'TV-G', 'TV-PG', 'TV-14', 'TV-MA'],
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
            soundMix: {
                type: String,
                required: true
            },
            aspectRatio: {
                type: String
            }
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
            enum: ['movie', 'tvseries', 'music', 'anime', 'games'],
            lowercase: true,
            trim: true
        },

        tags: {
            type: Array,
            validate: {
                isAsync: true,
                validator: function(v, callback) {
                    setTimeout(() => {
                        const result = v && v.length > 0;
                        callback(result);
                    }, 1000);
                },
                message: 'A movie should have atleast one tag'
            }
        }
    })
);

function validateAnime(anime) {
    const schema = {
        title: Joi.string()
            .min(5)
            .max(50)
            .required(),
        genreId: Joi.string().required(),
        creators: Joi.array().required(),
        cast: Joi.array().required(),
        awards: Joi.string()
            .min(5)
            .max(255)
            .required(),
        storyLine: Joi.string()
            .min(10)
            .required(),
        plot: Joi.string()
            .min(10)
            .required(),
        tagLine: Joi.string()
            .min(10)
            .required(),
        details: Joi.object().required(),
        rated: Joi.string().required(),
        runtime: Joi.string().required(),
        boxOffice: Joi.object().required(),
        technicalSpecs: Joi.object().required(),
        images: Joi.array().required(),
        imdbRating: Joi.number()
            .min(1)
            .max(10)
            .required(),
        trailers: Joi.array().required(),
        category: Joi.string().required(),
        tags: Joi.array().required(),
        seasons: Joi.object().required(),
        episodes: Joi.array().required()
    };

    return Joi.validate(anime, schema);
}

exports.Anime = Anime;
exports.validate = validateAnime;
