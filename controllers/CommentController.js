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
       var reply = req.body.userComment;
       var doc = {
        user: req.session.user,
        comment: reply};

        console.log(req.body.showID);
        console.log(reply);
       db.insertOne(Comment, doc, function(result) {
            res.redirect('/get-review-page/'+ req.body.showID);
       })
    },

    
};



module.exports = CommentController;