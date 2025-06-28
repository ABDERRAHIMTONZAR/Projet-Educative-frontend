import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '',
}) => {
  const classes = [
    'rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden',
    className,
  ].join(' ');

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardProps> = ({ 
  children, 
  className = '',
}) => {
  const classes = [
    'border-b border-gray-200 px-4 py-3 bg-gray-50',
    className,
  ].join(' ');

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<CardProps> = ({ 
  children, 
  className = '',
}) => {
  const classes = [
    'px-4 py-4',
    className,
  ].join(' ');

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<CardProps> = ({ 
  children, 
  className = '',
}) => {
  const classes = [
    'border-t border-gray-200 px-4 py-3 bg-gray-50',
    className,
  ].join(' ');

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Card;