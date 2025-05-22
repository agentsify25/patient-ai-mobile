
import { MobileLayout } from '@/components/Layout/MobileLayout';
import { VitalCard } from '@/components/Health/VitalCard';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { vitalsData } from '@/data/healthVitals';
import { toast } from "@/hooks/use-toast";
import { PlusCircle, LineChart, Smartphone, BookPlus } from 'lucide-react';

const Health = () => {
  const handleLogSymptom = () => {
    toast({
      title: "Symptom Logged",
      description: "Your symptom has been noted. (Placeholder)",
    });
  };

  return (
    <MobileLayout title="Health Dashboard">
      <div className="space-y-6">
        {/* Overview Stats */}
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
          <div className="text-center">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Health Score</h3>
            <div className="text-4xl font-bold text-primary mb-2">95</div>
            <p className="text-sm text-muted-foreground">
              Excellent overall health status
            </p>
          </div>
        </Card>

        {/* Vital Signs Grid */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Current Vitals</h3>
          <div className="grid grid-cols-2 gap-4">
            {vitalsData.map((vital, index) => (
              <VitalCard key={index} {...vital} />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <Button className="w-full flex items-center justify-center gap-2" size="lg">
            <PlusCircle size={20} />
            Take New Reading
          </Button>
          <Button variant="outline" className="w-full flex items-center justify-center gap-2" size="lg" onClick={handleLogSymptom}>
            <BookPlus size={20} />
            Log Symptom
          </Button>
          <Button variant="outline" className="w-full flex items-center justify-center gap-2" size="lg">
            <LineChart size={20} />
            View Detailed Charts
          </Button>
          <Button variant="outline" className="w-full flex items-center justify-center gap-2" size="lg">
            <Smartphone size={20} />
            Connect Device
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Health;
