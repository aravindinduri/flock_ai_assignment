import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Gift, Users, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WishlistCard = ({ wishlist }) => {
  const navigate = useNavigate();

  const handleViewWishlist = () => {
    navigate(`/wishlist/${wishlist._id}`);
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleViewWishlist}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-blue-600" />
            {wishlist.name}
          </CardTitle>
          <div className="text-sm text-gray-500">
            {wishlist.products?.length || 0} items
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-gray-600 text-sm">
            {wishlist.description || 'No description available'}
          </p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>Public Wishlist</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(wishlist.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="text-sm text-gray-500">
              Created by {wishlist.createdBy?.name || 'Unknown'}
            </div>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WishlistCard; 