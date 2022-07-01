const { body } = require('express-validator');

const registerValidation = [
    body('email').not().isEmpty().withMessage("Please enter an email address.")
    .isEmail().withMessage("Please enter a valid email address."),

    body('username').not().isEmpty().withMessage("Please enter a username."),

    body('password').isLength({ min:6 }).withMessage("Password must be at least 6 characters long."),

    body('repassword').isLength({min:6}).withMessage("Password must be at least 6 characters long.")
    .custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error("Passwords must match.");
        }
        return true;
    })
];

module.exports = { registerValidation };
