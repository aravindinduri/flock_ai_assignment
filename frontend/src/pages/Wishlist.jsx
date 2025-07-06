import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/Dialog';
import ProductCard from '../components/product/ProductCard';
import { ArrowLeft, Plus, Package } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { wishlistAPI } from '../lib/api';

const Wishlist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    url: '',
    notes: '',
    image: ''
  });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchWishlist();
  }, [id]);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      // For now, we'll use the getAll endpoint and filter
      // In a real app, you'd have a GET /api/wishlist/:id endpoint
      const response = await wishlistAPI.getAll();
      const foundWishlist = response.data.find(w => w._id === id);
      if (foundWishlist) {
        setWishlist(foundWishlist);
      } else {
        setError('Wishlist not found');
      }
    } catch (err) {
      setError('Failed to load wishlist');
      console.error('Error fetching wishlist:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name.trim()) return;

    try {
      setAdding(true);
      const response = await wishlistAPI.addProduct(id, newProduct);
      setWishlist(prev => ({
        ...prev,
        products: [...(prev.products || []), response.data]
      }));
      setNewProduct({
        name: '',
        description: '',
        price: '',
        url: '',
        notes: '',
        image: ''
      });
      setIsAddProductModalOpen(false);
    } catch (err) {
      setError('Failed to add product');
      console.error('Error adding product:', err);
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteProduct = async (wishlistId, productId) => {
    try {
      await wishlistAPI.deleteProduct(wishlistId, productId);
      setWishlist(prev => ({
        ...prev,
        products: prev.products.filter(p => p._id !== productId)
      }));
    } catch (err) {
      setError('Failed to delete product');
      console.error('Error deleting product:', err);
    }
  };

  const handleUpdateProduct = async (wishlistId, productId, productData) => {
    try {
      const response = await wishlistAPI.updateProduct(wishlistId, productId, productData);
      setWishlist(prev => ({
        ...prev,
        products: prev.products.map(p => 
          p._id === productId ? { ...p, ...productData } : p
        )
      }));
    } catch (err) {
      setError('Failed to update product');
      console.error('Error updating product:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading wishlist...</p>
        </div>
      </div>
    );
  }

  if (error && !wishlist) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => navigate('/')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{wishlist?.name}</h1>
                {wishlist?.description && (
                  <p className="text-gray-600 text-sm">{wishlist.description}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  Created by {wishlist?.createdBy?.name || 'Unknown'}
                </p>
              </div>
            </div>
            <Button onClick={() => setIsAddProductModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {(!wishlist?.products || wishlist.products.length === 0) ? (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Package className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products yet
              </h3>
              <p className="text-gray-600 mb-4">
                Add the first product to this public wishlist
              </p>
              <Button onClick={() => setIsAddProductModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add the First Product
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                wishlistId={id}
                onDelete={handleDeleteProduct}
                onUpdate={handleUpdateProduct}
              />
            ))}
          </div>
        )}
      </main>

      {/* Add Product Modal */}
      <Dialog open={isAddProductModalOpen} onOpenChange={setIsAddProductModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Product Name *
              </label>
              <Input
                id="name"
                value={newProduct.name}
                onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter product name"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Input
                id="description"
                value={newProduct.description}
                onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter description"
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={newProduct.price}
                onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                placeholder="Enter price"
              />
            </div>
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                URL
              </label>
              <Input
                id="url"
                type="url"
                value={newProduct.url}
                onChange={(e) => setNewProduct(prev => ({ ...prev, url: e.target.value }))}
                placeholder="Enter product URL"
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <Input
                id="image"
                type="url"
                value={newProduct.image}
                onChange={(e) => setNewProduct(prev => ({ ...prev, image: e.target.value }))}
                placeholder="Enter image URL (will be displayed inline)"
              />
            </div>
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <Input
                id="notes"
                value={newProduct.notes}
                onChange={(e) => setNewProduct(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Enter notes"
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddProductModalOpen(false)}
                disabled={adding}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={adding}>
                {adding ? 'Adding...' : 'Add Product'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Wishlist; 