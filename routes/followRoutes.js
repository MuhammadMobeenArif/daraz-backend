const express = require('express');
const router = express.Router();
const { followUnfollowUser } = require('../controllers/followController');
const { protect } = require('../middleware/auth');

router.put('/:id', protect, followUnfollowUser);

module.exports = router;