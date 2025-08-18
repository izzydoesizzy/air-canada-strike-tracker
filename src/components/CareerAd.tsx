import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import careerAdLarge from "@/assets/workshop-ad-large.png";
import careerAdSmall from "@/assets/workshop-ad-small.png";

interface CareerAdProps {
  className?: string;
  size?: "small" | "medium" | "large";
}

export function CareerAd({ className = "", size = "medium" }: CareerAdProps) {
  const careerProductUrl = "https://stan.store/joinclearcareer/p/the-20minute-resume-levelup";
  
  const getImageSrc = () => {
    return size === "large" ? careerAdLarge : careerAdSmall;
  };

  const sizeClasses = {
    small: "max-w-sm",
    medium: "max-w-md", 
    large: "max-w-lg"
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Ad Label */}
      <div className="absolute top-2 left-2 z-10">
        <span className="text-xs bg-muted/80 text-muted-foreground px-2 py-1 rounded">
          Ad
        </span>
      </div>
      
      <Card className="border-2 border-dashed border-muted-foreground/30 bg-muted/10 hover:border-primary/50 hover:bg-muted/20 transition-all duration-300 group cursor-pointer overflow-hidden">
        <a 
          href={careerProductUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative"
        >
          <img 
            src={getImageSrc()} 
            alt="Level-Up Your Resume in 20 Mins - The most high-impact 20-minute resume course online"
            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Overlay with external link icon */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
            <ExternalLink className="h-6 w-6 text-white opacity-0 group-hover:opacity-80 transition-opacity duration-300 drop-shadow-lg" />
          </div>
        </a>
      </Card>
    </div>
  );
}