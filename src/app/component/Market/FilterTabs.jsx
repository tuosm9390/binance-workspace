import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const FILTER_ITEMS = ["USDT", "FDUSD", "USDC", "TUSD", "BNB", "BTC", "ALTS", "FIAT"];

const FilterTabs = ({ filter, setFilter }) => {
  const getFilterItemStyles = (isActive) => `
    text-gray-400 
    font-semibold 
    whitespace-nowrap 
    cursor-pointer
    hover:text-gray-300
    transition-colors
    ${isActive ? "border-b-2 border-yellow-400 text-white" : ""}
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
          {FILTER_ITEMS.map((item) => (
            <span
              key={item}
              className={getFilterItemStyles(filter === item)}
              onClick={() => setFilter(item)}
            >
              {item}
            </span>
          ))}
        </div>
        <ScrollButton direction="right" />
      </div>
    </div>
  );
};

const ScrollButton = ({ direction }) => {
  const handleScroll = () => {
    const container = document.getElementById('filter-container');
    container.scrollLeft += direction === 'left' ? -100 : 100;
  };

  return (
    <div className={`absolute ${direction === 'left' ? 'left-0' : 'right-0'} flex items-center h-full z-10`}>
      <div className={`absolute w-8 h-full bg-gradient-to-${direction === 'left' ? 'r' : 'l'} from-[--background-card] to-[--background-card]/100`}></div>
      <button
        className={`p-1 text-gray-400 hover:text-white z-20 ${direction === 'left' ? 'ml-2' : 'mr-2'}`}
        onClick={handleScroll}
      >
        {direction === 'left' ? 
          <MdKeyboardArrowLeft className="w-5 h-5" /> : 
          <MdKeyboardArrowRight className="w-5 h-5" />
        }
      </button>
    </div>
  );
};

export default FilterTabs; 