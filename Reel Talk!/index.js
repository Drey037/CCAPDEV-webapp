const express = require('express');
const app = new express();
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

// LILA NOTE: might have to change '127.0.0.1' to 'localhost', the latter doesn't work for me kasi
mongoose.connect('mongodb://127.0.0.1/ReelTalkDB', {useNewURLParser: true, useUnifiedTopology: true});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(fileUpload());

var hbs = require('hbs');
app.set('view engine', 'hbs');

// GET routes
// Not entirely sure if we need to make route handlers for EVERY page, made these so the site works (for now)
app.get('/', function(req, res) {
    res.sendFile(__dirname + '\\' + 'index.html');
});



var port = 3000;
var server = app.listen(port, function() {
    console.log('Node server is running on port ' + port + '...');
});