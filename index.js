const express = require('express');
const app = express();
const chalk = require('chalk');
require('dotenv').config();

// *check the log files to see the uncaught and caught exceptions

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

app.set('view engine', 'ejs');
app.set('views', './views');

const port = process.env.PORT || 3000;
app.listen(port, () => {

    console.log(chalk.whiteBright.bgGreen.underline.bold(`listening on the port ${port}`));
});
