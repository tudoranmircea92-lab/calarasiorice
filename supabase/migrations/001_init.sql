create extension if not exists pgcrypto;

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  icon text not null,
  created_at timestamptz not null default now()
);

create table if not exists businesses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  category_id uuid not null references categories(id) on delete cascade,
  short_description text not null,
  full_description text not null,
  phone text not null,
  whatsapp text,
  address text not null,
  neighborhood text not null,
  latitude numeric,
  longitude numeric,
  hours_json jsonb not null default '{}'::jsonb,
  price_level int not null default 2,
  is_featured boolean not null default false,
  rating_average numeric(3,2) not null default 0,
  review_count int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists business_images (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  image_url text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  author_name text not null,
  rating int not null check (rating between 1 and 5),
  text text not null,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

alter table categories enable row level security;
alter table businesses enable row level security;
alter table business_images enable row level security;
alter table reviews enable row level security;
alter table profiles enable row level security;

create policy "public read categories" on categories for select using (true);
create policy "public read businesses" on businesses for select using (true);
create policy "public read business images" on business_images for select using (true);
create policy "public read approved reviews" on reviews for select using (status = 'approved');
create policy "public submit reviews" on reviews for insert with check (status = 'pending');
