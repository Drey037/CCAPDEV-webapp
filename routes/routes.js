const express = require('express');
const controller = require('../controllers/controller.js');
const SearchController = require('../controllers/SearchController.js');

const app = express();

app.get('/', controller.getIndex);

app.get('/search', SearchController.search);

module.exports = app;
