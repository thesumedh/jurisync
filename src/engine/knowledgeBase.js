/**
 * Compliance Knowledge Base Engine
 * Evaluates extracted signal vectors against curated statutory frameworks for EU, India, and the United States.
 */

/**
 * Evaluates European Union regulatory posture (EU AI Act & GDPR)
 * @param {object} signals - SignalVector from signalExtractor
 * @returns {object} EU Guidance object
 */
export function evaluateEU(signals) {
  let riskTier = 'MINIMAL RISK';
  let tierColor = 'tier-minimal';
  const findings = [];
  const suggestions = [];
  const citations = ['EU AI Act (Reg 2024/1689)', 'GDPR (Reg 2016/679)'];

  if (signals.employmentDomain && signals.usesAi) {
    riskTier = 'HIGH RISK';
    tierColor = 'tier-high';
    citations.push('AI Act Annex III (Point 4 - Employment)', 'GDPR Art. 22');
    findings.push(
      'Classified as a High-Risk AI System under Annex III, Point 4 of the EU AI Act (AI used in recruitment, selection, and evaluation of candidates/workers).'
    );
    if (signals.autonomousAction) {
      findings.push(
        'Solely automated rejection or scoring triggers GDPR Article 22 restrictions regarding automated decision-making with significant legal effects.'
      );
    }
    suggestions.push(
      'Implement a human-in-the-loop oversight dashboard allowing human HR staff to verify and override AI ranking recommendations before any rejection is communicated.'
    );
    suggestions.push(
      'Establish and maintain technical documentation, risk management logs, and data quality governance per EU AI Act Articles 9–14.'
    );
    suggestions.push(
      'Provide clear notification to job applicants that an AI system is utilized in evaluating their application.'
    );
  } else if (signals.biometricData) {
    riskTier = 'HIGH RISK';
    tierColor = 'tier-high';
    citations.push('GDPR Art. 9', 'GDPR Art. 35 (DPIA)');
    findings.push(
      'Biometric identification or facial embedding processing triggers GDPR Article 9 Special Category Data prohibitions unless explicit consent is secured.'
    );
    if (signals.usesAi) {
      findings.push(
        'AI-based biometric identification or categorization systems are subject to stringent conformity assessments under EU AI Act Chapter III.'
      );
    }
    suggestions.push(
      'Conduct a formal Data Protection Impact Assessment (DPIA) under GDPR Art. 35 prior to storing or processing biometric embeddings.'
    );
    suggestions.push(
      'Obtain explicit, granular consent for biometric processing decoupled from general service terms of service.'
    );
    suggestions.push(
      'Store biometric data encrypted at rest with hardware-backed KMS and ensure raw images are not kept longer than strictly necessary for verification.'
    );
  } else if (signals.healthDomain && signals.usesAi) {
    riskTier = 'HIGH RISK';
    tierColor = 'tier-high';
    citations.push('AI Act Annex III (Point 5)', 'GDPR Art. 9');
    findings.push(
      'Medical triage or diagnostic assistance systems operating autonomously are classified as high risk or regulated medical device software.'
    );
    suggestions.push(
      'Display unambiguous disclaimers that output is informational and does not constitute certified clinical diagnosis.'
    );
    suggestions.push(
      'Implement fail-safe routing to emergency services when high-acuity symptoms are detected.'
    );
  } else if (signals.usesAi && signals.personalData) {
    riskTier = 'SPECIFIC TRANSPARENCY RISK';
    tierColor = 'tier-limited';
    citations.push('AI Act Art. 50 (Transparency)', 'GDPR Art. 6');
    findings.push(
      'Interactive AI chatbot or RAG system triggers EU AI Act Article 50 transparency obligations: users must be clearly informed they are interacting with an AI.'
    );
    findings.push(
      'Processing user communications, chat history, or personal identifiers requires a clear GDPR Article 6 lawful basis (e.g. contract performance or legitimate interest).'
    );
    suggestions.push(
      'Expose a persistent visual indicator that responses are AI-generated, with a quick link to AI capability and limitation disclosures.'
    );
    suggestions.push(
      'Implement a strict purpose limitation and data retention schedule for conversation transcripts and RAG embedding indexes.'
    );
  } else if (signals.personalData) {
    riskTier = 'STANDARD GDPR COMPLIANCE';
    tierColor = 'tier-limited';
    citations.push('GDPR Art. 6', 'GDPR Art. 12-14');
    findings.push(
      'Collection and processing of personal data (PII) requires adherence to core GDPR principles: lawfulness, fairness, transparency, and data minimization.'
    );
    suggestions.push(
      'Provide comprehensive privacy notices at the point of data capture and implement user endpoints for data access and erasure (GDPR Art. 15 & 17).'
    );
  } else {
    findings.push(
      'Minimal regulatory risk detected under current EU AI Act definitions. Standard software due diligence, cybersecurity hygiene, and copyright rules apply.'
    );
    suggestions.push(
      'Follow voluntary codes of conduct and keep an architectural record of system dependencies.'
    );
  }

  return {
    jurisdiction: 'European Union',
    flag: '🇪🇺',
    primaryLaw: 'EU AI Act & GDPR',
    riskTier,
    tierColor,
    findings,
    suggestions,
    citations
  };
}

