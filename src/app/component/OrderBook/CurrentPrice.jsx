import { FaArrowUp, FaArrowDown } from "react-icons/fa6";

const CurrentPrice = ({ price, isBuyMaker, dollarPrice }) => {
  return (
    <div className="flex gap-2 font-semibold text-2xl px-4">
      <div className={`flex items-center gap-1 ${isBuyMaker ? "text-[--plus]" : "text-[--minus]"}`}>
        {price}
        {isBuyMaker ? <FaArrowUp size={14} /> : <FaArrowDown size={14} />}
      </div>
      {dollarPrice && (
        <div className="flex items-center text-gray-500 text-sm">
          ${dollarPrice}
        </div>
      )}
    </div>
  );
};

export default CurrentPrice; 