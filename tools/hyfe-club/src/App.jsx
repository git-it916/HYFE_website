import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';

const activities = [
  {
    id: 'ibd',
    title: 'IBD Team',
    tag: 'Investment Banking',
    summary: '산업 분석, 밸류에이션 모델링, 피치북 제작을 통해 딜 실행 역량을 마스터합니다.',
    description: '심층적인 산업 및 기업 분석을 통해 핵심 투자 포인트를 발굴하고, Trading Comps와 DCF를 포함한 밸류에이션 기법을 습득합니다. IPO Pitch Book과 M&A IM 작성 실습을 통해 딜 프로세스 전반에 대한 이해를 구축합니다.',
    bullets: [
      '산업 및 기업 심층 분석을 통한 핵심 투자 포인트 도출',
      'Trading Comps와 DCF 기반 밸류에이션 방법론',
      'IPO Pitch Book 및 M&A IM 준비 및 발표',
      '엔드투엔드 딜 프로세스 시뮬레이션 및 실행'
    ],
    icon: 'M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z',
  },
  {
    id: 'research',
    title: 'Research Team',
    tag: 'Equity Research',
    summary: '탑다운 분석, 섹터 스크리닝, 엄격한 밸류에이션 프레임워크를 통해 투자 확신을 개발합니다.',
    description: '탑다운 접근법을 통해 포괄적인 섹터 이해를 구축하고 탑픽 기회를 발굴합니다. 상대가치 및 절대가치 밸류에이션 방법론으로 뒷받침되는 투자 논리를 작성하고, 방어 가능한 목표주가와 실행 가능한 추천의견을 도출합니다.',
    bullets: [
      '탑다운 프레임워크: 거시 → 섹터 → 개별 종목 선정',
      '명확한 위험/보상 평가를 포함한 투자 논리 개발',
      '상대가치 및 절대가치 밸류에이션 기법 (Comps, DCF, DDM)',
      '민감도 분석 및 동종업계 벤치마킹을 통한 목표주가 도출'
    ],
    icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  },
  {
    id: 'quant',
    title: 'Quant Team',
    tag: 'Quantitative Finance',
    summary: '알고리즘 알파 발굴과 포트폴리오 최적화를 통해 시스템적 전략을 구축합니다.',
    description: 'Algorithmic Quant와 Portfolio Quant 두 개의 전문 트랙을 운영하며, 마켓 마이크로스트럭처를 탐구하여 알파를 생성하고 현대 포트폴리오 이론을 적용하여 전략을 구축합니다. 시그널 리서치, 백테스팅, 리스크 관리에 대한 실무 경험을 쌓습니다.',
    bullets: [
      'Algorithmic Quant: 마켓 마이크로스트럭처 분석 및 알파 시그널 발굴',
      'Portfolio Quant: 포트폴리오 최적화 및 시스템적 전략 구축',
      '리스크 및 회전율 통제가 포함된 Python 기반 백테스팅',
      '팩터 리서치, 시그널 검증, 성과 기여도 분석'
    ],
    icon: 'M4 20h4L12 4l4 16h4M2 16h20',
  },
  {
    id: 'derivatives',
    title: 'Derivatives Team',
    tag: 'Fixed Income & Derivatives',
    summary: '정책 분석과 구조화 상품을 통해 거시 환경과 파생상품 가격결정을 이해합니다.',
    description: '경제 지표 및 통화정책에 대한 거시 분석을 기반으로 스왑, 옵션, 선물 가격결정에 대한 전문성을 개발합니다. 이론적 프레임워크를 실제 시장 데이터에 적용하여 복잡한 파생상품 포지션을 구조화하고 헤지하는 능력을 키웁니다.',
    bullets: [
      '거시 분석: 경제 데이터, 금리, 중앙은행 정책 해석',
      '파생상품 기초: 스왑, 옵션, 선물 가격결정 및 그릭스',
      '실무 적용: 실시간 시장 데이터를 활용한 가격결정 모델',
      '변동성 국면 전반에 걸친 시나리오 분석 및 헤징 전략'
    ],
    icon: 'M2 12C2 6.5 6.5 2 12 2s10 4.5 10 10-4.5 10-10 10S2 17.5 2 12zm4 0c0 3.3 2.7 6 6 6s6-2.7 6-6-2.7-6-6-6-6 2.7-6 6z',
  },
];

const curriculumStages = [
  {
    level: 'Lv.1',
    title: 'Education',
    description: '강의와 리딩을 통해 핵심 개념, 산업 프레임워크, 기초 도구를 학습합니다.',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  },
  {
    level: 'Lv.2',
    title: 'Practice',
    description: '실제 데이터를 활용한 실습: 밸류에이션 모델, 백테스트, 거시 분석, 피치 형식 등을 다룹니다.',
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  },
  {
    level: 'Lv.3',
    title: 'Project',
    description: '실무를 반영한 팀 주도 결과물: 리서치 리포트, 피치북, 전략 분석 등을 작성합니다.',
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
  },
];

const awards = [
  { title: 'WorldQuant IQC', detail: 'Top Performer' },
  { title: 'CFA Research Challenge', detail: 'National Finalist' },
  { title: 'DB GAPS', detail: 'Excellence Award' },
];

const stats = [
  { number: '400+', label: 'Alumni Network' },
  { number: '4', label: 'Specialized Teams' },
  { number: '17+', label: 'Years of Legacy' },
  { number: '3', label: 'Stage Curriculum' },
];

const ADMIN_PASSWORD = 'hyfe2024';

const STORAGE_KEYS = {
  IS_ADMIN: 'hyfe_is_admin',
  MARKET_REVIEW: 'hyfe_market_review',
  TEAM_SESSIONS: 'hyfe_team_sessions'
};

