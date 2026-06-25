import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
import {
  cmsEnabled, getCurrentUser, onAuthChange, signIn, signOut, displayName,
  loadContent, saveMarketReview, saveTeamSessions, uploadImage,
  DEFAULT_MARKET, DEFAULT_TEAMS,
} from './lib/cms';

/* ════════════════════════════════════════
   DATA
   ════════════════════════════════════════ */

const activities = [
  {
    id: 'ibd',
    title: 'IBD',
    tag: 'Investment Banking',
    summary: '산업 분석, 밸류에이션 모델링, 피치북 제작을 통해 딜 실행 역량을 마스터합니다.',
    description: '심층적인 산업 및 기업 분석을 통해 핵심 투자 포인트를 발굴하고, Trading Comps와 DCF를 포함한 밸류에이션 기법을 습득합니다. IPO Pitch Book과 M&A IM 작성 실습을 통해 딜 프로세스 전반에 대한 이해를 구축합니다.',
    bullets: [
      '산업 및 기업 심층 분석을 통한 핵심 투자 포인트 도출',
      'Trading Comps와 DCF 기반 밸류에이션 방법론',
      'IPO Pitch Book 및 M&A IM 준비 및 발표',
      '엔드투엔드 딜 프로세스 시뮬레이션 및 실행',
    ],
  },
  {
    id: 'research',
    title: 'Research',
    tag: 'Equity Research',
    summary: '탑다운 분석, 섹터 스크리닝, 엄격한 밸류에이션 프레임워크를 통해 투자 확신을 개발합니다.',
    description: '탑다운 접근법을 통해 포괄적인 섹터 이해를 구축하고 탑픽 기회를 발굴합니다. 상대가치 및 절대가치 밸류에이션 방법론으로 뒷받침되는 투자 논리를 작성하고, 방어 가능한 목표주가와 실행 가능한 추천의견을 도출합니다.',
    bullets: [
      '탑다운 프레임워크: 거시 → 섹터 → 개별 종목 선정',
      '명확한 위험/보상 평가를 포함한 투자 논리 개발',
      '상대가치 및 절대가치 밸류에이션 기법 (Comps, DCF, DDM)',
      '민감도 분석 및 동종업계 벤치마킹을 통한 목표주가 도출',
    ],
  },
  {
    id: 'quant',
    title: 'Quant',
    tag: 'Quantitative Finance',
    summary: '알고리즘 알파 발굴과 포트폴리오 최적화를 통해 시스템적 전략을 구축합니다.',
    description: 'Algorithmic Quant와 Portfolio Quant 두 개의 전문 트랙을 운영하며, 마켓 마이크로스트럭처를 탐구하여 알파를 생성하고 현대 포트폴리오 이론을 적용하여 전략을 구축합니다. 시그널 리서치, 백테스팅, 리스크 관리에 대한 실무 경험을 쌓습니다.',
    bullets: [
      'Algorithmic Quant: 마켓 마이크로스트럭처 분석 및 알파 시그널 발굴',
      'Portfolio Quant: 포트폴리오 최적화 및 시스템적 전략 구축',
      '리스크 및 회전율 통제가 포함된 Python 기반 백테스팅',
      '팩터 리서치, 시그널 검증, 성과 기여도 분석',
    ],
  },
  {
    id: 'derivatives',
    title: 'Derivatives',
    tag: 'Fixed Income & Derivatives',
    summary: '정책 분석과 구조화 상품을 통해 거시 환경과 파생상품 가격결정을 이해합니다.',
    description: '경제 지표 및 통화정책에 대한 거시 분석을 기반으로 스왑, 옵션, 선물 가격결정에 대한 전문성을 개발합니다. 이론적 프레임워크를 실제 시장 데이터에 적용하여 복잡한 파생상품 포지션을 구조화하고 헤지하는 능력을 키웁니다.',
    bullets: [
      '거시 분석: 경제 데이터, 금리, 중앙은행 정책 해석',
      '파생상품 기초: 스왑, 옵션, 선물 가격결정 및 그릭스',
      '실무 적용: 실시간 시장 데이터를 활용한 가격결정 모델',
      '변동성 국면 전반에 걸친 시나리오 분석 및 헤징 전략',
    ],
  },
];

const curriculumStages = [
  { level: 'Lv.1', title: 'Education', description: '강의와 리딩을 통해 핵심 개념, 산업 프레임워크, 기초 도구를 학습합니다.' },
  { level: 'Lv.2', title: 'Practice', description: '실제 데이터를 활용한 실습: 밸류에이션 모델, 백테스트, 거시 분석, 피치 형식 등을 다룹니다.' },
  { level: 'Lv.3', title: 'Project', description: '실무를 반영한 팀 주도 결과물: 리서치 리포트, 피치북, 전략 분석 등을 작성합니다.' },
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

const valueProps = [
  { title: '400+ 동문 네트워크', desc: '졸업생들은 국내외 투자은행, 자산운용사, 헤지펀드에서 활약하고 있습니다.', k: 'NETWORK' },
  { title: '실무 중심 교육', desc: '알고리즘 트레이딩부터 DCF 모델까지, 이론이 아닌 프로젝트 경험을 제공합니다.', k: 'HANDS-ON' },
  { title: '검증된 성과', desc: 'CFA Research Challenge, WorldQuant IQC 등 국내외 대회에서 입증된 역량.', k: 'TRACK RECORD' },
];

const idealCandidates = [
  { title: 'Passion over pedigree', description: '사전 지식이나 스펙보다 호기심과 배우려는 의지를 더 중요하게 생각합니다.' },
  { title: 'Ownership mindset', description: '주도성을 가지고 프로젝트를 완수하며, 팀과 결과물에 대한 책임감을 가집니다.' },
  { title: 'Collaborative spirit', description: '동료 리뷰, 멘토십, 열린 지식 공유를 통해 함께 성장합니다.' },
  { title: 'Diverse backgrounds welcome', description: '경영, 공학, 수학, 인문학 등 어떤 배경이든 여러분의 관점은 가치를 더합니다.' },
];

const aboutCards = [
  { title: 'Our Legacy', text: '2007년 금융공학과 파생상품에 중점을 두고 설립된 HYFE는 투자은행, 주식 리서치, 퀀트 전략, 구조화 상품을 포괄하는 종합 금융 학회로 성장했습니다. 한국에서 가장 엄격하고 네트워크가 잘 구축된 금융 동아리 중 하나로 인정받고 있습니다.' },
  { title: 'Mission & Vision', text: '학문적 이론과 산업 실무 사이의 간극을 메우는 것. 체계적인 커리큘럼, 경험 많은 동문의 멘토십, 실무 프로젝트를 제공하며, 열정과 전문성, 협업이 성공을 이끄는 커뮤니티를 만들어갑니다.' },
  { title: 'Unmatched Network', text: '글로벌 투자은행, 자산운용사, 헤지펀드, 로스쿨에서 일하는 400명 이상의 동문. 홈커밍 이벤트, 일대일 멘토링, 산업 패널을 통해 현직 전문가들과 직접 소통할 수 있습니다.' },
  { title: 'Curriculum', text: 'Education → Practice → Project 3단계 체계적 커리큘럼으로 기초부터 실무까지 단계별로 역량을 쌓아갑니다. 각 팀별 맞춤형 교육과정을 운영합니다.' },
];

const recruitingTabs = {
  process: {
    title: 'Process',
    steps: [
      { step: '01', title: '지원서 제출', desc: '지원 동기, 희망 트랙, 이전 작업물(선택 사항)을 제출합니다.' },
      { step: '02', title: '인터뷰', desc: '행동 적합성 및 기초 지식 평가를 동시에 진행합니다.' },
      { step: '03', title: '온보딩', desc: '트랙에 합류하여 팀을 만나고 첫 프로젝트 스프린트를 시작합니다.' },
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

/* ════════════════════════════════════════
   HOOKS & PRIMITIVES
   ════════════════════════════════════════ */

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
        transform: visible ? 'translateY(0)' : 'translateY(34px)',
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

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
          const step = Math.max(1, Math.ceil(num / 40));
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= num) { current = num; clearInterval(timer); }
            setCount(current);
          }, 22);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
};

