import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchPostBySlug } from '../lib/db'
import { C } from '../lib/theme'

export default function PostPage() {
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

  // Update page title
  useEffect(() => {
    if (post) document.title = `${post.title} | Nadeem Mohammed V.K`
  }, [post])

  if (loading) return (
    <div style={{ background: C.offWhite, minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: C.textFaint, fontFamily: "'DM Mono', monospace" }}>Loading…</p>
    </div>
  )

  if (error || !post) return (
    <div style={{ background: C.offWhite, minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
      <p style={{ color: C.textMuted }}>Post not found.</p>
      <button onClick={() => navigate('/blog')} style={{ background: 'none', border: `1px solid ${C.border}`, color: C.textMuted, cursor: 'pointer', padding: '8px 16px', borderRadius: 4, fontFamily: "'DM Mono', monospace", fontSize: '0.75rem' }}>← Back to Articles</button>
    </div>
  )

  return (
    <div style={{ background: C.offWhite, minHeight: '60vh', padding: '3rem 1.5rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <button onClick={() => navigate('/blog')} style={{ background: 'none', border: `1px solid ${C.border}`, color: C.textMuted, cursor: 'pointer', fontFamily: "'DM Mono', monospace", fontSize: '0.75rem', letterSpacing: '0.1em', padding: '7px 14px', borderRadius: 4, marginBottom: '2rem' }}>
          ← Back to Articles
        </button>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ background: '#eef2fa', color: C.navy, padding: '4px 12px', borderRadius: 4, fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', letterSpacing: '0.08em' }}>{post.category}</span>
          <span style={{ color: C.textFaint, fontFamily: "'DM Mono', monospace", fontSize: '0.72rem' }}>
            {new Date(post.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>

        <h1 style={{ fontFamily: "'Manjari', Georgia, serif", color: C.navy, fontSize: 'clamp(1.5rem,5vw,2.2rem)', margin: '0 0 1rem', lineHeight: 1.3 }}>{post.title}</h1>

        <p style={{ color: C.textMuted, fontSize: '1rem', fontStyle: 'italic', borderLeft: `4px solid ${C.navy}`, paddingLeft: '1.1rem', marginBottom: '2rem', lineHeight: 1.7 }}>{post.excerpt}</p>

        <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 7, padding: '2rem' }}>
          {(post.content || '').split('\n\n').map((para, i) => {
            if (para.startsWith('**') && para.endsWith('**')) {
              return <h3 key={i} style={{ fontFamily: "'Manjari', Georgia, serif", color: C.navy, fontSize: '1.1rem', margin: '1.5rem 0 0.5rem' }}>{para.replace(/\*\*/g, '')}</h3>
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
      </div>
    </div>
  )
}
