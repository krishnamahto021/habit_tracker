const express = require('express');
const app = express();
const port = 8000;
// const layout = require('express-ejs-layouts');

// require database
const db = require('./config/mogoose');

// to use ejs layouts
// app.use(layout);

app.use(express.static('./assets'));

// to set view engine
app.set('view engine','ejs'); 
app.set('views','./views');

// to use routes
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log('errror in running up express server',err);
    }
    console.log('Server is Running on port : ',port);
})