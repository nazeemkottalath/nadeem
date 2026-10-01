import { Link } from 'react-router-dom'
import { C } from '../lib/theme'

const PRINCIPLES = [
  {
    num: 'I',
    title: 'Procedural Discipline',
    body: 'Timelines, notice requirements, limitation periods, and filing obligations are treated as primary litigation work. A matter lost on procedure is a matter that did not need to be lost.',
  },
  {
    num: 'II',
    title: 'Factual Preparation',
    body: 'Arguments are built from the record. The strongest legal position available is identified from the facts as they are, not as they might be arranged.',
  },
  {
    num: 'III',
    title: 'Frank Assessment',
    body: 'The legal position is communicated as it stands. Clients are not offered a view shaped by what they wish to hear. Clarity at the outset determines the quality of decisions made thereafter.',
  },
]

const PRACTICE_AREAS = [
  { title: 'Criminal Defence',         scope: 'FIR matters, bail, trial proceedings, High Court revisions',      slug: 'criminal-defence' },
  { title: 'Family & Matrimonial Law', scope: 'Divorce, maintenance, custody, succession',                        slug: 'family-matrimonial-law' },
  { title: 'Cheque Dishonour — S.138', scope: 'NI Act proceedings for complainants and accused',                  slug: 'cheque-dishonour-section-138' },
  { title: 'Commercial Disputes',      scope: 'Contract disputes, Commercial Court, recovery proceedings',        slug: 'commercial-disputes' },
  { title: 'Motor Accident Claims',    scope: 'Compensation claims and insurer defence before MACT',              slug: 'motor-accident-claims' },
  { title: 'Advisory & Consultation',  scope: 'Pre-litigation assessment and legal advice',                       slug: 'advisory-consultation' },
]

export default function HomePage() {
  return (
    <div style={{ background: C.offWhite }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ background: `linear-gradient(150deg, ${C.navyDark} 0%, #1e3060 100%)`, padding: 'clamp(4rem,8vw,6rem) 1.5rem clamp(3.5rem,7vw,5rem)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <p style={{ color: C.goldLight, fontFamily: 'monospace', fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '1.75rem' }}>
            Advocates & Legal Consultants · Kozhikode
          </p>
          <h1 style={{ fontFamily: "'Manjari', Georgia, serif", color: C.white, fontWeight: 700, lineHeight: 1.08, margin: '0 0 0.5rem' }}>
            <span style={{ display: 'block', fontSize: 'clamp(3.2rem,9vw,6rem)', textTransform: 'uppercase' }}>Nadeem</span>
            <span style={{ display: 'block', fontSize: 'clamp(3.2rem,9vw,6rem)', color: C.goldLight, textTransform: 'uppercase' }}>Mohammed V.K.</span>
          </h1>
          <p style={{ color: '#a8bcd4', fontFamily: 'monospace', fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '1rem 0 1.25rem' }}>
            Advocate · District Court Kozhikode & Subordinate Courts at Kozhikode District
          </p>
          <div style={{ width: 48, height: 2, background: C.gold, marginBottom: '1.75rem' }} />
          <p style={{ color: C.white, fontFamily: "'Manjari', Georgia, serif", fontSize: 'clamp(1.1rem,2.5vw,1.35rem)', fontWeight: 700, marginBottom: '1rem' }}>
            Principled advocacy. Disciplined practice.
          </p>
          <p style={{ color: '#c9daf8', fontSize: '1rem', lineHeight: 1.8, maxWidth: 620, marginBottom: '2.5rem' }}>
            The chambers of Advocate Nadeem Mohammed V.K. conducts litigation before district of Kozhikode and courts and tribunals across Kozhikode district. Matters are prepared with attention to both legal principle and procedural consequence.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{ background: C.white, color: C.navy, padding: '13px 28px', borderRadius: 4, textDecoration: 'none', fontFamily: 'monospace', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.06em' }}>
              Book a Consultation →
            </Link>
            <Link to="/practice-areas" style={{ background: 'none', border: `2px solid rgba(255,255,255,0.3)`, color: C.white, padding: '13px 28px', borderRadius: 4, textDecoration: 'none', fontFamily: 'monospace', fontSize: '0.82rem', letterSpacing: '0.06em' }}>
              Practice Areas →
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHAT THE PRACTICE STANDS ON ──────────────────────────────────── */}
      <section style={{ background: C.white, padding: 'clamp(3.5rem,7vw,5rem) 1.5rem', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <p style={{ color: C.gold, fontFamily: 'monospace', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>What the Practice Stands On</p>
          <h2 style={{ fontFamily: "'Manjari', Georgia, serif", color: C.navy, fontSize: 'clamp(1.5rem,4vw,2.1rem)', margin: '0 0 0.75rem' }}>The Foundation</h2>
          <p style={{ color: C.textMuted, fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Three principles organise the conduct of every matter before this chambers, regardless of court or subject matter.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {PRINCIPLES.map((p, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: '1.5rem', padding: '1.75rem 0', borderTop: `1px solid ${C.border}` }}>
                <div style={{ fontFamily: "'Manjari', Georgia, serif", color: C.gold, fontSize: '1.1rem', fontWeight: 700, paddingTop: '0.1rem' }}>{p.num}</div>
                <div>
                  <h3 style={{ fontFamily: "'Manjari', Georgia, serif", color: C.navy, fontSize: '1.05rem', fontWeight: 700, margin: '0 0 0.5rem' }}>{p.title}</h3>
                  <p style={{ color: C.textBody, fontSize: '0.95rem', lineHeight: 1.75, margin: 0 }}>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRACTICE AREAS GRID ──────────────────────────────────────────── */}
      <section style={{ background: C.offWhite, padding: 'clamp(3.5rem,7vw,5rem) 1.5rem' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <p style={{ color: C.gold, fontFamily: 'monospace', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Areas of Practice</p>
          <h2 style={{ fontFamily: "'Manjari', Georgia, serif", color: C.navy, fontSize: 'clamp(1.5rem,4vw,2.1rem)', margin: '0 0 2rem' }}>Six Practice Areas</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: '1px', background: C.border, border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
            {PRACTICE_AREAS.map((area) => (
              <div key={area.slug} style={{ background: C.white, padding: '1.5rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <h3 style={{ fontFamily: "'Manjari', Georgia, serif", color: C.navy, fontSize: '1rem', fontWeight: 700, margin: 0 }}>{area.title}</h3>
                <p style={{ color: C.textMuted, fontSize: '0.85rem', lineHeight: 1.55, margin: 0, flex: 1 }}>{area.scope}</p>
                <Link to={`/practice-areas/${area.slug}`} style={{ color: C.gold, fontFamily: 'monospace', fontSize: '0.72rem', letterSpacing: '0.06em', textDecoration: 'none', marginTop: '0.25rem' }}>
                  View Practice Area →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ─────────────────────────────────────────────────────── */}
      <section style={{ background: C.navy, padding: '3rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Manjari', Georgia, serif", color: C.white, fontSize: 'clamp(1.3rem,3vw,1.75rem)', margin: '0 0 1rem' }}>Ready to discuss your matter?</h2>
          <p style={{ color: '#a8bcd4', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.75rem' }}>Consultations are conducted by prior appointment from the chambers at SM Arcade, Palayam, Kozhikode.</p>
          <Link to="/contact" style={{ display: 'inline-block', background: C.white, color: C.navy, padding: '13px 32px', borderRadius: 4, textDecoration: 'none', fontFamily: 'monospace', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.06em' }}>
            Book a Consultation →
          </Link>
        </div>
      </section>
    </div>
  )
}
