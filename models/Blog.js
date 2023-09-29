const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: String,
    description: String,
    image: String,
    createdDate: {
        type: Date,
        default: Date.now,
    }
});

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;