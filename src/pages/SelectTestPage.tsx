import { MobileLayout } from '@/components/Layout/MobileLayout';
import { TestSelectionCard } from '@/components/SelectTest/TestSelectionCard';
import { Droplets, HeartPulse, Thermometer, Activity, List, Heart, Pipette } from 'lucide-react'; // Added Heart, Pipette
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DefaultPageHeaderElements } from '@/components/Layout/DefaultPageHeaderElements';

const tests = [
  { name: 'Blood Oxygen', path: '/blood-oxygen', description: 'Measure SpO2 Levels', icon: Droplets, iconClassName: "text-sky-500" },
  { name: 'Blood Pressure', path: '/blood-pressure', description: 'Systolic & Diastolic', icon: HeartPulse, iconClassName: "text-red-500" },
  { name: 'Temperature', path: '/temperature', description: 'Measure Body Temperature', icon: Thermometer, iconClassName: "text-blue-500" },
  { name: 'ECG', path: '/ecg', description: 'Record Electrocardiogram', icon: Activity, iconClassName: "text-green-500" },
  { name: 'Heart Rate', path: '/heart-rate', description: 'Measure Beats Per Minute', icon: Heart, iconClassName: "text-pink-500" },
  { name: 'Blood Glucose', path: '/blood-glucose', description: 'Measure Blood Sugar Levels', icon: Pipette, iconClassName: "text-purple-500" },
];

const SelectTestPage = () => {
  const { headerLeft, headerRight } = DefaultPageHeaderElements();
  return (
    <MobileLayout headerLeft={headerLeft} headerRight={headerRight}>
      <h1 className="text-2xl font-semibold mb-6 text-center">Select Test</h1>
      <div className="space-y-6">
        <Card className="bg-background/70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <List size={28} className="text-primary" />
              Available Tests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Choose a test to perform using your connected health device.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {tests.map((test) => (
                <TestSelectionCard
                  key={test.name}
                  name={test.name}
                  description={test.description}
                  path={test.path}
                  icon={test.icon}
                  iconClassName={test.iconClassName}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default SelectTestPage;
