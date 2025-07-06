import api from './axios';

export const authAPI = {
  signup: (userData) => api.post('/user/signup', userData),
  login: (credentials) => api.post('/user/login', credentials),
};

export const wishlistAPI = {
  getAll: () => api.get('/wishlist'),
  create: (wishlistData) => api.post('/wishlist', wishlistData),
  addProduct: (wishlistId, productData) => 
    api.post(`/wishlist/${wishlistId}/product`, productData),
  updateProduct: (wishlistId, productId, productData) => 
    api.put(`/wishlist/${wishlistId}/product/${productId}`, productData),
  deleteProduct: (wishlistId, productId) => 
    api.delete(`/wishlist/${wishlistId}/product/${productId}`),
}; 