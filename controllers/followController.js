const User = require('../models/User');

exports.followUnfollowUser = async (req, res) => {
    try {
        const userToModify = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user._id);

        if (!userToModify || !currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (req.params.id === req.user._id.toString()) {
            return res.status(400).json({ message: 'You cannot follow yourself' });
        }

        // Check if already following
        if (currentUser.following.includes(req.params.id)) {
            // Unfollow
            currentUser.following = currentUser.following.filter(id => id.toString() !== req.params.id);
            userToModify.followers = userToModify.followers.filter(id => id.toString() !== req.user._id.toString());
            await currentUser.save();
            await userToModify.save();
            return res.status(200).json({ message: 'User unfollowed successfully' });
        } else {
            // Follow
            currentUser.following.push(req.params.id);
            userToModify.followers.push(req.user._id);
            await currentUser.save();
            await userToModify.save();
            return res.status(200).json({ message: 'User followed successfully' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};