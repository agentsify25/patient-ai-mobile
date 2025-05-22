import { useState } from 'react';
import { MobileLayout } from '@/components/Layout/MobileLayout';
import { Button } from '@/components/ui/button';
import { connectToLinktop, LinktopVitalsData } from '@/services/linktopBLEService';
import { Loader2, Heart, Droplet } from 'lucide-react'; 
import { toast } from 'sonner';
import { DefaultPageHeaderElements } from '@/components/Layout/DefaultPageHeaderElements';

const BloodPressurePage = () => {
  const [vitals, setVitals] = useState<LinktopVitalsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { headerLeft, headerRight } = DefaultPageHeaderElements();

  const handleStartTest = async () => {
    setIsLoading(true);
    setVitals(null);
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

  const systolic = isLoading && !vitals ? '--' : (vitals?.bloodPressure?.systolic ?? '0');
  const diastolic = isLoading && !vitals ? '--' : (vitals?.bloodPressure?.diastolic ?? '0');

  return (
    <MobileLayout headerLeft={headerLeft} headerRight={headerRight}>
      <h1 className="text-2xl font-semibold mb-6 text-center">Blood Pressure</h1>
      <div className="flex flex-col items-center justify-between p-4 min-h-[calc(100vh-3.5rem-5rem-2rem-3rem-3rem)]">
        <div className="flex-grow flex flex-col items-center justify-center w-full">
          {isLoading && !vitals && (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-16 w-16 animate-spin text-primary mb-6" />
              <p className="text-muted-foreground text-lg">Connecting to device...</p>
            </div>
          )}
          
          <div className="relative flex flex-col items-center justify-center w-[220px] h-[220px]">
            <div className="absolute inset-0 rounded-full border-[16px] border-yellow-400 opacity-30"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-6xl font-bold text-foreground">{systolic}</span>
                <Droplet size={24} className="text-muted-foreground fill-muted-foreground/50" />
                <span className="text-6xl font-bold text-foreground">{diastolic}</span>
              </div>
              <div className="flex items-center space-x-1 mt-1 text-xs text-muted-foreground">
                <span>Systolic pressure</span>
                <span>Diastolic pressure</span>
              </div>
              <span className="mt-1 text-lg text-muted-foreground">mmHg</span>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <span className="text-4xl font-semibold">
              {isLoading && !vitals ? '0' : (vitals?.heartRate ?? '0')}
            </span>
            <Heart size={24} className="inline-block ml-1 mb-1 text-muted-foreground" />
            <span className="text-muted-foreground ml-1">BPM</span>
          </div>

          <div className="mt-6 flex flex-col items-center">
            <div className="grid grid-cols-2 gap-x-8 text-center">
                 <div>
                    <span className="text-xs text-muted-foreground block">Systolic pressure</span>
                     <div className="flex items-end justify-center h-10 space-x-2 mt-1">
                        <div className="flex flex-col items-center"><div className="h-3 w-px border-l border-dashed border-muted-foreground/50"></div><span className="text-xs text-muted-foreground/70 mt-1">90</span></div>
                        <div className="flex flex-col items-center"><div className="h-5 w-px border-l border-dashed border-muted-foreground/50"></div><span className="text-xs text-muted-foreground/70 mt-1">140</span></div>
                    </div>
                 </div>
                 <div>
                    <span className="text-xs text-muted-foreground block">Diastolic pressure</span>
                     <div className="flex items-end justify-center h-10 space-x-2 mt-1">
                        <div className="flex flex-col items-center"><div className="h-3 w-px border-l border-dashed border-muted-foreground/50"></div><span className="text-xs text-muted-foreground/70 mt-1">60</span></div>
                        <div className="flex flex-col items-center"><div className="h-5 w-px border-l border-dashed border-muted-foreground/50"></div><span className="text-xs text-muted-foreground/70 mt-1">90</span></div>
                    </div>
                 </div>
            </div>
          </div>

          {vitals?.batteryLevel !== undefined && (
            <p className="text-xs text-muted-foreground mt-4">Device Battery: {vitals.batteryLevel}%</p>
          )}
           {!isLoading && !vitals && (
             <p className="text-muted-foreground mt-8 text-center text-sm">Press START to measure blood pressure.</p>
          )}
           {vitals && (systolic === '0' || diastolic === '0') && !isLoading && systolic !== '--' && (
            <p className="text-muted-foreground mt-4 text-center text-xs">
              Blood pressure data not available or zero.
            </p>
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

export default BloodPressurePage;
