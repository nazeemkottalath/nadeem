import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Navbar          from './components/Navbar'
import Footer          from './components/Footer'
import DisclaimerPopup from './components/DisclaimerPopup'

import HomePage  from './pages/HomePage'
import BlogPage  from './pages/BlogPage'
import PostPage  from './pages/PostPage'
import AdminDashboard, { AdminLogin } from './pages/AdminPage'

import { fetchSettings, fetchAbout, fetchPracticeAreas, fetchPosts } from './lib/db'
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

  // Fetch all data on mount
  useEffect(() => {
    Promise.all([fetchSettings(), fetchAbout(), fetchPracticeAreas(), fetchPosts()])
      .then(([s, a, pa, p]) => {
        setSettings(s)
        setAbout(a)
        setPracticeAreas(pa)
        setPosts(p)
      })
      .catch(e => setLoadError(e.message))
      .finally(() => setLoading(false))
  }, [])

  // Update document title on route change
  useEffect(() => {
    if (settings) {
      document.title = `${settings.site_name} — ${settings.site_tagline}`
    }
    // Update meta description
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta) }
    if (settings) meta.content = settings.meta_desc
  }, [settings, location])

  if (loading) return (
    <div style={{ background: C.white, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: C.navy, fontFamily: "'DM Mono', monospace", fontSize: '0.85rem', letterSpacing: '0.2em' }}>Loading…</p>
    </div>
  )

  if (loadError) return (
    <div style={{ background: C.white, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', padding: '2rem' }}>
      <p style={{ color: C.red, fontFamily: "'DM Mono', monospace", fontSize: '0.9rem' }}>Failed to connect to Supabase.</p>
      <p style={{ color: C.textMuted, fontFamily: "'DM Mono', monospace", fontSize: '0.78rem' }}>Check that VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file.</p>
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
        a { transition: opacity 0.15s; }
        a:hover { opacity: 0.82; }
      `}</style>

      {!disclaimerAccepted && <DisclaimerPopup onAccept={() => setDisclaimerAccepted(true)} />}

      <Navbar settings={settings} />

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage about={about} practiceAreas={practiceAreas} />} />
          <Route path="/blog" element={<BlogPage posts={posts} />} />
          <Route path="/blog/:slug" element={<PostPage />} />
          <Route path="/admin" element={
            adminAuth
              ? <AdminDashboard
                  about={about}         setAbout={setAbout}
                  posts={posts}         setPosts={setPosts}
                  practiceAreas={practiceAreas} setPracticeAreas={setPracticeAreas}
                  settings={settings}   setSettings={setSettings}
                  onLogout={() => setAdminAuth(false)}
                />
              : <AdminLogin settings={settings} onLogin={() => setAdminAuth(true)} />
          } />
        </Routes>
      </main>

      <Footer about={about} settings={settings} />
    </div>
  )
}
