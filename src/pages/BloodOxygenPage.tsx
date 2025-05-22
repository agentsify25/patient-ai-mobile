
import { useState } from 'react';
import { MobileLayout } from '@/components/Layout/MobileLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { connectToLinktop, LinktopVitalsData } from '@/services/linktopBLEService';
import { Droplets, Heart, Loader2, PlayCircle } from 'lucide-react';
import { toast } from 'sonner';

const BloodOxygenPage = () => {
  const [vitals, setVitals] = useState<LinktopVitalsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartTest = async () => {
    setIsLoading(true);
    setVitals(null);
    try {
      const data = await connectToLinktop();
      if (data) {
        setVitals(data);
        toast.success('Blood Oxygen reading complete.');
      } else {
        // toast for null data is handled in connectToLinktop
      }
    } catch (error: any) {
      toast.error('Failed to connect or read data.', { description: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MobileLayout title="Blood Oxygen">
      <div className="space-y-6">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Blood Oxygen & Heart Rate</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Connecting to device and reading data...</p>
              </div>
            )}
            {!isLoading && vitals && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-6">
                  <div className="flex items-center justify-center text-primary mb-2">
                    <Droplets size={32} />
                  </div>
                  <p className="text-sm text-muted-foreground">Blood Oxygen (SpO2)</p>
                  <p className="text-4xl font-bold">
                    {vitals.spo2 !== undefined ? `${vitals.spo2}%` : 'N/A'}
                  </p>
                </Card>
                <Card className="p-6">
                  <div className="flex items-center justify-center text-pink-500 mb-2">
                    <Heart size={32} />
                  </div>
                  <p className="text-sm text-muted-foreground">Heart Rate</p>
                  <p className="text-4xl font-bold">
                    {vitals.heartRate !== undefined ? `${vitals.heartRate} bpm` : 'N/A'}
                  </p>
                </Card>
                 {vitals.batteryLevel !== undefined && (
                  <p className="text-sm text-muted-foreground col-span-1 md:col-span-2">Device Battery: {vitals.batteryLevel}%</p>
                )}
              </div>
            )}
            {!isLoading && !vitals && (
              <p className="text-muted-foreground py-8">Press "Start Test" to measure your blood oxygen and heart rate.</p>
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

export default BloodOxygenPage;
