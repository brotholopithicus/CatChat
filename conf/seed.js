var faker = require('faker');
var mongoose = require('mongoose');
var Post = require('../models/post');
mongoose.connect('mongodb://localhost:27017/salmon');
var db = mongoose.connection;

for(var i = 0; i < 12; i++) {
  var postSeed = {
    title: faker.commerce.productName(),
    author: faker.internet.userName(),
    body: faker.lorem.paragraph(),
    link: faker.random.image(),
    upvotes: faker.random.number(),
    comments: [],
    updated: faker.date.past()
  }
  Post.create(postSeed, function(error, post) {
      if (error) {
        console.log('error' + error)
      } else {
        console.log('success: \n' + post);
      }
  });
}
