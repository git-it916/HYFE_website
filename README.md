# HYFE Website

> HanYang Financial Engineering 학회 공식 웹사이트

## 🌐 접속 주소

- **프로덕션**: http://3.37.76.110
- **로컬 개발**: http://localhost:5173

---

## 🚀 빠른 시작

### 1. 로컬 개발 서버 실행

```bash
cd tools/hyfe-club
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 2. 프로덕션 빌드 (테스트용)

```bash
npm run build      # 빌드
npm run preview    # 빌드 결과물 미리보기
```

---

## 📦 배포 방법

### 자동 배포 (권장)

```bash
# 1. 코드 수정 후 커밋
git add .
git commit -m "Update: 변경 내용"

# 2. main 브랜치에 푸시
git push origin main

# 3. GitHub Actions가 자동으로 빌드 및 배포 (5-10분 소요)
# → http://3.37.76.110 에서 확인
```

**배포 과정**:
- GitHub Actions 트리거
- Docker 이미지 빌드 (Vite로 React 앱 빌드)
- AWS ECR에 업로드
- EC2 서버에서 자동 배포

### 배포 상태 확인

- GitHub → Actions 탭에서 진행 상황 확인
- 배포 완료 후 http://3.37.76.110 접속

---

## 🛠️ 기술 스택

### Frontend
- React 18.2.0
- Vite 5.0.8
- React Router DOM 7.9.6
- 순수 CSS (CSS-in-JS)

### Infrastructure
- Docker (Multi-stage build)
- AWS ECR (Container Registry)
- AWS EC2 (서버)
- Nginx (Web Server)
- GitHub Actions (CI/CD)

---

## 📁 프로젝트 구조

```
HYFE_website-1/
├── .github/workflows/
│   └── deploy.yml           # GitHub Actions 배포 설정
├── tools/hyfe-club/
│   ├── public/
│   │   └── images/
│   │       └── activities/  # 활동 이미지 폴더
│   ├── src/
│   │   └── App.jsx          # 메인 앱 (모든 컴포넌트)
│   ├── package.json
│   └── vite.config.js
├── Dockerfile               # Docker 빌드 설정
├── nginx.conf               # Nginx 설정
├── CLAUDE.md                # 프로젝트 문서 (상세)
└── README.md                # 이 파일
```

---

## 🔑 관리자 기능

### Activities 페이지 관리

1. **로그인**
   - Activities 페이지 접속
   - 오른쪽 상단 "관리자 로그인" 클릭
   - 비밀번호: `hyfe2024`

2. **컨텐츠 편집**
   - 시황정리 텍스트 수정
   - 팀별 세션 텍스트 수정

3. **이미지 관리**
   - 이미지를 `tools/hyfe-club/public/images/activities/` 폴더에 추가
   - "+ 이미지 추가" 버튼으로 파일명 입력
   - X 버튼으로 이미지 삭제

**데이터 저장**: localStorage (브라우저에 저장)

---

## 🎨 페이지 구조

| 경로 | 설명 |
|------|------|
| `/` | 메인 홈페이지 |
| `/about` | 학회 소개 |
| `/activities` | 활동 페이지 (관리자 편집 가능) |
| `/recruiting/process` | 리크루팅 절차 |
| `/recruiting/apply` | 지원 방법 |

---

## 🔧 개발 가이드

### 스타일 수정
- 파일: `tools/hyfe-club/src/App.jsx`
- 위치: `<style>` 태그 내부
- CSS 변수: `:root` 섹션

### 콘텐츠 수정
- 파일: `tools/hyfe-club/src/App.jsx`
- 정적 데이터: `activities`, `awards` 등

### 관리자 비밀번호 변경
- 파일: `tools/hyfe-club/src/App.jsx`
- 위치: `const ADMIN_PASSWORD = 'hyfe2024';`

---

## 🐛 트러블슈팅

### 로컬 개발 서버가 안 열릴 때

```bash
# Node.js 설치 확인
node --version
npm --version

# 의존성 재설치
rm -rf node_modules package-lock.json
npm install
```

### 이미지가 안 보일 때

1. 파일 경로 확인: `public/images/activities/` 폴더
2. 파일명 대소문자 확인 (Linux는 대소문자 구분)
3. 브라우저 콘솔(F12)에서 404 에러 확인
4. localStorage 초기화 후 재시도

### 배포가 안 될 때

1. GitHub Actions 로그 확인
2. AWS 자격증명 확인 (Secrets)
3. EC2 보안 그룹 확인 (포트 22, 80)

---

## 📚 추가 문서

- **[CLAUDE.md](./CLAUDE.md)** - 프로젝트 상세 문서 (아키텍처, 배포 파이프라인 등)
- **[.github/workflows/deploy.yml](./.github/workflows/deploy.yml)** - GitHub Actions 설정

---

## 🔗 링크

- **웹사이트**: http://3.37.76.110
- **GitHub Repository**: (Repository URL)
- **AWS Console**: https://console.aws.amazon.com/

---

## 📞 문의

프로젝트 관련 문의:
- 관리자: (이메일)
- GitHub Issues: (Repository Issues URL)

---

**마지막 업데이트**: 2026-01-06
