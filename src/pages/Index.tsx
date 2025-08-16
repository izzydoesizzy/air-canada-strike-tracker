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

      {/* Footer - Stripe-style clean design */}
      <footer className="border-t border-border bg-background">
        <div className="container mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Creator & Tools */}
            <div className="space-y-6">
              <h3 className="text-sm font-semibold text-foreground tracking-wide">Creator & Tools</h3>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Made with curiosity by{" "}
                  <a 
                    href="http://linkedin.com/in/izzydoesizzy" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-foreground hover:text-primary transition-colors underline"
                  >
                    Izzy Piyale-Sheard
                  </a>
                </p>
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Powered by</p>
                  <div className="space-y-1">
                    <a 
                      href="https://perplexity.ai/pro?referral_code=J1IO81TK" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Perplexity
                    </a>
                    <a 
                      href="https://lovable.dev/invite/8433fb85-552a-4d89-ac05-c37d7794426b" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Lovable
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact & Inquiries */}
            <div className="space-y-6">
              <h3 className="text-sm font-semibold text-foreground tracking-wide">Contact & Inquiries</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Media Inquiries</p>
                  <a 
                    href="mailto:izzy@joinclearcareer.com" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    izzy@joinclearcareer.com
                  </a>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Business & Partnerships</p>
                  <a 
                    href="https://forms.gle/f8cfuoKsXHuNuaAt9" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Partnership Form
                  </a>
                </div>
              </div>
            </div>

            {/* Data & Methodology */}
            <div className="space-y-6">
              <h3 className="text-sm font-semibold text-foreground tracking-wide">Data & Methodology</h3>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Financial projections compiled from verified official sources and respected financial news outlets.
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Based on analyst projections from TD Cowen and industry reports. Real-time calculations provide illustrative impact modeling.
                </p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground pt-2">
                  <div className="w-1.5 h-1.5 bg-warning rounded-full"></div>
                  <span>Updates every second</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom section */}
          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              © 2025 StrikeCost.ca • Real-time labour dispute impact tracking
            </p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;