import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  onAction,
  showAction = true 
}) => {
  return (
    <Card>
      <CardContent className="text-center py-12">
        <div className="text-gray-400 mb-4">
          {Icon && <Icon className="h-16 w-16 mx-auto" />}
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        {showAction && actionLabel && onAction && (
          <Button onClick={onAction}>
            {Icon && <Icon className="h-4 w-4 mr-2" />}
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default EmptyState; 