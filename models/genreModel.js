const Joi = require('joi');
const mongoose = require('mongoose');


const genreSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        lowercase: true,
        trim: true
    }
});

const Genre = mongoose.model('Genre', genreSchema); // first parameter is the name of the collection

function validateGenre(genre){
    const schema = {
        name: Joi.string().min(5).max(50).required()
    };
    return Joi.validate(genre, schema);
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;