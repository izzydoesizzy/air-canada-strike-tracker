import { HeroMetrics } from "@/components/HeroMetrics";
import { StrikeDurationCounter } from "@/components/StrikeDurationCounter";
import { StockTracker } from "@/components/StockTracker";
import { LossCounter } from "@/components/LossCounter";
import { StrikeInfo } from "@/components/StrikeInfo";
import { Sources } from "@/components/Sources";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section>
        <HeroMetrics />
      </section>

      {/* Critical Metrics Dashboard */}
      <section className="container mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <StrikeDurationCounter />
          <StockTracker />
        </div>
      </section>

      {/* Detailed Loss Analysis */}
      <section className="container mx-auto px-8 pb-16">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-light text-foreground tracking-tight">Economic Impact Breakdown</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive analysis of financial losses across different time intervals
          </p>
        </div>
        <LossCounter />
      </section>

      {/* Strike Information */}
      <section className="bg-primary-blue-subtle/30 py-20">
        <div className="container mx-auto px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-light text-foreground tracking-tight">Strike Details & Background</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive overview of the labour dispute, negotiations, and operational impact
            </p>
          </div>
          <StrikeInfo />
        </div>
      </section>

      {/* Sources & Verification */}
      <section className="container mx-auto px-8 py-20">
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
