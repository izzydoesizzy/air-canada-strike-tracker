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
          <div className="text-center space-y-4 text-sm text-foreground/80">
            <div className="space-y-2">
              <p>
                <a href="https://forms.gle/f8cfuoKsXHuNuaAt9" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors underline">
                  Reach out for affiliate opportunities
                </a>
              </p>
              <p>Data compiled from verified official sources and news reports</p>
            </div>
            <div className="space-y-2 text-xs">
              <p>
                Research via{" "}
                <a href="https://perplexity.ai/pro?referral_code=J1IO81TK" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors underline">
                  Perplexity
                </a>
              </p>
              <p>
                Vibe coded using{" "}
                <a href="https://lovable.dev/invite/8433fb85-552a-4d89-ac05-c37d7794426b" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors underline">
                  Lovable
                </a>
              </p>
              <p>made by Izzy Piyale-Sheard</p>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;