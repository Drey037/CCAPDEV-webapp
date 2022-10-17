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


module.exports = app;