/**
 * Evaluates India regulatory posture (DPDP Act 2023)
 * @param {object} signals - SignalVector from signalExtractor
 * @returns {object} India Guidance object
 */
export function evaluateIndia(signals) {
  let riskTier = 'DATA FIDUCIARY OBLIGATIONS';
  let tierColor = 'tier-limited';
  const findings = [];
  const suggestions = [];
  const citations = ['DPDP Act 2023 (Act 22 of 2023)', 'MeitY AI Advisory 2024'];

  if (signals.childrenData) {
    riskTier = 'HIGH RISK / STRICT BARRIER';
    tierColor = 'tier-high';
    citations.push('DPDP Sec. 9 (Children)', 'DPDP Sec. 33 (Penalties up to ₹200 Cr)');
    findings.push(
      'Section 9 of India DPDP Act imposes an absolute prohibition on tracking, behavioral monitoring, or targeted advertising directed at children (under 18).'
    );
    findings.push(
      'Processing any child personal data requires verifiable parental consent in prescribed manner.'
    );
    suggestions.push(
      'Implement strict age-verification gate; immediately disable any tracking analytics or personalization cookies for minor accounts.'
    );
    suggestions.push(
      'Establish a dual-consent workflow verifying parent or lawful guardian identity before data ingestion.'
    );
  } else if (signals.employmentDomain && signals.personalData) {
    riskTier = 'SIGNIFICANT DATA FIDUCIARY CONSIDERATION';
    tierColor = 'tier-high';
    citations.push('DPDP Sec. 4-6 (Notice & Consent)', 'DPDP Sec. 8(7) (Erasure)', 'DPDP Sec. 10');
    findings.push(
      'Processing employee or candidate resumes constitutes personal data processing as a Data Fiduciary under the DPDP Act 2023.'
    );
    findings.push(
      'While "certain legitimate uses" exist under Section 7 for employment, recruitment screening typically requires clear, itemized notice and explicit consent.'
    );
    suggestions.push(
      'Deliver itemized notice in plain language outlining the specific recruitment purpose, categories of resume data collected, and candidate rights.'
    );
    suggestions.push(
      'Implement automated retention expiration: candidate data must be erased under Section 8(7) once the specific recruitment cycle concludes, unless consent is renewed.'
    );
    suggestions.push(
      'Designate a Data Protection Officer (DPO) and local grievance redressal mechanism with an Indian point of contact.'
    );
  } else if (signals.biometricData) {
    riskTier = 'HIGH RISK / SPECIAL NOTICE';
    tierColor = 'tier-high';
    citations.push('DPDP Sec. 6 (Unconditional Consent)', 'DPDP Sec. 8(5) (Security)');
    findings.push(
      'Biometric face images and embeddings require granular, unconditional consent. Withdrawal of consent cannot restrict access to essential non-biometric services.'
    );
    suggestions.push(
      'Provide a simple, zero-friction consent revocation API that purges biometric templates within 72 hours of user request.'
    );
    suggestions.push(
      'Deploy strict technical safeguards (end-to-end encryption, segregated VPC storage) to prevent unauthorized access or biometric data breaches.'
    );
  } else if (signals.usesAi || signals.personalData) {
    riskTier = 'STANDARD DATA FIDUCIARY';
    tierColor = 'tier-limited';
    citations.push('DPDP Sec. 5 (Notice)', 'DPDP Sec. 6 (Consent)', 'DPDP Sec. 12 (Grievance)');
    findings.push(
      'System acts as a Data Fiduciary. Notice must be offered in English and any of the 22 languages specified in the Eighth Schedule of the Indian Constitution.'
    );
    if (signals.usesAi) {
      findings.push(
        'MeitY AI advisories require transparent labeling of synthetic or AI-generated output to prevent misinformation and deepfakes.'
      );
    }
    suggestions.push(
      'Build localized consent notices supporting multi-lingual toggle with clear description of goods/services.'
    );
    suggestions.push(
      'Publish a prominent Data Protection Contact / Grievance Officer details on the web portal or app settings.'
    );
    suggestions.push(
      'Label all AI responses with clear metadata tags indicating AI model origin.'
    );
  } else {
    riskTier = 'BASELINE DIGITAL COMPLIANCE';
    tierColor = 'tier-minimal';
    citations.push('IT Act 2000', 'IT Rules 2021');
    findings.push(
      'No personal data triggers detected under DPDP Act 2023 definitions. General Information Technology Act and intermediary guidelines apply.'
    );
    suggestions.push(
      'Ensure standard terms of service and acceptable use policies are displayed.'
    );
  }

  return {
    jurisdiction: 'India',
    flag: '🇮🇳',
    primaryLaw: 'DPDP Act 2023 & MeitY Advisory',
    riskTier,
    tierColor,
    findings,
    suggestions,
    citations
  };
}

