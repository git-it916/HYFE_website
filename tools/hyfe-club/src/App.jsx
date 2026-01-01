import React from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

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
  },
];

const curriculumStages = [
  {
    level: 'Lv.1',
    title: 'Education',
    description: '강의와 리딩을 통해 핵심 개념, 산업 프레임워크, 기초 도구를 학습합니다.'
  },
  {
    level: 'Lv.2',
    title: 'Practice',
    description: '실제 데이터를 활용한 실습: 밸류에이션 모델, 백테스트, 거시 분석, 피치 형식 등을 다룹니다.'
  },
  {
    level: 'Lv.3',
    title: 'Project',
    description: '실무를 반영한 팀 주도 결과물: 리서치 리포트, 피치북, 전략 분석 등을 작성합니다.'
  },
];

const awards = [
  'WorldQuant IQC — Top Performer',
  'CFA Research Challenge — National Finalist',
  'DB GAPS — Excellence Award',
];

const idealCandidates = [
  {
    title: 'Passion over pedigree',
    description: '사전 지식이나 스펙보다 호기심과 배우려는 의지를 더 중요하게 생각합니다.'
  },
  {
    title: 'Ownership mindset',
    description: '주도성을 가지고 프로젝트를 완수하며, 팀과 결과물에 대한 책임감을 가집니다.'
  },
  {
    title: 'Collaborative spirit',
    description: '동료 리뷰, 멘토십, 열린 지식 공유를 통해 함께 성장합니다.'
  },
  {
    title: 'Diverse backgrounds welcome',
    description: '경영, 공학, 수학, 인문학 등 어떤 배경이든 여러분의 관점은 가치를 더합니다.'
  },
];

