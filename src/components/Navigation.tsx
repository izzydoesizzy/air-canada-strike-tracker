import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingDown, Plane, AlertCircle } from "lucide-react";
import { LanguageNavigation } from "./LanguageNavigation";
import { MobileNavigationMenu } from "./MobileNavigationMenu";
import { DesktopNavigationMenu } from "./DesktopNavigationMenu";
const STRIKE_START = new Date("2025-08-16T01:00:00-04:00");
const LOSS_PER_DAY = 100000000;
export function Navigation() {
  const { t } = useTranslation();
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
  const formatCompactCurrency = (amount: number) => {
    if (amount >= 1e9) {
      return `$${(amount / 1e9).toFixed(1)}B`;
    } else if (amount >= 1e6) {
      return `$${(amount / 1e6).toFixed(1)}M`;
    }
    return `$${(amount / 1e3).toFixed(0)}K`;
  };
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Status */}
          <div className="flex items-center space-x-4">
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold text-foreground">{t('navigation.title')}</h1>
            </div>
            <Badge variant="destructive" className="flex items-center space-x-1">
              <AlertCircle className="h-3 w-3" />
              <span className="text-xs font-medium">{t('navigation.status')}</span>
            </Badge>
          </div>

          {/* Quick Stats */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm">
              <TrendingDown className="h-4 w-4 text-loss-indicator" />
              <span className="font-mono text-loss-indicator font-medium">
                {formatCompactCurrency(totalLoss)}
              </span>
              <span className="text-muted-foreground">{t('navigation.projectedLoss')}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-mono">
                {Math.floor(daysElapsed)}d {Math.floor(daysElapsed % 1 * 24)}h
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Plane className="h-4 w-4 text-muted-foreground" />
              <span>500+ {t('navigation.flights')}</span>
            </div>
          </div>

          {/* Enhanced Navigation */}
          <div className="flex items-center space-x-4">
            {/* Desktop collapsible navigation */}
            <DesktopNavigationMenu scrollToSection={scrollToSection} />

            {/* Mobile navigation menu */}
            <MobileNavigationMenu 
              currentTime={currentTime}
              strikeStart={STRIKE_START}
              totalLoss={totalLoss}
              formatCompactCurrency={formatCompactCurrency}
              scrollToSection={scrollToSection}
            />
          </div>
          
        </div>
      </div>
    </nav>;
}