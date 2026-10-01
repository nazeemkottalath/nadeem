import { useParams, Link } from 'react-router-dom'
import { C } from '../lib/theme'

export const AREAS = [
  {
    slug: 'criminal-defence',
    title: 'Criminal Defence',
    scope: 'FIR matters, bail applications, trial proceedings, High Court revisions.',
    body: `Criminal matters before these chambers range from the registration of an FIR through to revision petitions before the Kerala High Court. Bail applications — both anticipatory and regular — are filed with attention to the specific facts, the applicable precedent, and the conditions likely to be imposed by the court. Trial proceedings are conducted before the Sessions Court and Magistracy in Kozhikode.`,
    matters: ['Anticipatory bail', 'Regular bail', 'Criminal revision', 'Quashing petition (S.482 CrPC)', 'Trial defence'],
  },
  {
    slug: 'civil-litigation',
    title: 'Civil Litigation',
    scope: 'Property disputes, injunctions, declaratory suits, execution, appeals.',
    body: `Civil disputes before this chambers include property title disputes, partition matters, injunction proceedings, and declaratory suits before the Munsiff Courts and Civil District Court. Interlocutory applications for interim relief are filed at the earliest stage the record supports. Execution proceedings and civil appeals are conducted before the Civil District Court and the Kerala High Court.`,
    matters: ['Property disputes', 'Injunctions', 'Partition suits', 'Declaratory reliefs', 'Execution petitions'],
  },
  {
    slug: 'family-matrimonial-law',
    title: 'Family & Matrimonial Law',
    scope: 'Matrimonial disputes, maintenance, custody, succession.',
    body: `Matrimonial proceedings before the Family Court, Kozhikode involve questions of divorce, judicial separation, maintenance under the CrPC and the Hindu Adoption and Maintenance Act, and child custody. Succession disputes arising from intestate and testamentary matters are handled alongside matrimonial proceedings where they arise. The nature of family proceedings requires discretion in both conduct and communication.`,
    matters: ['Divorce', 'Judicial separation', 'Maintenance', 'Child custody', 'Adoption', 'Succession'],
  },
  {
    slug: 'cheque-dishonour-section-138',
    title: 'Cheque Dishonour — Section 138',
    scope: 'NI Act proceedings before the Magistracy and Kerala High Court.',
    body: `Section 138 of the Negotiable Instruments Act imposes strict procedural requirements. The demand notice must be issued within the statutory period. The complaint must be filed within the prescribed limitation from the date of dishonour or the expiry of the notice period. Failure at either stage is fatal to the complaint. Both complainants and accused persons are represented through Magistrate trial and High Court appellate proceedings.`,
    matters: ['Demand notice', 'Magistrate trial', 'Acquittal / conviction appeals', 'Compounding'],
  },
  {
    slug: 'commercial-disputes',
    title: 'Commercial Disputes',
    scope: 'Contract disputes, Commercial Court, recovery proceedings.',
    body: `Commercial disputes before the Commercial Court, Kozhikode and the Kerala High Court include breach of contract claims, money recovery suits, and disputes arising from confidentiality and non-compete obligations. The Commercial Courts Act imposes its own procedural framework — including mandatory pre-institution mediation and case management hearings — which require attention from the outset of a matter.`,
    matters: ['Contract disputes', 'Commercial Court proceedings', 'Injunction for business protection', 'Recovery suits'],
  },
  {
    slug: 'consumer-protection',
    title: 'Consumer Protection',
    scope: 'Proceedings before Consumer Disputes Redressal Commissions.',
    body: `Consumer disputes arise from deficient services, defective goods, unfair trade practices, and insurance claim rejections. Proceedings are conducted before the District Consumer Disputes Redressal Commission and, on appeal, the Kerala State Commission. The consumer forum process is distinct from civil court litigation in its procedure, timelines, and the relief available.`,
    matters: ['District Commission', 'State Commission', 'Deficiency of service', 'Insurance disputes'],
  },
  {
    slug: 'motor-accident-claims',
    title: 'Motor Accident Claims',
    scope: 'Compensation claims and insurer proceedings before the MACT.',
    body: `Motor accident compensation claims before the MACT involve the assessment of loss under the Structured Formula — covering medical expenses, loss of income, loss of dependency, and non-pecuniary heads. The quantum of an award turns heavily on the documentary record: medical evidence, income proof, and the accident report. Appeals against Tribunal awards are conducted before the Kerala High Court.`,
    matters: ['Claimant representation', 'Insurer defence', 'High Court appeals', 'Compensation assessment'],
  },
  {
    slug: 'advisory-consultation',
    title: 'Advisory & Consultation',
    scope: 'Pre-litigation assessment of legal position and available remedies.',
    body: `Not every legal matter requires immediate court proceedings. A structured assessment of the legal position — the strength of the claim or defence, the procedural steps that must be taken, and the realistic prospects of the available remedies — can determine whether litigation is the appropriate course and, if so, how it should be initiated. Consultations cover contractual rights, criminal exposure, property entitlements, and pre-litigation strategy.`,
    matters: ['Legal consultation', 'Pre-litigation assessment', 'Contract review', 'Legal notice drafting'],
  },
]

