export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      active_devices: {
        Row: {
          battery_level: number | null
          created_at: string
          device_type: Database["public"]["Enums"]["device_type_enum"]
          id: string
          last_sync_at: string
          model_name: string
          patient_id: string
          status: Database["public"]["Enums"]["device_status_enum"]
          updated_at: string
        }
        Insert: {
          battery_level?: number | null
          created_at?: string
          device_type: Database["public"]["Enums"]["device_type_enum"]
          id?: string
          last_sync_at?: string
          model_name: string
          patient_id: string
          status?: Database["public"]["Enums"]["device_status_enum"]
          updated_at?: string
        }
        Update: {
          battery_level?: number | null
          created_at?: string
          device_type?: Database["public"]["Enums"]["device_type_enum"]
          id?: string
          last_sync_at?: string
          model_name?: string
          patient_id?: string
          status?: Database["public"]["Enums"]["device_status_enum"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "active_devices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_active_devices_patient_id"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_flagged_alerts: {
        Row: {
          acknowledged_at: string | null
          acknowledged_by: string | null
          alert_type: Database["public"]["Enums"]["alert_type_enum"]
          created_at: string
          details: Json | null
          id: string
          is_acknowledged: boolean
          message: string | null
          patient_id: string
          severity: Database["public"]["Enums"]["alert_severity_enum"]
          timestamp: string
          updated_at: string
        }
        Insert: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          alert_type: Database["public"]["Enums"]["alert_type_enum"]
          created_at?: string
          details?: Json | null
          id?: string
          is_acknowledged?: boolean
          message?: string | null
          patient_id: string
          severity: Database["public"]["Enums"]["alert_severity_enum"]
          timestamp?: string
          updated_at?: string
        }
        Update: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          alert_type?: Database["public"]["Enums"]["alert_type_enum"]
          created_at?: string
          details?: Json | null
          id?: string
          is_acknowledged?: boolean
          message?: string | null
          patient_id?: string
          severity?: Database["public"]["Enums"]["alert_severity_enum"]
          timestamp?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_flagged_alerts_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      appointment_types: {
        Row: {
          description: string | null
          id: string
          name: string
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      appointments: {
        Row: {
          appointment_type_id: string
          booked_by_user_id: string | null
          created_at: string
          doctor_id: string
          hospital_id: string | null
          id: string
          notes: string | null
          patient_id: string
          scheduled_time: string
          status: string | null
          updated_at: string
        }
        Insert: {
          appointment_type_id: string
          booked_by_user_id?: string | null
          created_at?: string
          doctor_id: string
          hospital_id?: string | null
          id?: string
          notes?: string | null
          patient_id: string
          scheduled_time: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          appointment_type_id?: string
          booked_by_user_id?: string | null
          created_at?: string
          doctor_id?: string
          hospital_id?: string | null
          id?: string
          notes?: string | null
          patient_id?: string
          scheduled_time?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_appointment_type_id_fkey"
            columns: ["appointment_type_id"]
            isOneToOne: false
            referencedRelation: "appointment_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          content: string
          conversation_id: string | null
          id: string
          patient_id: string | null
          read_at: string | null
          receiver_id: string
          sender_id: string
          sent_at: string
        }
        Insert: {
          content: string
          conversation_id?: string | null
          id?: string
          patient_id?: string | null
          read_at?: string | null
          receiver_id: string
          sender_id: string
          sent_at?: string
        }
        Update: {
          content?: string
          conversation_id?: string | null
          id?: string
          patient_id?: string | null
          read_at?: string | null
          receiver_id?: string
          sender_id?: string
          sent_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      device_specifications: {
        Row: {
          battery_capacity_mah: number | null
          charging_time_hours: number | null
          created_at: string
          device_model: string
          id: string
          manufacturer: string | null
          notes: string | null
          operating_temperature_max_c: number | null
          operating_temperature_min_c: number | null
          patient_id: string | null
          updated_at: string
        }
        Insert: {
          battery_capacity_mah?: number | null
          charging_time_hours?: number | null
          created_at?: string
          device_model: string
          id?: string
          manufacturer?: string | null
          notes?: string | null
          operating_temperature_max_c?: number | null
          operating_temperature_min_c?: number | null
          patient_id?: string | null
          updated_at?: string
        }
        Update: {
          battery_capacity_mah?: number | null
          charging_time_hours?: number | null
          created_at?: string
          device_model?: string
          id?: string
          manufacturer?: string | null
          notes?: string | null
          operating_temperature_max_c?: number | null
          operating_temperature_min_c?: number | null
          patient_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "device_specifications_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      diagnosis_codes: {
        Row: {
          category: string | null
          code: string
          description: string
        }
        Insert: {
          category?: string | null
          code: string
          description: string
        }
        Update: {
          category?: string | null
          code?: string
          description?: string
        }
        Relationships: []
      }
      doctors: {
        Row: {
          created_at: string
          endorsements_count: number | null
          hospital_id: string | null
          id: string
          name: string
          specialty: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          endorsements_count?: number | null
          hospital_id?: string | null
          id?: string
          name: string
          specialty?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          endorsements_count?: number | null
          hospital_id?: string | null
          id?: string
          name?: string
          specialty?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "doctors_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
        ]
      }
      escalation_logs: {
        Row: {
          created_at: string
          escalated_to_description: string
          escalation_channel: Database["public"]["Enums"]["escalation_channel_enum"]
          escalation_timestamp: string
          id: string
          notes: string | null
          original_alert_id: string
          patient_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          escalated_to_description: string
          escalation_channel: Database["public"]["Enums"]["escalation_channel_enum"]
          escalation_timestamp?: string
          id?: string
          notes?: string | null
          original_alert_id: string
          patient_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          escalated_to_description?: string
          escalation_channel?: Database["public"]["Enums"]["escalation_channel_enum"]
          escalation_timestamp?: string
          id?: string
          notes?: string | null
          original_alert_id?: string
          patient_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "escalation_logs_original_alert_id_fkey"
            columns: ["original_alert_id"]
            isOneToOne: false
            referencedRelation: "ai_flagged_alerts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "escalation_logs_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      hospitals: {
        Row: {
          cluster_name: string | null
          code: string
          created_at: string
          id: string
          name: string
          sub_classification: string | null
          updated_at: string
        }
        Insert: {
          cluster_name?: string | null
          code: string
          created_at?: string
          id?: string
          name: string
          sub_classification?: string | null
          updated_at?: string
        }
        Update: {
          cluster_name?: string | null
          code?: string
          created_at?: string
          id?: string
          name?: string
          sub_classification?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      patient_diagnoses: {
        Row: {
          created_at: string
          diagnosed_by_doctor_id: string | null
          diagnosis_code: string
          diagnosis_date: string
          id: string
          patient_id: string
          remarks: string | null
        }
        Insert: {
          created_at?: string
          diagnosed_by_doctor_id?: string | null
          diagnosis_code: string
          diagnosis_date: string
          id?: string
          patient_id: string
          remarks?: string | null
        }
        Update: {
          created_at?: string
          diagnosed_by_doctor_id?: string | null
          diagnosis_code?: string
          diagnosis_date?: string
          id?: string
          patient_id?: string
          remarks?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_diagnoses_diagnosed_by_doctor_id_fkey"
            columns: ["diagnosed_by_doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_diagnoses_diagnosis_code_fkey"
            columns: ["diagnosis_code"]
            isOneToOne: false
            referencedRelation: "diagnosis_codes"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "patient_diagnoses_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_doctor_assignments: {
        Row: {
          assigned_at: string
          doctor_id: string
          patient_id: string
          role: Database["public"]["Enums"]["assignment_role_type"] | null
        }
        Insert: {
          assigned_at?: string
          doctor_id: string
          patient_id: string
          role?: Database["public"]["Enums"]["assignment_role_type"] | null
        }
        Update: {
          assigned_at?: string
          doctor_id?: string
          patient_id?: string
          role?: Database["public"]["Enums"]["assignment_role_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_doctor_assignments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_doctor_assignments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_documents: {
        Row: {
          description: string | null
          file_name: string
          file_path: string
          file_type: string | null
          id: string
          patient_id: string
          storage_object_id: string | null
          uploaded_at: string
          uploaded_by_user_id: string | null
        }
        Insert: {
          description?: string | null
          file_name: string
          file_path: string
          file_type?: string | null
          id?: string
          patient_id: string
          storage_object_id?: string | null
          uploaded_at?: string
          uploaded_by_user_id?: string | null
        }
        Update: {
          description?: string | null
          file_name?: string
          file_path?: string
          file_type?: string | null
          id?: string
          patient_id?: string
          storage_object_id?: string | null
          uploaded_at?: string
          uploaded_by_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_documents_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_visits_locations: {
        Row: {
          appointment_id: string | null
          hospital_id: string | null
          id: string
          latitude: number
          longitude: number
          notes: string | null
          patient_id: string
          visit_timestamp: string
        }
        Insert: {
          appointment_id?: string | null
          hospital_id?: string | null
          id?: string
          latitude: number
          longitude: number
          notes?: string | null
          patient_id: string
          visit_timestamp?: string
        }
        Update: {
          appointment_id?: string | null
          hospital_id?: string | null
          id?: string
          latitude?: number
          longitude?: number
          notes?: string | null
          patient_id?: string
          visit_timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "patient_visits_locations_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_visits_locations_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_visits_locations_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          age: number
          avatar_url: string | null
          blood_pressure: string | null
          created_at: string
          email: string | null
          gender: string | null
          heart_rate: number | null
          id: string
          last_checkup: string | null
          name: string
          national_id: string
          phone: string | null
          spo2: number | null
          status: string | null
          temperature: number | null
          updated_at: string
        }
        Insert: {
          age: number
          avatar_url?: string | null
          blood_pressure?: string | null
          created_at?: string
          email?: string | null
          gender?: string | null
          heart_rate?: number | null
          id?: string
          last_checkup?: string | null
          name: string
          national_id: string
          phone?: string | null
          spo2?: number | null
          status?: string | null
          temperature?: number | null
          updated_at?: string
        }
        Update: {
          age?: number
          avatar_url?: string | null
          blood_pressure?: string | null
          created_at?: string
          email?: string | null
          gender?: string | null
          heart_rate?: number | null
          id?: string
          last_checkup?: string | null
          name?: string
          national_id?: string
          phone?: string | null
          spo2?: number | null
          status?: string | null
          temperature?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      referrals: {
        Row: {
          created_at: string
          id: string
          patient_id: string
          reason: string | null
          referred_to_doctor_id: string | null
          referred_to_hospital_id: string | null
          referring_doctor_id: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          patient_id: string
          reason?: string | null
          referred_to_doctor_id?: string | null
          referred_to_hospital_id?: string | null
          referring_doctor_id?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          patient_id?: string
          reason?: string | null
          referred_to_doctor_id?: string | null
          referred_to_hospital_id?: string | null
          referring_doctor_id?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "referrals_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referred_to_doctor_id_fkey"
            columns: ["referred_to_doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referred_to_hospital_id_fkey"
            columns: ["referred_to_hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referring_doctor_id_fkey"
            columns: ["referring_doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          assigned_at: string
          doctor_id_link: string | null
          patient_id_link: string | null
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          assigned_at?: string
          doctor_id_link?: string | null
          patient_id_link?: string | null
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          assigned_at?: string
          doctor_id_link?: string | null
          patient_id_link?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_doctor_id_link_fkey"
            columns: ["doctor_id_link"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_patient_id_link_fkey"
            columns: ["patient_id_link"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_user_has_role: {
        Args: {
          p_user_id: string
          p_required_role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      increment_doctor_endorsement: {
        Args: { doc_id: string }
        Returns: {
          id: string
          name: string
          specialty: string
          endorsements_count: number
        }[]
      }
    }
    Enums: {
      alert_severity_enum: "Low" | "Medium" | "High" | "Critical"
      alert_type_enum:
        | "High Heart Rate"
        | "Low SpO2"
        | "Irregular Heartbeat"
        | "Fall Detected"
        | "Medication Non-Adherence"
        | "High Blood Pressure"
        | "Low Blood Pressure"
        | "Unusual Activity Pattern"
      app_role: "admin" | "doctor" | "nurse" | "coordinator" | "patient"
      assignment_role_type: "Primary" | "Specialist" | "RPM"
      device_status_enum: "Online" | "Offline" | "Low Battery"
      device_type_enum:
        | "Smartwatch"
        | "Blood Pressure Monitor"
        | "Glucose Meter"
        | "Pulse Oximeter"
        | "Smart Scale"
      escalation_channel_enum: "SMS" | "Email" | "InAppNotification" | "Call"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      alert_severity_enum: ["Low", "Medium", "High", "Critical"],
      alert_type_enum: [
        "High Heart Rate",
        "Low SpO2",
        "Irregular Heartbeat",
        "Fall Detected",
        "Medication Non-Adherence",
        "High Blood Pressure",
        "Low Blood Pressure",
        "Unusual Activity Pattern",
      ],
      app_role: ["admin", "doctor", "nurse", "coordinator", "patient"],
      assignment_role_type: ["Primary", "Specialist", "RPM"],
      device_status_enum: ["Online", "Offline", "Low Battery"],
      device_type_enum: [
        "Smartwatch",
        "Blood Pressure Monitor",
        "Glucose Meter",
        "Pulse Oximeter",
        "Smart Scale",
      ],
      escalation_channel_enum: ["SMS", "Email", "InAppNotification", "Call"],
    },
  },
} as const
