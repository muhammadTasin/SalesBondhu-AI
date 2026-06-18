export function validateEnv() {
  const requiredPublicEnv = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'];
  
  for (const key of requiredPublicEnv) {
    if (!import.meta.env[key]) {
      throw new Error(`Missing required public config: ${key}`);
    }
  }

  const dangerousPrefixes = [
    'VITE_GEMINI',
    'VITE_OPENAI',
    'VITE_CLAUDE',
    'VITE_SUPABASE_SERVICE',
    'VITE_SERVICE_ROLE',
    'VITE_DB_PASSWORD',
    'VITE_CLIENT_DATA',
    'VITE_ERP',
    'VITE_GPS_SECRET'
  ];

  for (const key of Object.keys(import.meta.env)) {
    for (const dangerous of dangerousPrefixes) {
      if (key.startsWith(dangerous) || key === dangerous) {
        throw new Error("Security error: secret-like environment variable is exposed to frontend.");
      }
    }
  }
}
