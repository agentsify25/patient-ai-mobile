import { MobileLayout } from '@/components/Layout/MobileLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, User, Plus } from 'lucide-react';

const Appointments = () => {
  const appointments = [
    {
      id: 1,
      type: 'Follow-up Consultation',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: 'Today',
      time: '2:30 PM',
      location: 'Room 204, Heart Center',
      status: 'confirmed'
    },
    {
      id: 2,
      type: 'Annual Physical',
      doctor: 'Dr. Michael Chen',
      specialty: 'Primary Care',
      date: 'Tomorrow',
      time: '10:00 AM',
      location: 'Main Clinic',
      status: 'confirmed'
    },
    {
      id: 3,
      type: 'Blood Work',
      doctor: 'Lab Tech',
      specialty: 'Laboratory',
      date: 'March 15',
      time: '8:30 AM',
      location: 'Lab Wing',
      status: 'pending'
    }
  ];

  const statusColors = {
    confirmed: 'bg-green-500/20 text-green-400 border-green-500/30',
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    cancelled: 'bg-red-500/20 text-red-400 border-red-500/30'
  };

  return (
    <MobileLayout>
      <h1 className="text-2xl font-semibold mb-6 text-center">Appointments</h1>
      <div className="space-y-6">
        {/* Add New Appointment Button */}
        <Button className="w-full" size="lg">
          <Plus className="mr-2" size={20} />
          Schedule New Appointment
        </Button>

        {/* Upcoming Appointments */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Upcoming Appointments</h3>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <Card key={appointment.id} className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">{appointment.type}</h4>
                    <div className="flex items-center gap-2 text-muted-foreground mt-1">
                      <User size={16} />
                      <span>{appointment.doctor}</span>
                      <span>•</span>
                      <span>{appointment.specialty}</span>
                    </div>
                  </div>
                  <Badge className={statusColors[appointment.status as keyof typeof statusColors]}>
                    {appointment.status}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={16} className="text-primary" />
                    <span>{appointment.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock size={16} className="text-primary" />
                    <span>{appointment.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin size={16} className="text-primary" />
                    <span>{appointment.location}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Reschedule
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Cancel
                  </Button>
                  {appointment.status === 'confirmed' && (
                    <Button size="sm" className="flex-1">
                      Check In
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-16">
            <div className="text-center">
              <Calendar className="mx-auto mb-1" size={20} />
              <div className="text-sm">View Calendar</div>
            </div>
          </Button>
          <Button variant="outline" className="h-16">
            <div className="text-center">
              <Clock className="mx-auto mb-1" size={20} />
              <div className="text-sm">History</div>
            </div>
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Appointments;
