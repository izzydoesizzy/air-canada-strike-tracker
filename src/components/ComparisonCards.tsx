import React from "react";
import { Card } from "@/components/ui/card";
import { Car, Home, GraduationCap, DollarSign } from "lucide-react";

const comparisons = [
  {
    icon: Car,
    title: "Daily Loss Per Flight Attendant",
    amount: "$9,500",
    comparison: "= A new car every day",
    description: "Each flight attendant's share of daily strike losses"
  },
  {
    icon: DollarSign,
    title: "10 Days of Strike",
    amount: "$95,000",
    comparison: "= Average annual salary",
    description: "More than many flight attendants earn in a year"
  },
  {
    icon: Home,
    title: "30 Days of Strike",
    amount: "$285,000",
    comparison: "= Down payment on a house",
    description: "Enough for life-changing investments"
  },
  {
    icon: GraduationCap,
    title: "Fair Pay Settlement",
    amount: "Fraction",
    comparison: "= Of current losses",
    description: "What union asks for vs. what strike costs"
  }
];

export function ComparisonCards() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-display-small font-semibold text-foreground mb-4">
            What These Losses Mean
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Put the strike costs in perspective: real-world comparisons per flight attendant
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {comparisons.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card 
                key={index} 
                className="p-8 bg-surface-elevated border border-border/30 shadow-elegant hover:shadow-large transition-all duration-300 hover:scale-105"
              >
                <div className="text-center space-y-6">
                  <div className="mx-auto w-16 h-16 bg-loss-indicator/10 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-loss-indicator" />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
                      {item.title}
                    </h3>
                    <div className="text-number-medium font-mono text-loss-indicator">
                      {item.amount}
                    </div>
                    <p className="text-base font-semibold text-foreground">
                      {item.comparison}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}