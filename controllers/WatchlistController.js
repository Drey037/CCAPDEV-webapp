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

    editWatchlist: function(req, res) {
        var watchlistId = ObjectId(req.body.watchlistId);
        db.findOne(watchlist, {"_id": watchlistId}, null, async function(result) {
            var response = {
                watchlistId: req.body.watchlistId,
                title: result.title,
                description: result.description,
                watchlist_item: [],
                edit: true
            };

            var populatedShows = await result.populate('shows');
            response.watchlist_item = populatedShows.shows;
            res.render('user-pages/edit_watchlist', response);
        });
    },

    removeFromWatchlist: function(req, res) {
        console.log("In WatchlistController.removeFromWatchlist");
        var watchlistId = ObjectId(req.body.watchlistId);
        var showId = ObjectId(req.body.showId);
        db.updateOne(watchlist, {"_id": watchlistId}, {$pull: {shows: showId}, $inc: {item_count: -1}}, function() {});
    },

    saveWatchlist: function(req, res) {
        var watchlistId = ObjectId(req.body.watchlistId);
        var title = req.body.watchlist_name;
        var description = req.body.watchlist_description;

        db.updateOne(watchlist, {"_id": watchlistId}, {title: title, description: description}, function() {
            res.redirect('/view-watchlist/' + req.body.watchlistId + '/own');
        });
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
    },

    deleteWatchlist: function(req, res) {
        var watchlistId = ObjectId(req.params.watchlistId);
        db.deleteOne(watchlist, {"_id": watchlistId}, function() {
            res.redirect('/user-watchlists/own');
        });
    }
};




module.exports = WatchlistController;