import React from 'react';

export const Input = ({ type, accept, onChange, className }) => {
  return (
    <input
      type={type}
      accept={accept}
      onChange={onChange}
      className={`px-4 py-2 border rounded-md ${className}`}
    />
  );
};
