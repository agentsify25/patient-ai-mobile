
import { useState } from 'react';
import { MobileLayout } from '@/components/Layout/MobileLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { connectToLinktop, LinktopVitalsData } from '@/services/linktopBLEService';
import { HeartPulse, Loader2, PlayCircle } from 'lucide-react'; // Using HeartPulse for BP
import { toast } from 'sonner';

const BloodPressurePage = () => {
  const [vitals, setVitals] = useState<LinktopVitalsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartTest = async () => {
    setIsLoading(true);
    setVitals(null);
    toast.info('Attempting to read data. Blood Pressure data parsing is not yet fully implemented in the service.');
    try {
      const data = await connectToLinktop(); // This will fetch all available vitals
      if (data) {
        setVitals(data);
        // Specific toast if BP data was expected but not found.
        // For now, the service does not explicitly parse BP.
        toast.success('Device reading attempt complete. Displaying available data.');
      }
    } catch (error: any) {
      toast.error('Failed to connect or read data.', { description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MobileLayout title="Blood Pressure">
      <div className="space-y-6">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Blood Pressure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Connecting to device...</p>
              </div>
            )}
            {!isLoading && (
              <div className="p-6 min-h-[150px] flex flex-col items-center justify-center">
                <HeartPulse size={48} className="text-primary mb-4" />
                <p className="text-2xl font-bold">-- / -- mmHg</p>
                <p className="text-muted-foreground mt-2">
                  Blood pressure reading is a placeholder.
                  {vitals?.batteryLevel !== undefined && ` Device Battery: ${vitals.batteryLevel}%`}
                </p>
              </div>
            )}
            {!isLoading && !vitals && !isLoading && (
              <p className="text-muted-foreground py-8">Press "Start Test" to attempt a reading.</p>
            )}
            <Button onClick={handleStartTest} disabled={isLoading} size="lg" className="w-full">
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <PlayCircle className="mr-2 h-5 w-5" />}
              {isLoading ? 'Testing...' : 'Start Test'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default BloodPressurePage;
