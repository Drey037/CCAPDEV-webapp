const mongoose = require('mongoose');

const WatchlistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    shows: [{
        type: mongoose.Schema.ObjectId, ref: 'ShowInfo',
        required: true
    }],
    item_count: {
        type: Number,
        required: true
    }
});

const Watchlist = mongoose.model('Watchlist', WatchlistSchema);

module.exports = Watchlist;