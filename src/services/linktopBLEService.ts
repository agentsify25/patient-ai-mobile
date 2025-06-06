
import { Linktop } from '@/plugins/linktop-plugin/src';
import { toast } from 'sonner';

export interface LinktopVitalsData {
  spo2?: number;
  heartRate?: number;
  temperature?: number;
  bloodPressure?: {
    systolic: number;
    diastolic: number;
    hr: number;
  };
  glucose?: number;
  ecg?: {
    data: number[];
    hrv?: number;
    rriMax?: number;
    rriMin?: number;
    mood?: string;
    respiratoryRate?: number;
  };
  batteryLevel?: number;
}

// Scan for Linktop devices
export const startScan = async (): Promise<void> => {
  try {
    await Linktop.startScan();
    toast.success('Started scanning for Linktop devices');
  } catch (error: any) {
    toast.error('Failed to start scan', { description: error.message });
    throw error;
  }
};

// Connect to a specific device
export const connectToDevice = async (deviceId: string): Promise<void> => {
  try {
    await Linktop.connectToDevice({ deviceId });
    toast.success('Connected to Linktop device');
  } catch (error: any) {
    toast.error('Failed to connect to device', { description: error.message });
    throw error;
  }
};

// Blood Oxygen measurement
export const measureBloodOxygen = async (): Promise<{ spo2: number; bpm: number }> => {
  try {
    const result = await Linktop.startBloodOxygenMeasurement();
    return result;
  } catch (error: any) {
    toast.error('Failed to measure blood oxygen', { description: error.message });
    throw error;
  }
};

// Blood Pressure measurement
export const measureBloodPressure = async (): Promise<{ systolic: number; diastolic: number; hr: number }> => {
  try {
    const result = await Linktop.startBloodPressureMeasurement();
    return result;
  } catch (error: any) {
    toast.error('Failed to measure blood pressure', { description: error.message });
    throw error;
  }
};

// Temperature measurement
export const measureTemperature = async (): Promise<{ temperature: number }> => {
  try {
    const result = await Linktop.startTemperatureMeasurement();
    return result;
  } catch (error: any) {
    toast.error('Failed to measure temperature', { description: error.message });
    throw error;
  }
};

// ECG measurement
export const measureECG = async (): Promise<{ ecg_data: number[] }> => {
  try {
    const result = await Linktop.startECGMeasurement();
    return result;
  } catch (error: any) {
    toast.error('Failed to measure ECG', { description: error.message });
    throw error;
  }
};

// Heart Rate measurement
export const measureHeartRate = async (): Promise<{ bpm: number }> => {
  try {
    const result = await Linktop.startHeartRateMeasurement();
    return result;
  } catch (error: any) {
    toast.error('Failed to measure heart rate', { description: error.message });
    throw error;
  }
};

// Blood Glucose measurement
export const measureBloodGlucose = async (): Promise<{ glucose: number }> => {
  try {
    const result = await Linktop.startBloodGlucoseMeasurement();
    return result;
  } catch (error: any) {
    toast.error('Failed to measure blood glucose', { description: error.message });
    throw error;
  }
};

// Stethoscope
export const startStethoscope = async (): Promise<void> => {
  try {
    await Linktop.startStethoscope();
    toast.success('Stethoscope started');
  } catch (error: any) {
    toast.error('Failed to start stethoscope', { description: error.message });
    throw error;
  }
};

// Otoscope
export const startOtoscope = async (): Promise<void> => {
  try {
    await Linktop.startOtoscope();
    toast.success('Otoscope started');
  } catch (error: any) {
    toast.error('Failed to start otoscope', { description: error.message });
    throw error;
  }
};

// Device Firmware Update
export const startDFU = async (deviceId: string): Promise<void> => {
  try {
    await Linktop.startDFU({ deviceId });
    toast.success('Firmware update started');
  } catch (error: any) {
    toast.error('Failed to start firmware update', { description: error.message });
    throw error;
  }
};

// Main connection function for individual measurements
export const connectToLinktop = async (): Promise<LinktopVitalsData | null> => {
  try {
    toast.info('Connecting to Linktop device...');
    
    // Start scan first
    await startScan();
    
    // For now, we need a real device selection UI
    // This is a placeholder that will fail without a real device
    throw new Error('Device selection UI not implemented. A real Linktop device must be selected.');
    
  } catch (error: any) {
    toast.error('Failed to connect to Linktop device', { description: error.message });
    throw error;
  }
};
