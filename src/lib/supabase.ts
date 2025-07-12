import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      winners: {
        Row: {
          id: string;
          guide_id: number;
          name: string;
          department: string;
          supervisor: string;
          timestamp: string;
          chat_ids: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          guide_id: number;
          name: string;
          department: string;
          supervisor: string;
          timestamp: string;
          chat_ids?: string[];
          created_at?: string;
        };
        Update: {
          id?: string;
          guide_id?: number;
          name?: string;
          department?: string;
          supervisor?: string;
          timestamp?: string;
          chat_ids?: string[];
          created_at?: string;
        };
      };
      losers: {
        Row: {
          id: string;
          guide_id: number;
          name: string;
          department: string;
          supervisor: string;
          timestamp: string;
          chat_ids: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          guide_id: number;
          name: string;
          department: string;
          supervisor: string;
          timestamp: string;
          chat_ids?: string[];
          created_at?: string;
        };
        Update: {
          id?: string;
          guide_id?: number;
          name?: string;
          department?: string;
          supervisor?: string;
          timestamp?: string;
          chat_ids?: string[];
          created_at?: string;
        };
      };
      elite_winners: {
        Row: {
          id: string;
          guide_id: number;
          name: string;
          department: string;
          supervisor: string;
          timestamp: string;
          elite_timestamp: string;
          chat_ids: string[];
          elite_chat_ids: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          guide_id: number;
          name: string;
          department: string;
          supervisor: string;
          timestamp: string;
          elite_timestamp: string;
          chat_ids?: string[];
          elite_chat_ids?: string[];
          created_at?: string;
        };
        Update: {
          id?: string;
          guide_id?: number;
          name?: string;
          department?: string;
          supervisor?: string;
          timestamp?: string;
          elite_timestamp?: string;
          chat_ids?: string[];
          elite_chat_ids?: string[];
          created_at?: string;
        };
      };
    };
  };
};