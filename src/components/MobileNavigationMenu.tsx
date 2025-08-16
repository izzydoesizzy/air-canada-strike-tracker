import { useTranslation } from "react-i18next";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  BarChart3, 
  Clock, 
  TrendingDown, 
  Plane, 
  Navigation as NavigationIcon,
  AlertTriangle,
  BookOpen,
  Calendar,
  BarChart2,
  FileText,
  ExternalLink,
  Settings,
  Globe
} from "lucide-react";
import { LanguageNavigation } from "./LanguageNavigation";

interface MobileNavigationMenuProps {
  currentTime: Date;
  strikeStart: Date;
  totalLoss: number;
  formatCompactCurrency: (amount: number) => string;
  scrollToSection: (id: string) => void;
}

export function MobileNavigationMenu({ 
  currentTime, 
  strikeStart, 
  totalLoss, 
  formatCompactCurrency, 
  scrollToSection 
}: MobileNavigationMenuProps) {
  const { t } = useTranslation();
  
  const timeElapsed = Math.max(0, currentTime.getTime() - strikeStart.getTime());
  const daysElapsed = timeElapsed / (1000 * 60 * 60 * 24);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">{t('navigation.menu')}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 bg-background border-l border-border/20">
        <SheetHeader>
          <SheetTitle className="text-left">{t('navigation.menu')}</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          <Accordion type="multiple" defaultValue={["live-data", "quick-nav"]} className="w-full">
            {/* Live Data Section */}
            <AccordionItem value="live-data">
              <AccordionTrigger className="text-sm font-medium">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  {t('navigation.liveData')}
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3">
                <div className="p-3 rounded-lg bg-surface-subtle border border-border/20">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="h-4 w-4 text-loss-indicator" />
                    <span className="text-xs text-muted-foreground">{t('navigation.projectedLoss')}</span>
                  </div>
                  <div className="font-mono font-medium text-loss-indicator">
                    {formatCompactCurrency(totalLoss)}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded bg-surface-subtle">
                    <div className="flex items-center gap-1 mb-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Time</span>
                    </div>
                    <div className="font-mono text-sm">
                      {Math.floor(daysElapsed)}d {Math.floor(daysElapsed % 1 * 24)}h
                    </div>
                  </div>
                  
                  <div className="p-2 rounded bg-surface-subtle">
                    <div className="flex items-center gap-1 mb-1">
                      <Plane className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Flights</span>
                    </div>
                    <div className="text-sm">500+</div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Quick Navigation */}
            <AccordionItem value="quick-nav">
              <AccordionTrigger className="text-sm font-medium">
                <div className="flex items-center gap-2">
                  <NavigationIcon className="h-4 w-4" />
                  {t('navigation.quickNavigation')}
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start h-auto p-3" 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-4 w-4" />
                    <div className="text-left">
                      <div className="font-medium">{t('navigation.liveTracker')}</div>
                      <div className="text-xs text-muted-foreground">Real-time impact dashboard</div>
                    </div>
                  </div>
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start h-auto p-3" 
                  onClick={() => scrollToSection('story')}
                >
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-4 w-4" />
                    <div className="text-left">
                      <div className="font-medium">{t('navigation.breakingNews')}</div>
                      <div className="text-xs text-muted-foreground">Latest developments</div>
                    </div>
                  </div>
                </Button>
              </AccordionContent>
            </AccordionItem>

            {/* Main Content */}
            <AccordionItem value="main-content">
              <AccordionTrigger className="text-sm font-medium">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  {t('navigation.mainContent')}
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start" 
                  onClick={() => scrollToSection('story')}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  {t('navigation.theStory')}
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start" 
                  onClick={() => scrollToSection('timeline')}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  {t('navigation.timeline')}
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start" 
                  onClick={() => scrollToSection('analysis')}
                >
                  <BarChart2 className="h-4 w-4 mr-2" />
                  {t('navigation.analysis')}
                </Button>
              </AccordionContent>
            </AccordionItem>

            {/* Additional Info */}
            <AccordionItem value="additional-info">
              <AccordionTrigger className="text-sm font-medium">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  {t('navigation.additionalInfo')}
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start" 
                  onClick={() => scrollToSection('sources')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {t('navigation.sources')}
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start" 
                  onClick={() => scrollToSection('resources')}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  {t('navigation.resources')}
                </Button>
              </AccordionContent>
            </AccordionItem>

            {/* Settings */}
            <AccordionItem value="settings">
              <AccordionTrigger className="text-sm font-medium">
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  {t('navigation.settings')}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <LanguageNavigation />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  );
}
