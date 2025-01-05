const TradingView = () => {
  return (
    <div className="trading-view">
      <TradingChart />
      <OrderBook />
      <TradeHistory />
      <TradingForm />
    </div>
  );
}

export default TradingView;