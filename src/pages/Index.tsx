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
      <footer className="relative border-t border-border/30 bg-gradient-to-br from-surface-elevated/50 to-primary/5 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"></div>
        <div className="relative container mx-auto px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left side - Personal & Credits */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <h3 className="text-lg font-semibold text-foreground tracking-wide">Made with curiosity</h3>
                </div>
                <div className="space-y-3">
                  <p className="text-base text-foreground/90 leading-relaxed">
                    Created by{" "}
                    <a 
                      href="http://linkedin.com/in/izzydoesizzy" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-semibold text-primary hover:text-primary/90 transition-all duration-300 underline decoration-primary/30 hover:decoration-primary/70 underline-offset-4"
                    >
                      Izzy Piyale-Sheard
                    </a>
                  </p>
                  <a 
                    href="https://strikecost.ca" 
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg text-primary hover:bg-primary/15 hover:border-primary/30 transition-all duration-300 group"
                  >
                    <span className="font-semibold">strikecost.ca</span>
                    <svg className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Powered By</h4>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://perplexity.ai/pro?referral_code=J1IO81TK" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center space-x-2 px-3 py-2 bg-surface-elevated border border-border/50 rounded-lg text-sm text-foreground/80 hover:text-foreground hover:border-primary/30 transition-all duration-300"
                  >
                    <span>Research: Perplexity</span>
                  </a>
                  <a 
                    href="https://lovable.dev/invite/8433fb85-552a-4d89-ac05-c37d7794426b" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center space-x-2 px-3 py-2 bg-surface-elevated border border-border/50 rounded-lg text-sm text-foreground/80 hover:text-foreground hover:border-primary/30 transition-all duration-300"
                  >
                    <span>Built with: Lovable</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right side - Data & Business */}
            <div className="space-y-8 lg:pl-8">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground tracking-wide">Data & Methodology</h4>
                <div className="space-y-3">
                  <p className="text-base text-foreground/90 leading-relaxed">
                    All financial projections compiled from verified official sources and respected financial news outlets
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Estimates based on publicly available analyst projections from TD Cowen and industry reports. 
                    Real-time calculations provide illustrative impact modeling.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Business Inquiries</h4>
                <a 
                  href="https://forms.gle/f8cfuoKsXHuNuaAt9" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-primary/10 to-primary-blue/10 border border-primary/20 rounded-lg text-primary hover:from-primary/15 hover:to-primary-blue/15 hover:border-primary/30 transition-all duration-300 group"
                >
                  <span className="font-medium">Advertising & Partnership Opportunities</span>
                  <svg className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Bottom separator and minimal info */}
          <div className="mt-12 pt-8 border-t border-border/30">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-muted-foreground">
                © 2025 StrikeCost.ca • Real-time labour dispute impact tracking
              </p>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground/70">
                <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
                <span>Data updates every second</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;