
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { HamburgerMenuButton } from './HamburgerMenuButton';
import { Bluetooth } from 'lucide-react';
import { DeviceSelectionDialog } from '@/components/DeviceSelection/DeviceSelectionDialog';
import { LinktopDevice } from '@/hooks/useLinktopDevices';

export const DefaultPageHeaderElements = () => {
  const [showDeviceSelection, setShowDeviceSelection] = useState(false);

  const handleConnectClick = () => {
    setShowDeviceSelection(true);
  };

  const handleDeviceSelected = (device: LinktopDevice) => {
    console.log('Device selected:', device);
    // Device connection is handled in the dialog
  };

  const headerLeft = <HamburgerMenuButton />;
  
  const headerRight = (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleConnectClick}
        aria-label="Connect to Linktop device"
      >
        <Bluetooth className="h-5 w-5" />
      </Button>
      
      <DeviceSelectionDialog
        open={showDeviceSelection}
        onOpenChange={setShowDeviceSelection}
        onDeviceSelected={handleDeviceSelected}
      />
    </>
  );

  return { headerLeft, headerRight };
};
