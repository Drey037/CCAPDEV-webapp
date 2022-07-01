const express = require('express');
const controller = require('../controllers/controller.js');

const app = express();

app.get('/', controller.getIndex);

//For user
app.get('/save-settings', userController.saveSettings);

//For reviews
app.get('/create-review', reviewController.createReview);

//For comment
app.get('/comment', CommentController.comment);

//For Watchlist
app.get('/edit-watchlist', WatchlistController.editWatchList);
app.get('/new-watchlist', WatchlistController.newWatchList);

module.exports = app;
