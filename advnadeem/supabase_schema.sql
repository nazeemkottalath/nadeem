-- ============================================================
--  advnadeem.com — Supabase Schema
--  Paste this entire file into:
--  Supabase Dashboard → SQL Editor → New Query → Run
-- ============================================================

-- ── 1. SETTINGS ─────────────────────────────────────────────
create table if not exists settings (
  id            serial primary key,
  site_name     text    not null default 'Nadeem Mohammed V.K',
  site_tagline  text    not null default 'Advocate, Kozhikode (Calicut)',
  meta_desc     text    not null default 'Advocate Nadeem Mohammed V.K — practicing lawyer in Kozhikode, Kerala.',
  admin_pin     text    not null default '1234',
  updated_at    timestamptz default now()
);

-- Seed one row
insert into settings (site_name, site_tagline, meta_desc, admin_pin)
values (
  'Nadeem Mohammed V.K',
  'Advocate, Kozhikode (Calicut)',
  'Advocate Nadeem Mohammed V.K — practicing lawyer in Kozhikode, Kerala. Criminal defense, family law, cheque bounce cases, and legal consultations.',
  '1234'
);

-- ── 2. ABOUT ────────────────────────────────────────────────
create table if not exists about (
  id          serial primary key,
  name        text not null default 'Nadeem Mohammed V.K',
  title       text not null default 'Advocate, Kozhikode (Calicut)',
  tagline     text not null default 'Dependable legal guidance for individuals and families across Kerala.',
  bio         text not null default '',
  phone       text not null default '7736389036',
  address     text not null default 'SM Arcade, PM Taj Rd, Palayam, Kozhikode, Kerala 673001',
  map_url     text not null default 'https://maps.app.goo.gl/n9ow7EC7HdVL9hi48',
  disclaimer  text not null default 'This website is intended for informational purposes only and does not constitute solicitation or advertising.',
  updated_at  timestamptz default now()
);

-- Seed one row
insert into about (name, title, tagline, bio, phone, address, map_url, disclaimer)
values (
  'Nadeem Mohammed V.K',
  'Advocate, Kozhikode (Calicut)',
  'Dependable legal guidance for individuals and families across Kerala.',
  'Advocate Nadeem Mohammed V.K is a practicing lawyer based in Kozhikode (Calicut), Kerala, providing focused and dependable legal services to individuals and families across the district and nearby areas. With regular appearances before courts in Kozhikode, he offers practical legal guidance and effective representation in both advisory and litigation matters.

His primary areas of practice include criminal defense, bail matters, family and divorce cases, cheque bounce cases under Section 138 of the Negotiable Instruments Act, and consumer disputes. He also provides legal consultations to clients seeking clarity on their legal rights, procedures, and available remedies.

In criminal matters, Advocate Nadeem assists clients at various stages including FIR-related issues, anticipatory bail, regular bail, and trial proceedings. He approaches each case with careful preparation and a clear understanding of procedural and substantive law.

In family law matters, he represents clients before the Family Court in Kozhikode, handling divorce, maintenance, child custody, and related disputes with sensitivity and discretion.

Known for a client-focused approach, he places emphasis on clear communication, timely updates, and realistic legal advice.',
  '7736389036',
  'SM Arcade, PM Taj Rd, Palayam, Kozhikode, Kerala 673001',
  'https://maps.app.goo.gl/n9ow7EC7HdVL9hi48',
  'This website is intended for informational purposes only and does not constitute solicitation or advertising. Accessing this website does not create a lawyer–client relationship.'
);

-- ── 3. PRACTICE AREAS ───────────────────────────────────────
create table if not exists practice_areas (
  id         serial primary key,
  icon       text    not null default '📋',
  title      text    not null,
  description text   not null,
  sort_order integer not null default 0
);

insert into practice_areas (icon, title, description, sort_order) values
  ('⚖️', 'Criminal Defense',        'FIR matters, anticipatory bail, regular bail, and trial proceedings.',                               1),
  ('👨‍👩‍👧', 'Family & Divorce',      'Divorce, maintenance, child custody before the Family Court, Kozhikode.',                           2),
  ('📋', 'Cheque Bounce (Sec. 138)', 'Representation in NI Act cases for both complainants and accused.',                                 3),
  ('🏛️', 'Consumer Disputes',       'Guidance and representation before consumer forums.',                                               4),
  ('📝', 'Legal Consultations',      'Clarity on rights, procedures, and available legal remedies.',                                      5),
  ('🔒', 'Bail Matters',             'Urgent bail applications with careful procedural preparation.',                                      6);

