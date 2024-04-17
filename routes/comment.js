const express = require('express');

const router = express.Router();

const commentController = require('../controllers/comment')

router.post('/add-comment/:blogId', commentController.postComment);

router.get('/get-comment/:blogId', commentController.getComment);

router.delete('/delete-comment/:Id', commentController.deleteComment);

module.exports = router;