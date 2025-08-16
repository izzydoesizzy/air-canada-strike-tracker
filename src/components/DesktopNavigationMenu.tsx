import { useTranslation } from "react-i18next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { 
  BookOpen,
  Calendar,
  BarChart2,
  FileText,
  ExternalLink,
  ChevronDown,
  BarChart3
} from "lucide-react";

interface DesktopNavigationMenuProps {
  scrollToSection: (id: string) => void;
}

export function DesktopNavigationMenu({ scrollToSection }: DesktopNavigationMenuProps) {
  const { t } = useTranslation();

  return (
    <div className="hidden lg:flex items-center">
      <Accordion type="multiple" defaultValue={["main-nav"]} className="flex items-center">
        <AccordionItem value="main-nav" className="border-0">
          <AccordionTrigger className="hover:no-underline py-0 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <div className="flex items-center gap-1">
              <span>{t('navigation.browseSections')}</span>
              <ChevronDown className="h-3 w-3 shrink-0 transition-transform duration-200" />
            </div>
          </AccordionTrigger>
          <AccordionContent className="absolute top-full right-0 mt-2 w-64 bg-background/95 backdrop-blur-md border border-border/20 rounded-lg shadow-lg p-4 z-50">
            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground mb-3">{t('navigation.mainContent')}</div>
              
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full justify-start h-auto p-2" 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                {t('navigation.liveTracker')}
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full justify-start h-auto p-2" 
                onClick={() => scrollToSection('story')}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                {t('navigation.theStory')}
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full justify-start h-auto p-2" 
                onClick={() => scrollToSection('timeline')}
              >
                <Calendar className="h-4 w-4 mr-2" />
                {t('navigation.timeline')}
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full justify-start h-auto p-2" 
                onClick={() => scrollToSection('analysis')}
              >
                <BarChart2 className="h-4 w-4 mr-2" />
                {t('navigation.analysis')}
              </Button>

              <div className="border-t border-border/20 my-2 pt-2">
                <div className="text-xs font-medium text-muted-foreground mb-2">{t('navigation.additionalInfo')}</div>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="w-full justify-start h-auto p-2" 
                  onClick={() => scrollToSection('resources')}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  {t('navigation.resources')}
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="w-full justify-start h-auto p-2" 
                  onClick={() => scrollToSection('sources')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {t('navigation.sources')}
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
