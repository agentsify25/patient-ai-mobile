
import React from 'react';
import { Card } from '@/components/ui/card';
import { Mail, Phone, Calendar, MapPin } from 'lucide-react';

interface ContactInformationProps {
  email?: string;
}

export const ContactInformation = ({ email }: ContactInformationProps) => {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Contact Information</h3>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Mail className="text-muted-foreground" size={16} />
          <span className="text-sm">{email || 'N/A'}</span>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="text-muted-foreground" size={16} />
          <span className="text-sm">+1 (555) 123-4567 (Placeholder)</span>
        </div>
        <div className="flex items-center gap-3">
          <Calendar className="text-muted-foreground" size={16} />
          <span className="text-sm">Born: March 15, 1985 (Placeholder)</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="text-muted-foreground" size={16} />
          <span className="text-sm">New York, NY (Placeholder)</span>
        </div>
      </div>
    </Card>
  );
};

