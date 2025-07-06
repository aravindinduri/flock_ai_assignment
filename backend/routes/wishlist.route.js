import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import {
  createWishlist,
  getWishlists,
  addProduct,
  removeProduct
} from '../controllers/wishlist.controller.js';

const router = express.Router();

router.post('/', authMiddleware, createWishlist); 
router.get('/', authMiddleware, getWishlists);    

router.post('/:id/product', authMiddleware, addProduct); 
router.delete('/:id/product/:productId', authMiddleware, removeProduct); 
export default router;
