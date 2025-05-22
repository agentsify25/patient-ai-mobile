
import { useState } from 'react';
import { MobileLayout } from '@/components/Layout/MobileLayout';
import { Button } from '@/components/ui/button';
import { connectToLinktop, LinktopVitalsData } from '@/services/linktopBLEService';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { DefaultPageHeaderElements } from '@/components/Layout/DefaultPageHeaderElements';

const ECGPage = () => {
  const [vitals, setVitals] = useState<LinktopVitalsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { headerLeft, headerRight } = DefaultPageHeaderElements();

  const handleStartTest = async () => {
    setIsLoading(true);
    setVitals(null);
    toast.info('Attempting to read data. ECG data parsing/streaming is not yet fully implemented.');
    try {
      const data = await connectToLinktop(); 
      if (data) {
        setVitals(data);
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

  const formatMetric = (value: number | string | undefined, unit: string = "", defaultValue: string = "-") => {
    if (value === undefined || value === null || (typeof value === 'number' && isNaN(value))) return defaultValue;
    if (typeof value === 'string' && value.trim() === "") return defaultValue;
    if (typeof value === 'string') return value;
    return `${value} ${unit}`.trim();
  };
  
  const ecgMetrics = [
    { label: "RRI max", value: formatMetric(vitals?.ecg?.rriMax, "ms", "0 ms") },
    { label: "RRI min", value: formatMetric(vitals?.ecg?.rriMin, "ms", "0 ms") },
    { label: "Avg HR", value: formatMetric(vitals?.heartRate, "BPM", "0 BPM") }, // Mockup uses 0 BPM
    { label: "HRV", value: formatMetric(vitals?.ecg?.hrv, "", "0") }, // Mockup uses 0
    { label: "Mood", value: vitals?.ecg?.mood ?? "-" },
    { label: "Resp Rate", value: formatMetric(vitals?.ecg?.respiratoryRate, "BPM", "0 BPM") }, // Mockup uses 0 BPM
  ];

  // Style for ECG grid background
  const ecgGridStyle = {
    backgroundImage: `
      linear-gradient(to right, hsl(var(--primary) / 0.1) 1px, transparent 1px),
      linear-gradient(to bottom, hsl(var(--primary) / 0.1) 1px, transparent 1px)
    `,
    backgroundSize: '15px 15px', // Adjust grid size as needed
  };


  return (
    <MobileLayout title="ECG" headerLeft={headerLeft} headerRight={headerRight}>
      <div className="flex flex-col items-center justify-between p-4 min-h-[calc(100vh-3.5rem-5rem-2rem-3rem)]">
        <div className="flex-grow flex flex-col items-center justify-center w-full space-y-3">
          {isLoading && !vitals && (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-16 w-16 animate-spin text-primary mb-6" />
              <p className="text-muted-foreground text-lg">Connecting to device...</p>
            </div>
          )}

          {(!isLoading || vitals) && ( // Show content if not loading OR if vitals are present
            <>
              <div className="w-full flex justify-end space-x-4 text-xs text-muted-foreground mb-1 pr-1">
                {ecgParameters.map(param => (
                  <div key={param.label}>
                    <span>{param.label}: </span>
                    <span className="font-semibold text-foreground">{param.value}</span>
                  </div>
                ))}
              </div>
              <div 
                className="bg-card w-full aspect-[2/1] max-w-md rounded-md" // Use bg-card or a darker tone
                style={ecgGridStyle}
              >
                {(!vitals || !vitals.ecg) && !isLoading && ( // Show placeholder if no ECG data specifically
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground text-sm">ECG Graph Area</p>
                  </div>
                )}
                {/* Actual ECG graph would be rendered here if available */}
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 w-full text-sm mt-2 max-w-md px-1">
                {ecgMetrics.map(metric => (
                  <div key={metric.label} className="flex justify-between items-baseline">
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
             <p className="text-muted-foreground mt-8 text-center text-sm">Press START to attempt an ECG reading.</p>
          )}
        </div>

        <div className="w-full flex justify-center pt-6 mt-auto">
          <Button
            onClick={handleStartTest}
            disabled={isLoading}
            className="rounded-full w-28 h-28 bg-primary hover:bg-primary/90 text-primary-foreground flex flex-col items-center justify-center shadow-xl focus:ring-4 focus:ring-primary/50"
            aria-label="Start Test"
          >
            {isLoading ? (
              <Loader2 className="h-10 w-10 animate-spin" />
            ) : (
              <span className="font-bold tracking-wider text-lg">START</span>
            )}
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default ECGPage;
