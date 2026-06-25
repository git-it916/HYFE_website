# 배포 가이드 (Cloudflare Pages / Vercel)

정적 SPA라 **git push → 자동 빌드·배포 + 무료 + 자동 HTTPS + 커스텀 도메인**이 가장 단순합니다.
기존 EC2/Docker/ECR 파이프라인은 더 이상 필요 없습니다(아래 "기존 파이프라인 정리" 참고).

핵심 설정값(둘 다 공통):
- **Root directory**: `tools/hyfe-club`  ← 앱이 하위 폴더에 있으므로 필수
- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Env vars**(Supabase 쓸 때만): `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

SPA 라우팅 폴백은 리포에 이미 포함됨:
- Vercel → `tools/hyfe-club/vercel.json`
- Cloudflare → `tools/hyfe-club/public/_redirects`

---

## 옵션 A — Cloudflare Pages (추천: 무료 무제한 대역폭)
1. https://dash.cloudflare.com → **Workers & Pages → Create → Pages → Connect to Git**
2. 이 리포 선택
3. 빌드 설정:
   - Framework preset: `Vite`
   - **Root directory (advanced)**: `tools/hyfe-club`
   - Build command: `npm run build`
   - Build output directory: `dist`
4. (Supabase 사용 시) **Settings → Environment variables** 에 위 2개 추가
5. **Save and Deploy** → 끝. `*.pages.dev` 주소 발급
6. 커스텀 도메인: **Custom domains → Set up** → 도메인 입력 → 안내대로 DNS 등록

## 옵션 B — Vercel
1. https://vercel.com → **Add New → Project → Import** (이 리포)
2. **Root Directory** = `tools/hyfe-club` (Edit로 지정), Framework: Vite 자동 인식
3. (Supabase 사용 시) **Environment Variables** 에 위 2개 추가
4. **Deploy** → `*.vercel.app` 발급 → Settings → Domains 에서 커스텀 도메인 연결

> 어느 쪽이든 이후엔 `main`에 push할 때마다 자동 재배포되고, PR마다 미리보기 URL이 생깁니다.

---

## 도메인 연결 (가비아 등)
플랫폼이 알려주는 값을 그대로 등록하면 됩니다(보통):
- 루트(`@`): 플랫폼 안내에 따라 A 레코드 또는 CNAME 플래트닝
- `www`: CNAME → `<your-project>.pages.dev` (또는 `cname.vercel-dns.com`)

HTTPS 인증서는 자동 발급됩니다(Let's Encrypt 수동 작업 불필요).

---

## 기존 파이프라인 정리 (EC2/Docker/ECR)
새 호스팅으로 옮기면 다음은 불필요 — 비용/혼선 방지를 위해 정리 권장:
- `.github/workflows/deploy.yml` → **비활성화 또는 삭제** (안 그러면 push마다 EC2 배포를 계속 시도)
- `Dockerfile`, `nginx.conf` → 보관해도 무방하나 미사용
- EC2 인스턴스 / ECR 저장소 → 과금 중단하려면 콘솔에서 중지·삭제
- GitHub Secrets(AWS 키 등) → 사용 안 하면 제거

> `deploy.yml` 비활성화는 되돌리기 번거로운 변경이라 직접 확인 후 진행하세요.
> 원하시면 `.github/workflows/deploy.yml`을 비활성화(`if: false`)하거나 삭제해 드리겠습니다.
