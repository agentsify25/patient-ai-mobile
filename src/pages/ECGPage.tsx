
import { useState } from 'react';
import { MobileLayout } from '@/components/Layout/MobileLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { connectToLinktop, LinktopVitalsData } from '@/services/linktopBLEService';
import { Activity, Loader2, PlayCircle } from 'lucide-react'; // Using Activity for ECG
import { toast } from 'sonner';

const ECGPage = () => {
  const [vitals, setVitals] = useState<LinktopVitalsData | null>(null); // To show battery or other general info
  const [isLoading, setIsLoading] = useState(false);

  const handleStartTest = async () => {
    setIsLoading(true);
    setVitals(null);
    toast.info('Attempting to read data. ECG data parsing/streaming is not yet fully implemented.');
    try {
      const data = await connectToLinktop(); // Fetches general vitals
      if (data) {
        setVitals(data);
        toast.success('Device reading attempt complete. Displaying available info.');
      }
    } catch (error: any) {
      toast.error('Failed to connect or read data.', { description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MobileLayout title="ECG">
      <div className="space-y-6">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Electrocardiogram (ECG)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Connecting to device...</p>
              </div>
            )}
            {!isLoading && (
              <div className="p-6 min-h-[200px] flex flex-col items-center justify-center bg-gray-800/50 rounded-md">
                <Activity size={64} className="text-green-400 mb-4" />
                <p className="text-xl font-semibold text-gray-300">ECG Graph Placeholder</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Live ECG streaming requires further implementation.
                  {vitals?.batteryLevel !== undefined && ` Device Battery: ${vitals.batteryLevel}%`}
                </p>
              </div>
            )}
             {!isLoading && !vitals && (
              <p className="text-muted-foreground py-8">Press "Start Test" to attempt an ECG reading.</p>
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

export default ECGPage;
