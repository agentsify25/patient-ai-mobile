
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface TestSelectionCardProps {
  name: string;
  description: string;
  path: string;
  icon: LucideIcon;
  iconClassName?: string;
}

export const TestSelectionCard = ({ name, description, path, icon: Icon, iconClassName }: TestSelectionCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      className="bg-card hover:bg-muted/50 transition-all cursor-pointer flex flex-col justify-between h-full"
      onClick={() => navigate(path)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-center mb-3">
          <Icon size={48} className={cn("text-primary", iconClassName)} />
        </div>
        <CardTitle className="text-xl text-center">{name}</CardTitle>
      </CardHeader>
      <CardContent className="text-center flex-grow">
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};
