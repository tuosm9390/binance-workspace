import React from 'react';

const SubMenu = ({ children, className }) => {
  return (
    <div className={`absolute top-full left-0 hidden group-hover:block bg-gray-800 rounded-md shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export default SubMenu;