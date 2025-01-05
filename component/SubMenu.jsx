import React from 'react';

const SubMenu = ({ children }) => {
  return (
    <div className="absolute top-full left-0 hidden group-hover:block bg-gray-800 rounded-md min-w-[200px] shadow-lg">
      {children}
    </div>
  );
};

export default SubMenu;