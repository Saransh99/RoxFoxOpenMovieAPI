const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/db')();

app.set('view engine', 'pug');
app.set('views','./views');

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`listeneing on the port ${port}`);
});


