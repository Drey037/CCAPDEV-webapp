const review = require ('../database/Review');
const show = require ('../database/Show-Info');
const db = require ('../database/db');
const { ObjectId } = require('mongodb');


const ReviewController = {
    getCreateReview: function (req, res) {
        console.log('Opening new Review');
        db.findOne(show, {"_id": req.params.showId}, null, function(result) {
            console.log(result);
            res.render('create_review', {username: req.session.username, profile_pic: req.session.profile_pic, title: result.title, year: result.year, image: result.image });
        });
    },

    
    createReview: function (req, res) {
        console.log('Creating new Review');

    },

    deleteReview: function(req, res) {
        console.log("In ReviewController.deleteReview")
        var reviewId = ObjectId(req.query.reviewId);

        db.deleteOne(review, {"_id": reviewId}, null);
    },

    updateReview: function (req, res) {
        console.log('Updating Review');

    }
    
};


module.exports = ReviewController;
