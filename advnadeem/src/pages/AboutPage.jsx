import { Link } from 'react-router-dom'
import { C } from '../lib/theme'

const VALUES = [
  {
    num: 'I', title: 'Honesty Before Advocacy',
    body: 'A practitioner owes the client an accurate picture of their legal position before strategy is discussed. That assessment may not be what the client wishes to hear. It is, however, the basis on which sound decisions are made.',
  },
  {
    num: 'II', title: 'Preparation as Obligation',
    body: 'Courtroom performance is the visible end of a process that begins well before the hearing date. The quality of preparation determines the quality of the argument. This chambers treats preparation as a professional obligation, not an administrative function.',
  },
  {
    num: 'III', title: 'Procedure as Substance',
    body: 'Procedural law is not a formality. Limitation periods, notice requirements, and filing timelines carry the same weight as the substantive claim. A matter well-prepared on the merits can still be lost on a procedural omission that was entirely avoidable.',
  },
]

const COURTS = [
  { label: 'High Court',   courts: 'Kerala High Court, Ernakulam' },
  { label: 'Criminal',     courts: 'Sessions Court · Chief Judicial Magistrate Court · JFCM Courts, Kozhikode · POCSO Act Cases, Kozhikode · NDPS, Vatakara' },
  { label: 'Civil',        courts: 'Civil District Court · Munsiff Court (Kozhikode, Vadakara, Koyilandy)' },
  { label: 'Family',       courts: 'Family Court, Kozhikode' },
  { label: 'Commercial',   courts: 'Commercial Court, Kozhikode' },
  { label: 'Tribunals',    courts: 'Motor Accident Claims Tribunal · Consumer Disputes Redressal Commission (District & State) · Labour Court · ITAT' },
]

export default function AboutPage() {
  return (
    <div style={{ background: C.offWhite }}>

      {/* Page header */}
      <section style={{ background: C.navy, padding: '3.5rem 1.5rem 3rem' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <p style={{ color: C.goldLight, fontFamily: 'monospace', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>02 / About</p>
          <h1 style={{ fontFamily: "'Manjari', Georgia, serif", color: C.white, fontSize: 'clamp(1.75rem,5vw,2.75rem)', fontWeight: 700, margin: 0, lineHeight: 1.2 }}>About the Chambers</h1>
        </div>
      </section>

      {/* The Chambers */}
      <section style={{ background: C.white, padding: 'clamp(3rem,6vw,4.5rem) 1.5rem', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <p style={{ color: C.gold, fontFamily: 'monospace', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>The Chambers</p>
          <p style={{ color: C.textBody, fontSize: '1rem', lineHeight: 1.85, marginBottom: '1rem' }}>
            Nadeem Associates is a litigation practice based in Kozhikode, Kerala. The chambers appears before the Kerala High Court and all courts and tribunals within its subordinate jurisdiction.
          </p>
          <p style={{ color: C.textBody, fontSize: '1rem', lineHeight: 1.85, marginBottom: '2rem' }}>
            The practice is led by Advocate Nadeem Mohammed V.K. It operates from SM Arcade, Palayam — a short distance from the principal courts in Kozhikode.
          </p>
          <blockquote style={{ background: C.navy, borderLeft: `4px solid ${C.gold}`, borderRadius: '0 6px 6px 0', padding: '1.5rem 2rem', margin: 0 }}>
            <p style={{ fontFamily: "'Manjari', Georgia, serif", color: C.white, fontSize: 'clamp(1rem,2.5vw,1.15rem)', fontWeight: 700, lineHeight: 1.6, margin: 0 }}>
              A litigation practice engaged with the judicial process at every level of the subordinate court system and before the High Court bench.
            </p>
          </blockquote>
        </div>
      </section>

      {/* The Advocate */}
      <section style={{ background: C.offWhite, padding: 'clamp(3rem,6vw,4.5rem) 1.5rem', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <p style={{ color: C.gold, fontFamily: 'monospace', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>The Advocate</p>
          <p style={{ color: C.textBody, fontSize: '1rem', lineHeight: 1.85, marginBottom: '1rem' }}>
            Advocate Nadeem Mohammed V.K. is the principal advocate of the chambers. He is enrolled with the Bar Council of Kerala and has been in active practice before the courts in Kozhikode and the Kerala High Court.
          </p>
          <p style={{ color: C.textBody, fontSize: '1rem', lineHeight: 1.85, marginBottom: '1rem' }}>
            His formation as an advocate has been shaped by sustained engagement with the trial courts of Kozhikode — the Munsiff Courts, the Civil District Court, the Sessions Court, and the Magistracy — alongside regular appearances before the Kerala High Court in civil, criminal, and writ matters.
          </p>
          <p style={{ color: C.textMuted, fontSize: '1rem', lineHeight: 1.85, fontStyle: 'italic' }}>
            That combination of trial court experience and High Court exposure informs how matters are prepared and argued at every level.
          </p>
        </div>
      </section>

      {/* Professional Values */}
      <section style={{ background: C.white, padding: 'clamp(3rem,6vw,4.5rem) 1.5rem', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <p style={{ color: C.gold, fontFamily: 'monospace', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Professional Values</p>
          <h2 style={{ fontFamily: "'Manjari', Georgia, serif", color: C.navy, fontSize: 'clamp(1.4rem,3.5vw,1.9rem)', margin: '0 0 0.75rem' }}>Three values govern the conduct of practice in this chambers.</h2>
          <div style={{ marginTop: '1.5rem' }}>
            {VALUES.map((v, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: '1.5rem', padding: '1.75rem 0', borderTop: `1px solid ${C.border}` }}>
                <div style={{ fontFamily: "'Manjari', Georgia, serif", color: C.gold, fontSize: '1.1rem', fontWeight: 700 }}>{v.num}</div>
                <div>
                  <h3 style={{ fontFamily: "'Manjari', Georgia, serif", color: C.navy, fontSize: '1.05rem', fontWeight: 700, margin: '0 0 0.5rem' }}>{v.title}</h3>
                  <p style={{ color: C.textBody, fontSize: '0.95rem', lineHeight: 1.75, margin: 0 }}>{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courts & Tribunals */}
      <section style={{ background: C.offWhite, padding: 'clamp(3rem,6vw,4.5rem) 1.5rem', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <p style={{ color: C.gold, fontFamily: 'monospace', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Courts & Tribunals</p>
          <h2 style={{ fontFamily: "'Manjari', Georgia, serif", color: C.navy, fontSize: 'clamp(1.4rem,3.5vw,1.9rem)', margin: '0 0 1.75rem' }}>Forums of Appearance</h2>
          <div style={{ border: `1px solid ${C.border}`, borderRadius: 7, overflow: 'hidden' }}>
            {COURTS.map((c, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', background: i % 2 === 0 ? C.white : C.offWhite }}>
                <div style={{ padding: '1rem 1.25rem', borderRight: `1px solid ${C.border}`, color: C.navy, fontFamily: 'monospace', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700 }}>{c.label}</div>
                <div style={{ padding: '1rem 1.25rem', color: C.textBody, fontSize: '0.9rem', lineHeight: 1.6 }}>{c.courts}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: C.white, padding: '3rem 1.5rem', textAlign: 'center' }}>
        <Link to="/contact" style={{ display: 'inline-block', background: C.navy, color: C.white, padding: '13px 32px', borderRadius: 4, textDecoration: 'none', fontFamily: 'monospace', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.06em' }}>
          Book a Consultation →
        </Link>
      </section>
    </div>
  )
}
