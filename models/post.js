var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    body: {
      type: String,
      required: true,
      trim: true
    },
    link: {
        type: String,
        required: true,
        trim: true
    },
    upvotes: {
        type: Number,
        default: 0
    },
    updated: {
        type: Date,
        default: Date.now()
    }
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
