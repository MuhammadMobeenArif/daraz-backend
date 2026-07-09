// const mongoose = require('mongoose');

// const postSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     caption: {
//         type: String,
//         trim: true,
//         maxlength: [500, 'Caption cannot be more than 500 characters']
//     },
//     image: {
//         type: String, // Yahan image ka URL ya path save hoga
//         default: ''
//     },
//     likes: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'User'
//         }
//     ]
// }, { timestamps: true });

// module.exports = mongoose.model('Post', postSchema);


const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        caption: {
            type: String,
            required: true,
            trim: true,
            maxlength: [
                500,
                'Caption cannot be more than 500 characters'
            ]
        },

        image: {
            type: String,
            default: ''
        },

        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]

    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model('Post', postSchema);