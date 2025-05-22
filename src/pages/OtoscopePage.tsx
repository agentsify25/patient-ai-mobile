
import { useState } from 'react';
import { MobileLayout } from '@/components/Layout/MobileLayout';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { CircularProgressDisplay } from '@/components/Dashboard/CircularProgressDisplay';
import { DefaultPageHeaderElements } from '@/components/Layout/DefaultPageHeaderElements';

const OtoscopePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { headerLeft, headerRight } = DefaultPageHeaderElements();

  const handleStartTest = async () => {
    setIsLoading(true);
    toast.info('Otoscope feature is not yet implemented.');
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate an action
    setIsLoading(false);
  };

  return (
    <MobileLayout headerLeft={headerLeft} headerRight={headerRight}>
      <h1 className="text-2xl font-semibold mb-6 text-center">Otoscope</h1>
      <div className="flex flex-col items-center justify-between p-4 min-h-[calc(100vh-3.5rem-5rem-2rem-3rem-3rem)]">
        <div className="flex-grow flex flex-col items-center justify-center w-full">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-16 w-16 animate-spin text-primary mb-6" />
              <p className="text-muted-foreground text-lg">Processing...</p>
            </div>
          )}

          {!isLoading && (
             <CircularProgressDisplay
              value={null} // No actual value
              maxValue={100} // Placeholder max value
              unit="" // No unit
              label="Otoscope Examination"
              color="#008080" // Teal color for placeholder
              valueFontSize="text-4xl"
              size={200} // Adjusted size
              isLoading={true} // Shows as "waiting"
            />
          )}
          
          {!isLoading && (
             <p className="text-muted-foreground mt-8 text-center text-sm">Press START to use the otoscope. (Feature upcoming)</p>
          )}
        </div>

        <div className="w-full flex justify-center pt-6 mt-auto">
          <Button
            onClick={handleStartTest}
            disabled={isLoading}
            className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 text-primary-foreground flex flex-col items-center justify-center shadow-xl focus:ring-4 focus:ring-primary/50 text-xs p-1"
            aria-label="Start Otoscope Test"
          >
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <span className="font-bold tracking-wider">START</span>
            )}
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default OtoscopePage;
