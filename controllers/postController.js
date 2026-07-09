// const Post = require('../models/Post');

// // @desc    Create a new post
// // @route   POST /api/posts
// // @access  Private (Token Required)
// exports.createPost = async (req, res) => {
//     try {
//         const { caption, image } = req.body;

//         // req.user humein auth middleware se milega
//         const newPost = await Post.create({
//             user: req.user._id,
//             caption,
//             image
//         });

//         // User ki details ke sath return karenge
//         const populatedPost = await newPost.populate('user', 'username email');

//         res.status(201).json({
//             message: 'Post created successfully',
//             post: populatedPost
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // // @desc    Get all posts (Feed)
// // // @route   GET /api/posts
// // // @access  Public/Private (Hum abhi public rakh rahe hain)
// exports.getAllPosts = async (req, res) => {
//     try {
//         // Saari posts nikalenge aur sath user ka naam bhi 'populate' karenge
//         const posts = await Post.find()
//             .populate('user', 'username')
//             .sort({ createdAt: -1 }); // Newest posts first

//         res.status(200).json({
//             count: posts.length,
//             posts
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


  const Post = require('../models/Post');

exports.createPost = async (req, res) => {
    try {

        if (!req.user) {
            return res.status(401).json({
                message: "User not found. Login required"
            });
        }

        const { caption, image } = req.body;

        if (!caption && !image) {
            return res.status(400).json({
                message: "Caption or image required"
            });
        }

        const post = await Post.create({
            user: req.user._id,
            caption: caption || "",
            image: image || ""
        });

        const populatedPost = await Post.findById(post._id)
            .populate("user", "username email");

        res.status(201).json({
            message: "Post created successfully",
            post: populatedPost
        });


    } catch (error) {

        console.log("POST CREATE ERROR:", error);

        res.status(500).json({
            message: error.message
        });
    }
};


exports.getAllPosts = async (req, res) => {
    try {

        const posts = await Post.find()
            .populate("user", "username email")
            .sort({createdAt:-1});

        res.status(200).json({
            count: posts.length,
            posts
        });

    } catch(error){

        console.log("GET POSTS ERROR:", error);

        res.status(500).json({
            message:error.message
        });
    }
};