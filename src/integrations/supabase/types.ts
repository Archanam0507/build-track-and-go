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
      blueprints: {
        Row: {
          created_at: string | null
          file_url: string | null
          id: string
          site_id: string | null
          type: string | null
          uploaded_by: string | null
          version: number | null
        }
        Insert: {
          created_at?: string | null
          file_url?: string | null
          id?: string
          site_id?: string | null
          type?: string | null
          uploaded_by?: string | null
          version?: number | null
        }
        Update: {
          created_at?: string | null
          file_url?: string | null
          id?: string
          site_id?: string | null
          type?: string | null
          uploaded_by?: string | null
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "blueprints_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blueprints_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          id: string
          name: string | null
          phone: string | null
          role: string | null
          site_id: string | null
          whatsapp: boolean | null
        }
        Insert: {
          id?: string
          name?: string | null
          phone?: string | null
          role?: string | null
          site_id?: string | null
          whatsapp?: boolean | null
        }
        Update: {
          id?: string
          name?: string | null
          phone?: string | null
          role?: string | null
          site_id?: string | null
          whatsapp?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "contacts_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_updates: {
        Row: {
          captions: string | null
          category: string | null
          created_at: string | null
          date: string | null
          id: string
          media_urls: string[] | null
          site_id: string | null
          uploaded_by: string | null
        }
        Insert: {
          captions?: string | null
          category?: string | null
          created_at?: string | null
          date?: string | null
          id?: string
          media_urls?: string[] | null
          site_id?: string | null
          uploaded_by?: string | null
        }
        Update: {
          captions?: string | null
          category?: string | null
          created_at?: string | null
          date?: string | null
          id?: string
          media_urls?: string[] | null
          site_id?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "daily_updates_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "daily_updates_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      materials_log: {
        Row: {
          created_at: string | null
          id: string
          item: string | null
          quantity: number | null
          receipt_url: string | null
          site_id: string | null
          stage_tag: string | null
          unit_price: number | null
          vendor: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          item?: string | null
          quantity?: number | null
          receipt_url?: string | null
          site_id?: string | null
          stage_tag?: string | null
          unit_price?: number | null
          vendor?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          item?: string | null
          quantity?: number | null
          receipt_url?: string | null
          site_id?: string | null
          stage_tag?: string | null
          unit_price?: number | null
          vendor?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "materials_log_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      paint_picker: {
        Row: {
          before_after: string[] | null
          created_at: string | null
          day_night: string | null
          grill_color: string | null
          id: string
          image_url: string | null
          site_id: string | null
          trim_color: string | null
          wall_color: string | null
        }
        Insert: {
          before_after?: string[] | null
          created_at?: string | null
          day_night?: string | null
          grill_color?: string | null
          id?: string
          image_url?: string | null
          site_id?: string | null
          trim_color?: string | null
          wall_color?: string | null
        }
        Update: {
          before_after?: string[] | null
          created_at?: string | null
          day_night?: string | null
          grill_color?: string | null
          id?: string
          image_url?: string | null
          site_id?: string | null
          trim_color?: string | null
          wall_color?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "paint_picker_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number | null
          approved_by: string | null
          created_at: string | null
          id: string
          payee_details: string | null
          proof_url: string | null
          raised_by: string | null
          site_id: string | null
          status: string | null
          type: string | null
        }
        Insert: {
          amount?: number | null
          approved_by?: string | null
          created_at?: string | null
          id?: string
          payee_details?: string | null
          proof_url?: string | null
          raised_by?: string | null
          site_id?: string | null
          status?: string | null
          type?: string | null
        }
        Update: {
          amount?: number | null
          approved_by?: string | null
          created_at?: string | null
          id?: string
          payee_details?: string | null
          proof_url?: string | null
          raised_by?: string | null
          site_id?: string | null
          status?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_raised_by_fkey"
            columns: ["raised_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      progress_tasks: {
        Row: {
          comments: string | null
          dependencies: string[] | null
          end_date: string | null
          id: string
          name: string | null
          progress: number | null
          site_id: string | null
          start_date: string | null
          status: string | null
        }
        Insert: {
          comments?: string | null
          dependencies?: string[] | null
          end_date?: string | null
          id?: string
          name?: string | null
          progress?: number | null
          site_id?: string | null
          start_date?: string | null
          status?: string | null
        }
        Update: {
          comments?: string | null
          dependencies?: string[] | null
          end_date?: string | null
          id?: string
          name?: string | null
          progress?: number | null
          site_id?: string | null
          start_date?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "progress_tasks_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      sites: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          last_update: string | null
          location: string | null
          name: string
          progress: number | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          last_update?: string | null
          location?: string | null
          name: string
          progress?: number | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          last_update?: string | null
          location?: string | null
          name?: string
          progress?: number | null
          status?: string | null
        }
        Relationships: []
      }
      stock_tracker: {
        Row: {
          id: string
          item: string | null
          last_updated: string | null
          quantity: number | null
          restock_note: string | null
          site_id: string | null
          status: string | null
        }
        Insert: {
          id?: string
          item?: string | null
          last_updated?: string | null
          quantity?: number | null
          restock_note?: string | null
          site_id?: string | null
          status?: string | null
        }
        Update: {
          id?: string
          item?: string | null
          last_updated?: string | null
          quantity?: number | null
          restock_note?: string | null
          site_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stock_tracker_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          assigned_site: string | null
          created_at: string | null
          email: string
          id: string
          name: string
          phone: string | null
          role: string
        }
        Insert: {
          assigned_site?: string | null
          created_at?: string | null
          email: string
          id?: string
          name: string
          phone?: string | null
          role: string
        }
        Update: {
          assigned_site?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_assigned_site_fkey"
            columns: ["assigned_site"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
