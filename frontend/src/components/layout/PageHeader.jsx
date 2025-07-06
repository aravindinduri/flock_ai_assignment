import React from 'react';
import { Button } from '../ui/Button';

const PageHeader = ({ 
  title, 
  description, 
  actionLabel, 
  onAction, 
  actionIcon: ActionIcon,
  showAction = true 
}) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        {description && (
          <p className="text-gray-600 mt-1">{description}</p>
        )}
      </div>
      {showAction && actionLabel && onAction && (
        <Button onClick={onAction}>
          {ActionIcon && <ActionIcon className="h-4 w-4 mr-2" />}
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default PageHeader; 