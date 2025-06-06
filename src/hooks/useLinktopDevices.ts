
import { useState, useCallback } from 'react';
import { Linktop } from '@/plugins/linktop-plugin/src';
import { toast } from 'sonner';

export interface LinktopDevice {
  id: string;
  name: string;
  rssi?: number;
  isConnected?: boolean;
}

export const useLinktopDevices = () => {
  const [devices, setDevices] = useState<LinktopDevice[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState<LinktopDevice | null>(null);

  const startScan = useCallback(async () => {
    if (isScanning) return;
    
    setIsScanning(true);
    setDevices([]);
    
    try {
      await Linktop.startScan();
      toast.success('Started scanning for Linktop devices');
      
      // In a real implementation, you would listen for device discovery events
      // For now, we'll simulate finding some devices after a short delay
      setTimeout(() => {
        // This would be replaced with actual device discovery listeners
        setDevices([
          { id: 'linktop_001', name: 'Linktop Device 001', rssi: -45 },
          { id: 'linktop_002', name: 'Linktop Device 002', rssi: -60 },
        ]);
        setIsScanning(false);
      }, 3000);
      
    } catch (error: any) {
      setIsScanning(false);
      toast.error('Failed to start scan', { description: error.message });
      throw error;
    }
  }, [isScanning]);

  const connectToDevice = useCallback(async (device: LinktopDevice) => {
    try {
      await Linktop.connectToDevice({ deviceId: device.id });
      setConnectedDevice(device);
      toast.success(`Connected to ${device.name}`);
    } catch (error: any) {
      toast.error(`Failed to connect to ${device.name}`, { description: error.message });
      throw error;
    }
  }, []);

  const disconnectDevice = useCallback(() => {
    setConnectedDevice(null);
    toast.info('Disconnected from device');
  }, []);

  return {
    devices,
    isScanning,
    connectedDevice,
    startScan,
    connectToDevice,
    disconnectDevice,
  };
};
