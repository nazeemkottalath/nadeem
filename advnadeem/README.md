# advnadeem.com — Deployment Guide

Complete step-by-step guide to deploy this site live using Supabase + Vercel.
Estimated total time: **20–30 minutes**.

---

## Step 1 — Set up Supabase (free)

1. Go to **https://supabase.com** → Sign up / Log in
2. Click **"New Project"**
   - Organization: your name or "Personal"
   - Project name: `advnadeem`
   - Database password: choose a strong password and save it somewhere safe
   - Region: **Southeast Asia (Singapore)** — closest to Kerala
3. Wait ~2 minutes for the project to be ready

### Run the database schema

4. In your Supabase dashboard, click **"SQL Editor"** in the left sidebar
5. Click **"New Query"**
6. Open the file `supabase_schema.sql` from this folder
7. Copy the entire contents and paste into the SQL editor
8. Click **"Run"** (or press Ctrl+Enter)
9. You should see "Success. No rows returned" — this means all tables and seed data were created

### Get your API keys

10. Go to **Project Settings → API** (gear icon in sidebar)
11. Note down:
    - **Project URL** — looks like `https://abcdefghijkl.supabase.co`
    - **anon / public key** — a long string starting with `eyJ...`
    - **service_role key** — another long string (keep this secret!)

---

## Step 2 — Set up the project locally

```bash
# Clone or download this folder, then:
cd advnadeem

# Install dependencies
npm install

# Copy the env template
cp .env.example .env
```

Open `.env` in any text editor and fill in your Supabase values:

```
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...your anon key...
SUPABASE_SERVICE_ROLE_KEY=eyJ...your service role key...
```

### Test locally

```bash
npm run dev
```

Open http://localhost:5173 — you should see the site with data from Supabase.

---

## Step 3 — Push to GitHub

1. Go to **https://github.com** → New repository
   - Name: `advnadeem` (or any name)
   - Private: recommended
   - Don't add README (we already have files)

2. In your terminal:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/advnadeem.git
git branch -M main
git push -u origin main
```

---

## Step 4 — Deploy to Vercel (free)

1. Go to **https://vercel.com** → Sign up with GitHub
2. Click **"Add New Project"**
3. Select your `advnadeem` repository
4. Vercel auto-detects Vite — the defaults are correct, no changes needed
5. Click **"Environment Variables"** and add:

   | Name                       | Value                              |
   |----------------------------|------------------------------------|
   | `VITE_SUPABASE_URL`        | https://YOUR_PROJECT_ID.supabase.co|
   | `VITE_SUPABASE_ANON_KEY`   | eyJ...your anon key...             |

   > Do NOT add the service_role key to Vercel (not needed for this setup)

6. Click **"Deploy"**
7. In ~60 seconds your site is live at `https://advnadeem.vercel.app`

---

## Step 5 — Connect your custom domain (optional)

1. In Vercel dashboard → your project → **Settings → Domains**
2. Add your domain (e.g. `advnadeem.com`)
3. Vercel gives you DNS records — add them in your domain registrar (GoDaddy, Namecheap, etc.)
4. HTTPS is automatic — no extra setup needed

---

## Using the Admin Dashboard

1. Go to `https://yoursite.com/admin`
2. Enter PIN: **1234** (change this in Admin → Settings after first login)
3. You can:
   - **Posts tab** — create, edit, delete articles
   - **About tab** — update bio, phone, address, practice areas
   - **Settings tab** — change site name, tagline, SEO description, admin PIN

All changes save directly to Supabase and appear live immediately.

---

## Supabase Row Level Security (RLS)

The schema sets up RLS so that:
- **Anyone** can read published posts, about info, and practice areas
- **No one** can write via the browser without the anon key being explicitly granted write access

This means the admin writes (create/update/delete) work because Supabase's anon key is being used — which is acceptable for a low-risk CMS like this. If you want stricter security in future, the next step is adding Supabase Auth (email/password login) and updating the RLS policies to require authentication for writes.

---

## Updating Content Without the Admin UI

You can also edit content directly in **Supabase Dashboard → Table Editor**:
- `settings` table — site-wide settings (1 row)
- `about` table — advocate bio and contact info (1 row)
- `practice_areas` table — the 6 service cards
- `posts` table — all blog articles

---

## Project Structure

```
advnadeem/
├── index.html                 # HTML entry point
├── vite.config.js             # Vite config
├── vercel.json                # SPA routing for Vercel
├── package.json
├── .env.example               # Copy to .env and fill in keys
├── supabase_schema.sql        # Paste into Supabase SQL Editor
└── src/
    ├── main.jsx               # React entry point
    ├── App.jsx                # Routing + global data fetch
    ├── lib/
    │   ├── supabase.js        # Supabase client
    │   ├── db.js              # All database functions
    │   └── theme.js           # Design tokens (colors, input styles)
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   └── DisclaimerPopup.jsx
    └── pages/
        ├── HomePage.jsx
        ├── BlogPage.jsx
        ├── PostPage.jsx       # Dynamic /blog/:slug
        └── AdminPage.jsx      # Login + full dashboard
```
