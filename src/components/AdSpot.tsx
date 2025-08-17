import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AdSpotProps {
  className?: string;
  size?: "small" | "medium" | "large";
}

export function AdSpot({ className = "", size = "medium" }: AdSpotProps) {
  const createAdvertiserEmail = () => {
    const subject = encodeURIComponent("Quick Call - StrikeCost.ca Advertising (25k+ Daily Visitors)");
    const body = encodeURIComponent(`Hi Izzy,

I'd like to discuss advertising on StrikeCost.ca. Let's schedule a quick 15-minute call:

• Name: [Your Full Name]
• Phone: [Your Phone Number]
• Website: [Your Website URL]
• Business: [Brief description of what you do]

SITE REACH & METRICS:
✓ 25k+ daily unique visitors
✓ 750k+ monthly pageviews
✓ 68% Canadian audience, 32% international
✓ 62% mobile traffic (iOS-heavy)
✓ 2.3 min average session duration
✓ Audience: majority flight attendants; also aviation workers and travelers
✓ Peak engagement: Business hours (9am–5pm ET)

CAMPAIGN WINDOW:
✓ Strike-duration ad opportunities: 3–10 days (most likely)
✓ Limited-time, high-frequency placements aligned to the strike timeline

Ready to discuss how we can drive results for your business!

Best regards,
[Your Name]`);

    return `mailto:izzy@joinclearcareer.com?subject=${subject}&body=${body}`;
  };

  const sizeClasses = {
    small: "p-4 min-h-[120px]",
    medium: "p-6 min-h-[160px]", 
    large: "p-8 min-h-[200px]"
  };

  const textSizes = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg"
  };

  return (
    <Card className={`border-2 border-dashed border-muted-foreground/30 bg-muted/10 hover:border-primary/50 hover:bg-muted/20 transition-all duration-300 group cursor-pointer ${sizeClasses[size]} ${className}`}>
      <a 
        href={createAdvertiserEmail()}
        className="flex flex-col items-center justify-center h-full text-center space-y-3 text-muted-foreground group-hover:text-foreground transition-colors"
      >
        <ExternalLink className="h-6 w-6 opacity-60 group-hover:opacity-100 transition-opacity" />
        <div className="space-y-1">
          <p className={`font-medium ${textSizes[size]}`}>
            Place Your Ad Here
          </p>
          <p className="text-xs opacity-75">
            25K+ daily visitors • High engagement
          </p>
          <p className="text-xs font-medium text-primary/80 group-hover:text-primary">
            Click to inquire →
          </p>
        </div>
      </a>
    </Card>
  );
}