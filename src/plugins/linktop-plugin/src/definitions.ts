
export interface LinktopPlugin {
  startScan(): Promise<void>;
  connectToDevice(options: { deviceId: string }): Promise<void>;
  startBloodOxygenMeasurement(): Promise<{ spo2: number; bpm: number }>;
  startBloodPressureMeasurement(): Promise<{ systolic: number; diastolic: number; hr: number }>;
  startTemperatureMeasurement(): Promise<{ temperature: number }>;
  startECGMeasurement(): Promise<{ ecg_data: number[] }>;
  startHeartRateMeasurement(): Promise<{ bpm: number }>;
  startBloodGlucoseMeasurement(): Promise<{ glucose: number }>;
  startStethoscope(): Promise<void>;
  startOtoscope(): Promise<void>;
  startDFU(options: { deviceId: string }): Promise<void>;
}
