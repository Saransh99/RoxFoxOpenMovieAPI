const mongoose = require('mongoose');
const Joi = require('joi');


const tvGenreSchema =  new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }

});

const TvGenre = mongoose.model('TvGenre', tvGenreSchema);

function validateTvGenre(tvGenre){
    const schema = {
        name: Joi.string().min(5).max(50).required()
    };

    return Joi.validate(tvGenre, schema);
}

exports.tvGenreSchema = tvGenreSchema;
exports.TvGenre = TvGenre;
exports.validate = validateTvGenre;