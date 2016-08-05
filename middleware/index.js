function loggedOut(req, res, next) {
    if (req.session && req.session.userId) {
        return res.redirect('/profile');
    } else {
        return next();
    }
}

function requiresLogin(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        var err = new Error('You Must Be Logged In To View This Page!');
        err.status = 401;
        return next(err);
    }
}

function destroySession(req, res, next) {
    if (req.session) {
        req.session.destroy(function(err) {
            if (err) {
                return next(err);
            } else {
                return next();
            }
        });
    } else if (!req.session) {
        return res.redirect('/login');
    }
}

function allowPost(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        var err = new Error('You Must Register For An Account In Order To Create Posts!');
        err.status = 401;
        return next(err);
    }
}

module.exports.loggedOut = loggedOut;
module.exports.requiresLogin = requiresLogin;
module.exports.allowPost = allowPost;
module.exports.destroySession = destroySession;
