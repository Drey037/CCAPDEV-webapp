const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    show: {
        type: mongoose.Schema.ObjectId, ref: 'ShowInfo',
        required: true
    },
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
    },
    comments: [{
        content: String,
        user: mongoose.Schema.ObjectId, ref: 'UserInfo',
        likes: Number,
        dislikes: Number
    }],
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;