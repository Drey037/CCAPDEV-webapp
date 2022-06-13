const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    comment: String,
    Likes: Integer,
    Dislikes: Integer
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;