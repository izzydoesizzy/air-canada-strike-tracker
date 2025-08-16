import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { TrendingDown, TrendingUp, Minus, Activity, DollarSign } from "lucide-react";
import { SourceTooltip } from "./SourceTooltip";

// Types for better data structure
interface StockDataPoint {
  time: string;
  price: number;
  volume?: number;
  timestamp: number;
}

interface TimeFrame {
  id: string;
  label: string;
  interval: number; // milliseconds
  dataPoints: number;
  format: string;
}

// Time frame configurations
const timeFrames: TimeFrame[] = [
  { id: "realtime", label: "Live", interval: 5000, dataPoints: 20, format: "HH:mm:ss" },
  { id: "1d", label: "1D", interval: 300000, dataPoints: 288, format: "HH:mm" }, // 5 min intervals
  { id: "5d", label: "5D", interval: 1800000, dataPoints: 400, format: "MMM d HH:mm" }, // 30 min intervals
  { id: "1m", label: "1M", interval: 3600000, dataPoints: 720, format: "MMM d" }, // 1 hour intervals
  { id: "3m", label: "3M", interval: 21600000, dataPoints: 360, format: "MMM d" }, // 6 hour intervals
  { id: "6m", label: "6M", interval: 86400000, dataPoints: 180, format: "MMM d" }, // daily intervals
  { id: "1y", label: "1Y", interval: 86400000, dataPoints: 365, format: "MMM yyyy" }, // daily intervals
];

// Enhanced mock data generators
const generateStockDataForTimeFrame = (timeFrame: TimeFrame): StockDataPoint[] => {
  const basePrice = 21.45; // Pre-strike price
  const strikeImpact = -0.15; // 15% negative impact
  const currentPrice = basePrice * (1 + strikeImpact);
  
  const data: StockDataPoint[] = [];
  const now = Date.now();
  
  for (let i = 0; i < timeFrame.dataPoints; i++) {
    const timestamp = now - (timeFrame.dataPoints - 1 - i) * timeFrame.interval;
    const volatility = timeFrame.id === "realtime" ? 0.01 : 0.03;
    
    // Simulate gradual decline due to strike with some recovery attempts
    const timeProgress = i / timeFrame.dataPoints;
    const strikeEffect = Math.max(-0.15, -0.08 - 0.07 * Math.sin(timeProgress * Math.PI * 2));
    const randomVariation = (Math.random() - 0.5) * volatility;
    
    const price = basePrice * (1 + strikeEffect + randomVariation);
    
    data.push({
      time: new Date(timestamp).toLocaleTimeString("en-US", { 
        hour12: false,
        ...(timeFrame.format.includes("HH:mm:ss") && { second: "2-digit" }),
        ...(timeFrame.format.includes("HH:mm") && { hour: "2-digit", minute: "2-digit" }),
        ...(timeFrame.format.includes("MMM") && { month: "short", day: "numeric" }),
      }),
      price: Math.max(0, price),
      volume: Math.floor(Math.random() * 1000000) + 500000,
      timestamp
    });
  }
  
  return data;
};

const chartConfig = {
  price: {
    label: "Price",
    color: "hsl(var(--primary-blue))",
  },
};

