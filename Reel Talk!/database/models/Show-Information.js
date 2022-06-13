const mongoose = require('mongoose');

const ShowInformationSchema = new mongoose.Schema({
    title: String,
    year: Number,
    Cast: [String],
    Description: String,
    Video : String,
    Image: String
});

const ShowInformation = mongoose.model('ShowInformation', ShowInformationSchema);

module.exports = ShowInformation;