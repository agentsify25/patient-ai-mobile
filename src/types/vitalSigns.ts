
import { VitalSignsFormData } from '@/lib/schemas';

export interface VitalReadingFromDB extends VitalSignsFormData {
  id: string;
  profile_id: string;
  timestamp: string; // ISO string
  created_at: string;
  ecg_data_url?: string | null;
}

