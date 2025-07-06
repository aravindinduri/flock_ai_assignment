import { useState, useEffect } from 'react';
import { wishlistAPI } from '../lib/api';

export const useWishlists = () => {
  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);

  const fetchWishlists = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await wishlistAPI.getAll();
      setWishlists(response.data);
    } catch (err) {
      setError('Failed to load wishlists');
      console.error('Error fetching wishlists:', err);
    } finally {
      setLoading(false);
    }
  };

  const createWishlist = async (wishlistData) => {
    try {
      setCreating(true);
      setError('');
      const response = await wishlistAPI.create(wishlistData);
      setWishlists(prev => [...prev, response.data]);
      return { success: true };
    } catch (err) {
      const errorMessage = 'Failed to create wishlist';
      setError(errorMessage);
      console.error('Error creating wishlist:', err);
      return { success: false, error: errorMessage };
    } finally {
      setCreating(false);
    }
  };

  const clearError = () => {
    setError('');
  };

  useEffect(() => {
    fetchWishlists();
  }, []);

  return {
    wishlists,
    loading,
    error,
    creating,
    createWishlist,
    fetchWishlists,
    clearError
  };
}; 