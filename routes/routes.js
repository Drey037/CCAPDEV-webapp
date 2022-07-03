const express = require('express');
const controller = require('../controllers/controller.js');
const SearchController = require('../controllers/SearchController.js');
const userController = require('../controllers/userController.js');
const reviewController = require('../controllers/ReviewController.js');
const commentController = require('../controllers/CommentController.js');
const watchlistController = require('../controllers/WatchlistController.js');
const { isPrivate, isPublic } = require('../middlewares/checkAuth');

const app = express();




app.get('/', controller.getIndex);

app.get('/about', controller.getAbout);

//For search bar
app.get('/search', SearchController.search);
app.get('/search-genre/:category/:genre', SearchController.searchGenre);

//For user settings and toher user related things
app.get('/view-profile', isPrivate, userController.viewProfile);
app.get('/account-settings', isPrivate,  userController.viewSettings);
app.get('/view-watchlists', isPrivate,  userController.viewWatchlists);


app.post('/save-settings', isPrivate, userController.saveSettings);

//For reviews
app.get('/get-create-review', reviewController.getCreateReview);
app.post('/create-review', reviewController.createReview);

//For comment
app.get('/comment', commentController.comment);

//For Watchlist
app.get('/edit-watchlist', watchlistController.editWatchlist);
app.post('/new-watchlist', watchlistController.newWatchlist);


module.exports = app;
