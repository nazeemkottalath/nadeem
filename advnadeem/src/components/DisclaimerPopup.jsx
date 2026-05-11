import { useState, useEffect } from 'react'
import { C } from '../lib/theme'

export default function DisclaimerPopup({ onAccept }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(26,39,68,0.72)',
      backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1.25rem',
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.4s ease',
    }}>
      <div style={{
        background: C.white, border: `1px solid ${C.border}`,
        borderTop: `4px solid ${C.navy}`, borderRadius: 8,
        padding: '2.5rem 2rem', maxWidth: 520, width: '100%',
        boxShadow: '0 20px 50px rgba(0,0,0,0.22)',
        transform: visible ? 'translateY(0)' : 'translateY(14px)',
        transition: 'transform 0.4s ease',
      }}>
        <div style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '1rem' }}>⚖️</div>
        <h2 style={{ fontFamily: "'Manjari', Georgia, serif", color: C.navy, fontSize: '1.35rem', fontWeight: 700, textAlign: 'center', margin: '0 0 0.35rem' }}>
          Important Notice
        </h2>
        <p style={{ color: C.gold, fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', textAlign: 'center', marginBottom: '1.75rem' }}>
          Bar Council of India Rules
        </p>
        <div style={{ background: '#f0f4fb', border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.navy}`, borderRadius: 6, padding: '1.25rem', marginBottom: '1.5rem' }}>
          <p style={{ color: C.textBody, fontSize: '0.95rem', lineHeight: 1.8, margin: '0 0 0.9rem' }}>
            Under the rules of the <strong style={{ color: C.navy }}>Bar Council of India</strong>, advocates are not permitted to solicit work or advertise their professional services in any manner.
          </p>
          <p style={{ color: C.textBody, fontSize: '0.95rem', lineHeight: 1.8, margin: '0 0 0.9rem' }}>
            This website has been created solely to provide <strong style={{ color: C.navy }}>general legal information</strong> to members of the public. The information here does not constitute legal advice, a solicitation, or an advertisement.
          </p>
          <p style={{ color: C.textBody, fontSize: '0.95rem', lineHeight: 1.8, margin: 0 }}>
            By proceeding, you acknowledge that you are seeking information of your own accord and that no lawyer–client relationship is created by your use of this website.
          </p>
        </div>
        <button
          onClick={onAccept}
          style={{ width: '100%', background: C.navy, color: C.white, border: 'none', borderRadius: 6, padding: '14px', fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}
          onMouseEnter={e => e.currentTarget.style.background = C.navyLight}
          onMouseLeave={e => e.currentTarget.style.background = C.navy}
        >
          I Understand — Proceed to Website
        </button>
        <p style={{ color: C.textFaint, fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', textAlign: 'center', marginTop: '1rem' }}>
          Rule 36, Bar Council of India Rules
        </p>
      </div>
    </div>
  )
}
