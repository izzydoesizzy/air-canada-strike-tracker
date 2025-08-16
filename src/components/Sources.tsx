import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export function Sources() {
  const sources = [
    {
      title: "Air Canada Receives 72-Hour Strike Notice from CUPE and Issues Lockout Notice",
      description: "Official Air Canada press release detailing the strike notice and company response, including compensation offer details and operational impact.",
      url: "https://www.aircanada.com/media/air-canada-receives-72-hour-strike-notice-from-cupe-and-issues-lockout-notice-in-response/",
      type: "Official Statement"
    },
    {
      title: "Labour disruption by Air Canada flight attendants",
      description: "Air Canada's customer advisory on strike operations, including rebooking policies and operational wind-down timeline.",
      url: "https://www.aircanada.com/ca/en/aco/home/book/travel-news-and-updates/2025/ac-action.html",
      type: "Customer Advisory"
    },
    {
      title: "Air Canada Declares an Impasse in CUPE Negotiations",
      description: "Official statement on failed negotiations and arbitration efforts, detailing the 38% compensation offer and union position.",
      url: "https://www.aircanada.com/media/air-canada-declares-an-impasse-in-cupe-negotiations-as-midnight-threshold-for-a-strike-or-lockout-notice-nears/",
      type: "Official Statement"
    },
    {
      title: "Air Canada flight attendants forced to issue strike notice to end unpaid work",
      description: "CUPE union's official position on the strike, highlighting ground pay disputes and wage increase demands.",
      url: "https://cupe.ca/air-canada-flight-attendants-forced-issue-strike-notice-end-unpaid-work",
      type: "Union Statement"
    },
    {
      title: "Jobs minister says it's 'critical' for Air Canada, union to keep negotiating",
      description: "CBC News coverage of government involvement and federal mediation efforts in the dispute.",
      url: "https://www.cbc.ca/news/business/air-canada-flight-attendants-final-day-strike-1.7610225",
      type: "News Coverage"
    },
    {
      title: "Air Canada, flight attendants deadlocked with strike looming",
      description: "Reuters analysis of the deadlock situation, passenger impact numbers, and Toronto Pearson Airport effects.",
      url: "https://www.reuters.com/business/world-at-work/air-canada-flight-attendants-deadlocked-with-strike-looming-2025-08-15/",
      type: "News Analysis"
    }
  ];

  return (
    <Card className="p-8 bg-gradient-to-br from-card to-secondary border-border">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Sources & References</h2>
          <p className="text-muted-foreground">
            All data and facts are sourced from official statements, verified news reports, and public records
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sources.map((source, index) => (
            <div key={index} className="space-y-3 p-4 rounded-lg bg-background/50 border border-border/50">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded bg-accent/20 text-accent font-medium">
                      {source.type}
                    </span>
                  </div>
                  <h3 className="font-medium text-foreground text-sm leading-snug">
                    {source.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {source.description}
                  </p>
                </div>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 p-2 rounded-md hover:bg-accent/10 transition-colors"
                  aria-label="Open source link"
                >
                  <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-accent transition-colors" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-lg bg-muted/30 border border-border/50">
          <h3 className="font-medium text-foreground mb-2">Methodology</h3>
          <div className="text-sm text-muted-foreground space-y-1">
            <p><strong>Loss Calculation:</strong> $100M daily loss estimate based on Air Canada's operational scale and industry impact assessments</p>
            <p><strong>Per-Attendant Calculation:</strong> $10,000 per flight attendant per day ($100M ÷ 10,000 CUPE-represented flight attendants)</p>
            <p><strong>Start Time:</strong> August 16, 2025, 1:00 AM Eastern Time (officially announced strike commencement)</p>
            <p><strong>Data Updates:</strong> Counter updates in real-time based on elapsed time since strike start</p>
          </div>
        </div>
      </div>
    </Card>
  );
}