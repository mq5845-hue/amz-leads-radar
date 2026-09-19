import type { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabase } from './supabase';

type DashboardProfile = {
  id: string;
  email: string;
  plan: 'free' | 'pro' | 'agency';
  daily_usage_left: number;
  max_daily_usage: number;
  brand_name: string;
  store_url: string;
};

type AuthState = {
  mode: 'demo' | 'authenticated';
  configured: boolean;
  ready: boolean;
  email?: string;
  profile?: DashboardProfile | null;
  error?: string;
};

type AuthResult = { success: boolean; error?: string; data?: unknown };

declare global {
  interface Window {
    amzAuth: {
      signIn(email: string, password: string): Promise<AuthResult>;
      signOut(): Promise<AuthResult>;
      getAccessToken(): Promise<string | null>;
      updateProfile(patch: { brand_name: string; store_url: string }): Promise<AuthResult>;
      consumeQuota(): Promise<{ success: boolean; message?: string; usage_left?: number }>;
    };
  }
}

let currentUserId: string | null = null;

function emit(state: AuthState) {
  window.dispatchEvent(new CustomEvent<AuthState>('amz-auth-change', { detail: state }));
}

function profileFromRow(row: Record<string, unknown>): DashboardProfile {
  return {
    id: String(row.id || ''),
    email: String(row.email || ''),
    plan: row.plan === 'pro' || row.plan === 'agency' ? row.plan : 'free',
    daily_usage_left: Number(row.daily_usage_left ?? 0),
    max_daily_usage: Number(row.max_daily_usage ?? 0),
    brand_name: String(row.brand_name || ''),
    store_url: String(row.store_url || ''),
  };
}

async function loadProfile(session: Session) {
  if (!supabase) return;

  currentUserId = session.user.id;
  const { data, error } = await supabase
    .from('profiles')
    .select('id,email,plan,daily_usage_left,max_daily_usage,brand_name,store_url')
    .eq('id', session.user.id)
    .maybeSingle();

  if (error) {
    emit({
      mode: 'authenticated',
      configured: true,
      ready: false,
      email: session.user.email || '',
      profile: null,
      error: '登入成功，但無法讀取 public.profiles。請確認 migration、RLS 與 profile row。',
    });
    return;
  }

  if (!data) {
    emit({
      mode: 'authenticated',
      configured: true,
      ready: false,
      email: session.user.email || '',
      profile: null,
      error: '登入成功，但找不到對應的 public.profiles。請先建立 profile row。',
    });
    return;
  }

  emit({
    mode: 'authenticated',
    configured: true,
    ready: true,
    email: session.user.email || String(data.email || ''),
    profile: profileFromRow(data),
  });
}

async function applySession(session: Session | null) {
  if (!session) {
    currentUserId = null;
    emit({ mode: 'demo', configured: isSupabaseConfigured, ready: true });
    return;
  }

  await loadProfile(session);
}

async function init() {
  if (!supabase || !isSupabaseConfigured) {
    emit({ mode: 'demo', configured: false, ready: true });
    return;
  }

  const { data, error } = await supabase.auth.getSession();
  if (error) {
    emit({ mode: 'demo', configured: true, ready: true, error: 'Supabase session 初始化失敗，已回到 Demo mode。' });
  } else {
    await applySession(data.session);
  }

  supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
    window.setTimeout(() => void applySession(session), 0);
  });
}

window.amzAuth = {
  async signIn(email, password) {
    if (!supabase || !isSupabaseConfigured) return { success: false, error: '尚未設定 Supabase URL/anon key。' };
    const normalizedEmail = email.trim();
    if (!normalizedEmail || !password) return { success: false, error: '請輸入 Email 與密碼。' };

    const { data, error } = await supabase.auth.signInWithPassword({ email: normalizedEmail, password });
    if (error) return { success: false, error: '登入失敗，請確認 Email、密碼與 Supabase Auth 設定。' };
    if (data.session) await applySession(data.session);
    return { success: true };
  },

  async signOut() {
    if (!supabase) return { success: true };
    const { error } = await supabase.auth.signOut();
    return error ? { success: false, error: '登出失敗，請稍後再試。' } : { success: true };
  },

  async getAccessToken() {
    if (!supabase || !isSupabaseConfigured) return null;
    const { data, error } = await supabase.auth.getSession();
    return error ? null : data.session?.access_token || null;
  },

  async updateProfile(patch) {
    if (!supabase || !currentUserId) return { success: false, error: '目前沒有可更新的登入 session。' };
    const { data, error } = await supabase
      .from('profiles')
      .update({ brand_name: patch.brand_name, store_url: patch.store_url, updated_at: new Date().toISOString() })
      .eq('id', currentUserId)
      .select('id,email,plan,daily_usage_left,max_daily_usage,brand_name,store_url')
      .single();
    if (error || !data) return { success: false, error: '品牌設定儲存失敗，請確認 profile RLS。' };
    emit({ mode: 'authenticated', configured: true, ready: true, email: String(data.email || ''), profile: profileFromRow(data) });
    return { success: true, data: profileFromRow(data) };
  },

  async consumeQuota() {
    if (!supabase || !currentUserId) return { success: false, message: '目前沒有可用的登入 session。' };
    const { data, error } = await supabase.rpc('consume_daily_quota', { p_user_id: currentUserId });
    if (error) return { success: false, message: 'server quota 暫時無法更新，請稍後再試。' };
    if (!data?.success) return { success: false, message: String(data?.message || '今日額度已用完。'), usage_left: Number(data?.usage_left ?? 0) };

    const { data: sessionData } = await supabase.auth.getSession();
    if (sessionData.session) await loadProfile(sessionData.session);
    return { success: true, usage_left: Number(data.usage_left ?? 0) };
  },
};

window.addEventListener('DOMContentLoaded', () => void init());
