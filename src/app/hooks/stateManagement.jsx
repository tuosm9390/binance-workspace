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
  setPrice: (price) => set({ price }),
}));

// Order Form tp/sl checkbox
export const useOrderFormStore = create((set) => ({
  orderForm: false,
  setOrderForm: (orderForm) => set({ orderForm }),
}));
