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
	name: {
        type: String,
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
        required: true
    },
    numComments: {
        type: Number,
        required: true
    }
});

const UserInfo = mongoose.model('UserInfo', UserInfoSchema);

module.exports = UserInfo;