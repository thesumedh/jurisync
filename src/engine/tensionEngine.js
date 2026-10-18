/**
 * Cross-Jurisdictional Tension Engine
 * Analyzes multi-country obligations to surface real friction points,
 * regulatory divergences, and architectural dilemmas across international regimes.
 */

/**
 * Detects cross-border regulatory tensions for a given signal vector
 * @param {object} signals - SignalVector
 * @param {object} guidanceMap - { EU, IN, US }
 * @returns {object|null} Regulatory tension details or null if no conflict
 */
export function detectTensions(signals, guidanceMap) {
  // Tension 1: Employment / HR AI Divergence
  if (signals.employmentDomain && signals.usesAi) {
    return {
      title: 'Divergence: Retrospective Bias Audits (US) vs Data Erasure Mandates (India) vs Ex-Ante Conformity (EU)',
      parties: 'EU AI Act (Annex III) ✕ US NYC LL144 & EEOC ✕ India DPDP Act Sec. 8(7)',
      summary:
        'Under US NYC Local Law 144 and EEOC guidance, developers must retain candidate scoring data to conduct annual statistical bias audits. However, India\'s DPDP Act Section 8(7) requires immediate data erasure once recruitment concludes. Furthermore, EU AI Act mandates ex-ante conformity documentation before deployment rather than US post-hoc audit remedies.',
      developerGuidance:
        'Dual-Path Architecture: Strip and purge all direct PII (names, contact info) upon candidate rejection per India DPDP, while storing a cryptographically anonymized, feature-only telemetry log in a compliance enclave to support US annual bias auditing and EU AI Act technical documentation.'
    };
  }

  // Tension 2: Biometric Data Retention & Private Right of Action
  if (signals.biometricData) {
    return {
      title: 'Divergence: Strict Statutory Damages (US BIPA) vs Special Category Processing (EU GDPR) vs Unconditional Withdrawal (India)',
      parties: 'US Illinois BIPA ✕ EU GDPR Art. 9 ✕ India DPDP Sec. 6',
      summary:
        'US BIPA exposes developers to uncapped statutory damages ($1,000–$5,000 per violation) for biometric collection without written prior release. EU GDPR Art. 9 treats biometrics as special category data requiring DPIA and strict cross-border transfer mechanisms. India DPDP Section 6 mandates that withdrawal of consent cannot penalize access to core non-biometric services.',
      developerGuidance:
        'Implement an explicit, standalone written consent modal completely detached from generic Terms of Service. Provide an instant non-biometric alternative workflow (e.g. standard PIN or manual verification) to satisfy DPDP Section 6, and restrict raw biometric images to on-device hardware enclaves.'
    };
  }

  // Tension 3: Children & Minor Protections
  if (signals.childrenData) {
    return {
      title: 'Divergence: Absolute Behavioral Tracking Ban (India DPDP) vs Age Threshold Discrepancy (US COPPA)',
      parties: 'India DPDP Sec. 9 ✕ US COPPA (15 U.S.C. 6501)',
      summary:
        'India\'s DPDP Act establishes a strict age threshold of 18 and outright bans any behavioral monitoring, tracking, or targeted advertising for children. US COPPA sets the threshold at 13 and permits processing subject to verifiable parental consent.',
      developerGuidance:
        'Adopt the most stringent international standard: disable all behavioral telemetry, tracking cookies, and recommendation personalization for any user under 18 globally.'
    };
  }

  // Tension 4: Conversational AI & Data Training Use
  if (signals.usesAi && signals.personalData) {
    return {
      title: 'Divergence: Purpose Limitation (EU GDPR) vs Commercial Retraining (US FTC Scrutiny) vs Multi-Lingual Notice (India)',
      parties: 'EU GDPR Art. 5(1)(b) ✕ US FTC Sec. 5 ✕ India DPDP Sec. 5',
      summary:
        'Using customer chat transcripts to train or fine-tune models violates GDPR purpose limitation unless explicit separate consent was granted. The US FTC aggressively penalizes deceptive omissions regarding whether user data trains algorithms. India DPDP requires notices in 22 constitutional languages.',
      developerGuidance:
        'Decouple chat inference data retention from model training. Add an explicit opt-in toggle: "Allow anonymized transcripts to improve model quality", and build localized consent UI.'
    };
  }

  return null;
}
