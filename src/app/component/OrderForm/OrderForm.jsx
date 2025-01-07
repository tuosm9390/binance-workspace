import { useState, useEffect } from "react";
import { useOrderFormStore, usePriceStore } from "../../hooks/stateManagement";
import LimitTable from "./LimitTable";
import MarketTable from "./MarketTable";

const OrderForm = () => {
  const [orderType, setOrderType] = useState("Limit");
  const { price } = usePriceStore();
  const [buyPrice, setBuyPrice] = useState(price);
  const [sellPrice, setSellPrice] = useState(price);
  const [buyAmount, setBuyAmount] = useState("");
  const [sellAmount, setSellAmount] = useState("");
  const { orderForm, setOrderForm } = useOrderFormStore();

  // 가격 변경 시 구매 가격과 판매 가격을 동일하게 설정
  useEffect(() => {
    setBuyPrice(price);
    setSellPrice(price);
  }, [price]);

  useEffect(() => {
    setOrderForm(false)
  }, [orderType])

  return (
    <div className="bg-[--background-card] text-white p-4 rounded-lg row-start-4 row-end-6 col-start-2">
      {/* Order Type Selector */}
      <div className="flex gap-4 mb-4 text-sm border-b border-gray-700">
        <button
          className={`pb-2 font-semibold ${orderType === "Limit" ? "text-white border-b-2 border-yellow-400" : "text-gray-400"}`}
          onClick={() => setOrderType("Limit")}
        >
          Limit
        </button>
        <button
          className={`pb-2 font-semibold ${orderType === "Market" ? "text-white border-b-2 border-yellow-400" : "text-gray-400"}`}
          onClick={() => setOrderType("Market")}
        >
          Market
        </button>
        <button
          className={`pb-2 font-semibold ${orderType === "Stop Limit" ? "text-white border-b-2 border-yellow-400" : "text-gray-400"}`}
          onClick={() => setOrderType("Stop Limit")}
        >
          Stop Limit
        </button>
      </div>

      {orderType === "Limit" && <LimitTable buyPrice={buyPrice} setBuyPrice={setBuyPrice} sellPrice={sellPrice} setSellPrice={setSellPrice} buyAmount={buyAmount} setBuyAmount={setBuyAmount} sellAmount={sellAmount} setSellAmount={setSellAmount} />}
      {orderType === "Market" && <MarketTable buyPrice={buyPrice} setBuyPrice={setBuyPrice} sellPrice={sellPrice} setSellPrice={setSellPrice} buyAmount={buyAmount} setBuyAmount={setBuyAmount} sellAmount={sellAmount} setSellAmount={setSellAmount} />}
    </div>
  );
};

export default OrderForm;
