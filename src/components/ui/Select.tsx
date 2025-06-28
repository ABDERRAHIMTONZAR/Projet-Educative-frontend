import React, { SelectHTMLAttributes } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: SelectOption[];
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  error?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  label,
  size = 'md',
  fullWidth = false,
  error,
  className = '',
  ...props
}) => {
  const baseClasses = 'block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-700';
  
  const sizeClasses = {
    sm: 'py-1.5 text-xs',
    md: 'py-2 text-sm',
    lg: 'py-3 text-base',
  };

  const selectClasses = [
    baseClasses,
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '',
    className,
  ].join(' ');

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select className={selectClasses} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default Select;