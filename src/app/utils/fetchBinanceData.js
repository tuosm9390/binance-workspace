import axios from "axios";

export const getBinanceChartData = async (interval, symbol) => {
  const params = new URLSearchParams();

  if (interval) params.append("interval", interval);
  if (symbol) params.append("symbol", symbol);

  const url = `https://api.binance.com/api/v3/uiKlines?${params.toString()}&limit=100`;
  const response = await axios.get(url);

  return response.data;
};

export const getBinanceSymbolTickerPriceData = async (symbol) => {
  const url = `https://api.binance.com/api/v3/ticker/24hr${symbol ? `?symbol=${symbol}` : ""}`;
  const response = await axios.get(url);

  return response.data;
};

export const getBinanceHotCoinsData = async () => {
  const url = `https://www.binance.com/bapi/apex/v1/public/apex/market/spot/hot-coins?currency=USD`;
  const response = await axios.get(url);

  return response.data;
};

export const getBinanceOrderBookData = async (symbol) => {
  const url = `https://www.binance.com/api/v3/depth?symbol=${symbol}&limit=1000`;
  const response = await axios.get(url);

  return response.data;
};

export const getBinanceTradesData = async (symbol) => {
  const url = `https://www.binance.com/api/v3/trades?symbol=${symbol}&limit=100`;
  const response = await axios.get(url);

  return response.data;
};

export const getBinanceProductBySymbolData = async (symbol) => {
  const url = `https://www.binance.com/bapi/asset/v2/public/asset-service/product/get-product-by-symbol?symbol=${symbol}`;
  const response = await axios.get(url);

  return response.data;
};

export const getBinanceExchangeInfoData = async (symbol) => {
  const url = `https://www.binance.com/api/v3/exchangeInfo?symbol=${symbol}`;
  const response = await axios.get(url);

  return response.data;
};
