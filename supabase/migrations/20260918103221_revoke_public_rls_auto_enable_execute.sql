-- This helper is not part of the public application API. Keep its
-- SECURITY DEFINER implementation unreachable through PostgREST.
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM anon, authenticated;
