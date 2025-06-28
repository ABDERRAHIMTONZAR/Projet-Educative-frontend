import React, { InputHTMLAttributes } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  size = 'md',
  fullWidth = false,
  error,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || props.name || `input-${Math.random().toString(36).slice(2)}`;

  const baseClasses = 'block rounded-md border border-gray-300 shadow-sm focus:outline-none bg-white text-gray-700 px-3';

  const sizeClasses = {
    sm: 'py-1.5 text-xs',
    md: 'py-2 text-sm',
    lg: 'py-3 text-base',
  };

  const errorClasses = error
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
    : 'focus:border-indigo-500 focus:ring-indigo-500';

  const inputClasses = [
    baseClasses,
    sizeClasses[size],
    errorClasses,
    fullWidth ? 'w-full' : '',
    className,
  ].join(' ');

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label htmlFor={inputId} className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input id={inputId} className={inputClasses} {...props} />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
