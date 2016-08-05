// SETUP
// ===============================================================
// modules
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var port = process.env.PORT || 3000;
// routes
var index = require('./routes/index');
var api = require('./routes/api');

var app = express();

// mongodb connection
// ===============================================================
mongoose.connect('mongodb://localhost:27017/salmon');
//mongoose.connect('107.180.101.201:27017/salmon');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// use sessions for tracking logins
// ===============================================================
app.use(session({
    secret: 'awesome sauce',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));
// configure app middleware, views, statics
// ===============================================================
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

// give templates access to session object
// ===============================================================
app.use(function(req, res, next) {
    res.locals.currentUser = req.session.userId;
    res.locals.nickname = req.session.nickname;
    next();
});

// include routes
// ===============================================================
app.use('/', index);


// error handling
// ===============================================================
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('File Not Found!');
    err.status = 404;
    next(err);
});

// error handler as last app.use callback
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// export app
// ===============================================================
module.exports = app;
