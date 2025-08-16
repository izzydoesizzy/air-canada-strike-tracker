import { Navigation } from "@/components/Navigation";
import { StoryIntroduction } from "@/components/StoryIntroduction";
import { StoryHighlights } from "@/components/StoryHighlights";
import { StrikeImpactDashboard } from "@/components/StrikeImpactDashboard";
import { StrikeOverview } from "@/components/StrikeOverview";
import { StrikeInfo } from "@/components/StrikeInfo";
import { Sources } from "@/components/Sources";
const Index = () => {
  return <div className="min-h-screen bg-background">
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
          
          <StrikeInfo />
        </div>
      </section>

      {/* Sources & Verification */}
      <section id="sources" className="container mx-auto px-8 py-20">
        <Sources />
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 bg-primary/5 backdrop-blur-sm">
        <div className="container mx-auto px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Left side - Personal & Credits */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Made with curiosity ✨</h3>
                <p className="text-sm text-foreground/80">
                  by <span className="font-semibold text-primary">Izzy Piyale-Sheard</span>
                </p>
              </div>
              <div className="space-y-1 text-xs text-foreground/70">
                <p>
                  Research powered by{" "}
                  <a href="https://perplexity.ai/pro?referral_code=J1IO81TK" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/90 transition-colors underline font-medium">
                    Perplexity
                  </a>
                </p>
                <p>
                  Built with{" "}
                  <a href="https://lovable.dev/invite/8433fb85-552a-4d89-ac05-c37d7794426b" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/90 transition-colors underline font-medium">
                    Lovable
                  </a>
                </p>
              </div>
            </div>

            {/* Right side - Data & Business */}
            <div className="space-y-4 md:text-right">
              <div className="space-y-2">
                <p className="text-sm text-foreground/80 font-semibold">
                  Data compiled from verified official sources and news reports
                </p>
                <p className="text-xs text-foreground/70">
                  Numbers based on publicly available analyst projections
                </p>
              </div>
              <div className="text-xs">
                <a href="https://forms.gle/f8cfuoKsXHuNuaAt9" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/90 transition-colors underline font-medium">
                  Reach out for advertising/affiliate opportunities →
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;