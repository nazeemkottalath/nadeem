import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchPostBySlug } from '../lib/db'
import { applySEO } from '../lib/seo'
import { C } from '../lib/theme'

export default function PostPage({ settings }) {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPostBySlug(slug)
      .then(setPost)
      .catch(() => setError('Post not found.'))
      .finally(() => setLoading(false))
  }, [slug])

  useEffect(() => {
    if (post && settings) applySEO({ page: 'post', post, settings })
  }, [post, settings])

  if (loading) return (
    <div style={{ background: C.offWhite, minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: C.textFaint, fontFamily: 'monospace' }}>Loading…</p>
    </div>
  )

  if (error || !post) return (
    <div style={{ background: C.offWhite, minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
      <p style={{ color: C.textMuted }}>Article not found.</p>
      <button onClick={() => navigate('/legal-insights')} style={{ background: 'none', border: `1px solid ${C.border}`, color: C.textMuted, cursor: 'pointer', padding: '8px 16px', borderRadius: 4, fontFamily: 'monospace', fontSize: '0.75rem' }}>← Back to Legal Insights</button>
    </div>
  )

  return (
    <article style={{ background: C.offWhite, minHeight: '60vh' }}>
      {/* Page header */}
      <section style={{ background: C.navy, padding: '3.5rem 1.5rem 3rem' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <button onClick={() => navigate('/legal-insights')} style={{ background: 'none', border: 'none', color: '#a8bcd4', cursor: 'pointer', fontFamily: 'monospace', fontSize: '0.72rem', letterSpacing: '0.08em', marginBottom: '1.25rem', padding: 0 }}>
            ← Legal Insights
          </button>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ background: 'rgba(201,168,76,0.18)', color: C.goldLight, padding: '3px 12px', borderRadius: 4, fontFamily: 'monospace', fontSize: '0.67rem', letterSpacing: '0.1em' }}>{post.category}</span>
            <time dateTime={new Date(post.created_at).toISOString()} style={{ color: '#7b93b8', fontFamily: 'monospace', fontSize: '0.72rem' }}>
              {new Date(post.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </time>
            {post.lang === 'ml' && (
              <span style={{ background: 'rgba(255,255,255,0.1)', color: '#a8bcd4', padding: '3px 10px', borderRadius: 4, fontFamily: 'monospace', fontSize: '0.65rem' }}>മലയാളം</span>
            )}
          </div>
          <h1 style={{ fontFamily: "'Manjari', Georgia, serif", color: C.white, fontSize: 'clamp(1.5rem,5vw,2.4rem)', margin: '0 0 1rem', lineHeight: 1.25, fontWeight: 700 }}>{post.title}</h1>
          <p style={{ color: '#a8bcd4', fontSize: '1rem', lineHeight: 1.7, fontStyle: 'italic', maxWidth: 680 }}>{post.excerpt}</p>
        </div>
      </section>

      {/* Cover image */}
      {post.cover_image && (
        <figure style={{ margin: 0, maxHeight: 460, overflow: 'hidden' }}>
          <img src={post.cover_image} alt={post.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={e => e.target.style.display = 'none'}
          />
        </figure>
      )}

      {/* Body */}
      <section style={{ padding: 'clamp(3rem,6vw,4.5rem) 1.5rem' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 7, padding: 'clamp(1.5rem,4vw,2.5rem)' }}>
            {(post.content || '').split('\n\n').map((para, i) => {
              if (para.startsWith('**') && para.endsWith('**')) {
                return <h2 key={i} style={{ fontFamily: "'Manjari', Georgia, serif", color: C.navy, fontSize: '1.2rem', fontWeight: 700, margin: '1.75rem 0 0.6rem' }}>{para.replace(/\*\*/g, '')}</h2>
              }
              if (para.includes('**')) {
                const parts = para.split('**')
                return (
                  <p key={i} style={{ color: C.textBody, fontSize: '1rem', lineHeight: 1.85, marginBottom: '1.1rem' }}>
                    {parts.map((pt, j) => j % 2 === 1 ? <strong key={j} style={{ color: C.navy }}>{pt}</strong> : pt)}
                  </p>
                )
              }
              return <p key={i} style={{ color: C.textBody, fontSize: '1rem', lineHeight: 1.85, marginBottom: '1.1rem' }}>{para}</p>
            })}
          </div>

          {/* Author footer */}
          <footer style={{ marginTop: '2rem', padding: '1.25rem 1.5rem', background: C.white, border: `1px solid ${C.border}`, borderRadius: 7, display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: C.navy, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.white, fontFamily: "'Manjari', serif", fontSize: '1.1rem', fontWeight: 700, flexShrink: 0 }}>N</div>
              <div>
                <div style={{ color: C.navy, fontFamily: "'Manjari', serif", fontSize: '0.95rem', fontWeight: 700 }}>{settings?.site_name || 'Nadeem Mohammed V.K'}</div>
                <div style={{ color: C.textMuted, fontFamily: 'monospace', fontSize: '0.68rem', letterSpacing: '0.08em' }}>Advocates & Legal Consultants · Kozhikode</div>
              </div>
            </div>
            <button onClick={() => navigate('/legal-insights')} style={{ background: 'none', border: `1px solid ${C.border}`, color: C.textMuted, cursor: 'pointer', padding: '8px 16px', borderRadius: 4, fontFamily: 'monospace', fontSize: '0.72rem' }}>← All Articles</button>
          </footer>
        </div>
      </section>
    </article>
  )
}
