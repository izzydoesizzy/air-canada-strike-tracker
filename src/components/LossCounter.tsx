import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

const STRIKE_START = new Date("2025-08-16T01:00:00-04:00"); // August 16, 2025, 1:00 AM ET
const LOSS_PER_DAY = 100000000; // $100M per day
const LOSS_PER_HOUR = LOSS_PER_DAY / 24;
const LOSS_PER_MINUTE = LOSS_PER_DAY / (24 * 60);
const LOSS_PER_ATTENDANT_PER_DAY = 10000; // $10K per attendant per day

export function LossCounter() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeElapsed = Math.max(0, currentTime.getTime() - STRIKE_START.getTime());
  const daysElapsed = timeElapsed / (1000 * 60 * 60 * 24);
  const hoursElapsed = timeElapsed / (1000 * 60 * 60);
  const minutesElapsed = timeElapsed / (1000 * 60);

  const totalLoss = daysElapsed * LOSS_PER_DAY;

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(2)}B`;
    } else if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(2)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toFixed(0)}`;
  };

  const formatLargeCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-8">
      {/* Main Counter */}
      <Card className="p-8 bg-gradient-to-br from-card to-secondary border-border shadow-2xl">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold text-muted-foreground">
            Total Estimated Losses
          </h1>
          <div className="relative">
            <div className="text-6xl md:text-8xl font-bold text-loss-red font-mono tracking-tight">
              {formatLargeCurrency(totalLoss)}
            </div>
            <div className="absolute inset-0 text-6xl md:text-8xl font-bold text-loss-red-glow font-mono tracking-tight opacity-50 blur-sm animate-pulse">
              {formatLargeCurrency(totalLoss)}
            </div>
          </div>
          <p className="text-muted-foreground text-lg">
            Since August 16, 2025 at 1:00 AM ET
          </p>
        </div>
      </Card>

      {/* Breakdown Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-card to-secondary border-border">
          <div className="text-center space-y-2">
            <h3 className="text-sm text-muted-foreground font-medium">Loss Per Day</h3>
            <div className="text-2xl font-bold text-loss-red">
              {formatCurrency(LOSS_PER_DAY)}
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-card to-secondary border-border">
          <div className="text-center space-y-2">
            <h3 className="text-sm text-muted-foreground font-medium">Loss Per Hour</h3>
            <div className="text-2xl font-bold text-loss-red">
              {formatCurrency(LOSS_PER_HOUR)}
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-card to-secondary border-border">
          <div className="text-center space-y-2">
            <h3 className="text-sm text-muted-foreground font-medium">Loss Per Minute</h3>
            <div className="text-2xl font-bold text-loss-red">
              {formatCurrency(LOSS_PER_MINUTE)}
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-card to-secondary border-border">
          <div className="text-center space-y-2">
            <h3 className="text-sm text-muted-foreground font-medium">Per Flight Attendant/Day</h3>
            <div className="text-2xl font-bold text-loss-red">
              {formatCurrency(LOSS_PER_ATTENDANT_PER_DAY)}
            </div>
          </div>
        </Card>
      </div>

      {/* Live Stats */}
      <Card className="p-6 bg-gradient-to-br from-card to-secondary border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <h3 className="text-sm text-muted-foreground font-medium">Days Elapsed</h3>
            <div className="text-xl font-bold text-foreground">
              {daysElapsed.toFixed(2)}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm text-muted-foreground font-medium">Hours Elapsed</h3>
            <div className="text-xl font-bold text-foreground">
              {hoursElapsed.toFixed(1)}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm text-muted-foreground font-medium">Minutes Elapsed</h3>
            <div className="text-xl font-bold text-foreground">
              {minutesElapsed.toFixed(0)}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}