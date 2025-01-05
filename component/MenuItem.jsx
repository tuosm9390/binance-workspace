import React from 'react';

const MenuItem = ({ label }) => {
  return (
    <div className="py-2 px-4 text-sm text-gray-300 hover:bg-gray-700 hover:text-yellow-500">
      {label}
    </div>
  );
};

export default MenuItem;