EyeScan / EyeLabel — Supabase-connected clinical eye image labeling portal

Requirements
- Node.js 18 or newer (uses native fetch; no npm dependencies required)

Local run
1. Open a terminal in the eyescan folder.
2. (Optional) Copy .env.example to .env and adjust values.
3. Run: npm start   (or: node server.js)
4. Open: http://localhost:3000

Supabase
- Authentication: Supabase Auth (email/password)
- Database tables: public.profiles, public.eye_images
- Storage: private bucket eye-images (files stored under each Auth user ID)
- Security: use only the publishable/anon key in this app. Do NOT add service_role or secret keys.

Deployment
- Backend (Railway): deploy from the repository with the service root directory set to `/eyescan` and start command `npm start`.
  Set `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, and `SUPABASE_STORAGE_BUCKET`. Railway provides `PORT`.
  Health check: GET /api/health
- Frontend (Vercel): set the project root directory to `eyescan`. The included `vercel.json` builds the static site in `public`.
  Set `API_BASE_URL` to the Railway backend origin (e.g. https://your-app.up.railway.app), without a trailing slash.
  Vercel builds fail when `API_BASE_URL` is missing, to prevent deploying a frontend that points its API requests at Vercel.
  For tighter cross-origin access, set the Railway variable `CORS_ALLOW_ORIGIN` to the Vercel site origin.

Notes
- db.json and uploads/ are legacy local backups retained in the repo; the running app uses Supabase.
- If sign-in reports "email not confirmed", verify the user in Supabase Auth or confirm via email.
- Configure Supabase Auth URL Configuration (Site URL / Redirect URLs) for your deployed domains.
- The Supabase publishable key is safe for browser-facing apps; never configure a Supabase secret or service-role key here.
