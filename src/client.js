import { createClient } from '@supabase/supabase-js'

const URL = 'https://pghlwqgfmfccdwlcymwg.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnaGx3cWdmbWZjY2R3bGN5bXdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0NTM1OTIsImV4cCI6MjAyOTAyOTU5Mn0.hEp8zYh1r0B9dvMXIqmW6dZJrfVkrmsq6L8McTFfOAg';

export const supabase = createClient(URL, API_KEY);
