
import React from 'react';
import { Card } from '@/components/ui/card';

export const HealthSummary = () => {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Health Summary</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">95</div>
          <div className="text-sm text-muted-foreground">Health Score</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">12</div>
          <div className="text-sm text-muted-foreground">Days Active</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">8</div>
          <div className="text-sm text-muted-foreground">Medications</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400">3</div>
          <div className="text-sm text-muted-foreground">Care Team</div>
        </div>
      </div>
    </Card>
  );
};