const recruitingTabs = {
  process: {
    title: 'Process',
    body: [
      '1. 지원서 검토 — 지원 동기, 희망 트랙, 이전 작업물(선택 사항)을 제출합니다.',
      '2. 인터뷰 — 행동 적합성 및 기초 지식 평가를 동시에 진행합니다.',
      '3. 온보딩 — 트랙에 합류하여 팀을 만나고 첫 프로젝트 스프린트를 시작합니다.',
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

const Layout = ({ children }) => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+KR:wght@400;500;700&display=swap');

      :root {
        --bg: #f8fafc;
        --ink: #0f172a;
        --muted: #475569;
        --accent: #1e40af;
        --accent-light: #3b82f6;
        --card: rgba(255, 255, 255, 0.95);
        --border: rgba(15, 23, 42, 0.08);
        --gold: #d97706;
      }

      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      html, body, #root { height: 100%; margin: 0; }

      body {
        font-family: 'Inter', 'Noto Sans KR', system-ui, -apple-system, sans-serif;
        background: var(--bg);
        color: var(--ink);
        -webkit-font-smoothing: antialiased;
      }

      a { color: inherit; text-decoration: none; }

      .page {
        min-height: 100vh;
        background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
      }

      .container {
        width: min(1200px, 92vw);
        margin: 0 auto;
      }

      header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 100;
        background: rgba(248, 250, 252, 0.85);
        backdrop-filter: blur(16px) saturate(180%);
        border-bottom: 1px solid var(--border);
      }

      .nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 0;
      }

      .logo {
        font-weight: 800;
        font-size: 22px;
        letter-spacing: -0.02em;
        color: var(--accent);
      }

      nav ul {
        display: flex;
        align-items: center;
        gap: 28px;
        list-style: none;
        margin: 0;
        padding: 0;
        font-weight: 600;
        font-size: 15px;
      }

      nav a {
        padding: 8px 12px;
        border-radius: 8px;
        transition: all 200ms ease;
        color: var(--ink);
      }

      nav a:hover {
        color: var(--accent);
        background: rgba(30, 64, 175, 0.06);
      }

      main { padding-top: 76px; }

      .hero {
        min-height: calc(100vh - 76px);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        text-align: center;
        padding: 100px 0;
        overflow: hidden;
      }

      .hero::before {
        content: '';
        position: absolute;
        width: 600px;
        height: 600px;
        background: radial-gradient(circle, rgba(59, 130, 246, 0.15), transparent 70%);
        top: -200px;
        right: -100px;
        border-radius: 50%;
        filter: blur(80px);
      }

      .hero-content {
        position: relative;
        z-index: 1;
        max-width: 900px;
        margin: 0 auto;
        display: grid;
        gap: 32px;
      }

      .eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 18px;
        border-radius: 999px;
        background: var(--card);
        border: 1px solid var(--border);
        font-size: 14px;
        font-weight: 600;
        color: var(--accent);
        box-shadow: 0 4px 20px rgba(30, 64, 175, 0.08);
        margin: 0 auto;
      }

      .title {
        font-size: clamp(44px, 7vw, 72px);
        line-height: 1.5;
        margin: 0;
        font-weight: 800;
        letter-spacing: -0.03em;
        background: linear-gradient(135deg, var(--ink) 0%, var(--accent) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .subtitle {
        font-size: 20px;
        color: var(--muted);
        margin: 0 auto;
        max-width: 680px;
        line-height: 1.6;
        font-weight: 500;
      }

      .hero-actions {
        display: flex;
        justify-content: center;
        gap: 16px;
        flex-wrap: wrap;
        margin-top: 8px;
      }

      .btn {
        padding: 14px 28px;
        border-radius: 12px;
        border: 2px solid var(--ink);
        background: transparent;
        color: var(--ink);
        font-weight: 700;
        cursor: pointer;
        transition: all 200ms ease;
        font-size: 16px;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }

      .btn.primary {
        background: var(--ink);
        color: #fff;
        border-color: var(--ink);
        box-shadow: 0 4px 14px rgba(15, 23, 42, 0.2);
      }

      .btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(15, 23, 42, 0.15);
      }

      .btn.primary:hover {
        background: var(--accent);
        border-color: var(--accent);
      }

      section { padding: 100px 0; }

      .section-head {
        text-align: center;
        margin-bottom: 56px;
      }

      .section-title {
        margin: 0 0 16px;
        font-size: clamp(32px, 5vw, 48px);
        font-weight: 800;
        letter-spacing: -0.02em;
        color: var(--ink);
      }

      .section-sub {
        color: var(--muted);
        margin: 0 auto;
        max-width: 700px;
        line-height: 1.7;
        font-size: 18px;
      }

      .pill {
        display: inline-flex;
        align-items: center;
        padding: 8px 16px;
        border-radius: 999px;
        background: rgba(30, 64, 175, 0.1);
        color: var(--accent);
        font-weight: 700;
        font-size: 14px;
        margin-top: 12px;
        border: 1px solid rgba(30, 64, 175, 0.2);
      }

      .card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 24px;
      }

      .card {
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 20px;
        padding: 32px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.04);
        transition: all 250ms ease;
      }

      .card:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 60px rgba(0,0,0,0.1);
        border-color: var(--accent-light);
      }

      .card h4 {
        margin: 0 0 12px;
        font-size: 22px;
        font-weight: 700;
        color: var(--ink);
      }

      .card p {
        margin: 0;
        color: var(--muted);
        line-height: 1.6;
        font-size: 16px;
      }

      .card .tag {
        display: inline-block;
        font-size: 12px;
        font-weight: 700;
        color: var(--accent);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 12px;
      }

      .curriculum-row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 28px;
        margin-top: 48px;
      }

      .curriculum-card {
        background: var(--card);
        border: 2px solid var(--border);
        border-radius: 20px;
        padding: 36px 28px;
        text-align: center;
        box-shadow: 0 10px 40px rgba(0,0,0,0.04);
      }

      .curriculum-card .level {
        font-size: 14px;
        font-weight: 800;
        color: var(--accent);
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin-bottom: 8px;
      }

      .curriculum-card h4 {
        font-size: 24px;
        font-weight: 800;
        margin: 0 0 12px;
      }

      .curriculum-card p {
        color: var(--muted);
        line-height: 1.6;
        margin: 0;
      }

      .awards-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
        max-width: 700px;
        margin: 48px auto 0;
      }

      .award-item {
        background: linear-gradient(135deg, rgba(217, 119, 6, 0.08), rgba(217, 119, 6, 0.02));
        border: 1px solid rgba(217, 119, 6, 0.2);
        border-radius: 16px;
        padding: 20px 28px;
        font-weight: 600;
        color: var(--ink);
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .award-item::before {
        content: '🏆';
        font-size: 24px;
      }

      .ideal-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 24px;
        margin-top: 48px;
      }

      .ideal-card {
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 18px;
        padding: 28px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.04);
      }

      .ideal-card h4 {
        font-size: 19px;
        font-weight: 700;
        margin: 0 0 10px;
        color: var(--accent);
      }

      .ideal-card p {
        margin: 0;
        color: var(--muted);
        line-height: 1.6;
        font-size: 15px;
      }

      .detail-section {
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 24px;
        padding: 48px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.06);
        margin-top: 32px;
      }

      .detail-section h3 {
        font-size: 28px;
        font-weight: 800;
        margin: 0 0 16px;
        color: var(--ink);
      }

      .detail-section p {
        color: var(--muted);
        line-height: 1.7;
        font-size: 17px;
        margin: 0 0 24px;
      }

      .detail-section ul {
        margin: 24px 0 0;
        padding-left: 24px;
        color: var(--muted);
        line-height: 1.8;
        font-size: 16px;
      }

      .detail-section ul li {
        margin-bottom: 12px;
      }

      .recruiting-options {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 24px;
        margin-top: 40px;
      }

      .option-btn {
        padding: 32px;
        border-radius: 20px;
        border: 2px solid var(--border);
        background: var(--card);
        color: var(--ink);
        text-align: left;
        cursor: pointer;
        box-shadow: 0 10px 40px rgba(0,0,0,0.04);
        transition: all 200ms ease;
        display: block;
      }

      .option-btn:hover {
        transform: translateY(-4px);
        border-color: var(--accent-light);
        box-shadow: 0 20px 60px rgba(0,0,0,0.1);
      }

      .option-btn.active {
        border-color: var(--accent);
        background: linear-gradient(135deg, rgba(30, 64, 175, 0.04), var(--card));
        box-shadow: 0 20px 60px rgba(30, 64, 175, 0.15);
      }

      .option-title {
        font-weight: 800;
        font-size: 22px;
        margin-bottom: 8px;
        color: var(--ink);
      }

      .option-desc {
        color: var(--muted);
        font-size: 16px;
        line-height: 1.6;
      }

      .cta-section {
        margin-top: 48px;
        padding: 40px;
        background: linear-gradient(135deg, rgba(30, 64, 175, 0.05), rgba(59, 130, 246, 0.05));
        border: 2px dashed var(--accent-light);
        border-radius: 20px;
        text-align: center;
      }

      .cta-section h3 {
        font-size: 24px;
        font-weight: 800;
        margin: 0 0 12px;
        color: var(--ink);
      }

      .cta-section p {
        color: var(--muted);
        margin: 0 0 24px;
        font-size: 16px;
      }

      footer {
        padding: 60px 0;
        text-align: center;
        color: var(--muted);
        font-size: 15px;
        border-top: 1px solid var(--border);
        background: rgba(255, 255, 255, 0.5);
      }

      footer strong {
        color: var(--ink);
        font-weight: 700;
      }

      @media (max-width: 900px) {
        .nav { padding: 16px 0; }
        nav ul { gap: 18px; font-size: 14px; }
        section { padding: 80px 0; }
        .detail-section { padding: 32px 24px; }
      }

      @media (max-width: 640px) {
        .nav { flex-direction: column; align-items: flex-start; gap: 12px; }
        nav ul { width: 100%; justify-content: space-between; flex-wrap: wrap; }
        .hero { padding: 80px 0; }
        section { padding: 64px 0; }
        .title { font-size: 38px !important; }
        .section-title { font-size: 32px !important; }
        .card, .detail-section { padding: 24px; }
      }
    `}</style>

    <div className="page">
      <header>
        <div className="container nav">
          <Link to="/" className="logo">HYFE</Link>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/activities">Activities</Link></li>
              <li><Link to="/people">Teams</Link></li>
              <li><Link to="/recruiting/process">Recruiting</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer>
        <div className="container">
          <strong>HYFE</strong> (HanYang Financial Engineering) — Est. 2007<br />
          Growth & Success through Finance and Engineering
        </div>
      </footer>
    </div>
  </>
);

const LandingPage = () => (
  <>
    <section className="hero">
      <div className="hero-content">
        <h1 className="title" style={{ fontSize: 'clamp(38px, 6vw, 60px)', whiteSpace: 'nowrap' }}>Where Theory Becomes Alpha</h1>
        <p className="subtitle">
          HYFE는 한양대학교의 대표 금융 학회로<br />
          엄격한 교육, 실전 프로젝트, 네트워크를 통해 금융 커리어 발판을 마련합니다.
        </p>
        <div className="hero-actions">
          <Link className="btn primary" to="/about">Discover HYFE</Link>
          <Link className="btn" to="/recruiting/process">Join Us</Link>
        </div>
      </div>
    </section>

    <section style={{ background: 'rgba(255, 255, 255, 0.5)' }}>
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">Growth & Success</h2>
          <p className="section-sub">
            단순한 금융 동아리를 넘어 여러분의 커리어를 위한 발판입니다. 퀀트 리서치부터 IBD까지, 성장에 필요한 교육을 제공합니다.
          </p>
        </div>
        <div className="card-grid">
          <div className="card">
            <h4>400+ 동문 네트워크</h4>
            <p>졸업생들은 국내외 투자은행, 자산운용사, 헤지펀드에서 일하고 있습니다. 기회를 여는 네트워크에 합류하세요.</p>
          </div>
          <div className="card">
            <h4>실무 중심 교육</h4>
            <p>알고리즘 트레이딩 전략부터 DCF 모델까지, 이론만 배우는 것이 아닌 프로젝트 경험을 제시합니다.</p>
          </div>
          <div className="card">
            <h4>검증된 성과</h4>
            <p>CFA Research Challenge 한국 결승, WorldQuant IQC 한국 결승, 그리고 수많은 취업 성공 사례를 보유하고 있습니다.</p>
          </div>
        </div>
      </div>
    </section>
  </>
);

const AboutPage = () => (
  <div className="container" style={{ padding: '100px 0' }}>
    <div className="section-head">
      <h2 className="section-title">About HYFE</h2>
      <p className="section-sub">
        2007년 설립된 HYFE는 파생상품 스터디 그룹에서 시작하여 퀀트, 파생상품, IBD, 리서치를 아우르는 학생 주도 금융 학회로 성장했습니다.
      </p>
      <div className="pill">IBD • Research • Quant • Derivatives</div>
    </div>

    <div className="detail-section">
      <h3>Our Legacy</h3>
      <p>
        2007년 금융공학과 파생상품에 중점을 두고 설립된 HYFE는 투자은행, 주식 리서치, 퀀트 전략, 구조화 상품을 포괄하는 종합 금융 학회로 성장했습니다. 오늘날 우리는 한국에서 가장 엄격하고 네트워크가 잘 구축된 금융 동아리 중 하나로 인정받고 있습니다.
      </p>

      <h3 style={{ marginTop: 40 }}>Mission & Vision</h3>
      <p>
        우리의 미션은 단순합니다: 학문적 이론과 산업 실무 사이의 간극을 메우는 것입니다. 체계적인 커리큘럼, 경험 많은 동문의 멘토십, 선도적인 금융기관의 업무를 반영한 실무 프로젝트를 제공합니다. 우리의 비전은 열정, 전문성, 협업이 성공을 이끄는 커뮤니티를 만드는 것입니다.
      </p>

      <h3 style={{ marginTop: 40 }}>Unmatched Network</h3>
      <p>
        글로벌 투자은행, 자산운용사, 헤지펀드, 로스쿨에서 일하는 400명 이상의 동문을 보유한 HYFE는 독보적인 네트워크를 제공합니다. 홈커밍 이벤트, 일대일 멘토링, 산업 패널을 통해 우리 회원들은 같은 길을 걸어온 전문가들과 직접 소통할 수 있습니다.
      </p>
    </div>

    <div style={{ marginTop: 40, display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
      <Link className="btn primary" to="/activities">Explore Our Activities</Link>
      <Link className="btn" to="/recruiting/process">Join HYFE</Link>
    </div>
  </div>
);

const PeoplePage = () => (
  <div className="container" style={{ padding: '100px 0' }}>
    <div className="section-head">
      <h2 className="section-title">Who We're Looking For</h2>
      <p className="section-sub">
        HYFE는 스펙이 아닌 사람을 봅니다. 호기심, 끈기, 금융에 대한 진정한 열정을 가진 사람을 찾습니다. 경영, 공학, 수학, 인문학 등 어떤 배경이든 배우고 기여할 준비가 되어 있다면 환영합니다.
      </p>
    </div>

    <div className="ideal-grid">
      {idealCandidates.map((item) => (
        <div className="ideal-card" key={item.title}>
          <h4>{item.title}</h4>
          <p>{item.description}</p>
        </div>
      ))}
    </div>

    <div className="detail-section">
      <h3>Our Culture</h3>
      <p>
        HYFE는 멘토십과 상호 성장의 문화를 기반으로 운영됩니다. 선배 회원들은 복잡한 프로젝트를 통해 후배를 안내하고, 동문들은 산업 인사이트를 공유하며, 모두가 협력적인 환경에 기여합니다. 우리는 지식이 자유롭게 공유되고 야망이 함께 지지될 때 최고의 학습이 일어난다고 믿습니다.
      </p>
      <p style={{ marginTop: 20 }}>
        <strong>사전 금융 경험은 필요하지 않습니다.</strong> 우리의 커리큘럼은 기초 개념부터 고급 응용까지 단계적으로 설계되었습니다. 우리가 요구하는 것은 헌신, 호기심, 그리고 한계를 넘어서려는 의지뿐입니다.
      </p>
    </div>

    <div style={{ marginTop: 40, display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
      <Link className="btn primary" to="/recruiting/process">Apply Now</Link>
      <Link className="btn" to="/about">Learn More</Link>
    </div>
  </div>
);

const ActivitiesIndex = () => (
  <div className="container" style={{ padding: '100px 0' }}>
    <div className="section-head">
      <h2 className="section-title">Our Activities</h2>
      <p className="section-sub">
        각 트랙은 체계적인 3단계 커리큘럼을 따릅니다: Education → Practice → Project. 기초 개념부터 산업 수준의 결과물까지, 중요한 역량을 구축합니다.
      </p>
    </div>

    <div className="curriculum-row">
      {curriculumStages.map((stage) => (
        <div className="curriculum-card" key={stage.level}>
          <div className="level">{stage.level}</div>
          <h4>{stage.title}</h4>
          <p>{stage.description}</p>
        </div>
      ))}
    </div>

    <div style={{ marginTop: 80 }}>
      <div className="section-head">
        <h2 className="section-title">Choose Your Track</h2>
        <p className="section-sub">
          관심 분야를 깊이 탐구하세요. 각 팀은 엄격한 교육과 실무 적용을 결합합니다.
        </p>
      </div>
      <div className="card-grid">
        {activities.map((item) => (
          <Link key={item.id} to={`/activities/${item.id}`} className="card">
            <div className="tag">{item.tag}</div>
            <h4>{item.title}</h4>
            <p>{item.summary}</p>
          </Link>
        ))}
      </div>
    </div>

    <div style={{ marginTop: 80 }}>
      <div className="section-head">
        <h2 className="section-title">Achievements</h2>
        <p className="section-sub">
          우리 회원들은 최상위 금융 대회에서 지속적으로 우수한 성적을 거두며 국내외 무대에서 인정받고 있습니다.
        </p>
      </div>
      <div className="awards-list">
        {awards.map((award) => (
          <div className="award-item" key={award}>{award}</div>
        ))}
      </div>
    </div>

    <div style={{ marginTop: 60, textAlign: 'center' }}>
      <Link className="btn primary" to="/recruiting/process">Ready to Join?</Link>
    </div>
  </div>
);

const ActivityDetail = () => {
  const { id } = useParams();
  const activity = activities.find((a) => a.id === id);

  if (!activity) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h2 className="section-title">Activity Not Found</h2>
        <p className="section-sub">찾으시는 팀이 존재하지 않습니다.</p>
        <div style={{ marginTop: 32, display: 'flex', gap: 16, justifyContent: 'center' }}>
          <Link className="btn" to="/activities">Back to Activities</Link>
          <Link className="btn primary" to="/">Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '100px 0' }}>
      <div className="section-head">
        <div className="pill">{activity.tag}</div>
        <h2 className="section-title">{activity.title}</h2>
        <p className="section-sub">{activity.summary}</p>
      </div>

      <div className="detail-section">
        <h3>Overview</h3>
        <p>{activity.description}</p>

        <h3 style={{ marginTop: 32 }}>What You'll Do</h3>
        <ul>
          {activity.bullets.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: 48, display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link className="btn primary" to="/recruiting/process">Apply for This Track</Link>
        <Link className="btn" to="/activities">View All Tracks</Link>
      </div>
    </div>
  );
};

const RecruitingPage = ({ mode }) => {
  const tab = recruitingTabs[mode] || recruitingTabs.process;
  return (
    <div className="container" style={{ padding: '100px 0' }}>
      <div className="section-head">
        <h2 className="section-title">Recruiting</h2>
        <p className="section-sub">
          배우고, 기여하고, 성장할 준비가 된 열정적인 사람을 찾습니다. 우리의 프로세스는 완성도가 아닌 잠재력을 발굴하도록 설계되었습니다.
        </p>
      </div>

      <div className="recruiting-options">
        <Link className={`option-btn ${mode === 'process' ? 'active' : ''}`} to="/recruiting/process">
          <div className="option-title">Process</div>
          <div className="option-desc">지원 단계 및 타임라인 개요</div>
        </Link>
        <Link className={`option-btn ${mode === 'apply' ? 'active' : ''}`} to="/recruiting/apply">
          <div className="option-title">How to Apply</div>
          <div className="option-desc">제출 가이드라인 및 플랫폼 세부정보</div>
        </Link>
      </div>

      <div className="detail-section">
        <h3>{tab.title}</h3>
        <ul>
          {tab.body.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>

      {mode === 'apply' && (
        <div className="cta-section">
          <h3>Ready to Start Your Journey?</h3>
          <p>지원서 양식을 다운로드하여 공식 플랫폼을 통해 제출하세요. 최신 업데이트 및 마감일은 블로그와 네이버 카페를 확인하세요.</p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a className="btn primary" href="https://cafe.naver.com/f-e/cafes/28919085/menus/1?viewType=L" target="_blank" rel="noreferrer">
              Visit Application Portal
            </a>
            <Link className="btn" to="/recruiting/process">View Process</Link>
          </div>
        </div>
      )}

      <div style={{ marginTop: 48, textAlign: 'center' }}>
        <Link className="btn" to="/">Back to Home</Link>
      </div>
    </div>
  );
};

const App = () => (
  <BrowserRouter>
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
