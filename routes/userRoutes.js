const express = require('express');
const router = express.Router();
const { getUserProfile, updateProfile, getMe } = require('../controllers/userController'); // 👈 getMe import kiya
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Yeh teenon routes hain
router.get('/me', protect, getMe); // 👈 Naya route add kiya (Hamesha /:id se UPAR rakhna)
router.put('/profile', protect, upload.single('profilePicture'), updateProfile);
router.get('/:id', getUserProfile);

module.exports = router;