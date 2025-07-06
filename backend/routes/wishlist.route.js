import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import {
  createWishlist,
  getWishlists,
  addProduct,
  removeProduct,
  updateProduct
} from '../controllers/wishlist.controller.js';

const router = express.Router();

router.post('/', authMiddleware, createWishlist); 
router.get('/', authMiddleware, getWishlists);    

router.post('/:id/product', authMiddleware, addProduct); 
router.put('/:id/product/:productId', authMiddleware, updateProduct);
router.delete('/:id/product/:productId', authMiddleware, removeProduct); 
export default router;
