const mongoose = require('mongoose');

const LogInInfoSchema = new mongoose.Schema({
	Username: String
	Password: String
});

const LogInInfo = mongoose.model('LogInInfo', LogInInfoSchema);

module.exports = LogInInfo;