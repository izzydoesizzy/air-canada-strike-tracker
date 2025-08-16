import { Navigation } from "@/components/Navigation";
import { StoryIntroduction } from "@/components/StoryIntroduction";
import { StoryHighlights } from "@/components/StoryHighlights";
import { StrikeImpactDashboard } from "@/components/StrikeImpactDashboard";
import { StrikeOverview } from "@/components/StrikeOverview";
import { StrikeInfo } from "@/components/StrikeInfo";
import { Sources } from "@/components/Sources";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />

      {/* Strike Impact Dashboard - First thing users see */}
      <section id="hero">
        <StrikeImpactDashboard />
      </section>

      {/* Story Introduction */}
      <StoryIntroduction />

      {/* Story Highlights */}
      <StoryHighlights />

      {/* Strike Overview */}
      <section id="overview" className="container mx-auto px-8 py-20">
        <StrikeOverview />
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

      {/* Sources & Verification */}
      <section id="sources" className="container mx-auto px-8 py-20">
        <Sources />
      </section>

      {/* Footer */}
      <footer className="border-t border-border/20 bg-surface-subtle">
        <div className="container mx-auto px-8 py-12">
          <div className="text-center space-y-4 text-sm text-muted-foreground">
            <div className="space-y-2">
              <p>Data compiled from verified official sources and news reports</p>
              <p>Real-time calculations • Updated continuously</p>
            </div>
            <div className="space-y-1 text-xs">
              <p>
                Vibe coded by{" "}
                <a 
                  href="http://linkedin.com/in/izzydoesizzy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-blue hover:text-accent-blue transition-colors underline"
                >
                  Izzy Piyale-Sheard
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
