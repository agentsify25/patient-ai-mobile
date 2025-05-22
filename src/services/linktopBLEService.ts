import { BleClient, ScanMode } from '@capacitor-community/bluetooth-le';
import { Capacitor } from '@capacitor/core';
import { toast } from 'sonner';

// Service and Characteristic UUIDs (as per user's example and common BLE standards)
const LINKTOP_NAME_PREFIX = 'Linktop';
const HEART_RATE_SERVICE_UUID = '0000180d-0000-1000-8000-00805f9b34fb';
const HEART_RATE_CHARACTERISTIC_UUID = '00002a37-0000-1000-8000-00805f9b34fb';

const BATTERY_SERVICE_UUID = '0000180f-0000-1000-8000-00805f9b34fb';
const BATTERY_LEVEL_CHARACTERISTIC_UUID = '00002a19-0000-1000-8000-00805f9b34fb';

const LINKTOP_CUSTOM_SERVICE_UUID = '0000fff0-0000-1000-8000-00805f9b34fb';
const LINKTOP_CUSTOM_CHARACTERISTIC_UUID = '0000fff1-0000-1000-8000-00805f9b34fb';

export interface LinktopVitalsData {
  heartRate?: number;
  spo2?: number;
  temperature?: number;
  batteryLevel?: number;
}

function parseHeartRate(value: DataView): number {
  const flags = value.getUint8(0);
  const hrFormatUINT16 = (flags & 0x01) === 1;
  if (hrFormatUINT16) {
    return value.getUint16(1, true); // true for little-endian
  }
  return value.getUint8(1);
}

function parseCustomVitals(value: DataView): { spo2?: number; temperature?: number } {
  // IMPORTANT: This parsing logic is based on the user's example.
  // It MUST be verified against the actual Linktop device's data specification.
  const bytes = new Uint8Array(value.buffer);
  let spo2: number | undefined = undefined;
  let temperature: number | undefined = undefined;

  // Example: bytes[2] for SpO2, bytes[3,4] for Temperature
  if (bytes.length >= 3) { // Check if SpO2 byte might exist
    spo2 = bytes[2]; // Placeholder index
  }
  if (bytes.length >= 5) { // Check if temperature bytes might exist
    const tempRaw = (bytes[3] << 8) | bytes[4]; // Placeholder: MSB, LSB
    temperature = tempRaw / 10.0; // Placeholder scaling
  }
  
  console.log('Raw Custom Data Bytes:', bytes);
  console.log('Parsed Custom Vitals:', { spo2, temperature });

  return { spo2, temperature };
}

