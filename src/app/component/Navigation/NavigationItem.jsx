import React from "react";

const NavigationItem = ({ label, children }) => {
  return (
    <div className="relative px-4 h-16 flex items-center cursor-pointer text-gray-300 hover:text-yellow-500">
      {label}
      {children}
    </div>
  );
};

export default NavigationItem;
