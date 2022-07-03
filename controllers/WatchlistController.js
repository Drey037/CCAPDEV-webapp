const watchlist = require ('../database/Watchlist');
const user = require ('../database/User-Info');
const db = require ('../database/db');
const { ObjectId } = require('mongodb');


const WatchlistController = {

    newWatchlist: function (req, res) {
        var query = {"_id": ObjectId(req.session.user)};
        console.log(query);
        console.log('Creating new watchlist');

        var newWatchlist = {
            title: req.body.watchlist_name,
            description: req.body.watchlist_description
        }

        // add to watchlist collection
        db.insertOne(watchlist, newWatchlist, function(data) {
            // update user's watchlist array
            var update = {$push: {"watchlists": data}};
            db.updateOne(user, query, update, function() {
                res.redirect("back");
            });
        });
    },

    editWatchlist: function (req, res) {
        var query = {_id: req.params.idNum};
        console.log('Editing new watchlist');
    },
};




module.exports = WatchlistController;