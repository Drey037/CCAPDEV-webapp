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
       var reply = req.body.user-comment;
       var doc = {user:req.session.user,comment:reply};
       db.insertOne(Comment, reply, function(result) {
        res.redirect('/get-review-page/'+req.showID);

       })
    },

    
};



module.exports = CommentController;