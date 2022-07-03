const mongoose = require('mongoose');

const WatchlistSchema = new mongoose.Schema({
    title: {type: String},
    description: {type: String},
    shows: [{type: mongoose.Schema.ObjectId, ref: 'ShowInfo',}],
    item_count: {
        type: Number,
        default: 0
    }
});

const Watchlist = mongoose.model('Watchlist', WatchlistSchema);

module.exports = Watchlist;