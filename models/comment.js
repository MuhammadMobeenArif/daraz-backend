const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: [true, 'Comment text cannot be empty'],
        trim: true,
        maxlength: [300, 'Comment cannot be more than 300 characters']
    }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);