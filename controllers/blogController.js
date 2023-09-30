const Blog = require('../models/blogModel');
const fs = require('fs');

exports.getAllBlogs = async (req, res) => {
    const blogs = await Blog.find({});
    for (let i = 0; i < blogs.length; i++) {
        res.write(
            `
        <div>
        <h3>${blogs[i].title}</h3>
        <p>${blogs[i].description}</p>
        <img style="width:300px" src="${blogs[i].image}" alt="image" />
        </div>
        `
        );
    }
    res.end();
}

exports.createBlog = async (req, res) => {
    try {
        const uploadDir = __dirname + '/public/uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        let uplaodedImage = req.files.image;
        let uploadPath = __dirname + '/public/uploads/' + uplaodedImage.name;
        uplaodedImage.mv(uploadPath, async () => {
            await Blog.create({
                ...req.body,
                image: '/uploads/' + uplaodedImage.name,
            })
        })
        res.status(200).type('text/plain').send({
            ...req.body, image: uplaodedImage.name
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