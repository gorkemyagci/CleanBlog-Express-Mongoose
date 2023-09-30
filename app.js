const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const app = express();
const blogController = require('./controllers/blogController');

const port = 3000;

mongoose.connect('mongodb://localhost/cleanblog-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

// Routes

app.get('/', blogController.getAllBlogs);
app.post('/blog', blogController.createBlog);
app.get('/blog/:id', blogController.getBlog)
app.put('/blog/edit/:id', blogController.updateBlog)
app.delete('/blog/delete/:id', blogController.deleteBlog)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})