export const connectToLinktop = async (): Promise<LinktopVitalsData | null> => {
  let deviceId: string | undefined;
  try {
    if (!Capacitor.isNativePlatform()) {
      toast.error("Bluetooth LE is primarily for native mobile devices. Web Bluetooth may have limitations.");
      // For a web-only implementation, you'd use navigator.bluetooth here.
      // This implementation focuses on Capacitor for native apps.
      return null;
    }

    await BleClient.initialize({ androidNeverForLocation: true });

    // Permissions will be requested by the OS when BleClient.requestLEScan() is called,
    // if they haven't been granted already.
    // The explicit BleClient.requestPermissions() call was removed as it's not available.

    const enabled = await BleClient.isEnabled();
    if (!enabled) {
      toast.error('Bluetooth is not enabled. Please enable it.');
      // Optionally try to enable: await BleClient.enable();
      return null;
    }
    
    toast.info('Scanning for Linktop devices...');

    // requestLEScan will trigger OS permission prompts if needed.
    await BleClient.requestLEScan(
      {
        namePrefix: LINKTOP_NAME_PREFIX,
        scanMode: ScanMode.SCAN_MODE_LOW_LATENCY,
        // services: [HEART_RATE_SERVICE_UUID, BATTERY_SERVICE_UUID, LINKTOP_CUSTOM_SERVICE_UUID], // Optional: can make scan more targeted
      },
      (result) => {
        if (result.device && result.device.name?.startsWith(LINKTOP_NAME_PREFIX)) {
          console.log('Found device:', result.device.name, result.device.deviceId);
          deviceId = result.device.deviceId;
          BleClient.stopLEScan(); // Stop scan as soon as the first matching device is found
        }
      }
    );

    // Wait for scan to find a device or timeout
    // Increased timeout slightly to 10 seconds (100 * 100ms) for scan and user response to permission prompt
    for (let i = 0; i < 100; i++) { 
        if (deviceId) break;
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    await BleClient.stopLEScan(); // Ensure scan is stopped if timeout occurs before device found

    if (!deviceId) {
      toast.error('No Linktop device found. Make sure it is nearby, powered on, and in pairing mode if necessary. Also, check Bluetooth permissions for the app.');
      return null;
    }

    const currentDeviceId = deviceId; // Capture for use in disconnect callback
    toast.info(`Connecting to device: ${currentDeviceId.substring(0,8)}...`);
    await BleClient.connect(currentDeviceId, (disconnectedDeviceId) => {
        console.log(`Device ${disconnectedDeviceId} disconnected`);
        toast.warning(`Device ${currentDeviceId.substring(0,8)}... disconnected.`);
    });
    toast.success(`Connected to Linktop device! Reading vitals...`);

    const vitals: LinktopVitalsData = {};

    try {
      const hrRaw = await BleClient.read(currentDeviceId, HEART_RATE_SERVICE_UUID, HEART_RATE_CHARACTERISTIC_UUID);
      vitals.heartRate = parseHeartRate(hrRaw);
      console.log('Heart Rate:', vitals.heartRate);
    } catch (hrError) {
      console.warn('Could not read Heart Rate:', hrError);
      toast.warning('Could not read Heart Rate.');
    }

    try {
      const batteryRaw = await BleClient.read(currentDeviceId, BATTERY_SERVICE_UUID, BATTERY_LEVEL_CHARACTERISTIC_UUID);
      vitals.batteryLevel = batteryRaw.getUint8(0);
      console.log('Battery Level:', vitals.batteryLevel);
    } catch (batteryError) {
      console.warn('Could not read Battery Level:', batteryError);
      // Not toasting for battery as it's less critical than vitals
    }

    try {
      const customRaw = await BleClient.read(currentDeviceId, LINKTOP_CUSTOM_SERVICE_UUID, LINKTOP_CUSTOM_CHARACTERISTIC_UUID);
      const { spo2, temperature } = parseCustomVitals(customRaw);
      if (spo2 !== undefined) vitals.spo2 = spo2;
      if (temperature !== undefined) vitals.temperature = temperature;
      console.log('Custom Vitals:', { spo2, temperature });
    } catch (customError) {
      console.warn('Could not read Custom Vitals (SpO2/Temp):', customError);
      toast.warning('Could not read SpO2/Temperature.');
    }
    
    // It's good practice to disconnect after reading the values if not maintaining a persistent connection.
    await BleClient.disconnect(currentDeviceId);
    toast.info('Disconnected from device.');

    return vitals;

  } catch (error: any) {
    console.error('BLE Operation Error:', error);
    // Check for common permission-related errors if possible, though errors can be generic.
    let description = error.message || 'Unknown error';
    if (error.message && error.message.toLowerCase().includes('permission')) {
        description = 'Bluetooth permission denied or missing. Please check app settings.';
    }
    toast.error('Bluetooth operation failed.', { description });
    if (deviceId) { // Attempt to disconnect if an error occurred after connection attempt or successful connection
        try { 
            console.log('Attempting to disconnect due to error...');
            await BleClient.disconnect(deviceId); 
        } catch (e) { 
            console.warn('Error during disconnect after main operation error:', e);
            /* ignore disconnect error during cleanup */ 
        }
    }
    return null;
  }
};
