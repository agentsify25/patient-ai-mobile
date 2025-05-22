import { useState } from 'react';
import { MobileLayout } from '@/components/Layout/MobileLayout';
import { Button } from '@/components/ui/button';
import { connectToLinktop, LinktopVitalsData } from '@/services/linktopBLEService';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { CircularProgressDisplay } from '@/components/Dashboard/CircularProgressDisplay';
import { DefaultPageHeaderElements } from '@/components/Layout/DefaultPageHeaderElements';

const HeartRatePage = () => {
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
        if (data.heartRate !== undefined) {
            toast.success('Heart Rate reading complete.');
        } else {
            toast.info('Heart Rate data not available from this reading.');
        }
      }
    } catch (error: any) {
      toast.error('Failed to connect or read data.', { description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MobileLayout headerLeft={headerLeft} headerRight={headerRight}>
      <h1 className="text-2xl font-semibold mb-6 text-center">Heart Rate</h1>
      <div className="flex flex-col items-center justify-between p-4 min-h-[calc(100vh-3.5rem-5rem-2rem-3rem)]">
        {isLoading && !vitals &&(
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-16 w-16 animate-spin text-primary mb-6" />
            <p className="text-muted-foreground text-lg">Connecting to device...</p>
          </div>
        )}

        {!isLoading && !vitals && (
          <CircularProgressDisplay
            value={null}
            maxValue={220} 
            unit="BPM"
            label="Heart Rate"
            color="#FF6B6B" 
            valueFontSize="text-6xl"
            size={220}
            isLoading={true}
          />
        )}

        {vitals && (
           <CircularProgressDisplay
            value={vitals.heartRate}
            maxValue={220} 
            unit="BPM"
            label="Heart Rate"
            color="#FF6B6B" 
            valueFontSize="text-6xl"
            size={220}
            isLoading={isLoading}
          />
        )}
        
        {vitals?.batteryLevel !== undefined && (
          <p className="text-sm text-muted-foreground mt-8">Device Battery: {vitals.batteryLevel}%</p>
        )}
         {!isLoading && !vitals && (
           <p className="text-muted-foreground mt-8 text-center text-sm">Press START to measure heart rate.</p>
        )}
      </div>

      <div className="w-full flex justify-center pt-6 mt-auto">
        <Button
          onClick={handleStartTest}
          disabled={isLoading}
          className="rounded-full w-24 h-24 bg-primary hover:bg-primary/90 text-primary-foreground flex flex-col items-center justify-center shadow-2xl focus:ring-4 focus:ring-primary/50"
          aria-label="Start Test"
        >
          {isLoading ? (
            <Loader2 className="h-8 w-8 animate-spin" />
          ) : (
            <span className="font-bold tracking-wider text-base">START</span>
          )}
        </Button>
      </div>
    </MobileLayout>
  );
};

export default HeartRatePage;
