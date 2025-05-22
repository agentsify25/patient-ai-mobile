
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const EmergencyInformation = () => {
  return (
    <Card className="p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/20">
      <h3 className="font-semibold text-red-400 mb-2">Emergency Information</h3>
      <p className="text-sm text-muted-foreground mb-3">
        In case of emergency, this information will be shared with first responders.
      </p>
      <Button variant="outline" size="sm" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
        Update Emergency Info
      </Button>
    </Card>
  );
};

