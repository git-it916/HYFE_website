import React from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

const activities = [
  {
    id: 'ibd',
    title: 'IBD Team',
    tag: 'Investment Banking',
    summary: 'Master deal execution through industry analysis, valuation modeling, and pitchbook creation.',
    description: 'Through in-depth industry and company analysis, we identify core investment themes and master valuation techniques including Trading Comps and DCF. Members gain hands-on experience crafting IPO Pitch Books and M&A Information Memorandums, building a comprehensive understanding of the entire deal process.',
    bullets: [
      'Industry & company deep-dive analysis to extract key investment points',
      'Trading Comps and DCF-based valuation methodology',
      'IPO Pitch Book and M&A IM preparation and presentation',
      'End-to-end deal process simulation and execution'
    ],
  },
  {
    id: 'research',
    title: 'Research Team',
    tag: 'Equity Research',
    summary: 'Develop conviction through top-down analysis, sector screening, and rigorous valuation frameworks.',
    description: 'Employing a top-down approach, we build comprehensive sector understanding to uncover top-pick opportunities. Members craft compelling investment theses supported by both relative and absolute valuation methods, culminating in defensible price targets and actionable recommendations.',
    bullets: [
      'Top-down framework: macro → sector → company stock selection',
      'Investment thesis development with clear risk/reward assessment',
      'Relative and absolute valuation techniques (Comps, DCF, DDM)',
      'Target price derivation with sensitivity analysis and peer benchmarking'
    ],
  },
  {
    id: 'quant',
    title: 'Quant Team',
    tag: 'Quantitative Finance',
    summary: 'Build systematic strategies through algorithmic alpha discovery and portfolio optimization.',
    description: 'Operating across two specialized tracks—Algorithmic Quant and Portfolio Quant—we explore market microstructure for alpha generation and apply modern portfolio theory for strategy construction. Members gain practical experience in signal research, backtesting, and risk management.',
    bullets: [
      'Algorithmic Quant: Market microstructure analysis and alpha signal discovery',
      'Portfolio Quant: Portfolio optimization and systematic strategy construction',
      'Python-based backtesting with risk and turnover controls',
      'Factor research, signal validation, and performance attribution'
    ],
  },
  {
    id: 'derivatives',
    title: 'Derivatives Team',
    tag: 'Fixed Income & Derivatives',
    summary: 'Navigate macro regimes and derivative pricing through policy analysis and structured products.',
    description: 'Building from macro analysis of economic indicators and monetary policy, we develop expertise in swaps, options, and futures pricing. Members apply theoretical frameworks to real market data, sharpening their ability to structure and hedge complex derivative positions.',
    bullets: [
      'Macro analysis: interpreting economic data, interest rates, and central bank policy',
      'Derivatives fundamentals: swaps, options, futures pricing and greeks',
      'Real-world application: pricing models with live market data',
      'Scenario analysis and hedging strategies across volatility regimes'
    ],
  },
];

const curriculumStages = [
  {
    level: 'Lv.1',
    title: 'Education',
    description: 'Core concepts, industry frameworks, and foundational tools through lectures and readings.'
  },
  {
    level: 'Lv.2',
    title: 'Practice',
    description: 'Hands-on drills with real data: valuation models, backtests, macro analysis, and pitch formats.'
  },
  {
    level: 'Lv.3',
    title: 'Project',
    description: 'Team-driven deliverables mirroring real-world work: research reports, pitchbooks, and strategy teardowns.'
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
    description: 'We value curiosity and the drive to learn far more than prior knowledge or resume credentials.'
  },
  {
    title: 'Ownership mindset',
    description: 'Take initiative, see projects through, and hold yourself accountable to the team and deliverables.'
  },
  {
    title: 'Collaborative spirit',
    description: 'We grow together through peer review, mentorship, and open knowledge sharing.'
  },
  {
    title: 'Diverse backgrounds welcome',
    description: 'Whether you study business, engineering, mathematics, or humanities—your perspective adds value.'
  },
];

