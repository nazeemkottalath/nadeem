import { Link } from 'react-router-dom'
import { C } from '../lib/theme.js'

const AREAS = [
  { slug: 'criminal-defence', title: 'Criminal Defence', desc: 'Bail, anticipatory bail, FIR matters, and full criminal trial representation before Kozhikode courts.' },
  { slug: 'family-matrimonial-law', title: 'Family & Matrimonial Law', desc: 'Divorce, maintenance, child custody, domestic matters before Family Courts in Kozhikode.' },
  { slug: 'cheque-dishonour', title: 'Cheque Dishonour', desc: 'Negotiable Instruments Act cases — both prosecution and defence of dishonoured cheque matters.' },
  { slug: 'commercial-disputes', title: 'Commercial Disputes', desc: 'Commercial debt recovery proceedings.' },
  { slug: 'motor-accident-claims', title: 'Motor Accident Claims', desc: 'Compensation claims before Motor Accidents Claims Tribunals in Kozhikode district.' },
  { slug: 'advisory-consultation', title: 'Advisory & Consultation', desc: 'Legal consultation, document review, and advisory services for individuals and businesses.' },
]

const PRINCIPLES = [
  { title: 'Careful Preparation', body: 'Every matter is approached with thorough legal research and detailed preparation before court.' },
  { title: 'Practical Advice', body: 'Legal counsel focused on practical outcomes, communicated clearly to each client.' },
  { title: 'Personal Attention', body: 'Each client and matter receives individual attention tailored to its specific circumstances.' },
]

export default function HomePage() {
  return (
    <div>
      {/* ── HERO ── */}
      <section style={{ background: C.navy, color: C.white, padding: 'clamp(3.5rem,7vw,5.5rem) 1.5rem clamp(3rem,6vw,5rem)' }}>
        <div className="hero-grid" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'center' }}>

          {/* Left — text */}
          <div>
            <div style={{ fontSize: 12, letterSpacing: '0.22em', color: C.goldLight, textTransform: 'uppercase', marginBottom: 24, fontFamily: 'monospace' }}>
              Advocate · Kozhikode, Kerala
            </div>
            <h1 style={{ fontFamily: "'Manjari', sans-serif", fontWeight: 700, fontSize: 'clamp(28px, 4vw, 52px)', letterSpacing: '0.06em', lineHeight: 1.1, textTransform: 'uppercase', margin: '0 0 6px' }}>
              ADVOCATE NADEEM
            </h1>
            <h1 style={{ fontFamily: "'Manjari', sans-serif", fontWeight: 700, fontSize: 'clamp(20px, 3vw, 38px)', letterSpacing: '0.06em', lineHeight: 1.15, textTransform: 'uppercase', color: C.goldLight, margin: '0 0 28px' }}>
              MOHAMMED V.K.
            </h1>
            <p style={{ fontSize: 15, color: '#c5cfe0', marginBottom: 6, lineHeight: 1.7 }}>
              District Court Kozhikode & Subordinate Courts at Kozhikode District
            </p>
            <p style={{ fontSize: 14, color: '#9ca3af', lineHeight: 1.7, marginBottom: 36 }}>
              Litigation before courts and tribunals across Kozhikode district
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link to="/contact" style={{ background: C.gold, color: C.white, textDecoration: 'none', padding: '13px 28px', borderRadius: 6, fontWeight: 700, fontSize: 14, letterSpacing: '0.05em' }}>
                Get in Touch
              </Link>
              <Link to="/practice-areas" style={{ border: '1px solid rgba(255,255,255,0.3)', color: C.white, textDecoration: 'none', padding: '13px 28px', borderRadius: 6, fontSize: 14 }}>
                Practice Areas
              </Link>
            </div>
          </div>

          {/* Right — office photo */}
          <div className="hero-img-wrap">
            <img
              src="/AdvocatesinKozhikode.webp"
              alt="Office of Advocate Nadeem Mohammed V.K., Kozhikode"
              style={{
                width: '100%',
                height: 460,
                objectFit: 'cover',
                borderRadius: 12,
                display: 'block',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              }}
            />
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .hero-grid { grid-template-columns: 1fr !important; }
            .hero-img-wrap img { height: 260px !important; }
          }
        `}</style>
      </section>

      {/* Practice Areas */}
      <section style={{ padding: '80px 24px', background: C.offWhite }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 12, letterSpacing: '0.2em', color: C.gold, textTransform: 'uppercase', marginBottom: 12 }}>Areas of Practice</div>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 700, color: C.navy }}>Practice Areas</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {AREAS.map(a => (
              <Link key={a.slug} to={`/practice-areas/${a.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: '28px 24px', height: '100%', transition: 'box-shadow 0.2s, border-color 0.2s' }}
                  onMouseOver={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)'; e.currentTarget.style.borderColor = C.gold }}
                  onMouseOut={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = C.border }}>
                  <div style={{ width: 32, height: 3, background: C.gold, marginBottom: 16, borderRadius: 2 }} />
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: C.navy, marginBottom: 10 }}>{a.title}</h3>
                  <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.7 }}>{a.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section style={{ padding: '80px 24px', background: C.white }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 12, letterSpacing: '0.2em', color: C.gold, textTransform: 'uppercase', marginBottom: 12 }}>Approach</div>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 700, color: C.navy }}>How I Work</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
            {PRINCIPLES.map((p, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '24px 20px' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: C.offWhite, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 20, fontWeight: 700, color: C.navy }}>
                  {i + 1}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: C.navy, marginBottom: 12 }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.8 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: C.navy, color: C.white, padding: '64px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, marginBottom: 16 }}>Need Legal Assistance?</h2>
          <p style={{ fontSize: 15, color: '#9ca3af', marginBottom: 32, lineHeight: 1.7 }}>
            Get in touch to discuss your matter and understand your legal options.
          </p>
          <Link to="/contact" style={{ background: C.gold, color: C.white, textDecoration: 'none', padding: '14px 36px', borderRadius: 6, fontWeight: 700, fontSize: 14 }}>
            Contact Now
          </Link>
        </div>
      </section>
    </div>
  )
}