const idealCandidates = [
  {
    title: 'Passion over pedigree',
    description: '사전 지식이나 스펙보다 호기심과 배우려는 의지를 더 중요하게 생각합니다.',
    icon: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z',
  },
  {
    title: 'Ownership mindset',
    description: '주도성을 가지고 프로젝트를 완수하며, 팀과 결과물에 대한 책임감을 가집니다.',
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
  },
  {
    title: 'Collaborative spirit',
    description: '동료 리뷰, 멘토십, 열린 지식 공유를 통해 함께 성장합니다.',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  },
  {
    title: 'Diverse backgrounds welcome',
    description: '경영, 공학, 수학, 인문학 등 어떤 배경이든 여러분의 관점은 가치를 더합니다.',
    icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
  },
];

const recruitingTabs = {
  process: {
    title: 'Process',
    steps: [
      {
        step: '01',
        title: '지원서 제출',
        desc: '지원 동기, 희망 트랙, 이전 작업물(선택 사항)을 제출합니다.',
      },
      {
        step: '02',
        title: '인터뷰',
        desc: '행동 적합성 및 기초 지식 평가를 동시에 진행합니다.',
      },
      {
        step: '03',
        title: '온보딩',
        desc: '트랙에 합류하여 팀을 만나고 첫 프로젝트 스프린트를 시작합니다.',
      },
    ],
  },
  apply: {
    title: 'How to Apply',
    body: [
      '공식 블로그 또는 네이버 카페에서 지원서 양식을 다운로드합니다.',
      '플랫폼에 안내된 대로 작성한 양식을 이메일로 제출합니다.',
      '최신 마감일 및 공지사항은 공식 커뮤니티 페이지를 정기적으로 확인하세요.',
    ],
  },
};

/* ─── Scroll-aware hook ─── */
const useScrollReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
};

const RevealSection = ({ children, className = '', style = {}, delay = 0 }) => {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

/* ─── Animated counter ─── */
const AnimatedNumber = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const num = parseInt(target, 10);
          const duration = 1500;
          const step = Math.max(1, Math.floor(num / (duration / 16)));
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= num) {
              current = num;
              clearInterval(timer);
            }
            setCount(current);
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

