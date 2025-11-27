import React, { useState } from 'react';
import './App.css';

const teams = [
  {
    name: 'Quant',
    focus: 'Systematic strategies, backtesting, and execution research.',
    tags: ['Python', 'Data', 'Automation'],
  },
  {
    name: 'IB',
    focus: 'Deal screening, valuation frameworks, and capital advisory.',
    tags: ['Pitch', 'Valuation', 'Diligence'],
  },
  {
    name: 'Research',
    focus: 'Macro signals, sector coverage, and risk narratives.',
    tags: ['Insight', 'Macro', 'Reports'],
  },
  {
    name: 'Derivative',
    focus: 'Options, structured notes, and volatility diagnostics.',
    tags: ['Pricing', 'Greeks', 'Vol'],
  },
];

function TeamCard({ team, showEdit }) {
  return (
    <div className="team-card">
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentBatch, setCurrentBatch] = useState(38);
  const [historyBatches, setHistoryBatches] = useState([37, 36, 35]);
  const [expandedBatch, setExpandedBatch] = useState(37);

  const toggleLogin = () => setIsLoggedIn((prev) => !prev);

  const archiveCurrentBatch = () => {
    setHistoryBatches((prev) => [currentBatch, ...prev]);
    setCurrentBatch((prev) => prev + 1);
    setExpandedBatch(currentBatch);
  };

  const toggleAccordion = (batch) => {
    setExpandedBatch((prev) => (prev === batch ? null : batch));
  };

  return (
    <div className="page">
      <header className="top-bar">
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
        <div className="actions">
          {isLoggedIn && <span className="badge">Admin mode</span>}
          <button className="ghost-button" onClick={toggleLogin}>
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
        </div>
      </header>

      <main className="app-shell">
        <section className="hero" id="about">
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
              {isLoggedIn && (
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
              <TeamCard key={team.name} team={team} showEdit={isLoggedIn} />
            ))}
          </div>
        </section>

        <section className="panel" id="history">
          <div className="panel-header">
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
                        <TeamCard key={`${batch}-${team.name}`} team={team} showEdit={false} />
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
