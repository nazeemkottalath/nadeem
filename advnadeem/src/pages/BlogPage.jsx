import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { C } from '../lib/theme'

const CATEGORIES = ['All', 'Law', 'History', 'Politics', 'Travel', 'Other']

export default function BlogPage({ posts }) {
  const [cat, setCat] = useState('All')
  const navigate = useNavigate()
  const filtered = cat === 'All' ? posts : posts.filter(p => p.category === cat)

  return (
    <div style={{ background: C.offWhite, minHeight: '60vh', padding: '3rem 1.5rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <p style={{ color: C.gold, fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Writing</p>
        <h1 style={{ fontFamily: "'Manjari', Georgia, serif", color: C.navy, fontSize: 'clamp(1.75rem,5vw,2.4rem)', margin: '0 0 1.5rem' }}>Articles &amp; Notes</h1>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              background: cat === c ? C.navy : C.white,
              border: `1px solid ${cat === c ? C.navy : C.border}`,
              color: cat === c ? C.white : C.textMuted,
              padding: '6px 16px', borderRadius: 99, cursor: 'pointer',
              fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', letterSpacing: '0.06em',
            }}>{c}</button>
          ))}
        </div>

        {filtered.length === 0 && (
          <p style={{ color: C.textFaint, textAlign: 'center', padding: '3rem 0' }}>No posts in this category yet.</p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filtered.map(post => (
            <article key={post.id}
              onClick={() => navigate(`/blog/${post.slug}`)}
              style={{ background: C.white, border: `1px solid ${C.border}`, borderLeft: `4px solid ${C.navy}`, borderRadius: 7, overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.09)'; e.currentTarget.style.borderLeftColor = C.gold }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderLeftColor = C.navy }}
            >
              {post.cover_image && (
                <img src={post.cover_image} alt={post.title}
                  style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block', flexShrink: 0 }}
                  onError={e => e.target.style.display = 'none'}
                />
              )}
              <div style={{ padding: '1.5rem 1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span style={{ background: '#eef2fa', color: C.navy, padding: '3px 10px', borderRadius: 4, fontFamily: "'DM Mono', monospace", fontSize: '0.67rem', letterSpacing: '0.08em' }}>{post.category}</span>
                  <span style={{ color: C.textFaint, fontFamily: "'DM Mono', monospace", fontSize: '0.72rem' }}>
                    {new Date(post.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <h2 style={{ fontFamily: "'Manjari', Georgia, serif", color: C.navy, fontSize: '1.2rem', margin: '0 0 0.5rem', lineHeight: 1.4 }}>{post.title}</h2>
                <p style={{ color: C.textMuted, fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>{post.excerpt}</p>
                <p style={{ color: C.gold, fontSize: '0.82rem', marginTop: '0.75rem', fontFamily: "'DM Mono', monospace" }}>Read more →</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
