import React, { useMemo, useState } from 'react';
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
    </main>
  );
}

export default App;
