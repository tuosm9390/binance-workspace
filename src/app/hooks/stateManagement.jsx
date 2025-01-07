import { create } from "zustand";

export const useSymbolStore = create((set) => ({
  defaultSymbol: "BTCUSDT",
  base: "BTC",
  quote: "USDT",
  setDefaultSymbol: (symbol) => set({ defaultSymbol: symbol }),
  setBase: (base) => set({ base }),
  setQuote: (quote) => set({ quote }),
}));
