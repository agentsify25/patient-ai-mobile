
import { useState } from 'react';
import { MobileLayout } from '@/components/Layout/MobileLayout';
import { Button } from '@/components/ui/button';
import { connectToLinktop, LinktopVitalsData } from '@/services/linktopBLEService';
import { Loader2, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { BloodPressureDisplay } from '@/components/Dashboard/BloodPressureDisplay';

const BloodPressurePage = () => {
  const [vitals, setVitals] = useState<LinktopVitalsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartTest = async () => {
    setIsLoading(true);
    setVitals(null);
    // Inform user that BP data might not be available if parsing is not implemented in service
    toast.info('Attempting to read data. Blood Pressure data parsing might not be fully implemented in the BLE service.');
    try {
      const data = await connectToLinktop(); 
      if (data) {
        setVitals(data);
        if (data.bloodPressure?.systolic !== undefined && data.bloodPressure?.diastolic !== undefined) {
            toast.success('Blood Pressure reading attempt complete.');
        } else {
            toast.info('Blood Pressure data (Systolic/Diastolic) not available from this reading.');
        }
      }
    } catch (error: any) {
      toast.error('Failed to connect or read data.', { description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const systolic = vitals?.bloodPressure?.systolic;
  const diastolic = vitals?.bloodPressure?.diastolic;

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
            systolic={systolic} 
            diastolic={diastolic}
            unit="mmHg"
            color="#FFB800"
            isLoading={isLoading && !vitals}
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
           {vitals && (systolic === undefined || diastolic === undefined) && !isLoading && (
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
