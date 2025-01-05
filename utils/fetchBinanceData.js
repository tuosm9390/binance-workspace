import axios from "axios"

export const getBinanceData = async (interval, symbol) => {
  const params = new URLSearchParams();

  if (interval) params.append('interval', interval)
  if (symbol) params.append('symbol', symbol)

  const url = `https://api.binance.com/api/v3/klines?${params.toString()}&limit=100`
  const response = await axios.get(url)

  return response.data
}
