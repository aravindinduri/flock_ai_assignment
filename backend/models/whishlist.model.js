import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  name: String,
  createdBy: String,
  members: [String],
  products: [{
    name: String,
    image: String,
    price: Number,
    addedBy: String,
    createdAt: { type: Date, default: Date.now },
  }],
}, { timestamps: true });

export default mongoose.model('Wishlist', wishlistSchema);