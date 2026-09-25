import { Link } from 'react-router-dom'
import { C } from '../lib/theme'

export default function Footer() {
  return (
    <footer style={{ background: C.navyDark, borderTop: `3px solid ${C.gold}`, padding: '3rem 1.5rem 1.5rem' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>

          {/* Left — Identity */}
          <div>
            <div style={{ fontFamily: "'Manjari', Georgia, serif", color: C.white, fontSize: '1rem', fontWeight: 700, marginBottom: '0.3rem' }}>Adv. Nadeem Mohammed V.K.</div>
            <div style={{ color: C.goldLight, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '1rem' }}>Advocates & Legal Consultants</div>
            <address style={{ color: '#a8bcd4', fontSize: '0.85rem', lineHeight: 1.7, fontStyle: 'normal' }}>
              SM Arcade, PM Taj Rd Palayam,<br />
              Kozhikode 673001
            </address>
          </div>

          {/* Centre — Navigate */}
          <div>
            <div style={{ color: '#7b93b8', fontFamily: 'monospace', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.9rem' }}>Navigate</div>
            {[['/', 'Home'], ['/about', 'About'], ['/practice-areas', 'Practice Areas'], ['/legal-insights', 'Legal Insights'], ['/contact', 'Contact']].map(([to, label]) => (
              <Link key={to} to={to} style={{ display: 'block', color: '#a8bcd4', textDecoration: 'none', fontSize: '0.85rem', marginBottom: '0.4rem' }}>{label}</Link>
            ))}
          </div>

          {/* Right — Quick Contact */}
          <div>
            <div style={{ color: '#7b93b8', fontFamily: 'monospace', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.9rem' }}>Quick Contact</div>
            <Link to="/contact" style={{ display: 'inline-block', background: C.navy, color: C.white, textDecoration: 'none', padding: '9px 20px', borderRadius: 4, fontFamily: 'monospace', fontSize: '0.75rem', letterSpacing: '0.06em', marginBottom: '1rem' }}>Book a Consultation →</Link>
            <div style={{ color: '#a8bcd4', fontSize: '0.85rem', lineHeight: 1.8 }}>
              <a href="tel:+917736389036" style={{ color: '#c9daf8', textDecoration: 'none', display: 'block' }}>+91 77363 89036</a>
              <a href="https://wa.me/917736389036" target="_blank" rel="noopener noreferrer" style={{ color: '#a8bcd4', textDecoration: 'none', display: 'block' }}>WhatsApp: Message us →</a>
              <span style={{ display: 'block', marginTop: '0.25rem' }}>SM Arcade, Palayam</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.25rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '0.75rem', alignItems: 'flex-start' }}>
          <p style={{ color: '#4a6080', fontFamily: 'monospace', fontSize: '0.65rem' }}>
            © 2026 Nadeem Associates. All rights reserved.
          </p>
          <p style={{ color: '#4a6080', fontSize: '0.72rem', lineHeight: 1.55, maxWidth: 480, textAlign: 'right' }}>
            This website is intended for informational purposes only and does not constitute solicitation or advertising. Accessing this website does not create a lawyer–client relationship.
          </p>
        </div>
      </div>
    </footer>
  )
}
