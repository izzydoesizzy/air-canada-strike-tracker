import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
const highlights = ["Every day of strike costs Air Canada $100 million.", "That's the same as burning $9,500 per flight attendant per day.", "After just 10 days, Air Canada will have lost the equivalent of $95,000 per flight attendant.", "By 30 days, that's $285,000 per flight attendant — more than many attendants make in years.", "Meanwhile, the union is asking for fair pay across all hours worked — a fraction of what Air Canada is already losing."];
export function StoryHighlights() {
  const [visibleIndex, setVisibleIndex] = useState(-1);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let index = 0;
          const interval = setInterval(() => {
            setVisibleIndex(index);
            index++;
            if (index >= highlights.length) {
              clearInterval(interval);
            }
          }, 800);
        }
      });
    }, {
      threshold: 0.3
    });
    const element = document.getElementById('story-highlights');
    if (element) {
      observer.observe(element);
    }
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);
  return <section id="story-highlights" className="py-16">
      <div className="max-w-4xl mx-auto px-6">
        <Card className="p-12 bg-gradient-to-br from-loss-indicator/5 to-accent-blue/5 border border-loss-indicator/20 shadow-large">
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-display-small font-semibold text-foreground mb-4">Looking at the </h2>
              <p className="text-muted-foreground text-lg">
                The numbers tell an shocking story
              </p>
            </div>
            
            <div className="space-y-6">
              {highlights.map((highlight, index) => <div key={index} className={`transform transition-all duration-700 ${index <= visibleIndex ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{
              transitionDelay: `${index * 100}ms`
            }}>
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${index <= visibleIndex ? 'border-loss-indicator bg-loss-indicator text-primary-foreground' : 'border-border bg-background text-muted-foreground'}`}>
                      <span className="text-sm font-semibold">{index + 1}</span>
                    </div>
                    <p className="text-lg font-medium text-foreground leading-relaxed">
                      {highlight}
                    </p>
                  </div>
                </div>)}
            </div>
          </div>
        </Card>
      </div>
    </section>;
}