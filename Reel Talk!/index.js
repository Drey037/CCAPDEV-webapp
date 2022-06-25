const express = require('express');
const fileUpload = require('express-fileupload');
const hbs = require('hbs');
const routes = require('./routes/routes.js');
const db = require('./database/db.js');

const app = new express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use('/', routes);
app.use(fileUpload());

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

db.connect();

var port = 3000;
app.listen(process.env.PORT || port, function() {
    console.log('Node server is running on port ' + port + '...');
});