export function StockTracker() {
  const [activeTimeFrame, setActiveTimeFrame] = useState("realtime");
  const [stockData, setStockData] = useState<Record<string, StockDataPoint[]>>({});
  
  // Initialize data for all timeframes
  useEffect(() => {
    const initialData: Record<string, StockDataPoint[]> = {};
    timeFrames.forEach(tf => {
      initialData[tf.id] = generateStockDataForTimeFrame(tf);
    });
    setStockData(initialData);
  }, []);

  // Real-time updates for active timeframe
  useEffect(() => {
    if (activeTimeFrame !== "realtime") return;
    
    const interval = setInterval(() => {
      setStockData(prev => {
        const currentData = prev[activeTimeFrame] || [];
        const newData = generateStockDataForTimeFrame(timeFrames.find(tf => tf.id === activeTimeFrame)!);
        
        return {
          ...prev,
          [activeTimeFrame]: newData
        };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [activeTimeFrame]);

  const currentData = stockData[activeTimeFrame] || [];
  const currentPrice = currentData[currentData.length - 1]?.price || 18.23;
  const previousPrice = currentData[currentData.length - 2]?.price || 21.45;
  const preStrikePrice = 21.45;
  
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = ((currentPrice - preStrikePrice) / preStrikePrice) * 100;
  const isPositive = priceChange > 0;
  const isNegative = priceChange < 0;

  const maxPrice = Math.max(...currentData.map(d => d.price));
  const minPrice = Math.min(...currentData.map(d => d.price));

  const source = {
    title: "Air Canada Stock Data - Toronto Stock Exchange",
    url: "https://www.tsx.com/listings/listing-with-us/listed-company-directory"
  };

  return (
    <Card className="p-8 bg-gradient-to-br from-surface-elevated to-surface-subtle border border-border/20 shadow-elegant hover:shadow-glow transition-all duration-500">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <SourceTooltip source={source}>
              <h2 className="text-lg font-medium text-muted-foreground flex items-center justify-center gap-2">
                <Activity className="h-5 w-5 text-primary-blue" />
                Air Canada Stock Price
              </h2>
            </SourceTooltip>
            <p className="text-sm text-muted-foreground/70">TSX: AC • Live Market Data</p>
          </div>
          
          <div className="space-y-4">
            <div className="text-5xl font-light font-mono text-foreground tracking-tight">
              <DollarSign className="inline h-10 w-10 -mt-2 text-muted-foreground/40" />
              {currentPrice.toFixed(2)}
            </div>
            
            <div className={`flex items-center justify-center gap-2 text-sm font-medium transition-colors duration-300 ${
              isPositive ? 'text-success' : isNegative ? 'text-destructive' : 'text-muted-foreground'
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

        {/* Time Frame Tabs */}
        <Tabs value={activeTimeFrame} onValueChange={setActiveTimeFrame} className="w-full">
          <TabsList className="grid w-full grid-cols-7 bg-surface-subtle/50 border border-border/30">
            {timeFrames.map((tf) => (
              <TabsTrigger 
                key={tf.id} 
                value={tf.id}
                className="text-xs font-medium data-[state=active]:bg-surface-elevated data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all duration-200"
              >
                {tf.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {timeFrames.map((tf) => (
            <TabsContent key={tf.id} value={tf.id} className="mt-6 space-y-6">
              {/* Chart */}
              <div className="h-80 w-full">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <XAxis 
                        dataKey="time" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                        interval="preserveStartEnd"
                      />
                      <YAxis 
                        domain={['dataMin - 0.5', 'dataMax + 0.5']}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                        tickFormatter={(value) => `$${value.toFixed(2)}`}
                      />
                      <ChartTooltip 
                        content={<ChartTooltipContent />}
                        labelFormatter={(label) => `Time: ${label}`}
                        formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke="hsl(var(--primary-blue))" 
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ 
                          r: 4, 
                          fill: 'hsl(var(--primary-blue))',
                          stroke: 'hsl(var(--background))',
                          strokeWidth: 2
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>

              {/* Market Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-surface-subtle/30 rounded-lg p-4 border border-border/20">
                  <p className="text-xs text-muted-foreground mb-1">24h High</p>
                  <p className="text-lg font-semibold text-success">${maxPrice.toFixed(2)}</p>
                </div>
                <div className="bg-surface-subtle/30 rounded-lg p-4 border border-border/20">
                  <p className="text-xs text-muted-foreground mb-1">24h Low</p>
                  <p className="text-lg font-semibold text-destructive">${minPrice.toFixed(2)}</p>
                </div>
                <div className="bg-surface-subtle/30 rounded-lg p-4 border border-border/20">
                  <p className="text-xs text-muted-foreground mb-1">Pre-Strike</p>
                  <p className="text-lg font-semibold text-muted-foreground">${preStrikePrice.toFixed(2)}</p>
                </div>
                <div className="bg-surface-subtle/30 rounded-lg p-4 border border-border/20">
                  <p className="text-xs text-muted-foreground mb-1">Impact</p>
                  <p className="text-lg font-semibold text-destructive">{priceChangePercent.toFixed(1)}%</p>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="text-center">
          <p className="text-xs text-muted-foreground/60">
            *Stock prices are simulated for demonstration • Updates every {activeTimeFrame === "realtime" ? "5 seconds" : "periodically"}
          </p>
        </div>
      </div>
    </Card>
  );
}