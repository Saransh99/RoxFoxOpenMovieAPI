const mongoose = require('mongoose');
const config = require('config');
const chalk = require('chalk');

module.exports = function(){
    const db = config.get('db');
    mongoose.connect(db, {useNewUrlParser: true, useCreateIndex:true})
        .then(()=>{
            console.log(chalk.whiteBright.bgGreen.underline.bold(`Connected to the ${db}`));
        });
}