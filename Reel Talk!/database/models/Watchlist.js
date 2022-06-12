const mongoose = require('mongoose');

const WatchlistSchema = new mongoose.Schema({
    title: String,
    description: String,
    shows: [{type: mongoose.Schema.ObjectId, ref: 'Show-information'}],
    item_count: Number
});

const Watchlist = mongoose.model('Watchlist', WatchlistSchema);

module.exports = Watchlist;