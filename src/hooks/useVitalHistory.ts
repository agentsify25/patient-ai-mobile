
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { VitalSignsFormData } from '@/lib/schemas'; // Required for VitalReadingFromDB if extended inline
import { VitalReadingFromDB } from '@/types/vitalSigns';
import { format } from 'date-fns';

// Mock data generation (kept from original file)
const generateMockVitalHistory = (): VitalReadingFromDB[] => {
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

const fetchVitalHistory = async (userId: string | undefined): Promise<VitalReadingFromDB[]> => {
  if (!userId) {
    console.log("No user ID, returning mock vital history.");
    return generateMockVitalHistory();
  }
  const { data, error } = await supabase
    .from('vital_readings')
    .select('*')
    .eq('profile_id', userId)
    .order('timestamp', { ascending: true });

  if (error) {
    console.error('Error fetching vital history:', error);
    throw new Error(error.message);
  }
  return data || [];
};

export const useVitalHistory = () => {
  const { user } = useAuth();
  const { data: vitalHistory, isLoading, error } = useQuery<VitalReadingFromDB[], Error>({
    queryKey: ['vitalHistory', user?.id],
    queryFn: () => fetchVitalHistory(user?.id),
  });

  const processedData = React.useMemo(() => {
    if (!vitalHistory) return { bpData: [], hrData: [], spo2Data: [] };

    const bpData = vitalHistory
      .filter(v => v.blood_pressure_systolic != null && v.blood_pressure_diastolic != null)
      .map(v => ({
        time: v.timestamp, // Keep as ISO string for robust parsing
        systolic: v.blood_pressure_systolic,
        diastolic: v.blood_pressure_diastolic,
      }));

    const hrData = vitalHistory
      .filter(v => v.heart_rate != null)
      .map(v => ({
        time: v.timestamp, // Keep as ISO string
        heart_rate: v.heart_rate,
      }));

    const spo2Data = vitalHistory
      .filter(v => v.spo2 != null)
      .map(v => ({
        time: v.timestamp, // Keep as ISO string
        spo2: v.spo2,
      }));
      
    return { bpData, hrData, spo2Data };
  }, [vitalHistory]);

  return {
    vitalHistory,
    isLoading,
    error,
    processedBpData: processedData.bpData,
    processedHrData: processedData.hrData,
    processedSpo2Data: processedData.spo2Data,
  };
};

