
import { WebPlugin } from '@capacitor/core';
import type { LinktopPlugin } from './definitions';

export class LinktopWeb extends WebPlugin implements LinktopPlugin {
  async startScan(): Promise<void> {
    throw new Error('Linktop device scanning is not supported on web platform');
  }

  async connectToDevice(options: { deviceId: string }): Promise<void> {
    throw new Error('Linktop device connection is not supported on web platform');
  }

  async startBloodOxygenMeasurement(): Promise<{ spo2: number; bpm: number }> {
    throw new Error('Blood oxygen measurement requires a physical Linktop device');
  }

  async startBloodPressureMeasurement(): Promise<{ systolic: number; diastolic: number; hr: number }> {
    throw new Error('Blood pressure measurement requires a physical Linktop device');
  }

  async startTemperatureMeasurement(): Promise<{ temperature: number }> {
    throw new Error('Temperature measurement requires a physical Linktop device');
  }

  async startECGMeasurement(): Promise<{ ecg_data: number[] }> {
    throw new Error('ECG measurement requires a physical Linktop device');
  }

  async startHeartRateMeasurement(): Promise<{ bpm: number }> {
    throw new Error('Heart rate measurement requires a physical Linktop device');
  }

  async startBloodGlucoseMeasurement(): Promise<{ glucose: number }> {
    throw new Error('Blood glucose measurement requires a physical Linktop device');
  }

  async startStethoscope(): Promise<void> {
    throw new Error('Stethoscope functionality requires a physical Linktop device');
  }

  async startOtoscope(): Promise<void> {
    throw new Error('Otoscope functionality requires a physical Linktop device');
  }

  async startDFU(options: { deviceId: string }): Promise<void> {
    throw new Error('Device firmware update requires a physical Linktop device');
  }
}
