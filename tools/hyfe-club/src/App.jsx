import React from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';

const activities = [
  {
    id: 'quant',
    title: 'Quant Lab',
    summary: 'Strategy research, backtesting, and portfolio construction with a focus on market microstructure.',
    bullets: [
      'Idea scouting, signal design, and factor sanity checks',
      'Python backtests with basic risk/turnover controls',
      'Portfolio construction experiments and teardown sessions',
    ],
  },
  {
    id: 'ib',
    title: 'IB & Valuation',
    summary: 'Comparable analyses, DCF practice, and deal process simulations (IPO, M&A).',
    bullets: [
      'Trading comps / transaction comps drills',
      'Light DCF builds and sensitivity tables',
      'Mini pitchbook or IM sprints that mirror deal flow',
    ],
  },
  {
    id: 'research',
    title: 'Research',
    summary: 'Top-down thematics, company deep-dives, and concise investment memos.',
    bullets: [
      'Macro → sector → company frameworks',
      'One-pagers and 5-minute pitch formats',
      'Peer review to sharpen theses and risks',
    ],
  },
  {
    id: 'derivatives',
    title: 'Derivatives',
    summary: 'Macro framing, options and swaps pricing drills, and scenario playbooks.',
    bullets: [
      'Surface reading, term structure, and simple greeks labs',
      'Case-based hedging examples and payoff sketches',
      'Playbooks for different macro/vol regimes',
    ],
  },
];

const recruitingTabs = {
  timeline: {
    title: 'Timeline',
    body: [
      'Applications open soon.',
      'Short case + conversation with current members.',
      'Onboarding sprint with a mini project inside your track.',
    ],
  },
  apply: {
    title: 'Apply',
    body: [
      'Pick one track you want to grow in.',
      'Share a brief: why HYFE, what you want to build or learn.',
      'If you have a project, include a link (github, slides, doc).',
    ],
  },
};

const useScrollToHash = () => {
  const { hash } = useLocation();
  React.useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash]);
};

