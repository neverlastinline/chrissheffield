-- ============================================================================
-- Medal Rush 3D — online leaderboard schema (Supabase / Postgres)
--
-- HOW TO USE
--   1. Create a free project at https://supabase.com
--   2. Open the SQL Editor, paste this whole file, and click "Run".
--   3. Project Settings → API → copy the "Project URL" and the public "anon"
--      key, then paste them into SUPABASE_URL / SUPABASE_ANON_KEY near the top
--      of medal-rush/index.html.
--
-- The anon key is safe to ship in a public static site: row-level security
-- (below) only lets anonymous visitors READ the board and INSERT a single
-- score row. They cannot update or delete anyone's scores.
-- ============================================================================

create table if not exists public.medal_rush_scores (
  id         uuid        primary key default gen_random_uuid(),
  name       text        not null check (char_length(trim(name)) between 1 and 12),
  score      integer     not null check (score >= 0 and score <= 100000),
  medals     integer     not null default 0 check (medals  >= 0 and medals  <= 100000),
  combo      integer     not null default 0 check (combo   >= 0 and combo   <= 100000),
  created_at timestamptz not null default now()
);

-- fast "top N by score" reads
create index if not exists medal_rush_scores_score_idx
  on public.medal_rush_scores (score desc);

-- lock the table down, then open exactly two anonymous actions
alter table public.medal_rush_scores enable row level security;

drop policy if exists "anon can read the leaderboard" on public.medal_rush_scores;
create policy "anon can read the leaderboard"
  on public.medal_rush_scores
  for select
  to anon
  using (true);

drop policy if exists "anon can add a score" on public.medal_rush_scores;
create policy "anon can add a score"
  on public.medal_rush_scores
  for insert
  to anon
  with check (
    char_length(trim(name)) between 1 and 12
    and score  >= 0 and score  <= 100000
    and medals >= 0
    and combo  >= 0
  );
