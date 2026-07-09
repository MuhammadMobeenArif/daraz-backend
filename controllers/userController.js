const User = require('../models/User');
const Post = require('../models/Post');

// @desc    Get Current Logged In User Data
// @route   GET /api/users/me
// @access  Private (Token Required)
exports.getMe = async (req, res) => {
    try {
        // req.user humein protect middleware se milta hai
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            bio: user.bio || '',
            profilePicture: user.profilePicture || '',
            followers: user.followers,
            following: user.following
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user profile by ID (Kisi bhi user ki profile dekhna)
// @route   GET /api/users/:id
// @access  Public/Private
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select('-password')
            .populate('followers', 'username profilePicture')
            .populate('following', 'username profilePicture');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Is user ki saari posts fetch karenge
        const posts = await Post.find({ user: req.params.id })
            .populate('user', 'username profilePicture')
            .sort({ createdAt: -1 });

        res.status(200).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                bio: user.bio || '',
                profilePicture: user.profilePicture || '',
                followers: user.followers,
                following: user.following
            },
            postsCount: posts.length,
            posts
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user profile (Apni profile, bio, ya picture update karna)
// @route   PUT /api/users/profile
// @access  Private (Token Required)
exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Form-data ya JSON se aane wale data ko check karke update karna
        if (req.body.username) user.username = req.body.username;
        if (req.body.email) user.email = req.body.email;
        if (req.body.bio !== undefined) user.bio = req.body.bio; 
        
        // Agar multer middleware se file upload hui hai
        if (req.file) {
            user.profilePicture = `/uploads/${req.file.filename}`;
        }

        const updatedUser = await user.save();
        
        res.status(200).json({
            message: 'Profile updated successfully',
            user: {
                id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                bio: updatedUser.bio || '',
                profilePicture: updatedUser.profilePicture || ''
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};