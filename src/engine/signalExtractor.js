/**
 * Signal Extraction Engine
 * Parses natural language feature descriptions to extract explicit, verifiable risk triggers.
 */

const DICTIONARIES = {
  ai_decision: [
    'ai', 'artificial intelligence', 'machine learning', 'ml', 'llm', 'large language model',
    'neural', 'deep learning', 'gpt', 'classifier', 'algorithm', 'agent', 'model',
    'rag', 'retrieval-augmented', 'computer vision', 'predictive', 'generative', 'chatbot',
    'rank', 'ranks', 'ranking', 'score', 'scores', 'scoring', 'automated decision'
  ],
  employment: [
    'cv', 'cvs', 'resume', 'resumes', 'candidate', 'candidates', 'hiring', 'recruitment', 'recruit',
    'job', 'jobs', 'interview', 'interviews', 'applicant', 'applicants', 'workplace',
    'promotion', 'firing', 'work experience', 'hr', 'human resources', 'talent', 'performance review'
  ],
  personal_data: [
    'cv', 'cvs', 'resume', 'resumes', 'candidate', 'candidates', 'interview', 'interview answers',
    'user', 'users', 'customer', 'customers', 'client', 'email', 'emails', 'profile', 'profiles',
    'account', 'accounts', 'record', 'records', 'pii', 'identity', 'employee', 'employees',
    'personal', 'history', 'chat history', 'name', 'phone',
    // Biometric data is definitionally personal data (GDPR Art. 4(14)) and DPDP sensitive data
    'face', 'faces', 'facial', 'photo', 'photos', 'selfie', 'selfies',
    'image', 'images', 'fingerprint', 'biometric', 'biometrics', 'voice', 'scan',
    // Health data is personal data in all jurisdictions
    'patient', 'patients', 'medical record', 'health record'
  ],
  biometric: [
    'face', 'faces', 'facial', 'photo', 'photos', 'selfie', 'selfies', 'image', 'images',
    'voice', 'voices', 'speech', 'fingerprint', 'retina', 'scan', 'biometric', 'biometrics',
    'appearance', 'physical trait'
  ],
  health: [
    'patient', 'patients', 'clinical', 'medical', 'symptom', 'symptoms', 'health', 'disease',
    'diagnostic', 'triage', 'doctor', 'physician', 'drug', 'prescription', 'healthcare',
    'treatment'
  ],
  autonomous_action: [
    'automatic', 'automatically', 'reject', 'rejection', 'filter out', 'decide', 'decision',
    'approve', 'approval', 'execute', 'autonomous', 'unmonitored', 'without human', 'auto-reject',
    'ranks', 'ranking', 'scores', 'scoring'
  ],
  children: [
    'child', 'children', 'minor', 'minors', 'kid', 'kids', 'student', 'students', 'underage'
  ],
  jurisdiction_eu: [
    'eu', 'europe', 'european union', 'germany', 'france', 'gdpr', 'ai act'
  ],
  jurisdiction_in: [
    'india', 'indian', 'dpdp', 'meity'
  ],
  jurisdiction_us: [
    'us', 'usa', 'united states', 'america', 'california', 'nyc', 'bipa', 'nist'
  ]
};

