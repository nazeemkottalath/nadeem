import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Navbar           from './components/Navbar'
import Footer           from './components/Footer'
import DisclaimerPopup  from './components/DisclaimerPopup'

import HomePage         from './pages/HomePage'
import AboutPage        from './pages/AboutPage'
import PracticeAreasPage from './pages/PracticeAreasPage'
import LegalInsightsPage from './pages/LegalInsightsPage'
import PostPage         from './pages/PostPage'
import AdminDashboard, { AdminLogin } from './pages/AdminPage'
import ContactPage      from './pages/ContactPage'

import { fetchSettings, fetchAbout, fetchPracticeAreas, fetchPosts } from './lib/db'
import { applySEO } from './lib/seo'
import { C } from './lib/theme'

export default function App() {
  const location = useLocation()

  const [settings,      setSettings]      = useState(null)
  const [about,         setAbout]         = useState(null)
  const [practiceAreas, setPracticeAreas] = useState([])
  const [posts,         setPosts]         = useState([])
  const [loading,       setLoading]       = useState(true)
  const [loadError,     setLoadError]     = useState(null)
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false)
  const [adminAuth,          setAdminAuth]          = useState(false)

  useEffect(() => {
    Promise.all([fetchSettings(), fetchAbout(), fetchPracticeAreas(), fetchPosts()])
      .then(([s, a, pa, p]) => { setSettings(s); setAbout(a); setPracticeAreas(pa); setPosts(p) })
      .catch(e => setLoadError(e.message))
      .finally(() => setLoading(false))
  }, [])

  // Apply SEO on every route change
  useEffect(() => {
    if (!settings || !about) return
    const path = location.pathname
    if (path === '/') applySEO({ page: 'home', about, settings })
    else if (path === '/legal-insights') applySEO({ page: 'blog', about, settings })
  }, [location.pathname, settings, about])

  if (loading) return (
    <div style={{ background: C.white, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: C.navy, fontFamily: "'Manjari', sans-serif", fontSize: '0.85rem', letterSpacing: '0.2em' }}>Loading…</p>
    </div>
  )

  if (loadError) return (
    <div style={{ background: C.white, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', padding: '2rem', textAlign: 'center' }}>
      <p style={{ color: C.red, fontSize: '0.9rem' }}>Failed to connect to Supabase.</p>
      <p style={{ color: C.textMuted, fontSize: '0.78rem' }}>Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your Vercel environment variables.</p>
      <code style={{ background: C.offWhite, border: `1px solid ${C.border}`, borderRadius: 4, padding: '8px 14px', fontSize: '0.78rem', color: C.textBody }}>{loadError}</code>
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: C.offWhite }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${C.offWhite}; overflow: ${disclaimerAccepted ? 'auto' : 'hidden'}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${C.offWhite}; }
        ::-webkit-scrollbar-thumb { background: ${C.borderDark}; border-radius: 3px; }
        textarea, input, select { font-family: inherit; }
        a { transition: opacity 0.15s; } a:hover { opacity: 0.82; }
      `}</style>

      {!disclaimerAccepted && <DisclaimerPopup onAccept={() => setDisclaimerAccepted(true)} />}

      <Navbar />

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/"                          element={<HomePage />} />
          <Route path="/about"                     element={<AboutPage />} />
          <Route path="/practice-areas"            element={<PracticeAreasPage />} />
          <Route path="/practice-areas/:slug"      element={<PracticeAreasPage />} />
          <Route path="/legal-insights"            element={<LegalInsightsPage posts={posts} />} />
          <Route path="/legal-insights/:slug"      element={<PostPage settings={settings} />} />
          <Route path="/contact"                   element={<ContactPage />} />
          <Route path="/admin"                     element={
            adminAuth
              ? <AdminDashboard
                  about={about}                 setAbout={setAbout}
                  posts={posts}                 setPosts={setPosts}
                  practiceAreas={practiceAreas} setPracticeAreas={setPracticeAreas}
                  settings={settings}           setSettings={setSettings}
                  onLogout={() => setAdminAuth(false)}
                />
              : <AdminLogin settings={settings} onLogin={() => setAdminAuth(true)} />
          } />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}
