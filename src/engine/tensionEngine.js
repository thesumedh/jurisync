/**
 * Cross-Jurisdictional Regulatory Tension Engine
 * 
 * Analyzes multi-country statutory requirements to surface POTENTIAL friction points
 * and architectural divergences across international legal regimes.
 * 
 * Returns an ARRAY of all applicable tensions (not just the first one).
 * Multiple tensions can apply simultaneously (e.g., biometric + employment scenario).
 * 
 * NOTE: Output represents preliminary decision-support indicators for developer
 * and legal team review. It does NOT represent established legal conflict or a 
 * validated legal resolution. Exact statutory applicability and exceptions must be
 * verified by qualified legal counsel.
 */

/**
 * Detects all potential cross-border regulatory tensions for a given signal vector.
 * @param {object} signals - SignalVector from signalExtractor
 * @param {object} guidanceMap - { EU, IN, US }
 * @returns {Array<object>} Array of applicable tensions (may be empty)
 */
export function detectTensions(signals, guidanceMap) {
  const tensions = [];

  // Tension 1: Employment / HR AI Divergence
  // DPDP §8(7) statutory legal-compliance exception partially accommodates audit retention,
  // but applicability of the exception must be verified for each jurisdiction.
  if (signals.employmentDomain && signals.usesAi) {
    tensions.push({
      title: 'Potential Divergence for Review: Candidate Data Retention (US Audits) vs Erasure Mandates (India DPDP)',
      parties: 'India DPDP Act 2023 § 8(7) ✕ US NYC Local Law 144 § 20-870 / EEOC ✕ EU AI Act Annex III',
      summary:
        'Potential friction point between data retention and erasure mandates across jurisdictions. Under US NYC Local Law 144 and EEOC guidelines, employers frequently retain candidate scoring logs to enable annual independent bias audits. Conversely, India\'s DPDP Act § 8(7) mandates erasure of personal data once the recruitment purpose is satisfied — with a statutory exception for retention required by law, which may or may not accommodate bias-audit obligations depending on legal interpretation. The EU AI Act emphasises pre-market conformity documentation rather than relying primarily on post-hoc audit data.',
      developerGuidance:
        'Architectural Exploration for Legal Review: Development teams should flag this intersection for privacy and employment counsel. Engineering teams may explore separating direct applicant identifiers from aggregated, pseudonymised statistical scoring distributions. Whether bias-audit retention qualifies as the DPDP § 8(7) legal-compliance exception should be verified with qualified legal counsel familiar with both jurisdictions.'
    });
  }

  // Tension 2: Biometric Data Retention & Private Right of Action
  if (signals.biometricData) {
    tensions.push({
      title: 'Potential Divergence for Review: Statutory Damages (US BIPA) vs Special Category Processing (EU GDPR) vs Withdrawal Rights (India)',
      parties: 'US Illinois BIPA (740 ILCS 14/) ✕ EU GDPR Art. 9 & 35 ✕ India DPDP Act Sec. 6',
      summary:
        'Biometric processing triggers sharply differing enforcement regimes. US Illinois BIPA establishes strict liability with private rights of action for biometric capture without prior written release. EU GDPR Art. 9 treats biometric identification data as special category data requiring explicit exception or DPIA under Art. 35. India DPDP Section 6 stipulates that withdrawal of consent cannot penalise access to goods/services where processing is not strictly necessary.',
      developerGuidance:
        'Architectural Exploration for Legal Review: Evaluate isolating biometric feature extraction entirely to on-device hardware enclaves to avoid central cloud retention. Present standalone, unbundled consent disclosures separate from general service terms. Verify which state BIPA equivalents apply based on the geographic location of users.'
    });
  }

  // Tension 3: Children & Minor Protections
  if (signals.childrenData) {
    tensions.push({
      title: 'Potential Divergence for Review: Age Thresholds & Behavioral Tracking Restrictions (India DPDP vs US COPPA)',
      parties: 'India DPDP Act 2023 Sec. 9 ✕ US COPPA (15 U.S.C. § 6501 et seq.)',
      summary:
        'Divergence in age thresholds and permissible processing. India\'s DPDP Act defines children as individuals under 18 and prohibits behavioural monitoring, tracking, or targeted advertising (subject to government-notified exemptions under Sec. 9(4)). US COPPA defines children as under 13 and allows data processing with verifiable parental consent.',
      developerGuidance:
        'Architectural Exploration for Legal Review: Confirm the geographic deployment perimeter. If deploying globally without geo-fencing, consider adopting the most restrictive boundary (disabling telemetry and recommendation personalisation for all users under 18), unless covered by a government-notified DPDP exemption.'
    });
  }

  // Tension 4: Conversational AI & Data Training Use
  if (signals.usesAi && signals.personalData && !signals.employmentDomain) {
    tensions.push({
      title: 'Potential Divergence for Review: Purpose Limitation (EU GDPR) vs Algorithmic Disclosure (US FTC) vs Multi-Lingual Notice (India)',
      parties: 'EU GDPR Art. 5(1)(b) ✕ US FTC Act Section 5 ✕ India DPDP Act Sec. 5(3)',
      summary:
        'Using user prompts and conversational transcripts for secondary model training creates multi-jurisdiction compliance questions. EU GDPR strictly limits secondary processing beyond the initial interaction purpose without distinct legal grounds. The US FTC enforces against deceptive statements or undisclosed use of consumer data for model training. India DPDP requires itemised notices accessible in 22 constitutional languages.',
      developerGuidance:
        'Architectural Exploration for Legal Review: Decouple inference logging from training datasets. Implement an unbundled, affirmative opt-in toggle for secondary model improvements and provide multi-language transparency disclosures covering all 22 scheduled Indian languages.'
    });
  }

  return tensions;
}
