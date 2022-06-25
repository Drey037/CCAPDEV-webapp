const mongoose = require('mongoose');

const ShowInformationSchema = new mongoose.Schema({
    title: String,
    year: Number,
    cast: [String],
    director: String,
    genre: [String],
    description: String,
    video : String,
    image: String
});

const ShowInfo = mongoose.model('ShowInfo', ShowInformationSchema);

module.exports = ShowInfo;