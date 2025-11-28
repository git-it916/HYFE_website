import React, { useEffect, useState } from 'react';
import './App.css';

// Use same-origin API by default; set VITE_API_BASE for hosted API domains.
const API_BASE = import.meta.env.VITE_API_BASE || '';

const fallbackData = {
  currentBatch: 38,
  historyBatches: [37, 36, 35],
  teams: [
    {
      name: 'Quant',
      focus: 'Systematic strategies, backtesting, and execution research.',
      tags: ['Python', 'Data', 'Automation'],
      pdfCoverUrl: 'https://via.placeholder.com/400x565.png/0A2351/FFFFFF?text=Quant+Activities',
    },
    {
      name: 'IB',
      focus: 'Deal screening, valuation frameworks, and capital advisory.',
      tags: ['Pitch', 'Valuation', 'Diligence'],
      pdfCoverUrl: 'https://via.placeholder.com/400x565.png/0A2351/FFFFFF?text=IB+Activities',
    },
    {
      name: 'Research',
      focus: 'Macro signals, sector coverage, and risk narratives.',
      tags: ['Insight', 'Macro', 'Reports'],
      pdfCoverUrl: 'https://via.placeholder.com/400x565.png/0A2351/FFFFFF?text=Research+Activities',
    },
    {
      name: 'Derivative',
      focus: 'Options, structured notes, and volatility diagnostics.',
      tags: ['Pricing', 'Greeks', 'Vol'],
      pdfCoverUrl: 'https://via.placeholder.com/400x565.png/0A2351/FFFFFF?text=Derivative+Activities',
    },
  ],
};

async function apiFetch(path, options = {}, token) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json();
}

