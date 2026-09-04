import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fnqbkofjoeyxbryyrhvl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZucWJrb2Zqb2V5eGJyeXlyaHZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MzA1NjAsImV4cCI6MjA1OTExMDU2MH0.CAW-Nis17A7EZFWlnGETpPU2jjb24PB1k5nXS097p18';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);