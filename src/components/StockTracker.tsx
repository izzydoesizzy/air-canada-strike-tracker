import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";

// Mock stock data - in a real implementation, this would come from a stock API
const generateMockStockData = () => {
  const basePrice = 21.45; // Approximate AC stock price
  const volatility = 0.02; // 2% volatility
  const strikeImpact = -0.15; // Assumed 15% negative impact from strike
  
  return basePrice * (1 + strikeImpact + (Math.random() - 0.5) * volatility);
};

export function StockTracker() {
  const [currentPrice, setCurrentPrice] = useState(18.23); // Strike-impacted price
  const [previousPrice, setPreviousPrice] = useState(21.45);
  const [priceHistory, setPriceHistory] = useState<number[]>([21.45, 20.89, 19.56, 18.92, 18.23]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newPrice = generateMockStockData();
      setPreviousPrice(currentPrice);
      setCurrentPrice(newPrice);
      setPriceHistory(prev => [...prev.slice(-19), newPrice]); // Keep last 20 points
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [currentPrice]);

  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = ((currentPrice - 21.45) / 21.45) * 100; // Change from pre-strike price
  const isPositive = priceChange > 0;
  const isNegative = priceChange < 0;

  const maxPrice = Math.max(...priceHistory);
  const minPrice = Math.min(...priceHistory);

  return (
    <Card className="p-8 bg-gradient-to-br from-surface-elevated to-surface-subtle border border-border/30 shadow-large hover:shadow-xl transition-all duration-300">
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <h2 className="text-lg font-medium text-muted-foreground">Air Canada Stock Price</h2>
            <p className="text-sm text-muted-foreground/70">TSX: AC • Real-time tracking</p>
          </div>
          
          <div className="space-y-3">
            <div className="text-5xl font-light font-mono text-foreground">
              ${currentPrice.toFixed(2)}
            </div>
            
            <div className={`flex items-center justify-center gap-2 text-sm font-medium ${
              isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-muted-foreground'
            }`}>
              {isPositive ? <TrendingUp className="h-4 w-4" /> : 
               isNegative ? <TrendingDown className="h-4 w-4" /> : 
               <Minus className="h-4 w-4" />}
              
              <span>
                {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} 
                ({priceChangePercent >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>

        {/* Mini Chart */}
        <div className="space-y-3">
          <div className="h-20 flex items-end gap-1 justify-center">
            {priceHistory.map((price, index) => {
              const height = ((price - minPrice) / (maxPrice - minPrice)) * 60 + 10;
              const isLast = index === priceHistory.length - 1;
              return (
                <div
                  key={index}
                  className={`w-2 transition-all duration-300 ${
                    isLast ? 'bg-primary-blue' : 'bg-primary-blue/60'
                  }`}
                  style={{ height: `${height}px` }}
                />
              );
            })}
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>24h Low: ${minPrice.toFixed(2)}</span>
            <span>24h High: ${maxPrice.toFixed(2)}</span>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            *Stock prices are simulated for demonstration • Updates every 5 seconds
          </p>
        </div>
      </div>
    </Card>
  );
}