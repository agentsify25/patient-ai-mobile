
import React from 'react';
import { MobileLayout } from "@/components/Layout/MobileLayout";
import { DefaultPageHeaderElements } from '@/components/Layout/DefaultPageHeaderElements';
import { ChartConfig } from '@/components/ui/chart'; // Import ChartConfig
import { Loader2 } from 'lucide-react';

import { useVitalHistory } from '@/hooks/useVitalHistory';
import BloodPressureChart from '@/components/VitalSigns/BloodPressureChart';
import HeartRateChart from '@/components/VitalSigns/HeartRateChart';
import Spo2Chart from '@/components/VitalSigns/Spo2Chart';

// Moved VitalReadingFromDB to src/types/vitalSigns.ts
// Moved generateMockVitalHistory and fetchVitalHistory to src/hooks/useVitalHistory.ts

const chartConfigBase = {
  blood_pressure_systolic: { label: "Systolic", color: "hsl(var(--chart-1))" },
  blood_pressure_diastolic: { label: "Diastolic", color: "hsl(var(--chart-2))" },
  heart_rate: { label: "Heart Rate", color: "hsl(var(--chart-3))" },
  spo2: { label: "SpO2", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig;


const VitalSignsHistoryPage = () => {
  const { headerLeft, headerRight } = DefaultPageHeaderElements();
  const { 
    vitalHistory, 
    isLoading, 
    error, 
    processedBpData, 
    processedHrData, 
    processedSpo2Data 
  } = useVitalHistory();

  // Moved processedData logic to useVitalHistory hook

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
  const noChartDataAvailable = processedBpData.length === 0 && processedHrData.length === 0 && processedSpo2Data.length === 0;


  return (
    <MobileLayout headerLeft={headerLeft} headerRight={headerRight}>
      <h1 className="text-2xl font-semibold mb-6 text-center">Vital Signs History</h1>
      {noDataAvailable || noChartDataAvailable ? (
        <p className="text-center text-muted-foreground mt-8">
          {noDataAvailable ? "No vital signs history available." : "No chart data to display for the recorded vital signs."}
        </p>
      ) : (
      <div className="space-y-6 pb-8">
        <BloodPressureChart data={processedBpData} chartConfig={chartConfigBase} />
        <HeartRateChart data={processedHrData} chartConfig={chartConfigBase} />
        <Spo2Chart data={processedSpo2Data} chartConfig={chartConfigBase} />
      </div>
      )}
    </MobileLayout>
  );
};

export default VitalSignsHistoryPage;
