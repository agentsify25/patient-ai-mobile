
import { MobileLayout } from '@/components/Layout/MobileLayout';
import { HealthInsightCard } from '@/components/Health/HealthInsightCard';
import { QuickActionCard } from '@/components/Health/QuickActionCard';
import { MeasurementCard } from '@/components/Health/MeasurementCard';
import { Plus, BarChart3, Heart, Droplets, Thermometer, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  const currentTime = new Date().getHours();
  const greeting = currentTime < 12 ? 'Good morning' : currentTime < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <MobileLayout>
      <div className="space-y-6">
        {/* Greeting Header */}
        <div className="text-center py-4">
          <h1 className="text-2xl font-light text-muted-foreground mb-2">{greeting},</h1>
          <h2 className="text-3xl font-bold">Alex</h2>
        </div>

        {/* Health Insights Card */}
        <HealthInsightCard
          title="Health Insights"
          description="Unable to generate health insights at this time. Please try again later."
          isAvailable={false}
        />

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <QuickActionCard
              title="New Reading"
              icon={Plus}
              gradient="gradient-health"
              onClick={() => navigate('/health')}
            />
            <QuickActionCard
              title="View Trends"
              icon={BarChart3}
              gradient="gradient-success"
              onClick={() => navigate('/health')}
            />
          </div>
        </div>

        {/* Recent Measurements */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Measurements</h3>
            <button 
              className="text-primary text-sm hover:underline"
              onClick={() => navigate('/health')}
            >
              See All
            </button>
          </div>
          
          <div className="space-y-3">
            <MeasurementCard
              title="Blood Pressure"
              value="121/77"
              unit="mmHg"
              status="elevated"
              icon={<Heart size={20} />}
              timestamp="2 hours ago"
            />
            <MeasurementCard
              title="Heart Rate"
              value="72"
              unit="BPM"
              status="normal"
              icon={<Activity size={20} />}
              timestamp="2 hours ago"
            />
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Index;
