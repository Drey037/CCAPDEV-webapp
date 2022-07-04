// Controllers contain functions that are routed in routers, to be called in forms
const reviewModel = require('../database/Review');
const db = require('../database/db');
const User = require('../database/User-Info.js');

const controller = {
    getIndex: function(req, res) {
        // db.findMany(reviewModel, {}, null, async function(result) {
        //     var users = await result.populate("user");
        //     var shows = await result.populate("show");
        //     db.findOne(User, {"_id": req.session.user}, null, async function(data) {
        //         var watchlist = null;
        //         if(req.session.user != null) {
        //             var populatedData = await data.populate("watchlists");
        //             watchlist = populatedData.watchlists;
        //         }

                

        //         console.log("Logged in: " + req.session.username);
        //         res.render('index', {watchlist: watchlist, username: req.session.username, profile_pic: req.session.profile_pic, review: result, show: shows.show, user: users.user} );
        //     });
        // })
        res.render('index', {username: req.session.username, profile_pic: req.session.profile_pic});
        
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
