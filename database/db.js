const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1/ReelTalkDB';     // Will have to change this for when we use MongoDB Atlas
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
