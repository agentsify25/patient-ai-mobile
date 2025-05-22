
import { useState } from 'react';
import { MobileLayout } from '@/components/Layout/MobileLayout';
import { Button } from '@/components/ui/button';
import { connectToLinktop, LinktopVitalsData } from '@/services/linktopBLEService';
import { Loader2, Heart } from 'lucide-react'; // Heart for potential secondary HR display
import { toast } from 'sonner';
import { BloodPressureDisplay } from '@/components/Dashboard/BloodPressureDisplay';

const BloodPressurePage = () => {
  const [vitals, setVitals] = useState<LinktopVitalsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartTest = async () => {
    setIsLoading(true);
    setVitals(null);
    toast.info('Attempting to read data. Blood Pressure data parsing is not yet fully implemented in the service.');
    try {
      const data = await connectToLinktop(); 
      if (data) {
        setVitals(data);
        toast.success('Device reading attempt complete. Displaying available data.');
      }
    } catch (error: any) {
      toast.error('Failed to connect or read data.', { description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  // Placeholder parsing for BP if it were available in vitals.systolic/vitals.diastolic
  // For now, it will show '-- / --' as these fields are not in LinktopVitalsData directly
  const systolic = vitals?.bloodPressure?.systolic; // Assuming structure like { bloodPressure: { systolic: X, diastolic: Y } }
  const diastolic = vitals?.bloodPressure?.diastolic; // This is a hypothetical structure

  return (
    <MobileLayout title="Blood Pressure">
      <div className="flex flex-col items-center justify-between p-4 min-h-[calc(100vh-3.5rem-5rem-2rem)]">
        <div className="flex-grow flex flex-col items-center justify-center w-full">
          {isLoading && !vitals && (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-16 w-16 animate-spin text-primary mb-6" />
              <p className="text-muted-foreground text-lg">Connecting to device...</p>
            </div>
          )}
          
          <BloodPressureDisplay
            // Currently, LinktopVitalsData does not have distinct systolic/diastolic fields.
            // These will show as '--' until the service provides them or the type is updated.
            systolic={systolic} 
            diastolic={diastolic}
            unit="mmHg"
            color="#FFB800" // A slightly richer yellow/gold
            isLoading={isLoading && !vitals} // Show '--' if loading and no old data
          />
          
          {vitals?.heartRate !== undefined && (
             <div className="mt-8 text-center">
              <Heart size={28} className="inline-block mr-2 text-pink-500" />
              <span className="text-3xl font-semibold">{vitals.heartRate}</span>
              <span className="text-muted-foreground ml-1">BPM</span>
            </div>
          )}
          {vitals?.batteryLevel !== undefined && (
            <p className="text-sm text-muted-foreground mt-4">Device Battery: {vitals.batteryLevel}%</p>
          )}
           {!isLoading && !vitals && (
             <p className="text-muted-foreground mt-8 text-center">Press START to measure blood pressure.</p>
          )}
           {vitals && !systolic && !diastolic && !isLoading && (
            <p className="text-muted-foreground mt-4 text-center text-xs">
              Blood pressure data (Systolic/Diastolic) not available from this reading.
            </p>
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

export default BloodPressurePage;
