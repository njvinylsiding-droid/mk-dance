# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Supabase setup

This app expects Supabase connection values from environment variables.

1. Copy `.env.example` to `.env`.
2. Set these values from your Supabase project settings:
   - `VITE_SUPABASE_URL` (for example: `https://your-project-ref.supabase.co`)
   - `VITE_SUPABASE_ANON_KEY` (the public anon key)
3. Restart the dev server after updating `.env`.

The client is initialized in `src/lib/supabase.ts` and will throw a clear error
if either value is missing.
