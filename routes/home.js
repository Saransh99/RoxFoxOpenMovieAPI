const express = require('express');
const router = express.Router();

// we are using ejs as the default engine 
router.get('/', (req, res)=>{
    res.render('home' );
})

module.exports = router;