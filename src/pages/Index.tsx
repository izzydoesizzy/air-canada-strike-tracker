import { LossCounter } from "@/components/LossCounter";
import { StrikeInfo } from "@/components/StrikeInfo";
import { Sources } from "@/components/Sources";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/20 bg-surface-elevated/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-8 py-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-light text-foreground tracking-tight">Air Canada Strike Impact Tracker</h1>
            <p className="text-sm text-muted-foreground">Real-time economic impact monitoring with verified data sources</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-8 py-16 space-y-20">
        {/* Loss Counter Section */}
        <section>
          <LossCounter />
        </section>

        {/* Strike Information Section */}
        <section>
          <StrikeInfo />
        </section>

        {/* Sources Section */}
        <section>
          <Sources />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/20 bg-surface-subtle mt-20">
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
