import { useNavigate } from 'react-router-dom'
import { C } from '../lib/theme'

export default function HomePage({ about, practiceAreas }) {
  const navigate = useNavigate()

  if (!about) return (
    <div style={{ background: C.offWhite, minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: C.textFaint, fontFamily: "'DM Mono', monospace", fontSize: '0.85rem' }}>Loading…</p>
    </div>
  )

  return (
    <div style={{ background: C.offWhite }}>

      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${C.navy} 0%, #1e3060 100%)`, padding: '4.5rem 1.5rem 3.5rem' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 4, padding: '5px 16px', marginBottom: '1.5rem' }}>
            <span style={{ color: '#c9daf8', fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Kozhikode · Kerala</span>
          </div>
          <h1 style={{ fontFamily: "'Manjari', Georgia, serif", color: C.white, fontSize: 'clamp(2rem,6vw,3rem)', fontWeight: 700, margin: '0 0 0.75rem', lineHeight: 1.2 }}>
            {about.name}
          </h1>
          <p style={{ color: '#a8bcd4', fontFamily: "'DM Mono', monospace", fontSize: '0.78rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
            {about.title}
          </p>
          <p style={{ color: '#c9daf8', fontSize: '1.1rem', lineHeight: 1.75, maxWidth: 560, margin: '0 auto 2rem' }}>
            {about.tagline}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`tel:${about.phone}`} style={{ background: C.white, color: C.navy, padding: '13px 30px', borderRadius: 5, fontFamily: "'DM Mono', monospace", fontSize: '0.82rem', letterSpacing: '0.08em', textDecoration: 'none', fontWeight: 700, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
              📞 Call for Appointment
            </a>
            <button onClick={() => navigate('/blog')} style={{ background: 'none', border: '2px solid rgba(255,255,255,0.35)', color: C.white, padding: '13px 30px', borderRadius: 5, cursor: 'pointer', fontFamily: "'DM Mono', monospace", fontSize: '0.82rem', letterSpacing: '0.08em' }}>
              Read Articles →
            </button>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section style={{ background: C.white, padding: '4rem 1.5rem', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.75rem' }}>
            <p style={{ color: C.gold, fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Areas of Practice</p>
            <h2 style={{ fontFamily: "'Manjari', Georgia, serif", color: C.navy, fontSize: 'clamp(1.5rem,4vw,2.1rem)', margin: 0 }}>Legal Services</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '1.25rem' }}>
            {(practiceAreas || []).map((area) => (
              <div key={area.id} style={{ background: C.offWhite, border: `1px solid ${C.border}`, borderTop: `3px solid ${C.navy}`, borderRadius: 7, padding: '1.5rem' }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>{area.icon}</div>
                <h3 style={{ fontFamily: "'Manjari', Georgia, serif", color: C.navy, fontSize: '1.05rem', margin: '0 0 0.5rem' }}>{area.title}</h3>
                <p style={{ color: C.textMuted, fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bio */}
      <section style={{ background: C.offWhite, padding: '4rem 1.5rem', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <p style={{ color: C.gold, fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>About</p>
          <h2 style={{ fontFamily: "'Manjari', Georgia, serif", color: C.navy, fontSize: 'clamp(1.4rem,3vw,2rem)', margin: '0 0 1.75rem' }}>The Advocate</h2>
          {(about.bio || '').split('\n\n').map((para, i) => (
            <p key={i} style={{ color: C.textBody, fontSize: '1rem', lineHeight: 1.85, marginBottom: '1.1rem' }}>{para}</p>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section style={{ background: C.white, padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={{ color: C.gold, fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Get in Touch</p>
            <h2 style={{ fontFamily: "'Manjari', Georgia, serif", color: C.navy, fontSize: 'clamp(1.4rem,3vw,2rem)', margin: 0 }}>Contact &amp; Location</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '1.5rem', maxWidth: 760, margin: '0 auto' }}>
            <div style={{ background: C.offWhite, border: `1px solid ${C.border}`, borderRadius: 7, padding: '1.75rem' }}>
              <h3 style={{ fontFamily: "'Manjari', Georgia, serif", color: C.navy, fontSize: '1rem', margin: '0 0 1rem' }}>Office Address</h3>
              <p style={{ color: C.textBody, fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>📍 {about.address}</p>
              <a href={`tel:${about.phone}`} style={{ display: 'block', color: C.navy, textDecoration: 'none', fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.75rem' }}>📞 {about.phone}</a>
              <a href={about.map_url} target="_blank" rel="noopener noreferrer" style={{ color: C.gold, fontSize: '0.875rem' }}>View on Google Maps →</a>
              <p style={{ color: C.textMuted, fontSize: '0.82rem', marginTop: '1rem', lineHeight: 1.55 }}>Consultations by prior appointment only.</p>
            </div>
            <div style={{ background: '#fffbef', border: '1px solid #e8d9a0', borderRadius: 7, padding: '1.75rem' }}>
              <h3 style={{ fontFamily: "'Manjari', Georgia, serif", color: C.navy, fontSize: '1rem', margin: '0 0 0.75rem' }}>Disclaimer</h3>
              <p style={{ color: C.textBody, fontSize: '0.875rem', lineHeight: 1.75, margin: 0 }}>{about.disclaimer}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
