const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    show: {type: mongoose.Schema.ObjectId, ref: 'ShowInfo'},
    comments: [{type: mongoose.Schema.ObjectId, ref: 'Comment'}],
    user: {type: mongoose.Schema.ObjectId, ref: 'UserInfo'},

    description: String,
    rating: Number
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;