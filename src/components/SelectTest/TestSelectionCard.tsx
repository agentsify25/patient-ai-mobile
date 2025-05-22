
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface TestSelectionCardProps {
  name: string;
  description: string; // Keep description in props for potential future use, but won't render it
  path: string;
  icon: LucideIcon;
  iconClassName?: string;
}

export const TestSelectionCard = ({ name, description, path, icon: Icon, iconClassName }: TestSelectionCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      className="bg-card hover:bg-muted/50 transition-all cursor-pointer flex flex-col justify-between h-full items-center py-4" // Added items-center and py-4 for better vertical centering
      onClick={() => navigate(path)}
    >
      <CardHeader className="pb-2 pt-0"> {/* Adjusted padding */}
        <div className="flex justify-center mb-2"> {/* Reduced margin */}
          <Icon size={48} className={cn("text-primary", iconClassName)} />
        </div>
        <CardTitle className="text-lg text-center">{name}</CardTitle> {/* Slightly smaller title for compactness */}
      </CardHeader>
      {/* The CardContent and p tag for description have been removed */}
    </Card>
  );
};

