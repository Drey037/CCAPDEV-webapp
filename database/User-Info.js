const mongoose = require('mongoose');

const UserInfoSchema = new mongoose.Schema({
	username : {
        type: String,
        required: true
    },
	email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        min: 6,
        required: true
    },
	birthday: {
        type: Date,
        required: true
    },
	gender: {
        type: String,
        required: true
    },
    numPosts: {
        type: Number,
        default: 0
    },
    numComments: {
        type: Number,
        default: 0
    },
    profile_pic: {
        type: String,
        default: "/images/profile_pic/default.jpg"
    },
    watchlists: [{
        type: mongoose.Schema.ObjectId, ref: 'Watchlist'
    }],
    reviews: [{
        type: mongoose.Schema.ObjectId, ref: 'Review'
    }]
});

const UserInfo = mongoose.model('UserInfo', UserInfoSchema);

module.exports = UserInfo;