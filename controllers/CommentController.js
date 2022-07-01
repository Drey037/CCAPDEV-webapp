const Comment = require ('../database/Comment');
const db = require ('../database/db');


const CommentController = {

    getComments: function (req, res) {
        var query = {user: req.params.idNum};

        db.findMany(Comment, query, null, function(result) {
            res.render('../views/partials/comment', query);
        });
    },
    
    comment: function (req, res) {
        db.insertOne(Transaction, req.query, function(result) {
            res.render('../', req.query, function(err, html) {
                res.send(html);
            });
        });
    },

    
};



module.exports = CommentController;