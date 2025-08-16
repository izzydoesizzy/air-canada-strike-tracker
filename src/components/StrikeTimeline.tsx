import React from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ArrowRight, AlertTriangle, Users, Gavel, Calendar, TrendingDown, Vote, X, Plane, Play, AlertCircle } from "lucide-react";
import { SourceTooltip } from "./SourceTooltip";

// Data sources for the timeline content with comprehensive documentation
const sources = {
  wikipedia: {
    title: "Wikipedia - 2025 Air Canada Flight Attendants Strike",
    url: "https://en.wikipedia.org/wiki/2025_Air_Canada_flight_attendants_strike"
  },
  airCanadaStrike: {
    title: "Air Canada - Strike Notice Response",
    url: "https://www.aircanada.com/media/air-canada-receives-72-hour-strike-notice-from-cupe-and-issues-lockout-notice-in-response/"
  },
  airCanadaAction: {
    title: "Air Canada - Strike Action Updates",
    url: "https://www.aircanada.com/ca/en/aco/home/book/travel-news-and-updates/2025/ac-action.html"
  },
  globalNews: {
    title: "Global News - Government Intervention",
    url: "https://globalnews.ca/news/11337659/air-canada-hajdu-2/"
  },
  cupeArbitration: {
    title: "CUPE - Statement on Binding Arbitration",
    url: "https://cupe.ca/statement-cupe-air-canadas-request-binding-arbitration"
  },
  paddleKanoo: {
    title: "Paddle Your Own Kanoo - Cease and Desist Reports",
    url: "https://www.paddleyourownkanoo.com/2025/08/16/air-canada-serves-cease-and-desist-on-flight-attendants-for-illegal-strike-activity/"
  },
  labourCode: {
    title: "Canada Labour Code Section 107",
    url: "https://laws-lois.justice.gc.ca/eng/acts/l-2/page-20.html#h-341188"
  }
};

export function StrikeTimeline() {
  const { t } = useTranslation('timeline');

  const timelineEvents = [
    {
      time: t('events.contractExpiry.time'),
      title: t('events.contractExpiry.title'),
      description: t('events.contractExpiry.description'),
      icon: Calendar,
      type: 'secondary' as const,
      source: sources.wikipedia
    },
    {
      time: t('events.negotiationsBegin.time'),
      title: t('events.negotiationsBegin.title'),
      description: t('events.negotiationsBegin.description'),
      icon: Users,
      type: 'default' as const,
      source: sources.wikipedia
    },
    {
      time: t('events.bargainingStalls.time'),
      title: t('events.bargainingStalls.title'),
      description: t('events.bargainingStalls.description'),
      icon: TrendingDown,
      type: 'warning' as const,
      source: sources.wikipedia
    },
    {
      time: t('events.strikeVote.time'),
      title: t('events.strikeVote.title'),
      description: t('events.strikeVote.description'),
      icon: Vote,
      type: 'default' as const,
      source: sources.wikipedia
    },
    {
      time: t('events.finalOfferRejected.time'),
      title: t('events.finalOfferRejected.title'),
      description: t('events.finalOfferRejected.description'),
      icon: X,
      type: 'warning' as const,
      source: sources.airCanadaStrike
    },
    {
      time: t('events.strikeLockoutNotices.time'),
      title: t('events.strikeLockoutNotices.title'),
      description: t('events.strikeLockoutNotices.description'),
      icon: AlertTriangle,
      type: 'warning' as const,
      source: sources.airCanadaStrike
    },
    {
      time: t('events.preStrikeCancellations.time'),
      title: t('events.preStrikeCancellations.title'),
      description: t('events.preStrikeCancellations.description'),
      icon: Plane,
      type: 'destructive' as const,
      source: sources.wikipedia
    },
    {
      time: t('events.strikeBegins.time'),
      title: t('events.strikeBegins.title'),
      description: t('events.strikeBegins.description'),
      icon: Play,
      type: 'destructive' as const,
      source: sources.airCanadaAction
    },
    {
      time: t('events.govIntervention.time'),
      title: t('events.govIntervention.title'),
      description: t('events.govIntervention.description'),
      icon: Gavel,
      type: 'default' as const,
      source: sources.globalNews
    },
    {
      time: t('events.ongoingIssues.time'),
      title: t('events.ongoingIssues.title'),
      description: t('events.ongoingIssues.description'),
      icon: AlertCircle,
      type: 'warning' as const,
      source: sources.paddleKanoo
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
      source: sources.airCanadaAction,
      type: 'warning' as const
    },
    {
      title: t('news.unionResponse.title'),
      description: t('news.unionResponse.description'),
      source: sources.cupeArbitration,
      type: 'default' as const
    },
    {
      title: t('news.strikeVoteDetails.title'),
      description: t('news.strikeVoteDetails.description'),
      source: sources.wikipedia,
      type: 'info' as const
    },
    {
      title: t('news.ongoingProtests.title'),
      description: t('news.ongoingProtests.description'),
      source: sources.paddleKanoo,
      type: 'warning' as const
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