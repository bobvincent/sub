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
<<<<<<< HEAD
    'Call out any risks you are watching and how you will mitigate.',
=======
    'Highlight risks you are actively managing and your mitigation plan.',
>>>>>>> 2b6d99e (Big initial push)
  ],
  blockers: [
    'Be crisp: what is blocked, impact, and urgency.',
    'Share the next step you are taking or the ask you have.',
<<<<<<< HEAD
    'Offer alternatives or interim work while waiting.',
=======
    'Offer alternatives or interim work to keep momentum.',
>>>>>>> 2b6d99e (Big initial push)
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
<<<<<<< HEAD
      suggestions.push('State the impact or risk so others can prioritize.');
=======
      suggestions.push('State the impact so others can prioritize quickly.');
>>>>>>> 2b6d99e (Big initial push)
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

<<<<<<< HEAD
function templateStandup(inputs) {
  const samples = buildSamples(inputs);
  return {
    yesterday: samples.yesterday,
    today: samples.today,
    blockers: samples.blockers,
=======
function ensureSentence(value) {
  const trimmed = value.trim();
  if (!trimmed) return '';
  const normalized = trimmed.replace(/\s+/g, ' ');
  return /[.!?]$/.test(normalized) ? normalized : `${normalized}.`;
}

function replacePassiveTerms(value) {
  return value
    .replace(/\bhopefully\b/gi, 'confidently')
    .replace(/\btry(?:ing)? to\b/gi, 'plan to')
    .replace(/\bmaybe\b/gi, 'likely')
    .replace(/\bperhaps\b/gi, 'likely')
    .replace(/\bhope to\b/gi, 'plan to');
}

const verbBaseMap = {
  advance: 'advance',
  advanced: 'advance',
  advancing: 'advance',
  align: 'align',
  aligned: 'align',
  aligning: 'align',
  analyze: 'analyze',
  analyzed: 'analyze',
  analyzing: 'analyze',
  build: 'build',
  building: 'build',
  built: 'build',
  close: 'close',
  closed: 'close',
  closing: 'close',
  coordinate: 'coordinate',
  coordinated: 'coordinate',
  coordinating: 'coordinate',
  create: 'create',
  created: 'create',
  creating: 'create',
  debug: 'debug',
  debugged: 'debug',
  debugging: 'debug',
  deliver: 'deliver',
  delivered: 'deliver',
  delivering: 'deliver',
  deploy: 'deploy',
  deployed: 'deploy',
  deploying: 'deploy',
  design: 'design',
  designed: 'design',
  designing: 'design',
  document: 'document',
  documented: 'document',
  documenting: 'document',
  fix: 'fix',
  fixed: 'fix',
  fixing: 'fix',
  implement: 'implement',
  implemented: 'implement',
  implementing: 'implement',
  improve: 'improve',
  improved: 'improve',
  improving: 'improve',
  investigate: 'investigate',
  investigated: 'investigate',
  investigating: 'investigate',
  launch: 'launch',
  launched: 'launch',
  launching: 'launch',
  meet: 'meet',
  meeting: 'meet',
  migrate: 'migrate',
  migrated: 'migrate',
  migrating: 'migrate',
  monitor: 'monitor',
  monitored: 'monitor',
  monitoring: 'monitor',
  optimize: 'optimize',
  optimized: 'optimize',
  optimizing: 'optimize',
  plan: 'plan',
  planned: 'plan',
  planning: 'plan',
  progress: 'progress',
  progressed: 'progress',
  progressing: 'progress',
  prototype: 'prototype',
  prototyped: 'prototype',
  prototyping: 'prototype',
  refactor: 'refactor',
  refactored: 'refactor',
  refactoring: 'refactor',
  release: 'release',
  released: 'release',
  releasing: 'release',
  resolve: 'resolve',
  resolved: 'resolve',
  resolving: 'resolve',
  review: 'review',
  reviewed: 'review',
  reviewing: 'review',
  ship: 'ship',
  shipped: 'ship',
  shipping: 'ship',
  sync: 'sync',
  synced: 'sync',
  syncing: 'sync',
  test: 'test',
  tested: 'test',
  testing: 'test',
  triage: 'triage',
  triaged: 'triage',
  triaging: 'triage',
  unblock: 'unblock',
  unblocked: 'unblock',
  unblocking: 'unblock',
  update: 'update',
  updated: 'update',
  updating: 'update',
  validate: 'validate',
  validated: 'validate',
  validating: 'validate',
  write: 'write',
  wrote: 'write',
  writing: 'write',
};

const verbGerundMap = {
  advance: 'advancing',
  align: 'aligning',
  analyze: 'analyzing',
  build: 'building',
  close: 'closing',
  coordinate: 'coordinating',
  create: 'creating',
  debug: 'debugging',
  deliver: 'delivering',
  deploy: 'deploying',
  design: 'designing',
  document: 'documenting',
  fix: 'fixing',
  implement: 'implementing',
  improve: 'improving',
  investigate: 'investigating',
  launch: 'launching',
  meet: 'meeting',
  migrate: 'migrating',
  monitor: 'monitoring',
  optimize: 'optimizing',
  plan: 'planning',
  progress: 'progressing',
  prototype: 'prototyping',
  refactor: 'refactoring',
  release: 'releasing',
  resolve: 'resolving',
  review: 'reviewing',
  ship: 'shipping',
  sync: 'syncing',
  test: 'testing',
  triage: 'triaging',
  unblock: 'unblocking',
  update: 'updating',
  validate: 'validating',
  write: 'writing',
};

function toFragments(value) {
  return value
    .replace(/[.!?]+/g, ';')
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean);
}

function sanitizeFragment(fragment) {
  return fragment
    .replace(/^[\s\-–—•]+/g, '')
    .replace(/^(i|we|team)\s+(worked on|handled|did|worked|made|focused on|focus|plan to|planning to|working on|working)\s+/i, '')
    .replace(/^(on|for|to)\s+/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function summarizeFragments(fragments) {
  const cleaned = fragments.map(sanitizeFragment).filter(Boolean);
  if (!cleaned.length) return '';
  if (cleaned.length === 1) return cleaned[0];
  return `${cleaned[0]} and ${cleaned[1]}`;
}

function normalizeFocus(text) {
  if (!text) return '';
  let cleaned = text.replace(/[.!?]+$/g, '').trim();
  cleaned = cleaned.replace(/^blocked by\s+/i, '');
  if (/^waiting on\s+/i.test(cleaned)) {
    return cleaned;
  }
  cleaned = cleaned.replace(/^(plan(?:ning)?|aim(?:ing)?) to\s+/i, '');
  cleaned = cleaned.replace(/^working on\s+/i, '');

  const parts = cleaned.split(' ');
  const first = parts[0]?.toLowerCase();
  const baseVerb = verbBaseMap[first];
  if (baseVerb) {
    const rest = parts.slice(1).join(' ');
    const gerund = verbGerundMap[baseVerb] || `${baseVerb}ing`;
    return rest ? `${gerund} ${rest}` : gerund;
  }

  const lower = cleaned.charAt(0).toLowerCase() + cleaned.slice(1);
  return lower.replace(/^(the|a|an)\s+/i, '');
}

function improveLine(value, type) {
  const base = ensureSentence(replacePassiveTerms(value));
  if (!base) return '';

  const fragments = toFragments(base);
  const summary = summarizeFragments(fragments);
  const hasCollab = /(pair|paired|sync|review|feedback|coordinate|collab|with )/i.test(base);
  const hasOutcomeVerb = /(ship|shipped|deliver|delivered|close|closed|complete|completed|resolve|resolved|demo|demoed|validate|validated|advance|advanced|progress|progressed|release|released|launch|launched)/i.test(base);
  const hasAskCue = /(ask|need|help|review|unblock|assist|waiting on)/i.test(base);
  const hasImpactCue = /(impact|risk|delay|blocked|stall)/i.test(base);

  if (type === 'yesterday') {
    const focus = normalizeFocus(summary) || 'key priorities';
    const outcomeLine = hasOutcomeVerb
      ? `Closed the loop on ${focus} and shipped the deliverable against plan, aligned to OKRs.`
      : `Advanced ${focus} and reduced execution risk for the next milestone, unblocking the critical path.`;
    const collabLine = hasCollab
      ? ''
      : 'Aligned stakeholders and resources on scope, timeline, and handoffs, with clear ownership.';
    return `${outcomeLine} ${collabLine}`.trim();
  }

  if (type === 'today') {
    const focus = normalizeFocus(summary) || 'the top priority';
    const priorityLine = `Today I am driving ${focus} against the critical path and resourcing plan.`;
    const outcomeLine = hasOutcomeVerb ? '' : 'Target is a measurable outcome with clear success criteria and KPI impact by EOD.';
    const collabLine = hasCollab ? '' : 'I will sync with cross-functional resources to unblock dependencies and de-risk delivery.';
    return `${priorityLine} ${outcomeLine} ${collabLine}`.trim();
  }

  if (type === 'blockers') {
    const blocker = normalizeFocus(summary) || 'an external dependency';
    const blockerLine = `Blocked by ${blocker} pending stakeholder/resource input or approval.`;
    const impactLine = hasImpactCue ? '' : 'Clearing this today keeps the timeline and SLA on track.';
    const askLine = hasAskCue ? '' : 'Requesting an expedite, decision, or escalation to maintain momentum.';
    return `${blockerLine} ${impactLine} ${askLine}`.trim();
  }

  return `Update: ${base}`;
}

function templateStandup(inputs) {
  return {
    yesterday: improveLine(inputs.yesterday, 'yesterday'),
    today: improveLine(inputs.today, 'today'),
    blockers: improveLine(inputs.blockers, 'blockers'),
>>>>>>> 2b6d99e (Big initial push)
  };
}

export { addDynamicSuggestions, baseSuggestions, buildRecommendations, buildSamples, defaultPillars, starterText, templateStandup };
