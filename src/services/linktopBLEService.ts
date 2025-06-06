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

// Connect to device and get comprehensive vitals reading
export const connectToLinktop = async (): Promise<LinktopVitalsData | null> => {
  try {
    // This is a consolidated function that attempts to read multiple vitals
    // In a real implementation, this would coordinate with the connected device
    const vitalsData: LinktopVitalsData = {};
    
    // For now, this will attempt to read basic vitals
    // Individual measurement functions can be called as needed
    try {
      const spo2Result = await measureBloodOxygen();
      vitalsData.spo2 = spo2Result.spo2;
      vitalsData.heartRate = spo2Result.bpm;
    } catch (error) {
      console.log('Blood oxygen measurement not available');
    }

    try {
      const tempResult = await measureTemperature();
      vitalsData.temperature = tempResult.temperature;
    } catch (error) {
      console.log('Temperature measurement not available');
    }

    try {
      const bpResult = await measureBloodPressure();
      vitalsData.bloodPressure = bpResult;
    } catch (error) {
      console.log('Blood pressure measurement not available');
    }

    // Add battery level if available
    vitalsData.batteryLevel = Math.floor(Math.random() * 30) + 70; // Mock battery level

    return vitalsData;
  } catch (error: any) {
    toast.error('Failed to connect to Linktop device', { description: error.message });
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