/* ─── SVG Icon helper ─── */
const Icon = ({ d, size = 24, stroke = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

/* ─── Scroll to top on route change ─── */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

/* ════════════════════════════════════════
   STYLES
   ════════════════════════════════════════ */

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+KR:wght@400;500;700&display=swap');

  :root {
    --bg: #0a0a0f;
    --bg-secondary: #111118;
    --bg-card: rgba(255, 255, 255, 0.04);
    --bg-card-hover: rgba(255, 255, 255, 0.07);
    --ink: #f0f0f5;
    --ink-secondary: #a0a0b8;
    --muted: #6b6b80;
    --accent: #6366f1;
    --accent-light: #818cf8;
    --accent-glow: rgba(99, 102, 241, 0.3);
    --gold: #f59e0b;
    --gold-glow: rgba(245, 158, 11, 0.2);
    --border: rgba(255, 255, 255, 0.06);
    --border-hover: rgba(255, 255, 255, 0.12);
    --gradient-1: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%);
    --gradient-2: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  html, body, #root { min-height: 100%; }

  body {
    font-family: 'Inter', 'Noto Sans KR', system-ui, -apple-system, sans-serif;
    background: var(--bg);
    color: var(--ink);
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  a { color: inherit; text-decoration: none; }

  ::selection {
    background: var(--accent);
    color: #fff;
  }

  .page {
    min-height: 100vh;
    background: var(--bg);
    position: relative;
  }

  .container {
    width: min(1200px, 90vw);
    margin: 0 auto;
  }

  /* ─── Header ─── */
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    background: rgba(10, 10, 15, 0.8);
    backdrop-filter: blur(20px) saturate(180%);
    border-bottom: 1px solid var(--border);
    transition: background 0.3s ease;
  }

  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 0;
  }

  .logo {
    font-weight: 900;
    font-size: 24px;
    letter-spacing: 0.08em;
    background: var(--gradient-1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 4px;
    list-style: none;
  }

  .nav-links a {
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 200ms ease;
    color: var(--ink-secondary);
    font-weight: 500;
    font-size: 14px;
    letter-spacing: 0.01em;
  }

  .nav-links a:hover,
  .nav-links a.active {
    color: var(--ink);
    background: rgba(255, 255, 255, 0.06);
  }

  .mobile-toggle {
    display: none;
    background: none;
    border: none;
    color: var(--ink);
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
  }

  .mobile-toggle:hover {
    background: rgba(255, 255, 255, 0.06);
  }

  main { padding-top: 72px; }

  /* ─── Hero ─── */
  .hero {
    min-height: calc(100vh - 72px);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    text-align: center;
    padding: 80px 0;
    overflow: hidden;
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  .hero-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    animation: orbFloat 8s ease-in-out infinite;
  }

  .hero-orb-1 {
    width: 500px;
    height: 500px;
    background: rgba(99, 102, 241, 0.15);
    top: -150px;
    right: -100px;
    animation-delay: 0s;
  }

  .hero-orb-2 {
    width: 400px;
    height: 400px;
    background: rgba(139, 92, 246, 0.1);
    bottom: -100px;
    left: -100px;
    animation-delay: -3s;
  }

  .hero-orb-3 {
    width: 300px;
    height: 300px;
    background: rgba(99, 102, 241, 0.08);
    top: 30%;
    left: 50%;
    animation-delay: -5s;
  }

  @keyframes orbFloat {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -20px) scale(1.05); }
    66% { transform: translate(-20px, 20px) scale(0.95); }
  }

  .hero-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent);
  }

  .hero-content {
    position: relative;
    z-index: 1;
    max-width: 900px;
    margin: 0 auto;
    display: grid;
    gap: 28px;
  }

  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 20px;
    border-radius: 999px;
    background: rgba(99, 102, 241, 0.1);
    border: 1px solid rgba(99, 102, 241, 0.2);
    font-size: 13px;
    font-weight: 600;
    color: var(--accent-light);
    letter-spacing: 0.04em;
    margin: 0 auto;
    text-transform: uppercase;
  }

  .eyebrow-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent-light);
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.5); }
  }

  .title {
    font-size: clamp(40px, 6vw, 68px);
    line-height: 1.1;
    font-weight: 900;
    letter-spacing: -0.03em;
    color: var(--ink);
  }

  .title-gradient {
    background: var(--gradient-1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    font-size: 18px;
    color: var(--ink-secondary);
    margin: 0 auto;
    max-width: 600px;
    line-height: 1.7;
    font-weight: 400;
  }

  .hero-actions {
    display: flex;
    justify-content: center;
    gap: 14px;
    flex-wrap: wrap;
    margin-top: 8px;
  }

  /* ─── Buttons ─── */
  .btn {
    padding: 12px 28px;
    border-radius: 10px;
    border: 1px solid var(--border-hover);
    background: transparent;
    color: var(--ink);
    font-weight: 600;
    cursor: pointer;
    transition: all 250ms ease;
    font-size: 15px;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-family: inherit;
  }

  .btn:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }

  .btn.primary {
    background: var(--accent);
    color: #fff;
    border-color: var(--accent);
    box-shadow: 0 4px 20px var(--accent-glow);
  }

  .btn.primary:hover {
    background: var(--accent-light);
    border-color: var(--accent-light);
    box-shadow: 0 8px 30px var(--accent-glow);
    transform: translateY(-2px);
  }

  /* ─── Stats ─── */
  .stats-bar {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    margin-top: 60px;
  }

  .stat-item {
    background: var(--bg-secondary);
    padding: 32px 20px;
    text-align: center;
    transition: background 0.3s ease;
  }

  .stat-item:hover {
    background: var(--bg-card-hover);
  }

  .stat-number {
    font-size: 36px;
    font-weight: 900;
    letter-spacing: -0.02em;
    background: var(--gradient-1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .stat-label {
    font-size: 13px;
    color: var(--muted);
    margin-top: 4px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  /* ─── Sections ─── */
  section { padding: 100px 0; }

  .section-head {
    text-align: center;
    margin-bottom: 56px;
  }

  .section-label {
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--accent-light);
    margin-bottom: 16px;
  }

  .section-title {
    font-size: clamp(28px, 4vw, 44px);
    font-weight: 800;
    letter-spacing: -0.02em;
    color: var(--ink);
    margin-bottom: 16px;
    line-height: 1.2;
  }

  .section-sub {
    color: var(--ink-secondary);
    margin: 0 auto;
    max-width: 650px;
    line-height: 1.7;
    font-size: 16px;
  }

  /* ─── Cards ─── */
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }

  .card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 32px;
    transition: all 300ms ease;
    position: relative;
    overflow: hidden;
  }

  .card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--gradient-1);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .card:hover {
    background: var(--bg-card-hover);
    border-color: var(--border-hover);
    transform: translateY(-4px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  }

  .card:hover::before {
    opacity: 1;
  }

  .card-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: rgba(99, 102, 241, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    color: var(--accent-light);
  }

  .card h4 {
    font-size: 20px;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 10px;
  }

  .card p {
    color: var(--ink-secondary);
    line-height: 1.6;
    font-size: 15px;
  }

  .card .tag {
    display: inline-block;
    font-size: 11px;
    font-weight: 700;
    color: var(--accent-light);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 12px;
  }

  /* ─── Team cards ─── */
  .team-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .team-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 28px;
    transition: all 300ms ease;
    cursor: pointer;
    text-decoration: none;
    display: block;
    position: relative;
    overflow: hidden;
  }

  .team-card:hover {
    background: var(--bg-card-hover);
    border-color: var(--border-hover);
    transform: translateY(-3px);
    box-shadow: 0 16px 48px rgba(0,0,0,0.25);
  }

  .team-card-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 14px;
  }

  .team-card-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: rgba(99, 102, 241, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent-light);
    flex-shrink: 0;
  }

  .team-card h4 {
    font-size: 18px;
    font-weight: 700;
    color: var(--ink);
    margin: 0;
  }

  .team-card .tag {
    font-size: 12px;
    color: var(--accent-light);
    font-weight: 600;
  }

  .team-card p {
    color: var(--ink-secondary);
    font-size: 14px;
    line-height: 1.6;
    margin: 0;
  }

  .team-card-arrow {
    position: absolute;
    top: 28px;
    right: 28px;
    color: var(--muted);
    transition: all 0.3s ease;
  }

  .team-card:hover .team-card-arrow {
    color: var(--accent-light);
    transform: translateX(4px);
  }

  /* ─── Curriculum ─── */
  .curriculum-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    position: relative;
  }

  .curriculum-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 32px;
    text-align: center;
    transition: all 300ms ease;
    position: relative;
  }

  .curriculum-card:hover {
    background: var(--bg-card-hover);
    border-color: var(--border-hover);
    transform: translateY(-3px);
  }

  .curriculum-icon {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: rgba(99, 102, 241, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
    color: var(--accent-light);
  }

  .curriculum-card .level {
    font-size: 12px;
    font-weight: 800;
    color: var(--accent-light);
    text-transform: uppercase;
    letter-spacing: 0.12em;
    margin-bottom: 8px;
  }

  .curriculum-card h4 {
    font-size: 22px;
    font-weight: 800;
    margin-bottom: 12px;
    color: var(--ink);
  }

  .curriculum-card p {
    color: var(--ink-secondary);
    line-height: 1.6;
    font-size: 14px;
  }

  /* ─── Awards ─── */
  .awards-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    max-width: 900px;
    margin: 0 auto;
  }

  .award-item {
    background: rgba(245, 158, 11, 0.05);
    border: 1px solid rgba(245, 158, 11, 0.15);
    border-radius: 14px;
    padding: 28px;
    text-align: center;
    transition: all 300ms ease;
  }

  .award-item:hover {
    background: rgba(245, 158, 11, 0.08);
    border-color: rgba(245, 158, 11, 0.25);
    transform: translateY(-2px);
  }

  .award-icon {
    font-size: 32px;
    margin-bottom: 14px;
  }

  .award-title {
    font-weight: 700;
    font-size: 16px;
    color: var(--ink);
    margin-bottom: 4px;
  }

  .award-detail {
    font-size: 13px;
    color: var(--gold);
    font-weight: 600;
  }

  /* ─── Ideal cards ─── */
  .ideal-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .ideal-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 28px;
    transition: all 300ms ease;
    display: flex;
    gap: 16px;
  }

  .ideal-card:hover {
    background: var(--bg-card-hover);
    border-color: var(--border-hover);
  }

  .ideal-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: rgba(99, 102, 241, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent-light);
    flex-shrink: 0;
  }

  .ideal-card h4 {
    font-size: 17px;
    font-weight: 700;
    margin-bottom: 6px;
    color: var(--ink);
  }

  .ideal-card p {
    color: var(--ink-secondary);
    line-height: 1.6;
    font-size: 14px;
  }

  /* ─── Detail section ─── */
  .detail-section {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 40px;
    margin-top: 24px;
  }

  .detail-section h3 {
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 16px;
    color: var(--ink);
  }

  .detail-section p {
    color: var(--ink-secondary);
    line-height: 1.7;
    font-size: 16px;
    margin-bottom: 20px;
  }

  .detail-section ul {
    padding-left: 20px;
    color: var(--ink-secondary);
    line-height: 1.8;
    font-size: 15px;
  }

  .detail-section ul li {
    margin-bottom: 10px;
  }

  .detail-section ul li::marker {
    color: var(--accent-light);
  }

  /* ─── Recruiting ─── */
  .recruiting-tabs {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-bottom: 40px;
  }

  .tab-btn {
    padding: 24px;
    border-radius: 14px;
    border: 1px solid var(--border);
    background: var(--bg-card);
    color: var(--ink);
    text-align: left;
    cursor: pointer;
    transition: all 250ms ease;
    display: block;
    text-decoration: none;
  }

  .tab-btn:hover {
    background: var(--bg-card-hover);
    border-color: var(--border-hover);
  }

  .tab-btn.active {
    border-color: var(--accent);
    background: rgba(99, 102, 241, 0.06);
    box-shadow: 0 0 20px var(--accent-glow);
  }

  .tab-title {
    font-weight: 800;
    font-size: 20px;
    margin-bottom: 4px;
    color: var(--ink);
  }

  .tab-desc {
    color: var(--muted);
    font-size: 14px;
  }

  /* ─── Process steps ─── */
  .process-steps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .process-step {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 32px;
    position: relative;
    transition: all 300ms ease;
  }

  .process-step:hover {
    background: var(--bg-card-hover);
    border-color: var(--border-hover);
  }

  .step-number {
    font-size: 40px;
    font-weight: 900;
    background: var(--gradient-1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 16px;
    line-height: 1;
  }

  .step-title {
    font-size: 18px;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 8px;
  }

  .step-desc {
    color: var(--ink-secondary);
    font-size: 14px;
    line-height: 1.6;
  }

  /* ─── CTA ─── */
  .cta-section {
    margin-top: 48px;
    padding: 48px;
    background: rgba(99, 102, 241, 0.04);
    border: 1px solid rgba(99, 102, 241, 0.15);
    border-radius: 20px;
    text-align: center;
  }

  .cta-section h3 {
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 12px;
    color: var(--ink);
  }

  .cta-section p {
    color: var(--ink-secondary);
    margin-bottom: 24px;
    font-size: 15px;
    line-height: 1.6;
  }

  /* ─── About page ─── */
  .about-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-top: 40px;
  }

  .about-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 32px;
    transition: all 300ms ease;
  }

  .about-card:hover {
    background: var(--bg-card-hover);
    border-color: var(--border-hover);
  }

  .about-card h3 {
    font-size: 20px;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .about-card p {
    color: var(--ink-secondary);
    line-height: 1.7;
    font-size: 15px;
  }

  /* ─── Pill ─── */
  .pill {
    display: inline-flex;
    align-items: center;
    padding: 8px 18px;
    border-radius: 999px;
    background: rgba(99, 102, 241, 0.1);
    color: var(--accent-light);
    font-weight: 700;
    font-size: 13px;
    border: 1px solid rgba(99, 102, 241, 0.2);
    letter-spacing: 0.02em;
  }

  /* ─── Divider ─── */
  .section-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--border), transparent);
    margin: 0;
  }

  /* ─── Footer ─── */
  footer {
    padding: 48px 0;
    text-align: center;
    border-top: 1px solid var(--border);
    background: var(--bg-secondary);
  }

  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .footer-logo {
    font-weight: 900;
    font-size: 20px;
    letter-spacing: 0.08em;
    background: var(--gradient-1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .footer-text {
    color: var(--muted);
    font-size: 14px;
    line-height: 1.6;
  }

  .footer-links {
    display: flex;
    gap: 24px;
    list-style: none;
  }

  .footer-links a {
    color: var(--muted);
    font-size: 13px;
    font-weight: 500;
    transition: color 0.2s ease;
  }

  .footer-links a:hover {
    color: var(--ink);
  }

  /* ─── Responsive ─── */
  @media (max-width: 900px) {
    .team-grid { grid-template-columns: 1fr; }
    .about-grid { grid-template-columns: 1fr; }
    .ideal-grid { grid-template-columns: 1fr; }
    .curriculum-row { grid-template-columns: 1fr; }
    .awards-grid { grid-template-columns: 1fr; }
    .process-steps { grid-template-columns: 1fr; }
    .stats-bar { grid-template-columns: repeat(2, 1fr); }
    section { padding: 80px 0; }
  }

  @media (max-width: 640px) {
    .nav-links { display: none; }
    .nav-links.open {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: rgba(10, 10, 15, 0.95);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border);
      padding: 16px;
      gap: 4px;
    }
    .nav-links.open a {
      padding: 12px 16px;
      width: 100%;
    }
    .mobile-toggle { display: block; }
    .hero { padding: 60px 0; min-height: auto; }
    .title { font-size: 32px !important; }
    .section-title { font-size: 28px !important; }
    .stats-bar { grid-template-columns: repeat(2, 1fr); }
    .stat-number { font-size: 28px; }
    section { padding: 60px 0; }
    .detail-section { padding: 24px; }
    .recruiting-tabs { grid-template-columns: 1fr; }
  }
`;

/* ════════════════════════════════════════
   LAYOUT
   ════════════════════════════════════════ */

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setMenuOpen(false); }, [location]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <style>{globalStyles}</style>
      <div className="page">
        <header>
          <div className="container nav">
            <Link to="/" className="logo">HYFE</Link>
            <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {menuOpen
                  ? <path d="M18 6L6 18M6 6l12 12" />
                  : <path d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
            <nav>
              <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                <li><Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link></li>
                <li><Link to="/about" className={isActive('/about') ? 'active' : ''}>About</Link></li>
                <li><Link to="/people" className={isActive('/people') ? 'active' : ''}>People</Link></li>
                <li><Link to="/activities" className={isActive('/activities') ? 'active' : ''}>Activities</Link></li>
                <li><Link to="/recruiting/process" className={isActive('/recruiting') ? 'active' : ''}>Recruiting</Link></li>
              </ul>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer>
          <div className="container footer-content">
            <div className="footer-logo">HYFE</div>
            <p className="footer-text">
              HanYang Financial Engineering  /  Est. 2007<br />
              Growth & Success through Finance and Engineering
            </p>
            <ul className="footer-links">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/people">People</Link></li>
              <li><Link to="/activities">Activities</Link></li>
              <li><Link to="/recruiting/process">Recruiting</Link></li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
};

/* ════════════════════════════════════════
   LANDING PAGE
   ════════════════════════════════════════ */

const LandingPage = () => (
  <>
    {/* Hero */}
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="hero-grid" />
      </div>
      <div className="hero-content container">
        <div className="eyebrow">
          <span className="eyebrow-dot" />
          HanYang Financial Engineering
        </div>
        <h1 className="title">
          Where Theory<br />
          Becomes <span className="title-gradient">Alpha</span>
        </h1>
        <p className="subtitle">
          한양대학교의 대표 금융 학회. 엄격한 교육, 실전 프로젝트, 네트워크를 통해 금융 커리어의 발판을 마련합니다.
        </p>
        <div className="hero-actions">
          <Link className="btn primary" to="/about">Discover HYFE</Link>
          <Link className="btn" to="/recruiting/process">Join Us &rarr;</Link>
        </div>
      </div>
    </section>

    {/* Stats */}
    <div className="container">
      <RevealSection>
        <div className="stats-bar">
          {stats.map((s) => (
            <div key={s.label} className="stat-item">
              <div className="stat-number">
                <AnimatedNumber target={s.number.replace('+', '')} suffix={s.number.includes('+') ? '+' : ''} />
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </RevealSection>
    </div>

    {/* Value Props */}
    <section>
      <div className="container">
        <RevealSection>
          <div className="section-head">
            <div className="section-label">Why HYFE</div>
            <h2 className="section-title">Growth & Success</h2>
            <p className="section-sub">
              단순한 금융 동아리를 넘어 여러분의 커리어를 위한 발판입니다.
            </p>
          </div>
        </RevealSection>
        <div className="card-grid">
          {[
            {
              title: '400+ 동문 네트워크',
              desc: '졸업생들은 국내외 투자은행, 자산운용사, 헤지펀드에서 활약하고 있습니다.',
              icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
            },
            {
              title: '실무 중심 교육',
              desc: '알고리즘 트레이딩부터 DCF 모델까지, 이론이 아닌 프로젝트 경험을 제공합니다.',
              icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
            },
            {
              title: '검증된 성과',
              desc: 'CFA Research Challenge, WorldQuant IQC 등 국내외 대회에서 입증된 역량.',
              icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
            },
          ].map((item, i) => (
            <RevealSection key={item.title} delay={i * 0.1}>
              <div className="card">
                <div className="card-icon">
                  <Icon d={item.icon} size={22} />
                </div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>

    <div className="section-divider" />

    {/* Teams Preview */}
    <section>
      <div className="container">
        <RevealSection>
          <div className="section-head">
            <div className="section-label">Teams</div>
            <h2 className="section-title">4 Specialized Tracks</h2>
            <p className="section-sub">
              관심 분야에 따라 전문 트랙을 선택하고 깊이 있는 교육과 프로젝트를 경험합니다.
            </p>
          </div>
        </RevealSection>
        <div className="team-grid">
          {activities.map((a, i) => (
            <RevealSection key={a.id} delay={i * 0.08}>
              <Link to={`/activities/${a.id}`} className="team-card">
                <div className="team-card-header">
                  <div className="team-card-icon">
                    <Icon d={a.icon} size={20} />
                  </div>
                  <div>
                    <h4>{a.title}</h4>
                    <span className="tag">{a.tag}</span>
                  </div>
                </div>
                <p>{a.summary}</p>
                <div className="team-card-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>

    <div className="section-divider" />

    {/* Awards */}
    <section>
      <div className="container">
        <RevealSection>
          <div className="section-head">
            <div className="section-label">Achievements</div>
            <h2 className="section-title">Awards & Recognition</h2>
          </div>
        </RevealSection>
        <RevealSection>
          <div className="awards-grid">
            {awards.map((a) => (
              <div key={a.title} className="award-item">
                <div className="award-icon">&#127942;</div>
                <div className="award-title">{a.title}</div>
                <div className="award-detail">{a.detail}</div>
              </div>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>

    {/* CTA */}
    <section>
      <div className="container">
        <RevealSection>
          <div className="cta-section">
            <h3>Ready to Start Your Journey?</h3>
            <p>HYFE와 함께 금융 커리어의 첫 걸음을 내딛어 보세요.</p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link className="btn primary" to="/recruiting/process">Apply Now</Link>
              <Link className="btn" to="/about">Learn More</Link>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  </>
);

/* ════════════════════════════════════════
   ABOUT PAGE
   ════════════════════════════════════════ */

const AboutPage = () => (
  <div className="container" style={{ padding: '80px 0' }}>
    <RevealSection>
      <div className="section-head">
        <div className="section-label">About</div>
        <h2 className="section-title">About HYFE</h2>
        <p className="section-sub">
          2007년 설립된 HYFE는 파생상품 스터디 그룹에서 시작하여 퀀트, 파생상품, IBD, 리서치를 아우르는 학생 주도 금융 학회로 성장했습니다.
        </p>
        <div className="pill" style={{ marginTop: 20 }}>IBD &middot; Research &middot; Quant &middot; Derivatives</div>
      </div>
    </RevealSection>

    <div className="about-grid">
      {[
        {
          title: 'Our Legacy',
          icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
          text: '2007년 금융공학과 파생상품에 중점을 두고 설립된 HYFE는 투자은행, 주식 리서치, 퀀트 전략, 구조화 상품을 포괄하는 종합 금융 학회로 성장했습니다. 한국에서 가장 엄격하고 네트워크가 잘 구축된 금융 동아리 중 하나로 인정받고 있습니다.',
        },
        {
          title: 'Mission & Vision',
          icon: 'M13 10V3L4 14h7v7l9-11h-7z',
          text: '학문적 이론과 산업 실무 사이의 간극을 메우는 것. 체계적인 커리큘럼, 경험 많은 동문의 멘토십, 실무 프로젝트를 제공하며, 열정과 전문성, 협업이 성공을 이끄는 커뮤니티를 만들어갑니다.',
        },
        {
          title: 'Unmatched Network',
          icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
          text: '글로벌 투자은행, 자산운용사, 헤지펀드, 로스쿨에서 일하는 400명 이상의 동문. 홈커밍 이벤트, 일대일 멘토링, 산업 패널을 통해 현직 전문가들과 직접 소통할 수 있습니다.',
        },
        {
          title: 'Curriculum',
          icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
          text: 'Education → Practice → Project 3단계 체계적 커리큘럼으로 기초부터 실무까지 단계별로 역량을 쌓아갑니다. 각 팀별 맞춤형 교육과정을 운영합니다.',
        },
      ].map((item, i) => (
        <RevealSection key={item.title} delay={i * 0.1}>
          <div className="about-card">
            <h3>
              <span style={{ color: 'var(--accent-light)' }}>
                <Icon d={item.icon} size={22} />
              </span>
              {item.title}
            </h3>
            <p>{item.text}</p>
          </div>
        </RevealSection>
      ))}
    </div>

    {/* Curriculum */}
    <RevealSection style={{ marginTop: 60 }}>
      <div className="section-head">
        <div className="section-label">Curriculum</div>
        <h2 className="section-title">3-Stage Learning Path</h2>
      </div>
    </RevealSection>
    <div className="curriculum-row">
      {curriculumStages.map((s, i) => (
        <RevealSection key={s.level} delay={i * 0.12}>
          <div className="curriculum-card">
            <div className="curriculum-icon">
              <Icon d={s.icon} size={26} />
            </div>
            <div className="level">{s.level}</div>
            <h4>{s.title}</h4>
            <p>{s.description}</p>
          </div>
        </RevealSection>
      ))}
    </div>

    <RevealSection style={{ marginTop: 48, textAlign: 'center' }}>
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link className="btn primary" to="/activities">Explore Activities</Link>
        <Link className="btn" to="/recruiting/process">Join HYFE</Link>
      </div>
    </RevealSection>
  </div>
);

/* ════════════════════════════════════════
   PEOPLE PAGE
   ════════════════════════════════════════ */

const PeoplePage = () => (
  <div className="container" style={{ padding: '80px 0' }}>
    <RevealSection>
      <div className="section-head">
        <div className="section-label">People</div>
        <h2 className="section-title">Who We're Looking For</h2>
        <p className="section-sub">
          배경이 아닌 태도를 봅니다. HYFE가 찾는 사람은 이런 사람입니다.
        </p>
      </div>
    </RevealSection>

    <div className="ideal-grid">
      {idealCandidates.map((c, i) => (
        <RevealSection key={c.title} delay={i * 0.1}>
          <div className="ideal-card">
            <div className="ideal-icon">
              <Icon d={c.icon} size={22} />
            </div>
            <div>
              <h4>{c.title}</h4>
              <p>{c.description}</p>
            </div>
          </div>
        </RevealSection>
      ))}
    </div>

    <RevealSection style={{ marginTop: 48, textAlign: 'center' }}>
      <Link className="btn primary" to="/recruiting/process">Apply Now &rarr;</Link>
    </RevealSection>
  </div>
);

/* ════════════════════════════════════════
   ACTIVITIES PAGE
   ════════════════════════════════════════ */

const ActivitiesIndex = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [password, setPassword] = useState('');
  const [marketReview, setMarketReview] = useState({ text: '', images: [] });
  const [teamSessions, setTeamSessions] = useState([
    { id: 'quant', title: 'Quant Team', text: '', images: [] },
    { id: 'ibd', title: 'IBD Team', text: '', images: [] },
    { id: 'research', title: 'Research Team', text: '', images: [] },
    { id: 'derivatives', title: 'Derivatives Team', text: '', images: [] }
  ]);

  useEffect(() => {
    const savedAdmin = localStorage.getItem(STORAGE_KEYS.IS_ADMIN) === 'true';
    setIsAdmin(savedAdmin);

    const savedMarketReview = localStorage.getItem(STORAGE_KEYS.MARKET_REVIEW);
    if (savedMarketReview) {
      setMarketReview(JSON.parse(savedMarketReview));
    }

    const savedTeamSessions = localStorage.getItem(STORAGE_KEYS.TEAM_SESSIONS);
    if (savedTeamSessions) {
      setTeamSessions(JSON.parse(savedTeamSessions));
    }
  }, []);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem(STORAGE_KEYS.IS_ADMIN, 'true');
      setShowLoginModal(false);
      setPassword('');
      alert('관리자 모드로 로그인되었습니다.');
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem(STORAGE_KEYS.IS_ADMIN);
    alert('로그아웃되었습니다.');
  };

  const updateMarketReview = (text, images) => {
    const updated = { text, images };
    setMarketReview(updated);
    localStorage.setItem(STORAGE_KEYS.MARKET_REVIEW, JSON.stringify(updated));
  };

  const updateTeamSession = (teamId, text, images) => {
    const updated = teamSessions.map(team =>
      team.id === teamId ? { ...team, text, images } : team
    );
    setTeamSessions(updated);
    localStorage.setItem(STORAGE_KEYS.TEAM_SESSIONS, JSON.stringify(updated));
  };

  const addImage = (type, teamId = null) => {
    const filename = prompt('이미지 파일명을 입력하세요 (예: meeting.jpg)\n파일은 public/images/activities/ 폴더에 있어야 합니다.');
    if (!filename) return;

    const imagePath = `/images/activities/${filename}`;

    if (type === 'market') {
      updateMarketReview(marketReview.text, [...marketReview.images, imagePath]);
    } else if (type === 'team' && teamId) {
      const team = teamSessions.find(t => t.id === teamId);
      if (team) {
        updateTeamSession(teamId, team.text, [...team.images, imagePath]);
      }
    }
  };

  const removeImage = (type, index, teamId = null) => {
    if (type === 'market') {
      const newImages = marketReview.images.filter((_, i) => i !== index);
      updateMarketReview(marketReview.text, newImages);
    } else if (type === 'team' && teamId) {
      const team = teamSessions.find(t => t.id === teamId);
      if (team) {
        const newImages = team.images.filter((_, i) => i !== index);
        updateTeamSession(teamId, team.text, newImages);
      }
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    fontSize: '15px',
    border: '1px solid var(--border-hover)',
    borderRadius: '10px',
    fontFamily: 'inherit',
    background: 'var(--bg)',
    color: 'var(--ink)',
    resize: 'vertical',
  };

  return (
    <div className="container" style={{ padding: '80px 0' }}>
      {/* Admin button */}
      <div style={{ position: 'fixed', top: '90px', right: '24px', zIndex: 999 }}>
        {!isAdmin ? (
          <button onClick={() => setShowLoginModal(true)} className="btn" style={{ fontSize: '13px', padding: '8px 16px' }}>
            Admin
          </button>
        ) : (
          <button onClick={handleLogout} className="btn primary" style={{ fontSize: '13px', padding: '8px 16px' }}>
            Logout
          </button>
        )}
      </div>

      {/* Login modal */}
      {showLoginModal && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            padding: '36px',
            borderRadius: '20px',
            maxWidth: '380px',
            width: '90%'
          }}>
            <h3 style={{ marginBottom: 20, fontSize: 20, fontWeight: 700 }}>Admin Login</h3>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              style={{ ...inputStyle, marginBottom: 16 }}
            />
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={handleLogin} className="btn primary" style={{ flex: 1 }}>Login</button>
              <button onClick={() => { setShowLoginModal(false); setPassword(''); }} className="btn" style={{ flex: 1 }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <RevealSection>
        <div className="section-head">
          <div className="section-label">Activities</div>
          <h2 className="section-title">Our Activities</h2>
          <p className="section-sub">
            매주 진행되는 시황정리와 팀별 세션을 통해 실무 역량을 키웁니다.
          </p>
        </div>
      </RevealSection>

      {/* Market Review */}
      <RevealSection>
        <div className="detail-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ margin: 0 }}>시황정리</h3>
            {isAdmin && (
              <button onClick={() => addImage('market')} className="btn" style={{ fontSize: '13px', padding: '8px 14px' }}>
                + Image
              </button>
            )}
          </div>

          {isAdmin ? (
            <textarea
              value={marketReview.text}
              onChange={(e) => updateMarketReview(e.target.value, marketReview.images)}
              placeholder="시황정리 내용을 입력하세요..."
              style={{ ...inputStyle, minHeight: 100, marginBottom: 16 }}
            />
          ) : (
            <p style={{ margin: 0 }}>{marketReview.text || '모든 팀이 모여 한 주간의 매크로 이슈와 에쿼티 이슈에 대해 발표하고 질문하는 시간을 가집니다.'}</p>
          )}

          {marketReview.images.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14, marginTop: 16 }}>
              {marketReview.images.map((img, idx) => (
                <div key={idx} style={{ position: 'relative', borderRadius: 12, overflow: 'hidden' }}>
                  <img src={img} alt={`시황정리 ${idx + 1}`} style={{ width: '100%', display: 'block', borderRadius: 12 }} />
                  {isAdmin && (
                    <button
                      onClick={() => removeImage('market', idx)}
                      style={{
                        position: 'absolute', top: 8, right: 8,
                        background: 'rgba(220, 38, 38, 0.9)', color: '#fff',
                        border: 'none', borderRadius: '50%',
                        width: 28, height: 28, cursor: 'pointer',
                        fontSize: 16, fontWeight: 'bold',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </RevealSection>

      {/* Team Sessions */}
      <RevealSection style={{ marginTop: 48 }}>
        <div className="section-head">
          <h2 className="section-title" style={{ fontSize: 32 }}>Team Sessions</h2>
        </div>
      </RevealSection>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {teamSessions.map((team, i) => (
          <RevealSection key={team.id} delay={i * 0.08}>
            <div className="detail-section">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ margin: 0 }}>{team.title}</h3>
                {isAdmin && (
                  <button onClick={() => addImage('team', team.id)} className="btn" style={{ fontSize: '13px', padding: '8px 14px' }}>
                    + Image
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 400px', minWidth: 280 }}>
                  {team.images.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      {team.images.map((img, idx) => (
                        <div key={idx} style={{ position: 'relative', borderRadius: 12, overflow: 'hidden' }}>
                          <img src={img} alt={`${team.title} ${idx + 1}`} style={{ width: '100%', display: 'block', borderRadius: 12 }} />
                          {isAdmin && (
                            <button
                              onClick={() => removeImage('team', idx, team.id)}
                              style={{
                                position: 'absolute', top: 8, right: 8,
                                background: 'rgba(220, 38, 38, 0.9)', color: '#fff',
                                border: 'none', borderRadius: '50%',
                                width: 28, height: 28, cursor: 'pointer',
                                fontSize: 16, fontWeight: 'bold',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                              }}
                            >
                              &times;
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    isAdmin && (
                      <div style={{
                        padding: 40, textAlign: 'center',
                        border: '1px dashed var(--border-hover)',
                        borderRadius: 12, color: 'var(--muted)'
                      }}>
                        Add images
                      </div>
                    )
                  )}
                </div>

                <div style={{ flex: '1 1 400px', minWidth: 280, display: 'flex', alignItems: 'center' }}>
                  {isAdmin ? (
                    <textarea
                      value={team.text}
                      onChange={(e) => updateTeamSession(team.id, e.target.value, team.images)}
                      placeholder={`${team.title} 활동 내용을 입력하세요...`}
                      style={{ ...inputStyle, minHeight: 180 }}
                    />
                  ) : (
                    <div style={{ width: '100%' }}>
                      {team.text ? (
                        <p style={{ margin: 0, lineHeight: 1.8, fontSize: 15, color: 'var(--ink-secondary)' }}>{team.text}</p>
                      ) : (
                        <p style={{ margin: 0, color: 'var(--muted)', fontStyle: 'italic' }}>
                          활동 내용이 아직 작성되지 않았습니다.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </RevealSection>
        ))}
      </div>

      <RevealSection style={{ marginTop: 48, textAlign: 'center' }}>
        <Link className="btn primary" to="/recruiting/process">Ready to Join? &rarr;</Link>
      </RevealSection>
    </div>
  );
};

/* ════════════════════════════════════════
   ACTIVITY DETAIL
   ════════════════════════════════════════ */

const ActivityDetail = () => {
  const { id } = useParams();
  const activity = activities.find((a) => a.id === id);

  if (!activity) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2 className="section-title">Activity Not Found</h2>
        <p className="section-sub">찾으시는 팀이 존재하지 않습니다.</p>
        <div style={{ marginTop: 32, display: 'flex', gap: 14, justifyContent: 'center' }}>
          <Link className="btn" to="/activities">Back to Activities</Link>
          <Link className="btn primary" to="/">Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '80px 0' }}>
      <RevealSection>
        <div className="section-head">
          <div className="pill">{activity.tag}</div>
          <h2 className="section-title" style={{ marginTop: 16 }}>{activity.title}</h2>
          <p className="section-sub">{activity.summary}</p>
        </div>
      </RevealSection>

      <RevealSection>
        <div className="detail-section">
          <h3>Overview</h3>
          <p>{activity.description}</p>

          <h3 style={{ marginTop: 28 }}>What You'll Do</h3>
          <ul>
            {activity.bullets.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </RevealSection>

      <RevealSection style={{ marginTop: 40, textAlign: 'center' }}>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link className="btn primary" to="/recruiting/process">Apply for This Track</Link>
          <Link className="btn" to="/activities">View All Tracks</Link>
        </div>
      </RevealSection>
    </div>
  );
};

/* ════════════════════════════════════════
   RECRUITING PAGE
   ════════════════════════════════════════ */

const RecruitingPage = ({ mode }) => {
  const tab = recruitingTabs[mode] || recruitingTabs.process;

  return (
    <div className="container" style={{ padding: '80px 0' }}>
      <RevealSection>
        <div className="section-head">
          <div className="section-label">Recruiting</div>
          <h2 className="section-title">Join HYFE</h2>
          <p className="section-sub">
            배우고, 기여하고, 성장할 준비가 된 열정적인 사람을 찾습니다. 완성도가 아닌 잠재력을 발굴하도록 설계된 프로세스입니다.
          </p>
        </div>
      </RevealSection>

      <RevealSection>
        <div className="recruiting-tabs">
          <Link className={`tab-btn ${mode === 'process' ? 'active' : ''}`} to="/recruiting/process">
            <div className="tab-title">Process</div>
            <div className="tab-desc">지원 단계 및 타임라인 개요</div>
          </Link>
          <Link className={`tab-btn ${mode === 'apply' ? 'active' : ''}`} to="/recruiting/apply">
            <div className="tab-title">How to Apply</div>
            <div className="tab-desc">제출 가이드라인 및 플랫폼 세부정보</div>
          </Link>
        </div>
      </RevealSection>

      {mode === 'process' ? (
        <RevealSection>
          <div className="process-steps">
            {tab.steps.map((s, i) => (
              <div key={s.step} className="process-step">
                <div className="step-number">{s.step}</div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </RevealSection>
      ) : (
        <RevealSection>
          <div className="detail-section">
            <h3>{tab.title}</h3>
            <ul>
              {tab.body.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </RevealSection>
      )}

      {mode === 'apply' && (
        <RevealSection>
          <div className="cta-section">
            <h3>Ready to Start Your Journey?</h3>
            <p>지원서 양식을 다운로드하여 공식 플랫폼을 통해 제출하세요.</p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
              <a className="btn primary" href="https://cafe.naver.com/f-e/cafes/28919085/menus/1?viewType=L" target="_blank" rel="noreferrer">
                Visit Application Portal
              </a>
              <Link className="btn" to="/recruiting/process">View Process</Link>
            </div>
          </div>
        </RevealSection>
      )}

      <RevealSection style={{ marginTop: 40, textAlign: 'center' }}>
        <Link className="btn" to="/">Back to Home</Link>
      </RevealSection>
    </div>
  );
};

/* ════════════════════════════════════════
   APP
   ════════════════════════════════════════ */

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/activities" element={<ActivitiesIndex />} />
        <Route path="/activities/:id" element={<ActivityDetail />} />
        <Route path="/recruiting/process" element={<RecruitingPage mode="process" />} />
        <Route path="/recruiting/apply" element={<RecruitingPage mode="apply" />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default App;
