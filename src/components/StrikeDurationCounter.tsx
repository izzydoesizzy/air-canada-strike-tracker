import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { SourceTooltip } from "@/components/SourceTooltip";

const STRIKE_START = new Date("2025-08-16T01:00:00-04:00");

const sources = {
  strikeStart: {
    title: "Strike begins August 16, 2025, at 01:00 ET",
    url: "https://www.aircanada.com/ca/en/aco/home/book/travel-news-and-updates/2025/ac-action.html"
  }
};

export function StrikeDurationCounter() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeElapsed = Math.max(0, currentTime.getTime() - STRIKE_START.getTime());
  const daysElapsed = Math.floor(timeElapsed / (1000 * 60 * 60 * 24));
  const hoursElapsed = Math.floor((timeElapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesElapsed = Math.floor((timeElapsed % (1000 * 60 * 60)) / (1000 * 60));
  const secondsElapsed = Math.floor((timeElapsed % (1000 * 60)) / 1000);

  return (
    <Card className="p-8 bg-gradient-to-br from-surface-elevated to-surface-subtle border border-border/30 shadow-large hover:shadow-xl transition-all duration-300">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-lg font-medium text-muted-foreground">Strike Duration</h2>
          <SourceTooltip source={sources.strikeStart}>
            <p className="text-sm text-muted-foreground/70">Since August 16, 2025 at 1:00 AM ET</p>
          </SourceTooltip>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-loss-indicator font-mono">
              {daysElapsed.toString().padStart(2, '0')}
            </div>
            <div className="text-xs text-muted-foreground font-medium tracking-wide">DAYS</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-loss-indicator font-mono">
              {hoursElapsed.toString().padStart(2, '0')}
            </div>
            <div className="text-xs text-muted-foreground font-medium tracking-wide">HOURS</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-loss-indicator font-mono">
              {minutesElapsed.toString().padStart(2, '0')}
            </div>
            <div className="text-xs text-muted-foreground font-medium tracking-wide">MINUTES</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-loss-indicator font-mono">
              {secondsElapsed.toString().padStart(2, '0')}
            </div>
            <div className="text-xs text-muted-foreground font-medium tracking-wide">SECONDS</div>
          </div>
        </div>
      </div>
    </Card>
  );
}