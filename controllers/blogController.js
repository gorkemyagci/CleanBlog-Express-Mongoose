const Blog = require('../models/Blog');
const fs = require('fs');

exports.getAllBlogs = async (req, res) => {
    const page = req.query.page || 1;
    const limit = 2;
    const skip = (page - 1) * limit;
    const blogs = await Blog.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    const count = await Blog.countDocuments();
    const pages = Math.ceil(count / limit);
    res.status(200).type('text/plain').send({
        blogs,
        pages,
        page
    });
}

exports.createBlog = async (req, res) => {
    try {
        await Blog.create({
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
        });
        res.status(200).type('text/plain').send({
            ...req.body, image: req.files.image.name
        });
        res.end();
    } catch (error) {
        console.log(error);
    }
}

exports.getBlog = async (req, res) => {
    try {
        const blog = await Blog.find({
            _id: req.params.id,
        });
        res.status(200).type('text/plain').send(blog);
    } catch (err) {
        console.log(err);
    }
}

exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
        }, { new: true });
        res.status(200).type('text/plain').send(blog);
    } catch (err) {
        console.log(err);
    }
}

exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        res.status(200).type('text/plain').send(blog);
    } catch (err) {
        console.log(err);
    }
}