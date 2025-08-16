import { Card } from "@/components/ui/card";
import { SourceTooltip } from "@/components/SourceTooltip";
import { Clock, Users, DollarSign, AlertTriangle } from "lucide-react";

const sources = {
  cupeNotice: {
    title: "CUPE Strike Notice - Unpaid Work and Wage Stagnation",
    url: "https://cupe.ca/air-canada-flight-attendants-forced-issue-strike-notice-end-unpaid-work"
  },
  airCanadaOffer: {
    title: "Air Canada's Official Compensation Offer Details",
    url: "https://www.aircanada.com/media/air-canada-provides-clarity-on-its-offer-to-cupe/"
  },
  cnbcCoverage: {
    title: "CNBC Strike Impact Coverage",
    url: "https://www.cnbc.com/2025/08/15/air-canada-flight-attendant-strike-looms.html"
  }
};

export function StoryIntroduction() {
  return (
    <section id="story" className="bg-gradient-to-b from-surface-subtle to-background py-20">
      <div className="container mx-auto px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-display-large font-light text-foreground">
              The Human Cost Behind the Numbers
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A decade of wage stagnation meets financial absurdity: Why Air Canada's strike losses dwarf the cost of fair compensation
            </p>
          </div>

          {/* Story Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 border-l-4 border-l-amber-500 bg-surface-elevated">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-amber-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Nearly a Decade</h3>
                  <p className="text-sm text-muted-foreground">
                    <SourceTooltip source={sources.cupeNotice}>
                      <span className="underline decoration-dotted">Flight attendants faced stagnant wages</span>
                    </SourceTooltip>, unpaid ground duty hours, and rising living costs while performing critical safety roles.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-primary-blue bg-surface-elevated">
              <div className="flex items-start gap-3">
                <DollarSign className="h-5 w-5 text-primary-blue mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">38% Increase Offered</h3>
                  <p className="text-sm text-muted-foreground">
                    <SourceTooltip source={sources.airCanadaOffer}>
                      <span className="underline decoration-dotted">Air Canada's proposal</span>
                    </SourceTooltip> over four years, plus ground pay adjustments and improved pensions.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-red-500 bg-surface-elevated">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-red-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Union Rejection</h3>
                  <p className="text-sm text-muted-foreground">
                    Flight attendants rejected the offer, citing incomplete compensation for all hours worked and inflation concerns.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-loss-red bg-surface-elevated">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-loss-red mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">$100M Daily Loss</h3>
                  <p className="text-sm text-muted-foreground">
                    <SourceTooltip source={sources.cnbcCoverage}>
                      <span className="underline decoration-dotted">Strike costs exceed</span>
                    </SourceTooltip> what fair compensation would cost annually.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Key Insight */}
          <div className="text-center">
            <Card className="p-8 bg-gradient-to-r from-loss-red/10 to-amber-500/10 border border-loss-red/20">
              <div className="max-w-2xl mx-auto space-y-4">
                <h2 className="text-xl font-semibold text-foreground">The Financial Absurdity</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Every day this strike continues, Air Canada hemorrhages more money than it would cost to provide 
                  fair compensation to all 10,511 flight attendants for an entire year. This isn't just an economic 
                  disaster—it's an ethical failure where keeping planes grounded costs more than treating employees fairly.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}