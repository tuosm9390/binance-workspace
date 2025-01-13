import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useWebSocketConnection = (defaultSymbol, interval = "1h") => {
  // 웹소켓 연결
  const queryClient = useQueryClient();
  useEffect(() => {
    const websocket = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${defaultSymbol.toLowerCase()}@aggTrade/${defaultSymbol.toLowerCase()}@kline_${interval}/${defaultSymbol.toLowerCase()}@depth@1000ms/${defaultSymbol.toLowerCase()}@ticker/!miniTicker@arr@3000ms`);
    websocket.onopen = () => {
      return
    };
    websocket.onmessage = (event) => {
      const { stream, data } = JSON.parse(event.data);
      // stream 종류에 따라 데이터 변환 및 쿼리 업데이트
      if (stream.includes("aggTrade")) {
        const transformedData = {
          id: data.t,
          isBestMatch: data.M,
          isBuyerMaker: data.m,
          price: data.p,
          qty: data.q,
          quoteQty: (parseFloat(data.p) * parseFloat(data.q)).toString(),
          time: data.T
        };

        // setQueriesData를 setQueryData로 변경
        // setQueriesData: 부분적으로 일치하는 모든 쿼리에 영향
        // setQueryData: 정확히 일치하는 쿼리에만 영향
        queryClient.setQueryData(
          ["trades", defaultSymbol],
          (oldData) => {
            // oldData가 없거나 배열이 아닌 경우 새 배열 생성
            const currentTrades = Array.isArray(oldData) ? oldData : [];
            return [transformedData, ...currentTrades].slice(0, 50); // 최대 50개로 제한
          },
        );
      } else if (stream.includes("kline_1h")) {
        const transformedData = {
          x: data.k.t,  // Kline open time
          y: [
            parseFloat(data.k.o),  // Open price
            parseFloat(data.k.h),  // High price
            parseFloat(data.k.l),  // Low price
            parseFloat(data.k.c),  // Close price
          ]
        };

        queryClient.setQueryData(
          ["binanceChartData", "1h", defaultSymbol],
          (oldData) => {
            if (!oldData) return [transformedData].slice(0, 100);

            // 마지막 캔들의 시간과 새로운 데이터의 시간 비교
            const lastCandle = oldData[oldData.length - 1];
            if (lastCandle.x === transformedData.x) {
              // 같은 시간대의 캔들이면 업데이트
              return [...oldData.slice(0, -1), transformedData].slice(0, 100);
            } else {
              // 새로운 시간대의 캔들이면 추가
              return [...oldData, transformedData].slice(0, 100);
            }
          }
        );
      } else if (stream.includes("depth")) {
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
      } else if (stream.includes("ticker")) {
        const transformedData = {
          "symbol": data.s,
          "priceChange": data.p,
          "priceChangePercent": data.P,
          "weightedAvgPrice": data.w,
          "openPrice": data.o,
          "highPrice": data.h,
          "lowPrice": data.l,
          "lastPrice": data.c,
          "volume": data.v,
          "quoteVolume": data.q,
          "openTime": data.O,
          "closeTime": data.C,
          "firstId": data.F,
          "lastId": data.L,
          "count": data.n
        };

        queryClient.setQueryData(
          ["getBinanceSymbolTickerPriceData", defaultSymbol],
          (oldData) => {
            return transformedData;
          }
        );
      } else if (stream.includes("miniTicker")) {
        data.forEach(item => {
          const transformedData = {
            "symbol": item.s,
            "openPrice": parseFloat(item.o),
            "lastPrice": parseFloat(item.c),
            "count": item.n
          };

          queryClient.setQueryData(
            ["allTickerPriceData"],
            (oldData) => {
              if (!oldData) return oldData;
              return oldData.map(coin => {
                if (coin.symbol === transformedData.symbol) {
                  return {
                    ...coin,
                    lastPrice: transformedData.lastPrice,
                    priceChangePercent: ((transformedData.lastPrice - transformedData.openPrice) / transformedData.openPrice) * 100,
                  };
                }
                return coin;
              });
            }
          );
        });
      }
    };

    return () => {
      websocket.close();
    };
  }, [queryClient]);
};