import Link from "next/link";
import React from "react";

const MarketActivity = () => {
  return (
    <div className="bg-[--background-card] text-white rounded-lg row-start-5 row-end-6 col-start-3 flex flex-col">
      <div className="flex gap-2 mb-4 border-b border-gray-700 p-4 pb-0">
        {/* <TabButton type={"Market"} selectedType={selectedType} setSelectedType={setSelectedType} />
        <TabButton type={"My"} selectedType={selectedType} setSelectedType={setSelectedType} /> */}
        <div className="flex flex-col gap-1 items-center text-sm font-semibold pb-2">
          Top Movers
        </div>

        <Link href="https://www.binance.com/support/faq/18c97e8ab67a4e1b824edd590cae9f16" target="_blank" className="flex flex-col gap-1 items-center text-sm font-normal text-gray-400 underline pb-2">
          FAQ
        </Link>
      </div>
    </div>
  );
};

export default MarketActivity;
