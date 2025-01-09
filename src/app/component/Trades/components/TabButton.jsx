import React from 'react';

const TabButton = ({ type, selectedType, setSelectedType }) => {
  const getTabItemStyles = (isActive) => `
  flex 
  flex-col 
  gap-1 
  items-center 
  text-sm 
  font-semibold 
  hover:text-white
  transition-colors
  ${isActive
      ? "text-white"
      : "text-gray-400"
    }
`.trim();

  return (
    <button
      className={getTabItemStyles(selectedType === type)}
      onClick={() => setSelectedType(type)}
    >
      {type} Trades
      <div className={`border-b-2 ${selectedType === type ? "border-yellow-400" : "border-transparent"} w-4`}></div>
    </button>
  );
};

export default TabButton;
