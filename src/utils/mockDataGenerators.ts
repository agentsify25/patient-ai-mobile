
import { VitalReadingFromDB } from '@/types/vitalSigns';
import { MockUserProfile, MockHealthInsight } from '@/types/mockData'; // New import

export const generateMockVitalHistory = (): VitalReadingFromDB[] => {
  const baseTimestamp = new Date().getTime();
  return [
    {
      id: 'mock1',
      profile_id: 'mockUser',
      timestamp: new Date(baseTimestamp - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
      created_at: new Date().toISOString(),
      blood_pressure_systolic: 120,
      blood_pressure_diastolic: 80,
      heart_rate: 75,
      spo2: 98,
      temperature_celsius: 36.5,
      respiratory_rate: 16,
      notes: 'Mock reading 1',
    },
    {
      id: 'mock2',
      profile_id: 'mockUser',
      timestamp: new Date(baseTimestamp - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
      created_at: new Date().toISOString(),
      blood_pressure_systolic: 125,
      blood_pressure_diastolic: 82,
      heart_rate: 70,
      spo2: 99,
      temperature_celsius: 36.7,
      respiratory_rate: 15,
      notes: 'Mock reading 2',
    },
    {
      id: 'mock3',
      profile_id: 'mockUser',
      timestamp: new Date(baseTimestamp - 1000 * 60 * 60 * 1).toISOString(), // 1 hour ago
      created_at: new Date().toISOString(),
      blood_pressure_systolic: 118,
      blood_pressure_diastolic: 78,
      heart_rate: 80,
      spo2: 97,
      temperature_celsius: 36.6,
      respiratory_rate: 18,
      notes: 'Mock reading 3',
    },
    { 
      id: 'mock4',
      profile_id: 'mockUser',
      timestamp: new Date(baseTimestamp - 1000 * 60 * 30).toISOString(), // 30 mins ago
      created_at: new Date().toISOString(),
      heart_rate: 85,
      spo2: 99,
      notes: 'Mock reading - HR and SpO2 only',
    },
     { 
      id: 'mock5',
      profile_id: 'mockUser',
      timestamp: new Date(baseTimestamp - 1000 * 60 * 10).toISOString(), // 10 mins ago
      created_at: new Date().toISOString(),
      blood_pressure_systolic: 130,
      blood_pressure_diastolic: 85,
      notes: 'Mock reading - BP only',
    }
  ];
};

export const generateMockUserProfile = (): MockUserProfile => {
  return {
    firstName: 'Alex', // Changed name for variety
    lastName: 'Model',
    avatarUrl: 'https://source.boringavatars.com/beam/120/Alex%20Model?colors=264653,2a9d8f,e9c46a,f4a261,e76f51', // Using boringavatars
    patientId: `PAT-MOCK-${Math.floor(100 + Math.random() * 900)}`, // Randomize patient ID slightly
    email: 'alex.model@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-07-22',
    address: '456 Mockup Ave, Testington, TS 54321',
    emergencyContact: {
      name: 'Dr. Sam Checkup',
      relationship: 'Primary Care Physician',
      phone: '+1 (555) 987-6543',
    },
    healthSummary: {
      healthScore: Math.floor(85 + Math.random() * 15), // 85-99
      daysActive: Math.floor(10 + Math.random() * 20), // 10-29
      medicationsCount: Math.floor(1 + Math.random() * 4), // 1-4
      careTeamCount: Math.floor(1 + Math.random() * 3), // 1-3
    },
  };
};

export const generateMockHealthInsight = (): MockHealthInsight => {
  const insights = [
    {
      title: "Consistent Activity",
      description: "You've maintained a great activity level this past month. Your consistency is key to long-term benefits!",
      isAvailable: true,
    },
    {
      title: "Sleep Pattern Analysis",
      description: "Your recent sleep data shows an average of 6.5 hours. Aiming for 7-8 hours could improve your energy levels.",
      isAvailable: true,
    },
    {
      title: "Hydration Reminder",
      description: "Remember to stay hydrated, especially on active days. It helps with recovery and overall well-being.",
      isAvailable: true,
    },
    {
      title: "Mindfulness Moment",
      description: "Consider incorporating a short mindfulness exercise into your daily routine. It can help manage stress.",
      isAvailable: true,
    },
    {
      title: "No new insights currently",
      description: "We're analyzing your data. Check back soon for personalized health insights.",
      isAvailable: false, // Example of an unavailable insight
    }
  ];
  return insights[Math.floor(Math.random() * insights.length)];
};

