import React, { useState } from 'react';
import { User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { connectToLinktop, LinktopVitalsData } from '../../services/linktopBLEService';

export const DefaultPageHeaderElements = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConnectClick = async () => {
    if (isLoading) return; // Prevent multiple clicks while already loading

    setIsLoading(true);
    toast.info("Attempting to connect to Linktop device...");

    try {
      const vitals: LinktopVitalsData | null = await connectToLinktop();
      
      if (vitals) {
        // connectToLinktop handles its own detailed toasts (scanning, connected, reading vitals, disconnected)
        // This provides a final summary toast from the header button's perspective.
        if (vitals.batteryLevel !== undefined) {
          toast.success(`Linktop device responded. Battery: ${vitals.batteryLevel}%.`);
        } else {
          toast.success("Linktop device responded.");
        }
      }
      // If vitals is null, connectToLinktop should have already displayed an error toast.
    } catch (error: any) {
      // Fallback error handling, though connectToLinktop aims to handle its errors.
      console.error("Error in handleConnectClick after connectToLinktop call:", error);
      toast.error("Connection attempt failed unexpectedly.", { description: error.message });
    } finally {
      setIsLoading(false);
    }
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
      disabled={isLoading}
      className="text-xs px-3 py-1 h-auto border-primary/50 text-primary hover:bg-primary/10 hover:text-primary"
    >
      {isLoading ? "Checking..." : "Tab here to connect"}
    </Button>
  );

  return { headerLeft, headerRight };
};
