// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: [true, 'Username is required'],
//         unique: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: [true, 'Email is required'],
//         unique: true,
//         lowercase: true,
//         trim: true
//     },
//     password: {
//         type: String,
//         required: [true, 'Password is required'],
//         minlength: [6, 'Password must be at least 6 characters']
//     },
//     bio: {
//         type: String,
//         default: '',
//         maxlength: [160, 'Bio cannot be more than 160 characters']
//     },
//     profilePicture: {
//         type: String,
//         default: '' // Yahan image ka path store hoga jaise: /uploads/filename.jpg
//     },
//     followers: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'User'
//         }
//     ],
//     following: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'User'
//         }
//     ]
// }, { timestamps: true });

// // Password ko database mein save karne se pehle automatic hash (encrypt) karne ke liye
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// // Login ke waqt password compare karne ke liye custom method
// userSchema.methods.comparePassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

// module.exports = mongoose.model('User', userSchema);


const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    bio: {
      type: String,
      default: "",
      maxlength: [160, "Bio cannot be more than 160 characters"],
    },
    profilePicture: {
      type: String,
      default: "",
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);