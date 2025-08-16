import { Navigation } from "@/components/Navigation";
import { HeroMetrics } from "@/components/HeroMetrics";
import { StrikeOverview } from "@/components/StrikeOverview";
import { StrikeDurationCounter } from "@/components/StrikeDurationCounter";
import { StockTracker } from "@/components/StockTracker";
import { LossCounter } from "@/components/LossCounter";
import { StrikeInfo } from "@/components/StrikeInfo";
import { Sources } from "@/components/Sources";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />

      {/* Hero Dashboard */}
      <section id="hero">
        <HeroMetrics />
      </section>

      {/* Strike Overview */}
      <section id="overview" className="container mx-auto px-8 py-20">
        <StrikeOverview />
      </section>

      {/* Real-Time Impact */}
      <section id="real-time" className="bg-surface-subtle/50 py-20">
        <div className="container mx-auto px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-display-small font-light text-foreground">Real-Time Impact</h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Live tracking of strike duration and immediate economic consequences
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <StrikeDurationCounter />
            <LossCounter />
          </div>
        </div>
      </section>

      {/* Market Response */}
      <section id="market" className="container mx-auto px-8 py-20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-display-small font-light text-foreground">Market Response</h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Air Canada stock performance and market reaction to the labour disruption
          </p>
        </div>
        <StockTracker />
      </section>

      {/* Detailed Analysis */}
      <section id="analysis" className="bg-primary-blue-subtle/20 py-20">
        <div className="container mx-auto px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-display-small font-light text-foreground">Detailed Analysis</h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Comprehensive breakdown of the labour dispute and operational impact
            </p>
          </div>
          <StrikeInfo />
        </div>
      </section>

      {/* Sources & Verification */}
      <section id="sources" className="container mx-auto px-8 py-20">
        <Sources />
      </section>

      {/* Footer */}
      <footer className="border-t border-border/20 bg-surface-subtle">
        <div className="container mx-auto px-8 py-12">
          <div className="text-center space-y-2 text-sm text-muted-foreground">
            <p>Data compiled from verified official sources and news reports</p>
            <p>Real-time calculations • Updated continuously</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
