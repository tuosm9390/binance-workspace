import React from 'react';

const ActionButton = ({ type = 'buy', onClick, children }) => {
  const buttonColorClass = type === 'buy' ? 'bg-[--plus] hover:bg-[--plus-hover]' : 'bg-[--minus] hover:bg-[--minus-hover]';

  return (
    <button
      className={`w-full ${buttonColorClass} text-white rounded-lg p-2`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ActionButton; 