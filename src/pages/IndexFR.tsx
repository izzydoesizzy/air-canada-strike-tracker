
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigation } from "@/components/Navigation";
import { BreakingNewsBanner } from "@/components/BreakingNewsBanner";
import { StrikeImpactDashboard } from "@/components/StrikeImpactDashboard";
import { TheStrikeStory } from "@/components/TheStrikeStory";
import { StrikeTimeline } from "@/components/StrikeTimeline";
import { StrikeAnalysis } from "@/components/StrikeAnalysis";
import { Resources } from "@/components/Resources";
import { Sources } from "@/components/Sources";
import { CareerAd } from "@/components/CareerAd";
import StrikeVsSettlement from "@/components/StrikeVsSettlement";

const IndexFR = () => {
  const { t, i18n } = useTranslation('content');

  useEffect(() => {
    i18n.changeLanguage('fr');
  }, [i18n]);

  return <div className="min-h-screen bg-background">
      {/* Breaking News Banner */}
      <BreakingNewsBanner />
      
      {/* Navigation */}
      <Navigation />

      {/* Strike Impact Dashboard - First thing users see */}
      <section id="hero">
        <StrikeImpactDashboard />
      </section>

      {/* Storytelling Calculator - Interactive analysis tool */}
      <section id="calculator" className="bg-surface-subtle/30">
        <StrikeVsSettlement />
      </section>

      {/* The Strike Story - Consolidated narrative */}
      <TheStrikeStory />

      {/* Strategic Ad Spot 1 - Between Story and Timeline */}
      <section className="py-8">
        <div className="container mx-auto px-8">
          <div className="flex justify-center">
            <CareerAd size="large" />
          </div>
        </div>
      </section>

      {/* Strike Timeline & Updates */}
      <StrikeTimeline />

      {/* Strike Analysis - Comprehensive details */}
      <StrikeAnalysis />

      {/* Strategic Ad Spot 2 - After Analysis */}
      <section className="py-8 bg-surface-subtle/30">
        <div className="container mx-auto px-8">
          <div className="flex justify-center">
            <CareerAd size="medium" />
          </div>
        </div>
      </section>

      {/* Sources & Verification */}
      <section id="sources" className="container mx-auto px-8 py-20">
        <Sources />
      </section>

      {/* Resources Section - Moved to bottom */}
      <Resources />

      {/* Footer - Stripe-style clean design */}
      <footer className="border-t border-border bg-background">
        <div className="container mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Creator & Tools */}
            <div className="space-y-6">
              <h3 className="text-base font-semibold text-foreground tracking-wide">{t('footer.creatorTools')}</h3>
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('footer.madeBy')}{" "}
                  <a 
                    href="http://linkedin.com/in/izzydoesizzy" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-medium text-foreground hover:text-primary transition-colors underline"
                  >
                    Izzy Piyale-Sheard
                  </a>
                </p>
                <div className="space-y-3">
                  <p className="text-xs font-medium text-foreground/80 uppercase tracking-wider">{t('footerSections.poweredBy', { ns: 'content' })}</p>
                  <div className="space-y-2">
                    <a 
                      href="https://perplexity.ai/pro?referral_code=J1IO81TK" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Perplexity
                    </a>
                    <a 
                      href="https://lovable.dev/invite/8433fb85-552a-4d89-ac05-c37d7794426b" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Lovable
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact & Inquiries */}
            <div className="space-y-6">
              <h3 className="text-base font-semibold text-foreground tracking-wide">{t('footerSections.contactInquiries', { ns: 'content' })}</h3>
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-medium text-foreground/80 uppercase tracking-wider mb-3">{t('footerSections.mediaInquiries', { ns: 'content' })}</p>
                  <a 
                    href="mailto:izzy@joinclearcareer.com" 
                    className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    izzy@joinclearcareer.com
                  </a>
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground/80 uppercase tracking-wider mb-3">{t('footerSections.advertisingPartnerships', { ns: 'content' })}</p>
                  <a 
                    href="https://forms.gle/f8cfuoKsXHuNuaAt9" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    {t('footerSections.partnershipForm', { ns: 'content' })}
                  </a>
                </div>
              </div>
            </div>

            {/* Workshop Ad & Updates */}
            <div className="space-y-6">
              <div className="mb-8">
                <CareerAd size="small" />
              </div>
              <h3 className="text-base font-semibold text-foreground tracking-wide">Mises à jour</h3>
              <div className="space-y-4">
                <a 
                  href="/fr/changelog" 
                  className="block text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Journal du Site Web
                </a>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Suivez toutes les mises à jour et améliorations du tracker.
                </p>
              </div>
            </div>
          </div>
          
          {/* Bottom section */}
          <div className="mt-16 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                © 2025 Strikecost.ca - {t('footerSections.copyright', { ns: 'content' })}
              </p>
            </div>
          </div>
        </div>
      </footer>

    </div>;
};

export default IndexFR;
