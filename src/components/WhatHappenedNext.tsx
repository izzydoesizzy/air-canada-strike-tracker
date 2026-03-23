import { Card } from "@/components/ui/card";
import { CheckCircle, Vote, Scale, Gavel, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Gavel,
    date: "Aug 16, 2025",
    title: "Government Intervenes",
    description: "Hours after the strike began, Jobs Minister Patty Hajdu invoked Section 107 of the Canada Labour Code, ordering binding arbitration and an immediate return to work.",
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/20",
  },
  {
    icon: CheckCircle,
    date: "Aug 18, 2025",
    title: "Tentative Deal Reached",
    description: "After 9 hours of mediated talks, CUPE and Air Canada reached a tentative agreement ending the 3-day strike. Flights gradually resumed the next day.",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/20",
  },
  {
    icon: Vote,
    date: "Sep 6, 2025",
    title: "99.1% Reject Wage Offer",
    description: "In a ratification vote held Aug 27 – Sep 6, flight attendants overwhelmingly rejected the wage portion of the tentative agreement. Only the wage component was sent to arbitration.",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/20",
  },
  {
    icon: Scale,
    date: "Feb 2026",
    title: "Arbitrator's Final Ruling",
    description: "The arbitrator awarded junior mainline flight attendants a 12% increase in year one, senior crew 8%, and Rouge attendants 13%. The labour dispute officially concluded.",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/20",
  },
];

const sourceLinks = [
  {
    label: "Wikipedia — 2025 Air Canada flight attendants strike",
    url: "https://en.wikipedia.org/wiki/2025_Air_Canada_flight_attendants_strike",
  },
  {
    label: "Airways Magazine — Arbitrator Settles Dispute",
    url: "https://www.airwaysmag.com/new-post/arb-air-canada-flight-attendant-dispute",
  },
  {
    label: "Global News — Tentative deal ends strike",
    url: "https://globalnews.ca/news/11340448/air-canada-flight-attendants-deal-strike-over/",
  },
];

export function WhatHappenedNext() {
  return (
    <section className="bg-gradient-to-b from-background to-surface-subtle py-20">
      <div className="container mx-auto px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-light text-foreground tracking-tight">
              What Happened Next
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The 3-day strike was just the beginning. Here's how the dispute played out over the following months.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex gap-6 items-start">
                  {/* Icon + connector */}
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${step.bg} flex-shrink-0`}>
                      <Icon className={`h-6 w-6 ${step.color}`} />
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-0.5 h-full min-h-[2rem] bg-border mt-2" />
                    )}
                  </div>

                  {/* Content */}
                  <Card className="flex-1 p-6 border border-border/30 shadow-lg">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="font-mono font-medium">{step.date}</span>
                        {index < steps.length - 1 && (
                          <ArrowRight className="h-3 w-3" />
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Sources */}
          <div className="text-center space-y-3">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Sources</p>
            <div className="flex flex-wrap justify-center gap-3">
              {sourceLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:text-primary/80 transition-colors underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
