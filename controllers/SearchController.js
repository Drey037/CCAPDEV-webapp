const db = require('../database/db.js');
const ShowInfo = require('../database/Show-Info.js');
const Review = require('../database/Review.js');

// Handles requests related to the search bar

const SearchController = {
    // Only searches for titles and reviews of those titles
    search: function(req, res) {
        var searchQuery = req.query.searchQuery;
        var response = {active: null, review: null};

        var titleSearchArr = [];
        searchQuery.split(" ").forEach(element => {
            titleSearchArr.push({"title": /element/});
        });
        var showQuery = {$or: titleSearchArr};

        // Gets shows that has query in the title
        db.findMany(ShowInfo, showQuery, null, function(data) {
            if(data != null) {
                response.active = data[0];
                response.carousel_items = data.slice(1, data.length);
            }
        });

        var foundTitles = [response.active].concat(response.carousel_items);
        var reviewSearchArr = [];
        foundTitles.forEach(element => {
            reviewSearchArr.push({"show": element._id});
        });
        var reviewQuery = {$or: reviewSearchArr};

        // Gets reviews from each returned title
        if(response.active != null) {
            db.findMany(Review, reviewQuery, null, function(data) {
                if(data != null)
                    response.review = data;
            });
        }

        res.render('search_results', response);
        
    }
};

module.exports = SearchController;
