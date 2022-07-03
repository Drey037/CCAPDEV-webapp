const review = require ('../database/Review');
const db = require ('../database/db');
const { ObjectId } = require('mongodb');


const ReviewController = {
    getCreateReview: function (req, res) {
        console.log('Opening new Review');


    },

    createReview: function (req, res) {
        console.log('Creating new Review');


    },

    deleteReview: function(req, res) {
        console.log("In ReviewController.deleteReview")
        var reviewId = ObjectId(req.query.reviewId);

        db.deleteOne(review, {"_id": reviewId}, null);
    }
};


module.exports = ReviewController;
