const review = require ('../database/Review');
const db = require ('../database/db');


const ReviewController = {
    getCreateReview: function (req, res) {
        console.log('Opening new Review');


    },

    createReview: function (req, res) {
        console.log('Creating new Review');


    }
};


module.exports = ReviewController;
