import axios from "axios"

export const getBinanceChartData = async (interval, symbol) => {
  const params = new URLSearchParams();

  if (interval) params.append('interval', interval)
  if (symbol) params.append('symbol', symbol)

  const url = `https://api.binance.com/api/v3/klines?${params.toString()}&limit=100`
  const response = await axios.get(url)

  return response.data
}

export const getBinanceSymbol24HTickerPrice = async (symbol) => {
  const url = `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`
  const response = await axios.get(url)

  return response.data
}

export const getBinanceHotCoins = async () => {
  const url = `https://www.binance.com/bapi/apex/v1/public/apex/market/spot/hot-coins?currency=USD`
  const response = await axios.get(url)

  return response.data
}

export const getBinanceListedCoins = async () => {
  const url = `https://www.binance.com/bapi/margin/v1/public/isolated-margin/pair/listed`
  const response = await axios.get(url)

  return response.data
}

export const getBinanceDepth = async (symbol) => {
  const url = `https://www.binance.com/api/v3/depth?symbol=${symbol}&limit=1000`
  const response = await axios.get(url)

  return response.data
}

export const getBinanceTrades = async (symbol) => {
  const url = `https://www.binance.com/api/v3/trades?symbol=${symbol}&limit=100`
  const response = await axios.get(url)

  return response.data
}