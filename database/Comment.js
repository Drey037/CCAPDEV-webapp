const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId, ref: 'User',
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: true
    },
    dislikes: {
        type: Number,
        required: true
    }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;