const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    // Might change ref: Show-information, ref: Comment etc. depending on what u guys call it
    show: {type: mongoose.Schema.ObjectId, ref: 'Show-information'},
    comments: [{type: mongoose.Schema.ObjectId, ref: 'Comment'}],
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},

    description: String,
    rating: Number
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;