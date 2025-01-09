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
      <div className="flex gap-4 mb-4 border-b border-gray-700 p-4 pb-0">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`flex flex-col gap-1 items-center text-sm font-semibold hover:text-white transition-colors
              ${activeTab === tab.id
                ? "text-white"
                : "text-gray-400"
              }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            <div className={`border-b-2 ${activeTab === tab.id ? "border-yellow-400" : "border-transparent"} w-4`}></div>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="text-sm p-4 flex items-center justify-center text-gray-400 h-full">
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
