import { useState } from 'react';
import { MobileLayout } from '@/components/Layout/MobileLayout';
import { Button } from '@/components/ui/button';
import { connectToLinktop, LinktopVitalsData } from '@/services/linktopBLEService';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { CircularProgressDisplay } from '@/components/Dashboard/CircularProgressDisplay';
import { DefaultPageHeaderElements } from '@/components/Layout/DefaultPageHeaderElements';

const TemperaturePage = () => {
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
        toast.success('Temperature reading complete.');
      }
    } catch (error: any) {
      toast.error('Failed to connect or read data.', { description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MobileLayout title="Body Temperature" headerLeft={headerLeft} headerRight={headerRight}>
      <div className="flex flex-col items-center justify-between p-4 min-h-[calc(100vh-3.5rem-5rem-2rem-3rem)]">
        <div className="flex-grow flex flex-col items-center justify-center w-full">
          {isLoading && !vitals && (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-16 w-16 animate-spin text-primary mb-6" />
              <p className="text-muted-foreground text-lg">Connecting to device...</p>
            </div>
          )}

          {!isLoading && !vitals && (
             <CircularProgressDisplay
              value={null} 
              maxValue={45} 
              unit="°C"
              label="Body Temperature"
              color="#A8E063" 
              valueFontSize="text-6xl"
              size={220}
              isLoading={true}
              showLabel={false}
            />
          )}

          {vitals && (
            <CircularProgressDisplay
              value={vitals.temperature}
              maxValue={45} 
              unit="°C"
              label="Body Temperature"
              color="#A8E063" 
              valueFontSize="text-6xl"
              size={220}
              isLoading={isLoading}
              showLabel={false}
            />
          )}
          
          {/* "Body Temperature" label with dashed lines */}
           <div className="mt-10 flex flex-col items-center"> {/* Increased mt for spacing */}
            <span className="text-sm text-muted-foreground">Body Temperature</span>
            <div className="flex items-end justify-center h-10 space-x-4 mt-1">
              <div className="flex flex-col items-center">
                <div className="h-5 w-px border-l border-dashed border-muted-foreground/50"></div>
                <span className="text-xs text-muted-foreground/70 mt-1">38.0</span>
              </div>
               <div className="flex flex-col items-center">
                <div className="h-3 w-px border-l border-dashed border-muted-foreground/50"></div>
                <span className="text-xs text-muted-foreground/70 mt-1">37.3</span>
              </div>
            </div>
          </div>

          {vitals?.batteryLevel !== undefined && (
            <p className="text-xs text-muted-foreground mt-8">Device Battery: {vitals.batteryLevel}%</p>
          )}
          {!isLoading && !vitals && (
             <p className="text-muted-foreground mt-8 text-center text-sm">Press START to measure temperature.</p>
          )}
        </div>

        <div className="w-full flex justify-center pt-6 mt-auto">
          <Button
            onClick={handleStartTest}
            disabled={isLoading}
            className="rounded-full w-24 h-24 bg-primary hover:bg-primary/90 text-primary-foreground flex flex-col items-center justify-center shadow-xl focus:ring-4 focus:ring-primary/50"
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

export default TemperaturePage;
