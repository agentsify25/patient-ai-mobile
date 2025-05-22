
import { MobileLayout } from '@/components/Layout/MobileLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const tests = [
  { name: 'Blood Oxygen', path: '/blood-oxygen', description: 'Measure SpO2 and Heart Rate' },
  { name: 'Blood Pressure', path: '/blood-pressure', description: 'Measure Systolic & Diastolic Pressure (Placeholder)' },
  { name: 'Body Temperature', path: '/temperature', description: 'Measure Body Temperature' },
  { name: 'ECG', path: '/ecg', description: 'Record Electrocardiogram (Placeholder)' },
];

const SelectTestPage = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout title="Select Device Test">
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <List size={24} className="text-primary" />
              Available Device Tests
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground">
              Select a test to perform using your connected Linktop device.
            </p>
            {tests.map((test) => (
              <Button
                key={test.name}
                variant="outline"
                className="w-full justify-start h-auto py-3"
                onClick={() => navigate(test.path)}
              >
                <div className="text-left">
                  <p className="font-semibold">{test.name}</p>
                  <p className="text-sm text-muted-foreground">{test.description}</p>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default SelectTestPage;
