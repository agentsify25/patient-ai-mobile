
import { useState } from 'react';
import { MobileLayout } from '@/components/Layout/MobileLayout';
import { Button } from '@/components/ui/button';
import { connectToLinktop, LinktopVitalsData } from '@/services/linktopBLEService';
import { Loader2, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { CircularProgressDisplay } from '@/components/Dashboard/CircularProgressDisplay';
import { DefaultPageHeaderElements } from '@/components/Layout/DefaultPageHeaderElements';

const BloodOxygenPage = () => {
  const [vitals, setVitals] = useState<LinktopVitalsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { headerLeft, headerRight } = DefaultPageHeaderElements();

  const handleStartTest = async () => {
    setIsLoading(true);
    setVitals(null);
    try {
      const data = await connectToLinktop();
      if (data) {
        setVitals(data);
        toast.success('Blood Oxygen reading complete.');
      }
    } catch (error: any) {
      toast.error('Failed to connect or read data.', { description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MobileLayout title="Blood Oxygen" headerLeft={headerLeft} headerRight={headerRight}>
      <div className="flex flex-col items-center justify-between p-4 min-h-[calc(100vh-3.5rem-5rem-2rem-3rem)]"> {/* Adjusted min-height for content spacing */}
        <div className="flex-grow flex flex-col items-center justify-center w-full">
          {isLoading && !vitals && (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-16 w-16 animate-spin text-primary mb-6" />
              <p className="text-muted-foreground text-lg">Connecting to device...</p>
            </div>
          )}

          {!isLoading && !vitals && (
            <CircularProgressDisplay
              value={null} // Initially 0 as per mockup
              maxValue={100}
              unit="%"
              label="SpO2" // Label removed from inside circle in mockup
              color="#00A9DE" // Cyan
              valueFontSize="text-6xl" // Mockup seems to have a large value
              size={220} // Mockup size
              isLoading={true} // Shows '--' or 0 initially
              showLabel={false} // Mockup does not have label inside circle
            />
          )}
          
          {vitals && (
            <CircularProgressDisplay
              value={vitals.spo2}
              maxValue={100}
              unit="%"
              label="SpO2"
              color="#00A9DE"
              valueFontSize="text-6xl"
              size={220}
              isLoading={isLoading}
              showLabel={false}
            />
          )}
          
          {/* Secondary HR display as per mockup */}
          <div className="mt-6 text-center">
            <span className="text-4xl font-semibold">
              {isLoading && !vitals ? '0' : (vitals?.heartRate ?? '0')}
            </span>
            <Heart size={24} className="inline-block ml-1 mb-1 text-muted-foreground" />
            <span className="text-muted-foreground ml-1">BPM</span>
          </div>

          {/* "Blood Oxygen" label with dashed lines */}
          <div className="mt-6 flex flex-col items-center">
            <span className="text-sm text-muted-foreground">Blood Oxygen</span>
            <div className="flex items-end justify-center h-10 space-x-4 mt-1">
              {/* Placeholder for dashed lines, could be more dynamic */}
              <div className="flex flex-col items-center">
                <div className="h-3 w-px border-l border-dashed border-muted-foreground/50"></div>
                <span className="text-xs text-muted-foreground/70 mt-1">94</span>
              </div>
               <div className="flex flex-col items-center">
                <div className="h-5 w-px border-l border-dashed border-muted-foreground/50"></div>
              </div>
            </div>
          </div>
          
          {vitals?.batteryLevel !== undefined && (
            <p className="text-xs text-muted-foreground mt-4">Device Battery: {vitals.batteryLevel}%</p>
          )}

          {!isLoading && !vitals && !isLoading && (
             <p className="text-muted-foreground mt-8 text-center text-sm">Press START to measure your blood oxygen.</p>
          )}
        </div>

        <div className="w-full flex justify-center pt-6 mt-auto">
          <Button
            onClick={handleStartTest}
            disabled={isLoading}
            className="rounded-full w-28 h-28 bg-primary hover:bg-primary/90 text-primary-foreground flex flex-col items-center justify-center shadow-xl focus:ring-4 focus:ring-primary/50" // Slightly smaller to match mockup proportions
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

export default BloodOxygenPage;
