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

export interface BloodPressureData {
  systolic?: number;
  diastolic?: number;
}

export interface ECGData {
  rriMax?: number; // Raw value, formatting (e.g., "ms") should be in component
  rriMin?: number;
  hrv?: number;
  mood?: string; // Mood might be textual
  respiratoryRate?: number;
}

export interface LinktopVitalsData {
  heartRate?: number;
  spo2?: number;
  temperature?: number;
  batteryLevel?: number;
  bloodPressure?: BloodPressureData;
  ecg?: ECGData;
}

function parseHeartRate(value: DataView): number {
  const flags = value.getUint8(0);
  const hrFormatUINT16 = (flags & 0x01) === 1;
  if (hrFormatUINT16) {
    return value.getUint16(1, true); // true for little-endian
  }
  return value.getUint8(1);
}

function parseCustomVitals(value: DataView): { spo2?: number; temperature?: number; bloodPressure?: BloodPressureData, ecg?: ECGData } {
  // IMPORTANT: This parsing logic is based on the user's example.
  // It MUST be verified against the actual Linktop device's data specification.
  const bytes = new Uint8Array(value.buffer);
  let spo2: number | undefined = undefined;
  let temperature: number | undefined = undefined;
  let bloodPressure: BloodPressureData | undefined = undefined; // Initialize as undefined
  let ecg: ECGData | undefined = undefined; // Initialize as undefined

  // Example: bytes[2] for SpO2, bytes[3,4] for Temperature
  if (bytes.length >= 3) { // Check if SpO2 byte might exist
    spo2 = bytes[2]; // Placeholder index
  }
  if (bytes.length >= 5) { // Check if temperature bytes might exist
    const tempRaw = (bytes[3] << 8) | bytes[4]; // Placeholder: MSB, LSB
    temperature = tempRaw / 10.0; // Placeholder scaling
  }

  // Placeholder for Blood Pressure and ECG parsing - Device specific
  // For now, we are not parsing these from the custom characteristic.
  // If they were part of this characteristic, parsing logic would go here.
  // e.g., if bytes[5] was systolic and bytes[6] was diastolic:
  // if (bytes.length >= 7) {
  //   bloodPressure = { systolic: bytes[5], diastolic: bytes[6] };
  // }
  // Similar for ECG data if it came from this characteristic.

  console.log('Raw Custom Data Bytes:', bytes);
  console.log('Parsed Custom Vitals:', { spo2, temperature, bloodPressure, ecg });

  return { spo2, temperature, bloodPressure, ecg };
}

export const connectToLinktop = async (): Promise<LinktopVitalsData | null> => {
  let deviceId: string | undefined;
  try {
    if (!Capacitor.isNativePlatform()) {
      toast.error("Bluetooth LE is primarily for native mobile devices. Web Bluetooth may have limitations.");
      return null;
    }

    await BleClient.initialize({ androidNeverForLocation: true });

    const enabled = await BleClient.isEnabled();
    if (!enabled) {
      toast.error('Bluetooth is not enabled. Please enable it.');
      return null;
    }
    
    toast.info('Scanning for Linktop devices...');

    await BleClient.requestLEScan(
      {
        namePrefix: LINKTOP_NAME_PREFIX,
        scanMode: ScanMode.SCAN_MODE_LOW_LATENCY,
      },
      (result) => {
        if (result.device && result.device.name?.startsWith(LINKTOP_NAME_PREFIX)) {
          console.log('Found device:', result.device.name, result.device.deviceId);
          deviceId = result.device.deviceId;
          BleClient.stopLEScan(); 
        }
      }
    );

    for (let i = 0; i < 100; i++) { 
        if (deviceId) break;
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    await BleClient.stopLEScan();

    if (!deviceId) {
      toast.error('No Linktop device found. Make sure it is nearby, powered on, and in pairing mode if necessary. Also, check Bluetooth permissions for the app.');
      return null;
    }

    const currentDeviceId = deviceId; 
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
    }

    try {
      // Assuming custom characteristic might provide SpO2, Temp, and potentially BP/ECG if structured that way.
      // For now, parseCustomVitals is a placeholder for BP/ECG from this characteristic.
      // If BP/ECG come from different characteristics, separate read calls would be needed here.
      const customRaw = await BleClient.read(currentDeviceId, LINKTOP_CUSTOM_SERVICE_UUID, LINKTOP_CUSTOM_CHARACTERISTIC_UUID);
      const { spo2, temperature, bloodPressure, ecg } = parseCustomVitals(customRaw);
      if (spo2 !== undefined) vitals.spo2 = spo2;
      if (temperature !== undefined) vitals.temperature = temperature;
      if (bloodPressure !== undefined) vitals.bloodPressure = bloodPressure; // Assign if parsed
      if (ecg !== undefined) vitals.ecg = ecg; // Assign if parsed

      // If Blood Pressure and ECG have their own dedicated services/characteristics,
      // they would be read here similar to Heart Rate and Battery.
      // For example:
      // try {
      //   const bpRaw = await BleClient.read(currentDeviceId, BP_SERVICE_UUID, BP_CHARACTERISTIC_UUID);
      //   vitals.bloodPressure = parseBloodPressure(bpRaw); // You'd need a parseBloodPressure function
      // } catch (bpError) { console.warn('Could not read BP'); }
      //
      // try {
      //   const ecgRaw = await BleClient.read(currentDeviceId, ECG_SERVICE_UUID, ECG_CHARACTERISTIC_UUID);
      //   vitals.ecg = parseECG(ecgRaw); // You'd need a parseECG function
      // } catch (ecgError) { console.warn('Could not read ECG'); }


      console.log('Custom Vitals:', { spo2, temperature, bloodPressure, ecg });
    } catch (customError) {
      console.warn('Could not read Custom Vitals (SpO2/Temp/BP/ECG):', customError);
      toast.warning('Could not read SpO2/Temperature/BP/ECG.');
    }
    
    await BleClient.disconnect(currentDeviceId);
    toast.info('Disconnected from device.');

    return vitals;

  } catch (error: any) {
    console.error('BLE Operation Error:', error);
    let description = error.message || 'Unknown error';
    if (error.message && error.message.toLowerCase().includes('permission')) {
        description = 'Bluetooth permission denied or missing. Please check app settings.';
    }
    toast.error('Bluetooth operation failed.', { description });
    if (deviceId) { 
        try { 
            console.log('Attempting to disconnect due to error...');
            await BleClient.disconnect(deviceId); 
        } catch (e) { 
            console.warn('Error during disconnect after main operation error:', e);
        }
    }
    return null;
  }
};
