import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tlfubbmcptbvamnujjwc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZnViYm1jcHRidmFtbnVqandjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNTk1MzAsImV4cCI6MjA2MjczNTUzMH0.VQJszfiy5USQ2RPsnuGvfIwnUGg-4rR5bAyi2aBg9YM';



export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_available: boolean;
  created_at: string;
};

export type Order = {
  id: string;
  user_id: string;
  total_amount: number;
  status: 'pending' | 'paid' | 'served';
  payment_id: string | null;
  qr_token: string | null;
  created_at: string;
};

export const supabase = createClient(supabaseUrl, supabaseKey);