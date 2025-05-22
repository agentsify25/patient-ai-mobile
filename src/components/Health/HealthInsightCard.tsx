
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';

interface HealthInsightCardProps {
  title: string;
  description: string;
  isAvailable: boolean;
}

export const HealthInsightCard = ({ title, description, isAvailable }: HealthInsightCardProps) => {
  return (
    <Card className="p-6 gradient-health relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <Lightbulb className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">{title}</h3>
          </div>
        </div>
        
        <p className="text-white/80 mb-6 leading-relaxed">
          {isAvailable ? description : "Unable to generate health insights at this time. Please try again later."}
        </p>
        
        <Button 
          variant="outline" 
          className="w-full bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur"
          disabled={!isAvailable}
        >
          View Full Insights
        </Button>
      </div>
    </Card>
  );
};
