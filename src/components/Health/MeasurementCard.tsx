
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MeasurementCardProps {
  title: string;
  value: string;
  unit: string;
  status: 'normal' | 'elevated' | 'critical';
  icon: React.ReactNode;
  timestamp?: string;
}

export const MeasurementCard = ({ title, value, unit, status, icon, timestamp }: MeasurementCardProps) => {
  const statusColors = {
    normal: 'bg-green-500/20 text-green-400 border-green-500/30',
    elevated: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    critical: 'bg-red-500/20 text-red-400 border-red-500/30'
  };

  return (
    <Card className="p-4 bg-card/50 backdrop-blur border-border/50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="text-primary">{icon}</div>
          <span className="font-medium">{title}</span>
        </div>
        <Badge className={statusColors[status]}>
          {status.toUpperCase()}
        </Badge>
      </div>
      
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-2xl font-bold">{value}</span>
        <span className="text-muted-foreground">{unit}</span>
      </div>
      
      {timestamp && (
        <div className="text-xs text-muted-foreground">
          Last updated: {timestamp}
        </div>
      )}
    </Card>
  );
};
