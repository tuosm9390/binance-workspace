import React, { useState } from "react";

const BasicTable = () => {
  const [activeTab, setActiveTab] = useState("open-orders");

  const tabs = [
    { id: "open-orders", label: "Open Orders(0)", },
    { id: "order-history", label: "Order History" },
    { id: "trade-history", label: "Trade History" },
    { id: "funds", label: "Funds" },
    { id: "grid-orders", label: "Grid Orders" },
  ];

  return (
    <div className="bg-[--background-card] text-white rounded-lg row-start-6 row-end-7 col-start-1 col-end-4">
      {/* Tab Menu */}
      <div className="flex border-b border-gray-700">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-3 text-sm font-medium transition-colors
              ${activeTab === tab.id
                ? "text-white border-b-2 border-yellow-400"
                : "text-gray-400 hover:text-gray-300"
              }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="p-4 flex items-center justify-center text-gray-400 h-full">
        <span>
          <span className="text-yellow-400 hover:text-yellow-300">Log In</span>
          {" or "}
          <span className="text-yellow-400 hover:text-yellow-300">Register Now</span>
          {" to trade"}
        </span>
      </div>
    </div>
  );
};

export default BasicTable;
