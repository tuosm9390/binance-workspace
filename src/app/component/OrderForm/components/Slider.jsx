import React from 'react';

const Slider = ({ value, onChange }) => {
  return (
    <div className="mb-3">
      <input
        type="range"
        className="w-full"
        min="0"
        max="100"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Slider; 