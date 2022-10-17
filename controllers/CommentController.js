const Comment = require ('../database/Comment');
const db = require ('../database/db');
const Review = require('../database/Review')


const CommentController = {

    getComments: function (req, res) {
        var query = {user: req.params.idNum};

        db.findMany(Comment, query, null, function(result) {
            res.render('../views/partials/comment', query);
        });
    },
    
    //TP BE EDITED
    comment: function (req, res) {
        console.log(req.body.reviewid);
        var reply = req.body.comment;

        var doc = {
            user: req.session.user,
            comment: reply
        };


        db.insertOne(Comment, doc, function(result) {
            //res.redirect('/get-review-page/'+ req.body.showID);
            db.updateOne(Review, {"_id": req.body.reviewid}, { $push: { comments: result }, numComments: {$size: "$comments"} + 1}, function(out) {
                var newComment = {
                    profile_pic: req.session.profile_pic,
                    username: req.session.username,
                    content: reply,
                    dislikes: 0,
                    likes: 0
                };

                if (out) {
                    console.log("Successfully commented");
                    res.render('./partials/comment', newComment, function(err, html) {
                        res.send(html);
                    });
                }
            })
        })
    },

    
};



module.exports = CommentController;