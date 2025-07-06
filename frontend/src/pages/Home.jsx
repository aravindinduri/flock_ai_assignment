import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useWishlists } from '../hooks/useWishlists';
import Header from '../components/layout/Header';
import PageHeader from '../components/layout/PageHeader';
import EmptyState from '../components/common/EmptyState';
import WishlistGrid from '../components/wishlist/WishlistGrid';
import CreateWishlistModal from '../components/wishlist/CreateWishlistModal';
import ErrorAlert from '../components/common/ErrorAlert';

const Home = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const { 
    wishlists, 
    loading, 
    error, 
    creating, 
    createWishlist, 
    clearError 
  } = useWishlists();

  const handleCreateWishlist = async (wishlistData) => {
    const result = await createWishlist(wishlistData);
    if (result.success) {
      setIsCreateModalOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading wishlists...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user} 
        onLogout={handleLogout} 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader
          title="All Wishlists"
          description="Browse and contribute to all public wishlists"
          actionLabel="Create Wishlist"
          onAction={() => setIsCreateModalOpen(true)}
          actionIcon={Plus}
        />

        <ErrorAlert 
          message={error} 
          onDismiss={clearError}
        />

        {wishlists.length === 0 ? (
          <EmptyState
            icon={Plus}
            title="No wishlists yet"
            description="Be the first to create a public wishlist"
            actionLabel="Create the First Wishlist"
            onAction={() => setIsCreateModalOpen(true)}
          />
        ) : (
          <WishlistGrid wishlists={wishlists} />
        )}
      </main>

      <CreateWishlistModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateWishlist}
        loading={creating}
      />
    </div>
  );
};

export default Home; 