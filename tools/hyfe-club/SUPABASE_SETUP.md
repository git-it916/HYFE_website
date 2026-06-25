# Supabase 셋업 (Activities CMS)

Activities 페이지의 이미지·텍스트를 **모든 방문자에게 공유**되도록 저장하고, 드래그앤드롭 업로드 + 진짜 관리자 로그인을 켭니다.
env(`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)를 설정하기 전까지는 자동으로 **localStorage 폴백**(이 브라우저에서만 저장)으로 동작하므로, 천천히 설정해도 됩니다.

소요 시간: 약 10분.

---

## 1. 프로젝트 생성
1. https://supabase.com → 로그인 → **New project**
2. 이름/DB 비밀번호/리전(`Northeast Asia (Seoul)` 권장) 선택 → 생성(1~2분)

## 2. 키 복사
- **Project Settings → API** 에서
  - `Project URL` → `VITE_SUPABASE_URL`
  - `anon` `public` 키 → `VITE_SUPABASE_ANON_KEY`
- ⚠️ `service_role` 키는 절대 프론트엔드/깃에 넣지 마세요.

## 3. 테이블 + 보안정책(RLS)
**SQL Editor → New query** 에 붙여넣고 실행:

```sql
-- 콘텐츠 테이블 (행 2개: market_review, team_sessions)
create table if not exists public.site_content (
  key        text primary key,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

-- 누구나 읽기 (사이트 공개 표시용)
create policy "public read" on public.site_content
  for select using (true);

-- 로그인한 관리자만 쓰기
create policy "auth insert" on public.site_content
  for insert to authenticated with check (true);
create policy "auth update" on public.site_content
  for update to authenticated using (true) with check (true);

-- 초기 행 시드
insert into public.site_content (key, data) values
  ('market_review', '{"text":"","images":[]}'::jsonb),
  ('team_sessions',
   '[{"id":"quant","title":"Quant Team","text":"","images":[]},
     {"id":"ibd","title":"IBD Team","text":"","images":[]},
     {"id":"research","title":"Research Team","text":"","images":[]},
     {"id":"derivatives","title":"Derivatives Team","text":"","images":[]}]'::jsonb)
on conflict (key) do nothing;
```

## 4. 이미지 저장소(Storage)
1. **Storage → New bucket** → 이름 `activities` → **Public bucket 체크** → 생성
2. **SQL Editor** 에서 업로드 권한 정책 실행:

```sql
-- activities 버킷: 공개 읽기 + 로그인 사용자만 업로드
create policy "public read activities" on storage.objects
  for select using ( bucket_id = 'activities' );
create policy "auth upload activities" on storage.objects
  for insert to authenticated with check ( bucket_id = 'activities' );
```

## 5. 관리자 계정 생성
- **Authentication → Users → Add user** → 이메일/비밀번호 입력 → 생성
- 이 계정이 사이트의 Admin 로그인 계정입니다. (가입 폼은 사이트에 없음 — 여기서만 발급)

## 6. env 적용
- **로컬 개발**: `tools/hyfe-club/.env` 파일 생성(`.env.example` 복사) 후 두 값 입력 → `npm run dev`
- **배포(Cloudflare/Vercel)**: 대시보드 → Settings → Environment Variables 에 `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` 추가 → 재배포

## 확인
Activities 페이지 → 우상단 **Admin** → 이메일/비번 로그인 → `● SUPABASE` 표시 확인 →
이미지 드래그앤드롭 → 다른 브라우저/시크릿창에서도 보이면 성공.

> anon 키는 공개돼도 안전합니다(쓰기는 RLS + 로그인으로 차단). 단 service_role 키는 절대 노출 금지.
