import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { C } from '../lib/theme'

export default function Navbar({ settings }) {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  const navLinks = [
    { to: '/',      label: 'About'    },
    { to: '/blog',  label: 'Articles' },
  ]

  return (
    <nav style={{ background: C.navy, boxShadow: '0 2px 8px rgba(0,0,0,0.18)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>

        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={{ fontFamily: "'Manjari', Georgia, serif", color: C.white, fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.2 }}>
            {settings?.site_name || 'Nadeem Mohammed V.K'}
          </div>
          <div style={{ color: '#a8bcd4', fontSize: '0.68rem', fontFamily: "'DM Mono', monospace", letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            {settings?.site_tagline || 'Advocate, Kozhikode'}
          </div>
        </Link>

        {/* Desktop */}
        <div className="desk-nav" style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} style={{
              background: pathname === to ? 'rgba(255,255,255,0.13)' : 'none',
              border: 'none', cursor: 'pointer',
              color: pathname === to ? C.white : '#a8bcd4',
              fontFamily: "'DM Mono', monospace", fontSize: '0.78rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '8px 18px', borderRadius: 4, textDecoration: 'none',
              display: 'inline-block',
            }}>{label}</Link>
          ))}
          <Link to="/admin" style={{
            background: 'none', border: '1px solid rgba(255,255,255,0.18)',
            color: 'rgba(255,255,255,0.38)', fontFamily: "'DM Mono', monospace",
            fontSize: '0.7rem', letterSpacing: '0.08em', padding: '6px 14px',
            borderRadius: 4, marginLeft: '0.5rem', textDecoration: 'none', display: 'inline-block',
          }}>Admin</Link>
        </div>

        {/* Hamburger */}
        <button className="ham-btn" onClick={() => setOpen(!open)} style={{ display: 'none', background: 'none', border: 'none', color: C.white, fontSize: '1.5rem', cursor: 'pointer' }}>☰</button>
      </div>

      {open && (
        <div style={{ background: C.navyLight, padding: '0.75rem 1.5rem 1.25rem', display: 'flex', flexDirection: 'column' }}>
          {[...navLinks, { to: '/admin', label: 'Admin' }].map(({ to, label }) => (
            <Link key={to} to={to} onClick={() => setOpen(false)} style={{
              color: pathname === to ? C.white : '#a8bcd4',
              fontFamily: "'DM Mono', monospace", fontSize: '0.85rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '11px 0', borderBottom: '1px solid rgba(255,255,255,0.08)',
              textDecoration: 'none', display: 'block',
            }}>{label}</Link>
          ))}
        </div>
      )}

      <style>{`.desk-nav{display:flex}.ham-btn{display:none}@media(max-width:640px){.desk-nav{display:none!important}.ham-btn{display:block!important}}`}</style>
    </nav>
  )
}
