const watchlist = require ('../database/Watchlist');
const user = require ('../database/User-Info');
const db = require ('../database/db');
const { ObjectId } = require('mongodb');


const WatchlistController = {

    newWatchlist: function (req, res) {
        var query = {"_id": ObjectId(req.session.user)};
        console.log('Creating new watchlist');

        var newWatchlist = {
            title: req.body.watchlist_name,
            description: req.body.watchlist_description
        }

        // add to watchlist collection
        db.insertOne(watchlist, newWatchlist, function(data) {
            // update user's watchlist array
            db.updateOne(user, query, {$push: {"watchlists": data}}, function() {
                res.redirect("back");
            });
        });
    },

    editWatchlist: function (req, res) {
        var query = {_id: req.params.idNum};
        console.log('Editing new watchlist');
    },

    addToWatchlist: function(req, res) {
        console.log("In WatchlistController.addToWatchlist")
        var watchlistId = ObjectId(req.body.watchlistId);
        var showId = ObjectId(req.body.showId);

        // add to watchlist the show
        // If doesn't exist only
        db.updateOne(watchlist, {"_id": watchlistId}, {$push: {shows: showId}, $inc: {item_count: 1}}, function() {
            res.redirect("back");
        });
    }
};




module.exports = WatchlistController;