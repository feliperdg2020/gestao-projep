-- Configuração temporária para o MVP da PROJEP.
-- Como o sistema ainda não usa Supabase Auth, o frontend precisa escrever nas tabelas com a chave pública.
-- Quando migrarmos para Supabase Auth, substituímos isso por políticas RLS por usuário.

alter table if exists public.sectors disable row level security;
alter table if exists public.profiles disable row level security;
alter table if exists public.permissions disable row level security;
alter table if exists public.chat_messages disable row level security;
alter table if exists public.notifications disable row level security;
alter table if exists public.meetings disable row level security;
alter table if exists public.meeting_responsibles disable row level security;

insert into public.sectors (id, name)
values
  ('diretoria', 'Diretoria'),
  ('administrativo-financeiro', 'Adm e Fin'),
  ('comercial', 'Comercial'),
  ('projetos', 'Projetos'),
  ('marketing', 'Marketing'),
  ('gestao-pessoas', 'Gestão de Pessoas')
on conflict (id) do update set name = excluded.name;

