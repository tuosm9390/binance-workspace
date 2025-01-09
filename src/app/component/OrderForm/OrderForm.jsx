import { useState, useEffect } from "react";
import { useOrderFormStore, usePriceStore } from "../../hooks/stateManagement";
import LimitTable from "./LimitTable";
import MarketTable from "./MarketTable";
import OrderTypeButton from "./components/OrderTypeButton";
import StopLimitTable from "./StopLimitTable";

const OrderForm = () => {
  const [orderType, setOrderType] = useState("Limit");
  const { price, lastPrice } = usePriceStore();
  const [buyPrice, setBuyPrice] = useState(price);
  const [sellPrice, setSellPrice] = useState(price);
  const [buyAmount, setBuyAmount] = useState("");
  const [sellAmount, setSellAmount] = useState("");
  const { orderForm, setOrderForm } = useOrderFormStore();
  const [fixedLastPrice, setFixedLastPrice] = useState(null);

  useEffect(() => {
    if (lastPrice && !fixedLastPrice) {
      setFixedLastPrice(lastPrice);
    }
  }, [lastPrice]);

  // 가격 변경 시 구매 가격과 판매 가격을 동일하게 설정
  useEffect(() => {
    setBuyPrice(price);
    setSellPrice(price);
  }, [price]);

  useEffect(() => {
    setOrderForm(false)
  }, [orderType])

  return (
    <div className="bg-[--background-card] text-white rounded-lg row-start-4 row-end-6 col-start-2">
      {/* Order Type Selector */}
      <div className="flex gap-4 mb-4 border-b border-gray-700 p-4 pb-0">
        <OrderTypeButton type={"Limit"} selectedType={orderType} setOrderType={setOrderType} />
        <OrderTypeButton type={"Market"} selectedType={orderType} setOrderType={setOrderType} />
        <OrderTypeButton type={"Stop Limit"} selectedType={orderType} setOrderType={setOrderType} />
      </div>

      <div className="p-4 pt-0">
        {orderType === "Limit" && <LimitTable fixedLastPrice={fixedLastPrice} buyPrice={buyPrice} setBuyPrice={setBuyPrice} sellPrice={sellPrice} setSellPrice={setSellPrice} buyAmount={buyAmount} setBuyAmount={setBuyAmount} sellAmount={sellAmount} setSellAmount={setSellAmount} />}
        {orderType === "Market" && <MarketTable buyPrice={buyPrice} setBuyPrice={setBuyPrice} sellPrice={sellPrice} setSellPrice={setSellPrice} buyAmount={buyAmount} setBuyAmount={setBuyAmount} sellAmount={sellAmount} setSellAmount={setSellAmount} />}
        {orderType === "Stop Limit" && <StopLimitTable fixedLastPrice={fixedLastPrice} buyPrice={buyPrice} setBuyPrice={setBuyPrice} sellPrice={sellPrice} setSellPrice={setSellPrice} buyAmount={buyAmount} setBuyAmount={setBuyAmount} sellAmount={sellAmount} setSellAmount={setSellAmount} />}
      </div>
    </div>
  );
};

export default OrderForm;
