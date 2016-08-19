var faker = require('faker');
// var mongoose = require('mongoose');
// var Post = require('../models/post');
// mongoose.connect('mongodb://localhost:27017/salmon');
// var db = mongoose.connection;

for (var i = 0; i < 1; i++) {
    // TITLE
    var title = faker.company.catchPhrase();
    // AUTHOR
    var username = faker.internet.userName();
    // BODY
    var body = faker.lorem.paragraphs();
    // LINK TO IMAGE
    var avatar = faker.image.avatar();
    // UPVOTES
    var upvotes = faker.random.number();
    // UPDATED
    var date = faker.date.past();
    var postSeed = {
        title: title,
        author: username,
        body: body,
        link: avatar,
        upvotes: upvotes,
        comments: [],
        updated: date
    }
    console.log(postSeed);
}

/*
Post.create(postSeed, function(error, post) {
    if (error) {
        console.log('error' + error)
    } else {
        console.log('success: \n' + post);
    }
});
*/
