const { validate, Game } = require('../models/gameModel');
const { Genre } = require('../models/genreModel');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');
const express = require('express');
const router = express.Router();

module.exports = router;
