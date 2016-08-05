var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Post = require('../models/post');
var mid = require('../middleware');

// POST /posts
router.post('/api/posts', mid.requiresLogin, function(req, res, next) {
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
                return res.redirect('../../posts');
            }
        });
    } else {
        var err = new Error('Both Title and Link Are Required To Create A Post');
        err.status = 400;
        return next(err);
    }
});

// GET /profile
router.get('/profile', mid.requiresLogin, function(req, res, next) {
    User.findById(req.session.userId)
        .exec(function(error, user) {
            if (error) {
                return next(error);
            } else {
                return res.render('profile', {
                    title: 'Profile',
                    name: user.name,
                    nickname: user.nickname,
                    email: user.email
                });
            }
        });
});

// GET /logout
router.get('/logout', mid.requiresLogin, function(req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

// GET /login
router.get('/login', mid.destroySession, function(req, res, next) {
    return res.render('login', {
        title: 'Log In'
    });

});

// POST /login
router.post('/login', function(req, res, next) {
    if (req.body.email && req.body.password) {
        User.authenticate(req.body.email, req.body.password, function(error, user) {
            if (error || !user) {
                var err = new Error('Incorrent Email or Password!');
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;
                req.session.nickname = user.nickname;
                return res.redirect('/profile')
            }
        });
    } else {
        var err = new Error('Email and Password Are Required!');
        err.status = 401;
        return next(err);
    }
});

// GET /register
router.get('/register', mid.loggedOut, function(req, res, next) {
    return res.render('register', {
        title: 'Sign Up'
    });
});

// POST /register
router.post('/register', function(req, res, next) {
    if (req.body.email &&
        req.body.name &&
        req.body.nickname &&
        req.body.password &&
        req.body.confirmPassword) {

        // confirm that user typed same password twice
        if (req.body.password !== req.body.confirmPassword) {
            var err = new Error('Passwords do not match.');
            err.status = 400;
            return next(err);
        }

        // create object with form input
        var userData = {
            email: req.body.email,
            name: req.body.name,
            nickname: req.body.nickname,
            password: req.body.password
        };

        // use schema's `create` method to insert document into Mongo
        User.create(userData, function(error, user) {
            if (error) {
                return next(error);
            } else {
                req.session.userId = user._id;
                req.session.nickname = user.nickname;
                return res.redirect('/profile');
            }
        });

    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
})


// GET /
router.get('/', function(req, res, next) {
    return res.render('index', {
        title: 'Home'
    });
});

// GET /about
router.get('/about', function(req, res, next) {
    return res.render('about', {
        title: 'About'
    });
});

// GET /contact
router.get('/contact', function(req, res, next) {
    return res.render('contact', {
        title: 'Contact'
    });
});
// get api
router.get('/api/posts', function(req, res, next) {
    Post.find({}, function(error, posts) {
        if (error) {
            return next(error);
        } else {
            res.json(posts);
        }
    });
});
// GET /contact
router.get('/posts', function(req, res, next) {
    return res.render('posts', {
        title: 'Posts'
    })
});
// GET /contact
router.get('/newpost', function(req, res, next) {
    return res.render('newpost', {
        title: 'Contact'
    });
});

router.get('/catbrick', function(req, res, next) {
    return res.render('catbrick', {
        title: 'CATBRICK'
    })
});

module.exports = router;
