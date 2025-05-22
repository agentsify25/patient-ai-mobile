
import { useState } from 'react';
import { MobileLayout } from '@/components/Layout/MobileLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { connectToLinktop, LinktopVitalsData } from '@/services/linktopBLEService';
import { Heart, Loader2, PlayCircle } from 'lucide-react';
import { toast } from 'sonner';

const HeartRatePage = () => {
  const [vitals, setVitals] = useState<LinktopVitalsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartTest = async () => {
    setIsLoading(true);
    setVitals(null);
    try {
      // connectToLinktop typically reads multiple vitals including HR
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
    <MobileLayout title="Heart Rate">
      <div className="space-y-6">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Heart Rate (BPM)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Connecting to device and reading data...</p>
              </div>
            )}
            {!isLoading && vitals && (
              <div className="p-6">
                <div className="flex items-center justify-center text-pink-500 mb-2">
                  <Heart size={48} />
                </div>
                <p className="text-sm text-muted-foreground">Heart Rate</p>
                <p className="text-5xl font-bold">
                  {vitals.heartRate !== undefined ? `${vitals.heartRate} bpm` : 'N/A'}
                </p>
                {vitals.batteryLevel !== undefined && (
                  <p className="text-sm text-muted-foreground mt-2">Device Battery: {vitals.batteryLevel}%</p>
                )}
              </div>
            )}
             {!isLoading && !vitals && (
              <p className="text-muted-foreground py-8">Press "Start Test" to measure your heart rate.</p>
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

export default HeartRatePage;
