import { useCallback, useEffect } from "react";
import { getQueryClient } from "./useReactQuery";

// 주문에서 수량이 0인 항목을 필터링하는 함수
const filterZeroQuantity = (orders) =>
  orders?.filter(([_, quantity]) => parseFloat(quantity) > 0);

// 주문을 가격에 따라 정렬하는 함수
const sortOrders = (orders, isAsks) => {
  return orders.sort((a, b) => {
    const priceA = parseFloat(a[0]);
    const priceB = parseFloat(b[0]);
    return isAsks ? priceA - priceB : priceB - priceA;
  });
};

// 기존 주문과 새로운 주문을 병합하고 정렬하는 함수
const mergeOrders = (existingOrders, newOrders, isAsks) => {
  const orderMap = new Map(
    existingOrders?.map((order) => [order[0], order[1]]) || []
  );
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

// WebSocket 메시지 데이터를 변환하는 함수
const transformData = (stream, data) => {
  if (stream.includes("@aggTrade")) {
    return {
      id: data.t,
      isBestMatch: data.M,
      isBuyerMaker: data.m,
      price: data.p,
      qty: data.q,
      quoteQty: (parseFloat(data.p) * parseFloat(data.q)).toString(),
      time: data.T,
    };
  } else if (stream.includes("@kline_1h")) {
    return {
      x: data.k.t,
      y: [
        parseFloat(data.k.o),
        parseFloat(data.k.h),
        parseFloat(data.k.l),
        parseFloat(data.k.c),
      ],
    };
  } else if (stream.includes("@depth")) {
    return {
      lastUpdateId: data.u,
      bids: sortOrders(filterZeroQuantity(data.b), false),
      asks: sortOrders(filterZeroQuantity(data.a), true),
    };
  } else if (stream.includes("@ticker")) {
    return {
      symbol: data.s,
      priceChange: data.p,
      priceChangePercent: data.P,
      weightedAvgPrice: data.w,
      openPrice: data.o,
      highPrice: data.h,
      lowPrice: data.l,
      lastPrice: data.c,
      volume: data.v,
      quoteVolume: data.q,
      openTime: data.O,
      closeTime: data.C,
      firstId: data.F,
      lastId: data.L,
      count: data.n,
    };
  }
};

// QueryClient의 데이터를 업데이트하는 함수
const updateQueryData = (queryClient, key, transformedData, oldDataHandler) => {
  queryClient.setQueryData(key, (oldData) => {
    return oldDataHandler(oldData, transformedData);
  });
};

// WebSocket 연결을 관리하는 커스텀 훅
export const useWebSocketConnection = (defaultSymbol, interval = "1h") => {
  const queryClient = getQueryClient();

  // WebSocket 메시지를 처리하는 함수
  const handleMessage = useCallback(
    (event) => {
      const { stream, data } = JSON.parse(event.data);
      const transformedData = transformData(stream, data);

      if (stream.includes("@aggTrade")) {
        updateQueryData(
          queryClient,
          ["trades", defaultSymbol],
          transformedData,
          (oldData) => {
            const currentTrades = Array.isArray(oldData)
              ? oldData.slice(0, 50)
              : [];
            return [transformedData, ...currentTrades].slice(0, 50);
          }
        );
      } else if (stream.includes("@kline_1h")) {
        updateQueryData(
          queryClient,
          ["binanceChartData", "1h", defaultSymbol],
          transformedData,
          (oldData) => {
            if (!oldData) return [transformedData].slice(0, 100);

            const lastCandle = oldData[oldData.length - 1];
            if (lastCandle.x === transformedData.x) {
              return [...oldData.slice(0, -1), transformedData].slice(0, 100);
            } else {
              return [...oldData, transformedData].slice(0, 100);
            }
          }
        );
      } else if (stream.includes("@depth")) {
        updateQueryData(
          queryClient,
          ["depth", defaultSymbol],
          transformedData,
          (oldData) => {
            if (!oldData) return transformedData;

            return {
              lastUpdateId: data.u,
              bids: mergeOrders(oldData.bids, data.b, false).slice(0, 30),
              asks: mergeOrders(oldData.asks, data.a, true).slice(0, 30),
            };
          }
        );
      } else if (stream.includes("@ticker")) {
        updateQueryData(
          queryClient,
          ["getBinanceSymbolTickerPriceData", defaultSymbol],
          transformedData,
          () => {
            return transformedData;
          }
        );
      } else if (stream.includes("!miniTicker")) {
        data.forEach((item) => {
          const transformedData = {
            symbol: item.s,
            openPrice: parseFloat(item.o),
            lastPrice: parseFloat(item.c),
            count: item.n,
          };

          updateQueryData(
            queryClient,
            ["allTickerPriceData"],
            transformedData,
            (oldData) => {
              if (!oldData) return oldData;
              return oldData.map((coin) => {
                if (coin?.symbol === transformedData.symbol) {
                  return {
                    ...coin,
                    lastPrice: transformedData.lastPrice,
                    priceChangePercent:
                      ((transformedData.lastPrice - transformedData.openPrice) /
                        transformedData.openPrice) *
                      100,
                  };
                }
                return coin;
              });
            }
          );
        });
      }
    },
    [defaultSymbol, queryClient]
  );

  // WebSocket 연결을 설정하는 useEffect 훅
  useEffect(() => {
    const websocket = new WebSocket(
      `wss://stream.binance.com/stream?streams=${defaultSymbol.toLowerCase()}@aggTrade/${defaultSymbol.toLowerCase()}@kline_${interval}/${defaultSymbol.toLowerCase()}@depth@1000ms/${defaultSymbol.toLowerCase()}@ticker/!miniTicker@arr@3000ms`
    );
    websocket.binaryType = "arraybuffer";

    websocket.onopen = () => {};

    websocket.onmessage = handleMessage;

    websocket.onerror = () => {
      websocket.close();
    };

    return () => {
      websocket.close();
    };
  }, [handleMessage, defaultSymbol, interval]);

  return {};
};

// 비정상 거래 공지 WebSocket 연결을 관리하는 커스텀 훅
export const useWebSocketAbnormalTradingNoticesConnection = () => {
  const queryClient = getQueryClient();

  // WebSocket 메시지를 처리하는 함수
  const handleMessage = useCallback(
    (event) => {
      const { stream, data } = JSON.parse(event.data);

      queryClient.setQueryData(["abnormalTradingNotices"], (oldData) => {
        if (!oldData) return [data];
        return [data, ...oldData];
      });
    },
    [queryClient]
  );

  // WebSocket 연결을 설정하는 useEffect 훅
  useEffect(() => {
    const websocket = new WebSocket(
      `wss://bstream.binance.com:9443/stream?streams=abnormaltradingnotices`
    );

    websocket.onopen = () => {};

    websocket.onmessage = handleMessage;

    websocket.onerror = () => {
      websocket.close();
    };

    return () => {
      websocket.close();
    };
  }, [handleMessage]);

  return {};
};
