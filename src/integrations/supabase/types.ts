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
          {
            foreignKeyName: "fk_active_devices_patients"
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
          {
            foreignKeyName: "fk_ai_flagged_alerts_patients"
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
          {
            foreignKeyName: "fk_appointments_appointment_types"
            columns: ["appointment_type_id"]
            isOneToOne: false
            referencedRelation: "appointment_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_appointments_doctors"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_appointments_hospitals"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_appointments_patients"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      care_plans: {
        Row: {
          created_at: string
          description: string | null
          duration_days: number | null
          goals: string[] | null
          id: string
          interventions: string[] | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration_days?: number | null
          goals?: string[] | null
          id?: string
          interventions?: string[] | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          duration_days?: number | null
          goals?: string[] | null
          id?: string
          interventions?: string[] | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      care_team_members: {
        Row: {
          assigned_at: string
          assigned_by_user_id: string | null
          care_team_id: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          assigned_at?: string
          assigned_by_user_id?: string | null
          care_team_id: string
          id?: string
          role: string
          user_id: string
        }
        Update: {
          assigned_at?: string
          assigned_by_user_id?: string | null
          care_team_id?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "care_team_members_care_team_id_fkey"
            columns: ["care_team_id"]
            isOneToOne: false
            referencedRelation: "care_teams"
            referencedColumns: ["id"]
          },
        ]
      }
      care_teams: {
        Row: {
          created_at: string
          description: string | null
          id: string
          lead_doctor_id: string | null
          name: string
          organization_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          lead_doctor_id?: string | null
          name: string
          organization_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          lead_doctor_id?: string | null
          name?: string
          organization_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "care_teams_lead_doctor_id_fkey"
            columns: ["lead_doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "care_teams_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_conversations: {
        Row: {
          created_at: string
          created_by_user_id: string | null
          id: string
          name: string
          participants: string[]
          patient_id: string | null
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by_user_id?: string | null
          id?: string
          name: string
          participants?: string[]
          patient_id?: string | null
          type?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by_user_id?: string | null
          id?: string
          name?: string
          participants?: string[]
          patient_id?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_conversations_patient_id_fkey"
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
          {
            foreignKeyName: "fk_chat_messages_patients"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      clinical_workflows: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          organization_id: string | null
          steps: Json
          updated_at: string
          workflow_type: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          organization_id?: string | null
          steps?: Json
          updated_at?: string
          workflow_type: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          organization_id?: string | null
          steps?: Json
          updated_at?: string
          workflow_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "clinical_workflows_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      device_readings: {
        Row: {
          created_at: string
          device_id: string
          id: string
          metadata: Json | null
          patient_id: string
          reading_type: string
          timestamp: string
          unit: string | null
          value: number
        }
        Insert: {
          created_at?: string
          device_id: string
          id?: string
          metadata?: Json | null
          patient_id: string
          reading_type: string
          timestamp?: string
          unit?: string | null
          value: number
        }
        Update: {
          created_at?: string
          device_id?: string
          id?: string
          metadata?: Json | null
          patient_id?: string
          reading_type?: string
          timestamp?: string
          unit?: string | null
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "device_readings_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "active_devices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "device_readings_patient_id_fkey"
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
          {
            foreignKeyName: "fk_device_specifications_patients"
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
          {
            foreignKeyName: "fk_doctors_hospitals"
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
          {
            foreignKeyName: "fk_escalation_logs_ai_flagged_alerts"
            columns: ["original_alert_id"]
            isOneToOne: false
            referencedRelation: "ai_flagged_alerts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_escalation_logs_patients"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_records: {
        Row: {
          amount: number
          category: string | null
          created_at: string
          created_by_user_id: string | null
          currency: string
          date: string
          description: string | null
          id: string
          patient_id: string | null
          record_type: string
          status: string
        }
        Insert: {
          amount: number
          category?: string | null
          created_at?: string
          created_by_user_id?: string | null
          currency?: string
          date?: string
          description?: string | null
          id?: string
          patient_id?: string | null
          record_type: string
          status?: string
        }
        Update: {
          amount?: number
          category?: string | null
          created_at?: string
          created_by_user_id?: string | null
          currency?: string
          date?: string
          description?: string | null
          id?: string
          patient_id?: string | null
          record_type?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "financial_records_patient_id_fkey"
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
      hotline_chat_messages: {
        Row: {
          id: string
          message: string
          message_type: string
          metadata: Json | null
          sender_name: string
          sender_type: string
          session_id: string
          timestamp: string
        }
        Insert: {
          id?: string
          message: string
          message_type?: string
          metadata?: Json | null
          sender_name: string
          sender_type: string
          session_id: string
          timestamp?: string
        }
        Update: {
          id?: string
          message?: string
          message_type?: string
          metadata?: Json | null
          sender_name?: string
          sender_type?: string
          session_id?: string
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "hotline_chat_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "nursing_hotline_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      hotline_escalations: {
        Row: {
          created_at: string
          escalated_at: string
          escalated_to_user: string | null
          escalation_reason: string
          escalation_status: Database["public"]["Enums"]["escalation_status"]
          genesys_contact_id: string | null
          genesys_interaction_id: string | null
          id: string
          queue_name: string | null
          resolution_notes: string | null
          resolved_at: string | null
          session_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          escalated_at?: string
          escalated_to_user?: string | null
          escalation_reason: string
          escalation_status?: Database["public"]["Enums"]["escalation_status"]
          genesys_contact_id?: string | null
          genesys_interaction_id?: string | null
          id?: string
          queue_name?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          session_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          escalated_at?: string
          escalated_to_user?: string | null
          escalation_reason?: string
          escalation_status?: Database["public"]["Enums"]["escalation_status"]
          genesys_contact_id?: string | null
          genesys_interaction_id?: string | null
          id?: string
          queue_name?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          session_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "hotline_escalations_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "nursing_hotline_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      imaging_results: {
        Row: {
          body_part: string
          created_at: string
          findings: string | null
          id: string
          image_urls: string[] | null
          imaging_type: string
          impression: string | null
          ordered_by_doctor_id: string | null
          patient_id: string
          performed_at: string
          radiologist_notes: string | null
          report_url: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          body_part: string
          created_at?: string
          findings?: string | null
          id?: string
          image_urls?: string[] | null
          imaging_type: string
          impression?: string | null
          ordered_by_doctor_id?: string | null
          patient_id: string
          performed_at?: string
          radiologist_notes?: string | null
          report_url?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          body_part?: string
          created_at?: string
          findings?: string | null
          id?: string
          image_urls?: string[] | null
          imaging_type?: string
          impression?: string | null
          ordered_by_doctor_id?: string | null
          patient_id?: string
          performed_at?: string
          radiologist_notes?: string | null
          report_url?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "imaging_results_ordered_by_doctor_id_fkey"
            columns: ["ordered_by_doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "imaging_results_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      lab_results: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          ordered_at: string
          ordered_by_doctor_id: string | null
          patient_id: string
          reference_range: string | null
          result_date: string
          result_value: string
          status: string | null
          test_name: string
          test_type: string
          unit: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          ordered_at?: string
          ordered_by_doctor_id?: string | null
          patient_id: string
          reference_range?: string | null
          result_date?: string
          result_value: string
          status?: string | null
          test_name: string
          test_type: string
          unit?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          ordered_at?: string
          ordered_by_doctor_id?: string | null
          patient_id?: string
          reference_range?: string | null
          result_date?: string
          result_value?: string
          status?: string | null
          test_name?: string
          test_type?: string
          unit?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lab_results_ordered_by_doctor_id_fkey"
            columns: ["ordered_by_doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab_results_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      manual_flags: {
        Row: {
          created_at: string
          flagged_by_user_id: string | null
          id: string
          patient_identifier: string
          reason: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          flagged_by_user_id?: string | null
          id?: string
          patient_identifier: string
          reason: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          flagged_by_user_id?: string | null
          id?: string
          patient_identifier?: string
          reason?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      medication_adherence: {
        Row: {
          adherence_score: number | null
          created_at: string
          id: string
          measured_at: string
          measurement_period_days: number
          notes: string | null
          patient_id: string
          prescription_id: string | null
        }
        Insert: {
          adherence_score?: number | null
          created_at?: string
          id?: string
          measured_at?: string
          measurement_period_days?: number
          notes?: string | null
          patient_id: string
          prescription_id?: string | null
        }
        Update: {
          adherence_score?: number | null
          created_at?: string
          id?: string
          measured_at?: string
          measurement_period_days?: number
          notes?: string | null
          patient_id?: string
          prescription_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "medication_adherence_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medication_adherence_prescription_id_fkey"
            columns: ["prescription_id"]
            isOneToOne: false
            referencedRelation: "patient_prescriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      medication_doses: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          patient_id: string
          prescription_id: string
          scheduled_time: string | null
          self_reported: boolean
          status: Database["public"]["Enums"]["medication_dose_status_enum"]
          taken_at: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          patient_id: string
          prescription_id: string
          scheduled_time?: string | null
          self_reported?: boolean
          status?: Database["public"]["Enums"]["medication_dose_status_enum"]
          taken_at?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          patient_id?: string
          prescription_id?: string
          scheduled_time?: string | null
          self_reported?: boolean
          status?: Database["public"]["Enums"]["medication_dose_status_enum"]
          taken_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_medication_doses_patients"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_medication_doses_prescriptions"
            columns: ["prescription_id"]
            isOneToOne: false
            referencedRelation: "patient_prescriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medication_doses_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medication_doses_prescription_id_fkey"
            columns: ["prescription_id"]
            isOneToOne: false
            referencedRelation: "patient_prescriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      medications: {
        Row: {
          common_strengths: string[] | null
          created_at: string
          description: string | null
          form: string | null
          id: string
          manufacturer: string | null
          name: string
          standard_dosage_unit: string | null
          updated_at: string
        }
        Insert: {
          common_strengths?: string[] | null
          created_at?: string
          description?: string | null
          form?: string | null
          id?: string
          manufacturer?: string | null
          name: string
          standard_dosage_unit?: string | null
          updated_at?: string
        }
        Update: {
          common_strengths?: string[] | null
          created_at?: string
          description?: string | null
          form?: string | null
          id?: string
          manufacturer?: string | null
          name?: string
          standard_dosage_unit?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      nursing_hotline_sessions: {
        Row: {
          assigned_nurse_id: string | null
          completed_at: string | null
          created_at: string
          id: string
          initiated_by_user_id: string | null
          notes: string | null
          organization_id: string
          patient_id: string
          priority_level: Database["public"]["Enums"]["triage_priority"] | null
          session_status: Database["public"]["Enums"]["session_status"]
          started_at: string
          symptoms_description: string | null
          updated_at: string
          vital_signs_context: Json | null
        }
        Insert: {
          assigned_nurse_id?: string | null
          completed_at?: string | null
          created_at?: string
          id?: string
          initiated_by_user_id?: string | null
          notes?: string | null
          organization_id: string
          patient_id: string
          priority_level?: Database["public"]["Enums"]["triage_priority"] | null
          session_status?: Database["public"]["Enums"]["session_status"]
          started_at?: string
          symptoms_description?: string | null
          updated_at?: string
          vital_signs_context?: Json | null
        }
        Update: {
          assigned_nurse_id?: string | null
          completed_at?: string | null
          created_at?: string
          id?: string
          initiated_by_user_id?: string | null
          notes?: string | null
          organization_id?: string
          patient_id?: string
          priority_level?: Database["public"]["Enums"]["triage_priority"] | null
          session_status?: Database["public"]["Enums"]["session_status"]
          started_at?: string
          symptoms_description?: string | null
          updated_at?: string
          vital_signs_context?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "nursing_hotline_sessions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          address: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          phone: string | null
          settings: Json | null
          type: string
          updated_at: string
          website: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          settings?: Json | null
          type: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          settings?: Json | null
          type?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      patient_care_plans: {
        Row: {
          assigned_at: string
          assigned_by_user_id: string | null
          care_plan_id: string
          created_at: string
          end_date: string | null
          id: string
          notes: string | null
          patient_id: string
          start_date: string | null
          status: Database["public"]["Enums"]["care_plan_status_enum"] | null
          updated_at: string
        }
        Insert: {
          assigned_at?: string
          assigned_by_user_id?: string | null
          care_plan_id: string
          created_at?: string
          end_date?: string | null
          id?: string
          notes?: string | null
          patient_id: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["care_plan_status_enum"] | null
          updated_at?: string
        }
        Update: {
          assigned_at?: string
          assigned_by_user_id?: string | null
          care_plan_id?: string
          created_at?: string
          end_date?: string | null
          id?: string
          notes?: string | null
          patient_id?: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["care_plan_status_enum"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_patient_care_plans_care_plans"
            columns: ["care_plan_id"]
            isOneToOne: false
            referencedRelation: "care_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_patient_care_plans_patients"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_care_plans_care_plan_id_fkey"
            columns: ["care_plan_id"]
            isOneToOne: false
            referencedRelation: "care_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_care_plans_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_care_team_assignments: {
        Row: {
          assigned_at: string
          assigned_by_user_id: string | null
          care_team_id: string
          id: string
          patient_id: string
          status: string
        }
        Insert: {
          assigned_at?: string
          assigned_by_user_id?: string | null
          care_team_id: string
          id?: string
          patient_id: string
          status?: string
        }
        Update: {
          assigned_at?: string
          assigned_by_user_id?: string | null
          care_team_id?: string
          id?: string
          patient_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "patient_care_team_assignments_care_team_id_fkey"
            columns: ["care_team_id"]
            isOneToOne: false
            referencedRelation: "care_teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_care_team_assignments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
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
            foreignKeyName: "fk_patient_diagnoses_diagnosis_codes"
            columns: ["diagnosis_code"]
            isOneToOne: false
            referencedRelation: "diagnosis_codes"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "fk_patient_diagnoses_doctors"
            columns: ["diagnosed_by_doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_patient_diagnoses_patients"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
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
      patient_discharges: {
        Row: {
          created_at: string
          destination: string | null
          discharge_date: string
          discharged_by_user_id: string | null
          id: string
          instructions: string | null
          patient_id: string
          reason: string | null
          summary: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          destination?: string | null
          discharge_date: string
          discharged_by_user_id?: string | null
          id?: string
          instructions?: string | null
          patient_id: string
          reason?: string | null
          summary?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          destination?: string | null
          discharge_date?: string
          discharged_by_user_id?: string | null
          id?: string
          instructions?: string | null
          patient_id?: string
          reason?: string | null
          summary?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_patient_discharges_patients"
            columns: ["patient_id"]
            isOneToOne: true
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_discharges_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: true
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
            foreignKeyName: "fk_patient_doctor_assignments_doctors"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_patient_doctor_assignments_patients"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
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
            foreignKeyName: "fk_patient_documents_patients"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_documents_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_follow_ups: {
        Row: {
          completed_at: string | null
          created_at: string
          created_by: string
          follow_up_type: string
          id: string
          notes: string
          outcome: string | null
          patient_id: string
          priority: string
          scheduled_date: string
          session_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          created_by: string
          follow_up_type: string
          id?: string
          notes: string
          outcome?: string | null
          patient_id: string
          priority?: string
          scheduled_date: string
          session_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          created_by?: string
          follow_up_type?: string
          id?: string
          notes?: string
          outcome?: string | null
          patient_id?: string
          priority?: string
          scheduled_date?: string
          session_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "patient_follow_ups_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_follow_ups_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "nursing_hotline_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_notes: {
        Row: {
          created_at: string
          id: string
          note_content: string
          note_type: Database["public"]["Enums"]["note_category_enum"]
          patient_id: string
          recorded_by_name: string | null
          recorded_by_user_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          note_content: string
          note_type?: Database["public"]["Enums"]["note_category_enum"]
          patient_id: string
          recorded_by_name?: string | null
          recorded_by_user_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          note_content?: string
          note_type?: Database["public"]["Enums"]["note_category_enum"]
          patient_id?: string
          recorded_by_name?: string | null
          recorded_by_user_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_patient"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_patient_notes_patients"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_prescriptions: {
        Row: {
          created_at: string
          dosage: string
          end_date: string | null
          frequency: string
          id: string
          instructions: string | null
          is_active: boolean
          medication_id: string
          patient_id: string
          prescribing_doctor_id: string | null
          route: string | null
          start_date: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          dosage: string
          end_date?: string | null
          frequency: string
          id?: string
          instructions?: string | null
          is_active?: boolean
          medication_id: string
          patient_id: string
          prescribing_doctor_id?: string | null
          route?: string | null
          start_date: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          dosage?: string
          end_date?: string | null
          frequency?: string
          id?: string
          instructions?: string | null
          is_active?: boolean
          medication_id?: string
          patient_id?: string
          prescribing_doctor_id?: string | null
          route?: string | null
          start_date?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_patient_prescriptions_doctors"
            columns: ["prescribing_doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_patient_prescriptions_medications"
            columns: ["medication_id"]
            isOneToOne: false
            referencedRelation: "medications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_patient_prescriptions_patients"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_prescriptions_medication_id_fkey"
            columns: ["medication_id"]
            isOneToOne: false
            referencedRelation: "medications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_prescriptions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_prescriptions_prescribing_doctor_id_fkey"
            columns: ["prescribing_doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
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
            foreignKeyName: "fk_patient_visits_locations_appointments"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_patient_visits_locations_hospitals"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_patient_visits_locations_patients"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_visits_locations_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          address: string | null
          age: number
          avatar_url: string | null
          blood_pressure: string | null
          created_at: string
          date_of_birth: string | null
          email: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          gender: string | null
          heart_rate: number | null
          id: string
          last_checkup: string | null
          name: string
          national_id: string
          organization_id: string | null
          phone: string | null
          primary_doctor_id: string | null
          spo2: number | null
          status: string | null
          temperature: number | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          age: number
          avatar_url?: string | null
          blood_pressure?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          gender?: string | null
          heart_rate?: number | null
          id?: string
          last_checkup?: string | null
          name: string
          national_id: string
          organization_id?: string | null
          phone?: string | null
          primary_doctor_id?: string | null
          spo2?: number | null
          status?: string | null
          temperature?: number | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          age?: number
          avatar_url?: string | null
          blood_pressure?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          gender?: string | null
          heart_rate?: number | null
          id?: string
          last_checkup?: string | null
          name?: string
          national_id?: string
          organization_id?: string | null
          phone?: string | null
          primary_doctor_id?: string | null
          spo2?: number | null
          status?: string | null
          temperature?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "patients_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patients_primary_doctor_id_fkey"
            columns: ["primary_doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          national_id: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          national_id?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          national_id?: string | null
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
            foreignKeyName: "fk_referrals_hospitals"
            columns: ["referred_to_hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_referrals_patients"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_referrals_referred_to_doctors"
            columns: ["referred_to_doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_referrals_referring_doctors"
            columns: ["referring_doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
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
      sla_timers: {
        Row: {
          alert_id: string
          created_at: string
          current_escalation_level: number
          deadline_timestamp: string
          id: string
          initial_response_sla_minutes: number
          notes: string | null
          patient_id: string
          status: string
          updated_at: string
        }
        Insert: {
          alert_id: string
          created_at?: string
          current_escalation_level?: number
          deadline_timestamp: string
          id?: string
          initial_response_sla_minutes: number
          notes?: string | null
          patient_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          alert_id?: string
          created_at?: string
          current_escalation_level?: number
          deadline_timestamp?: string
          id?: string
          initial_response_sla_minutes?: number
          notes?: string | null
          patient_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_sla_timers_ai_flagged_alerts"
            columns: ["alert_id"]
            isOneToOne: false
            referencedRelation: "ai_flagged_alerts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_sla_timers_patients"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sla_timers_alert_id_fkey"
            columns: ["alert_id"]
            isOneToOne: false
            referencedRelation: "ai_flagged_alerts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sla_timers_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      system_audit_logs: {
        Row: {
          action: string
          details: Json | null
          id: string
          ip_address: unknown | null
          resource_id: string | null
          resource_type: string
          timestamp: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type: string
          timestamp?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type?: string
          timestamp?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      teleconsultation_sessions: {
        Row: {
          callee_patient_id: string
          callee_patient_name: string | null
          caller_user_id: string | null
          connected_at: string | null
          created_at: string
          duration_seconds: number | null
          ended_at: string | null
          id: string
          initiated_at: string
          room_otp: string | null
          session_status: Database["public"]["Enums"]["teleconsult_session_status"]
          taftesh_meeting_links: Json | null
          taftesh_room_id: string | null
          updated_at: string
        }
        Insert: {
          callee_patient_id: string
          callee_patient_name?: string | null
          caller_user_id?: string | null
          connected_at?: string | null
          created_at?: string
          duration_seconds?: number | null
          ended_at?: string | null
          id?: string
          initiated_at?: string
          room_otp?: string | null
          session_status?: Database["public"]["Enums"]["teleconsult_session_status"]
          taftesh_meeting_links?: Json | null
          taftesh_room_id?: string | null
          updated_at?: string
        }
        Update: {
          callee_patient_id?: string
          callee_patient_name?: string | null
          caller_user_id?: string | null
          connected_at?: string | null
          created_at?: string
          duration_seconds?: number | null
          ended_at?: string | null
          id?: string
          initiated_at?: string
          room_otp?: string | null
          session_status?: Database["public"]["Enums"]["teleconsult_session_status"]
          taftesh_meeting_links?: Json | null
          taftesh_room_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_teleconsultation_sessions_callee_patients"
            columns: ["callee_patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teleconsultation_sessions_callee_patient_id_fkey"
            columns: ["callee_patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_modules: {
        Row: {
          configuration: Json | null
          created_at: string
          disabled_at: string | null
          enabled_at: string | null
          enabled_by_user_id: string | null
          id: string
          module_name: string
          organization_id: string
          status: Database["public"]["Enums"]["module_status"]
          updated_at: string
        }
        Insert: {
          configuration?: Json | null
          created_at?: string
          disabled_at?: string | null
          enabled_at?: string | null
          enabled_by_user_id?: string | null
          id?: string
          module_name: string
          organization_id: string
          status?: Database["public"]["Enums"]["module_status"]
          updated_at?: string
        }
        Update: {
          configuration?: Json | null
          created_at?: string
          disabled_at?: string | null
          enabled_at?: string | null
          enabled_by_user_id?: string | null
          id?: string
          module_name?: string
          organization_id?: string
          status?: Database["public"]["Enums"]["module_status"]
          updated_at?: string
        }
        Relationships: []
      }
      triage_assessments: {
        Row: {
          ai_model_used: string | null
          assessment_type: string
          assessor_id: string | null
          assessor_type: string
          care_recommendations: string[] | null
          confidence_score: number | null
          created_at: string
          id: string
          overridden_by_nurse: boolean | null
          priority_recommendation:
            | Database["public"]["Enums"]["triage_priority"]
            | null
          rationale: string | null
          red_flags: string[] | null
          risk_score: number | null
          session_id: string
        }
        Insert: {
          ai_model_used?: string | null
          assessment_type: string
          assessor_id?: string | null
          assessor_type: string
          care_recommendations?: string[] | null
          confidence_score?: number | null
          created_at?: string
          id?: string
          overridden_by_nurse?: boolean | null
          priority_recommendation?:
            | Database["public"]["Enums"]["triage_priority"]
            | null
          rationale?: string | null
          red_flags?: string[] | null
          risk_score?: number | null
          session_id: string
        }
        Update: {
          ai_model_used?: string | null
          assessment_type?: string
          assessor_id?: string | null
          assessor_type?: string
          care_recommendations?: string[] | null
          confidence_score?: number | null
          created_at?: string
          id?: string
          overridden_by_nurse?: boolean | null
          priority_recommendation?:
            | Database["public"]["Enums"]["triage_priority"]
            | null
          rationale?: string | null
          red_flags?: string[] | null
          risk_score?: number | null
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "triage_assessments_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "nursing_hotline_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          assigned_at: string
          created_at: string
          doctor_id_link: string | null
          patient_id_link: string | null
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_at?: string
          created_at?: string
          doctor_id_link?: string | null
          patient_id_link?: string | null
          role: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_at?: string
          created_at?: string
          doctor_id_link?: string | null
          patient_id_link?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_user_roles_doctors"
            columns: ["doctor_id_link"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_user_roles_patients"
            columns: ["patient_id_link"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
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
      vital_readings: {
        Row: {
          blood_pressure_diastolic: number | null
          blood_pressure_systolic: number | null
          created_at: string
          ecg_data_url: string | null
          heart_rate: number | null
          id: string
          notes: string | null
          profile_id: string
          respiratory_rate: number | null
          spo2: number | null
          temperature_celsius: number | null
          timestamp: string
        }
        Insert: {
          blood_pressure_diastolic?: number | null
          blood_pressure_systolic?: number | null
          created_at?: string
          ecg_data_url?: string | null
          heart_rate?: number | null
          id?: string
          notes?: string | null
          profile_id: string
          respiratory_rate?: number | null
          spo2?: number | null
          temperature_celsius?: number | null
          timestamp?: string
        }
        Update: {
          blood_pressure_diastolic?: number | null
          blood_pressure_systolic?: number | null
          created_at?: string
          ecg_data_url?: string | null
          heart_rate?: number | null
          id?: string
          notes?: string | null
          profile_id?: string
          respiratory_rate?: number | null
          spo2?: number | null
          temperature_celsius?: number | null
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_vital_readings_profiles"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vital_readings_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      vital_readings_history: {
        Row: {
          created_at: string
          device_id: string | null
          id: string
          notes: string | null
          patient_id: string
          reading_type: string
          recorded_at: string
          recorded_by_user_id: string | null
          unit: string | null
          value_numeric: number | null
          value_text: string | null
        }
        Insert: {
          created_at?: string
          device_id?: string | null
          id?: string
          notes?: string | null
          patient_id: string
          reading_type: string
          recorded_at?: string
          recorded_by_user_id?: string | null
          unit?: string | null
          value_numeric?: number | null
          value_text?: string | null
        }
        Update: {
          created_at?: string
          device_id?: string | null
          id?: string
          notes?: string | null
          patient_id?: string
          reading_type?: string
          recorded_at?: string
          recorded_by_user_id?: string | null
          unit?: string | null
          value_numeric?: number | null
          value_text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vital_readings_history_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "active_devices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vital_readings_history_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_instances: {
        Row: {
          completed_at: string | null
          created_at: string
          current_step: number
          id: string
          initiated_by_user_id: string | null
          patient_id: string
          started_at: string
          status: string
          step_data: Json
          updated_at: string
          workflow_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          current_step?: number
          id?: string
          initiated_by_user_id?: string | null
          patient_id: string
          started_at?: string
          status?: string
          step_data?: Json
          updated_at?: string
          workflow_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          current_step?: number
          id?: string
          initiated_by_user_id?: string | null
          patient_id?: string
          started_at?: string
          status?: string
          step_data?: Json
          updated_at?: string
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_instances_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_instances_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "clinical_workflows"
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
      get_user_organization: {
        Args: Record<PropertyKey, never>
        Returns: string
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
      is_health_professional_for_patient: {
        Args: { p_patient_id: string }
        Returns: boolean
      }
      is_module_enabled: {
        Args: { org_id: string; module_name: string }
        Returns: boolean
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
      app_role:
        | "admin"
        | "doctor"
        | "nurse"
        | "coordinator"
        | "patient"
        | "Primary"
        | "Specialist"
        | "RPM"
        | "technician"
        | "casemanager"
        | "supportstaff"
        | "hotline_nurse"
      assignment_role_type: "Primary" | "Specialist" | "RPM"
      care_plan_status_enum: "Active" | "Completed" | "Cancelled"
      device_status_enum: "Online" | "Offline" | "Low Battery"
      device_type_enum:
        | "Smartwatch"
        | "Blood Pressure Monitor"
        | "Glucose Meter"
        | "Pulse Oximeter"
        | "Smart Scale"
      escalation_channel_enum: "SMS" | "Email" | "InAppNotification" | "Call"
      escalation_status: "pending" | "in_progress" | "resolved" | "closed"
      medication_dose_status_enum:
        | "Scheduled"
        | "Taken"
        | "Missed"
        | "Skipped"
        | "Unknown"
      module_status: "enabled" | "disabled" | "pending"
      note_category_enum:
        | "Clinical Note"
        | "Intervention"
        | "Medication Change"
        | "General Update"
        | "Follow-up"
      session_status: "active" | "completed" | "escalated" | "cancelled"
      teleconsult_session_status:
        | "initiated"
        | "connecting"
        | "connected"
        | "ended_by_caller"
        | "ended_by_callee"
        | "failed_to_connect"
        | "cancelled"
      triage_priority: "low" | "medium" | "high" | "critical"
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
      app_role: [
        "admin",
        "doctor",
        "nurse",
        "coordinator",
        "patient",
        "Primary",
        "Specialist",
        "RPM",
        "technician",
        "casemanager",
        "supportstaff",
        "hotline_nurse",
      ],
      assignment_role_type: ["Primary", "Specialist", "RPM"],
      care_plan_status_enum: ["Active", "Completed", "Cancelled"],
      device_status_enum: ["Online", "Offline", "Low Battery"],
      device_type_enum: [
        "Smartwatch",
        "Blood Pressure Monitor",
        "Glucose Meter",
        "Pulse Oximeter",
        "Smart Scale",
      ],
      escalation_channel_enum: ["SMS", "Email", "InAppNotification", "Call"],
      escalation_status: ["pending", "in_progress", "resolved", "closed"],
      medication_dose_status_enum: [
        "Scheduled",
        "Taken",
        "Missed",
        "Skipped",
        "Unknown",
      ],
      module_status: ["enabled", "disabled", "pending"],
      note_category_enum: [
        "Clinical Note",
        "Intervention",
        "Medication Change",
        "General Update",
        "Follow-up",
      ],
      session_status: ["active", "completed", "escalated", "cancelled"],
      teleconsult_session_status: [
        "initiated",
        "connecting",
        "connected",
        "ended_by_caller",
        "ended_by_callee",
        "failed_to_connect",
        "cancelled",
      ],
      triage_priority: ["low", "medium", "high", "critical"],
    },
  },
} as const
