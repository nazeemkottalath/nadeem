export const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://nadeem-azure.vercel.app'
const FIRM = 'Nadeem Associates'
const DEFAULT_DESC = 'Nadeem Associates is a litigation practice based in Kozhikode, Kerala, appearing before the Kerala High Court and courts across the Malabar region.'

function setMeta(name, content, attr = 'name') {
  if (!content) return
  let el = document.querySelector(`meta[${attr}="${name}"]`)
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el) }
  el.setAttribute('content', content)
}
function setLink(rel, href) {
  if (!href) return
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) { el = document.createElement('link'); el.setAttribute('rel', rel); document.head.appendChild(el) }
  el.setAttribute('href', href)
}
function setJsonLd(id, data) {
  let el = document.querySelector(`script[data-schema="${id}"]`)
  if (!el) { el = document.createElement('script'); el.setAttribute('type', 'application/ld+json'); el.setAttribute('data-schema', id); document.head.appendChild(el) }
  el.textContent = JSON.stringify(data, null, 2)
}
function removeJsonLd(...ids) { ids.forEach(id => document.querySelector(`script[data-schema="${id}"]`)?.remove()) }

export function applySEO({ page, post, settings }) {
  const phone = '+917736389036'
  const address = 'SM Arcade, PM Taj Road, Palayam, Kozhikode, Kerala 673001'

  if (page === 'home') {
    const title = `${FIRM} — Advocates & Legal Consultants, Kozhikode`
    const desc  = settings?.meta_desc || DEFAULT_DESC
    document.title = title; document.documentElement.lang = 'en'
    setMeta('description', desc); setMeta('robots', 'index, follow, max-snippet:-1, max-image-preview:large')
    setMeta('keywords', 'advocate Kozhikode, lawyer Calicut Kerala, Kerala High Court advocate, criminal defense Kerala, family court Kozhikode, anticipatory bail Kerala, cheque bounce lawyer Section 138, Nadeem Associates')
    setLink('canonical', SITE_URL)
    setMeta('og:type', 'website', 'property'); setMeta('og:title', title, 'property'); setMeta('og:description', desc, 'property'); setMeta('og:url', SITE_URL, 'property'); setMeta('og:locale', 'en_IN', 'property'); setMeta('og:site_name', FIRM, 'property')
    setMeta('twitter:card', 'summary_large_image'); setMeta('twitter:title', title); setMeta('twitter:description', desc)
    setJsonLd('org', { '@context': 'https://schema.org', '@type': 'LegalService', name: FIRM, alternateName: 'Nadeem Mohammed V.K. Advocates & Legal Consultants', url: SITE_URL, telephone: phone, address: { '@type': 'PostalAddress', streetAddress: address, addressLocality: 'Kozhikode', addressRegion: 'Kerala', addressCountry: 'IN' }, areaServed: { '@type': 'AdministrativeArea', name: 'Malabar Region, Kerala, India' }, serviceType: ['Criminal Defence', 'Civil Litigation', 'Family Law', 'Cheque Dishonour Section 138', 'Commercial Disputes', 'Consumer Protection', 'Motor Accident Claims', 'Legal Advisory'] })
    setJsonLd('person', { '@context': 'https://schema.org', '@type': 'Person', name: 'Nadeem Mohammed V.K.', jobTitle: 'Advocate', worksFor: { '@type': 'LegalService', name: FIRM }, address: { '@type': 'PostalAddress', addressLocality: 'Kozhikode', addressRegion: 'Kerala', addressCountry: 'IN' } })
    removeJsonLd('article', 'breadcrumb')
  }

  if (page === 'about') {
    const title = `About the Chambers | ${FIRM}`
    const desc  = 'Nadeem Associates is a litigation practice led by Advocate Nadeem Mohammed V.K., enrolled with the Bar Council of Kerala and appearing before the Kerala High Court and courts across Kozhikode.'
    document.title = title
    setMeta('description', desc); setLink('canonical', `${SITE_URL}/about`)
    setMeta('og:title', title, 'property'); setMeta('og:description', desc, 'property'); setMeta('og:url', `${SITE_URL}/about`, 'property')
    setJsonLd('breadcrumb', { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL }, { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE_URL}/about` }] })
    removeJsonLd('article')
  }

  if (page === 'practice-areas') {
    const title = `Practice Areas | ${FIRM}`
    const desc  = 'Criminal defence, civil litigation, family law, cheque dishonour, commercial disputes, consumer protection, motor accident claims, and legal advisory — Nadeem Associates, Kozhikode.'
    document.title = title
    setMeta('description', desc); setLink('canonical', `${SITE_URL}/practice-areas`)
    setMeta('og:title', title, 'property'); setMeta('og:description', desc, 'property'); setMeta('og:url', `${SITE_URL}/practice-areas`, 'property')
    setJsonLd('breadcrumb', { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL }, { '@type': 'ListItem', position: 2, name: 'Practice Areas', item: `${SITE_URL}/practice-areas` }] })
    removeJsonLd('article')
  }

  if (page === 'legal-insights') {
    const title = `Legal Insights | ${FIRM}`
    const desc  = `Legal articles, case analyses, and notes by ${FIRM}. Topics include Indian criminal law, family law, bail procedure, and landmark cases.`
    document.title = title
    setMeta('description', desc); setLink('canonical', `${SITE_URL}/legal-insights`)
    setMeta('og:title', title, 'property'); setMeta('og:description', desc, 'property')
    removeJsonLd('article')
  }

  if (page === 'contact') {
    const title = `Contact | ${FIRM}`
    const desc  = `Get in touch with ${FIRM}. SM Arcade, Palayam, Kozhikode. Phone: +91 77363 89036. Consultations by prior appointment.`
    document.title = title
    setMeta('description', desc); setLink('canonical', `${SITE_URL}/contact`)
    setMeta('og:title', title, 'property'); setMeta('og:description', desc, 'property')
    removeJsonLd('article')
  }

  if (page === 'post' && post && settings) {
    const title   = `${post.title} | ${FIRM}`
    const desc    = post.excerpt
    const url     = `${SITE_URL}/legal-insights/${post.slug}`
    const datePub = new Date(post.created_at).toISOString()
    const dateMod = new Date(post.updated_at || post.created_at).toISOString()
    document.title = title; document.documentElement.lang = post.lang === 'ml' ? 'ml' : 'en'
    setMeta('description', desc); setLink('canonical', url)
    setMeta('og:type', 'article', 'property'); setMeta('og:title', title, 'property'); setMeta('og:description', desc, 'property'); setMeta('og:url', url, 'property')
    if (post.cover_image) setMeta('og:image', post.cover_image, 'property')
    setMeta('article:published_time', datePub, 'property'); setMeta('article:modified_time', dateMod, 'property'); setMeta('article:section', post.category, 'property')
    setMeta('twitter:card', 'summary_large_image'); setMeta('twitter:title', title); setMeta('twitter:description', desc)
    setJsonLd('article', { '@context': 'https://schema.org', '@type': 'Article', headline: post.title, description: post.excerpt, image: post.cover_image || undefined, datePublished: datePub, dateModified: dateMod, inLanguage: post.lang === 'ml' ? 'ml-IN' : 'en-IN', url, mainEntityOfPage: { '@type': 'WebPage', '@id': url }, author: { '@type': 'Organization', name: FIRM, url: SITE_URL }, publisher: { '@type': 'Organization', name: FIRM, url: SITE_URL }, articleSection: post.category })
    setJsonLd('breadcrumb', { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL }, { '@type': 'ListItem', position: 2, name: 'Legal Insights', item: `${SITE_URL}/legal-insights` }, { '@type': 'ListItem', position: 3, name: post.title, item: url }] })
    removeJsonLd('org', 'person')
  }
}
