import React from 'react';

const OrderTypeButton = ({ type, selectedType, setOrderType }) => {
  return (
    <button
      className={`pb-2 font-semibold ${
        selectedType === type 
          ? "text-white border-b-2 border-yellow-400" 
          : "text-gray-400"
      }`}
      onClick={() => setOrderType(type)}
    >
      {type}
    </button>
  );
};

export default OrderTypeButton;
