
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface VitalCardProps {
  title: string;
  value: string;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  trend?: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
  gradient: string;
}

export const VitalCard = ({ title, value, unit, status, trend, icon, gradient }: VitalCardProps) => {
  const statusColors = {
    normal: 'bg-green-500/20 text-green-400 border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    critical: 'bg-red-500/20 text-red-400 border-red-500/30'
  };

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  return (
    <Card className={`p-4 border-0 ${gradient} relative overflow-hidden group hover:scale-105 transition-transform duration-200`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="text-white/80 text-sm font-medium">{title}</div>
          <div className="text-white/60">{icon}</div>
        </div>
        
        <div className="flex items-baseline gap-1 mb-3">
          <span className="text-2xl font-bold text-white">{value}</span>
          <span className="text-white/70 text-sm">{unit}</span>
        </div>

        <div className="flex items-center justify-between">
          <Badge className={statusColors[status]}>
            {status.toUpperCase()}
          </Badge>
          
          {trend && (
            <div className="flex items-center gap-1 text-white/70">
              <TrendIcon size={16} />
              <span className="text-sm capitalize">{trend}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
