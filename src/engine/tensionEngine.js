/**
 * Cross-Jurisdictional Regulatory Tension Engine
 * 
 * Analyzes multi-country statutory requirements to surface POTENTIAL friction points
 * and architectural divergences across international legal regimes.
 * 
 * NOTE: Output represents preliminary decision-support indicators for developer
 * and legal team review. It does NOT represent established legal conflict or a 
 * validated legal resolution. Exact statutory applicability and exceptions must be
 * verified by qualified legal counsel.
 */

/**
 * Detects potential cross-border regulatory tensions for a given signal vector
 * @param {object} signals - SignalVector
 * @param {object} guidanceMap - { EU, IN, US }
 * @returns {object|null} Potential regulatory tension details or null if none flagged
 */
export function detectTensions(signals, guidanceMap) {
  // Tension 1: Employment / HR AI Divergence
  if (signals.employmentDomain && signals.usesAi) {
    return {
      title: 'Potential Divergence for Review: Candidate Data Retention (US Audits) vs Erasure Mandates (India DPDP)',
      parties: 'India DPDP Act 2023 § 8(7) ✕ US NYC Local Law 144 § 20-870 / EEOC ✕ EU AI Act Annex III',
      summary:
        'Potential friction point between data retention and erasure mandates across jurisdictions. Under US NYC Local Law 144 and EEOC guidelines, employers frequently retain candidate scoring logs to verify annual independent bias audits. Conversely, India\'s DPDP Act § 8(7) mandates erasure of personal data once the recruitment purpose is satisfied (subject to statutory exemptions). Meanwhile, the EU AI Act emphasizes pre-market conformity documentation for high-risk employment systems rather than relying primarily on post-hoc audit data.',
      developerGuidance:
        'Architectural Exploration for Legal Review: Development teams should flag this intersection for privacy and employment counsel. Engineering teams may explore separating direct applicant identifiers from aggregated, pseudonymized statistical scoring distributions, while verifying whether foreign local law compliance qualifies under DPDP statutory retention exceptions.'
    };
  }

  // Tension 2: Biometric Data Retention & Private Right of Action
  if (signals.biometricData) {
    return {
      title: 'Potential Divergence for Review: Statutory Damages (US BIPA) vs Special Category Processing (EU GDPR) vs Withdrawal Rights (India)',
      parties: 'US Illinois BIPA (740 ILCS 14/) ✕ EU GDPR Art. 9 & 35 ✕ India DPDP Act Sec. 6',
      summary:
        'Biometric processing triggers sharply differing enforcement regimes. US Illinois BIPA establishes strict liability with private rights of action for biometric capture without prior written release. EU GDPR Art. 9 treats biometric identification data as special category data requiring explicit exception or DPIA under Art. 35. India DPDP Section 6 stipulates that withdrawal of consent cannot penalize access to goods/services where processing is not strictly necessary.',
      developerGuidance:
        'Architectural Exploration for Legal Review: Evaluate isolating biometric feature extraction entirely to on-device hardware enclaves to avoid central cloud retention. Present standalone, unbundled consent disclosures separate from general service terms.'
    };
  }

  // Tension 3: Children & Minor Protections
  if (signals.childrenData) {
    return {
      title: 'Potential Divergence for Review: Age Thresholds & Behavioral Tracking Restrictions (India DPDP vs US COPPA)',
      parties: 'India DPDP Act 2023 Sec. 9 ✕ US COPPA (15 U.S.C. § 6501 et seq.)',
      summary:
        'Divergence in age thresholds and permissible processing. India\'s DPDP Act defines children as individuals under 18 and strictly prohibits behavioral monitoring, tracking, or targeted advertising. US COPPA defines children as under 13 and allows data processing with verifiable parental consent.',
      developerGuidance:
        'Architectural Exploration for Legal Review: Confirm the geographic deployment perimeter. If deploying globally without geo-fencing, consider adopting the most restrictive boundary (disabling telemetry and recommendation personalization for all users under 18).'
    };
  }

  // Tension 4: Conversational AI & Data Training Use
  if (signals.usesAi && signals.personalData) {
    return {
      title: 'Potential Divergence for Review: Purpose Limitation (EU GDPR) vs Algorithmic Disclosure (US FTC) vs Multi-Lingual Notice (India)',
      parties: 'EU GDPR Art. 5(1)(b) ✕ US FTC Act Section 5 ✕ India DPDP Act Sec. 5(3)',
      summary:
        'Using user prompts and conversational transcripts for secondary model training creates multi-jurisdiction compliance questions. EU GDPR strictly limits secondary processing beyond the initial interaction purpose without distinct legal grounds. The US FTC enforces against deceptive statements or undisclosed use of consumer data for model training. India DPDP requires itemized notices accessible in 22 constitutional languages.',
      developerGuidance:
        'Architectural Exploration for Legal Review: Decouple inference logging from training datasets. Implement an unbundled, affirmative opt-in toggle for secondary model improvements and provide multi-language transparency disclosures.'
    };
  }

  return null;
}
