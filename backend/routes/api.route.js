const express = require('express');
const wishlistRoutes = require('./wishlist.route');
const userRoutes = require('./user.route');

const router = express.Router();

router.use('/wishlist', wishlistRoutes);
router.use('/uset', userRoutes);

module.exports = router;
