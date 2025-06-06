
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { VitalReadingFromDB } from '@/types/vitalSigns';

const fetchVitalHistory = async (userId: string | undefined): Promise<VitalReadingFromDB[]> => {
  if (!userId) {
    return [];
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
        time: v.timestamp,
        systolic: v.blood_pressure_systolic,
        diastolic: v.blood_pressure_diastolic,
      }));

    const hrData = vitalHistory
      .filter(v => v.heart_rate != null)
      .map(v => ({
        time: v.timestamp,
        heart_rate: v.heart_rate,
      }));

    const spo2Data = vitalHistory
      .filter(v => v.spo2 != null)
      .map(v => ({
        time: v.timestamp,
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
