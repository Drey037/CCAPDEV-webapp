const express = require('express');
const controller = require('../controllers/controller.js');
const SearchController = require('../controllers/SearchController.js');
const userController = require('../controllers/userController.js');
const reviewController = require('../controllers/ReviewController.js');
const commentController = require('../controllers/CommentController.js');
const watchlistController = require('../controllers/WatchlistController.js');


const app = express();

app.get('/', controller.getIndex);

app.get('/search', SearchController.search);
//For user
app.get('/save-settings', userController.saveSettings);

//For reviews
app.get('/create-review', reviewController.createReview);

//For comment
app.get('/comment', commentController.comment);

//For Watchlist
app.get('/edit-watchlist', watchlistController.editWatchlist);
app.get('/new-watchlist', watchlistController.newWatchlist);

module.exports = app;
