import { useState } from 'react';
import { MobileLayout } from '@/components/Layout/MobileLayout';
import { Button } from '@/components/ui/button';
// import { connectToLinktop, LinktopVitalsData } from '@/services/linktopBLEService';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { CircularProgressDisplay } from '@/components/Dashboard/CircularProgressDisplay';
import { LinktopVitalsData } from '@/services/linktopBLEService';
import { DefaultPageHeaderElements } from '@/components/Layout/DefaultPageHeaderElements';

const BloodGlucosePage = () => {
  const [vitals, setVitals] = useState<LinktopVitalsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [glucoseValue, setGlucoseValue] = useState<number | null>(null);
  const { headerLeft, headerRight } = DefaultPageHeaderElements();

  const handleStartTest = async () => {
    setIsLoading(true);
    setVitals(null); 
    setGlucoseValue(null);
    toast.info('Blood Glucose measurement feature is not yet implemented.');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <MobileLayout headerLeft={headerLeft} headerRight={headerRight}>
      <h1 className="text-2xl font-semibold mb-6 text-center">Blood Glucose</h1>
      <div className="flex flex-col items-center justify-between p-4 min-h-[calc(100vh-3.5rem-5rem-2rem-3rem-3rem)]"> {/* Adjusted min-h for consistency */}
        <div className="flex-grow flex flex-col items-center justify-center w-full">
          {isLoading && !glucoseValue && (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-16 w-16 animate-spin text-primary mb-6" />
              <p className="text-muted-foreground text-lg">Attempting to connect...</p>
            </div>
          )}

          {!isLoading && !glucoseValue && (
            <CircularProgressDisplay
              value={null}
              maxValue={300} 
              unit="mg/dL"
              label="Blood Glucose"
              color="#A076F9" 
              valueFontSize="text-6xl"
              size={220}
              isLoading={true}
            />
          )}
          
          {glucoseValue !== null && (
            <CircularProgressDisplay
              value={glucoseValue}
              maxValue={300}
              unit="mg/dL"
              label="Blood Glucose"
              color="#A076F9" 
              valueFontSize="text-6xl"
              size={220}
              isLoading={isLoading}
            />
          )}
          
          {!isLoading && glucoseValue === null && (
             <p className="text-muted-foreground mt-8 text-center text-sm">Press START to measure blood glucose. (Feature upcoming)</p>
          )}
        </div>

        <div className="w-full flex justify-center pt-6 mt-auto">
          <Button
            onClick={handleStartTest}
            disabled={isLoading}
            className="rounded-full w-20 h-20 bg-primary hover:bg-primary/90 text-primary-foreground flex flex-col items-center justify-center shadow-2xl focus:ring-4 focus:ring-primary/50"
            aria-label="Start Test"
          >
            {isLoading ? (
              <Loader2 className="h-8 w-8 animate-spin" />
            ) : (
              <span className="font-bold tracking-wider text-base">START</span>
            )}
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default BloodGlucosePage;
