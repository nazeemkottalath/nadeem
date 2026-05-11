import { useState } from 'react'
import { C, IS, TS } from '../lib/theme'
import {
  updateSettings, updateAbout,
  fetchAllPosts, createPost, updatePost, deletePost,
  upsertPracticeArea, deletePracticeArea,
} from '../lib/db'

const CATEGORIES = ['Law', 'History', 'Politics', 'Travel', 'Other']

// ── Shared Field wrapper ──────────────────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <label style={{ display: 'block', color: C.textMuted, fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{label}</label>
      {children}
    </div>
  )
}

// ── PIN Login ─────────────────────────────────────────────────────────────────
export function AdminLogin({ settings, onLogin }) {
  const [pin, setPin] = useState('')
  const [err, setErr] = useState(false)
  const check = () => {
    if (pin === settings?.admin_pin) { setErr(false); onLogin() }
    else { setErr(true); setPin('') }
  }
  return (
    <div style={{ background: C.offWhite, minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ background: C.white, border: `1px solid ${C.border}`, borderTop: `4px solid ${C.navy}`, borderRadius: 8, padding: '2.5rem', width: '100%', maxWidth: 360, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <h2 style={{ fontFamily: "'Manjari', Georgia, serif", color: C.navy, fontSize: '1.4rem', margin: '0 0 0.5rem' }}>Admin Access</h2>
        <p style={{ color: C.textMuted, fontSize: '0.9rem', marginBottom: '1.5rem' }}>Enter your PIN to manage the website.</p>
        <input type="password" value={pin} onChange={e => setPin(e.target.value)} onKeyDown={e => e.key === 'Enter' && check()}
          placeholder="Enter PIN" maxLength={8}
          style={{ ...IS, border: `1px solid ${err ? C.red : C.borderDark}`, fontSize: '1.1rem', letterSpacing: '0.3em' }}
        />
        {err && <p style={{ color: C.red, fontSize: '0.82rem', marginTop: '0.5rem' }}>Incorrect PIN. Please try again.</p>}
        <button onClick={check} style={{ width: '100%', background: C.navy, color: C.white, border: 'none', borderRadius: 6, padding: '12px', fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.1em', cursor: 'pointer', marginTop: '1rem' }}>ENTER</button>
      </div>
    </div>
  )
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function AdminDashboard({ about, setAbout, posts, setPosts, practiceAreas, setPracticeAreas, settings, setSettings, onLogout }) {
  const [tab, setTab] = useState('posts')
  const [editPost, setEditPost] = useState(null)
  const [newPost, setNewPost] = useState(null)
  const [editAbout, setEditAbout] = useState(null)
  const [editSettings, setEditSettings] = useState(null)
  const [saved, setSaved] = useState('')
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState('')

  const flash = msg => { setSaved(msg); setTimeout(() => setSaved(''), 2400) }
  const fail  = msg => { setErr(msg);   setTimeout(() => setErr(''),   4000) }

  // Posts
  const handleSavePost = async p => {
    setSaving(true)
    try {
      if (posts.find(x => x.id === p.id)) {
        const updated = await updatePost(p.id, { title: p.title, slug: p.slug, category: p.category, excerpt: p.excerpt, content: p.content, published: p.published ?? true })
        setPosts(posts.map(x => x.id === updated.id ? updated : x))
      } else {
        const created = await createPost({ title: p.title, slug: p.slug, category: p.category, excerpt: p.excerpt, content: p.content, lang: p.lang || 'en', published: true })
        setPosts([created, ...posts])
      }
      setEditPost(null); setNewPost(null); flash('Post saved.')
    } catch(e) { fail('Save failed: ' + e.message) }
    setSaving(false)
  }

  const handleDeletePost = async id => {
    if (!confirm('Delete this post permanently?')) return
    setSaving(true)
    try {
      await deletePost(id)
      setPosts(posts.filter(p => p.id !== id)); flash('Post deleted.')
    } catch(e) { fail('Delete failed: ' + e.message) }
    setSaving(false)
  }

  // About
  const handleSaveAbout = async a => {
    setSaving(true)
    try {
      const updated = await updateAbout({ name: a.name, title: a.title, tagline: a.tagline, bio: a.bio, phone: a.phone, address: a.address, map_url: a.map_url, disclaimer: a.disclaimer })
      setAbout(updated); setEditAbout(null); flash('About page saved.')
    } catch(e) { fail('Save failed: ' + e.message) }
    setSaving(false)
  }

  // Settings
  const handleSaveSettings = async s => {
    setSaving(true)
    try {
      const updated = await updateSettings({ site_name: s.site_name, site_tagline: s.site_tagline, meta_desc: s.meta_desc, admin_pin: s.admin_pin })
      setSettings(updated); setEditSettings(null); flash('Settings saved.')
    } catch(e) { fail('Save failed: ' + e.message) }
    setSaving(false)
  }

  const Tab = ({ id, label }) => (
    <button onClick={() => setTab(id)} style={{ background: tab === id ? C.navy : C.white, border: `1px solid ${tab === id ? C.navy : C.border}`, color: tab === id ? C.white : C.textMuted, padding: '8px 20px', borderRadius: 5, cursor: 'pointer', fontFamily: "'DM Mono', monospace", fontSize: '0.75rem', letterSpacing: '0.08em' }}>{label}</button>
  )

  return (
    <div style={{ background: C.offWhite, minHeight: '60vh', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h1 style={{ fontFamily: "'Manjari', Georgia, serif", color: C.navy, fontSize: '1.75rem', margin: 0 }}>Admin Dashboard</h1>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {saved && <span style={{ color: C.green, fontFamily: "'DM Mono', monospace", fontSize: '0.78rem' }}>✓ {saved}</span>}
            {err   && <span style={{ color: C.red,   fontFamily: "'DM Mono', monospace", fontSize: '0.78rem' }}>✗ {err}</span>}
            {saving && <span style={{ color: C.textMuted, fontFamily: "'DM Mono', monospace", fontSize: '0.78rem' }}>Saving…</span>}
            <button onClick={onLogout} style={{ background: 'none', border: `1px solid ${C.border}`, color: C.textMuted, padding: '7px 16px', borderRadius: 5, cursor: 'pointer', fontFamily: "'DM Mono', monospace", fontSize: '0.75rem' }}>Log Out</button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <Tab id="posts" label="Posts" />
          <Tab id="about" label="About Page" />
          <Tab id="settings" label="Settings" />
        </div>

        {/* ── POSTS ──────────────────────────────────────────────────────── */}
        {tab === 'posts' && !editPost && !newPost && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ color: C.navy, fontFamily: "'Manjari', Georgia, serif", fontSize: '1.2rem', margin: 0 }}>All Posts ({posts.length})</h2>
              <button onClick={() => setNewPost({ id: '__new__', title: '', slug: '', category: 'Law', excerpt: '', content: '', lang: 'en' })}
                style={{ background: C.navy, color: C.white, border: 'none', padding: '9px 20px', borderRadius: 5, cursor: 'pointer', fontFamily: "'DM Mono', monospace", fontSize: '0.78rem', fontWeight: 700 }}>+ New Post</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {posts.map(p => (
                <div key={p.id} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 7, padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ color: C.navy, fontFamily: "'Manjari', Georgia, serif", fontSize: '1rem', marginBottom: '0.2rem' }}>{p.title}</div>
                    <div style={{ color: C.textFaint, fontFamily: "'DM Mono', monospace", fontSize: '0.7rem' }}>{p.category} · {new Date(p.created_at).toLocaleDateString('en-GB')}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => setEditPost({ ...p })} style={{ background: 'none', border: `1px solid ${C.border}`, color: C.textBody, padding: '6px 14px', borderRadius: 4, cursor: 'pointer', fontFamily: "'DM Mono', monospace", fontSize: '0.7rem' }}>Edit</button>
                    <button onClick={() => handleDeletePost(p.id)} style={{ background: 'none', border: `1px solid ${C.red}`, color: C.red, padding: '6px 14px', borderRadius: 4, cursor: 'pointer', fontFamily: "'DM Mono', monospace", fontSize: '0.7rem' }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(editPost || newPost) && (
          <PostEditor post={editPost || newPost} onSave={handleSavePost} onCancel={() => { setEditPost(null); setNewPost(null) }} saving={saving} />
        )}

        {/* ── ABOUT ──────────────────────────────────────────────────────── */}
        {tab === 'about' && !editAbout && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ color: C.navy, fontFamily: "'Manjari', Georgia, serif", fontSize: '1.2rem', margin: 0 }}>About Page Content</h2>
              <button onClick={() => setEditAbout({ ...about })} style={{ background: C.navy, color: C.white, border: 'none', padding: '9px 20px', borderRadius: 5, cursor: 'pointer', fontFamily: "'DM Mono', monospace", fontSize: '0.78rem', fontWeight: 700 }}>Edit</button>
            </div>
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 7, padding: '1.75rem' }}>
              {[['Name', about?.name], ['Title', about?.title], ['Phone', about?.phone], ['Address', about?.address]].map(([k, v]) => (
                <div key={k} style={{ marginBottom: '0.9rem' }}>
                  <div style={{ color: C.textFaint, fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>{k}</div>
                  <div style={{ color: C.textBody, fontSize: '0.9rem' }}>{v}</div>
                </div>
              ))}
              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: '1rem', marginTop: '0.5rem' }}>
                <div style={{ color: C.textFaint, fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Bio (preview)</div>
                <div style={{ color: C.textMuted, fontSize: '0.875rem' }}>{(about?.bio || '').slice(0, 220)}…</div>
              </div>
            </div>
          </div>
        )}
        {tab === 'about' && editAbout && (
          <AboutEditor about={editAbout} setAbout={setEditAbout} onSave={handleSaveAbout} onCancel={() => setEditAbout(null)} saving={saving}
            practiceAreas={practiceAreas} setPracticeAreas={setPracticeAreas}
          />
        )}

        {/* ── SETTINGS ───────────────────────────────────────────────────── */}
        {tab === 'settings' && !editSettings && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ color: C.navy, fontFamily: "'Manjari', Georgia, serif", fontSize: '1.2rem', margin: 0 }}>Site Settings</h2>
              <button onClick={() => setEditSettings({ ...settings })} style={{ background: C.navy, color: C.white, border: 'none', padding: '9px 20px', borderRadius: 5, cursor: 'pointer', fontFamily: "'DM Mono', monospace", fontSize: '0.78rem', fontWeight: 700 }}>Edit</button>
            </div>
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 7, padding: '1.75rem' }}>
              {[['Site Name', settings?.site_name], ['Tagline', settings?.site_tagline], ['Meta Description', settings?.meta_desc], ['Admin PIN', '••••']].map(([k, v]) => (
                <div key={k} style={{ marginBottom: '0.9rem' }}>
                  <div style={{ color: C.textFaint, fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>{k}</div>
                  <div style={{ color: C.textBody, fontSize: '0.9rem' }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab === 'settings' && editSettings && (
          <SettingsEditor settings={editSettings} setSettings={setEditSettings} onSave={handleSaveSettings} onCancel={() => setEditSettings(null)} saving={saving} />
        )}
      </div>
    </div>
  )
}

// ── Post Editor ───────────────────────────────────────────────────────────────
function PostEditor({ post, onSave, onCancel, saving }) {
  const [p, setP] = useState(post)
  const set = (k, v) => setP(prev => ({ ...prev, [k]: v }))
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ color: C.navy, fontFamily: "'Manjari', Georgia, serif", fontSize: '1.2rem', margin: 0 }}>{post.id === '__new__' ? 'New Post' : 'Edit Post'}</h2>
        <button onClick={onCancel} style={{ background: 'none', border: `1px solid ${C.border}`, color: C.textMuted, padding: '7px 16px', borderRadius: 5, cursor: 'pointer', fontFamily: "'DM Mono', monospace", fontSize: '0.75rem' }}>Cancel</button>
      </div>
      <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 7, padding: '1.75rem' }}>
        <Field label="Title"><input value={p.title} onChange={e => set('title', e.target.value)} style={IS} /></Field>
        <Field label="URL Slug (e.g. anticipatory-bail-india)"><input value={p.slug} onChange={e => set('slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))} style={IS} /></Field>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Field label="Category">
            <select value={p.category} onChange={e => set('category', e.target.value)} style={IS}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Language">
            <select value={p.lang || 'en'} onChange={e => set('lang', e.target.value)} style={IS}>
              <option value="en">English</option>
              <option value="ml">Malayalam</option>
            </select>
          </Field>
        </div>
        <Field label="Excerpt / Summary (shown on listing page)">
          <textarea value={p.excerpt} onChange={e => set('excerpt', e.target.value)} rows={3} style={TS} />
        </Field>
        <Field label="Full Content (separate paragraphs with a blank line; use **bold** for headings)">
          <textarea value={p.content} onChange={e => set('content', e.target.value)} rows={14} style={TS} />
        </Field>
        <button onClick={() => onSave(p)} disabled={saving}
          style={{ background: saving ? C.textFaint : C.navy, color: C.white, border: 'none', padding: '11px 26px', borderRadius: 5, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em' }}>
          {saving ? 'Saving…' : 'Save Post'}
        </button>
      </div>
    </div>
  )
}

// ── About Editor ──────────────────────────────────────────────────────────────
function AboutEditor({ about, setAbout, onSave, onCancel, saving, practiceAreas, setPracticeAreas }) {
  const set = (k, v) => setAbout(prev => ({ ...prev, [k]: v }))

  const handleUpsertArea = async (area) => {
    try {
      const saved = await upsertPracticeArea(area)
      setPracticeAreas(prev => prev.find(x => x.id === saved.id) ? prev.map(x => x.id === saved.id ? saved : x) : [...prev, saved])
    } catch (e) { alert('Failed to save area: ' + e.message) }
  }

  const handleDeleteArea = async (id) => {
    if (!confirm('Delete this practice area?')) return
    try {
      await deletePracticeArea(id)
      setPracticeAreas(prev => prev.filter(x => x.id !== id))
    } catch (e) { alert('Failed to delete: ' + e.message) }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ color: C.navy, fontFamily: "'Manjari', Georgia, serif", fontSize: '1.2rem', margin: 0 }}>Edit About Page</h2>
        <button onClick={onCancel} style={{ background: 'none', border: `1px solid ${C.border}`, color: C.textMuted, padding: '7px 16px', borderRadius: 5, cursor: 'pointer', fontFamily: "'DM Mono', monospace", fontSize: '0.75rem' }}>Cancel</button>
      </div>
      <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 7, padding: '1.75rem' }}>
        <Field label="Full Name"><input value={about.name || ''} onChange={e => set('name', e.target.value)} style={IS} /></Field>
        <Field label="Title / Designation"><input value={about.title || ''} onChange={e => set('title', e.target.value)} style={IS} /></Field>
        <Field label="Hero Tagline"><input value={about.tagline || ''} onChange={e => set('tagline', e.target.value)} style={IS} /></Field>
        <Field label="Phone Number"><input value={about.phone || ''} onChange={e => set('phone', e.target.value)} style={IS} /></Field>
        <Field label="Office Address"><input value={about.address || ''} onChange={e => set('address', e.target.value)} style={IS} /></Field>
        <Field label="Google Maps URL"><input value={about.map_url || ''} onChange={e => set('map_url', e.target.value)} style={IS} /></Field>
        <Field label="Biography (blank line between paragraphs)">
          <textarea value={about.bio || ''} onChange={e => set('bio', e.target.value)} rows={10} style={TS} />
        </Field>
        <Field label="Disclaimer Text">
          <textarea value={about.disclaimer || ''} onChange={e => set('disclaimer', e.target.value)} rows={3} style={TS} />
        </Field>

        <button onClick={() => onSave(about)} disabled={saving}
          style={{ background: saving ? C.textFaint : C.navy, color: C.white, border: 'none', padding: '11px 26px', borderRadius: 5, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em', marginBottom: '2rem' }}>
          {saving ? 'Saving…' : 'Save About Page'}
        </button>

        {/* Practice Areas — saved directly to Supabase row by row */}
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <label style={{ color: C.textMuted, fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Practice Areas</label>
            <button onClick={() => handleUpsertArea({ icon: '📋', title: 'New Area', description: '', sort_order: practiceAreas.length + 1 })}
              style={{ background: 'none', border: `1px solid ${C.navy}`, color: C.navy, padding: '5px 14px', borderRadius: 4, cursor: 'pointer', fontFamily: "'DM Mono', monospace", fontSize: '0.7rem' }}>+ Add Area</button>
          </div>
          {practiceAreas.map(a => (
            <div key={a.id} style={{ background: C.offWhite, borderRadius: 6, padding: '0.9rem', marginBottom: '0.75rem', display: 'grid', gridTemplateColumns: '50px 1fr 1fr auto', gap: '0.5rem', alignItems: 'start' }}>
              <input defaultValue={a.icon} onBlur={e => handleUpsertArea({ ...a, icon: e.target.value })} style={{ ...IS, textAlign: 'center', fontSize: '1.2rem', padding: '8px' }} />
              <input defaultValue={a.title} onBlur={e => handleUpsertArea({ ...a, title: e.target.value })} placeholder="Title" style={{ ...IS, fontSize: '0.875rem' }} />
              <input defaultValue={a.description} onBlur={e => handleUpsertArea({ ...a, description: e.target.value })} placeholder="Description" style={{ ...IS, fontSize: '0.875rem' }} />
              <button onClick={() => handleDeleteArea(a.id)} style={{ background: 'none', border: `1px solid ${C.red}`, color: C.red, padding: '8px', borderRadius: 4, cursor: 'pointer', fontSize: '0.75rem' }}>✕</button>
            </div>
          ))}
          <p style={{ color: C.textFaint, fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', marginTop: '0.5rem' }}>Practice areas save automatically when you click outside each field.</p>
        </div>
      </div>
    </div>
  )
}

// ── Settings Editor ───────────────────────────────────────────────────────────
function SettingsEditor({ settings, setSettings, onSave, onCancel, saving }) {
  const set = (k, v) => setSettings(prev => ({ ...prev, [k]: v }))
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ color: C.navy, fontFamily: "'Manjari', Georgia, serif", fontSize: '1.2rem', margin: 0 }}>Edit Settings</h2>
        <button onClick={onCancel} style={{ background: 'none', border: `1px solid ${C.border}`, color: C.textMuted, padding: '7px 16px', borderRadius: 5, cursor: 'pointer', fontFamily: "'DM Mono', monospace", fontSize: '0.75rem' }}>Cancel</button>
      </div>
      <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 7, padding: '1.75rem' }}>
        <Field label="Site Name"><input value={settings.site_name || ''} onChange={e => set('site_name', e.target.value)} style={IS} /></Field>
        <Field label="Site Tagline"><input value={settings.site_tagline || ''} onChange={e => set('site_tagline', e.target.value)} style={IS} /></Field>
        <Field label="SEO Meta Description"><input value={settings.meta_desc || ''} onChange={e => set('meta_desc', e.target.value)} style={IS} /></Field>
        <Field label="Admin PIN">
          <input type="password" value={settings.admin_pin || ''} onChange={e => set('admin_pin', e.target.value)} style={IS} />
        </Field>
        <div style={{ background: '#fffbef', border: '1px solid #e8d9a0', borderRadius: 6, padding: '1rem', marginBottom: '1.25rem' }}>
          <p style={{ color: C.textMuted, fontSize: '0.82rem', lineHeight: 1.6 }}>
            ⚠️ Changing the PIN here updates it in the Supabase <code>settings</code> table. Make sure to remember your new PIN.
          </p>
        </div>
        <button onClick={() => onSave(settings)} disabled={saving}
          style={{ background: saving ? C.textFaint : C.navy, color: C.white, border: 'none', padding: '11px 26px', borderRadius: 5, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em' }}>
          {saving ? 'Saving…' : 'Save Settings'}
        </button>
      </div>
    </div>
  )
}
