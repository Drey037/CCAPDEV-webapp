const express = require('express');
const fileUpload = require('express-fileupload');
const hbs = require('hbs');
const db = require('./database/db');


//Importing routes
const routes = require('./routes/routes');
const Authroutes = require('./routes/auth');

//Imports from Security and Authentication
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');

const app = new express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(fileUpload());

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < parseInt(n); ++i) {
        block.data.index = i;
        block.data.first = i === 0;
        block.data.last = i === (n - 1);
        accum += block.fn(this);
    }
    return accum;
});

hbs.registerHelper('json', function(context) {
    return JSON.stringify(context).replace(/"/g, '&quot;');
});


//Session server config
app.use(session({
    secret: 'sefg93bfg3ut',
    store: MongoStore.create({mongoUrl: process.env.MONGODB_LOCAL}),
    resave: false,
    saveUninitialized: true,
    cookies: {secure: false, maxAge: 1000 * 60 * 60 * 24 * 7}
}));

app.use(flash());

//Flash message
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

app.use('/', routes);
app.use('/', Authroutes);


db.connect();

const port = 3000;
app.listen(process.env.PORT || port, function() {
    console.log('Node server is running on port ' + port + '...');
});