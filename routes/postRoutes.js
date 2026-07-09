// const express = require('express');
// const router = express.Router();
// const { createPost, getAllPosts } = require('../controllers/postController');
// const { protect } = require('../middleware/auth.js');

// // GET request sab dekh sakte hain, lekin POST (create) ke liye login zaroori hai
// router.route('/')
//     .get(getAllPosts)
//     .post(protect, createPost);
// //router.put('/:id/like', protect, likeUnlikePost); // isko upar import zaroori karna
// module.exports = router;


const express = require('express');
const router = express.Router();

const {
    createPost,
    getAllPosts
} = require('../controllers/postController');

const { protect } = require('../middleware/auth');


// Public route
router.get('/', getAllPosts);


// Protected route (login required)
router.post('/', protect, createPost);


module.exports = router;