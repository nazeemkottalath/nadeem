import { Link } from 'react-router-dom'
import { C } from '../lib/theme'

export default function Footer({ about, settings }) {
  return (
    <footer style={{ background: C.navy, padding: '2.75rem 1.5rem', marginTop: 'auto' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: '2rem' }}>
        <div>
          <div style={{ fontFamily: "'Manjari', Georgia, serif", color: C.white, fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.35rem' }}>
            {settings?.site_name}
          </div>
          <div style={{ color: '#a8bcd4', fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {settings?.site_tagline}
          </div>
        </div>

        <div>
          <div style={{ color: '#7b93b8', fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Navigate</div>
          {[['/', 'About'], ['/blog', 'Articles']].map(([to, label]) => (
            <Link key={to} to={to} style={{ display: 'block', color: '#a8bcd4', fontFamily: "'DM Mono', monospace", fontSize: '0.8rem', marginBottom: '0.4rem', textDecoration: 'none' }}>{label}</Link>
          ))}
        </div>

        <div>
          <div style={{ color: '#7b93b8', fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Contact</div>
          <div style={{ color: '#a8bcd4', fontSize: '0.85rem', lineHeight: 1.65 }}>{about?.address}</div>
          <a href={`tel:${about?.phone}`} style={{ color: '#c9daf8', fontSize: '0.9rem', textDecoration: 'none', display: 'block', marginTop: '0.5rem', fontWeight: 600 }}>{about?.phone}</a>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '1.75rem auto 0', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.25rem', color: '#4a6080', fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', textAlign: 'center', lineHeight: 1.6 }}>
        © {new Date().getFullYear()} {settings?.site_name}. All rights reserved.
        <span style={{ display: 'block', marginTop: '0.35rem' }}>{about?.disclaimer}</span>
      </div>
    </footer>
  )
}