/* Live mono clock for the hero eyebrow */
const LiveClock = () => {
  const [now, setNow] = useState('');
  useEffect(() => {
    const tick = () => setNow(new Date().toLocaleTimeString('en-GB', { hour12: false }) + ' KST');
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  return <span>{now}</span>;
};

/* Hero — the rising curve is measured to end exactly on the period of "alpha."
   so the line tip and the dot always meet, on any screen size. */
const Hero = () => {
  const heroRef = useRef(null);
  const dotRef = useRef(null);
  const svgRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const draw = () => {
      const hero = heroRef.current, dot = dotRef.current, svg = svgRef.current, path = pathRef.current;
      if (!hero || !dot || !svg || !path) return;
      const hr = hero.getBoundingClientRect();
      const dr = dot.getBoundingClientRect();
      const W = hr.width, H = hr.height;
      const ex = dr.left + dr.width / 2 - hr.left;  // period centre x
      const ey = dr.top + dr.height / 2 - hr.top;   // period centre y
      const sx = 0, sy = H * 0.98;                  // start: bottom-left
      // waypoints: (x fraction of sx→ex, height fraction of sy→ey) — last is exactly the dot
      const wp = [[0, 0], [0.12, 0.16], [0.21, 0.08], [0.33, 0.34], [0.44, 0.24],
                  [0.56, 0.5], [0.67, 0.4], [0.79, 0.67], [0.89, 0.57], [1, 1]];
      const pts = wp.map(([tx, h]) => [sx + (ex - sx) * tx, sy + (ey - sy) * h]);
      const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
      svg.setAttribute('width', W);
      svg.setAttribute('height', H);
      path.setAttribute('d', d);
      const len = path.getTotalLength();
      path.style.transition = 'none';
      path.style.strokeDasharray = String(len);
      path.style.strokeDashoffset = String(len);
      path.getBoundingClientRect(); // force reflow before animating
      path.style.transition = 'stroke-dashoffset 4.6s cubic-bezier(.4,0,.2,1)';
      path.style.strokeDashoffset = '0';
    };
    draw();
    let raf = 0;
    const onResize = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); };
    window.addEventListener('resize', onResize);
    // webfont load shifts the period's x — redraw once fonts are ready
    if (document.fonts?.ready) document.fonts.ready.then(draw).catch(() => {});
    return () => { window.removeEventListener('resize', onResize); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-bg">
        <div className="hero-glow" />
        <svg className="hero-curve" ref={svgRef} preserveAspectRatio="none" aria-hidden="true">
          <path ref={pathRef} fill="none" stroke="var(--gold)" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="hero-inner container">
        <div className="eyebrow">
          <span className="dot" /> HanYang Financial Engineering · Est. 2007 · <LiveClock />
        </div>
        <h1 className="display">Where theory compounds<br />into <em>alpha<span className="period" ref={dotRef} /></em></h1>
        <p className="lede">
          <b>한양대학교 대표 금융학회</b><br />
          엄격한 커리큘럼과 프로젝트로 금융 커리어의 시작을 돕습니다
        </p>
        <div className="cta-row">
          <Magnetic><Link className="btn gold" to="/about">Discover HYFE</Link></Magnetic>
          <Link className="btn" to="/recruiting/process">Join Us →</Link>
        </div>
      </div>
      <div className="scroll-cue">Scroll</div>
    </section>
  );
};

