const userModel = require('../database/User-Info');
const { validationResult } = require('express-validator');





//TO BE EDITED
const userController = {


    //Might be temporary
    getSignup: function (req, res) {
        res.render('signup');
    },

    signup: function (req, res) {
        const errors = validationResult(req);
    
        if (errors.isEmpty()) {
            const {email, username, password, repassword} = req.body;
    
            res.redirect('/get-login');
        }
        else {
            const messages = errors.array().map((item) => item.msg);
    
            req.flash('error_msg', messages.join(' '));
    
            res.redirect('/get-signup');
        }
    },

    getLogin: function (req, res) {
        res.render('login');
    },


    login: function (req, res) {
        res.render('/');
    },

    saveSettings: function (req, res) {
        var query = {user: req.params.idNum};

        db.findMany(Comment, query, null, function(result) {
            res.render('../views/partials/comment', query);
        });
    }
};

module.exports = userController;

