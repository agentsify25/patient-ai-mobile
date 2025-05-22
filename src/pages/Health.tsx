
import { MobileLayout } from '@/components/Layout/MobileLayout';
import { VitalCard } from '@/components/Health/VitalCard';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Activity, Thermometer, Droplets, Zap, Gauge } from 'lucide-react';

const Health = () => {
  const vitals = [
    {
      title: 'Blood Pressure',
      value: '121/77',
      unit: 'mmHg',
      status: 'warning' as const,
      trend: 'up' as const,
      icon: <Heart size={20} />,
      gradient: 'gradient-warning'
    },
    {
      title: 'Heart Rate',
      value: '72',
      unit: 'BPM',
      status: 'normal' as const,
      trend: 'stable' as const,
      icon: <Activity size={20} />,
      gradient: 'gradient-success'
    },
    {
      title: 'SpO2',
      value: '98',
      unit: '%',
      status: 'normal' as const,
      trend: 'stable' as const,
      icon: <Droplets size={20} />,
      gradient: 'gradient-health'
    },
    {
      title: 'Temperature',
      value: '98.6',
      unit: '°F',
      status: 'normal' as const,
      trend: 'stable' as const,
      icon: <Thermometer size={20} />,
      gradient: 'gradient-success'
    },
    {
      title: 'Glucose',
      value: '95',
      unit: 'mg/dL',
      status: 'normal' as const,
      trend: 'down' as const,
      icon: <Zap size={20} />,
      gradient: 'gradient-health'
    },
    {
      title: 'Weight',
      value: '72.5',
      unit: 'kg',
      status: 'normal' as const,
      trend: 'down' as const,
      icon: <Gauge size={20} />,
      gradient: 'gradient-success'
    }
  ];

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
            {vitals.map((vital, index) => (
              <VitalCard key={index} {...vital} />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <Button className="w-full" size="lg">
            Take New Reading
          </Button>
          <Button variant="outline" className="w-full" size="lg">
            View Detailed Charts
          </Button>
          <Button variant="outline" className="w-full" size="lg">
            Connect Device
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Health;
