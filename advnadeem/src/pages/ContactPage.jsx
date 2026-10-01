import { C } from '../lib/theme'

const CONTACT_ROWS = [
  { label: 'Office',        value: 'SM Arcade, PM Taj Road, Palayam, Kozhikode, Kerala 673001', link: null },
  { label: 'Phone',         value: '+91 77363 89036', link: 'tel:+917736389036' },
  { label: 'WhatsApp',      value: 'Message us on WhatsApp →', link: 'https://wa.me/917736389036' },
  { label: 'Hours',         value: 'Monday to Saturday, 9:00 am – 6:00 pm', link: null },
  { label: 'Appointments',  value: 'By prior appointment only.', link: null },
  { label: 'Maps',          value: 'View on Google Maps →', link: 'https://maps.app.goo.gl/n9ow7EC7HdVL9hi48' },
]

export default function ContactPage() {
  return (
    <div style={{ background: C.offWhite }}>
      {/* Header */}
      <section style={{ background: C.navy, padding: '3.5rem 1.5rem 3rem' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <h1 style={{ fontFamily: "'Manjari', Georgia, serif", color: C.white, fontSize: 'clamp(1.75rem,5vw,2.75rem)', fontWeight: 700, margin: 0, textTransform: 'uppercase' }}>Contact</h1>
        </div>
      </section>

      {/* Contact details */}
      <section style={{ background: C.white, padding: 'clamp(3rem,6vw,4.5rem) 1.5rem', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <p style={{ color: C.gold, fontFamily: 'monospace', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Get in Touch</p>
          <p style={{ color: C.textBody, fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
            The office of Advocate Nadeem Mohammed V.K. is located at SM Arcade, Palayam, Kozhikode — minutes from the district courts. Consultations are conducted by prior appointment.
          </p>

          {/* Contact table */}
          <div style={{ border: `1px solid ${C.border}`, borderRadius: 7, overflow: 'hidden', marginBottom: '2rem' }}>
            {CONTACT_ROWS.map((row, i) => (
              <div key={row.label} style={{ display: 'grid', gridTemplateColumns: '130px 1fr', background: i % 2 === 0 ? C.white : C.offWhite }}>
                <div style={{ padding: '0.9rem 1.25rem', borderRight: `1px solid ${C.border}`, color: C.navy, fontFamily: 'monospace', fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                  {row.label}
                </div>
                <div style={{ padding: '0.9rem 1.25rem', color: C.textBody, fontSize: '0.95rem', display: 'flex', alignItems: 'center' }}>
                  {row.link
                    ? <a href={row.link} target={row.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ color: row.label === 'Phone' ? C.navy : C.gold, textDecoration: 'none', fontWeight: row.label === 'Phone' ? 700 : 400 }}>{row.value}</a>
                    : row.value
                  }
                </div>
              </div>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <a href="https://wa.me/917736389036?text=Hello%2C%20I%20would%20like%20to%20book%20a%20consultation%20with%20Advocate%20Nadeem%20Mohammed%20V.K." target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#25D366', color: C.white, padding: '1rem 1.75rem', borderRadius: 6, textDecoration: 'none', fontSize: '0.95rem', fontWeight: 700, fontFamily: "'Manjari', Georgia, serif", marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.2rem' }}>💬</span>
            Message on WhatsApp →
          </a>

          <a href="tel:+917736389036"
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: C.navy, color: C.white, padding: '1rem 1.75rem', borderRadius: 6, textDecoration: 'none', fontSize: '0.95rem', fontWeight: 700, fontFamily: "'Manjari', Georgia, serif" }}>
            <span style={{ fontSize: '1.2rem' }}>📞</span>
            Call +91 77363 89036
          </a>
        </div>
      </section>

      {/* Disclaimer */}
      <section style={{ background: '#fffbef', padding: '2rem 1.5rem' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <p style={{ color: C.textMuted, fontSize: '0.85rem', lineHeight: 1.7 }}>
            <strong style={{ color: C.navy }}>Note:</strong> This website is intended for informational purposes only and does not constitute solicitation or advertising. Contact through this site does not create a lawyer–client relationship.
          </p>
        </div>
      </section>
    </div>
  )
}
