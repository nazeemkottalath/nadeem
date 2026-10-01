import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { C } from '../lib/theme'

const NAV_LINKS = [
  { to: '/',               label: 'Home'           },
  { to: '/about',          label: 'About'          },
  { to: '/practice-areas', label: 'Practice Areas' },
  { to: '/legal-insights', label: 'Legal Insights' },
  { to: '/contact',        label: 'Contact'        },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  const isActive = (to) => to === '/' ? pathname === '/' : pathname.startsWith(to)

  return (
    <nav style={{ background: C.navy, boxShadow: '0 2px 8px rgba(0,0,0,0.2)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>

        {/* Logo / Brand */}
        <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ fontFamily: "'Manjari', Georgia, serif", color: C.white, fontSize: '1rem', fontWeight: 700, lineHeight: 1.25 }}>
            ADV. NADEEM MOHAMMED V.K.
          </div>
          <div style={{ color: '#a8bcd4', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'monospace' }}>
            Advocates & Legal Consultants · Kozhikode
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="desk-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.1rem' }}>
          {NAV_LINKS.map(({ to, label }) => (
            <Link key={to} to={to} style={{
              color: isActive(to) ? C.white : '#a8bcd4',
              background: isActive(to) ? 'rgba(255,255,255,0.1)' : 'none',
              textDecoration: 'none', fontFamily: 'monospace', fontSize: '0.72rem',
              letterSpacing: '0.06em', padding: '7px 13px', borderRadius: 4,
              borderBottom: isActive(to) ? `2px solid ${C.goldLight}` : '2px solid transparent',
              whiteSpace: 'nowrap',
            }}>{label}</Link>
          ))}
          <a href="tel:+917736389036" style={{ marginLeft: '0.5rem', color: C.goldLight, fontFamily: 'monospace', fontSize: '0.72rem', letterSpacing: '0.04em', textDecoration: 'none', padding: '7px 13px', border: `1px solid rgba(201,168,76,0.35)`, borderRadius: 4, whiteSpace: 'nowrap' }}>
            +91 77363 89036
          </a>
          <Link to="/admin" style={{ marginLeft: '0.25rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', fontSize: '0.65rem', textDecoration: 'none', padding: '6px 10px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4 }}>Admin</Link>
        </div>

        {/* Hamburger */}
        <button className="ham-btn" onClick={() => setOpen(!open)} style={{ display: 'none', background: 'none', border: 'none', color: C.white, fontSize: '1.5rem', cursor: 'pointer' }}>☰</button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: C.navyDark, padding: '0.5rem 1.5rem 1.25rem', display: 'flex', flexDirection: 'column' }}>
          {NAV_LINKS.map(({ to, label }) => (
            <Link key={to} to={to} onClick={() => setOpen(false)} style={{
              color: isActive(to) ? C.white : '#a8bcd4', textDecoration: 'none',
              fontFamily: 'monospace', fontSize: '0.82rem', letterSpacing: '0.06em',
              padding: '12px 0', borderBottom: `1px solid rgba(255,255,255,0.07)`, display: 'block',
            }}>{label}</Link>
          ))}
          <a href="tel:+917736389036" onClick={() => setOpen(false)} style={{ color: C.goldLight, textDecoration: 'none', fontFamily: 'monospace', fontSize: '0.82rem', padding: '12px 0', display: 'block' }}>+91 77363 89036</a>
        </div>
      )}

      <style>{`.desk-nav{display:flex}.ham-btn{display:none}@media(max-width:900px){.desk-nav{display:none!important}.ham-btn{display:block!important}}`}</style>
    </nav>
  )
}
