import React from 'react';

const Slider = ({ value, onChange }) => {
  return (
    <div className="mb-3 relative">
      <input
        type="range"
        className="w-full h-1 bg-transparent appearance-none cursor-pointer relative z-10"
        min="0"
        max="100"
        value={value}
        defaultValue={0}
        onChange={onChange}
      />
      <div className="flex absolute top-[calc(50%+3.5px)] left-0 w-full h-[1px] bg-gray-700"></div>
    </div>
  );
};

export default Slider; 