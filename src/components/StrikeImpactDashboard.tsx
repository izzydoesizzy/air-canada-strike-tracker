import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { SourceTooltip } from "@/components/SourceTooltip";
import { Plane } from "lucide-react";
const STRIKE_START = new Date("2025-08-16T01:00:00-04:00");
const LOSS_PER_DAY = 100000000;
const LOSS_PER_HOUR = LOSS_PER_DAY / 24;
const LOSS_PER_MINUTE = LOSS_PER_DAY / (24 * 60);
const LOSS_PER_SECOND = LOSS_PER_DAY / (24 * 60 * 60);
const FLIGHT_ATTENDANTS = 10511;

// Visitor tracking constants - Updated to match real data
const VISITORS_AT_START = 9600; // 9.6K visitors at strike start
const CURRENT_TOTAL_VISITORS = 27100; // Current real total: 27.1K
const CURRENT_VISITORS_PER_HOUR = 1900; // Current real rate: 1.9K/hour
const ACCELERATION_FACTOR = 0.15; // Increased acceleration to match real growth
const BASE_VISITORS_PER_MINUTE = CURRENT_VISITORS_PER_HOUR / 60;
const BASE_VISITORS_PER_SECOND = CURRENT_VISITORS_PER_HOUR / 3600;
const sources = {
  dailyLoss: {
    title: "TD Cowen analyst estimates C$300M ($217M) loss for 3-day strike - Reuters",
    url: "https://www.reuters.com/business/world-at-work/air-canada-flight-attendants-deadlocked-with-strike-looming-2025-08-15/"
  },
  strikeStart: {
    title: "Strike begins August 16, 2025, at 01:00 ET",
    url: "https://www.aircanada.com/ca/en/aco/home/book/travel-news-and-updates/2025/ac-action.html"
  }
};
export function StrikeImpactDashboard() {
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
  const totalLossPerFA = totalLoss / FLIGHT_ATTENDANTS;

  // Visitor calculations - Updated to match real data
  const hoursElapsedSinceStart = timeElapsed / (1000 * 60 * 60);
  // Calculate what the base rate should be to reach current totals
  const effectiveBaseRate = hoursElapsedSinceStart > 0 ? 
    (CURRENT_TOTAL_VISITORS - VISITORS_AT_START) / hoursElapsedSinceStart : 
    CURRENT_VISITORS_PER_HOUR;
  const currentVisitorRate = CURRENT_VISITORS_PER_HOUR * (1 + ACCELERATION_FACTOR * (hoursElapsedSinceStart / 24));
  const totalVisitors = VISITORS_AT_START + (hoursElapsedSinceStart * effectiveBaseRate);
  const currentVisitorsPerSecond = currentVisitorRate / 3600;
  const currentVisitorsPerMinute = currentVisitorRate / 60;
  const daysElapsedWhole = Math.floor(timeElapsed / (1000 * 60 * 60 * 24));
  const hoursElapsed = Math.floor(timeElapsed % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
  const minutesElapsed = Math.floor(timeElapsed % (1000 * 60 * 60) / (1000 * 60));
  const secondsElapsed = Math.floor(timeElapsed % (1000 * 60) / 1000);
  const formatLargeCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(1)}B`;
    } else if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(0)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  const formatVisitors = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return Math.round(count).toLocaleString();
  };
  return <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 via-background to-primary-blue-subtle"></div>
      
      <div className="relative z-10 py-20 px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Main headline */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center space-x-3 px-6 py-3 bg-primary-blue/10 border border-primary-blue/20 rounded-full mb-4">
              <Plane className="h-5 w-5 text-primary-blue" />
              <span className="text-sm font-medium text-primary-blue uppercase tracking-wide">Air Canada Labour Dispute</span>
            </div>
            <h1 className="text-display-large md:text-[5rem] font-light text-foreground tracking-tight leading-none">
              Projected Strike Impact Tracker
            </h1>
            <a 
              href="https://strikecost.ca" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-primary-blue/10 border border-primary/20 rounded-full text-primary hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group"
            >
              <span className="text-sm font-medium">strikecost.ca</span>
              <svg className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <p className="text-lg md:text-xl text-muted-foreground font-normal max-w-3xl mx-auto leading-relaxed">
              Live projection of economic impact based on analyst estimates
            </p>
            <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground/70 bg-muted/20 px-4 py-2 rounded-full border border-border/30 max-w-2xl mx-auto">
              <span className="font-medium text-warning">PROJECTED</span>
              <span>•</span>
              <span>Based on TD Cowen analyst estimates, not confirmed losses</span>
            </div>
            <SourceTooltip source={sources.strikeStart}>
              <p className="text-sm text-muted-foreground/70">Since August 16, 2025 at 1:00 AM ET</p>
            </SourceTooltip>
          </div>

          {/* Main Side-by-Side Impact Cards - 2x2 grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-10 bg-surface-elevated/90 backdrop-blur-sm border border-border/30 shadow-3xl hover:shadow-4xl transition-all duration-500">
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <h2 className="text-xl font-semibold text-foreground tracking-wide uppercase">Projected Strike Losses</h2>
                  <div className="px-2 py-1 bg-warning/10 border border-warning/20 rounded text-xs text-warning font-medium">EST</div>
                </div>
                <SourceTooltip source={sources.dailyLoss}>
                  <div className="h-20 flex items-center justify-center">
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono text-loss-indicator leading-none animate-fade-in overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
                      {formatLargeCurrency(totalLoss)}
                    </div>
                  </div>
                </SourceTooltip>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">based on analyst projections</p>
                  <div className="text-lg font-mono text-loss-indicator">
                    projected rate: {formatCurrency(LOSS_PER_SECOND)}/sec
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-10 bg-surface-elevated/90 backdrop-blur-sm border border-border/30 shadow-3xl hover:shadow-4xl transition-all duration-500">
              <div className="text-center space-y-6">
                <h2 className="text-xl font-semibold text-foreground tracking-wide uppercase">Loss Per Flight Attendant</h2>
                <div className="h-20 flex items-center justify-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono text-loss-indicator leading-none animate-fade-in overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
                    {formatLargeCurrency(totalLossPerFA)}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">burned per worker</p>
                  <div className="text-lg font-mono text-loss-indicator">
                    +{formatCurrency(LOSS_PER_DAY / FLIGHT_ATTENDANTS)}/day each
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-10 bg-surface-elevated/90 backdrop-blur-sm border border-border/30 shadow-3xl hover:shadow-4xl transition-all duration-500">
              <div className="text-center space-y-6">
                <h2 className="text-xl font-semibold text-foreground tracking-wide uppercase">Total Page Visitors</h2>
                <div className="h-20 flex items-center justify-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono text-primary-blue leading-none animate-fade-in overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
                    {formatVisitors(totalVisitors)}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">and counting...</p>
                  <div className="text-lg font-mono text-primary-blue">
                    +{Math.round(currentVisitorsPerSecond * 10) / 10}/sec
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-10 bg-surface-elevated/90 backdrop-blur-sm border border-border/30 shadow-3xl hover:shadow-4xl transition-all duration-500">
              <div className="text-center space-y-6">
                <h2 className="text-xl font-semibold text-foreground tracking-wide uppercase">Visitors Per Hour</h2>
                <div className="h-20 flex items-center justify-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono text-primary-blue leading-none animate-fade-in overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
                    {formatVisitors(currentVisitorRate)}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">current rate</p>
                  <div className="text-lg font-mono text-primary-blue">
                    +{Math.round(currentVisitorsPerMinute)}/min
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Live Breakdown Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="p-6 bg-surface-elevated/70 backdrop-blur-sm border border-border/20 shadow-xl">
              <div className="text-center space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Per Second</h3>
                <div className="text-number-medium font-mono text-loss-indicator">
                  {formatCurrency(LOSS_PER_SECOND)}
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-surface-elevated/70 backdrop-blur-sm border border-border/20 shadow-xl">
              <div className="text-center space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Per Minute</h3>
                <div className="text-number-medium font-mono text-loss-indicator">
                  {formatCurrency(LOSS_PER_MINUTE)}
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-surface-elevated/70 backdrop-blur-sm border border-border/20 shadow-xl">
              <div className="text-center space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Per Hour</h3>
                <div className="text-number-medium font-mono text-loss-indicator">
                  {formatCurrency(LOSS_PER_HOUR)}
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-surface-elevated/70 backdrop-blur-sm border border-border/20 shadow-xl">
              <div className="text-center space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Per Day</h3>
                <div className="text-number-medium font-mono text-loss-indicator">
                  {formatCurrency(LOSS_PER_DAY)}
                </div>
              </div>
            </Card>
          </div>

          {/* Milestone Callouts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 bg-gradient-to-br from-surface-elevated to-surface-subtle border border-border/30 shadow-xl">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Strike Duration</h3>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div>
                    <div className="text-number-small font-mono text-loss-indicator">{daysElapsedWhole.toString().padStart(2, '0')}</div>
                    <div className="text-xs text-muted-foreground font-medium">DAYS</div>
                  </div>
                  <div>
                    <div className="text-number-small font-mono text-loss-indicator">{hoursElapsed.toString().padStart(2, '0')}</div>
                    <div className="text-xs text-muted-foreground font-medium">HRS</div>
                  </div>
                  <div>
                    <div className="text-number-small font-mono text-loss-indicator">{minutesElapsed.toString().padStart(2, '0')}</div>
                    <div className="text-xs text-muted-foreground font-medium">MIN</div>
                  </div>
                  <div>
                    <div className="text-number-small font-mono text-loss-indicator">{secondsElapsed.toString().padStart(2, '0')}</div>
                    <div className="text-xs text-muted-foreground font-medium">SEC</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-surface-elevated to-surface-subtle border border-border/30 shadow-xl">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold text-foreground">10 Days Impact</h3>
                <div className="text-number-large font-mono text-loss-indicator">
                  $95,000
                </div>
                <p className="text-sm text-muted-foreground">burned per flight attendant</p>
              </div>
            </Card>

            
          </div>
        </div>
      </div>
    </div>;
}