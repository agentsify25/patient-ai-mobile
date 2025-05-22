
import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface QuickActionCardProps {
  title: string;
  icon: LucideIcon;
  gradient: string;
  onClick: () => void;
}

export const QuickActionCard = ({ title, icon: Icon, gradient, onClick }: QuickActionCardProps) => {
  return (
    <Card 
      className={`p-6 ${gradient} relative overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200 border-0`}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
      <div className="relative z-10 text-center">
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
          <Icon className="text-white" size={32} />
        </div>
        <h3 className="text-white font-semibold text-lg">{title}</h3>
      </div>
    </Card>
  );
};
