import express from 'express'
import wishlistRoutes from './wishlist.route.js';
import userRoutes from './user.route.js';

const router = express.Router();

router.use('/wishlist', wishlistRoutes);
router.use('/user', userRoutes);

export default router;
