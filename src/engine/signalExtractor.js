/**
 * Enhanced Signal Extraction Engine (v2.0)
 * Parses natural language feature descriptions to extract verifiable regulatory risk triggers.
 * Includes n-gram matching, negation awareness, signal-weighting, and confidence scoring.
 */

// Structured dictionary with strong (weight 1.0) and weak (weight 0.5) signal terms
const DICTIONARIES = {
  ai_decision: {
    strong: [
      'artificial intelligence', 'machine learning', 'deep learning', 'neural network',
      'large language model', 'llm', 'generative ai', 'retrieval-augmented', 'rag',
      'classifier', 'predictive model', 'automated decision', 'algorithmic scoring',
      'automated ranking', 'computer vision', 'recommendation engine', 'gpt'
    ],
    weak: [
      'ai', 'ml', 'algorithm', 'model', 'agent', 'neural', 'predictive', 'generative',
      'chatbot', 'rank', 'ranks', 'ranking', 'score', 'scores', 'scoring', 'filter'
    ]
  },

  employment: {
    strong: [
      'resume', 'resumes', 'candidate screening', 'hiring pipeline', 'interview scoring',
      'workforce promotion', 'employee evaluation', 'applicant tracking', 'cv parsing',
      'recruitment automation', 'job applicant', 'job applicants', 'hiring recommendation'
    ],
    weak: [
      'cv', 'cvs', 'candidate', 'candidates', 'hiring', 'recruitment', 'recruit',
      'job', 'jobs', 'interview', 'interviews', 'applicant', 'applicants', 'workplace',
      'promotion', 'firing', 'work experience', 'hr', 'human resources', 'talent',
      'performance review', 'worker', 'workers', 'staff'
    ]
  },

  personal_data: {
    strong: [
      'personally identifiable', 'pii', 'medical record', 'health record', 'chat history',
      'passport', 'aadhaar', 'national id', 'user credentials', 'social security',
      'interview answers', 'resume data', 'cv data'
    ],
    weak: [
      'user', 'users', 'customer', 'customers', 'client', 'clients', 'email', 'emails',
      'profile', 'profiles', 'account', 'accounts', 'record', 'records', 'identity',
      'employee', 'employees', 'personal', 'history', 'name', 'phone', 'contact'
    ]
  },

  biometric: {
    strong: [
      'facial recognition', 'biometric identification', 'biometric template', 'face geometry',
      'retinal scan', 'fingerprint scan', 'voiceprint', 'voice biometric', 'gait analysis',
      'biometrics', 'biometric'
    ],
    weak: [
      'face', 'faces', 'facial', 'photo', 'photos', 'selfie', 'selfies',
      'image', 'images', 'voice', 'voices', 'speech', 'scan', 'fingerprint',
      'appearance', 'physical trait'
    ]
  },

  health: {
    strong: [
      'clinical diagnostic', 'medical triage', 'health diagnosis', 'symptom checker',
      'drug prescription', 'electronic health record', 'patient treatment', 'radiology ai'
    ],
    weak: [
      'patient', 'patients', 'clinical', 'medical', 'symptom', 'symptoms', 'health',
      'disease', 'diagnostic', 'triage', 'doctor', 'physician', 'drug', 'prescription',
      'healthcare', 'treatment', 'wellness'
    ]
  },

  autonomous_action: {
    strong: [
      'unmonitored decision', 'fully autonomous', 'auto-reject', 'automatic filtering',
      'without human intervention', 'automated rejection', 'autonomous execution',
      'auto-approve', 'auto-disqualify'
    ],
    weak: [
      'automatic', 'automatically', 'reject', 'rejection', 'filter out', 'decide',
      'decision', 'approve', 'approval', 'execute', 'autonomous', 'unmonitored',
      'without human', 'ranking', 'scoring'
    ]
  },

  children: {
    strong: [
      'under 18', 'underage users', 'minor children', 'k-12 students', 'parental consent',
      'children data', 'child privacy', 'school pupils'
    ],
    weak: [
      'child', 'children', 'minor', 'minors', 'kid', 'kids', 'student', 'students',
      'underage', 'youth', 'pupil', 'pupils'
    ]
  },

  education: {
    strong: [
      'student examination', 'admission scoring', 'vocational training', 'automated grading',
      'exam proctoring', 'academic assessment', 'educational institution', 'university admissions',
      'test evaluation', 'classroom tutor'
    ],
    weak: [
      'education', 'educational', 'school', 'schools', 'exam', 'exams', 'grading',
      'classroom', 'academic', 'curriculum', 'tutor', 'course', 'courses'
    ]
  },

  infrastructure: {
    strong: [
      'critical infrastructure', 'power grid', 'water supply network', 'traffic management system',
      'industrial control system', 'scada', 'nuclear facility', 'safety component of infrastructure'
    ],
    weak: [
      'infrastructure', 'grid', 'utility', 'utilities', 'traffic', 'pipeline', 'pipelines',
      'transport network', 'telecom network', 'smart grid'
    ]
  },

  finance_credit: {
    strong: [
      'credit scoring', 'loan underwriting', 'creditworthiness evaluation', 'mortgage underwriting',
      'solvency assessment', 'debt risk scoring', 'credit report', 'financial underwriting',
      'algorithmic credit'
    ],
    weak: [
      'credit', 'loan', 'loans', 'lending', 'underwriting', 'borrower', 'borrowers',
      'creditworthiness', 'solvency', 'fintech', 'banking', 'debt'
    ]
  },

  emotion_biometric: {
    strong: [
      'emotion recognition', 'emotional state inference', 'mood detection', 'facial affect analysis',
      'sentiment from voice', 'lie detector', 'cognitive state assessment', 'workplace attentiveness'
    ],
    weak: [
      'emotion', 'emotions', 'emotional', 'mood', 'affect', 'facial expression',
      'attentiveness', 'sentiment'
    ]
  },

  law_enforcement: {
    strong: [
      'law enforcement', 'predictive policing', 'criminal recidivism', 'criminal suspect',
      'public space surveillance', 'border control biometric', 'police investigation',
      'crime risk scoring'
    ],
    weak: [
      'police', 'policing', 'surveillance', 'suspect', 'suspects', 'criminal',
      'crime', 'enforcement', 'court', 'investigation'
    ]
  },

  cross_border: {
    strong: [
      'cross-border transfer', 'international data transfer', 'overseas cloud hosting',
      'offshore servers', 'eu-us data bridge', 'trans-border data flow', 'cross-border hosting'
    ],
    weak: [
      'cross-border', 'international', 'offshore', 'overseas', 'foreign hosting',
      'global cloud', 'data export', 'multi-region'
    ]
  },

  large_scale_data: {
    strong: [
      'significant data fiduciary', 'large-scale processing', 'millions of users',
      'high-volume personal data', 'systemic risk', 'national scale processing',
      'massive user base'
    ],
    weak: [
      'large scale', 'massive dataset', 'bulk data', 'enterprise-wide', 'high volume',
      'widespread use'
    ]
  },

  content_moderation: {
    strong: [
      'content moderation', 'synthetic media', 'deepfake detection', 'ai-generated content watermark',
      'misinformation filtering', 'automated content takedown', 'deepfake'
    ],
    weak: [
      'moderation', 'watermark', 'watermarking', 'synthetic', 'flagging',
      'copyright infringement', 'takedown', 'disinformation'
    ]
  },

  jurisdiction_eu: {
    strong: ['european union', 'eu ai act', 'gdpr', 'brussels', 'eea'],
    weak: ['eu', 'europe', 'germany', 'france', 'spain', 'italy', 'netherlands']
  },

  jurisdiction_in: {
    strong: ['dpdp act', 'dpdp 2023', 'meity', 'data protection board of india', 'cert-in', 'rbi digital lending'],
    weak: ['india', 'indian', 'dpdp', 'delhi', 'mumbai', 'bengaluru']
  },

  jurisdiction_us: {
    strong: ['nist ai rmf', 'nyc local law 144', 'illinois bipa', 'ftc act section 5', 'california cpra', 'ccpa', 'fcra'],
    weak: ['us', 'usa', 'united states', 'america', 'california', 'nyc', 'illinois', 'bipa', 'nist', 'ftc', 'eeoc']
  }
};

