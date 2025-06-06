
import { WebPlugin } from '@capacitor/core';
import type { LinktopPlugin } from './definitions';

export class LinktopWeb extends WebPlugin implements LinktopPlugin {
  async startScan(): Promise<void> {
    console.log('Web platform: Linktop scan not supported');
  }

  async connectToDevice(options: { deviceId: string }): Promise<void> {
    console.log('Web platform: Linktop connect not supported', options);
  }

  async startBloodOxygenMeasurement(): Promise<{ spo2: number; bpm: number }> {
    console.log('Web platform: Mock blood oxygen measurement');
    return { spo2: 98, bpm: 75 };
  }

  async startBloodPressureMeasurement(): Promise<{ systolic: number; diastolic: number; hr: number }> {
    console.log('Web platform: Mock blood pressure measurement');
    return { systolic: 120, diastolic: 80, hr: 72 };
  }

  async startTemperatureMeasurement(): Promise<{ temperature: number }> {
    console.log('Web platform: Mock temperature measurement');
    return { temperature: 36.7 };
  }

  async startECGMeasurement(): Promise<{ ecg_data: number[] }> {
    console.log('Web platform: Mock ECG measurement');
    return { ecg_data: [] };
  }

  async startHeartRateMeasurement(): Promise<{ bpm: number }> {
    console.log('Web platform: Mock heart rate measurement');
    return { bpm: 78 };
  }

  async startBloodGlucoseMeasurement(): Promise<{ glucose: number }> {
    console.log('Web platform: Mock blood glucose measurement');
    return { glucose: 98 };
  }

  async startStethoscope(): Promise<void> {
    console.log('Web platform: Stethoscope not supported');
  }

  async startOtoscope(): Promise<void> {
    console.log('Web platform: Otoscope not supported');
  }

  async startDFU(options: { deviceId: string }): Promise<void> {
    console.log('Web platform: DFU not supported', options);
  }
}
