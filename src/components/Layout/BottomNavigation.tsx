import { Home, Activity, Calendar, Settings, LineChart, History } from 'lucide-react'; // Added LineChart, History
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const navigationItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Activity, label: 'Health', path: '/health' },
  // { icon: ClipboardPlus, label: 'Log Vitals', path: '/log-vitals' }, // Old item
  { icon: LineChart, label: 'History', path: '/vital-history' }, // New item for History
  { icon: Calendar, label: 'Appointments', path: '/appointments' },
  { icon: Settings, label: 'Settings', path: '/settings' }, 
];

export const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
      <div className="flex items-center justify-around px-2 py-2 max-w-md mx-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm" 
              onClick={() => navigate(item.path)}
              aria-label={item.label}
              className={`flex flex-col items-center justify-center p-2 h-16 w-16 flex-1 transition-colors ${
                isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              style={{ minWidth: '0' }} 
            >
              <Icon size={28} />
              {/* Optional: Add text label if desired, though current design is icon-only for active path */}
              {/* <span className={`text-xs mt-1 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>{item.label}</span> */}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
