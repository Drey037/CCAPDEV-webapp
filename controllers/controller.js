// Controllers contain functions that are routed in routers, to be called in forms
const reviewModel = require('../database/Review');
const db = require('../database/db');

const controller = {
    getIndex: function(req, res) {
        db.findMany(reviewModel, {}, null, function(result) {
            res.render('index', {username: req.session.username, profile_pic: req.session.profile_pic, review: result} );
        })
    },

    getAbout: function(req, res) {
        res.render("about", {
            pageTitle: 'About',
            username: req.session.username,
            profile_pic: req.session.profile_pic
        });
    }
};

module.exports = controller;
