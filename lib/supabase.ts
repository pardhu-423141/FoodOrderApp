
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ugqnqwtxlqerodtjduup.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVncW5xd3R4bHFlcm9kdGpkdXVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0ODQwODYsImV4cCI6MjA2MzA2MDA4Nn0.6MdhCq1v_jeIzJXheGA43unuGbF392go1H55hg3HbTU';

export const supabase = createClient(supabaseUrl, supabaseKey);