// ── Individual area sub-page ──────────────────────────────────────────────────
function AreaDetail({ area }) {
  return (
    <div style={{ background: C.offWhite }}>
      <section style={{ background: C.navy, padding: '3.5rem 1.5rem 3rem' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <Link to="/practice-areas" style={{ color: '#a8bcd4', textDecoration: 'none', fontFamily: 'monospace', fontSize: '0.72rem', letterSpacing: '0.08em', display: 'inline-block', marginBottom: '1.25rem' }}>← Practice Areas</Link>
          <p style={{ color: C.goldLight, fontFamily: 'monospace', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Practice Area</p>
          <h1 style={{ fontFamily: "'Manjari', Georgia, serif", color: C.white, fontSize: 'clamp(1.75rem,5vw,2.75rem)', fontWeight: 700, margin: '0 0 0.75rem', lineHeight: 1.2 }}>{area.title}</h1>
          <p style={{ color: '#a8bcd4', fontSize: '0.95rem', fontStyle: 'italic' }}>{area.scope}</p>
        </div>
      </section>

      <section style={{ background: C.white, padding: 'clamp(3rem,6vw,4.5rem) 1.5rem' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <p style={{ color: C.textBody, fontSize: '1.05rem', lineHeight: 1.9, marginBottom: '2.5rem' }}>{area.body}</p>
          <div style={{ background: C.offWhite, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.navy}`, borderRadius: '0 6px 6px 0', padding: '1.5rem 1.75rem', marginBottom: '2.5rem' }}>
            <p style={{ color: C.navy, fontFamily: 'monospace', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Matters Include</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {area.matters.map(m => (
                <span key={m} style={{ background: C.white, border: `1px solid ${C.border}`, color: C.textBody, padding: '4px 12px', borderRadius: 99, fontSize: '0.85rem' }}>{m}</span>
              ))}
            </div>
          </div>
          <Link to="/contact" style={{ display: 'inline-block', background: C.navy, color: C.white, padding: '13px 28px', borderRadius: 4, textDecoration: 'none', fontFamily: 'monospace', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.06em' }}>
            Make an Enquiry →
          </Link>
        </div>
      </section>
    </div>
  )
}

// ── Practice Areas listing page ───────────────────────────────────────────────
export default function PracticeAreasPage() {
  const { slug } = useParams()

  if (slug) {
    const area = AREAS.find(a => a.slug === slug)
    if (!area) return (
      <div style={{ background: C.offWhite, minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <p style={{ color: C.textMuted }}>Practice area not found.</p>
        <Link to="/practice-areas" style={{ color: C.gold, textDecoration: 'none', fontFamily: 'monospace', fontSize: '0.8rem' }}>← Back to Practice Areas</Link>
      </div>
    )
    return <AreaDetail area={area} />
  }

  return (
    <div style={{ background: C.offWhite }}>
      <section style={{ background: C.navy, padding: '3.5rem 1.5rem 3rem' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <h1 style={{ fontFamily: "'Manjari', Georgia, serif", color: C.white, fontSize: 'clamp(1.75rem,5vw,2.75rem)', fontWeight: 700, margin: '0 0 0.75rem', lineHeight: 1.2, textTransform: 'uppercase' }}>Practice Areas</h1>
          <p style={{ color: '#a8bcd4', fontSize: '0.95rem', maxWidth: 600, lineHeight: 1.7 }}>Each card opens to a dedicated page. Matters are handled before the Kerala High Court and courts across the Malabar region.</p>
        </div>
      </section>

      <section style={{ padding: 'clamp(3rem,6vw,4.5rem) 1.5rem' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px,1fr))', gap: '1.25rem' }}>
          {AREAS.map((area) => (
            <div key={area.slug} style={{ background: C.white, border: `1px solid ${C.border}`, borderTop: `3px solid ${C.navy}`, borderRadius: 7, padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h2 style={{ fontFamily: "'Manjari', Georgia, serif", color: C.navy, fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>{area.title}</h2>
              <p style={{ color: C.textMuted, fontSize: '0.88rem', lineHeight: 1.6, margin: 0, flex: 1 }}>{area.scope}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {area.matters.slice(0, 3).map(m => (
                  <span key={m} style={{ background: C.offWhite, border: `1px solid ${C.border}`, color: C.textMuted, padding: '3px 9px', borderRadius: 99, fontSize: '0.75rem' }}>{m}</span>
                ))}
              </div>
              <Link to={`/practice-areas/${area.slug}`} style={{ color: C.gold, fontFamily: 'monospace', fontSize: '0.75rem', letterSpacing: '0.06em', textDecoration: 'none', marginTop: '0.25rem' }}>
                View Practice Area →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
