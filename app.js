const express = require('express');
const cors = require('cors');
const path = require('path');

// Routes imports
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const followRoutes = require('./routes/followRoutes');
const userRoutes = require('./routes/userRoutes'); // 🔥 Naya import add kiya

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Uploads folder ko static banana taake image URLs access ho sakein
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/follow', followRoutes);
app.use('/api/users', userRoutes); // 🔥 User profiles aur update ke liye endpoint attach kiya

// Base Route
app.get('/', (req, res) => {
    res.send('Social Media Core API Blueprint is running...');
});

// Global Error Handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error'
    });
});

module.exports = app;