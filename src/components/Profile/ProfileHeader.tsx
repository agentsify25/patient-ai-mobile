
import React from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
// import { Camera } from 'lucide-react'; // Camera button was commented out
// import { Button } from '@/components/ui/button'; // For camera button

interface ProfileHeaderProps {
  avatarUrl?: string;
  firstName?: string;
  lastName?: string;
  patientId?: string;
}

export const ProfileHeader = ({ avatarUrl, firstName, lastName, patientId }: ProfileHeaderProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar className="w-20 h-20">
            <AvatarImage src={avatarUrl || undefined} alt={firstName} />
            <AvatarFallback className="bg-primary/20 text-primary text-3xl">
              {firstName?.[0]?.toUpperCase()}
              {lastName?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {/* Camera button for avatar upload - implement later */}
          {/* <Button size="sm" className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full p-0"><Camera size={16} /></Button> */}
        </div>
        
        <div className="flex-1">
          <h2 className="text-xl font-bold">{firstName} {lastName}</h2>
          <p className="text-muted-foreground">Patient ID: {patientId || 'N/A'}</p>
          <Badge className="mt-2 bg-green-500/20 text-green-400 border-green-500/30">
            Verified Patient
          </Badge>
        </div>
      </div>
    </Card>
  );
};

