import Wishlist from '../models/whishlist.model.js';

export const createWishlist = async (req, res) => {
  const { name } = req.body;
  const userId = req.userId;
  try {
    const wishlist = await Wishlist.create({ name, createdBy: userId, members: [userId], products: [] });
    res.status(201).json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getWishlists = async (req, res) => {
  try {
    const lists = await Wishlist.find({ members: req.userId });
    res.json(lists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addProduct = async (req, res) => {
  const { id } = req.params;
  const { name, image, price } = req.body;
  try {
    const updated = await Wishlist.findByIdAndUpdate(id, {
      $push: {
        products: { name, image, price, addedBy: req.userId }
      }
    }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeProduct = async (req, res) => {
  const { id, productId } = req.params;
  try {
    const updated = await Wishlist.findByIdAndUpdate(id, {
      $pull: {
        products: { _id: productId }
      }
    }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
