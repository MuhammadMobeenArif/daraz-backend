const Comment = require('../models/Comment');
const Post = require('../models/Post');

// Add a comment
exports.addComment = async (req, res) => {
    try {
        const { text } = req.body;
        const postId = req.params.postId;

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const comment = await Comment.create({
            post: postId,
            user: req.user._id,
            text
        });

        const populatedComment = await comment.populate('user', 'username');

        res.status(201).json({ message: 'Comment added', comment: populatedComment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get comments for a specific post
exports.getPostComments = async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.postId })
            .populate('user', 'username')
            .sort({ createdAt: -1 });

        res.status(200).json({ comments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};