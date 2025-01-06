import { create } from 'zustand'

export const useSymbolStore = create((set) => ({
  defaultSymbol: "BTCUSDT",
  setDefaultSymbol: (symbol) => set({ defaultSymbol: symbol }),
}))