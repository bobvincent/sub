<<<<<<< HEAD
import React, { useMemo, useState } from 'react';
=======
import React, { useEffect, useMemo, useState } from 'react';
>>>>>>> 2b6d99e (Big initial push)
import SuggestionCard from './components/SuggestionCard';
import { buildRecommendations, defaultPillars, templateStandup } from './logic';

const fields = [
  {
    key: 'yesterday',
    label: 'What did you work on yesterday?',
    helper: 'Highlight outcomes, progress toward goals, and collaboration touchpoints.',
  },
  {
    key: 'today',
    label: 'What are you planning to work on today?',
    helper: 'Call out top priorities, expected outcomes, and who you plan to coordinate with.',
  },
  {
    key: 'blockers',
    label: 'Any blockers or issues?',
    helper: 'Be concise, name owners if relevant, and share your next step or ask.',
  },
];

function App() {
  const [inputs, setInputs] = useState({
    yesterday: '',
    today: '',
    blockers: '',
  });
<<<<<<< HEAD

  const recommendations = useMemo(() => buildRecommendations(inputs), [inputs]);
  const managerView = useMemo(() => templateStandup(inputs), [inputs]);

  return (
    <main>
      <header className="app-header">
        <div className="title-group">
          <span className="badge">Standup Coach</span>
          <div>
            <h1>Be concise, collaborative, and ready.</h1>
            <p className="subtitle">
              Craft standups that make you look prepared, outcome-oriented, proactive, and respectful.
            </p>
          </div>
        </div>
        <div className="pill-row">
          {defaultPillars.map((pill) => (
            <span key={pill} className="pill">
              {pill}
            </span>
          ))}
        </div>
      </header>

      <section className="grid">
        <div className="card">
          <h2>Share your update</h2>
          <p>Fill in each field; suggestions appear live.</p>

          {fields.map(({ key, label, helper }) => (
            <div key={key} className="form-field">
              <label htmlFor={key}>{label}</label>
              <textarea
                id={key}
                value={inputs[key]}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    [key]: e.target.value,
                  }))
                }
                placeholder="Keep it crisp and specific."
              />
              <p className="helper">{helper}</p>
            </div>
          ))}
        </div>

        <SuggestionCard
          title="Yesterday"
          description="Make outcomes and collaboration obvious."
          suggestions={recommendations.yesterday}
          sample={recommendations.samples.yesterday}
        />

        <SuggestionCard
          title="Today"
          description="Show priority, ownership, and communication."
          suggestions={recommendations.today}
          sample={recommendations.samples.today}
        />

        <SuggestionCard
          title="Blockers"
          description="State the issue, impact, and your ask."
          suggestions={recommendations.blockers}
          sample={recommendations.samples.blockers}
        />
      </section>

      <section className="grid" style={{ marginTop: '28px' }}>
        <div className="card output-card">
          <h2>Concise standup summary</h2>
          <div className="output">
            <div>
              <span className="inline-label">Yesterday:</span> {managerView.yesterday}
            </div>
            <div>
              <span className="inline-label">Today:</span> {managerView.today}
            </div>
            <div>
              <span className="inline-label">Blockers:</span> {managerView.blockers}
            </div>
          </div>
          <p className="helper">Share this version with your manager or team.</p>
        </div>
      </section>

      <footer>
        Built for single-developer standups. No data is stored—refresh to clear.
      </footer>
