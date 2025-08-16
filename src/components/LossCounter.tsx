import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { SourceTooltip } from "@/components/SourceTooltip";

const STRIKE_START = new Date("2025-08-16T01:00:00-04:00"); // August 16, 2025, 1:00 AM ET
const LOSS_PER_DAY = 100000000; // $100M per day
const LOSS_PER_HOUR = LOSS_PER_DAY / 24;
const LOSS_PER_MINUTE = LOSS_PER_DAY / (24 * 60);
const LOSS_PER_SECOND = LOSS_PER_DAY / (24 * 60 * 60); // $1,157 per second
const FLIGHT_ATTENDANTS = 10511; // Official number of Air Canada flight attendants
const LOSS_PER_ATTENDANT_PER_DAY = LOSS_PER_DAY / FLIGHT_ATTENDANTS;
const LOSS_PER_FA_PER_SECOND = LOSS_PER_SECOND / FLIGHT_ATTENDANTS; // ~$0.11 per FA per second

const sources = {
  dailyLoss: {
    title: "Air Canada's estimated daily operational impact during labour disruption",
    url: "https://www.aircanada.com/media/air-canada-receives-72-hour-strike-notice-from-cupe-and-issues-lockout-notice-in-response/"
  },
  attendantCount: {
    title: "CUPE represents approximately 10,000 Air Canada flight attendants",
    url: "https://cupe.ca/air-canada-flight-attendants-forced-issue-strike-notice-end-unpaid-work"
  },
  strikeStart: {
    title: "Strike begins August 16, 2025, at 01:00 ET",
    url: "https://www.aircanada.com/ca/en/aco/home/book/travel-news-and-updates/2025/ac-action.html"
  }
};

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
  const secondsElapsed = timeElapsed / 1000;
  
  const totalLoss = secondsElapsed * LOSS_PER_SECOND;
  const totalLossPerFA = totalLoss / FLIGHT_ATTENDANTS;

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
    <div className="space-y-12">
      {/* Side-by-Side Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Total Strike Losses */}
        <Card className="p-12 bg-gradient-to-br from-loss-indicator/10 to-loss-indicator/5 border border-loss-indicator/20 shadow-large hover:shadow-xl transition-all duration-300">
          <div className="text-center space-y-8">
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Total Strike Losses
              </h2>
              <div className="relative inline-block">
                <SourceTooltip source={sources.dailyLoss}>
                  <div className="text-display-large md:text-[4rem] font-mono text-loss-indicator font-medium tracking-tight transition-all duration-500">
                    {formatLargeCurrency(totalLoss)}
                  </div>
                </SourceTooltip>
              </div>
              <p className="text-base font-semibold text-loss-indicator">
                ${(LOSS_PER_SECOND).toLocaleString()} per second
              </p>
            </div>
            <div className="space-y-2">
              <SourceTooltip source={sources.strikeStart}>
                <p className="text-muted-foreground text-base">
                  Since August 16, 2025 at 1:00 AM ET
                </p>
              </SourceTooltip>
            </div>
          </div>
        </Card>

        {/* Per Flight Attendant Impact */}
        <Card className="p-12 bg-gradient-to-br from-accent-blue/10 to-accent-blue/5 border border-accent-blue/20 shadow-large hover:shadow-xl transition-all duration-300">
          <div className="text-center space-y-8">
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                What This Means Per Flight Attendant
              </h2>
              <SourceTooltip source={sources.attendantCount}>
                <div className="text-display-large md:text-[4rem] font-mono text-accent-blue font-medium tracking-tight transition-all duration-500">
                  {formatLargeCurrency(totalLossPerFA)}
                </div>
              </SourceTooltip>
              <p className="text-base font-semibold text-accent-blue">
                ${LOSS_PER_ATTENDANT_PER_DAY.toLocaleString()} per day per FA
              </p>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p><span className="font-mono text-accent-blue font-semibold">{FLIGHT_ATTENDANTS.toLocaleString()}</span> flight attendants</p>
              <p>Every second costs <span className="font-mono text-accent-blue font-semibold">${LOSS_PER_FA_PER_SECOND.toFixed(2)}</span> per FA</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Breakdown Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-6 bg-surface-elevated border border-border/30 shadow-elegant hover:shadow-medium transition-all duration-300 group">
          <div className="text-center space-y-3">
            <h3 className="text-sm text-muted-foreground font-medium tracking-wide">Per Day</h3>
            <SourceTooltip source={sources.dailyLoss}>
              <div className="text-number-small font-mono font-medium text-loss-indicator group-hover:scale-105 transition-transform duration-200">
                {formatCurrency(LOSS_PER_DAY)}
              </div>
            </SourceTooltip>
          </div>
        </Card>

        <Card className="p-6 bg-surface-elevated border border-border/30 shadow-elegant hover:shadow-medium transition-all duration-300 group">
          <div className="text-center space-y-3">
            <h3 className="text-sm text-muted-foreground font-medium tracking-wide">Per Hour</h3>
            <div className="text-number-small font-mono font-medium text-loss-indicator group-hover:scale-105 transition-transform duration-200">
              {formatCurrency(LOSS_PER_HOUR)}
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-surface-elevated border border-border/30 shadow-elegant hover:shadow-medium transition-all duration-300 group">
          <div className="text-center space-y-3">
            <h3 className="text-sm text-muted-foreground font-medium tracking-wide">Per Minute</h3>
            <div className="text-number-small font-mono font-medium text-loss-indicator group-hover:scale-105 transition-transform duration-200">
              {formatCurrency(LOSS_PER_MINUTE)}
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-surface-elevated border border-border/30 shadow-elegant hover:shadow-medium transition-all duration-300 group">
          <div className="text-center space-y-3">
            <h3 className="text-sm text-muted-foreground font-medium tracking-wide">Per Second</h3>
            <div className="text-number-small font-mono font-medium text-loss-indicator group-hover:scale-105 transition-transform duration-200">
              {formatCurrency(LOSS_PER_SECOND)}
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-surface-elevated border border-border/30 shadow-elegant hover:shadow-medium transition-all duration-300 group">
          <div className="text-center space-y-3">
            <h3 className="text-sm text-muted-foreground font-medium tracking-wide">Total Per Flight Attendant</h3>
            <SourceTooltip source={sources.attendantCount}>
              <div className="text-number-small font-mono font-medium text-loss-indicator group-hover:scale-105 transition-transform duration-200">
                {formatCurrency(totalLossPerFA)}
              </div>
            </SourceTooltip>
          </div>
        </Card>
      </div>

      {/* Milestone Callouts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-8 bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-500/20 shadow-elegant">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-foreground">10 Days of Strike</h3>
            <div className="text-number-medium font-mono text-amber-600 font-semibold">
              $95,000
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Lost per flight attendant = <strong>more than average annual salary</strong>
            </p>
          </div>
        </Card>

        <Card className="p-8 bg-gradient-to-r from-red-500/10 to-red-500/5 border border-red-500/20 shadow-elegant">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-foreground">30 Days of Strike</h3>
            <div className="text-number-medium font-mono text-red-600 font-semibold">
              $285,000
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Lost per flight attendant = <strong>more than many make in years</strong>
            </p>
          </div>
        </Card>

        <Card className="p-8 bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/20 shadow-elegant">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Fair Pay Settlement</h3>
            <div className="text-number-medium font-mono text-green-600 font-semibold">
              Fraction
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Union demands = <strong>fraction of current losses</strong>
            </p>
          </div>
        </Card>
      </div>

      {/* Live Stats */}
      <Card className="p-8 bg-primary-blue-subtle border border-primary-blue/10 shadow-elegant">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-3">
            <h3 className="text-sm text-muted-foreground font-medium tracking-wide">Days Elapsed</h3>
            <div className="text-xl font-mono font-medium text-foreground">
              {daysElapsed.toFixed(2)}
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm text-muted-foreground font-medium tracking-wide">Hours Elapsed</h3>
            <div className="text-xl font-mono font-medium text-foreground">
              {hoursElapsed.toFixed(1)}
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm text-muted-foreground font-medium tracking-wide">Minutes Elapsed</h3>
            <div className="text-xl font-mono font-medium text-foreground">
              {minutesElapsed.toFixed(0)}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}