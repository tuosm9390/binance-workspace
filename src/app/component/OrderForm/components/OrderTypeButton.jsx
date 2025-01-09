import React from 'react';

const OrderTypeButton = ({ type, selectedType, setOrderType }) => {
  return (
    <button
      className={`flex flex-col gap-1 items-center text-sm font-semibold hover:text-white transition-colors
        ${selectedType === type
          ? "text-white"
          : "text-gray-400"
        }`}
      onClick={() => setOrderType(type)}
    >
      {type}
      <div className={`border-b-2 ${selectedType === type ? "border-yellow-400" : "border-transparent"} w-4`}></div>
    </button>
  );
};

export default OrderTypeButton;
