import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, ExternalLink } from 'lucide-react';

interface InformativeTooltipProps {
  title: string;
  content: string;
  sourceUrl?: string;
  sourceLabel?: string;
  children?: React.ReactNode;
  icon?: boolean;
}

const InformativeTooltip: React.FC<InformativeTooltipProps> = ({
  title,
  content,
  sourceUrl,
  sourceLabel,
  children,
  icon = true,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children || (
            <span className="inline-flex items-center gap-1 cursor-help">
              {icon && <Info className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />}
            </span>
          )}
        </TooltipTrigger>
        <TooltipContent className="max-w-80 p-4 space-y-2" side="top">
          <div className="font-semibold text-sm">{title}</div>
          <div className="text-sm leading-relaxed">{content}</div>
          {sourceUrl && sourceLabel && (
            <div className="pt-2 border-t">
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                <ExternalLink className="w-3 h-3" />
                {sourceLabel}
              </a>
            </div>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default InformativeTooltip;