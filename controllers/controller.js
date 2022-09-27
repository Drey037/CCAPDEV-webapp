// Controllers contain functions that are routed in routers, to be called in forms
const reviewModel = require('../database/Review');
const db = require('../database/db');
const User = require('../database/User-Info.js');
const Show = require('../database/Show-Info');
const { ObjectId } = require('mongodb');

const controller = {
    getIndex: async function(req, res) {
        let indexData = {
            username: req.session.user,
            profile_pic: req.session.profile_pic,
            reviews: [],
            watchlists: [],
        };

        // Gets all reviews
        var raw_reviews = [];
        await db.findMany(reviewModel, {}, null, function(result) {
            raw_reviews = result;
            var otherUserId = null;
        });

        // Gets logged in user
        await db.findOne(User, {"_id": req.session.user}, null, async function(data) {
            if(req.session.user != null) {
                var populatedData = await data.populate("watchlists");
                indexData.watchlists = populatedData.watchlists;
            }
        });

        // Gets User data of each review
        var username = '';
        for (let i = 0; i < raw_reviews.length; i++) {
            await db.findOne(User, {"_id": raw_reviews[i].user}, null, function(userData) {
                var otherUserId = null;
                if (userData != null) {
                    username = userData.username;
                    var userId = ObjectId(userData._id);
                    if(req.session.user != userId)
                        otherUserId = userId;
                }
                else {
                    username = "Deleted User";
                }

            });

            // Gets Show data of each review
            await db.findOne(Show, {"_id": raw_reviews[i].show}, null, async function(showData) {
                var title = showData.title;
                var genre = showData.genre;
                var poster = showData.image;

                var description = raw_reviews[i].description;
                description = description.substring(0, 200) + "...View more";

                indexData.reviews.push({
                    title: title,
                    genre: genre,
                    poster: poster,
                    description: description,
                    username: username,
                    reviewID: raw_reviews[i].id,
                    showID: raw_reviews[i].show,
                    otherUserId: otherUserId
                });
            });
            
        }
            
        console.log("Number of reviews is " + raw_reviews.length);
        console.log("Logged in: " + req.session.username);
        res.render('index', indexData);
        
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