const recruitingTabs = {
  process: {
    title: 'Process',
    body: [
      '1. Application Review — Submit your motivation, preferred track, and any prior work (optional).',
      '2. Interview Rounds — Conducted concurrently: behavioral fit and foundational knowledge assessment.',
      '3. Onboarding — Join your track, meet your team, and kick off your first project sprint.',
    ],
  },
  apply: {
    title: 'How to Apply',
    body: [
      'Download the application form from our official blog or Naver Cafe.',
      'Submit your completed form via email as instructed on the platform.',
      'For the latest deadlines and announcements, check our official community pages regularly.',
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
        line-height: 1;
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
        <div className="eyebrow">Est. 2007 • 400+ Alumni Network</div>
        <h1 className="title">Where Ambition Meets Expertise</h1>
        <p className="subtitle">
          HYFE is the premier student-led finance society at Hanyang University, cultivating the next generation of finance professionals through rigorous training, real-world projects, and an unparalleled alumni network.
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
            More than a finance club—HYFE is a launchpad for your career. From IBD to quant research, we equip you with the skills and network to excel.
          </p>
        </div>
        <div className="card-grid">
          <div className="card">
            <h4>400+ Alumni Strong</h4>
            <p>Our graduates lead teams at top-tier investment banks, asset managers, and hedge funds across the globe. Join a network that opens doors.</p>
          </div>
          <div className="card">
            <h4>Real-World Training</h4>
            <p>From DCF models to algorithmic trading strategies, we don't just teach theory—we build the skills that matter in finance.</p>
          </div>
          <div className="card">
            <h4>Proven Track Record</h4>
            <p>CFA Research Challenge finalists, WorldQuant IQC winners, and countless placements at bulge bracket firms.</p>
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
        Established in 2007, HYFE has evolved from a derivatives study group into Korea's leading student-run finance society, spanning IBD, research, quant, and derivatives.
      </p>
      <div className="pill">IBD • Research • Quant • Derivatives</div>
    </div>

    <div className="detail-section">
      <h3>Our Legacy</h3>
      <p>
        Founded in 2007 with a focus on financial engineering and derivatives, HYFE has grown into a comprehensive finance society covering investment banking, equity research, quantitative strategies, and structured products. Today, we are recognized as one of the most rigorous and well-connected finance clubs in Korea.
      </p>

      <h3 style={{ marginTop: 40 }}>Mission & Vision</h3>
      <p>
        Our mission is simple: to bridge the gap between academic theory and industry practice. We provide a structured curriculum, mentorship from seasoned alumni, and hands-on projects that mirror the work done at leading financial institutions. Our vision is to cultivate a community where passion, expertise, and collaboration drive success.
      </p>

      <h3 style={{ marginTop: 40 }}>Unmatched Network</h3>
      <p>
        With over 400 alumni working at global investment banks, asset management firms, hedge funds, and law schools, HYFE offers an unparalleled network. Through homecoming events, one-on-one mentoring, and industry panels, our members gain direct access to professionals who have walked the same path.
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
        At HYFE, we don't hire resumes—we seek individuals with curiosity, grit, and a genuine passion for finance. Whether you're from business, engineering, mathematics, or the humanities, if you're ready to learn and contribute, you belong here.
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
        HYFE thrives on a culture of mentorship and mutual growth. Senior members guide juniors through complex projects, alumni share industry insights, and everyone contributes to a collaborative environment. We believe that the best learning happens when knowledge is shared freely and ambitions are supported collectively.
      </p>
      <p style={{ marginTop: 20 }}>
        <strong>No prior finance experience required.</strong> Our curriculum is designed to take you from foundational concepts to advanced applications. All we ask is that you bring dedication, curiosity, and a willingness to push your limits.
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
        Each track follows a structured three-stage curriculum: Education → Practice → Project. From foundational concepts to industry-grade deliverables, you'll build skills that matter.
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
          Dive deep into your area of interest. Each team combines rigorous training with real-world applications.
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
          Our members consistently excel in top-tier finance competitions, earning recognition on national and global stages.
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
        <p className="section-sub">The team you're looking for does not exist.</p>
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
          We seek passionate individuals ready to learn, contribute, and grow. Our process is designed to identify potential, not polish.
        </p>
      </div>

      <div className="recruiting-options">
        <Link className={`option-btn ${mode === 'process' ? 'active' : ''}`} to="/recruiting/process">
          <div className="option-title">Process</div>
          <div className="option-desc">Application steps and timeline overview.</div>
        </Link>
        <Link className={`option-btn ${mode === 'apply' ? 'active' : ''}`} to="/recruiting/apply">
          <div className="option-title">How to Apply</div>
          <div className="option-desc">Submission guidelines and platform details.</div>
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
          <p>Download the application form and submit it via the official platform. Check our blog and Naver Cafe for the latest updates and deadlines.</p>
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
