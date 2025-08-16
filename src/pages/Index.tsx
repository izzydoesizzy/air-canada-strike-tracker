import { LossCounter } from "@/components/LossCounter";
import { StrikeInfo } from "@/components/StrikeInfo";
import { Sources } from "@/components/Sources";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Air Canada Strike Loss Tracker</h1>
            <p className="text-sm text-muted-foreground mt-1">Real-time economic impact monitor</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 space-y-12">
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
      <footer className="border-t border-border bg-card/50 mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>Data compiled from official sources and verified news reports</p>
            <p className="mt-2">Last updated: Real-time counter with live calculations</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
