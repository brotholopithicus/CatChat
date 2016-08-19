var faker = require('faker');
var fs = require('fs');
var seedArr = [];
for (var i = 0; i < 50; i++) {
    seedArr.push({
        title: faker.company.catchPhrase(),
        author: faker.internet.userName(),
        body: faker.lorem.paragraphs(),
        link: faker.image.avatar(),
        upvotes: faker.random.number(),
        comments: [],
        updated: faker.date.past()
    });
}
var seedArr = JSON.stringify(seedArr)
fs.writeFile('./data.json', seedArr, function(err) {
    if (err) {
        return console.log(err);
    }
    console.log('saved!');
});
