import React from 'react';

const SubMenuItem = ({ className, label, children }) => {
  return (
    <div className={`relative py-3 px-4 text-gray-300 ${className}`} >
      {label}
      {children}
    </div >
  );
};

export default SubMenuItem;