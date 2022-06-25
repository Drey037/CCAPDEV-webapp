const mongoose = require('mongoose');

const UserInfoSchema = new mongoose.Schema({
	username : String,
	email: String,
	name: String,
	birthday: Date,
	gender: String
});

const UserInfo = mongoose.model('UserInfo', UserInfoSchema);

module.exports = UserInfo;