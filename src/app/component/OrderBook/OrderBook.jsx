import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getBinanceOrderBookData } from "../../utils/fetchBinanceData";
import OrderBookRow from "./OrderBookRow";
import CurrentPrice from "./CurrentPrice";
import { useOrderFormStore, usePriceStore, useSymbolStore } from "../../hooks/stateManagement";

const OrderBook = () => {
  const { defaultSymbol, base, quote } = useSymbolStore();
  const { setPrice } = usePriceStore();
  const { orderForm } = useOrderFormStore();
  const { lastPrice, isBuyMaker } = usePriceStore();

  const { data: depth } = useQuery({
    queryKey: ["depth", defaultSymbol],
    queryFn: () => getBinanceOrderBookData(defaultSymbol),
    select: (data) => ({
      ...data,
    })
  });

  useWebSocketConnection(defaultSymbol);

  return (
    <div className="bg-[--background-card] text-white py-4 flex flex-col rounded-lg row-start-2 row-end-6 w-full">
      <div className="border-b border-gray-700 pb-2 px-4">
        <div className="text-sm font-semibold">Order Book</div>
      </div>

      <div className="grid grid-cols-[3fr_4fr_3fr] text-xs text-gray-400 mb-2 pt-2 px-4">
        <div className="text-left">Price ({quote})</div>
        <div className="text-right">Amount ({base})</div>
        <div className="text-right">Total</div>
      </div>

      {depth && (
        <>
          {/* Sell Orders */}
          <div className="flex flex-col mb-2 px-4 gap-1">
            {depth.asks?.slice(0, !orderForm ? 17 : 22).reverse().map((ask, index) => (
              <OrderBookRow
                key={`ask-${index}`}
                price={ask[0]}
                amount={ask[1]}
                isAsk={true}
                onClick={setPrice}
              />
            ))}
          </div>

          {/* Current Price */}
          <CurrentPrice
            price={lastPrice}
            isBuyMaker={isBuyMaker}
            dollarPrice={parseFloat(depth?.asks?.[0]?.[0]).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 10 })}
          />

          {/* Buy Orders */}
          <div className="flex flex-col my-2 px-4 gap-1">
            {depth.bids?.slice(0, !orderForm ? 17 : 22).map((bid, index) => (
              <OrderBookRow
                key={`bid-${index}`}
                price={bid[0]}
                amount={bid[1]}
                isAsk={false}
                onClick={setPrice}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const useWebSocketConnection = (defaultSymbol) => {
  // 웹소켓 연결
  const queryClient = useQueryClient();
  useEffect(() => {
    const websocket = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${defaultSymbol.toLowerCase()}@depth@1000ms`);
    websocket.onopen = () => {
      return
    };
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data)?.data;
      // 수량이 0인 주문 필터링
      const filterZeroQuantity = (orders) =>
        orders?.filter(([_, quantity]) => parseFloat(quantity) > 0);

      // 가격 기준으로 정렬
      const sortOrders = (orders, isAsks) => {
        return orders.sort((a, b) => {
          const priceA = parseFloat(a[0]);
          const priceB = parseFloat(b[0]);
          return isAsks ? priceA - priceB : priceB - priceA;
        });
      };

      const transformedData = {
        lastUpdateId: data.u,
        bids: sortOrders(filterZeroQuantity(data.b), false).slice(0, 50),
        asks: sortOrders(filterZeroQuantity(data.a), true).slice(0, 50)
      };

      queryClient.setQueryData(
        ["depth", defaultSymbol],
        (oldData) => {
          if (!oldData) return transformedData;

          const mergeOrders = (existingOrders, newOrders, isAsks) => {
            const orderMap = new Map(existingOrders?.map(order => [order[0], order[1]]) || []);
            newOrders?.forEach(([price, quantity]) => {
              if (parseFloat(quantity) > 0) {
                orderMap.set(price, quantity);
              } else {
                orderMap.delete(price);
              }
            });
            return Array.from(orderMap.entries()).sort((a, b) => {
              const priceA = parseFloat(a[0]);
              const priceB = parseFloat(b[0]);
              return isAsks ? priceA - priceB : priceB - priceA;
            });
          };

          return {
            lastUpdateId: data.u,
            bids: mergeOrders(oldData.bids, data.b, false),
            asks: mergeOrders(oldData.asks, data.a, true)
          };
        }
      );
    };

    return () => {
      websocket.close();
    };
  }, [queryClient, defaultSymbol]);
};

export default OrderBook;