function matchesDictionary(textLower, terms) {
  return terms.some(term => {
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
      activeTriggers: new Set(),
      tags: [],
      jurisdictionsMentioned: []
    };
  }

  const lower = text.toLowerCase();
  const activeTriggers = new Set();

  if (matchesDictionary(lower, DICTIONARIES.ai_decision)) activeTriggers.add('ai_decision');
  if (matchesDictionary(lower, DICTIONARIES.employment)) activeTriggers.add('employment');
  if (matchesDictionary(lower, DICTIONARIES.personal_data)) activeTriggers.add('personal_data');
  if (matchesDictionary(lower, DICTIONARIES.biometric)) activeTriggers.add('biometric');
  if (matchesDictionary(lower, DICTIONARIES.health)) activeTriggers.add('health');
  if (matchesDictionary(lower, DICTIONARIES.autonomous_action)) activeTriggers.add('autonomous_action');
  if (matchesDictionary(lower, DICTIONARIES.children)) activeTriggers.add('children');

  const jurisdictionsMentioned = [];
  if (matchesDictionary(lower, DICTIONARIES.jurisdiction_eu)) jurisdictionsMentioned.push('EU');
  if (matchesDictionary(lower, DICTIONARIES.jurisdiction_in)) jurisdictionsMentioned.push('India');
  if (matchesDictionary(lower, DICTIONARIES.jurisdiction_us)) jurisdictionsMentioned.push('US');

  const tags = [];

  if (activeTriggers.has('ai_decision')) {
    tags.push({
      id: 'ai_decision',
      label: 'AI-Assisted Decisions',
      icon: '⚡',
      badgeClass: 'active',
      description: 'System uses AI/ML models or automated heuristics for scoring or predictions.'
    });
  }

  if (activeTriggers.has('employment')) {
    tags.push({
      id: 'employment',
      label: 'Employment / Hiring',
      icon: '💼',
      badgeClass: 'high-risk',
      description: 'Evaluates candidates, CVs, worker recruitment, or workforce management.'
    });
  }

  if (activeTriggers.has('personal_data')) {
    tags.push({
      id: 'personal_data',
      label: 'Personal Data',
      icon: '👤',
      badgeClass: 'active',
      description: 'Collects or processes identifiable personal information (CVs, records, history).'
    });
  }

  if (activeTriggers.has('biometric')) {
    tags.push({
      id: 'biometric',
      label: 'Biometric / Facial Data',
      icon: '👁️',
      badgeClass: 'high-risk',
      description: 'Processes facial geometry, voice, or physical traits (Special Category Data).'
    });
  }

  if (activeTriggers.has('health')) {
    tags.push({
      id: 'health',
      label: 'Clinical / Health Data',
      icon: '🩺',
      badgeClass: 'high-risk',
      description: 'Processes medical diagnostic or health wellness data.'
    });
  }

  if (activeTriggers.has('autonomous_action')) {
    tags.push({
      id: 'autonomous_action',
      label: 'Autonomous Actions',
      icon: '🤖',
      badgeClass: 'warning',
      description: 'Executes automated ranking, filtering, or rejection without guaranteed human review.'
    });
  }

  if (activeTriggers.has('children')) {
    tags.push({
      id: 'children',
      label: 'Children / Minor Data',
      icon: '🧒',
      badgeClass: 'high-risk',
      description: 'Processes data concerning individuals under age of majority.'
    });
  }

  if (jurisdictionsMentioned.length > 1) {
    tags.push({
      id: 'multi_jurisdiction',
      label: `Multiple Jurisdictions (${jurisdictionsMentioned.join(', ')})`,
      icon: '🌐',
      badgeClass: 'active',
      description: 'Explicitly targets multiple sovereign legal jurisdictions.'
    });
  }

  if (tags.length === 0) {
    tags.push({
      id: 'minimal_footprint',
      label: 'Standard Software / Baseline Due Diligence',
      icon: '🟢',
      badgeClass: '',
      description: 'No sensitive regulatory keywords detected; standard software due diligence applies.'
    });
  }

  return {
    activeTriggers: Array.from(activeTriggers),
    tags,
    jurisdictionsMentioned,
    // Convenience booleans
    usesAi: activeTriggers.has('ai_decision'),
    employmentDomain: activeTriggers.has('employment'),
    personalData: activeTriggers.has('personal_data'),
    biometricData: activeTriggers.has('biometric'),
    healthDomain: activeTriggers.has('health'),
    autonomousAction: activeTriggers.has('autonomous_action'),
    childrenData: activeTriggers.has('children')
  };
}
