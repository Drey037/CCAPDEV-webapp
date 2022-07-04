// Controllers contain functions that are routed in routers, to be called in forms
const reviewModel = require('../database/Review');
const db = require('../database/db');
const User = require('../database/User-Info.js');
const Show = require('../database/Show-Info');
const { ObjectId } = require('mongodb');

const controller = {
    getIndex: function(req, res) {
        db.findMany(reviewModel, {}, null, function(result) {
            var reviews = [];
            var otherUserId = null;

            /*
            for (let i = 0; i , result.length; i++) {
                db.findOne(reviewModel, {"_id": result[i].id}, null, async function(reviewData) {

                    var populatedData = await data.populate("watchlists");
                    watchlist = populatedData.watchlists;
                    reviews.push(userData);
                });
            }
            */
            db.findOne(User, {"_id": req.session.user}, null, async function(data) {
                if(req.session.user != null) {
                    var populatedData = await data.populate("watchlists");
                    var watchlist = populatedData.watchlists;
                }

                for (let i = 0; i < result.length; i++) {
                    db.findOne(User, {"_id": result[i].user}, null, async function(userData) {
                        var otherUserId = null;
                        if (userData != null) {
                            var username = userData.username;
                            var userId = ObjectId(userData._id);
                            if(req.session.user != userId)
                                otherUserId = userId;
                        }
                        else {
                            var username = "Deleted User";
                        }
    
                        db.findOne(Show, {"_id": result[i].show}, null, async function(showData) {
                            var title = showData.title;
                            var genre = showData.genre;
                            var poster = showData.image;

                            var description = result[i].description;
                            description = description.substring(0, 200) + "...View more";
    
                            reviews.push({
                                title: title,
                                genre: genre,
                                poster: poster,
                                description: description,
                                username: username,
                                reviewID: result[i].id,
                                showID: result[i].show,
                                otherUserId: otherUserId
                            });

                            if (i == result.length-1) {
                                console.log("Number of reviews is " + reviews.length);
                                console.log("Logged in: " + req.session.username);
                                res.render('index', {watchlist: watchlist, username: req.session.username, profile_pic: req.session.profile_pic, review: reviews} );
                                //res.render('index', {watchlist: watchlist, username: req.session.username, profile_pic: req.session.profile_pic, review: result} );
                            }
                        });
                    });
                }
            });
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
