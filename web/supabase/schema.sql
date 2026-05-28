-- Footy Feud — Supabase schema
-- Run in Supabase SQL editor or via `supabase db push`.

create extension if not exists "uuid-ossp";

-- Reference table of AFL clubs (read-only for everyone).
create table if not exists public.teams (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null unique,
  short_code  text not null unique,
  city        text not null,
  created_at  timestamptz not null default now()
);

-- User-owned AFL player cards (the CRUD feature).
-- Stats are normalized 0-100 and used for head-to-head comparison.
create table if not exists public.cards (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  player_name text not null,
  team        text not null,
  position    text not null
              check (position in ('Forward','Midfielder','Defender','Ruck','Utility')),
  kicks       integer not null default 50 check (kicks       between 0 and 100),
  handballs   integer not null default 50 check (handballs   between 0 and 100),
  marks       integer not null default 50 check (marks       between 0 and 100),
  tackles     integer not null default 50 check (tackles     between 0 and 100),
  goals       integer not null default 50 check (goals       between 0 and 100),
  image_url   text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists cards_user_id_idx on public.cards(user_id);

-- Game results (one row per finished Footy Feud round vs CPU).
create table if not exists public.games (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  user_score    integer not null default 0,
  cpu_score     integer not null default 0,
  rounds_played integer not null default 0,
  outcome       text not null check (outcome in ('win','loss','draw')),
  played_at     timestamptz not null default now()
);

create index if not exists games_user_id_idx   on public.games(user_id);
create index if not exists games_played_at_idx on public.games(played_at desc);

-- updated_at trigger for cards
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists cards_set_updated_at on public.cards;
create trigger cards_set_updated_at
  before update on public.cards
  for each row execute function public.set_updated_at();

-- Leaderboard view: total wins per user (RLS-bypassed via security_invoker=false default).
create or replace view public.leaderboard as
select
  u.id                                                  as user_id,
  coalesce(u.raw_user_meta_data->>'display_name',
           split_part(u.email, '@', 1))                 as display_name,
  count(g.*) filter (where g.outcome = 'win')           as wins,
  count(g.*) filter (where g.outcome = 'loss')          as losses,
  count(g.*) filter (where g.outcome = 'draw')          as draws,
  count(g.*)                                            as games_played
from auth.users u
left join public.games g on g.user_id = u.id
group by u.id, u.raw_user_meta_data, u.email;

grant select on public.leaderboard to anon, authenticated;

-- Row Level Security
alter table public.cards enable row level security;
alter table public.games enable row level security;
alter table public.teams enable row level security;

drop policy if exists "cards: owner read"   on public.cards;
drop policy if exists "cards: owner insert" on public.cards;
drop policy if exists "cards: owner update" on public.cards;
drop policy if exists "cards: owner delete" on public.cards;

create policy "cards: owner read"   on public.cards for select using (auth.uid() = user_id);
create policy "cards: owner insert" on public.cards for insert with check (auth.uid() = user_id);
create policy "cards: owner update" on public.cards for update using (auth.uid() = user_id);
create policy "cards: owner delete" on public.cards for delete using (auth.uid() = user_id);

drop policy if exists "games: owner read"   on public.games;
drop policy if exists "games: owner insert" on public.games;
create policy "games: owner read"   on public.games for select using (auth.uid() = user_id);
create policy "games: owner insert" on public.games for insert with check (auth.uid() = user_id);

drop policy if exists "teams: public read" on public.teams;
create policy "teams: public read" on public.teams for select using (true);

-- Seed the 18 AFL clubs (idempotent).
insert into public.teams (name, short_code, city) values
  ('Adelaide Crows',         'ADE', 'Adelaide'),
  ('Brisbane Lions',         'BRL', 'Brisbane'),
  ('Carlton',                'CAR', 'Melbourne'),
  ('Collingwood',            'COL', 'Melbourne'),
  ('Essendon',               'ESS', 'Melbourne'),
  ('Fremantle',              'FRE', 'Perth'),
  ('Geelong Cats',           'GEE', 'Geelong'),
  ('Gold Coast Suns',        'GCS', 'Gold Coast'),
  ('GWS Giants',             'GWS', 'Sydney'),
  ('Hawthorn',               'HAW', 'Melbourne'),
  ('Melbourne',              'MEL', 'Melbourne'),
  ('North Melbourne',        'NTH', 'Melbourne'),
  ('Port Adelaide',          'PTA', 'Adelaide'),
  ('Richmond',               'RIC', 'Melbourne'),
  ('St Kilda',               'STK', 'Melbourne'),
  ('Sydney Swans',           'SYD', 'Sydney'),
  ('West Coast Eagles',      'WCE', 'Perth'),
  ('Western Bulldogs',       'WBD', 'Melbourne')
on conflict (name) do nothing;