-- ── 4. POSTS ────────────────────────────────────────────────
create table if not exists posts (
  id          uuid primary key default gen_random_uuid(),
  title       text    not null,
  slug        text    not null unique,
  category    text    not null default 'Law',
  excerpt     text    not null default '',
  content     text    not null default '',
  lang        text    not null default 'en',
  published   boolean not null default true,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- Seed sample posts
insert into posts (title, slug, category, excerpt, content, lang) values
(
  'Brown v. Board of Education of Topeka',
  'brown-v-board-of-education',
  'Law',
  'A landmark US Supreme Court case that declared racial segregation in public schools unconstitutional — and its enduring significance in constitutional law.',
  'In 1951, parents of 20 school children filed a class action suit in the Kansas District Court challenging the practice of maintaining separate schools for white and Black students. The district court ruled in favor of segregation. The case eventually reached the US Supreme Court, which in 1954 unanimously ruled that racial segregation in public schools was unconstitutional.

The Supreme Court, led by Chief Justice Earl Warren, held that "separate but equal" educational facilities are inherently unequal, overruling the earlier Plessy v. Ferguson (1896) decision. The ruling was a watershed moment in American civil rights history and continues to be cited in constitutional law arguments worldwide.

The case remains a powerful illustration of how the judiciary can serve as a check against institutionalised discrimination, and is studied in law schools globally as a model for public interest litigation.',
  'en'
),
(
  'Riggs v. Palmer',
  'riggs-v-palmer',
  'Law',
  'A famous New York case that established the principle that no one should be permitted to profit from their own wrongdoing — the no-profit-from-wrong maxim.',
  'Francis Palmer, a wealthy New Yorker, had three children. His son predeceased him, leaving behind a grandson named Elmer. Francis raised Elmer with great affection and comfort, and at some point named him the primary beneficiary in his will.

Elmer, fearing that Francis might change the will, poisoned his grandfather. He was convicted of murder but argued that he was still legally entitled to inherit under the will, as the law said nothing about disinheriting a murderer.

The New York Court of Appeals ruled against Elmer, holding that no court should allow a person to profit from their own crime. The court applied a general principle of law — that statutes must be interpreted in light of fundamental moral principles — even when the text of a statute does not explicitly address the situation.

This case is frequently discussed in jurisprudence courses as an example of how courts balance the literal text of statutes against broader principles of justice.',
  'en'
),
(
  'Understanding Anticipatory Bail in India',
  'anticipatory-bail-india',
  'Law',
  'A practical guide to Section 438 of the CrPC — when you can apply for anticipatory bail, what courts consider, and how the process works.',
  'Anticipatory bail, governed by Section 438 of the Code of Criminal Procedure (CrPC), is a direction to release a person on bail in anticipation of an arrest. It is a pre-arrest bail, which means the person has not yet been arrested at the time of the application.

**When Can You Apply?**
Any person who has reason to believe that they may be arrested for a non-bailable offence can apply for anticipatory bail before the Sessions Court or the High Court.

**What Do Courts Consider?**
Courts typically examine the nature and gravity of the accusation, the applicant''s antecedents, the possibility of fleeing justice, and whether the accusation is made to humiliate or injure the applicant.

**Conditions**
Anticipatory bail is often granted with conditions such as making oneself available for interrogation, surrendering the passport, and not tampering with evidence or influencing witnesses.

**Practical Advice**
If you believe you may be falsely implicated or anticipate arrest, consulting a lawyer early is critical. The application must be carefully drafted with supporting documents and relevant case law.',
  'en'
);

-- ── 5. ROW LEVEL SECURITY (RLS) ─────────────────────────────
-- Public can READ everything. No one can write from the browser
-- (admin writes go through your server/API route with service key).

alter table settings       enable row level security;
alter table about          enable row level security;
alter table practice_areas enable row level security;
alter table posts          enable row level security;

-- Allow public SELECT on all tables
create policy "Public read settings"        on settings       for select using (true);
create policy "Public read about"           on about          for select using (true);
create policy "Public read practice_areas"  on practice_areas for select using (true);
create policy "Public read posts"           on posts          for select using (published = true);

-- ── 6. UPDATED_AT TRIGGER ────────────────────────────────────
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_settings_updated   before update on settings       for each row execute procedure set_updated_at();
create trigger trg_about_updated      before update on about          for each row execute procedure set_updated_at();
create trigger trg_posts_updated      before update on posts          for each row execute procedure set_updated_at();
