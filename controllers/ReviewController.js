const review = require ('../database/Review');
const user = require('../database/User-Info');
const show = require ('../database/Show-Info');
const db = require ('../database/db');
const { ObjectId } = require('mongodb');
const Comment = require('../database/Comment');
const { comment } = require('./CommentController');


const ReviewController = {
    getCreateReview: function (req, res) {
        console.log('Opening new Review');
        db.findOne(show, {"_id": req.params.showId}, null, function(result) {
            res.render('create_review', {showId: req.params.showId, username: req.session.username, profile_pic: req.session.profile_pic, title: result.title, year: result.year, image: result.image });
        });
    },

    
    createReview: function (req, res) {
        console.log('Creating new Review');
        var newReview = {
            show: ObjectId(req.body.showId),
            description: req.body.description,
            user: req.session.user,
            rating: parseInt(req.body.rating)
        };

        db.insertOne(review, newReview, function(result) {
            db.updateOne(user, {"_id": req.session.user}, {$push: {reviews: result}, $inc: {numPosts: 1}}, function(){
                res.redirect('/get-review-page/' + result._id);
            })
            
        });
    },

    deleteReview: function(req, res) {
        console.log("In ReviewController.deleteReview")
        var reviewId = ObjectId(req.query.reviewId);

        db.deleteOne(review, {"_id": reviewId}, null);
    },

    updateReview: function (req, res) {
        console.log('Updating Review');

    },

    getReviewPage: function(req, res) {
        console.log("Displaying review page");
        var reviewId = ObjectId(req.params.reviewId);

        db.findOne(review, {"_id": reviewId}, {}, async function(result) {
            var populatedReview = await result.populate("show");
            var show = populatedReview.show;
            var comments = [];

            //console.log(result.comments);

            if (req.session.user != null) {
                if (result.comments != null) {
                    for (let i = 0; i < result.comments.length; i++) {
                        db.findOne(Comment, {"_id": result.comments[i]}, {}, async function(commentResult) {
                            db.findOne(user, {"_id": commentResult.user}, {}, async function(userResult) {
                                //var user = await commentResult.populate("user");
                                if (userResult == null) {
                                    var username = "Deleted User";
                                    var image = "/images/profile_pic/default.jpg";
                                }
                                else {
                                    var username = userResult.username;
                                    var image = userResult.profile_pic;
                                }
    
                                comments.push ({
                                    username: username,
                                    profile_pic: image,
                                    content: commentResult.comment,
                                });
                                    
    
                                var response = {
                                    image: show.image,
                                    video: show.video,
                                    title: show.title,
                                    year: show.year,
                                    description: show.description,
                                    director: show.director,
                                    cast: show.cast,
                                    review_content: result.description,
                                    username: req.session.username,
                                    profile_pic: req.session.profile_pic,
                                    comments: comments,
                                    showid: show.id,
                                    reviewid: result.id
                                };
    
                                if (i == result.comments.length-1) {
                                    db.findOne(user, {"_id": req.session.user}, null, function(result) {
                                        response.user_image = result.profile_pic;
                                        res.render('review_page', response);
                                    });
                                }
    
                            })
                        });
                    }
                }
                else {
                    var response = {
                        image: show.image,
                        video: show.video,
                        title: show.title,
                        year: show.year,
                        description: show.description,
                        director: show.director,
                        cast: show.cast,
                        review_content: result.description,
                        username: req.session.username,
                        profile_pic: req.session.profile_pic,
                        showid: show.id,
                        reviewid: result.id
                    };
    
                    db.findOne(user, {"_id": req.session.user}, null, function(result) {
                        response.user_image = result.profile_pic;
                        res.render('review_page', response);
                    });
                }
            }
            else {
                if (result.comments != null) {
                    for (let i = 0; i < result.comments.length; i++) {
                        db.findOne(Comment, {"_id": result.comments[i]}, {}, async function(commentResult) {
                            db.findOne(user, {"_id": commentResult.user}, {}, async function(userResult) {
                                //var user = await commentResult.populate("user");
                                if (userResult == null) {
                                    var username = "Deleted User";
                                    var image = "/images/profile_pic/default.jpg";
                                }
                                else {
                                    var username = userResult.username;
                                    var image = userResult.profile_pic;
                                }

                                comments.push ({
                                    username: username,
                                    profile_pic: image,
                                    content: commentResult.comment,
                                });
                                    

                                var response = {
                                    image: show.image,
                                    video: show.video,
                                    title: show.title,
                                    year: show.year,
                                    description: show.description,
                                    director: show.director,
                                    cast: show.cast,
                                    review_content: result.description,
                                    comments: comments,
                                    showid: show.id,
                                    reviewid: result.id
                                };

                                if (i == result.comments.length-1) {
                                   res.render('review_page', response);
                                }
                            })
                        });
                    }
                }
                else {
                    var response = {
                        image: show.image,
                        video: show.video,
                        title: show.title,
                        year: show.year,
                        description: show.description,
                        director: show.director,
                        cast: show.cast,
                        review_content: result.description,
                        showid: show.id,
                        reviewid: result.id
                    };
                    res.render('review_page', response);
                }
            }
        });   
    }
    
};


module.exports = ReviewController;
