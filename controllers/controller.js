// Controllers contain functions that are routed in routers, to be called in forms
const reviewModel = require('../database/Review');
const db = require('../database/db');
const User = require('../database/User-Info.js');

const controller = {
    getIndex: function(req, res) {
        db.findMany(reviewModel, {}, null, function(result) {
            if(req.session.user != null) {
                db.findOne(User, {"_id": req.session.user}, null, async function(data) {
                    var populatedData = await data.populate("watchlists");
                    res.render('index', {watchlist: populatedData.watchlists, username: req.session.username, profile_pic: req.session.profile_pic, review: result} );
                });
            }
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
