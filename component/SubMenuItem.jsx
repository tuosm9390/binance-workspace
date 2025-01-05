import React from 'react';

const SubMenuItem = ({ label, children }) => {
  return (
    <div className="relative py-3 px-4 text-gray-300 hover:bg-gray-700 hover:text-yellow-500">
      {label}
      {children}
    </div>
  );
};

export default SubMenuItem;