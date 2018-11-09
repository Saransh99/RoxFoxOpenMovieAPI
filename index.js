const express = require('express');
const app = express();

// *check the log files to see the uncaught and caught exceptions

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

app.set('view engine', 'pug');
app.set('views', './views');

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listeneing on the port ${port}`);
});
