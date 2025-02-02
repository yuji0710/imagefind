import React from 'react';

const Button = ({ onClick, disabled, children, className }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md text-white ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
