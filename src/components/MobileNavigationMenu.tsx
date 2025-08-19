import { useTranslation } from "react-i18next";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  BarChart3, 
  Clock, 
  TrendingDown, 
  Plane, 
  BookOpen,
  Calendar,
  BarChart2,
  FileText,
  ExternalLink,
  Linkedin
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
        
        <div className="mt-6 space-y-6">
          {/* Language Switcher */}
          <div className="pb-4 border-b border-border/20">
            <LanguageNavigation />
          </div>
          
          {/* Main Content */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {t('navigation.mainContent')}
            </h3>
            <div className="space-y-1">
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <BarChart3 className="h-4 w-4 mr-3" />
                {t('navigation.liveTracker')}
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => scrollToSection('story')}
              >
                <BookOpen className="h-4 w-4 mr-3" />
                {t('navigation.theStory')}
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => scrollToSection('timeline')}
              >
                <Calendar className="h-4 w-4 mr-3" />
                {t('navigation.timeline')}
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => scrollToSection('analysis')}
              >
                <BarChart2 className="h-4 w-4 mr-3" />
                {t('navigation.analysis')}
              </Button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {t('navigation.additionalInfo')}
            </h3>
            <div className="space-y-1">
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => scrollToSection('sources')}
              >
                <ExternalLink className="h-4 w-4 mr-3" />
                {t('navigation.sources')}
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => scrollToSection('resources')}
              >
                <FileText className="h-4 w-4 mr-3" />
                {t('navigation.resources')}
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                asChild
              >
                <a href="http://linkedin.com/in/izzydoesizzy" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4 mr-3" />
                  Contact
                </a>
              </Button>
            </div>
          </div>

          {/* Ad Spot CTA */}
          <div className="pt-6 border-t border-border/20">
            <a 
              href={`mailto:izzy@joinclearcareer.com?subject=${encodeURIComponent("Quick Call - StrikeCost.ca Advertising (55k+ Daily Visitors)")}&body=${encodeURIComponent(`Hi Izzy,

I'd like to discuss advertising on StrikeCost.ca. Let's schedule a quick 15-minute call:

• Name: [Your Full Name]
• Phone: [Your Phone Number]
• Website: [Your Website URL]
• Business: [Brief description of what you do]

SITE REACH & METRICS:
✓ 55k+ daily unique visitors
✓ 750k+ monthly pageviews
✓ 68% Canadian audience, 32% international
✓ 62% mobile traffic (iOS-heavy)
✓ 2.3 min average session duration
✓ Audience: majority flight attendants; also aviation workers and travelers
✓ Peak engagement: Business hours (9am–5pm ET)

CAMPAIGN WINDOW:
✓ Strike-duration ad opportunities: 3–10 days (most likely)
✓ Limited-time, high-frequency placements aligned to the strike timeline

Ready to discuss how we can drive results for your business!

Best regards,
[Your Name]`)}`}
              className="block w-full"
            >
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-4 text-center hover:from-primary/15 hover:to-accent/15 transition-all duration-300 group">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    🎯 Want an Ad Spot?
                  </p>
                  <p className="text-xs text-muted-foreground">
                    55K+ daily visitors • High engagement audience
                  </p>
                  <p className="text-xs font-medium text-primary/80 group-hover:text-primary">
                    Tap to get started →
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
