import Wishlist from '../models/whishlist.model.js';

export const createWishlist = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.userId;
  try {
    const wishlist = await Wishlist.create({ 
      name, 
      description, 
      createdBy: userId, 
      members: [userId], 
      products: [] 
    });
    res.status(201).json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getWishlists = async (req, res) => {
  try {
    // Return all wishlists for all users with populated user information
    const lists = await Wishlist.find({})
      .populate('createdBy', 'name email')
      .populate('products.addedBy', 'name email');
    
    res.json(lists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, url, notes, image } = req.body;
  try {
    const updated = await Wishlist.findByIdAndUpdate(id, {
      $push: {
        products: { 
          name, 
          description, 
          price, 
          url, 
          notes, 
          image,
          addedBy: req.userId 
        }
      }
    }, { new: true })
    .populate('createdBy', 'name email')
    .populate('products.addedBy', 'name email');
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
    }, { new: true })
    .populate('createdBy', 'name email')
    .populate('products.addedBy', 'name email');
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id, productId } = req.params;
  const { name, description, price, url, notes, image } = req.body;
  try {
    const updated = await Wishlist.findByIdAndUpdate(id, {
      $set: {
        'products.$[product].name': name,
        'products.$[product].description': description,
        'products.$[product].price': price,
        'products.$[product].url': url,
        'products.$[product].notes': notes,
        'products.$[product].image': image,
      }
    }, { 
      new: true,
      arrayFilters: [{ 'product._id': productId }]
    })
    .populate('createdBy', 'name email')
    .populate('products.addedBy', 'name email');
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
