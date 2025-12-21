-- Customers table
create table customers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  company text,
  email text,
  phone text,
  communication_style text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Meetings table
create table meetings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  customer_id uuid references customers(id) on delete cascade not null,
  title text not null,
  scheduled_at timestamptz not null,
  status text check (status in ('planned', 'completed', 'cancelled')) default 'planned' not null,
  preparation text,
  notes text,
  transcript text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable Row Level Security
alter table customers enable row level security;
alter table meetings enable row level security;

-- RLS Policies for customers
create policy "Users can view their own customers"
  on customers for select
  using (auth.uid() = user_id);

create policy "Users can insert their own customers"
  on customers for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own customers"
  on customers for update
  using (auth.uid() = user_id);

create policy "Users can delete their own customers"
  on customers for delete
  using (auth.uid() = user_id);

-- RLS Policies for meetings
create policy "Users can view their own meetings"
  on meetings for select
  using (auth.uid() = user_id);

create policy "Users can insert their own meetings"
  on meetings for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own meetings"
  on meetings for update
  using (auth.uid() = user_id);

create policy "Users can delete their own meetings"
  on meetings for delete
  using (auth.uid() = user_id);

-- Indexes for performance
create index customers_user_id_idx on customers(user_id);
create index meetings_user_id_idx on meetings(user_id);
create index meetings_customer_id_idx on meetings(customer_id);
create index meetings_scheduled_at_idx on meetings(scheduled_at);

-- Updated_at trigger function
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply updated_at triggers
create trigger update_customers_updated_at
  before update on customers
  for each row execute function update_updated_at_column();

create trigger update_meetings_updated_at
  before update on meetings
  for each row execute function update_updated_at_column();
