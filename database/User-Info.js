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
	name: {
        type: String,
    },
	birthday: {
        type: Date
    },
	gender: {
        type: String
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
    }
});

const UserInfo = mongoose.model('UserInfo', UserInfoSchema);

module.exports = UserInfo;