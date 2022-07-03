const userModel = require('../database/User-Info.js');
const db = require('../database/db');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const watchlist = require('../database/Watchlist.js');




//TO BE EDITED
const userController = {


    signup: function (req, res) {
        const errors = validationResult(req);
    
        if (errors.isEmpty()) {
            const {email, username, password, birthday, gender} = req.body;
    
            db.findOne(userModel, { email: email }, null, (result) => {
                if (result) {
                  console.log(result);
                  // found a match, return to login with error
                  req.flash('error_msg', 'User already exists. Please login.');
                  res.redirect('/get-login');
                } else {
                    const saltRounds = 10;

                    bcrypt.hash(password, saltRounds, (err, hashed) => {
                        const newUser = {
                            username: username,
                            email: email,
                            password: hashed,
                            birthday: birthday,
                            gender: gender
                        };

                        db.insertOne(userModel, newUser, (result) => {
                            if (result) {
                                console.log("Succesfully registered");
                                req.flash('success_msg', 'You are now registered! Login below.');
                                res.redirect('/get-login');
                            } else {
                                req.flash('error_msg', 'Could not create user. Please try again.');
                                console.log("Could not create user. Please try again.");
                                res.redirect('/get-signup');
                            }
                        });
                    });
                }
              });
        }
        else {
            const messages = errors.array().map((item) => item.msg);

            for (let i = 0; i < messages.length; i++) {
                messages[i] = "- " + messages[i];
            }

            req.flash('error_msg', messages.join("\r"));
    
            res.redirect('/get-signup');
        }
    },

    login: function (req, res) {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
        const {email, password} = req.body;

        db.findOne(userModel, { email: email }, null, (result) => {
            if (result) {
            // User found!
                // Check password with hashed value in the database
                bcrypt.compare(password, result.password, (err, att) => {
                    if (att) {
                    req.session.user = result._id;
                    req.session.username = result.username;
                    req.session.profile_pic = result.profile_pic;
                
                    console.log(req.session);

                    req.flash('logged-in')
                
                    res.redirect('/');
                    } else {
                    // passwords don't match
                    req.flash('error_msg', 'Incorrect password. Please try again.');
                    res.redirect('/get-login');
                    }
                });

            } else {
            // No user found
            req.flash('error_msg', 'Email is not registered. Please sign up.');
            res.redirect('/get-signup');
            }
          });
        } else {
        const messages = errors.array().map((item) => item.msg);

        for (let i = 0; i < messages.length; i++) {
            messages[i] = "- " + messages[i];
        }

        req.flash('error_msg', messages.join("\r"));
        res.redirect('/get-login');
        }
    },

    logout: function(req, res) {
        if (req.session) {
            req.session.destroy(() => {
                res.clearCookie('connect.sid');
                res.redirect('/get-login');
            });
        }
    },

    viewSettings: function(req, res) {
        if (req.session) {
            db.findOne(userModel, { username: req.session.username }, null, (result) => {
                res.render('user-pages/user_settings', {username: result.username, email: result.email, gender: result.gender,
                    numPosts: result.numPosts, numComments: result.numComments, profile_pic: result.profile_pic, });
            });
        }
    },

    // NOT TESTED; NEED REVIEWS
    userReviews: function(req, res) {
        if (req.session) {
            db.findOne(userModel, { username: req.session.username }, null, async (result) => {
                var response = {
                    username: result.username,
                    gender: result.gender,
                    numPosts: result.numPosts,
                    numComments: result.numComments,
                    profile_pic: result.profile_pic,
                    reviews: []
                };

                var populatedResults = await result.populate('reviews');
                var populatedReviews = [];

                for(var i = 0; i < result.reviews.length; i++) {
                    var review = await populatedResults.reviews[i].populate('show').populate('comments').populate('user');
                    populatedReviews.push(review);
                }

                response.reviews = populatedReviews;

                res.render('user-pages/user_reviews', response);
            });
        }
    },

    userWatchlists: function(req, res) {
        if (req.session) {
            db.findOne(userModel, { username: req.session.username }, null, async (result) => {
                var response = {
                    username: result.username,
                    gender: result.gender,
                    numPosts: result.numPosts,
                    numComments: result.numComments,
                    profile_pic: result.profile_pic,
                    watchlist: []
                };

                var populatedResults = await result.populate('watchlists');
                var populatedWatchlists = [];

                for(var i = 0; i < populatedResults.watchlists.length; i++) {
                    populatedWatchlists.push(await populatedResults.watchlists[i].populate('shows'));
                    populatedWatchlists[i].greaterThanFour = (populatedWatchlists[i].item_count > 4);
                }

                response.watchlist = populatedWatchlists;
                
                res.render('user-pages/user_watchlists', response);
            });
        }
    },

    viewWatchlist: function(req, res) {
        var watchlistId = ObjectId(req.params.watchlistId);
        db.findOne(watchlist, {"_id": watchlistId}, null, async function(result) {
            var response = {
                id: req.params.watchlistId,
                title: result.title,
                description: result.description,
                watchlist_item: [],
                edit: true
            };

            var populatedShows = await result.populate('shows');
            response.watchlist_item = populatedShows.shows;
            res.render('user-pages/view_watchlist', response);
        });
    },

    editWatchlist: function(req, res) {
        var watchlistId = ObjectId(req.params.watchlistId);
        db.findOne(watchlist, {"_id": watchlistId}, null, async function(result) {
            var response = {
                id: req.params.watchlistId,
                title: result.title,
                description: result.description,
                watchlist_item: [],
                edit: true
            };

            var populatedShows = await result.populate('shows');
            response.watchlist_item = populatedShows.shows;
            res.render('user-pages/edit_watchlist', response);
        });
    },

    saveSettings: function (req, res) {
        var query = {user: req.params.idNum};

        db.findMany(Comment, query, null, function(result) {
            res.render('../views/partials/comment', query);
        });
    }
};

module.exports = userController;

