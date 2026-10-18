/**
 * Signal Extraction Engine
 * Parses natural language feature descriptions to extract regulatory triggers
 * for EU AI Act, GDPR, India DPDP Act 2023, and US NIST AI RMF.
 */

const DICTIONARIES = {
  ai: [
    'ai', 'artificial intelligence', 'machine learning', 'ml', 'llm', 'large language model',
    'neural', 'deep learning', 'gpt', 'classifier', 'algorithm', 'agent', 'model',
    'rag', 'retrieval-augmented', 'computer vision', 'predictive', 'generative', 'chatbot'
  ],
  personalData: [
    'user', 'users', 'customer', 'customers', 'client', 'email', 'emails', 'profile', 'profiles',
    'account', 'accounts', 'record', 'records', 'pii', 'identity', 'identities', 'employee',
    'employees', 'personal', 'history', 'chat history', 'name', 'phone', 'address'
  ],
  biometric: [
    'face', 'faces', 'facial', 'photo', 'photos', 'selfie', 'selfies', 'image', 'images',
    'voice', 'voices', 'speech', 'fingerprint', 'retina', 'scan', 'biometric', 'biometrics',
    'appearance', 'physical trait'
  ],
  employment: [
    'resume', 'resumes', 'candidate', 'candidates', 'hiring', 'recruitment', 'recruit',
    'job', 'jobs', 'interview', 'interviews', 'applicant', 'applicants', 'workplace',
    'promotion', 'firing', 'work experience', 'hr', 'human resources', 'talent', 'performance review'
  ],
  health: [
    'patient', 'patients', 'clinical', 'medical', 'symptom', 'symptoms', 'health', 'disease',
    'diagnostic', 'triage', 'doctor', 'physician', 'drug', 'prescription', 'healthcare',
    'treatment', 'vital'
  ],
  autonomous: [
    'automatic', 'automatically', 'reject', 'rejection', 'filter out', 'decide', 'decision',
    'approve', 'approval', 'execute', 'autonomous', 'unmonitored', 'without human', 'auto-reject'
  ],
  children: [
    'child', 'children', 'minor', 'minors', 'kid', 'kids', 'student', 'students', 'underage',
    'school'
  ],
  financial: [
    'credit', 'loan', 'score', 'creditworthiness', 'banking', 'financial', 'mortgage',
    'transaction', 'fraud'
  ]
};

/**
 * Checks if text contains any term in the dictionary using word boundary checks.
 */
function matchesDictionary(textLower, terms) {
  return terms.some(term => {
    // If term is multi-word, simple include is safer than strict single-word regex boundary
    if (term.includes(' ') || term.includes('-')) {
      return textLower.includes(term);
    }
    const regex = new RegExp(`\\b${term}\\b`, 'i');
    return regex.test(textLower);
  });
}

/**
 * Extracts regulatory signals from feature description
 * @param {string} text - User provided feature description
 * @returns {object} Structured signal vector
 */
export function extractSignals(text) {
  if (!text || typeof text !== 'string') {
    return {
      usesAi: false,
      personalData: false,
      biometricData: false,
      employmentDomain: false,
      healthDomain: false,
      autonomousAction: false,
      childrenData: false,
      financialDomain: false,
      tags: []
    };
  }

  const lower = text.toLowerCase();

  const usesAi = matchesDictionary(lower, DICTIONARIES.ai);
  const personalData = matchesDictionary(lower, DICTIONARIES.personalData);
  const biometricData = matchesDictionary(lower, DICTIONARIES.biometric);
  const employmentDomain = matchesDictionary(lower, DICTIONARIES.employment);
  const healthDomain = matchesDictionary(lower, DICTIONARIES.health);
  const autonomousAction = matchesDictionary(lower, DICTIONARIES.autonomous);
  const childrenData = matchesDictionary(lower, DICTIONARIES.children);
  const financialDomain = matchesDictionary(lower, DICTIONARIES.financial);

  const tags = [];

  if (usesAi) {
    tags.push({
      id: 'uses_ai',
      label: 'AI-Driven System',
      icon: '⚡',
      badgeClass: 'active',
      description: 'System deploys machine learning, LLM, or predictive heuristics.'
    });
  }

  if (biometricData) {
    tags.push({
      id: 'biometric_data',
      label: 'Biometric / Facial Data',
      icon: '👁️',
      badgeClass: 'high-risk',
      description: 'Processes facial, voice, or biometric physical attributes (GDPR Art 9 special category).'
    });
  }

  if (employmentDomain) {
    tags.push({
      id: 'employment_domain',
      label: 'Employment / Hiring Domain',
      icon: '💼',
      badgeClass: 'high-risk',
      description: 'Affects worker recruitment, candidate ranking, or workforce evaluation (EU AI Act Annex III).'
    });
  }

  if (healthDomain) {
    tags.push({
      id: 'health_domain',
      label: 'Clinical / Health Data',
      icon: '🩺',
      badgeClass: 'high-risk',
      description: 'Processes medical diagnostic or health wellness telemetry.'
    });
  }

  if (autonomousAction) {
    tags.push({
      id: 'autonomous_action',
      label: 'Autonomous Decisions',
      icon: '🤖',
      badgeClass: 'warning',
      description: 'Applies automated actions (filtering/rejection) without guaranteed real-time human override.'
    });
  }

  if (childrenData) {
    tags.push({
      id: 'children_data',
      label: 'Children / Minor Data',
      icon: '🧒',
      badgeClass: 'high-risk',
      description: 'Processes data concerning individuals under age of majority (DPDP Sec 9 / COPPA).'
    });
  }

  if (financialDomain) {
    tags.push({
      id: 'financial_domain',
      label: 'Financial / Credit Scoring',
      icon: '💳',
      badgeClass: 'warning',
      description: 'Assesses financial trustworthiness or credit eligibility.'
    });
  }

  if (personalData && !biometricData && !healthDomain) {
    tags.push({
      id: 'personal_data',
      label: 'Personal Data (PII)',
      icon: '👤',
      badgeClass: 'active',
      description: 'Collects or processes identifiable personal information (email, profile, history).'
    });
  }

  // If none detected, provide baseline
  if (tags.length === 0) {
    tags.push({
      id: 'minimal_footprint',
      label: 'Standard Software / Low Signal',
      icon: '🟢',
      badgeClass: '',
      description: 'No sensitive regulatory keywords detected; standard software due diligence applies.'
    });
  }

  return {
    usesAi,
    personalData: personalData || biometricData || employmentDomain || healthDomain,
    biometricData,
    employmentDomain,
    healthDomain,
    autonomousAction,
    childrenData,
    financialDomain,
    tags
  };
}
