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
        rquired: true
    },
    dislikes: {
        type: Number,
        rquired: true
    }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;