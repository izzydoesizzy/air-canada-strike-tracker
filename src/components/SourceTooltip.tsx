import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ExternalLink } from "lucide-react";

interface SourceTooltipProps {
  children: React.ReactNode;
  source: {
    title: string;
    url: string;
  };
}

export function SourceTooltip({ children, source }: SourceTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="relative cursor-pointer group">
            {children}
            <span className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="w-2 h-2 bg-primary-blue rounded-full animate-pulse" />
            </span>
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs p-3 bg-surface-elevated border border-border shadow-large">
          <div className="space-y-2">
            <p className="text-xs font-medium text-foreground">{source.title}</p>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary-blue hover:text-accent-blue transition-colors"
            >
              View source
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}