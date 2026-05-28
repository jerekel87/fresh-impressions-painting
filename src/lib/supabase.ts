import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dpjucgfbquitdnkrqyll.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwanVjZ2ZicXVpdGRua3JxeWxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5Njc3MTYsImV4cCI6MjA5NTU0MzcxNn0.z-nW8cLq2yE_7K8huMNgt1HxEYylLTDCINZqy9SB_AQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
