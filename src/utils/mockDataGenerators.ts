import { VitalReadingFromDB } from '@/types/vitalSigns';

export const generateMockVitalHistory = (): VitalReadingFromDB[] => {
  const baseTimestamp = new Date().getTime();
  return [
    {
      id: 'mock1',
      profile_id: 'mockUser',
      timestamp: new Date(baseTimestamp - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
      created_at: new Date().toISOString(),
      blood_pressure_systolic: 120,
      blood_pressure_diastolic: 80,
      heart_rate: 75,
      spo2: 98,
      temperature_celsius: 36.5,
      respiratory_rate: 16,
      notes: 'Mock reading 1',
    },
    {
      id: 'mock2',
      profile_id: 'mockUser',
      timestamp: new Date(baseTimestamp - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
      created_at: new Date().toISOString(),
      blood_pressure_systolic: 125,
      blood_pressure_diastolic: 82,
      heart_rate: 70,
      spo2: 99,
      temperature_celsius: 36.7,
      respiratory_rate: 15,
      notes: 'Mock reading 2',
    },
    {
      id: 'mock3',
      profile_id: 'mockUser',
      timestamp: new Date(baseTimestamp - 1000 * 60 * 60 * 1).toISOString(), // 1 hour ago
      created_at: new Date().toISOString(),
      blood_pressure_systolic: 118,
      blood_pressure_diastolic: 78,
      heart_rate: 80,
      spo2: 97,
      temperature_celsius: 36.6,
      respiratory_rate: 18,
      notes: 'Mock reading 3',
    },
    { 
      id: 'mock4',
      profile_id: 'mockUser',
      timestamp: new Date(baseTimestamp - 1000 * 60 * 30).toISOString(), // 30 mins ago
      created_at: new Date().toISOString(),
      heart_rate: 85,
      spo2: 99,
      notes: 'Mock reading - HR and SpO2 only',
    },
     { 
      id: 'mock5',
      profile_id: 'mockUser',
      timestamp: new Date(baseTimestamp - 1000 * 60 * 10).toISOString(), // 10 mins ago
      created_at: new Date().toISOString(),
      blood_pressure_systolic: 130,
      blood_pressure_diastolic: 85,
      notes: 'Mock reading - BP only',
    }
  ];
};
