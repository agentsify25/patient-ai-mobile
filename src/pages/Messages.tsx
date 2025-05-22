
import { MobileLayout } from '@/components/Layout/MobileLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone, Video, User, Plus } from 'lucide-react';

const Messages = () => {
  const conversations = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      lastMessage: 'Your latest test results look good. Let\'s schedule a follow-up.',
      timestamp: '2 hours ago',
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Primary Care',
      lastMessage: 'Please remember to take your medication as prescribed.',
      timestamp: '1 day ago',
      unread: 0,
      online: false
    },
    {
      id: 3,
      name: 'Nurse Jennifer',
      specialty: 'Care Coordinator',
      lastMessage: 'Your appointment reminder for tomorrow at 10 AM.',
      timestamp: '2 days ago',
      unread: 1,
      online: true
    }
  ];

  return (
    <MobileLayout title="Messages">
      <div className="space-y-6">
        {/* Emergency Contact */}
        <Card className="p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
              <Phone className="text-red-400" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-red-400">Emergency Contact</h3>
              <p className="text-sm text-muted-foreground">24/7 urgent care line</p>
            </div>
            <Button size="sm" className="bg-red-500 hover:bg-red-600">
              Call Now
            </Button>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          <Button variant="outline" className="h-16 flex-col gap-1">
            <MessageCircle size={20} />
            <span className="text-xs">New Message</span>
          </Button>
          <Button variant="outline" className="h-16 flex-col gap-1">
            <Video size={20} />
            <span className="text-xs">Video Call</span>
          </Button>
          <Button variant="outline" className="h-16 flex-col gap-1">
            <Plus size={20} />
            <span className="text-xs">Find Doctor</span>
          </Button>
        </div>

        {/* Conversations */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Recent Conversations</h3>
          <div className="space-y-3">
            {conversations.map((conversation) => (
              <Card key={conversation.id} className="p-4 hover:bg-card/80 transition-colors cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="text-primary" size={24} />
                    </div>
                    {conversation.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold truncate">{conversation.name}</h4>
                      <div className="flex items-center gap-2">
                        {conversation.unread > 0 && (
                          <Badge className="bg-primary text-primary-foreground px-2 py-0.5 text-xs">
                            {conversation.unread}
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-1">{conversation.specialty}</p>
                    <p className="text-sm truncate">{conversation.lastMessage}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="p-6 text-center bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
          <h3 className="font-semibold mb-2">Need immediate assistance?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Our care team is available 24/7 for urgent health concerns
          </p>
          <Button className="w-full">Contact Care Team</Button>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default Messages;