/* Magnetic wrapper for primary CTAs */
const Magnetic = ({ children, ...rest }) => {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px, ${(e.clientY - r.top - r.height / 2) * 0.32}px)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = ''; };
  return (
    <span ref={ref} onMouseMove={onMove} onMouseLeave={reset} style={{ display: 'inline-flex', transition: 'transform .2s ease' }} {...rest}>
      {children}
    </span>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

/* ════════════════════════════════════════
   STYLES — "Bright Blue" (white theme · one font · weight for emphasis)
   ════════════════════════════════════════ */

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+KR:wght@400;500;700&display=swap');

  :root{
    --bg:#ffffff; --bg-2:#f3f6fc;
    --panel:#f6f9ff; --panel-line:#cdd9ef;
    --ink:#15346e; --ink-2:#46587a; --muted:#7a88a6;
    --gold:#2563eb; --gold-soft:rgba(37,99,235,.07);   /* repurposed: single blue accent */
    --up:#2563eb; --down:#e5687a;
    --line:#e7eefb;
    /* one font everywhere — emphasis comes from weight, not family */
    --sans:'Inter','Noto Sans KR',system-ui,-apple-system,sans-serif;
    --serif:var(--sans); --mono:var(--sans);
  }

  *{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  html,body,#root{min-height:100%}
  body{font-family:var(--sans);background:var(--bg);color:var(--ink-2);
    -webkit-font-smoothing:antialiased;overflow-x:hidden;line-height:1.5}
  a{color:inherit;text-decoration:none}
  ::selection{background:var(--gold);color:#fff}

  .page{min-height:100vh;background:var(--bg);position:relative}
  .container,.wrap{width:min(1180px,92vw);margin:0 auto}

  /* grid backdrop */
  .grid-bg{position:fixed;inset:0;z-index:0;pointer-events:none;
    background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);
    background-size:72px 72px;
    -webkit-mask-image:radial-gradient(ellipse 80% 55% at 50% 0%,#000 10%,transparent 75%);
    mask-image:radial-gradient(ellipse 80% 55% at 50% 0%,#000 10%,transparent 75%);opacity:.7}

  /* ── Header ── */
  header{position:fixed;top:0;left:0;width:100%;z-index:60;
    background:rgba(255,255,255,.82);backdrop-filter:blur(16px) saturate(160%);
    border-bottom:1px solid var(--line)}
  .nav{display:flex;align-items:center;justify-content:space-between;height:64px}
  .brand{font-weight:800;font-size:23px;letter-spacing:-.01em;color:var(--ink)}
  .brand b{color:var(--gold);font-weight:800}
  .nav-links{display:flex;gap:28px;list-style:none;align-items:center}
  .nav-links a{font-size:12.5px;font-weight:600;letter-spacing:.04em;color:var(--ink-2);
    text-transform:uppercase;position:relative;padding:4px 0;transition:color .2s}
  .nav-links a::after{content:'';position:absolute;left:0;bottom:-2px;height:2px;width:0;background:var(--gold);transition:width .28s ease}
  .nav-links a:hover,.nav-links a.active{color:var(--gold)}
  .nav-links a:hover::after,.nav-links a.active::after{width:100%}
  .mobile-toggle{display:none;background:none;border:none;color:var(--ink);cursor:pointer;padding:8px}
  .nav-right{display:flex;align-items:center;gap:22px}
  .admin-area{display:flex;align-items:center;gap:12px}
  .hello{font-size:12.5px;font-weight:600;color:var(--ink-2);white-space:nowrap}
  .hello b{color:var(--ink);font-weight:700}

  main{padding-top:88px;position:relative;z-index:1}

  /* ── Buttons ── */
  .btn{font-size:13px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;
    padding:13px 24px;border-radius:4px;border:1px solid var(--panel-line);cursor:pointer;transition:.22s;
    display:inline-flex;align-items:center;justify-content:center;gap:8px;background:transparent;color:var(--ink)}
  .btn:hover{border-color:var(--gold);color:var(--gold);transform:translateY(-1px)}
  .btn.gold{background:var(--gold);color:#fff;border-color:var(--gold);font-weight:700}
  .btn.gold:hover{background:#1d4ed8;border-color:#1d4ed8;color:#fff;box-shadow:0 10px 28px rgba(37,99,235,.28);transform:translateY(-2px)}
  .btn.sm{padding:8px 14px;font-size:11.5px}

  /* ── Hero (full-bleed, centered) ── */
  .hero{position:relative;min-height:calc(100vh - 88px);display:flex;flex-direction:column;
    align-items:center;justify-content:center;text-align:center;padding:56px 0 84px;overflow:hidden}
  .hero-bg{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden}
  .hero-glow{position:absolute;top:-12%;left:50%;transform:translateX(-50%);
    width:min(1000px,120vw);height:620px;border-radius:50%;
    background:radial-gradient(closest-side,rgba(37,99,235,.20),rgba(37,99,235,.06) 55%,transparent 72%)}
  .hero-curve{position:absolute;inset:0;width:100%;height:100%;opacity:.55}
  .hero-inner{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center}
  .eyebrow{display:inline-flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:center;
    font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-2);margin-bottom:30px}
  .dot{width:7px;height:7px;border-radius:50%;background:var(--gold);box-shadow:0 0 10px var(--gold);animation:blink 1.8s ease-in-out infinite}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:.35}}
  h1.display{font-weight:800;font-size:clamp(44px,7.5vw,94px);line-height:1.0;letter-spacing:-.04em;color:var(--ink)}
  h1.display em{font-style:normal;color:var(--gold)}
  .display .period{display:inline-block;width:.15em;height:.15em;border-radius:50%;background:var(--gold);vertical-align:baseline;margin-left:.03em}
  .lede{margin:42px auto 0;max-width:560px;color:var(--ink-2);font-size:clamp(16px,1.4vw,18.5px);line-height:1.7}
  .lede b{color:var(--ink);font-weight:700}
  .cta-row{display:flex;gap:14px;margin-top:40px;flex-wrap:wrap;justify-content:center}
  .cta-row .btn{padding:15px 30px;font-size:13.5px}
  .scroll-cue{position:absolute;bottom:22px;left:50%;transform:translateX(-50%);z-index:1;
    font-size:10.5px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);
    display:flex;flex-direction:column;align-items:center;gap:8px}
  .scroll-cue::after{content:'';width:1px;height:30px;background:linear-gradient(var(--gold),transparent);animation:cue 1.8s ease-in-out infinite}
  @keyframes cue{0%,100%{opacity:.3;transform:scaleY(.6)}50%{opacity:1;transform:scaleY(1)}}

  /* ── Stats strip ── */
  .stats{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
  .stat{padding:30px 8px;text-align:center;border-right:1px solid var(--line)}
  .stat:last-child{border-right:none}
  .stat .n{font-size:clamp(28px,4vw,38px);font-weight:800;color:var(--gold)}
  .stat .l{font-size:11px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.07em;margin-top:6px}

  /* ── Sections ── */
  section{padding:92px 0}
  .sec-head{margin-bottom:14px}
  .sec-label{font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);
    display:inline-flex;align-items:center;gap:12px;margin-bottom:18px}
  .sec-label::before{content:'';width:28px;height:2px;background:var(--gold)}
  .sec-title{font-weight:800;font-size:clamp(28px,4vw,46px);letter-spacing:-.03em;line-height:1.12;margin-bottom:14px;color:var(--ink)}
  .sec-sub{color:var(--ink-2);max-width:580px;line-height:1.7;font-size:16px}

  /* ── Value props ── */
  .vp-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0;margin-top:44px;border-top:1px solid var(--line);border-left:1px solid var(--line)}
  .vp{padding:32px;border-right:1px solid var(--line);border-bottom:1px solid var(--line);transition:background .3s}
  .vp:hover{background:var(--panel)}
  .vp .k{font-size:11px;font-weight:700;color:var(--gold);text-transform:uppercase;letter-spacing:.08em;margin-bottom:18px}
  .vp h4{font-size:21px;font-weight:700;margin-bottom:10px;color:var(--ink)}
  .vp p{color:var(--ink-2);font-size:14.5px;line-height:1.65}

  /* ── Teams grid ── */
  .teams{display:grid;grid-template-columns:repeat(2,1fr);margin-top:44px;border-top:1px solid var(--line);border-left:1px solid var(--line)}
  .team{padding:34px;border-right:1px solid var(--line);border-bottom:1px solid var(--line);
    position:relative;transition:background .3s;display:block;overflow:hidden}
  .team::before{content:attr(data-num);position:absolute;top:26px;right:30px;font-size:12px;font-weight:600;color:var(--muted)}
  .team:hover{background:var(--panel)}
  .team .tname{font-size:25px;font-weight:700;margin-bottom:6px;transition:color .3s;color:var(--ink)}
  .team:hover .tname{color:var(--gold)}
  .team .ttag{font-size:11.5px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--gold);margin-bottom:16px}
  .team .tdesc{color:var(--ink-2);font-size:14.5px;line-height:1.65;max-width:92%}
  .team .arr{margin-top:20px;font-size:12px;font-weight:600;color:var(--muted);display:inline-flex;gap:8px;transition:.3s}
  .team:hover .arr{color:var(--gold);gap:14px}

  /* ── Awards ── */
  .awards{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:44px}
  .award{border:1px solid rgba(37,99,235,.16);border-radius:8px;padding:26px;background:var(--gold-soft);transition:.25s}
  .award:hover{transform:translateY(-3px);border-color:rgba(37,99,235,.38);box-shadow:0 10px 28px rgba(37,99,235,.10)}
  .award .at{font-size:19px;font-weight:700;margin-bottom:4px;color:var(--ink)}
  .award .ad{font-size:12px;font-weight:600;color:var(--gold);text-transform:uppercase;letter-spacing:.04em}

  /* ── CTA band ── */
  .cta-band{margin-top:0;padding:54px;border:1px solid var(--line);border-radius:10px;text-align:center;
    background:linear-gradient(180deg,rgba(37,99,235,.05),transparent)}
  .cta-band h3{font-size:30px;font-weight:800;margin-bottom:12px;letter-spacing:-.02em;color:var(--ink)}
  .cta-band p{color:var(--ink-2);margin-bottom:26px;line-height:1.6}

  /* ── About cards ── */
  .about-grid{display:grid;grid-template-columns:repeat(2,1fr);margin-top:44px;border-top:1px solid var(--line);border-left:1px solid var(--line)}
  .about-card{padding:34px;border-right:1px solid var(--line);border-bottom:1px solid var(--line);transition:background .3s}
  .about-card:hover{background:var(--panel)}
  .about-card h3{font-size:22px;font-weight:700;margin-bottom:12px;color:var(--ink)}
  .about-card p{color:var(--ink-2);line-height:1.75;font-size:15px}

  /* ── Curriculum ── */
  .curriculum{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:40px}
  .cstage{border:1px solid var(--line);border-radius:10px;padding:32px;transition:.3s;position:relative;background:var(--panel)}
  .cstage:hover{border-color:var(--panel-line);transform:translateY(-3px);box-shadow:0 10px 28px rgba(21,52,110,.07)}
  .cstage .lv{font-size:12px;font-weight:700;color:var(--gold);letter-spacing:.08em;margin-bottom:14px}
  .cstage h4{font-size:24px;font-weight:700;margin-bottom:12px;color:var(--ink)}
  .cstage p{color:var(--ink-2);line-height:1.65;font-size:14.5px}

  /* ── Ideal (People) ── */
  .ideal-grid{display:grid;grid-template-columns:repeat(2,1fr);margin-top:44px;border-top:1px solid var(--line);border-left:1px solid var(--line)}
  .ideal{padding:32px;border-right:1px solid var(--line);border-bottom:1px solid var(--line);transition:background .3s}
  .ideal:hover{background:var(--panel)}
  .ideal .idx{font-size:12px;font-weight:700;color:var(--gold);margin-bottom:14px}
  .ideal h4{font-size:21px;font-weight:700;margin-bottom:8px;color:var(--ink)}
  .ideal p{color:var(--ink-2);line-height:1.65;font-size:14.5px}

  /* ── Pill ── */
  .pill{display:inline-flex;align-items:center;padding:7px 16px;border-radius:999px;background:var(--gold-soft);
    color:var(--gold);font-size:12px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;border:1px solid rgba(37,99,235,.18)}

  /* ── Detail / Activities panel ── */
  .panel{border:1px solid var(--line);border-radius:10px;padding:36px;background:var(--panel);margin-top:24px}
  .panel h3{font-size:24px;font-weight:700;margin-bottom:16px;color:var(--ink)}
  .panel p{color:var(--ink-2);line-height:1.75;font-size:15.5px}
  .panel ul{padding-left:18px;color:var(--ink-2);line-height:1.85;font-size:15px}
  .panel ul li{margin-bottom:8px}
  .panel ul li::marker{color:var(--gold)}

  /* ── Recruiting ── */
  .rtabs{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin:40px 0}
  .rtab{padding:24px;border-radius:10px;border:1px solid var(--line);background:var(--panel);transition:.25s;display:block}
  .rtab:hover{border-color:var(--panel-line)}
  .rtab.active{border-color:var(--gold);background:var(--gold-soft)}
  .rtab .tt{font-size:20px;font-weight:700;margin-bottom:4px;color:var(--ink)}
  .rtab .td{font-size:12px;font-weight:500;color:var(--muted);text-transform:uppercase;letter-spacing:.03em}
  .steps{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
  .step{border:1px solid var(--line);border-radius:10px;padding:32px;background:var(--panel);transition:.3s}
  .step:hover{border-color:var(--panel-line)}
  .step .num{font-size:34px;font-weight:800;color:var(--gold);margin-bottom:14px;line-height:1}
  .step .st{font-size:19px;font-weight:700;margin-bottom:8px;color:var(--ink)}
  .step .sd{color:var(--ink-2);font-size:14px;line-height:1.6}

  /* ── Admin / forms ── */
  .field{width:100%;padding:13px;font-size:15px;font-family:var(--sans);border:1px solid var(--panel-line);border-radius:6px;
    background:#fff;color:var(--ink);resize:vertical}
  .field:focus{outline:none;border-color:var(--gold);box-shadow:0 0 0 3px var(--gold-soft)}
  .dropzone{border:1.5px dashed var(--panel-line);border-radius:10px;padding:40px;text-align:center;
    color:var(--muted);font-size:13px;font-weight:500;transition:.2s;cursor:pointer}
  .dropzone.drag{border-color:var(--gold);background:var(--gold-soft);color:var(--gold)}
  .img-x{position:absolute;top:8px;right:8px;background:rgba(229,104,122,.95);color:#fff;border:none;border-radius:50%;
    width:28px;height:28px;cursor:pointer;font-size:16px;font-weight:bold;display:flex;align-items:center;justify-content:center}

  /* ── Footer ── */
  footer{border-top:1px solid var(--line);padding:48px 0;text-align:center;background:var(--bg-2);position:relative;z-index:1}
  .footer-content{display:flex;flex-direction:column;align-items:center;gap:14px}
  .footer-logo{font-size:22px;font-weight:800;color:var(--ink)}
  .footer-logo b{color:var(--gold)}
  .footer-text{font-size:12px;font-weight:500;color:var(--muted);line-height:1.8}
  .footer-links{display:flex;gap:24px;list-style:none}
  .footer-links a{font-size:11.5px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.04em;transition:color .2s}
  .footer-links a:hover{color:var(--gold)}

  /* ── Responsive ── */
  @media(max-width:880px){
    .hero{min-height:auto;padding:60px 0 70px}
    .hero-curve{opacity:.4}
    .vp-grid,.steps,.curriculum,.awards{grid-template-columns:1fr}
    .teams,.about-grid,.ideal-grid{grid-template-columns:1fr}
    .stats{grid-template-columns:repeat(2,1fr)}
    section{padding:72px 0}
    .nav-links{display:none}
    .nav-right{gap:12px}
    .hello{display:none}
    .nav-links.open{display:flex;flex-direction:column;align-items:flex-start;gap:14px;position:absolute;top:100%;left:0;right:0;
      background:rgba(255,255,255,.97);border-bottom:1px solid var(--line);padding:20px 4vw}
    .mobile-toggle{display:block}
    .rtabs{grid-template-columns:1fr}
  }
  /* whole-panel drop highlight (admin) */
  .panel.drop-active{border-color:var(--gold);background:var(--gold-soft);box-shadow:0 0 0 3px var(--gold-soft)}
  .panel.droppable{position:relative}
  .panel.droppable::after{content:'⤓ 여기에 사진을 놓으세요';position:absolute;top:10px;right:14px;
    font-size:11px;font-weight:600;color:var(--muted);opacity:.65}

  @media(prefers-reduced-motion:reduce){*{animation:none!important}}
`;

/* ════════════════════════════════════════
   LAYOUT
   ════════════════════════════════════════ */

/* ── Auth context (global admin state) ── */
const AuthContext = React.createContext(null);
const useAuth = () => React.useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try { const u = await getCurrentUser(); if (alive) setUser(u); }
      catch (e) { console.error(e); }
    })();
    const unsub = onAuthChange(setUser);
    return () => { alive = false; unsub(); };
  }, []);

  const login = async (id, pw) => { await signIn(id, pw); setUser(await getCurrentUser()); };
  const logout = async () => { await signOut(); setUser(null); };

  return (
    <AuthContext.Provider value={{
      user, isAdmin: !!user, login, logout,
      loginOpen, openLogin: () => setLoginOpen(true), closeLogin: () => setLoginOpen(false),
    }}>
      {children}
    </AuthContext.Provider>
  );
};

const LoginModal = () => {
  const { loginOpen, closeLogin, login } = useAuth();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  if (!loginOpen) return null;
  const submit = async () => {
    try { await login(id.trim(), pw); closeLogin(); setId(''); setPw(''); }
    catch (e) { alert(e.message); }
  };
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,.45)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
      <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', padding: 36, borderRadius: 10, maxWidth: 380, width: '90%' }}>
        <h3 style={{ marginBottom: 20, fontSize: 22, fontWeight: 700, color: 'var(--ink)' }}>Admin Login</h3>
        <input type="text" placeholder={cmsEnabled ? 'Email' : 'ID'} value={id} autoComplete="username"
          onChange={(e) => setId(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          className="field" style={{ marginBottom: 12 }} />
        <input type="password" placeholder="Password" value={pw} autoComplete="current-password"
          onChange={(e) => setPw(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          className="field" style={{ marginBottom: 16 }} />
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={submit} className="btn gold" style={{ flex: 1 }}>Login</button>
          <button onClick={() => { closeLogin(); setId(''); setPw(''); }} className="btn" style={{ flex: 1 }}>Cancel</button>
        </div>
        {!cmsEnabled && (
          <p style={{ fontSize: 10.5, fontWeight: 500, color: 'var(--muted)', marginTop: 14, lineHeight: 1.6 }}>
            로컬 모드 · 변경사항은 이 브라우저에만 저장됩니다. (기본 ID admin / PW hyfe2024)
          </p>
        )}
      </div>
    </div>
  );
};

const AdminArea = () => {
  const { isAdmin, user, openLogin, logout } = useAuth();
  return (
    <div className="admin-area">
      {isAdmin ? (
        <>
          <span className="hello">안녕하세요, <b>{displayName(user)}</b>님</span>
          <button className="btn sm" onClick={logout}>로그아웃</button>
        </>
      ) : (
        <button className="btn sm" onClick={openLogin}>Admin</button>
      )}
    </div>
  );
};

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => { setMenuOpen(false); }, [location]);
  const isActive = (path) => (path === '/' ? location.pathname === '/' : location.pathname.startsWith(path));

  return (
    <>
      <style>{globalStyles}</style>
      <div className="grid-bg" />
      <LoginModal />
      <div className="page">
        <header>
          <div className="container nav">
            <Link to="/" className="brand">HY<b>FE</b></Link>
            <div className="nav-right">
              <nav>
                <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                  <li><Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link></li>
                  <li><Link to="/about" className={isActive('/about') ? 'active' : ''}>About</Link></li>
                  <li><Link to="/people" className={isActive('/people') ? 'active' : ''}>People</Link></li>
                  <li><Link to="/activities" className={isActive('/activities') ? 'active' : ''}>Activities</Link></li>
                  <li><Link to="/recruiting/process" className={isActive('/recruiting') ? 'active' : ''}>Recruiting</Link></li>
                </ul>
              </nav>
              <AdminArea />
              <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>
        </header>

        <main>{children}</main>

        <footer>
          <div className="container footer-content">
            <div className="footer-logo">HY<b>FE</b></div>
            <p className="footer-text">
              HanYang Financial Engineering · Est. 2007<br />
              Growth &amp; Success through Finance and Engineering
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
   LANDING
   ════════════════════════════════════════ */

const LandingPage = () => (
  <>
    <Hero />

    <div className="container">
      {/* Stats */}
    <RevealSection>
      <div className="stats">
        {stats.map((s) => (
          <div key={s.label} className="stat">
            <div className="n">
              <AnimatedNumber target={s.number.replace('+', '')} suffix={s.number.includes('+') ? '+' : ''} />
            </div>
            <div className="l">{s.label}</div>
          </div>
        ))}
      </div>
    </RevealSection>

    {/* Value props */}
    <section>
      <RevealSection>
        <div className="sec-head">
          <div className="sec-label">Why HYFE</div>
          <h2 className="sec-title">Growth &amp; Success,<br />engineered.</h2>
          <p className="sec-sub">단순한 금융 동아리를 넘어, 여러분의 커리어를 위한 발판입니다.</p>
        </div>
      </RevealSection>
      <RevealSection>
        <div className="vp-grid">
          {valueProps.map((v) => (
            <div key={v.title} className="vp">
              <div className="k">{v.k}</div>
              <h4>{v.title}</h4>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </RevealSection>
    </section>

    {/* Teams */}
    <section style={{ paddingTop: 0 }}>
      <RevealSection>
        <div className="sec-head">
          <div className="sec-label">Specialized Tracks</div>
          <h2 className="sec-title">Four desks.<br />One trading floor.</h2>
          <p className="sec-sub">관심 분야에 따라 전문 트랙을 선택하고, 교육 → 실습 → 프로젝트로 이어지는 깊이 있는 경험을 쌓습니다.</p>
        </div>
      </RevealSection>
      <RevealSection>
        <div className="teams">
          {activities.map((a, i) => (
            <Link key={a.id} to={`/activities/${a.id}`} className="team" data-num={`0${i + 1}`}>
              <div className="tname">{a.title}</div>
              <div className="ttag">{a.tag}</div>
              <div className="tdesc">{a.summary}</div>
              <div className="arr">VIEW TRACK →</div>
            </Link>
          ))}
        </div>
      </RevealSection>
    </section>

    {/* Awards */}
    <section style={{ paddingTop: 0 }}>
      <RevealSection>
        <div className="sec-head">
          <div className="sec-label">Track Record</div>
          <h2 className="sec-title">Proven on the leaderboard.</h2>
        </div>
      </RevealSection>
      <RevealSection>
        <div className="awards">
          {awards.map((a) => (
            <div key={a.title} className="award">
              <div className="at">{a.title}</div>
              <div className="ad">{a.detail}</div>
            </div>
          ))}
        </div>
      </RevealSection>
    </section>

    {/* CTA */}
    <section style={{ paddingTop: 0 }}>
      <RevealSection>
        <div className="cta-band">
          <h3>Ready to start your journey?</h3>
          <p>HYFE와 함께 금융 커리어의 첫 걸음을 내딛어 보세요.</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Magnetic><Link className="btn gold" to="/recruiting/process">Apply Now</Link></Magnetic>
            <Link className="btn" to="/about">Learn More</Link>
          </div>
        </div>
      </RevealSection>
    </section>
    </div>
  </>
);

/* ════════════════════════════════════════
   ABOUT
   ════════════════════════════════════════ */

const AboutPage = () => (
  <div className="container" style={{ padding: '40px 0 90px' }}>
    <RevealSection>
      <div className="sec-head">
        <div className="sec-label">About</div>
        <h2 className="sec-title">From classroom<br />to capital markets.</h2>
        <p className="sec-sub">
          2007년 파생상품 스터디로 시작한 HYFE는 이제 IBD·리서치·퀀트·파생을 아우르는 한양대 대표 학생 금융 학회입니다. 학문적 이론과 실무 현장의 간극을 메우는 것이 우리의 일입니다.
        </p>
        <div style={{ marginTop: 20 }}><span className="pill">IBD · Research · Quant · Derivatives</span></div>
      </div>
    </RevealSection>

    <RevealSection>
      <div className="about-grid">
        {aboutCards.map((c) => (
          <div key={c.title} className="about-card">
            <h3>{c.title}</h3>
            <p>{c.text}</p>
          </div>
        ))}
      </div>
    </RevealSection>

    <RevealSection style={{ marginTop: 70 }}>
      <div className="sec-head">
        <div className="sec-label">Curriculum</div>
        <h2 className="sec-title">A 3-stage learning path.</h2>
      </div>
    </RevealSection>
    <RevealSection>
      <div className="curriculum">
        {curriculumStages.map((s) => (
          <div key={s.level} className="cstage">
            <div className="lv">{s.level}</div>
            <h4>{s.title}</h4>
            <p>{s.description}</p>
          </div>
        ))}
      </div>
    </RevealSection>

    <RevealSection style={{ marginTop: 48, textAlign: 'center' }}>
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Magnetic><Link className="btn gold" to="/activities">Explore Activities</Link></Magnetic>
        <Link className="btn" to="/recruiting/process">Join HYFE</Link>
      </div>
    </RevealSection>
  </div>
);

/* ════════════════════════════════════════
   PEOPLE
   ════════════════════════════════════════ */

const PeoplePage = () => (
  <div className="container" style={{ padding: '40px 0 90px' }}>
    <RevealSection>
      <div className="sec-head">
        <div className="sec-label">People</div>
        <h2 className="sec-title">We're looking for attitude,<br />not pedigree.</h2>
        <p className="sec-sub">배경이 아닌 태도를 봅니다. HYFE가 찾는 사람은 이런 사람입니다.</p>
      </div>
    </RevealSection>

    <RevealSection>
      <div className="ideal-grid">
        {idealCandidates.map((c, i) => (
          <div key={c.title} className="ideal">
            <div className="idx">0{i + 1}</div>
            <h4>{c.title}</h4>
            <p>{c.description}</p>
          </div>
        ))}
      </div>
    </RevealSection>

    <RevealSection style={{ marginTop: 48, textAlign: 'center' }}>
      <Magnetic><Link className="btn gold" to="/recruiting/process">Apply Now →</Link></Magnetic>
    </RevealSection>
  </div>
);

/* ════════════════════════════════════════
   ACTIVITIES (admin — localStorage for now)
   ponytail: localStorage is per-browser; swapped to Supabase in next phase.
   ════════════════════════════════════════ */

/* Whole-element drop target (admin). Returns spread-able handlers + dragging flag. */
const useDropFiles = (onFiles, enabled) => {
  const [dragging, setDragging] = useState(false);
  const dragProps = enabled
    ? {
        onDragOver: (e) => { e.preventDefault(); if (!dragging) setDragging(true); },
        onDragLeave: (e) => { e.preventDefault(); setDragging(false); }, // ponytail: may flicker over children, fine here
        onDrop: (e) => {
          e.preventDefault();
          setDragging(false);
          const arr = Array.from(e.dataTransfer.files || []).filter((f) => f.type.startsWith('image/'));
          if (arr.length) onFiles(arr);
        },
      }
    : {};
  return { dragProps, dragging };
};

const ImageGrid = ({ images, isAdmin, onRemove }) => {
  if (!images.length) return null;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14, marginTop: 16 }}>
      {images.map((img, idx) => (
        <div key={idx} style={{ position: 'relative', borderRadius: 6, overflow: 'hidden', border: '1px solid var(--line)' }}>
          <img src={img} alt={`activity ${idx + 1}`} style={{ width: '100%', display: 'block' }} />
          {isAdmin && <button className="img-x" onClick={() => onRemove(idx)}>×</button>}
        </div>
      ))}
    </div>
  );
};

const Uploader = ({ onFiles, busy }) => {
  const inputRef = useRef(null);
  const [drag, setDrag] = useState(false);
  const handle = (files) => {
    const arr = Array.from(files || []).filter((f) => f.type.startsWith('image/'));
    if (arr.length) onFiles(arr);
  };
  return (
    <div
      className={`dropzone ${drag ? 'drag' : ''}`}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => { e.preventDefault(); e.stopPropagation(); setDrag(false); handle(e.dataTransfer.files); }}
    >
      {busy ? '업로드 중…' : '＋ 이미지를 드래그하거나 클릭해서 업로드'}
      <input ref={inputRef} type="file" accept="image/*" multiple hidden
        onChange={(e) => { handle(e.target.files); e.target.value = ''; }} />
    </div>
  );
};

const TeamPanel = ({ team, isAdmin, busy, onText, onBlurSave, onUpload, onRemoveImg, delay }) => {
  const drop = useDropFiles((files) => onUpload(files, team.id), isAdmin);
  return (
    <RevealSection delay={delay}>
      <div className={`panel ${isAdmin ? 'droppable' : ''} ${drop.dragging ? 'drop-active' : ''}`} style={{ marginTop: 0 }} {...drop.dragProps}>
        <h3 style={{ marginBottom: 20 }}>{team.title}</h3>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px', minWidth: 280 }}>
            {team.images.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: isAdmin ? 14 : 0 }}>
                {team.images.map((img, idx) => (
                  <div key={idx} style={{ position: 'relative', borderRadius: 6, overflow: 'hidden', border: '1px solid var(--line)' }}>
                    <img src={img} alt={`${team.title} ${idx + 1}`} style={{ width: '100%', display: 'block' }} />
                    {isAdmin && <button className="img-x" onClick={() => onRemoveImg(team.id, idx)}>×</button>}
                  </div>
                ))}
              </div>
            )}
            {isAdmin && <Uploader busy={busy} onFiles={(files) => onUpload(files, team.id)} />}
          </div>
          <div style={{ flex: '1 1 400px', minWidth: 280, display: 'flex', alignItems: 'center' }}>
            {isAdmin ? (
              <textarea value={team.text}
                onChange={(e) => onText(team.id, e.target.value)}
                onBlur={onBlurSave}
                placeholder={`${team.title} 활동 내용을 입력하세요...`} className="field" style={{ minHeight: 180 }} />
            ) : (
              <div style={{ width: '100%' }}>
                {team.text
                  ? <p style={{ margin: 0, lineHeight: 1.8, fontSize: 15, color: 'var(--ink-2)' }}>{team.text}</p>
                  : <p style={{ margin: 0, color: 'var(--muted)', fontStyle: 'italic' }}>활동 내용이 아직 작성되지 않았습니다.</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </RevealSection>
  );
};

const ActivitiesIndex = () => {
  const { isAdmin } = useAuth();
  const [busy, setBusy] = useState(false);
  const [marketReview, setMarketReview] = useState(DEFAULT_MARKET);
  const [teamSessions, setTeamSessions] = useState(DEFAULT_TEAMS);

  // ref mirror so onBlur persists the latest edits, not a stale closure
  const dataRef = useRef({ marketReview, teamSessions });
  useEffect(() => { dataRef.current = { marketReview, teamSessions }; }, [marketReview, teamSessions]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const content = await loadContent();
        if (!alive) return;
        setMarketReview(content.marketReview);
        setTeamSessions(content.teamSessions);
      } catch (e) { console.error(e); }
    })();
    return () => { alive = false; };
  }, []);

  const onError = (label) => (e) => alert(`${label} 실패: ${e.message}`);

  const persistMarket = (next) => { setMarketReview(next); saveMarketReview(next).catch(onError('저장')); };
  const persistTeams = (next) => { setTeamSessions(next); saveTeamSessions(next).catch(onError('저장')); };

  const handleUpload = async (files, target) => {
    setBusy(true);
    try {
      const urls = [];
      for (const f of files) urls.push(await uploadImage(f)); // sequential keeps order
      if (target === 'market') persistMarket({ ...marketReview, images: [...marketReview.images, ...urls] });
      else persistTeams(teamSessions.map((t) => (t.id === target ? { ...t, images: [...t.images, ...urls] } : t)));
    } catch (e) { onError('업로드')(e); } finally { setBusy(false); }
  };

  const removeMarketImg = (i) => persistMarket({ ...marketReview, images: marketReview.images.filter((_, idx) => idx !== i) });
  const removeTeamImg = (teamId, i) =>
    persistTeams(teamSessions.map((t) => (t.id === teamId ? { ...t, images: t.images.filter((_, idx) => idx !== i) } : t)));

  const setTeamText = (id, val) => setTeamSessions((prev) => prev.map((t) => (t.id === id ? { ...t, text: val } : t)));
  const marketDrop = useDropFiles((files) => handleUpload(files, 'market'), isAdmin);

  return (
    <div className="container" style={{ padding: '40px 0 90px' }}>
      <RevealSection>
        <div className="sec-head">
          <div className="sec-label">Activities</div>
          <h2 className="sec-title">Our Activities</h2>
          <p className="sec-sub">매주 진행되는 시황정리와 팀별 세션을 통해 실무 역량을 키웁니다.</p>
        </div>
      </RevealSection>

      {/* Market Review */}
      <RevealSection>
        <div className={`panel ${isAdmin ? 'droppable' : ''} ${marketDrop.dragging ? 'drop-active' : ''}`} {...marketDrop.dragProps}>
          <h3 style={{ marginBottom: 16 }}>시황정리</h3>
          {isAdmin ? (
            <>
              <textarea value={marketReview.text}
                onChange={(e) => setMarketReview({ ...marketReview, text: e.target.value })}
                onBlur={() => persistMarket(dataRef.current.marketReview)}
                placeholder="시황정리 내용을 입력하세요..." className="field" style={{ minHeight: 100, marginBottom: 12 }} />
              <Uploader busy={busy} onFiles={(files) => handleUpload(files, 'market')} />
            </>
          ) : (
            <p style={{ margin: 0 }}>{marketReview.text || '모든 팀이 모여 한 주간의 매크로 이슈와 에쿼티 이슈에 대해 발표하고 질문하는 시간을 가집니다.'}</p>
          )}
          <ImageGrid images={marketReview.images} isAdmin={isAdmin} onRemove={removeMarketImg} />
        </div>
      </RevealSection>

      {/* Team Sessions */}
      <RevealSection style={{ marginTop: 48 }}>
        <div className="sec-head"><h2 className="sec-title" style={{ fontSize: 30 }}>Team Sessions</h2></div>
      </RevealSection>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {teamSessions.map((team, i) => (
          <TeamPanel key={team.id} team={team} isAdmin={isAdmin} busy={busy} delay={i * 0.06}
            onText={setTeamText}
            onBlurSave={() => persistTeams(dataRef.current.teamSessions)}
            onUpload={handleUpload} onRemoveImg={removeTeamImg} />
        ))}
      </div>

      <RevealSection style={{ marginTop: 48, textAlign: 'center' }}>
        <Magnetic><Link className="btn gold" to="/recruiting/process">Ready to Join? →</Link></Magnetic>
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
      <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
        <h2 className="sec-title">Track Not Found</h2>
        <p className="sec-sub" style={{ margin: '0 auto' }}>찾으시는 팀이 존재하지 않습니다.</p>
        <div style={{ marginTop: 32, display: 'flex', gap: 14, justifyContent: 'center' }}>
          <Link className="btn" to="/activities">Back to Activities</Link>
          <Link className="btn gold" to="/">Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 0 90px' }}>
      <RevealSection>
        <div className="sec-head">
          <span className="pill">{activity.tag}</span>
          <h2 className="sec-title" style={{ marginTop: 18 }}>{activity.title} Track</h2>
          <p className="sec-sub">{activity.summary}</p>
        </div>
      </RevealSection>

      <RevealSection>
        <div className="panel">
          <h3>Overview</h3>
          <p>{activity.description}</p>
          <h3 style={{ marginTop: 28 }}>What You&apos;ll Do</h3>
          <ul>{activity.bullets.map((line) => <li key={line}>{line}</li>)}</ul>
        </div>
      </RevealSection>

      <RevealSection style={{ marginTop: 40, textAlign: 'center' }}>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Magnetic><Link className="btn gold" to="/recruiting/process">Apply for This Track</Link></Magnetic>
          <Link className="btn" to="/activities">View All Tracks</Link>
        </div>
      </RevealSection>
    </div>
  );
};

/* ════════════════════════════════════════
   RECRUITING
   ════════════════════════════════════════ */

const RecruitingPage = ({ mode }) => {
  const tab = recruitingTabs[mode] || recruitingTabs.process;
  return (
    <div className="container" style={{ padding: '40px 0 90px' }}>
      <RevealSection>
        <div className="sec-head">
          <div className="sec-label">Recruiting</div>
          <h2 className="sec-title">Join HYFE.</h2>
          <p className="sec-sub">
            배우고, 기여하고, 성장할 준비가 된 열정적인 사람을 찾습니다. 완성도가 아닌 잠재력을 발굴하도록 설계된 프로세스입니다.
          </p>
        </div>
      </RevealSection>

      <RevealSection>
        <div className="rtabs">
          <Link className={`rtab ${mode === 'process' ? 'active' : ''}`} to="/recruiting/process">
            <div className="tt">Process</div>
            <div className="td">지원 단계 및 타임라인 개요</div>
          </Link>
          <Link className={`rtab ${mode === 'apply' ? 'active' : ''}`} to="/recruiting/apply">
            <div className="tt">How to Apply</div>
            <div className="td">제출 가이드라인 및 플랫폼 세부정보</div>
          </Link>
        </div>
      </RevealSection>

      {mode === 'process' ? (
        <RevealSection>
          <div className="steps">
            {tab.steps.map((s) => (
              <div key={s.step} className="step">
                <div className="num">{s.step}</div>
                <div className="st">{s.title}</div>
                <div className="sd">{s.desc}</div>
              </div>
            ))}
          </div>
        </RevealSection>
      ) : (
        <RevealSection>
          <div className="panel" style={{ marginTop: 0 }}>
            <h3>{tab.title}</h3>
            <ul>{tab.body.map((line) => <li key={line}>{line}</li>)}</ul>
          </div>
        </RevealSection>
      )}

      {mode === 'apply' && (
        <RevealSection>
          <div className="cta-band" style={{ marginTop: 24 }}>
            <h3>Ready to start your journey?</h3>
            <p>지원서 양식을 다운로드하여 공식 플랫폼을 통해 제출하세요.</p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
              <a className="btn gold" href="https://cafe.naver.com/f-e/cafes/28919085/menus/1?viewType=L" target="_blank" rel="noreferrer">Visit Application Portal</a>
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
    <AuthProvider>
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
    </AuthProvider>
  </BrowserRouter>
);

export default App;
