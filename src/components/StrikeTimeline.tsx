import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SourceTooltip } from "./SourceTooltip";
import { Clock, AlertTriangle, Gavel, Users, ArrowRight } from "lucide-react";

const sources = {
  govIntervention: {
    title: "Government Orders End to Air Canada Strike",
    url: "https://www.canada.ca/en/employment-social-development/news/2025/08/government-orders-end-to-air-canada-strike.html"
  },
  ministerStatement: {
    title: "Minister Hajdu Statement on Air Canada Labour Dispute",
    url: "https://www.canada.ca/en/employment-social-development/news/2025/08/minister-hajdu-statement.html"
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
  const { t } = useTranslation(['content', 'common']);

  const timelineEvents = [
    {
      time: t('timeline.events.negotiations.time'),
      title: t('timeline.events.negotiations.title'),
      description: t('timeline.events.negotiations.description'),
      icon: Users,
      type: 'warning' as const,
      source: null
    },
    {
      time: t('timeline.events.strikeStart.time'),
      title: t('timeline.events.strikeStart.title'),
      description: t('timeline.events.strikeStart.description'),
      icon: AlertTriangle,
      type: 'destructive' as const,
      source: null
    },
    {
      time: t('timeline.events.govIntervention.time'),
      title: t('timeline.events.govIntervention.title'),
      description: t('timeline.events.govIntervention.description'),
      icon: Gavel,
      type: 'default' as const,
      source: sources.govIntervention
    },
    {
      time: t('timeline.events.recovery.time'),
      title: t('timeline.events.recovery.title'),
      description: t('timeline.events.recovery.description'),
      icon: Clock,
      type: 'secondary' as const,
      source: sources.govIntervention
    }
  ];

  const news = [
    {
      title: t('timeline.news.bindingArbitration.title'),
      description: t('timeline.news.bindingArbitration.description'),
      source: sources.labourCode,
      type: 'info' as const
    },
    {
      title: t('timeline.news.operationalRecovery.title'),
      description: t('timeline.news.operationalRecovery.description'),
      source: sources.govIntervention,
      type: 'warning' as const
    },
    {
      title: t('timeline.news.unionResponse.title'),
      description: t('timeline.news.unionResponse.description'),
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
            {t('timeline.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('timeline.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Timeline Section */}
          <Card className="bg-surface-elevated shadow-large border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Clock className="h-5 w-5 text-primary-blue" />
                {t('timeline.sections.events')}
              </CardTitle>
              <CardDescription>
                {t('timeline.sectionsDescription.events')}
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
                {t('timeline.sections.updates')}
              </CardTitle>
              <CardDescription>
                {t('timeline.sectionsDescription.updates')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {news.map((item, index) => (
                  <SourceTooltip key={index} source={item.source}>
                    <div className="p-4 rounded-lg border border-border hover:border-primary-blue/30 transition-colors cursor-pointer">
                      <div className="flex items-start gap-3">
                        <Badge variant={getVariantFromType(item.type)} className="mt-0.5">
                          {t('timeline.badges.update')}
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