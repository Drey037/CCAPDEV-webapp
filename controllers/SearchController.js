const db = require('../database/db.js');
const ShowInfo = require('../database/Show-Info.js');
const Review = require('../database/Review.js');
const User = require('../database/User-Info.js');
const { ObjectId } = require('mongodb');

// Handles requests related to the search bar

const SearchController = {
    // Searches for titles and reviews of those titles
    // and renders results on search_results.hbs
    search: function(req, res) {
        console.log("In SearchController.search");
        var searchQuery = req.query.searchQuery;
        var response = {
            active: null,
            carousel_items: [],
            review: [],
            watchlist: [],
            username: req.session.username,
            profile_pic: req.session.profile_pic,
            id: req.session.user
        };

        var titleSearchArr = [];
        searchQuery.split(" ").forEach(element => {
            titleSearchArr.push({"title": new RegExp(element, 'i')});
        });
        var showQuery = {$or: titleSearchArr};

        // Gets shows that has query in the title
        db.findMany(ShowInfo, showQuery, null, function(data) {
            if(data.length > 0) {
                response.active = data[0];
                if(data.length > 1)
                    response.carousel_items = data.slice(1, data.length);

                var foundTitles = [response.active].concat(response.carousel_items);
                var reviewSearchArr = [];
                foundTitles.forEach(element => {
                    reviewSearchArr.push({"show": element._id});
                });
                var reviewQuery = {$or: reviewSearchArr};
    
                // Gets reviews from each returned title
                db.findMany(Review, reviewQuery, null, async function(data) {
                    if(data.length > 0) {
                        for(var i = 0; i < data.length; i++) {
                            response.review.push(await data[i].populate("show"));
                        }
                    }

                    // Gets user's watchlists
                    db.findOne(User, {"_id": req.session.user}, null, async function(data) {
                        if(data != null) {
                            var populatedData = await data.populate("watchlists");
                            response.watchlist = populatedData.watchlists;
                        }
                        res.render('search_results', response);
                    });
                    
                });
                
            }
            
        });
        
    },

    searchGenre: async function(req, res) {
        console.log("In SearchController.searchGenre");
        var category = req.params.category
        var genre = req.params.genre.toLowerCase();
        var response = {
            active: null,
            carousel_items: [],
            review: [],
            watchlist: [],
            username: req.session.username,
            profile_pic: req.session.profile_pic,
            id: req.session.user
        };

        if(category == "Movies")
            category = "movie";
        else if(category == "TV Shows")
            category = "series"
        else if(category == "Anime")
            category = "anime"

        // get all movie/show/anime of this genre
        var found_shows = await ShowInfo.find({category: category, genre: genre});
        
        if(found_shows.length > 0) {
            response.active = found_shows[0];
            if(found_shows.length > 1)
                response.carousel_items = found_shows.slice(1, found_shows.length);
        }

        var reviewSearchArr = [];
        found_shows.forEach(element => {
            reviewSearchArr.push({"show": element._id});
        });

        // Gets reviews from each returned title
        var found_reviews = await Review.find({$or: reviewSearchArr});
        if(found_reviews.length > 0) {
            for(var i = 0; i < found_reviews.length; i++)
                response.review.push(await found_reviews[i].populate("show"));
        }

        // Gets user's watchlists
        if(req.session.user != null) {
            var found_user = await User.findById(req.session.user);
            var populatedData = await found_user.populate("watchlists");
            response.watchlist = populatedData.watchlists;
        }

        res.render('search_results', response);
    }
};

module.exports = SearchController;
