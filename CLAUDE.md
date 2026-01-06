# HYFE Website - 프로젝트 문서

> 이 문서는 Claude Code가 프로젝트를 빠르게 이해하고 작업할 수 있도록 작성되었습니다.

## 📋 목차

1. [프로젝트 개요](#프로젝트-개요)
2. [기술 스택](#기술-스택)
3. [프로젝트 구조](#프로젝트-구조)
4. [배포 파이프라인](#배포-파이프라인)
5. [주요 기능](#주요-기능)
6. [관리자 시스템](#관리자-시스템)
7. [개발 가이드](#개발-가이드)
8. [배포 가이드](#배포-가이드)
9. [도메인 연결](#도메인-연결)

---

## 프로젝트 개요

**HYFE (HanYang Financial Engineering)** 학회 공식 웹사이트

- **목적**: 학회 소개, 활동 안내, 리크루팅 정보 제공
- **사용자**: 일반 방문자 + 관리자 (Activities 페이지 편집)
- **호스팅**: AWS EC2 + ECR (Docker)
- **서버 IP**: `3.37.76.110`

---

## 기술 스택

### Frontend
- **Framework**: React 18.2.0
- **Build Tool**: Vite 5.0.8
- **Router**: React Router DOM 7.9.6
- **Styling**: 순수 CSS (CSS-in-JS, Inline `<style>` 태그)
- **Icons**: Lucide React 0.292.0
- **No CSS Framework**: Tailwind 사용 안 함, 커스텀 CSS 변수 사용

### Infrastructure
- **CI/CD**: GitHub Actions
- **Container**: Docker (Multi-stage build)
- **Registry**: AWS ECR (Elastic Container Registry)
- **Server**: AWS EC2
- **Web Server**: Nginx (Alpine)

### 상태 관리
- **로컬 상태**: React Hooks (`useState`, `useEffect`)
- **데이터 저장**: localStorage (관리자 데이터)
- **인증**: 간단한 패스워드 기반 (localStorage)

---

## 프로젝트 구조

```
HYFE_website-1/
├── .github/
│   └── workflows/
│       └── deploy.yml                 # GitHub Actions 배포 워크플로우
├── tools/
│   └── hyfe-club/                     # React 앱 루트
│       ├── public/
│       │   └── images/
│       │       └── activities/        # 활동 이미지 저장 폴더
│       ├── src/
│       │   └── App.jsx                # 메인 앱 파일 (모든 컴포넌트 포함)
│       ├── package.json
│       ├── vite.config.js
│       └── index.html
├── Dockerfile                         # 멀티 스테이지 Docker 빌드
├── nginx.conf                         # Nginx 설정 (SPA 라우팅 지원)
└── CLAUDE.md                          # 이 문서

```

### 주요 파일 설명

#### `tools/hyfe-club/src/App.jsx`
**단일 파일 구조** - 모든 컴포넌트가 하나의 파일에 있음

**컴포넌트 목록**:
- `Layout` - 헤더, 네비게이션, 푸터
- `LandingPage` - 메인 홈페이지
- `AboutPage` - 학회 소개
- `PeoplePage` - 찾는 인재상
- `ActivitiesIndex` - **활동 페이지 (관리자 기능 포함)** ⭐
- `ActivityDetail` - 개별 활동 상세 (현재 사용 안 함)
- `RecruitingPage` - 리크루팅 정보

**데이터 구조**:
```javascript
// 하드코딩된 정적 데이터
const activities = [...];          // 4개 팀 정보
const curriculumStages = [...];    // 3단계 커리큘럼
const awards = [...];              // 수상 내역
const idealCandidates = [...];     // 인재상
const recruitingTabs = {...};      // 리크루팅 정보

// 관리자 설정
const ADMIN_PASSWORD = 'hyfe2024';
const STORAGE_KEYS = {
  IS_ADMIN: 'hyfe_is_admin',
  MARKET_REVIEW: 'hyfe_market_review',
  TEAM_SESSIONS: 'hyfe_team_sessions'
};
```

#### `Dockerfile`
**멀티 스테이지 빌드**:
1. **Stage 1 (builder)**: Node.js 20 Alpine에서 React 앱 빌드
2. **Stage 2 (production)**: Nginx Alpine에 빌드 결과물만 복사

**최적화**:
- 최종 이미지 크기 최소화
- Node.js는 빌드에만 사용, 프로덕션 이미지에서 제외

#### `nginx.conf`
**주요 설정**:
- SPA 라우팅 지원 (`try_files $uri $uri/ /index.html`)
- Gzip 압축
- 정적 파일 캐싱 (1년)
- index.html 캐싱 비활성화
- 보안 헤더 추가

#### `.github/workflows/deploy.yml`
**자동 배포 파이프라인**:
1. `main` 브랜치 push 시 자동 트리거
2. AWS 인증
3. ECR 로그인
4. Docker 이미지 빌드 & 태그 (커밋 SHA + latest)
5. ECR에 이미지 푸시
6. EC2에 SSH 접속
7. `/home/ec2-user/deploy.sh` 실행
8. 배포 확인

---

## 배포 파이프라인

### 전체 흐름

```
개발자 Push (main)
    ↓
GitHub Actions 트리거
    ↓
Docker 이미지 빌드
    ├─ Stage 1: npm ci + npm run build (Vite)
    └─ Stage 2: Nginx + dist/ 파일
    ↓
AWS ECR에 푸시
    ├─ 태그: {COMMIT_SHA}
    └─ 태그: latest
    ↓
EC2 SSH 접속
    ↓
deploy.sh 실행
    ├─ ECR에서 latest 이미지 pull
    ├─ 기존 컨테이너 중지/삭제
    └─ 새 컨테이너 시작 (포트 80)
    ↓
웹사이트 업데이트 완료
```

### GitHub Secrets 설정

Repository → Settings → Secrets and variables → Actions:

| Secret 이름 | 설명 | 예시 |
|-------------|------|------|
| `AWS_REGION` | AWS 리전 | `ap-northeast-2` |
| `AWS_ACCESS_KEY_ID` | AWS 액세스 키 | `AKIA...` |
| `AWS_SECRET_ACCESS_KEY` | AWS 비밀 키 | `...` |
| `ECR_REPOSITORY_NAME` | ECR 저장소 이름 | `hyfe-website` |
| `EC2_HOST` | EC2 IP 주소 | `3.37.76.110` |
| `EC2_SSH_PRIVATE_KEY` | SSH 개인 키 | `-----BEGIN RSA...` |

---

## 주요 기능

### 1. 페이지 구조

| 경로 | 컴포넌트 | 설명 |
|------|---------|------|
| `/` | LandingPage | 메인 홈페이지 |
| `/about` | AboutPage | 학회 소개 |
| `/activities` | ActivitiesIndex | **활동 페이지 (관리자 기능)** ⭐ |
| `/activities/:id` | ActivityDetail | 개별 활동 상세 (미사용) |
| `/people` | PeoplePage | 찾는 인재상 |
| `/recruiting/process` | RecruitingPage | 리크루팅 절차 |
| `/recruiting/apply` | RecruitingPage | 지원 방법 |

### 2. Activities 페이지 구조

**일반 사용자 뷰**:
```
Our Activities
├── 시황정리
│   ├── 텍스트 내용
│   └── 이미지들 (그리드)
└── 팀별 세션
    ├── IBD Team
    │   ├── 활동 설명
    │   └── 이미지들
    ├── Research Team
    ├── Quant Team
    └── Derivatives Team
```

**관리자 뷰**:
```
[관리자 로그아웃] (오른쪽 상단)

Our Activities
├── 시황정리 [+ 이미지 추가]
│   ├── <textarea> (편집 가능)
│   └── 이미지들 (각각 X 버튼)
└── 팀별 세션
    ├── IBD Team [+ 이미지 추가]
    │   ├── <textarea> (편집 가능)
    │   └── 이미지들 (각각 X 버튼)
    └── ...
```

---

## 관리자 시스템

### 인증

**로그인 방법**:
1. Activities 페이지 접속
2. 오른쪽 상단 "관리자 로그인" 클릭
3. 비밀번호 입력: `hyfe2024`
4. localStorage에 `hyfe_is_admin: 'true'` 저장

**로그아웃**:
- 오른쪽 상단 "로그아웃" 버튼
- localStorage에서 `hyfe_is_admin` 제거

### 데이터 관리

**localStorage 구조**:
```javascript
{
  "hyfe_is_admin": "true",
  "hyfe_market_review": {
    "text": "시황정리 내용...",
    "images": ["/images/activities/meeting.jpg", ...]
  },
  "hyfe_team_sessions": [
    {
      "id": "ibd",
      "title": "IBD Team",
      "text": "IBD 활동 내용...",
      "images": ["/images/activities/ibd1.jpg", ...]
    },
    ...
  ]
}
```

### 이미지 관리 프로세스

#### 1. 이미지 파일 추가 (로컬)
```bash
# 이미지 파일을 다음 폴더에 복사
tools/hyfe-club/public/images/activities/

# 예시:
# meeting.jpg
# ibd-session.png
# research-presentation.jpg
```

#### 2. 웹사이트에서 이미지 등록
1. 관리자 로그인
2. "+ 이미지 추가" 버튼 클릭
3. 파일명 입력 (예: `meeting.jpg`)
4. 자동으로 `/images/activities/meeting.jpg` 경로로 저장
5. 즉시 화면에 표시됨

#### 3. 이미지 삭제
- 이미지 오른쪽 상단 X 버튼 클릭
- localStorage에서 제거됨

**중요 사항**:
- 이미지 파일 자체는 삭제되지 않음 (public 폴더에 남음)
- localStorage에서만 참조가 제거됨
- 불필요한 이미지 파일은 수동으로 삭제 필요

---

## 개발 가이드

### 로컬 개발 환경 설정

```bash
# 1. 프로젝트 디렉토리로 이동
cd "C:\Users\10845\OneDrive - 이지스자산운용\문서\quant_project\HYFE_website-1\tools\hyfe-club"

# 2. 의존성 설치 (최초 1회)
npm install

# 3. 개발 서버 실행
npm run dev

# 4. 브라우저에서 열기
# http://localhost:5173
```

### 프로덕션 빌드 테스트

```bash
# 빌드
npm run build

# 빌드 결과물 미리보기
npm run preview
```

### 주요 파일 수정

#### UI/스타일 변경
- 파일: `tools/hyfe-club/src/App.jsx`
- 위치: `<style>` 태그 내부 (121번째 줄부터)
- CSS 변수: `:root` 섹션에서 색상/폰트 수정

#### 콘텐츠 변경
- 파일: `tools/hyfe-club/src/App.jsx`
- 정적 데이터: `activities`, `awards`, `idealCandidates` 등

#### 관리자 비밀번호 변경
- 파일: `tools/hyfe-club/src/App.jsx`
- 위치: 84번째 줄 `const ADMIN_PASSWORD = 'hyfe2024';`

#### Nginx 설정 변경
- 파일: `nginx.conf`
- 도메인 연결 시 `server_name` 수정 필요

---

## 배포 가이드

### 자동 배포 (추천)

```bash
# 1. 코드 수정 후 커밋
git add .
git commit -m "Update: 변경 내용 설명"

# 2. main 브랜치에 푸시
git push origin main

# 3. GitHub Actions 자동 실행
# - Actions 탭에서 진행 상황 확인
# - 약 5-10분 소요

# 4. 배포 완료 확인
# http://3.37.76.110 접속
```

### 수동 배포 (EC2 서버에서)

```bash
# EC2에 SSH 접속
ssh -i your-key.pem ec2-user@3.37.76.110

# deploy.sh 실행 (관리자가 미리 작성한 스크립트)
/home/ec2-user/deploy.sh

# 또는 수동으로:
# 1. ECR에서 이미지 가져오기
aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin {ECR_REGISTRY}
docker pull {ECR_REGISTRY}/hyfe-website:latest

# 2. 기존 컨테이너 중지
docker stop hyfe-website || true
docker rm hyfe-website || true

# 3. 새 컨테이너 시작
docker run -d \
  --name hyfe-website \
  -p 80:80 \
  --restart unless-stopped \
  {ECR_REGISTRY}/hyfe-website:latest

# 4. 확인
docker ps | grep hyfe-website
curl http://localhost
```

### 롤백 (이전 버전으로 복구)

```bash
# EC2에서 실행

# 1. 특정 커밋 SHA로 롤백
docker pull {ECR_REGISTRY}/hyfe-website:{COMMIT_SHA}
docker stop hyfe-website && docker rm hyfe-website
docker run -d --name hyfe-website -p 80:80 {ECR_REGISTRY}/hyfe-website:{COMMIT_SHA}

# 2. 또는 GitHub에서 이전 커밋으로 되돌리기
git revert {COMMIT_SHA}
git push origin main
# → GitHub Actions가 자동으로 재배포
```

---

## 도메인 연결

### 현재 상태
- **IP 주소**: `3.37.76.110`
- **도메인**: 미연결
- **접속 방법**: `http://3.37.76.110`

### 도메인 연결 절차 (가비아 기준)

#### 1. 가비아 DNS 설정
```
타입: A
호스트: @
값: 3.37.76.110
TTL: 3600

타입: A
호스트: www
값: 3.37.76.110
TTL: 3600
```

#### 2. nginx.conf 수정
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;  # 변경!
    # ...
}
```

#### 3. 변경사항 배포
```bash
git add nginx.conf
git commit -m "Add domain name to nginx config"
git push origin main
```

#### 4. DNS 전파 대기 (1-2시간)
```bash
# 확인 방법
nslookup yourdomain.com
```

### HTTPS 설정 (Let's Encrypt)

**추후 도메인 연결 후 적용 가능**

```bash
# EC2에서 실행
# 1. Certbot 설치
sudo yum install -y certbot

# 2. SSL 인증서 발급
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# 3. nginx.conf 수정 (HTTPS 리디렉션)
# 4. Docker 컨테이너 재시작
```

---

## 트러블슈팅

### 1. 로컬 개발 서버가 안 열릴 때
```bash
# Node.js 설치 확인
node --version

# 설치되지 않았으면: https://nodejs.org/ 에서 LTS 버전 설치

# 의존성 재설치
rm -rf node_modules package-lock.json
npm install

# 포트 충돌 확인
# Vite 기본 포트: 5173
# 다른 포트 사용: npm run dev -- --port 3000
```

### 2. GitHub Actions 배포 실패
```bash
# Actions 탭에서 로그 확인

# 주요 체크 포인트:
# - AWS 자격증명 (Secrets 확인)
# - ECR 저장소 존재 여부
# - EC2 SSH 키 권한 (600)
# - EC2 보안 그룹 (포트 22, 80 오픈)
```

### 3. 이미지가 안 보일 때
```bash
# 1. 파일 경로 확인
# public/images/activities/ 폴더에 파일이 있는지 확인

# 2. 파일명 대소문자 확인
# 리눅스는 대소문자 구분 (Meeting.jpg ≠ meeting.jpg)

# 3. 브라우저 콘솔 확인
# F12 → Console 탭에서 404 에러 확인

# 4. localStorage 초기화
localStorage.clear();
# 페이지 새로고침 후 다시 추가
```

### 4. 관리자 로그인이 풀릴 때
```bash
# localStorage는 브라우저별로 저장됨
# - 다른 브라우저: 다시 로그인 필요
# - 시크릿 모드: 종료 시 삭제됨
# - 브라우저 데이터 삭제 시: 삭제됨

# 해결 방법: 각 환경에서 다시 로그인
```

---

## 향후 개선 사항

### 단기 (1-2주)
- [ ] HTTPS 적용 (Let's Encrypt)
- [ ] 도메인 연결
- [ ] 이미지 최적화 (WebP 포맷, lazy loading)
- [ ] 모바일 반응형 테스트 및 개선

### 중기 (1-2개월)
- [ ] 백엔드 API 추가 (Firebase 또는 Node.js)
- [ ] 실제 이미지 업로드 기능 (드래그 앤 드롭)
- [ ] 관리자 대시보드 개선
- [ ] Google Analytics 연동

### 장기 (3개월+)
- [ ] 다국어 지원 (영어/한국어)
- [ ] 블로그/뉴스 섹션 추가
- [ ] 멤버 프로필 페이지
- [ ] 온라인 지원서 제출 시스템

---

## 참고 자료

### 공식 문서
- [React 문서](https://react.dev/)
- [Vite 문서](https://vitejs.dev/)
- [React Router 문서](https://reactrouter.com/)
- [Docker 문서](https://docs.docker.com/)
- [AWS ECR 문서](https://docs.aws.amazon.com/ecr/)
- [GitHub Actions 문서](https://docs.github.com/actions)

### 프로젝트 관련
- GitHub Repository: (Repository URL 입력)
- AWS Console: https://console.aws.amazon.com/
- EC2 Dashboard: https://ap-northeast-2.console.aws.amazon.com/ec2/

---

## 연락처

프로젝트 관련 문의:
- 관리자: (이메일 입력)
- GitHub Issues: (Repository Issues URL)

---

**마지막 업데이트**: 2026-01-06
**문서 버전**: 1.0.0
