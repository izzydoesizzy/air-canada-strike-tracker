import { Navigation } from "@/components/Navigation";
import { StoryIntroduction } from "@/components/StoryIntroduction";
import { StoryHighlights } from "@/components/StoryHighlights";
import { HeroMetrics } from "@/components/HeroMetrics";
import { ComparisonCards } from "@/components/ComparisonCards";
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

      {/* Story Introduction */}
      <StoryIntroduction />

      {/* Story Highlights */}
      <StoryHighlights />

      {/* Hero Dashboard */}
      <section id="hero">
        <HeroMetrics />
      </section>

      {/* Financial Loss Counter */}
      <section id="losses" className="bg-surface-subtle/50 py-20">
        <div className="container mx-auto px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-display-small font-light text-foreground">The Daily Financial Hemorrhage</h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Side-by-side comparison: Total losses vs. cost per flight attendant
            </p>
          </div>
          <LossCounter />
        </div>
      </section>

      {/* Comparison Cards */}
      <ComparisonCards />

      {/* Strike Overview */}
      <section id="overview" className="container mx-auto px-8 py-20">
        <StrikeOverview />
      </section>

      {/* Strike Duration */}
      <section id="duration" className="bg-primary-blue-subtle/20 py-20">
        <div className="container mx-auto px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-display-small font-light text-foreground">Strike Timeline</h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Real-time tracking of strike duration
            </p>
          </div>
          <StrikeDurationCounter />
        </div>
      </section>

      {/* The Human Reality */}
      <section id="analysis" className="bg-surface-subtle/50 py-20">
        <div className="container mx-auto px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-display-small font-light text-foreground">The Human Reality</h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Understanding the workers' perspective and the broader labour dispute context
            </p>
          </div>
          <StrikeInfo />
        </div>
      </section>

      {/* Market Response - De-emphasized */}
      <section id="market" className="container mx-auto px-8 py-12">
        <div className="text-center space-y-2 mb-12">
          <h3 className="text-lg font-medium text-muted-foreground">Market Response</h3>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Secondary impact tracking
          </p>
        </div>
        <StockTracker />
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
