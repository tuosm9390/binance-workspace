import React from "react";

const MenuItem = ({ label, description, className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <div>
        <div className="font-semibold text-white">{label}</div>
        {description && (
          <div className="text-sm font-medium text-gray-400 mt-1">
            {description}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItem;
