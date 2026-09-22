-- Additive i18n profile preferences.
-- Existing rows receive the product default locale/timezone.
-- This migration does not change RLS ownership policies or user-generated content.

alter table public.profiles
  add column if not exists locale text not null default 'en',
  add column if not exists timezone text not null default 'UTC';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.profiles'::regclass
      and conname = 'profiles_locale_supported_check'
  ) then
    alter table public.profiles
      add constraint profiles_locale_supported_check
      check (locale in ('zh-TW', 'zh-CN', 'en', 'ja', 'ko', 'ms', 'id', 'vi'));
  end if;
end;
$$;

comment on column public.profiles.locale is
  'Authenticated user interface locale; does not translate user-generated review or AI draft content.';
comment on column public.profiles.timezone is
  'IANA timezone used for user-facing dates and localized email/notification rendering.';
