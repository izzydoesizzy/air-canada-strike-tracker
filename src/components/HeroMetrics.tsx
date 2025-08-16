import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { SourceTooltip } from "@/components/SourceTooltip";

const STRIKE_START = new Date("2025-08-16T01:00:00-04:00");
const LOSS_PER_DAY = 100000000;

const sources = {
  dailyLoss: {
    title: "Air Canada's estimated daily operational impact during labour disruption",
    url: "https://www.aircanada.com/media/air-canada-receives-72-hour-strike-notice-from-cupe-and-issues-lockout-notice-in-response/"
  }
};

export function HeroMetrics() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeElapsed = Math.max(0, currentTime.getTime() - STRIKE_START.getTime());
  const daysElapsed = timeElapsed / (1000 * 60 * 60 * 24);
  const totalLoss = daysElapsed * LOSS_PER_DAY;

  const formatLargeCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 via-background to-primary-blue-subtle"></div>
      
      <div className="relative z-10 text-center py-20 px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Main headline */}
          <div className="space-y-6">
            <h1 className="text-display-large md:text-[5rem] font-light text-foreground tracking-tight leading-none">
              Air Canada Strike
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-normal max-w-3xl mx-auto leading-relaxed">
              Real-time tracking of economic impact, operational disruption, and market response
            </p>
          </div>

          {/* Key metrics grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <Card className="p-8 bg-surface-elevated/80 backdrop-blur-sm border border-border/30 shadow-2xl hover:shadow-3xl transition-all duration-500">
              <div className="text-center space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">Total Economic Impact</h3>
                <SourceTooltip source={sources.dailyLoss}>
                  <div className="text-number-large md:text-number-large font-mono text-loss-indicator">
                    {formatLargeCurrency(totalLoss)}
                  </div>
                </SourceTooltip>
                <p className="text-xs text-muted-foreground">and counting...</p>
              </div>
            </Card>

            <Card className="p-8 bg-surface-elevated/80 backdrop-blur-sm border border-border/30 shadow-2xl hover:shadow-3xl transition-all duration-500">
              <div className="text-center space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">Daily Passenger Impact</h3>
                <div className="text-number-large md:text-number-large font-mono text-loss-indicator">
                  130,000
                </div>
                <p className="text-xs text-muted-foreground">affected travelers per day</p>
              </div>
            </Card>

            <Card className="p-8 bg-surface-elevated/80 backdrop-blur-sm border border-border/30 shadow-2xl hover:shadow-3xl transition-all duration-500">
              <div className="text-center space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">Flight Cancellations</h3>
                <div className="text-number-large md:text-number-large font-mono text-loss-indicator">
                  500+
                </div>
                <p className="text-xs text-muted-foreground">flights cancelled daily</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}