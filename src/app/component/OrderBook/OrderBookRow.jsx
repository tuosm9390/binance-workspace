import { formatNumber } from "../../utils/formatNumber";

const OrderBookRow = ({ price, amount, total, isAsk, onClick }) => {
  return (
    <div
      className="grid grid-cols-[3fr_4fr_3fr] hover:bg-gray-800 text-xs cursor-pointer"
      onClick={() => onClick(price)}
    >
      <div className={`text-${isAsk ? '[--minus]' : '[--plus]'} text-left`}>
        {parseFloat(price).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 10 })}
      </div>
      <div className="text-right">{parseFloat(amount).toFixed(5)}</div>
      <div className="text-right">{formatNumber(price * amount)}</div>
    </div>
  );
};

export default OrderBookRow; 