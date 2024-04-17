const Comment = require('../models/comment');
const Blog = require('../models/blog');

exports.postComment = async (req, res, next) => {
    try {
        const { comment } = req.body;
        const { blogId } = req.params;

        const blog = await Blog.findByPk(blogId);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const newComment = await Comment.create({ comment });
        await blog.addComment(newComment);

        res.status(201).json({ message: "Comment added successfully", comment: newComment });
    } catch (err) {
        console.error("Error from postComment:", err);
        res.status(500).json({ error: err.message, message: "Error from postComment" });
    }
    
}

exports.getComment = async (req, res, next) => {
    try {
        const { blogId } = req.params;

        const blog = await Blog.findByPk(blogId);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const comments = await blog.getComments();

        res.status(200).json({ comments });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.deleteComment = async (req, res, next) => {
    try {
        const commentId = req.params.Id;

        await Comment.destroy({
            where: {
              id: commentId
            },
          })
        .then(result => {
            res.status(200).json({message: "Deleted Successfully"});
        })
    }catch (err) {
        res.status(500).json({error : err.message});
    };
};