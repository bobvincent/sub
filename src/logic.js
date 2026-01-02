const defaultPillars = ['Concise', 'Prepared', 'Outcome-oriented', 'Proactive', 'Respectful'];

const starterText = {
  yesterday: 'Shipped/advanced X, paired with Y, validated outcome Z.',
  today: 'Top priority is A; collaborating with B; expecting outcome C.',
  blockers: 'Blocked by D; impact is E; asking F for assist; next step G.',
};

const baseSuggestions = {
  yesterday: [
    'Lead with outcomes: what moved, shipped, or got unblocked.',
    'Name collaborators or stakeholders and how you coordinated.',
    'Tie work to goals or tickets to show alignment.',
  ],
  today: [
    'State the top 1–2 priorities and expected outcomes.',
    'Name who you will sync with or notify to keep momentum.',
    'Call out any risks you are watching and how you will mitigate.',
  ],
  blockers: [
    'Be crisp: what is blocked, impact, and urgency.',
    'Share the next step you are taking or the ask you have.',
    'Offer alternatives or interim work while waiting.',
  ],
};

function addDynamicSuggestions(fieldValue, type) {
  const value = fieldValue.trim();
  if (!value) return [];

  const collaborationCue = /help|sync|paired|pair|review|feedback|support|coordinate/i;
  const includesCollab = collaborationCue.test(value);

  const suggestions = [];

  if (!includesCollab) {
    suggestions.push('Add a collaboration note: who you paired with or will sync with.');
  }

  if (type === 'today') {
    const hasOutcome = /(ship|deliver|publish|demo|validate|deploy|handoff)/i.test(value);
    if (!hasOutcome) {
      suggestions.push('State the outcome you expect (e.g., ship, demo, validate).');
    }
    const hasPriority = /(top|priority|focus|today)/i.test(value);
    if (!hasPriority) {
      suggestions.push('Clarify today\'s top focus to show prioritization.');
    }
  }

  if (type === 'yesterday') {
    const hasOutcome = /(shipped|delivered|closed|completed|resolved|demoed)/i.test(value);
    if (!hasOutcome) {
      suggestions.push('Highlight a concrete outcome or milestone hit.');
    }
  }

  if (type === 'blockers') {
    const hasAsk = /(need|ask|unblock|help|review)/i.test(value);
    if (!hasAsk) {
      suggestions.push('Include an explicit ask or next step to unblock.');
    }
    const hasImpact = /(impact|blocked|risk|delay)/i.test(value);
    if (!hasImpact) {
      suggestions.push('State the impact or risk so others can prioritize.');
    }
  }

  return suggestions;
}

function buildSamples(inputs) {
  return {
    yesterday:
      inputs.yesterday.trim() ||
      'Wrapped API error handling and paired with QA to validate retries; closed tickets ST-142/143.',
    today:
      inputs.today.trim() ||
      'Focus on dashboard perf: ship caching change, sync with UX on loading states, and prep demo.',
    blockers:
      inputs.blockers.trim() ||
      'Waiting on SSO cert from security; impact is staging login tests; asking Sam to review by noon.',
  };
}

function buildRecommendations(inputs) {
  return {
    yesterday: [...baseSuggestions.yesterday, ...addDynamicSuggestions(inputs.yesterday, 'yesterday')],
    today: [...baseSuggestions.today, ...addDynamicSuggestions(inputs.today, 'today')],
    blockers: [...baseSuggestions.blockers, ...addDynamicSuggestions(inputs.blockers, 'blockers')],
    samples: buildSamples(inputs),
  };
}

function templateStandup(inputs) {
  const samples = buildSamples(inputs);
  return {
    yesterday: samples.yesterday,
    today: samples.today,
    blockers: samples.blockers,
  };
}

export { addDynamicSuggestions, baseSuggestions, buildRecommendations, buildSamples, defaultPillars, starterText, templateStandup };
