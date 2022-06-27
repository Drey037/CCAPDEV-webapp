const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const url = process.env.MONGODB_URI;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

const database = {
    connect: function () {
        mongoose.connect(url, options, function(error) {
            if(error) throw error;
            console.log('Connected to: ' + url);
        });
    }
};

module.exports = database;
