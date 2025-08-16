import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AdSpotProps {
  className?: string;
  size?: "small" | "medium" | "large";
}

export function AdSpot({ className = "", size = "medium" }: AdSpotProps) {
  const createAdvertiserEmail = () => {
    const subject = encodeURIComponent("Advertising Inquiry - StrikeCost.ca Ad Placement");
    const body = encodeURIComponent(`Hi Izzy,

I'm interested in advertising on StrikeCost.ca. Please find my details below:

BUSINESS INFORMATION:
• Company Name: [Your Company]
• Website: [Your Website URL]
• Industry: [Your Industry]

CONTACT DETAILS:
• Name: [Your Full Name]
• Email: [Your Email]
• Phone: [Your Phone Number]
• Best time to contact: [Time Preference]

ADVERTISING PREFERENCES:
• Budget Range: [ ] $500-1,000/month [ ] $1,000-2,500/month [ ] $2,500-5,000/month [ ] $5,000+ [ ] Custom
• Preferred Ad Placement: [ ] Between Story & Timeline [ ] After Analysis Section [ ] Mobile Menu [ ] Custom
• Campaign Duration: [ ] 1 month [ ] 3 months [ ] 6 months [ ] 12 months [ ] Ongoing
• Target Audience: [Describe your ideal customer]

CAMPAIGN DETAILS:
• Campaign Objectives: [Brand awareness, lead generation, sales, etc.]
• Special Requirements: [Any specific needs or requests]
• Start Date: [Preferred launch date]

SITE METRICS (for reference):
• 20,500+ monthly visitors
• High engagement with strike/labor content
• Strong mobile traffic (60%+)
• Professional audience interested in business impact

Looking forward to discussing opportunities!

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
            20.5k monthly visitors • High engagement
          </p>
          <p className="text-xs font-medium text-primary/80 group-hover:text-primary">
            Click to inquire →
          </p>
        </div>
      </a>
    </Card>
  );
}