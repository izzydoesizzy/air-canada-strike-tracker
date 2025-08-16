import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export function LanguageNavigation() {
  const location = useLocation();
  const isEnglish = location.pathname === '/';
  const isFrench = location.pathname === '/fr';

  return (
    <div className="flex items-center gap-1">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <div className="flex items-center gap-1">
        <Link to="/">
          <Button
            variant={isEnglish ? "default" : "ghost"}
            size="sm"
            className="text-xs px-2 py-1 h-7"
          >
            EN
          </Button>
        </Link>
        <Link to="/fr">
          <Button
            variant={isFrench ? "default" : "ghost"}
            size="sm"
            className="text-xs px-2 py-1 h-7"
          >
            FR
          </Button>
        </Link>
      </div>
    </div>
  );
}