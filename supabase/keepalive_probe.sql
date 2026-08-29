create or replace function public.keepalive_probe()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select true;
$$;

revoke all on function public.keepalive_probe() from public;
grant execute on function public.keepalive_probe() to anon, authenticated;

comment on function public.keepalive_probe() is
  'Returns true for a read-only keep-alive request without exposing application data.';
