
import React from 'react';
import { User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export const DefaultPageHeaderElements = () => {
  const handleConnectClick = () => {
    toast.info("Device connection feature coming soon!");
  };

  const headerLeft = (
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8">
        {/* In a real app, AvatarImage would be used here with a src */}
        <AvatarFallback className="bg-muted">
          <User size={18} className="text-muted-foreground" />
        </AvatarFallback>
      </Avatar>
      <span className="text-sm font-medium text-foreground">Guest</span>
    </div>
  );

  const headerRight = (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleConnectClick} 
      className="text-xs px-3 py-1 h-auto border-primary/50 text-primary hover:bg-primary/10 hover:text-primary"
    >
      Tab here to connect
    </Button>
  );

  return { headerLeft, headerRight };
};
