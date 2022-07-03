const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    show: {
        type: mongoose.Schema.ObjectId, ref: 'ShowInfo',
        required: true
    },
    comments: [{
        type: mongoose.Schema.ObjectId, ref: 'Comment',
        required: true
    }],
    user: {
        type: mongoose.Schema.ObjectId, ref: 'UserInfo',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;