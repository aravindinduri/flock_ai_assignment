import React from 'react';
import WishlistCard from './WishlistCard';

const WishlistGrid = ({ wishlists, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg h-48"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {wishlists.map((wishlist) => (
        <WishlistCard key={wishlist._id} wishlist={wishlist} />
      ))}
    </div>
  );
};

export default WishlistGrid; 