const Layout = ({ children }) => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+KR:wght@400;500;700&display=swap');

      :root {
        --bg: #e8f3ff;
        --ink: #0f172a;
        --muted: #4b5563;
        --accent: #1d4ed8;
        --card: rgba(255, 255, 255, 0.82);
        --border: rgba(15, 23, 42, 0.08);
      }

      html { scroll-behavior: smooth; }
      html, body, #root { height: 100%; margin: 0; }

      body {
        font-family: 'Inter', 'Noto Sans KR', system-ui, -apple-system, sans-serif;
        background: var(--bg);
        color: var(--ink);
      }

      a { color: inherit; text-decoration: none; }

      .page {
        min-height: 100vh;
        background: radial-gradient(circle at 20% 20%, rgba(255,255,255,0.7), transparent 35%),
                    radial-gradient(circle at 80% 0%, rgba(255,255,255,0.55), transparent 32%),
                    var(--bg);
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
        z-index: 10;
        background: rgba(232, 243, 255, 0.4);
        backdrop-filter: blur(12px);
        border-bottom: 1px solid var(--border);
      }

      .nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 18px 0;
      }

      .logo {
        font-weight: 700;
        letter-spacing: 0.02em;
      }

      nav ul {
        display: flex;
        align-items: center;
        gap: 20px;
        list-style: none;
        margin: 0;
        padding: 0;
        font-weight: 500;
      }

      nav a {
        padding: 8px 10px;
        border-radius: 999px;
        transition: 150ms ease;
        color: var(--ink);
      }

      nav a:hover {
        opacity: 0.7;
        text-decoration: underline;
        text-decoration-thickness: 2px;
      }

      main { padding-top: 86px; }

      .hero {
        min-height: calc(100vh - 86px);
        display: grid;
        place-items: center;
        position: relative;
        text-align: center;
        padding: 80px 0 100px;
        overflow: hidden;
      }

      .hero::before,
      .hero::after {
        content: '';
        position: absolute;
        border-radius: 50%;
        filter: blur(60px);
        opacity: 0.6;
        z-index: 0;
      }

      .hero::before {
        width: 340px; height: 340px;
        background: #c7e1ff;
        top: 12%; left: 14%;
      }

      .hero::after {
        width: 420px; height: 420px;
        background: #dcecff;
        bottom: -6%; right: 18%;
      }

      .hero-content {
        position: relative;
        z-index: 1;
        max-width: 760px;
        margin: 0 auto;
        display: grid;
        gap: 24px;
      }

      .eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 8px 14px;
        border-radius: 999px;
        background: var(--card);
        border: 1px solid var(--border);
        font-size: 14px;
        color: var(--muted);
        box-shadow: 0 10px 30px rgba(0,0,0,0.05);
      }

      .title {
        font-size: clamp(42px, 6vw, 64px);
        line-height: 1.05;
        margin: 0;
        letter-spacing: -0.02em;
      }

      .subtitle {
        font-size: 18px;
        color: var(--muted);
        margin: 0 auto;
        max-width: 640px;
        line-height: 1.5;
      }

      .hero-actions {
        display: flex;
        justify-content: center;
        gap: 14px;
        flex-wrap: wrap;
      }

      .btn {
        padding: 12px 22px;
        border-radius: 999px;
        border: 1.8px solid var(--ink);
        background: transparent;
        color: var(--ink);
        font-weight: 600;
        cursor: pointer;
        transition: 160ms ease;
        font-size: 15px;
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
      }

      .btn:hover { transform: translateY(-2px); opacity: 0.92; }

      section { padding: 80px 0; }

      .section-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
        margin-bottom: 28px;
        flex-wrap: wrap;
      }

      .section-title {
        margin: 0;
        font-size: 28px;
        letter-spacing: -0.01em;
      }

      .section-sub {
        color: var(--muted);
        margin: 6px 0 0;
        max-width: 520px;
        line-height: 1.5;
      }

      .card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 16px;
      }

      .card {
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 18px;
        padding: 18px 20px;
        box-shadow: 0 20px 50px rgba(0,0,0,0.04);
      }

      button.card, a.card {
        border: none;
        width: 100%;
        text-align: left;
        color: inherit;
        cursor: pointer;
      }

      .card h4 {
        margin: 0 0 8px;
        font-size: 18px;
      }

      .card p {
        margin: 0;
        color: var(--muted);
        line-height: 1.5;
        font-size: 15px;
      }

      .pill {
        display: inline-flex;
        align-items: center;
        padding: 6px 12px;
        border-radius: 999px;
        background: rgba(29, 78, 216, 0.08);
        color: #1d4ed8;
        font-weight: 600;
        font-size: 13px;
        margin-bottom: 14px;
      }

      .people-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 16px;
      }

      .person {
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 16px;
        padding: 16px;
        display: grid;
        gap: 8px;
      }

      .person strong { font-size: 16px; }
      .person span { color: var(--muted); font-size: 14px; }

      footer {
        padding: 40px 0 60px;
        text-align: center;
        color: var(--muted);
        font-size: 14px;
      }

      @media (max-width: 900px) {
        .nav { padding: 14px 0; }
        nav ul { gap: 14px; }
        .section-head { align-items: flex-start; }
      }

      @media (max-width: 640px) {
        .nav { flex-direction: column; align-items: flex-start; gap: 10px; }
        nav ul { width: 100%; justify-content: space-between; }
        .hero { padding: 70px 0 90px; }
        section { padding: 64px 0; }
      }

      .detail-card {
        margin-top: 18px;
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 18px;
        padding: 18px 20px;
        box-shadow: 0 20px 50px rgba(0,0,0,0.04);
      }

      .detail-card ul {
        margin: 12px 0 0;
        padding-left: 18px;
        color: var(--muted);
        line-height: 1.6;
      }

      .option-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 14px;
        margin-top: 12px;
      }

      .option-btn {
        padding: 18px 20px;
        border-radius: 16px;
        border: 1.5px solid var(--border);
        background: var(--card);
        color: var(--ink);
        text-align: left;
        cursor: pointer;
        box-shadow: 0 14px 38px rgba(0,0,0,0.06);
        transition: 140ms ease;
        display: block;
      }

      .option-btn:hover { transform: translateY(-3px); }

      .option-btn.active {
        border-color: var(--ink);
        background: #fff;
        box-shadow: 0 18px 46px rgba(0,0,0,0.08);
      }

      .option-title {
        font-weight: 700;
        font-size: 18px;
        margin-bottom: 6px;
      }

      .option-desc {
        color: var(--muted);
        font-size: 15px;
        line-height: 1.5;
      }
    `}</style>

    <div className="page">
      <header>
        <div className="container nav">
          <Link to="/" className="logo">HYFE</Link>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><a href="/#about">About us</a></li>
              <li><Link to="/activities">Activities</Link></li>
              <li><a href="/#people">People</a></li>
              <li><Link to="/recruiting/timeline">Recruiting</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer>
        <div className="container">
          HYFE (HanYang Financial Engineering) — built by students who learn by doing.
        </div>
      </footer>
    </div>
  </>
);

const LandingPage = () => {
  useScrollToHash();
  return (
    <>
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="eyebrow">HanYang Financial Engineering</div>
          <h1 className="title">HanYang Financial Engineering</h1>
          <p className="subtitle">
            Your gateway to quantitative finance, investment banking, research, and derivatives — built by students who want to learn by doing.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#about">Who we are</a>
            <Link className="btn" to="/recruiting/timeline">25-1 Recruiting</Link>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="section-title">About us</h2>
              <p className="section-sub">
                HYFE is the student-led HanYang Financial Engineering club focused on rigorous practice, real market insight, and collaborative research.
              </p>
            </div>
            <span className="pill">Quant · IB · Research · Derivatives</span>
          </div>
          <div className="card-grid">
            <div className="card">
              <h4>Hands-on learning</h4>
              <p>We learn by building models, pitching ideas, and stress-testing strategies together.</p>
            </div>
            <div className="card">
              <h4>Team-first culture</h4>
              <p>Small squads own projects end-to-end with mentoring from senior members and alumni.</p>
            </div>
            <div className="card">
              <h4>Practical outcomes</h4>
              <p>Reports, backtests, pitchbooks, and research briefs that mirror real-world work.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="activities">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="section-title">Activities</h2>
              <p className="section-sub">
                Weekly sessions combine theory with deliverables — from idea scouting to presentation decks.
              </p>
            </div>
          </div>
          <div className="card-grid">
            {activities.map((item) => (
              <Link key={item.id} to={`/activities/${item.id}`} className="card" aria-label={`${item.title} details`}>
                <h4>{item.title}</h4>
                <p>{item.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="people">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="section-title">People</h2>
              <p className="section-sub">
                A mix of finance, engineering, and data enthusiasts who enjoy building together.
              </p>
            </div>
          </div>
          <div className="people-grid">
            <div className="person">
              <strong>Leads</strong>
              <span>Guide strategy, set curriculum, and support project delivery.</span>
            </div>
            <div className="person">
              <strong>Analysts</strong>
              <span>Drive research, modeling, and presentations inside each track.</span>
            </div>
            <div className="person">
              <strong>New members</strong>
              <span>Learn the basics, contribute to live projects, and ship early work.</span>
            </div>
          </div>
        </div>
      </section>

      <section id="recruiting">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="section-title">25-1 Recruiting</h2>
              <p className="section-sub">
                We look for curious builders ready to learn fast. Light prep, clear expectations, and a team that cares.
              </p>
            </div>
            <a className="btn primary" href="#home">Back to top</a>
          </div>
          <div className="option-grid">
            <Link to="/recruiting/timeline" className="option-btn">
              <div className="option-title">Timeline</div>
              <div className="option-desc">Key dates, short case, and onboarding steps.</div>
            </Link>
            <Link to="/recruiting/apply" className="option-btn">
              <div className="option-title">Apply</div>
              <div className="option-desc">What to submit and where to send it.</div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

const ActivitiesIndex = () => (
  <div className="container">
    <div className="section-head" style={{ marginTop: 32 }}>
      <div>
        <h2 className="section-title">Activities</h2>
        <p className="section-sub">Choose a track to see what we do inside each team.</p>
      </div>
      <Link className="btn" to="/">Back home</Link>
    </div>
    <div className="card-grid">
      {activities.map((item) => (
        <Link key={item.id} to={`/activities/${item.id}`} className="card" aria-label={`${item.title} details`}>
          <h4>{item.title}</h4>
          <p>{item.summary}</p>
        </Link>
      ))}
    </div>
  </div>
);

const ActivityDetail = () => {
  const { id } = useParams();
  const activity = activities.find((a) => a.id === id);

  if (!activity) {
    return (
      <div className="container" style={{ padding: '80px 0' }}>
        <h2 className="section-title">Not found</h2>
        <p className="section-sub">The activity you’re looking for does not exist.</p>
        <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
          <Link className="btn" to="/activities">Back to Activities</Link>
          <Link className="btn primary" to="/">Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '80px 0' }}>
      <div className="section-head" style={{ marginBottom: 16 }}>
        <div>
          <h2 className="section-title">{activity.title}</h2>
          <p className="section-sub">{activity.summary}</p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link className="btn" to="/activities">Back to Activities</Link>
          <Link className="btn primary" to="/">Home</Link>
        </div>
      </div>
      <div className="detail-card">
        <ul>
          {activity.bullets.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const RecruitingPage = ({ mode }) => {
  const tab = recruitingTabs[mode] || recruitingTabs.timeline;
  return (
    <div className="container" style={{ padding: '80px 0' }}>
      <div className="section-head" style={{ marginBottom: 16 }}>
        <div>
          <h2 className="section-title">25-1 Recruiting — {tab.title}</h2>
          <p className="section-sub">
            We look for curious builders ready to learn fast. Light prep, clear expectations, and a team that cares.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link className={`option-btn ${mode === 'timeline' ? 'active' : ''}`} to="/recruiting/timeline">
            <div className="option-title">Timeline</div>
            <div className="option-desc">Key dates and onboarding steps.</div>
          </Link>
          <Link className={`option-btn ${mode === 'apply' ? 'active' : ''}`} to="/recruiting/apply">
            <div className="option-title">Apply</div>
            <div className="option-desc">What to submit and where to send it.</div>
          </Link>
          <Link className="btn primary" to="/">Home</Link>
        </div>
      </div>
      <div className="detail-card">
        <ul>
          {tab.body.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        {mode === 'apply' && (
          <div style={{ marginTop: 14, display: 'inline-flex', gap: 12, flexWrap: 'wrap' }}>
            <a className="btn primary" href="https://example.com/apply" target="_blank" rel="noreferrer">
              Go to application
            </a>
            <Link className="btn" to="/recruiting/timeline">See timeline</Link>
          </div>
        )}
      </div>
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/activities" element={<ActivitiesIndex />} />
        <Route path="/activities/:id" element={<ActivityDetail />} />
        <Route path="/recruiting/timeline" element={<RecruitingPage mode="timeline" />} />
        <Route path="/recruiting/apply" element={<RecruitingPage mode="apply" />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default App;
