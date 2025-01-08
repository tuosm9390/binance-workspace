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