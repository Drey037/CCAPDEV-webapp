// Controllers contain functions that are routed in routers, to be called in forms
const reviewModel = require('../database/Review');
const db = require('../database/db');
const User = require('../database/User-Info.js');
const Show = require('../database/Show-Info');
const { ObjectId } = require('mongodb');

const controller = {
    getIndex: async function(req, res) {
        let response = {
            username: '',
            profile_pic: req.session.profile_pic,
            reviews: [],
            watchlists: [],
        };

        // Gets all reviews
        var found_reviews = await reviewModel.find();

        // Gets logged in user
        if(req.session.user != null) {
            var found_user = await User.findById(req.session.user);
            var populatedData = await found_user.populate("watchlists");
            response.username = found_user.username;
            response.watchlists = populatedData.watchlists;
        }

        // Gets User data of each review
        for (let i = 0; i < found_reviews.length; i++) {
            var found_user = await User.findById(found_reviews[i].user);
            var username = '';
            var otherUserId = null;
            if(!found_user) {
                username = found_user.username;
                otherUserId = ObjectId(found_user._id);
            }
            else
                username = "Deleted User";

            // Gets Show data of each review
            var found_show = await Show.findById(found_reviews[i].show);
            response.reviews.push({
                title: found_show.title,
                genre: found_show.genre,
                poster: found_show.image,
                description: (found_reviews[i].description).substring(0, 200) + "...View more",
                username: username,
                reviewID: found_reviews[i]._id,
                showID: found_reviews[i].show,
                otherUserId: otherUserId
            });            
        }
            
        console.log("Number of reviews is " + found_reviews.length);
        console.log("Logged in: " + req.session.username);
        res.render('index', response);
        
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
