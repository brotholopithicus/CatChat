var express = require('express');
var app = express();
var router = express.Router();
var mid = require('../middleware')
var Post = require('../models/post');
var User = require('../models/user');

// GET /posts
router.get('/posts', function(req, res, next) {
    Post.find(function(error, posts) {
        if (error) {
            return next(error);
        } else {
            return res.json(posts);
        }
    });
});

// POST /posts
router.post('/posts', mid.requiresLogin, function(req, res, next) {
    if (req.body.title && req.body.body && req.body.link) {
        var postData = {
            title: req.body.title,
            body: req.body.body,
            link: req.body.link,
            author: req.session.nickname,
            updated: Date.now()
        }
        Post.create(postData, function(error, post) {
            if (error) {
                return next(error);
            } else {
                req.session.postId = post._id;
                return res.json(post);
            }
        });
    } else {
        var err = new Error('Both Title and Link Are Required To Create A Post');
        err.status = 400;
        return next(err);
    }
});


module.exports = router;
