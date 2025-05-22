import { MobileLayout } from '@/components/Layout/MobileLayout';
import { VitalCard } from '@/components/Health/VitalCard';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// import { vitalsData } from '@/data/healthVitals'; // Will be replaced by dynamic data
import { toast } from "@/hooks/use-toast"; // This is the shadcn toast, not sonner
import { PlusCircle, LineChart, Smartphone, BookPlus, Heart, Activity, Droplets, Thermometer, Wind, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { VitalSignsFormData } from '@/lib/schemas'; // For type reference, though we get a full record
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface VitalReadingFromDB extends VitalSignsFormData {
  id: string;
  profile_id: string;
  timestamp: string;
  created_at: string;
  ecg_data_url?: string | null;
}

const fetchLatestVitals = async (userId: string | undefined): Promise<VitalReadingFromDB | null> => {
  if (!userId) return null;

  const { data, error } = await supabase
    .from('vital_readings')
    .select('*')
    .eq('profile_id', userId)
    .order('timestamp', { ascending: false })
    .limit(1)
    .single(); // Fetches the single latest record

  if (error && error.code !== 'PGRST116') { // PGRST116: " exactement une ligne (ou aucune) ..." (single row expected, 0 returned is not an error for .single())
    console.error('Error fetching latest vitals:', error);
    throw new Error(error.message);
  }
  return data as VitalReadingFromDB | null;
};

const Health = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: latestVitals, isLoading, error } = useQuery<VitalReadingFromDB | null, Error>({
    queryKey: ['latestVitals', user?.id],
    queryFn: () => fetchLatestVitals(user?.id),
    enabled: !!user?.id,
  });

  const handleLogSymptom = () => {
    // Using shadcn toast as per its import
    toast({
      title: "Symptom Logged",
      description: "Your symptom has been noted. (Placeholder)",
    });
  };

  const transformVitalsForDisplay = (vitals: VitalReadingFromDB) => {
    const lastUpdated = formatDistanceToNow(new Date(vitals.timestamp), { addSuffix: true });
    const displayedVitals = [];

    if (vitals.blood_pressure_systolic !== undefined && vitals.blood_pressure_diastolic !== undefined) {
      displayedVitals.push({
        title: 'Blood Pressure',
        value: `${vitals.blood_pressure_systolic}/${vitals.blood_pressure_diastolic}`,
        unit: 'mmHg',
        trend: 'stable' as const,
        icon: Heart,
        lastUpdated,
      });
    }
    if (vitals.heart_rate !== undefined) {
      displayedVitals.push({
        title: 'Heart Rate',
        value: String(vitals.heart_rate),
        unit: 'bpm',
        trend: 'stable' as const,
        icon: Activity,
        lastUpdated,
      });
    }
    if (vitals.spo2 !== undefined) {
      displayedVitals.push({
        title: 'Oxygen Sat.',
        value: String(vitals.spo2),
        unit: '%',
        trend: 'stable' as const,
        icon: Droplets, // Using Droplets for SpO2
        lastUpdated,
      });
    }
    if (vitals.temperature_celsius !== undefined) {
      displayedVitals.push({
        title: 'Temperature',
        value: String(vitals.temperature_celsius),
        unit: '°C',
        trend: 'stable' as const,
        icon: Thermometer,
        lastUpdated,
      });
    }
    if (vitals.respiratory_rate !== undefined) {
      displayedVitals.push({
        title: 'Resp. Rate',
        value: String(vitals.respiratory_rate),
        unit: 'br/min',
        trend: 'stable' as const,
        icon: Wind, // Using Wind for Respiratory Rate
        lastUpdated,
      });
    }
    return displayedVitals;
  };

  const displayedVitalsData = latestVitals ? transformVitalsForDisplay(latestVitals) : [];

  return (
    <MobileLayout>
      <h1 className="text-2xl font-semibold mb-6 text-center">Health Dashboard</h1>
      <div className="space-y-6">
        {/* Overview Stats */}
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
          <div className="text-center">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Health Score</h3>
            <div className="text-4xl font-bold text-primary mb-2">95</div>
            <p className="text-sm text-muted-foreground">
              Excellent overall health status (Placeholder)
            </p>
          </div>
        </Card>

        {/* Vital Signs Grid */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Current Vitals</h3>
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          {error && <p className="text-red-500">Error loading vitals: {error.message}</p>}
          {!isLoading && !error && displayedVitalsData.length === 0 && (
            <p className="text-muted-foreground text-center py-4">No vital signs logged yet. Log your first reading!</p>
          )}
          {!isLoading && !error && displayedVitalsData.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {displayedVitalsData.map((vital, index) => (
                <VitalCard key={index} {...vital} />
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <Button 
            className="w-full flex items-center justify-center gap-2" 
            size="lg"
            onClick={() => navigate('/log-vitals')}
          >
            <PlusCircle size={20} />
            Take New Reading
          </Button>
          <Button variant="outline" className="w-full flex items-center justify-center gap-2" size="lg" onClick={handleLogSymptom}>
            <BookPlus size={20} />
            Log Symptom
          </Button>
          <Button variant="outline" className="w-full flex items-center justify-center gap-2" size="lg" onClick={() => toast({title: "Coming Soon!", description: "Detailed charts will be available in a future update."})}>
            <LineChart size={20} />
            View Detailed Charts
          </Button>
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2" 
            size="lg" 
            onClick={() => navigate('/select-test')} // Updated onClick
          >
            <Smartphone size={20} />
            Connect Device & Test
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Health;
