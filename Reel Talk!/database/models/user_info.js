const mongoose = require('mongoose');

const UserInfoSchema = new mongoose.Schema({
	Username : String
	Email-address: String
	Name: String
	Birthday: Date
	Gender: String
});

const UserInfo = mongoose.model('UserInfo', UserInfoSchema);

module.exports = UserInfo;