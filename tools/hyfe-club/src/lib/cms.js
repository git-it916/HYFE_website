/* ════════════════════════════════════════════════════════════
   CMS layer — Supabase when configured, else localStorage fallback.
   Activities content (시황정리 + 팀별 세션) + admin auth + image upload.
   env: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY  → see SUPABASE_SETUP.md
   ════════════════════════════════════════════════════════════ */
import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** True when both env vars are present → real backend is used. */
export const cmsEnabled = Boolean(url && anon);

const supabase = cmsEnabled ? createClient(url, anon) : null;

const BUCKET = 'activities';
// Local-mode admin credentials (used only when Supabase isn't configured).
// Override via .env: VITE_ADMIN_ID / VITE_ADMIN_PW
const ADMIN_ID = import.meta.env.VITE_ADMIN_ID || 'admin';
const ADMIN_PW = import.meta.env.VITE_ADMIN_PW || 'hyfe2024';
const ADMIN_NAME = import.meta.env.VITE_ADMIN_NAME || '신승훈';
const LS = { ADMIN: 'hyfe_is_admin', MARKET: 'hyfe_market_review', TEAMS: 'hyfe_team_sessions' };

export const DEFAULT_MARKET = { text: '', images: [] };
export const DEFAULT_TEAMS = [
  { id: 'quant', title: 'Quant Team', text: '', images: [] },
  { id: 'ibd', title: 'IBD Team', text: '', images: [] },
  { id: 'research', title: 'Research Team', text: '', images: [] },
  { id: 'derivatives', title: 'Derivatives Team', text: '', images: [] },
];

/* ── Auth ── */

export async function getCurrentUser() {
  if (!cmsEnabled) {
    return localStorage.getItem(LS.ADMIN) === 'true' ? { name: ADMIN_NAME, email: ADMIN_ID } : null;
  }
  const { data } = await supabase.auth.getSession();
  return data.session?.user ?? null;
}

/** Display name for greeting — local name, Supabase metadata name, or email. */
export function displayName(user) {
  return user?.name || user?.user_metadata?.name || user?.email || 'Admin';
}

/** Subscribe to auth changes. Returns an unsubscribe fn. No-op in local mode. */
export function onAuthChange(cb) {
  if (!cmsEnabled) return () => {};
  const { data } = supabase.auth.onAuthStateChange((_e, session) => cb(session?.user ?? null));
  return () => data.subscription.unsubscribe();
}

export async function signIn(id, password) {
  if (!cmsEnabled) {
    // local mode: plain id + pw match → admin
    if (id === ADMIN_ID && password === ADMIN_PW) {
      localStorage.setItem(LS.ADMIN, 'true');
      return;
    }
    throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.');
  }
  // Supabase mode: id is the account email
  const { error } = await supabase.auth.signInWithPassword({ email: id, password });
  if (error) throw new Error(error.message);
}

export async function signOut() {
  if (!cmsEnabled) { localStorage.removeItem(LS.ADMIN); return; }
  await supabase.auth.signOut();
}

/* ── Content ── */

export async function loadContent() {
  if (!cmsEnabled) {
    const m = localStorage.getItem(LS.MARKET);
    const t = localStorage.getItem(LS.TEAMS);
    return {
      marketReview: m ? JSON.parse(m) : DEFAULT_MARKET,
      teamSessions: t ? JSON.parse(t) : DEFAULT_TEAMS,
    };
  }
  const { data, error } = await supabase
    .from('site_content')
    .select('key,data')
    .in('key', ['market_review', 'team_sessions']);
  if (error) throw new Error(error.message);
  const byKey = Object.fromEntries((data || []).map((r) => [r.key, r.data]));
  return {
    marketReview: byKey.market_review ?? DEFAULT_MARKET,
    teamSessions: byKey.team_sessions ?? DEFAULT_TEAMS,
  };
}

export async function saveMarketReview(data) {
  if (!cmsEnabled) { localStorage.setItem(LS.MARKET, JSON.stringify(data)); return; }
  const { error } = await supabase.from('site_content').upsert({ key: 'market_review', data });
  if (error) throw new Error(error.message);
}

export async function saveTeamSessions(data) {
  if (!cmsEnabled) { localStorage.setItem(LS.TEAMS, JSON.stringify(data)); return; }
  const { error } = await supabase.from('site_content').upsert({ key: 'team_sessions', data });
  if (error) throw new Error(error.message);
}

/* ── Image upload ── */

export async function uploadImage(file) {
  if (!file.type?.startsWith('image/')) throw new Error('이미지 파일만 업로드할 수 있습니다.');
  if (!cmsEnabled) return fileToDataUrl(file); // local-only base64

  const ext = (file.name.split('.').pop() || 'png').toLowerCase();
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { cacheControl: '31536000', upsert: false });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
