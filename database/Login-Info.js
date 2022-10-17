const mongoose = require('mongoose');

const LogInInfoSchema = new mongoose.Schema({
	Username: {
        type: String,
        required: true
    },
	Password: {
        type: String,
        required: true
    }
});

const LogInInfo = mongoose.model('LogInInfo', LogInInfoSchema);

module.exports = LogInInfo;