=======
  const [view, setView] = useState('home');
  const [preferences, setPreferences] = useState({
    tone: 'confident',
    autoCopy: false,
    showCoaching: true,
    theme: 'light',
  });

  const recommendations = useMemo(() => buildRecommendations(inputs), [inputs]);
  const managerView = useMemo(() => templateStandup(inputs), [inputs]);
  useEffect(() => {
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(preferences.theme === 'dark' ? 'theme-dark' : 'theme-light');
  }, [preferences.theme]);
  const handleCopy = (text) => {
    if (!text) return;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      return;
    }
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    tempInput.setAttribute('readonly', '');
    tempInput.style.position = 'absolute';
    tempInput.style.left = '-9999px';
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
  };

  return (
    <main>
      <div className="top-bar">
        <div className="top-left">
          <div className="robot-logo goofy-robot" aria-hidden="true">
            <span className="robot-antenna" />
            <span className="robot-eye left" />
            <span className="robot-eye right" />
            <span className="robot-mouth" />
            <span className="robot-cheek left" />
            <span className="robot-cheek right" />
          </div>
          <div className="app-title-group">
            <span className="app-title">StandUpBot</span>
            <span className="app-tagline">Subba Lubba Dub Dub</span>
          </div>
        </div>
        <div className="top-right">
          <span className="org-title">Slacker Software</span>
          <button
            type="button"
            className="top-action"
            onClick={() => setView('preferences')}
            aria-current={view === 'preferences' ? 'page' : undefined}
          >
            Profile
          </button>
          <button type="button" className="top-action">
            Logout
          </button>
        </div>
      </div>
      {view === 'preferences' ? (
        <section className="preferences">
          <div className="preferences-header">
            <div>
              <h1>Profile</h1>
              <p className="subtitle">Tune the tone, coaching, and copy behavior for your updates.</p>
            </div>
            <button type="button" className="top-action" onClick={() => setView('home')}>
              Back to Standup
            </button>
          </div>
          <div className="grid">
            <div className="card">
              <h2>Writing style</h2>
              <label className="select-label" htmlFor="tone">
                Tone
              </label>
              <select
                id="tone"
                value={preferences.tone}
                onChange={(e) => setPreferences((prev) => ({ ...prev, tone: e.target.value }))}
              >
                <option value="confident">Confident</option>
                <option value="tactical">Tactical</option>
                <option value="neutral">Neutral</option>
              </select>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={preferences.showCoaching}
                  onChange={(e) => setPreferences((prev) => ({ ...prev, showCoaching: e.target.checked }))}
                />
                Show coaching tips under each field
              </label>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={preferences.autoCopy}
                  onChange={(e) => setPreferences((prev) => ({ ...prev, autoCopy: e.target.checked }))}
                />
                Auto-copy recommendations after each update
              </label>
            </div>
            <div className="card">
              <h2>Defaults</h2>
              <p className="helper">Preferences are saved locally for this session.</p>
              <button
                type="button"
                className="btn-secondary"
                onClick={() =>
                  setPreferences({
                    tone: 'confident',
                    autoCopy: false,
                    showCoaching: true,
                  })
                }
              >
                Reset to defaults
              </button>
            </div>
            <div className="card">
              <h2>Appearance</h2>
              <p className="helper">Choose a display mode.</p>
              <label className="toggle">
                <input
                  type="radio"
                  name="theme"
                  checked={preferences.theme === 'light'}
                  onChange={() => setPreferences((prev) => ({ ...prev, theme: 'light' }))}
                />
                Light mode
              </label>
              <label className="toggle">
                <input
                  type="radio"
                  name="theme"
                  checked={preferences.theme === 'dark'}
                  onChange={() => setPreferences((prev) => ({ ...prev, theme: 'dark' }))}
                />
                Dark mode
              </label>
            </div>
          </div>
        </section>
      ) : (
        <>
          <header className="app-header">
            <div className="title-group">
              <div>
                <h1>Keep management off your back so you can get some real work done.</h1>
                <p className="subtitle">
                  Craft standups that make you look prepared, outcome-oriented, proactive, and respectful.
                </p>
              </div>
            </div>
            <div className="pill-row">
              {defaultPillars.map((pill) => (
                <span key={pill} className="pill">
                  {pill}
                </span>
              ))}
            </div>
          </header>

          <section className="grid">
            <div className="card">
              <h2>Share your update</h2>
              <p>Fill in each field; suggestions appear live.</p>

              {fields.map(({ key, label, helper }) => (
                <div key={key} className="form-field">
                  <label htmlFor={key}>{label}</label>
                  <textarea
                    id={key}
                    value={inputs[key]}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                    placeholder="Keep it crisp and specific."
                  />
                  <p className="helper">{helper}</p>
                </div>
              ))}
            </div>

            <div className="card">
              <h2>Update recommendations</h2>
              {managerView.yesterday && (
                <div className="form-field">
                  <div className="label-row">
                    <label htmlFor="summary-yesterday">Yesterday</label>
                    <button type="button" className="copy-link" onClick={() => handleCopy(managerView.yesterday)}>
                      Copy
                    </button>
                  </div>
                  <textarea id="summary-yesterday" value={managerView.yesterday} readOnly />
                </div>
              )}
              {managerView.today && (
                <div className="form-field">
                  <div className="label-row">
                    <label htmlFor="summary-today">Today</label>
                    <button type="button" className="copy-link" onClick={() => handleCopy(managerView.today)}>
                      Copy
                    </button>
                  </div>
                  <textarea id="summary-today" value={managerView.today} readOnly />
                </div>
              )}
              {managerView.blockers && (
                <div className="form-field">
                  <div className="label-row">
                    <label htmlFor="summary-blockers">Blockers</label>
                    <button type="button" className="copy-link" onClick={() => handleCopy(managerView.blockers)}>
                      Copy
                    </button>
                  </div>
                  <textarea id="summary-blockers" value={managerView.blockers} readOnly />
                </div>
              )}
              {!managerView.yesterday && !managerView.today && !managerView.blockers && (
                <p className="helper">Start typing above to generate a tone-aligned submission.</p>
              )}
              {(managerView.yesterday || managerView.today || managerView.blockers) && (
                <p className="helper">This version emphasizes outcomes, priorities, and clear asks.</p>
              )}
            </div>
          </section>

          <section className="grid">
            <SuggestionCard
              title="Yesterday"
              description="Make outcomes and collaboration obvious."
              suggestions={recommendations.yesterday}
            />

            <SuggestionCard
              title="Today"
              description="Show priority, ownership, and communication."
              suggestions={recommendations.today}
            />

            <SuggestionCard
              title="Blockers"
              description="State the issue, impact, and your ask."
              suggestions={recommendations.blockers}
            />
          </section>

          <footer>
            Built as a companion to SimpleStandup. No data is stored—promise—refresh to clear.
          </footer>
        </>
      )}
>>>>>>> 2b6d99e (Big initial push)
    </main>
  );
}

export default App;
