import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { SourceTooltip } from "@/components/SourceTooltip";
import { Plane } from "lucide-react";

const STRIKE_START = new Date("2025-08-16T01:00:00-04:00");
const LOSS_PER_DAY = 100000000;
const LOSS_PER_HOUR = LOSS_PER_DAY / 24;
const LOSS_PER_MINUTE = LOSS_PER_DAY / (24 * 60);
const LOSS_PER_SECOND = LOSS_PER_DAY / (24 * 60 * 60);
const FLIGHT_ATTENDANTS = 10511;

// Visitor simulation settings (simulated, not real analytics)
const BASE_VISITORS_PER_HOUR = 1000; // ~1K/hour baseline
const INITIAL_VISITOR_BASELINE = 24000; // 24K total at baseline
const RATE_VARIANCE = 0.1; // ±10% small variance

function diurnalFactor(hour: number) {
  if (hour >= 0 && hour < 5) return 0.5;
  if (hour >= 5 && hour < 9) return 0.8;
  if (hour >= 9 && hour < 12) return 1.05;
  if (hour >= 12 && hour < 15) return 1.2;
  if (hour >= 15 && hour < 18) return 1.1;
  if (hour >= 18 && hour < 21) return 0.85;
  return 0.6;
}

function getHourlyRate(now: Date) {
  const hour = now.getHours();
  const variance = 1 + RATE_VARIANCE * Math.sin((now.getMinutes() / 60) * 2 * Math.PI);
  return BASE_VISITORS_PER_HOUR * diurnalFactor(hour) * variance;
}
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
  const { t } = useTranslation('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [baselineTotal, setBaselineTotal] = useState<number | null>(null);
  const [baselineTime, setBaselineTime] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Initialize visitor simulation baseline using localStorage for simple persistence
  useEffect(() => {
    const storedTotal = localStorage.getItem('visitorBaselineTotal');
    const storedTime = localStorage.getItem('visitorBaselineTime');
    if (storedTotal && storedTime) {
      const parsedTotal = parseInt(storedTotal, 10);
      const parsedTime = new Date(storedTime);
      if (!isNaN(parsedTotal) && !isNaN(parsedTime.getTime())) {
        setBaselineTotal(parsedTotal);
        setBaselineTime(parsedTime);
        return;
      }
    }
    const initialTotal = INITIAL_VISITOR_BASELINE;
    const now = new Date();
    setBaselineTotal(initialTotal);
    setBaselineTime(now);
    localStorage.setItem('visitorBaselineTotal', String(initialTotal));
    localStorage.setItem('visitorBaselineTime', now.toISOString());
  }, []);
  const timeElapsed = Math.max(0, currentTime.getTime() - STRIKE_START.getTime());
  const daysElapsed = timeElapsed / (1000 * 60 * 60 * 24);
  const totalLoss = daysElapsed * LOSS_PER_DAY;
  const totalLossPerFA = totalLoss / FLIGHT_ATTENDANTS;

  // Visitor calculations - Simulated calibration (~10.2K total, ~1K/hour)
  const currentVisitorRate = getHourlyRate(currentTime);
  const currentVisitorsPerSecond = currentVisitorRate / 3600;
  const currentVisitorsPerMinute = currentVisitorRate / 60;
  const totalVisitors = baselineTotal && baselineTime
    ? baselineTotal + ((currentTime.getTime() - baselineTime.getTime()) / 1000) * currentVisitorsPerSecond
    : INITIAL_VISITOR_BASELINE;
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

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 via-background to-primary-blue-subtle"></div>
      
      <div className="relative z-10 py-8 px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Compact headline */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-blue/10 border border-primary-blue/20 rounded-full">
              <Plane className="h-4 w-4 text-primary-blue" />
              <span className="text-xs font-medium text-primary-blue uppercase tracking-wide">{t('badge.laborDispute')}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground tracking-tight leading-tight">
              {t('title')}
            </h1>
            <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
              <a 
                href="https://strikecost.ca" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors"
              >
                <span>strikecost.ca</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <span>•</span>
              <SourceTooltip source={sources.strikeStart}>
                <span className="cursor-help">{t('badge.sinceStart')}</span>
              </SourceTooltip>
            </div>
          </div>

          {/* Key Financial Numbers - Priority Above Fold */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-10 bg-surface-elevated/90 backdrop-blur-sm border border-border/30 shadow-3xl hover:shadow-4xl transition-all duration-500">
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <h2 className="text-xl font-semibold text-foreground tracking-wide uppercase">{t('metrics.projectedStrikeLosses')}</h2>
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
                  <p className="text-sm text-muted-foreground">{t('labels.basedOnAnalyst')}</p>
                  <div className="text-lg font-mono text-loss-indicator">
                    {t('labels.projectedRate')}: {formatCurrency(LOSS_PER_SECOND)}/sec
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-10 bg-surface-elevated/90 backdrop-blur-sm border border-border/30 shadow-3xl hover:shadow-4xl transition-all duration-500">
              <div className="text-center space-y-6">
                <h2 className="text-xl font-semibold text-foreground tracking-wide uppercase">{t('metrics.lossPerFlightAttendant')}</h2>
                <div className="h-20 flex items-center justify-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono text-loss-indicator leading-none animate-fade-in overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
                    {formatLargeCurrency(totalLossPerFA)}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{t('labels.burnedPerWorker')}</p>
                  <div className="text-lg font-mono text-loss-indicator">
                    +{formatCurrency(LOSS_PER_DAY / FLIGHT_ATTENDANTS)}{t('labels.perDayEach')}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-10 bg-surface-elevated/90 backdrop-blur-sm border border-border/30 shadow-3xl hover:shadow-4xl transition-all duration-500">
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <h2 className="text-xl font-semibold text-foreground tracking-wide uppercase">{t('metrics.totalPageVisitors')}</h2>
                  <div className="px-2 py-1 bg-accent/10 border border-accent/20 rounded text-xs text-accent font-medium">SIM</div>
                </div>
                <div className="h-20 flex items-center justify-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono text-primary-blue leading-none animate-fade-in overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
                    {formatVisitors(totalVisitors)}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{t('labels.andCounting')}</p>
                  <div className="text-lg font-mono text-primary-blue">
                    +{Math.round(currentVisitorsPerSecond * 10) / 10}/sec
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-10 bg-surface-elevated/90 backdrop-blur-sm border border-border/30 shadow-3xl hover:shadow-4xl transition-all duration-500">
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <h2 className="text-xl font-semibold text-foreground tracking-wide uppercase">{t('metrics.visitorsPerHour')}</h2>
                  <div className="px-2 py-1 bg-accent/10 border border-accent/20 rounded text-xs text-accent font-medium">SIM</div>
                </div>
                <div className="h-20 flex items-center justify-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono text-primary-blue leading-none animate-fade-in overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
                    {formatVisitors(currentVisitorRate)}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{t('labels.currentRate')}</p>
                  <div className="text-lg font-mono text-primary-blue">
                    +{Math.round(currentVisitorsPerMinute)}/min
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Compact disclaimer */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 text-xs text-muted-foreground/70 bg-muted/20 px-3 py-1 rounded-full border border-border/30">
              <span className="font-medium text-warning">PROJECTED</span>
              <span>•</span>
              <span>{t('disclaimer')}</span>
            </div>
          </div>

          {/* Live Breakdown Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="p-6 bg-surface-elevated/70 backdrop-blur-sm border border-border/20 shadow-xl">
              <div className="text-center space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{t('breakdown.perSecond')}</h3>
                <div className="text-number-medium font-mono text-loss-indicator">
                  {formatCurrency(LOSS_PER_SECOND)}
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-surface-elevated/70 backdrop-blur-sm border border-border/20 shadow-xl">
              <div className="text-center space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{t('breakdown.perMinute')}</h3>
                <div className="text-number-medium font-mono text-loss-indicator">
                  {formatCurrency(LOSS_PER_MINUTE)}
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-surface-elevated/70 backdrop-blur-sm border border-border/20 shadow-xl">
              <div className="text-center space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{t('breakdown.perHour')}</h3>
                <div className="text-number-medium font-mono text-loss-indicator">
                  {formatCurrency(LOSS_PER_HOUR)}
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-surface-elevated/70 backdrop-blur-sm border border-border/20 shadow-xl">
              <div className="text-center space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{t('breakdown.perDay')}</h3>
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
                <h3 className="text-lg font-semibold text-foreground">{t('milestones.strikeDuration')}</h3>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div>
                    <div className="text-number-small font-mono text-loss-indicator">{daysElapsedWhole.toString().padStart(2, '0')}</div>
                    <div className="text-xs text-muted-foreground font-medium">{t('timeUnits.days')}</div>
                  </div>
                  <div>
                    <div className="text-number-small font-mono text-loss-indicator">{hoursElapsed.toString().padStart(2, '0')}</div>
                    <div className="text-xs text-muted-foreground font-medium">{t('timeUnits.hours')}</div>
                  </div>
                  <div>
                    <div className="text-number-small font-mono text-loss-indicator">{minutesElapsed.toString().padStart(2, '0')}</div>
                    <div className="text-xs text-muted-foreground font-medium">{t('timeUnits.minutes')}</div>
                  </div>
                  <div>
                    <div className="text-number-small font-mono text-loss-indicator">{secondsElapsed.toString().padStart(2, '0')}</div>
                    <div className="text-xs text-muted-foreground font-medium">{t('timeUnits.seconds')}</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-surface-elevated to-surface-subtle border border-border/30 shadow-xl">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold text-foreground">{t('milestones.impactPerFA')}</h3>
                <div className="text-number-large font-mono text-loss-indicator">
                  $95,000
                </div>
                <p className="text-sm text-muted-foreground">{t('labels.burnedPerFA')}</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}