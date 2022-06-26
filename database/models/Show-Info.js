const mongoose = require('mongoose');

const ShowInformationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        rquired: true
    },
    cast: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    video : {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['movie', 'series', 'anime']
    }
});

const ShowInfo = mongoose.model('ShowInfo', ShowInformationSchema);

module.exports = ShowInfo;