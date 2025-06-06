
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Bluetooth, Wifi } from 'lucide-react';
import { useLinktopDevices, LinktopDevice } from '@/hooks/useLinktopDevices';

interface DeviceSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeviceSelected: (device: LinktopDevice) => void;
}

export const DeviceSelectionDialog: React.FC<DeviceSelectionDialogProps> = ({
  open,
  onOpenChange,
  onDeviceSelected,
}) => {
  const { devices, isScanning, connectedDevice, startScan, connectToDevice } = useLinktopDevices();

  const handleDeviceSelect = async (device: LinktopDevice) => {
    try {
      await connectToDevice(device);
      onDeviceSelected(device);
      onOpenChange(false);
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bluetooth className="h-5 w-5" />
            Select Linktop Device
          </DialogTitle>
          <DialogDescription>
            Scan for and connect to a nearby Linktop health device.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {devices.length} device(s) found
            </span>
            <Button
              onClick={startScan}
              disabled={isScanning}
              variant="outline"
              size="sm"
            >
              {isScanning ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Wifi className="h-4 w-4 mr-2" />
                  Scan
                </>
              )}
            </Button>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto">
            {devices.length === 0 && !isScanning && (
              <div className="text-center py-8 text-muted-foreground">
                <Bluetooth className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No devices found</p>
                <p className="text-xs">Make sure your Linktop device is nearby and powered on</p>
              </div>
            )}

            {isScanning && devices.length === 0 && (
              <div className="text-center py-8">
                <Loader2 className="h-8 w-8 mx-auto mb-2 animate-spin text-primary" />
                <p className="text-muted-foreground">Scanning for devices...</p>
              </div>
            )}

            {devices.map((device) => (
              <div
                key={device.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                onClick={() => handleDeviceSelect(device)}
              >
                <div className="flex items-center gap-3">
                  <Bluetooth className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{device.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {device.id} {device.rssi && `• ${device.rssi} dBm`}
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Connect
                </Button>
              </div>
            ))}
          </div>

          {connectedDevice && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-800">
                  Connected to {connectedDevice.name}
                </span>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
