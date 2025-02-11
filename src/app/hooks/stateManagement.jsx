import { create } from "zustand";

// Symbol
export const useSymbolStore = create((set) => ({
  defaultSymbol: "BTCUSDT",
  base: "BTC",
  quote: "USDT",
  setDefaultSymbol: (symbol) => set({ defaultSymbol: symbol }),
  setBase: (base) => set({ base }),
  setQuote: (quote) => set({ quote }),
}));

// Price
export const usePriceStore = create((set) => ({
  price: 0,
  lastPrice: 0,
  isBuyMaker: false,
  setPrice: (price) => set({ price }),
  setLastPrice: (lastPrice) => set({ lastPrice }),
  setIsBuyMaker: (isBuyMaker) => set({ isBuyMaker }),
}));

// Order Form tp/sl checkbox
export const useOrderFormStore = create((set) => ({
  orderForm: false,
  setOrderForm: (orderForm) => set({ orderForm }),
}));

// ticker
export const useTickerStore = create((set) => ({
  ticker: {},
  setTicker: (ticker) => set({ ticker }),
}));

// depth
export const useDepthStore = create((set) => ({
  depth: {},
  setDepth: (depth) => set({ depth }),
}));

// kline
export const useKlineStore = create((set) => ({
  kline: {},
  setKline: (kline) => set({ kline }),
}));

// miniTicker
export const useMiniTickerStore = create((set) => ({
  miniTicker: [],
  setMiniTicker: (miniTicker) => set({ miniTicker }),
}));

// aggTrade
export const useAggTradeStore = create((set) => ({
  aggTrade: {},
  setAggTrade: (aggTrade) => set({ aggTrade }),
}));
