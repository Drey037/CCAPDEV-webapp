const userModel = require('../database/User-Info');
const { validationResult } = require{'express-validator'};

exports.signup = (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const {name, email, password} = req.body;

        res.redirect('/login');
    }
    else {
        const messages = errors.array().map((item) => item.msg);

        req.flash('error_msg', messages.join(' '));

        res.redirect('/signup');
    }
};

exports.login = (req, res) => {

}


