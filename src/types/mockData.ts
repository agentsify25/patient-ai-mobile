
export interface MockUserProfile {
  avatarUrl?: string;
  firstName: string;
  lastName: string;
  patientId: string;
  email: string;
  phone: string;
  dateOfBirth: string; // e.g., "YYYY-MM-DD"
  address: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  healthSummary: {
    healthScore: number;
    daysActive: number;
    medicationsCount: number;
    careTeamCount: number;
  };
}

export interface MockHealthInsight {
  title: string;
  description: string;
  isAvailable: boolean;
}

// Future mock data types can be added here, for example:
// export interface MockAppointment { ... }
// export interface MockMedication { ... }
// export interface MockChatMessage { ... }
// export interface MockDevice { ... }