/**
 * Evaluates United States regulatory posture (NIST AI RMF, FTC, State Laws)
 * @param {object} signals - SignalVector from signalExtractor
 * @returns {object} US Guidance object
 */
export function evaluateUS(signals) {
  let riskTier = 'VOLUNTARY / SECTORAL';
  let tierColor = 'tier-minimal';
  const findings = [];
  const suggestions = [];
  const citations = ['NIST AI RMF 1.0', 'FTC Act Section 5'];

  if (signals.employmentDomain && signals.usesAi) {
    riskTier = 'MANDATORY LOCAL AUDIT / HIGH SCRUTINY';
    tierColor = 'tier-high';
    citations.push('NYC Local Law 144', 'EEOC AI Guidance', 'NIST AI RMF (Measure 2.5)');
    findings.push(
      'Automated Employment Decision Tools (AEDT) face direct statutory regulation under NYC Local Law 144, requiring annual independent bias audits before deployment.'
    );
    findings.push(
      'EEOC actively enforces Title VII against algorithms causing disparate impact in candidate screening across protected classes.'
    );
    suggestions.push(
      'Engage an independent auditor to publish annual summary audit metrics calculating selection rates across race/ethnicity and gender categories.'
    );
    suggestions.push(
      'Provide candidates with at least 10 business days advance notice prior to AEDT screening, with an option to request an alternative evaluation process.'
    );
    suggestions.push(
      'Align algorithmic pipeline with NIST AI RMF "Measure" function: benchmark accuracy, false-positive disparity, and drift telemetry.'
    );
  } else if (signals.biometricData) {
    riskTier = 'STRICT STATUTORY LIABILITY';
    tierColor = 'tier-high';
    citations.push('Illinois BIPA (740 ILCS 14/)', 'Texas CUBI', 'FTC Biometric Policy');
    findings.push(
      'Illinois Biometric Information Privacy Act (BIPA) establishes statutory damages ($1,000–$5,000 per violation) for capturing biometric identifiers without prior written release.'
    );
    findings.push(
      'FTC 2023 Policy Statement on Biometrics warns against deceptive marketing of facial recognition accuracy or unauthorized biometric training.'
    );
    suggestions.push(
      'Obtain an explicit, written biometric release from users prior to capturing face photos or generating facial embeddings.'
    );
    suggestions.push(
      'Publish a publicly available written policy establishing a permanent biometric retention schedule and guidelines for permanent destruction within 3 years.'
    );
  } else if (signals.usesAi) {
    riskTier = 'FTC SCRUTINY & NIST RMF ALIGNMENT';
    tierColor = 'tier-limited';
    citations.push('FTC Act Sec. 5 (Unfair/Deceptive Practices)', 'NIST AI RMF (Govern 1.1, Map 1.2)');
    findings.push(
      'The Federal Trade Commission (FTC) enforces strict truth-in-advertising regarding AI capabilities, algorithmic hallucinations, and undisclosed training on user data.'
    );
    suggestions.push(
      'Avoid overpromising AI capabilities in UI copy (e.g. claim "AI Assistant" rather than "100% Guaranteed Expert Advice").'
    );
    suggestions.push(
      'Publish an AI Transparency Card detailing model architecture, known error modes, and acceptable use boundaries (NIST AI RMF Map function).'
    );
    suggestions.push(
      'Implement model guardrails and content filters to mitigate toxic or defamatory hallucinations.'
    );
  } else if (signals.personalData) {
    riskTier = 'STATE CONSUMER PRIVACY (CCPA/CPRA)';
    tierColor = 'tier-limited';
    citations.push('California CPRA', 'Virginia VCDPA', 'Colorado CPA');
    findings.push(
      'Multi-state consumer privacy statutes grant residents rights to opt-out of data sale/sharing and automated profiling.'
    );
    suggestions.push(
      'Implement a "Do Not Sell or Share My Personal Information" mechanism and honor Global Privacy Control (GPC) browser signals.'
    );
  } else {
    findings.push(
      'No critical sectoral AI triggers identified. General commercial software warranties and cybersecurity best practices apply.'
    );
    suggestions.push(
      'Adopt NIST AI RMF "Govern" principles for baseline organizational AI accountability.'
    );
  }

  return {
    jurisdiction: 'United States',
    flag: '🇺🇸',
    primaryLaw: 'NIST AI RMF 1.0 & Sectoral / State Laws',
    riskTier,
    tierColor,
    findings,
    suggestions,
    citations
  };
}

/**
 * Evaluates all jurisdictions for a given signal vector
 * @param {object} signals
 * @returns {object} Map of EU, IN, US guidance objects
 */
export function evaluateAllJurisdictions(signals) {
  return {
    EU: evaluateEU(signals),
    IN: evaluateIndia(signals),
    US: evaluateUS(signals)
  };
}
