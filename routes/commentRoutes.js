const express = require('express');
const router = express.Router();
const { addComment, getPostComments } = require('../controllers/commentController');
const { protect } = require('../middleware/auth');

// routes match honge: /api/comments/:postId
router.route('/:postId')
    .get(getPostComments)
    .post(protect, addComment);

module.exports = router;