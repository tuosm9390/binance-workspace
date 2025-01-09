import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import ScrollButton from "./ScrollButton";

const FILTER_ITEMS = ["USDT", "FDUSDT", "USDC", "TUSD", "BNB", "BTC", "ALTS", "FIAT"];

const FilterTabs = ({ filter, setFilter }) => {
  const getFilterItemStyles = (isActive) => `
    flex 
    flex-col 
    gap-1 
    items-center 
    text-gray-400 
    font-semibold 
    whitespace-nowrap 
    hover:text-white
    transition-colors
    ${isActive
      ? "text-white"
      : "text-gray-400"
    }
  `.trim();

  return (
    <div className="w-full border-b border-gray-700">
      <div className="relative flex items-center px-6">
        <ScrollButton direction="left" />
        <div
          id="filter-container"
          className="flex gap-4 mt-2 text-sm overflow-x-auto scrollbar-hide px-4"
          style={{ scrollBehavior: 'smooth' }}
        >
          {FILTER_ITEMS.map((item, index) => (
            <button
              key={index}
              className={getFilterItemStyles(filter === item)}
              onClick={() => setFilter(item)}
            >
              {item}
              <div className={`border-b-2 ${filter === item ? "border-yellow-400" : "border-transparent"} w-4`}></div>
            </button>
          ))}
        </div>
        {/* <button
          className={`flex flex-col gap-1 items-center text-sm font-semibold ${selectedType === type
            ? "text-white"
            : "text-gray-400"
            }`}
          onClick={() => setSelectedType(type)}
        >
          {type} Trades
          <div className={`border-b-2 ${selectedType === type ? "border-yellow-400" : "border-transparent"} w-4`}></div>
        </button> */}
        <ScrollButton direction="right" />
      </div>
    </div>
  );
};

export default FilterTabs; 