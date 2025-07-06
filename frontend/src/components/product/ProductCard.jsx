import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/Dialog';
import { Package, User, Trash2, ExternalLink, Edit, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const ProductCard = ({ product, onDelete, onUpdate, wishlistId }) => {
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: product.name || '',
    description: product.description || '',
    price: product.price || '',
    url: product.url || '',
    notes: product.notes || '',
    image: product.image || ''
  });

  // Update edit data when product changes
  useEffect(() => {
    setEditData({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      url: product.url || '',
      notes: product.notes || '',
      image: product.image || ''
    });
  }, [product]);

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(wishlistId, product._id);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editData.name.trim()) return;

    try {
      setEditing(true);
      if (onUpdate) {
        await onUpdate(wishlistId, product._id, editData);
      }
      setIsEditModalOpen(false);
    } catch (err) {
      console.error('Error updating product:', err);
    } finally {
      setEditing(false);
    }
  };

  const handleExternalLink = (e) => {
    e.stopPropagation();
    if (product.url) {
      window.open(product.url, '_blank');
    }
  };

  const canEdit = true;
  const canDelete = true;

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Package className="h-5 w-5 text-green-600" />
              {product.name}
            </CardTitle>
            <div className="flex items-center gap-2">
              {product.url && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleExternalLink}
                  className="p-1"
                  title="Open product URL"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              )}
              {canEdit && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleEdit}
                  className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  title="Edit product"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              {canDelete && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDelete}
                  className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                  title="Delete product"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {product.image && (
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden border">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-full items-center justify-center text-gray-400">
                  <ImageIcon className="h-8 w-8" />
                  <span className="ml-2 text-sm">Image not available</span>
                </div>
              </div>
            )}
            
            {product.description && (
              <p className="text-gray-600 text-sm">
                {product.description}
              </p>
            )}
            
            {product.price && (
              <div className="text-lg font-semibold text-green-600">
                ${product.price}
              </div>
            )}

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>Added by {product.addedBy?.name || 'Unknown'}</span>
              </div>
              <div>
                {new Date(product.createdAt).toLocaleDateString()}
              </div>
            </div>

            {product.notes && (
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-700">
                  <strong>Notes:</strong> {product.notes}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-1">
                Product Name *
              </label>
              <Input
                id="edit-name"
                value={editData.name}
                onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter product name"
                required
              />
            </div>
            <div>
              <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Input
                id="edit-description"
                value={editData.description}
                onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter description"
              />
            </div>
            <div>
              <label htmlFor="edit-price" className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <Input
                id="edit-price"
                type="number"
                step="0.01"
                value={editData.price}
                onChange={(e) => setEditData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="Enter price"
              />
            </div>
            <div>
              <label htmlFor="edit-url" className="block text-sm font-medium text-gray-700 mb-1">
                Product URL
              </label>
              <Input
                id="edit-url"
                type="url"
                value={editData.url}
                onChange={(e) => setEditData(prev => ({ ...prev, url: e.target.value }))}
                placeholder="Enter product URL"
              />
            </div>
            <div>
              <label htmlFor="edit-image" className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <Input
                id="edit-image"
                type="url"
                value={editData.image}
                onChange={(e) => setEditData(prev => ({ ...prev, image: e.target.value }))}
                placeholder="Enter image URL (will be displayed inline)"
              />
            </div>
            <div>
              <label htmlFor="edit-notes" className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <Input
                id="edit-notes"
                value={editData.notes}
                onChange={(e) => setEditData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Enter notes"
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
                disabled={editing}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={editing}>
                {editing ? 'Updating...' : 'Update Product'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard; 