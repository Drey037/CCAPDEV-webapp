const express = require('express');
const controller = require('../controllers/controller.js');
const SearchController = require('../controllers/SearchController.js');
const userController = require('../controllers/userController.js');
const reviewController = require('../controllers/ReviewController.js');
const commentController = require('../controllers/CommentController.js');
const watchlistController = require('../controllers/WatchlistController.js');
const { isPrivate, isPublic } = require('../middlewares/checkAuth');
const {settingsValidation} = require('../validators');

const app = express();




app.get('/', controller.getIndex);

app.get('/about', controller.getAbout);

//For search bar
app.get('/search', SearchController.search);
app.get('/search-genre/:category/:genre', SearchController.searchGenre);

//For user settings and other user related things
app.get('/account-settings', isPrivate,  userController.viewSettings);
app.get('/edit-settings', isPrivate, settingsValidation, userController.editSettings);

app.get('/user-reviews', isPrivate, userController.userReviews);    // TODO
app.get('/user-watchlists', isPrivate,  userController.userWatchlists);
app.get('/view-watchlist/:watchlistId', userController.viewWatchlist);

app.post('/delete-user', isPrivate, userController.deleteUser);


app.post('/save-settings', isPrivate, userController.saveSettings);

//For reviews
// app.get('/get-create-review', isPrivate, reviewController.getCreateReview);
app.get('/get-create-review/:showId', isPrivate, reviewController.getCreateReview);
app.post('/create-review', isPrivate, reviewController.createReview);
app.get('/get-review-page/:reviewId', reviewController.getReviewPage);


//For comment
app.get('/comment', commentController.comment);

//For Watchlist
app.post('/edit-watchlist', isPrivate, watchlistController.editWatchlist);
app.post('/save-watchlist', watchlistController.saveWatchlist);
app.post('/new-watchlist', isPrivate, watchlistController.newWatchlist);
app.post('/add-to-watchlist', isPrivate, watchlistController.addToWatchlist);
app.post('/remove-from-watchlist', watchlistController.removeFromWatchlist);
app.get('/delete-watchlist/:watchlistId', watchlistController.deleteWatchlist);


module.exports = app;