function TeamCard({ team, showEdit, onClick }) {
  return (
    <div className="team-card" onClick={onClick}>
      {showEdit && <span className="edit-chip">Edit</span>}
      <p className="team-name">{team.name}</p>
      <p className="team-focus">{team.focus}</p>
      <div className="tag-row">
        {team.tags.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function TeamModal({ team, onClose }) {
  if (!team) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="modal-header">
          <p className="modal-kicker">{team.name} Team</p>
          <h3 className="modal-title">Activity Archive</h3>
        </div>
        <div className="modal-body">
          <p className="pdf-label">PDF Cover Preview</p>
          <img src={team.pdfCoverUrl} alt={`${team.name} PDF Cover`} className="pdf-cover-image" />
        </div>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null); // { token, role }
  const [email, setEmail] = useState('admin@hyfe.local');
  const [password, setPassword] = useState('pass123');
  const [authError, setAuthError] = useState('');
  const [saving, setSaving] = useState(false);

  const [appData, setAppData] = useState(fallbackData);
  const [expandedBatch, setExpandedBatch] = useState(37);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await apiFetch('/api/teams');
        setAppData(data);
        if (data.historyBatches?.length) {
          setExpandedBatch(data.historyBatches[0]);
        }
      } catch (err) {
        console.warn('Falling back to bundled data:', err.message);
      }
    })();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      const data = await apiFetch(
        '/api/auth/login',
        { method: 'POST', body: JSON.stringify({ email, password }) },
      );
      setUser({ token: data.token, role: data.role });
    } catch (err) {
      setAuthError('로그인 실패: 이메일/비밀번호를 확인하세요.');
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  const saveAppData = async (nextData) => {
    setAppData(nextData);
    if (!user?.token) return;
    setSaving(true);
    try {
      await apiFetch('/api/teams', { method: 'POST', body: JSON.stringify(nextData) }, user.token);
    } catch (err) {
      setAuthError(`데이터 저장 실패: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const archiveCurrentBatch = () => {
    if (!user?.token) {
      setAuthError('관리자 로그인이 필요합니다.');
      return;
    }
    setAuthError('');
    const nextData = {
      ...appData,
      historyBatches: [appData.currentBatch, ...(appData.historyBatches || [])],
      currentBatch: appData.currentBatch + 1,
    };
    setExpandedBatch(appData.currentBatch);
    saveAppData(nextData);
  };

  const toggleAccordion = (batch) => {
    setExpandedBatch((prev) => (prev === batch ? null : batch));
  };
  
  const handleTeamClick = (team) => setSelectedTeam(team);
  const handleCloseModal = () => setSelectedTeam(null);

  const teams = appData?.teams || [];
  const currentBatch = appData?.currentBatch;
  const historyBatches = appData?.historyBatches || [];

  return (
    <div className="page">
      {selectedTeam && <TeamModal team={selectedTeam} onClose={handleCloseModal} />}

      <header className="top-bar">
        {/* ... existing header code ... */}
        <div className="brand">
          <div className="brand-mark">H</div>
          <div className="brand-copy">
            <p className="brand-kicker">Hanyang Finance & Economics</p>
            <h1>HYFE</h1>
          </div>
        </div>
        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#teams">Teams</a>
          <a href="#history">History</a>
        </nav>
        <div className="actions auth">
          {user?.role === 'admin' && <span className="badge">Admin mode</span>}
          {saving && <span className="saving-hint">Saving...</span>}
          {!user ? (
            <form className="auth-form" onSubmit={handleLogin}>
              <input
                className="auth-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@hyfe.local"
                required
              />
              <input
                className="auth-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                required
              />
              <button className="ghost-button" type="submit">Login</button>
            </form>
          ) : (
            <button className="ghost-button" onClick={handleLogout}>Logout</button>
          )}
        </div>
      </header>
      {authError && <p className="auth-error">{authError}</p>}

      <main className="app-shell">
        <section className="hero" id="about">
          {/* ... existing hero code ... */}
          <div className="hero-text">
            <span className="eyebrow">Student finance studio</span>
            <h2>
              Building the next wave of
              <span className="highlight"> market thinkers</span>
            </h2>
            <p className="lede">
              HYFE blends research, technology, and capital markets training. Cohorts learn by shipping real projects,
              then capturing experiments, outcomes, and playbooks for the next batch.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#teams">
                View {currentBatch}th teams
              </a>
              <a className="secondary-button" href="#history">
                See alumni trajectory
              </a>
            </div>
            <div className="hero-meta">
              <div className="stat-card">
                <p className="label">Active projects</p>
                <p className="stat">18</p>
                <span className="hint">Research, markets, and tech sprints</span>
              </div>
              <div className="stat-card">
                <p className="label">Mentor network</p>
                <p className="stat">12</p>
                <span className="hint">IB, quant, and venture alumni</span>
              </div>
              <div className="stat-card">
                <p className="label">Tooling stack</p>
                <p className="stat">Fast, transparent</p>
                <span className="hint">Shared dashboards and weekly reviews</span>
              </div>
            </div>
          </div>
          <div className="hero-panel">
            <div className="panel-label">Now running</div>
            <div className="panel-body">
              <p className="panel-title">{currentBatch}th Batch</p>
              <p className="panel-text">
                Four specialist teams drive this cohort. Track deliverables, review milestones, and capture the next
                lessons learned for the archive.
              </p>
              <div className="panel-list">
                {teams.map((team) => (
                  <div className="panel-list-item" key={team.name}>
                    <div className="dot" />
                    <div>
                      <p className="panel-item-title">{team.name}</p>
                      <p className="panel-item-text">{team.focus}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="panel" id="teams">
          <div className="panel-header">
            <div className="eyebrow">Current cohort</div>
            <div className="panel-title-row">
              <h3>{currentBatch}th Teams</h3>
              {user?.role === 'admin' && (
                <button className="primary-button small" onClick={archiveCurrentBatch}>
                  Archive this batch
                </button>
              )}
            </div>
            <p className="panel-description">
              Real-world mandates with weekly review cadences. Teams keep their playbooks visible to the next class.
            </p>
          </div>
          <div className="team-grid">
            {teams.map((team) => (
              <TeamCard key={team.name} team={team} showEdit={user?.role === 'admin'} onClick={() => handleTeamClick(team)} />
            ))}
          </div>
        </section>

        <section className="panel" id="history">
          <div className="panel-header">
            {/* ... existing history panel header code ... */}
            <div className="eyebrow">Legacy and learnings</div>
            <h3>History</h3>
            <p className="panel-description">
              Browse prior batches to see what shipped, what broke, and what was learned along the way.
            </p>
          </div>

          <div className="accordion">
            {historyBatches.map((batch) => (
              <div className="accordion-item" key={batch}>
                <button className="accordion-trigger" onClick={() => toggleAccordion(batch)}>
                  {/* ... existing accordion trigger code ... */}
                  <div>
                    <span className="accordion-kicker">Archive</span>
                    <span className="accordion-title">{batch}th Batch</span>
                  </div>
                  <span className={`chevron ${expandedBatch === batch ? 'open' : ''}`}>
                    <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true" focusable="false">
                      <path d="M2 3.25L9 9l7-5.75" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                {expandedBatch === batch && (
                  <div className="accordion-panel">
                    <div className="team-grid tight">
                      {teams.map((team) => (
                        <TeamCard
                          key={`${batch}-${team.name}`}
                          team={team}
                          showEdit={false}
                          onClick={() => handleTeamClick(team)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
