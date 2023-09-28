const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Blog = require('./models/Blog');

const port = 3000;

mongoose.connect('mongodb://localhost/cleanblog-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).type('text/plain').send('Hello World');
});

app.post('/blog', async (req, res) => {
    try {
        const newBlog = await Blog.create(req.body);
        res.status(200).type('text/plain').send('Blog created');
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the blog.' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})