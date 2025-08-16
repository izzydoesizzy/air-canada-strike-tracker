import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SourceTooltip } from "./SourceTooltip";
import { Clock, AlertTriangle, Gavel, Users, ArrowRight } from "lucide-react";

const sources = {
  ctv: {
    title: "CTV News - Air Canada Flight Attendants Strike",
    url: "https://www.ctvnews.ca/business/article/air-canada-flight-attendants-officially-begin-strike/"
  },
  reuters: {
    title: "Reuters - Government Orders End to Air Canada Strike",
    url: "https://www.reuters.com/business/world-at-work/canadian-government-moves-end-air-canada-strike-seeks-binding-arbitration-2025-08-16/"
  },
  labourCode: {
    title: "Canada Labour Code - Section 107",
    url: "https://laws-lois.justice.gc.ca/eng/acts/L-2/page-21.html#docCont"
  },
  cupeResponse: {
    title: "CUPE Response to Government Intervention",
    url: "https://cupe.ca/news/cupe-responds-government-intervention-air-canada-dispute"
  }
};

export function StrikeTimeline() {
  const { t } = useTranslation('timeline');

  const timelineEvents = [
    {
      time: t('events.negotiations.time'),
      title: t('events.negotiations.title'),
      description: t('events.negotiations.description'),
      icon: Users,
      type: 'warning' as const,
      source: null
    },
    {
      time: t('events.strikeStart.time'),
      title: t('events.strikeStart.title'),
      description: t('events.strikeStart.description'),
      icon: AlertTriangle,
      type: 'destructive' as const,
      source: null
    },
    {
      time: t('events.govIntervention.time'),
      title: t('events.govIntervention.title'),
      description: t('events.govIntervention.description'),
      icon: Gavel,
      type: 'default' as const,
      source: sources.reuters
    },
    {
      time: t('events.recovery.time'),
      title: t('events.recovery.title'),
      description: t('events.recovery.description'),
      icon: Clock,
      type: 'secondary' as const,
      source: sources.reuters
    }
  ];

  const news = [
    {
      title: t('news.bindingArbitration.title'),
      description: t('news.bindingArbitration.description'),
      source: sources.labourCode,
      type: 'info' as const
    },
    {
      title: t('news.operationalRecovery.title'),
      description: t('news.operationalRecovery.description'),
      source: sources.reuters,
      type: 'warning' as const
    },
    {
      title: t('news.unionResponse.title'),
      description: t('news.unionResponse.description'),
      source: sources.cupeResponse,
      type: 'default' as const
    }
  ];

  const getVariantFromType = (type: string) => {
    switch (type) {
      case 'destructive': return 'destructive';
      case 'warning': return 'secondary';
      case 'secondary': return 'outline';
      default: return 'default';
    }
  };

  return (
    <section id="timeline" className="py-12 bg-surface-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-display-small font-bold text-foreground mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Timeline Section */}
          <Card className="bg-surface-elevated shadow-large border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Clock className="h-5 w-5 text-primary-blue" />
                {t('sections.events')}
              </CardTitle>
              <CardDescription>
                {t('sectionsDescription.events')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {timelineEvents.map((event, index) => {
                  const Icon = event.icon;
                  const content = (
                    <div className="flex gap-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        event.type === 'destructive' ? 'bg-destructive/10' :
                        event.type === 'warning' ? 'bg-secondary' :
                        event.type === 'secondary' ? 'bg-muted' :
                        'bg-primary-blue-light'
                      }`}>
                        <Icon className={`h-5 w-5 ${
                          event.type === 'destructive' ? 'text-destructive' :
                          event.type === 'warning' ? 'text-secondary-foreground' :
                          event.type === 'secondary' ? 'text-muted-foreground' :
                          'text-primary-blue'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant={getVariantFromType(event.type)} className="text-xs">
                            {event.time}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-foreground text-sm mb-1">
                          {event.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  );

                  return (
                    <div key={index} className="relative">
                      {event.source ? (
                        <SourceTooltip source={event.source}>
                          {content}
                        </SourceTooltip>
                      ) : (
                        content
                      )}
                      {index < timelineEvents.length - 1 && (
                        <div className="absolute left-5 top-12 w-0.5 h-6 bg-border" />
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* News & Updates Section */}
          <Card className="bg-surface-elevated shadow-large border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <ArrowRight className="h-5 w-5 text-primary-blue" />
                {t('sections.updates')}
              </CardTitle>
              <CardDescription>
                {t('sectionsDescription.updates')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {news.map((item, index) => (
                  <SourceTooltip key={index} source={item.source}>
                    <div className="p-4 rounded-lg border border-border hover:border-primary-blue/30 transition-colors cursor-pointer">
                      <div className="flex items-start gap-3">
                        <Badge variant={getVariantFromType(item.type)} className="mt-0.5">
                          {t('badges.update')}
                        </Badge>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground text-sm mb-2">
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SourceTooltip>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}