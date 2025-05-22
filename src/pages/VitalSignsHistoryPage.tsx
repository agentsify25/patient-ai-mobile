
import React from 'react';
import { MobileLayout } from "@/components/Layout/MobileLayout";
import { DefaultPageHeaderElements } from '@/components/Layout/DefaultPageHeaderElements';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { VitalSignsFormData } from '@/lib/schemas';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartConfig } from '@/components/ui/chart';
import { LineChart, CartesianGrid, XAxis, YAxis, Line as RechartsLine, Legend } from 'recharts'; // Renamed Line to RechartsLine to avoid conflict
import { Loader2, Heart, Activity, Droplets } from 'lucide-react';

interface VitalReadingFromDB extends VitalSignsFormData {
  id: string;
  profile_id: string;
  timestamp: string;
  created_at: string;
  ecg_data_url?: string | null;
}

const fetchVitalHistory = async (userId: string | undefined): Promise<VitalReadingFromDB[]> => {
  if (!userId) return [];
  const { data, error } = await supabase
    .from('vital_readings')
    .select('*')
    .eq('profile_id', userId)
    .order('timestamp', { ascending: true }); // Ascending for chronological chart

  if (error) {
    console.error('Error fetching vital history:', error);
    throw new Error(error.message);
  }
  return data || [];
};

const chartConfigBase = {
  blood_pressure_systolic: { label: "Systolic", color: "hsl(var(--chart-1))" },
  blood_pressure_diastolic: { label: "Diastolic", color: "hsl(var(--chart-2))" },
  heart_rate: { label: "Heart Rate", color: "hsl(var(--chart-3))" },
  spo2: { label: "SpO2", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig;


const VitalSignsHistoryPage = () => {
  const { user } = useAuth();
  const { headerLeft, headerRight } = DefaultPageHeaderElements();

  const { data: vitalHistory, isLoading, error } = useQuery<VitalReadingFromDB[], Error>({
    queryKey: ['vitalHistory', user?.id],
    queryFn: () => fetchVitalHistory(user?.id),
    enabled: !!user?.id,
  });

  const processedData = React.useMemo(() => {
    if (!vitalHistory) return { bpData: [], hrData: [], spo2Data: [] };

    const bpData = vitalHistory
      .filter(v => v.blood_pressure_systolic != null && v.blood_pressure_diastolic != null)
      .map(v => ({
        time: format(new Date(v.timestamp), 'MMM d, HH:mm'),
        systolic: v.blood_pressure_systolic,
        diastolic: v.blood_pressure_diastolic,
      }));

    const hrData = vitalHistory
      .filter(v => v.heart_rate != null)
      .map(v => ({
        time: format(new Date(v.timestamp), 'MMM d, HH:mm'),
        heart_rate: v.heart_rate,
      }));

    const spo2Data = vitalHistory
      .filter(v => v.spo2 != null)
      .map(v => ({
        time: format(new Date(v.timestamp), 'MMM d, HH:mm'),
        spo2: v.spo2,
      }));
      
    return { bpData, hrData, spo2Data };
  }, [vitalHistory]);

  if (isLoading) {
    return (
      <MobileLayout headerLeft={headerLeft} headerRight={headerRight}>
        <div className="flex justify-center items-center h-full">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </MobileLayout>
    );
  }

  if (error) {
    return (
      <MobileLayout headerLeft={headerLeft} headerRight={headerRight}>
        <div className="text-center text-red-500">Error loading history: {error.message}</div>
      </MobileLayout>
    );
  }
  
  const noDataAvailable = !vitalHistory || vitalHistory.length === 0;

  return (
    <MobileLayout headerLeft={headerLeft} headerRight={headerRight}>
      <h1 className="text-2xl font-semibold mb-6 text-center">Vital Signs History</h1>
      {noDataAvailable ? (
        <p className="text-center text-muted-foreground mt-8">No vital signs history available.</p>
      ) : (
      <div className="space-y-6 pb-8">
        {/* Blood Pressure Chart */}
        {processedData.bpData.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <CardTitle>Blood Pressure</CardTitle>
            </div>
            <span className="text-sm text-muted-foreground">(mmHg)</span>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigBase} className="h-[250px] w-full">
              <LineChart data={processedData.bpData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="time" tickFormatter={(value) => format(new Date(value), 'HH:mm')} angle={-30} textAnchor="end" height={50} />
                <YAxis domain={['auto', 'auto']} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <RechartsLine type="monotone" dataKey="systolic" name="Systolic" strokeWidth={2} stroke="var(--color-blood_pressure_systolic)" dot={false} />
                <RechartsLine type="monotone" dataKey="diastolic" name="Diastolic" strokeWidth={2} stroke="var(--color-blood_pressure_diastolic)" dot={false} />
                <ChartLegend content={<ChartLegendContent />} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        )}

        {/* Heart Rate Chart */}
        {processedData.hrData.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              <CardTitle>Heart Rate</CardTitle>
            </div>
            <span className="text-sm text-muted-foreground">(bpm)</span>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigBase} className="h-[250px] w-full">
              <LineChart data={processedData.hrData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="time" tickFormatter={(value) => format(new Date(value), 'HH:mm')} angle={-30} textAnchor="end" height={50} />
                <YAxis domain={['auto', 'auto']} />
                <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                <RechartsLine type="monotone" dataKey="heart_rate" name="Heart Rate" strokeWidth={2} stroke="var(--color-heart_rate)" dot={false} />
                <ChartLegend content={<ChartLegendContent />} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        )}

        {/* SpO2 Chart */}
        {processedData.spo2Data.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-primary" />
              <CardTitle>Blood Oxygen</CardTitle>
            </div>
            <span className="text-sm text-muted-foreground">(%)</span>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigBase} className="h-[250px] w-full">
              <LineChart data={processedData.spo2Data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="time" tickFormatter={(value) => format(new Date(value), 'HH:mm')} angle={-30} textAnchor="end" height={50} />
                <YAxis domain={[80, 100]} allowDataOverflow={true} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <RechartsLine type="monotone" dataKey="spo2" name="SpO2" strokeWidth={2} stroke="var(--color-spo2)" dot={false} />
                <ChartLegend content={<ChartLegendContent />} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        )}
      </div>
      )}
    </MobileLayout>
  );
};

export default VitalSignsHistoryPage;

