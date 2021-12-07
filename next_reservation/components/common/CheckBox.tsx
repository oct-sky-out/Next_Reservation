import React from 'react';

const CheckBox: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => {
  return (
    <>
      <input
        {...props}
        className={`form-checkbox border-2 border-gray-400 rounded text-emerald h-6 w-6 mr-3 my-auto inline-block ${className}`}
        type="checkbox"
      />
    </>
  );
};

export default CheckBox;
