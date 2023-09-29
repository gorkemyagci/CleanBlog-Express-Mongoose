const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const app = express();
const Blog = require('./models/Blog');
const fs = require('fs');

const port = 3000;

mongoose.connect('mongodb://localhost/cleanblog-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

app.get('/', async (req, res) => {
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
});

app.post('/blog', async (req, res) => {
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
});

app.get('/blog/:id', async (req, res) => {
    try {
        const blog = await Blog.find({
            _id: req.params.id,
        });
        res.status(200).type('text/plain').send(blog);
    } catch (err) {
        console.log(err);
    }
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})