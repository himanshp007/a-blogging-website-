const express = require('express');

const router = express.Router();

const blogController = require('../controllers/blog');
const commentController = require('../controllers/comment')

router.post('/add-blog', blogController.postBlog);

router.get('/get-blog', blogController.getAllBlog);


module.exports = router;