/**
 * Computes negated spans across the text.
 * Covers clauses beginning with negative prefixes until punctuation or contrasting conjunctions.
 */
function getNegatedSpans(textLower) {
  const spans = [];
  const negStartRegex = /\b(does not|doesn't|do not|don't|did not|didn't|without|never|no|excluding|not using|not processing|not storing|not collecting|free of|zero)\b/gi;
  let match;
  while ((match = negStartRegex.exec(textLower)) !== null) {
    const start = match.index;
    const rest = textLower.slice(start);
    const endMatch = /[.;]|\b(?:but|however|yet|although)\b/i.exec(rest);
    const end = endMatch ? start + endMatch.index : Math.min(textLower.length, start + 120);
    spans.push({ start, end });
  }
  return spans;
}

/**
 * Checks if a match index is within a negated span or preceded by a negative prefix.
 */
function isNegatedAt(textLower, termStart, negatedSpans = []) {
  if (negatedSpans.some(s => termStart >= s.start && termStart < s.end)) {
    return true;
  }
  const windowStart = Math.max(0, termStart - 50);
  const preceding = textLower.slice(windowStart, termStart);
  const negPattern = /\b(does not|doesn't|do not|don't|did not|didn't|no|without|never|excluding|not|zero|free of)\s+(?:(?:use|using|utilize|utilizing|process|processing|store|storing|collect|collecting|retain|retaining|contain|containing|rely on|relies on|have|having|involve|involving|feature|any|all|such|the|a|an)\s+){0,3}$/i;
  return negPattern.test(preceding);
}

/**
 * Searches text for terms in a dictionary entry.
 * Tracks strong vs weak matches and separates positive occurrences from negated occurrences.
 */
function scanDictionary(textLower, dictEntry, negatedSpans = []) {
  const allTerms = [
    ...dictEntry.strong.map(t => ({ term: t, strong: true, weight: 1.0 })),
    ...dictEntry.weak.map(t => ({ term: t, strong: false, weight: 0.5 }))
  ];

  let positiveMatches = 0;
  let negatedMatches = 0;
  let strongHits = 0;
  const matchedSnippets = [];
  const negatedSnippets = [];

  for (const { term, strong, weight } of allTerms) {
    let searchPos = 0;
    while (searchPos < textLower.length) {
      let idx = -1;
      let matchLen = term.length;

      if (term.includes(' ') || term.includes('-')) {
        idx = textLower.indexOf(term, searchPos);
      } else {
        const regex = new RegExp(`\\b${term}\\b`, 'gi');
        regex.lastIndex = searchPos;
        const match = regex.exec(textLower);
        if (match) {
          idx = match.index;
          matchLen = match[0].length;
        }
      }

      if (idx === -1) break;

      if (isNegatedAt(textLower, idx, negatedSpans)) {
        negatedMatches += weight;
        negatedSnippets.push(term);
      } else {
        positiveMatches += weight;
        if (strong) strongHits += 1;
        matchedSnippets.push(term);
      }

      searchPos = idx + matchLen;
    }
  }

  return {
    positiveScore: positiveMatches,
    negatedScore: negatedMatches,
    strongHits,
    matchedSnippets: Array.from(new Set(matchedSnippets)),
    negatedSnippets: Array.from(new Set(negatedSnippets)),
    // Trigger is active if it has positive score
    isActive: positiveMatches > 0,
    // Trigger is explicitly negated if it has negated matches and zero positive matches
    isExplicitlyNegated: positiveMatches === 0 && negatedMatches > 0
  };
}

/**
 * Calculates overall signal confidence score (0-100) and confidence level.
 */
function calculateConfidence(activeTriggers, rawHits, negatedTriggers, queryLength) {
  if (queryLength < 10 || activeTriggers.length === 0) {
    return {
      confidenceScore: 35,
      confidenceLevel: 'LOW',
      confidenceRationale: 'Sparse input description; only baseline software due diligence criteria apply.'
    };
  }

  let baseScore = 50;
  // Increase score for each active trigger
  baseScore += Math.min(activeTriggers.length * 10, 30);

  // Increase score based on strong specific domain terms
  let totalStrongHits = 0;
  for (const trig of activeTriggers) {
    if (rawHits[trig]) {
      totalStrongHits += rawHits[trig].strongHits;
    }
  }
  baseScore += Math.min(totalStrongHits * 6, 20);

  // Reward length and detail up to 10 points
  if (queryLength > 80) baseScore += 5;
  if (queryLength > 160) baseScore += 5;

  // Deduct slightly if there are ambiguities or multiple negations
  if (negatedTriggers.length > 0) {
    baseScore = Math.max(baseScore - 2, 40);
  }

  const score = Math.min(Math.max(baseScore, 20), 98);
  let level = 'MEDIUM';
  if (score >= 82) {
    level = 'HIGH';
  } else if (score < 60) {
    level = 'LOW';
  }

  const rationale = level === 'HIGH'
    ? `High signal fidelity: multiple high-specificity statutory domain terms identified (${activeTriggers.slice(0, 3).join(', ')})${negatedTriggers.length > 0 ? ` with ${negatedTriggers.length} explicit negation(s) honored.` : '.'}`
    : level === 'MEDIUM'
      ? `Moderate signal fidelity: core functional concepts detected; additional architectural details will refine risk classification.`
      : `Preliminary lexical detection: query is brief; recommended to supply technical data flows for full assessment.`;

  return {
    confidenceScore: score,
    confidenceLevel: level,
    confidenceRationale: rationale
  };
}

/**
 * Extracts regulatory signals from feature description
 * @param {string} text - User provided feature description
 * @returns {object} Structured signal vector
 */
export function extractSignals(text) {
  if (!text || typeof text !== 'string') {
    return {
      activeTriggers: [],
      tags: [],
      jurisdictionsMentioned: [],
      negatedTriggers: [],
      confidenceScore: 30,
      confidenceLevel: 'LOW',
      confidenceRationale: 'Empty input query.'
    };
  }

  const lower = text.toLowerCase();
  const activeTriggers = new Set();
  const rawHits = {};
  const negatedTriggers = [];

  const negatedSpans = getNegatedSpans(lower);

  // Evaluate core categories
  const triggerKeys = [
    'ai_decision', 'employment', 'personal_data', 'biometric', 'health',
    'autonomous_action', 'children', 'education', 'infrastructure',
    'finance_credit', 'emotion_biometric', 'law_enforcement', 'cross_border',
    'large_scale_data', 'content_moderation'
  ];

  for (const key of triggerKeys) {
    const scan = scanDictionary(lower, DICTIONARIES[key], negatedSpans);
    rawHits[key] = scan;

    if (scan.isActive) {
      activeTriggers.add(key);
    } else if (scan.isExplicitlyNegated) {
      negatedTriggers.push({
        id: key,
        terms: scan.negatedSnippets,
        note: `Suppressed by explicit negation: "${scan.negatedSnippets.join(', ')}"`
      });
    }
  }

  // Deduce personal_data if biometric, health, employment, children, or education is active
  if ((activeTriggers.has('biometric') || activeTriggers.has('health') || activeTriggers.has('employment') || activeTriggers.has('children') || activeTriggers.has('education')) && !rawHits.personal_data.isExplicitlyNegated) {
    activeTriggers.add('personal_data');
  }

  // Evaluate jurisdiction mentions
  const jurisdictionsMentioned = [];
  const euScan = scanDictionary(lower, DICTIONARIES.jurisdiction_eu, negatedSpans);
  const inScan = scanDictionary(lower, DICTIONARIES.jurisdiction_in, negatedSpans);
  const usScan = scanDictionary(lower, DICTIONARIES.jurisdiction_us, negatedSpans);

  if (euScan.isActive) jurisdictionsMentioned.push('EU');
  if (inScan.isActive) jurisdictionsMentioned.push('India');
  if (usScan.isActive) jurisdictionsMentioned.push('US');

  // Compute confidence metrics
  const activeTriggersArray = Array.from(activeTriggers);
  const { confidenceScore, confidenceLevel, confidenceRationale } = calculateConfidence(
    activeTriggersArray,
    rawHits,
    negatedTriggers,
    text.length
  );

  // Generate visual tags for UI
  const tags = [];

  if (activeTriggers.has('ai_decision')) {
    tags.push({
      id: 'ai_decision',
      label: 'AI-Assisted Decisions',
      icon: '⚡',
      badgeClass: 'active',
      description: 'System uses AI/ML models, LLMs, or automated heuristics for scoring or predictions.'
    });
  }

  if (activeTriggers.has('employment')) {
    tags.push({
      id: 'employment',
      label: 'Employment / Hiring',
      icon: '💼',
      badgeClass: 'high-risk',
      description: 'Evaluates candidates, CVs, recruitment screening, or workforce management.'
    });
  }

  if (activeTriggers.has('personal_data')) {
    tags.push({
      id: 'personal_data',
      label: 'Personal Data (PII)',
      icon: '👤',
      badgeClass: 'active',
      description: 'Collects or processes identifiable personal information (records, credentials, history).'
    });
  }

  if (activeTriggers.has('biometric')) {
    tags.push({
      id: 'biometric',
      label: 'Biometric / Facial Data',
      icon: '👁️',
      badgeClass: 'high-risk',
      description: 'Processes facial geometry, voiceprints, or physical traits (Special Category Data).'
    });
  }

  if (activeTriggers.has('health')) {
    tags.push({
      id: 'health',
      label: 'Clinical / Health Data',
      icon: '🩺',
      badgeClass: 'high-risk',
      description: 'Processes patient health, symptom evaluation, or medical diagnostic workflows.'
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
      description: 'Processes personal data of individuals under statutory age of majority.'
    });
  }

  if (activeTriggers.has('education')) {
    tags.push({
      id: 'education',
      label: 'Education / Vocational Assessment',
      icon: '🎓',
      badgeClass: 'high-risk',
      description: 'AI evaluated student examinations, admission scoring, or learning outcomes (EU AI Act Annex III).'
    });
  }

  if (activeTriggers.has('infrastructure')) {
    tags.push({
      id: 'infrastructure',
      label: 'Critical Infrastructure',
      icon: '⚡',
      badgeClass: 'high-risk',
      description: 'AI used as a safety component in energy, water, transport, or digital networks.'
    });
  }

  if (activeTriggers.has('finance_credit')) {
    tags.push({
      id: 'finance_credit',
      label: 'Credit Risk & Underwriting',
      icon: '💳',
      badgeClass: 'high-risk',
      description: 'Evaluates creditworthiness, loan underwriting, or access to essential financial services.'
    });
  }

  if (activeTriggers.has('emotion_biometric')) {
    tags.push({
      id: 'emotion_biometric',
      label: 'Emotion / Mood Inference',
      icon: '🧠',
      badgeClass: 'high-risk',
      description: 'Infers emotional states or attentiveness in workplaces or educational settings.'
    });
  }

  if (activeTriggers.has('law_enforcement')) {
    tags.push({
      id: 'law_enforcement',
      label: 'Law Enforcement / Public Space',
      icon: '🛡️',
      badgeClass: 'high-risk',
      description: 'Public surveillance, criminal recidivism assessment, or border control AI.'
    });
  }

  if (activeTriggers.has('cross_border')) {
    tags.push({
      id: 'cross_border',
      label: 'Cross-Border Data Transfer',
      icon: '🌐',
      badgeClass: 'warning',
      description: 'Data hosted in offshore or multi-region clouds subject to sovereign transfer limits.'
    });
  }

  if (activeTriggers.has('large_scale_data')) {
    tags.push({
      id: 'large_scale_data',
      label: 'Significant Scale / Fiduciary',
      icon: '🏢',
      badgeClass: 'warning',
      description: 'High-volume or systemic personal data processing triggering heightened statutory duties.'
    });
  }

  if (activeTriggers.has('content_moderation')) {
    tags.push({
      id: 'content_moderation',
      label: 'Content Moderation & Synthetic Media',
      icon: '🎬',
      badgeClass: 'active',
      description: 'Automated platform moderation, deepfake detection, or synthetic media watermarking.'
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
    activeTriggers: activeTriggersArray,
    tags,
    jurisdictionsMentioned,
    negatedTriggers,
    confidenceScore,
    confidenceLevel,
    confidenceRationale,

    // Convenience booleans (backward compatible & extended)
    usesAi: activeTriggers.has('ai_decision'),
    employmentDomain: activeTriggers.has('employment'),
    personalData: activeTriggers.has('personal_data'),
    biometricData: activeTriggers.has('biometric'),
    healthDomain: activeTriggers.has('health'),
    autonomousAction: activeTriggers.has('autonomous_action'),
    childrenData: activeTriggers.has('children'),
    educationDomain: activeTriggers.has('education'),
    infrastructureDomain: activeTriggers.has('infrastructure'),
    financeCreditDomain: activeTriggers.has('finance_credit'),
    emotionBiometricDomain: activeTriggers.has('emotion_biometric'),
    lawEnforcementDomain: activeTriggers.has('law_enforcement'),
    crossBorderDomain: activeTriggers.has('cross_border'),
    largeScaleDomain: activeTriggers.has('large_scale_data'),
    contentModerationDomain: activeTriggers.has('content_moderation')
  };
}
