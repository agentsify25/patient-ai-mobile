
import { useState } from 'react';
import { MobileLayout } from '@/components/Layout/MobileLayout';
import { Button } from '@/components/ui/button';
import { connectToLinktop, LinktopVitalsData } from '@/services/linktopBLEService';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const ECGPage = () => {
  const [vitals, setVitals] = useState<LinktopVitalsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartTest = async () => {
    setIsLoading(true);
    setVitals(null);
    toast.info('Attempting to read data. ECG data parsing/streaming is not yet fully implemented.');
    try {
      const data = await connectToLinktop(); 
      if (data) {
        setVitals(data);
        // Check if any ECG specific data is present as an example
        if (data.ecg?.hrv !== undefined || data.heartRate !== undefined) {
             toast.success('Device reading attempt complete. Displaying available ECG related info.');
        } else {
            toast.info('ECG specific data not available from this reading.');
        }
      }
    } catch (error: any) {
      toast.error('Failed to connect or read data.', { description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const ecgParameters = [
    { label: "Paper speed", value: "25 mm/s" },
    { label: "Gain", value: "10 mm/mV" },
  ];

  // Helper to format number values or return a default string
  const formatMetric = (value: number | string | undefined, unit: string = "", defaultValue: string = "-") => {
    if (value === undefined || value === null) return defaultValue;
    if (typeof value === 'string') return value; // Already formatted or a string like mood
    return `${value} ${unit}`.trim();
  };
  
  const ecgMetrics = [
    { label: "RRI max", value: formatMetric(vitals?.ecg?.rriMax, "ms", "0 ms") },
    { label: "RRI min", value: formatMetric(vitals?.ecg?.rriMin, "ms", "0 ms") },
    { label: "Avg HR", value: formatMetric(vitals?.heartRate, "BPM", "0 BPM") },
    { label: "HRV", value: formatMetric(vitals?.ecg?.hrv, "", "0") },
    { label: "Mood", value: vitals?.ecg?.mood ?? "-" }, // Mood is likely a string
    { label: "Resp Rate", value: formatMetric(vitals?.ecg?.respiratoryRate, "BPM", "0 BPM") },
  ];


  return (
    <MobileLayout title="ECG">
      <div className="flex flex-col items-center justify-between p-4 min-h-[calc(100vh-3.5rem-5rem-2rem)]">
        <div className="flex-grow flex flex-col items-center justify-center w-full space-y-4">
          {isLoading && !vitals && (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-16 w-16 animate-spin text-primary mb-6" />
              <p className="text-muted-foreground text-lg">Connecting to device...</p>
            </div>
          )}

          {!isLoading && (
            <>
              <div className="w-full flex justify-end space-x-4 text-xs text-muted-foreground mb-1 pr-1">
                {ecgParameters.map(param => (
                  <div key={param.label}>
                    <span>{param.label}: </span>
                    <span className="font-semibold text-foreground">{param.value}</span>
                  </div>
                ))}
              </div>
              <div className="ecg-grid bg-card/50 w-full aspect-[2/1] max-w-md"> {/* Ensure width and aspect ratio */}
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground text-sm">ECG Graph Area</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-full text-sm mt-3 max-w-md">
                {ecgMetrics.map(metric => (
                  <div key={metric.label} className="flex justify-between">
                    <span className="text-muted-foreground">{metric.label}:</span>
                    <span className="font-semibold text-foreground">{metric.value}</span>
                  </div>
                ))}
              </div>
              {vitals?.batteryLevel !== undefined && (
                <p className="text-xs text-muted-foreground pt-2">Device Battery: {vitals.batteryLevel}%</p>
              )}
            </>
          )}
           {!isLoading && !vitals && (
             <p className="text-muted-foreground mt-8 text-center">Press START to attempt an ECG reading.</p>
          )}
        </div>

        <div className="w-full flex justify-center pt-6 mt-auto">
          <Button
            onClick={handleStartTest}
            disabled={isLoading}
            className="rounded-full w-32 h-32 text-lg bg-primary hover:bg-primary/90 text-primary-foreground flex flex-col items-center justify-center shadow-2xl focus:ring-4 focus:ring-primary/50"
            aria-label="Start Test"
          >
            {isLoading ? (
              <Loader2 className="h-12 w-12 animate-spin" />
            ) : (
              <span className="font-bold tracking-wider text-xl">START</span>
            )}
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default ECGPage;
