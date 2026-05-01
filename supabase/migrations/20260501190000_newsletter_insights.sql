create extension if not exists pgcrypto;

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  status text not null default 'pending',
  source text not null default 'website',
  created_at timestamptz not null default now(),
  confirmed_at timestamptz,
  unsubscribed_at timestamptz,
  constraint newsletter_subscribers_status_check check (status in ('pending', 'active', 'unsubscribed'))
);

create table if not exists public.insight_articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  body text not null,
  category text not null,
  source_url text,
  source_title text,
  status text not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint insight_articles_status_check check (status in ('draft', 'review', 'published', 'archived'))
);

create table if not exists public.newsletter_editions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subject text not null,
  summary text not null,
  body text not null,
  status text not null default 'draft',
  scheduled_for timestamptz,
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint newsletter_editions_status_check check (status in ('draft', 'review', 'approved', 'sent', 'archived'))
);

alter table public.newsletter_subscribers enable row level security;
alter table public.insight_articles enable row level security;
alter table public.newsletter_editions enable row level security;

create policy "Anyone can subscribe"
  on public.newsletter_subscribers
  for insert
  to anon
  with check (status = 'pending' and source = 'website');

create policy "Published articles are public"
  on public.insight_articles
  for select
  to anon
  using (status = 'published');

create policy "Sent editions are public"
  on public.newsletter_editions
  for select
  to anon
  using (status = 'sent');
