const watchlist = require ('../database/Watchlist');
const db = require ('../database/db');


const WatchlistController = {

    newWatchlist: function (req, res) {
        var query = {user: req.params.idNum};
        console.log('Creating new watchlist');
    },

    editWatchlist: function (req, res) {
        var query = {user: req.params.idNum};
        console.log('Editing new watchlist');
    } 
};




module.exports = WatchlistController;