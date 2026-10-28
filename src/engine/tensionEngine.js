/**
 * Cross-Jurisdictional Regulatory Tension Engine (v2.0)
 * 
 * Analyzes multi-country statutory requirements to surface concrete friction points,
 * regulatory divergences, and architectural dilemmas across international legal regimes.
 * 
 * Returns an ARRAY of all applicable tensions with severity ratings, likelihood,
 * statutory citations, and concrete engineering mitigations.
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

  // Tension 1: Candidate Data Retention (US Audits) vs Erasure Mandate (India DPDP)
  if (signals.employmentDomain && signals.usesAi) {
    tensions.push({
      id: 'candidate_retention_vs_erasure',
      title: 'Potential Divergence for Review: Candidate Data Retention (US Audits) vs Erasure Mandates (India DPDP)',
      severity: 'HIGH',
      likelihood: 'HIGH',
      impactDomain: 'Employment / HR AI & Workforce Analytics',
      parties: 'India DPDP Act 2023 § 8(7) ✕ US NYC Local Law 144 § 20-870 / EEOC ✕ EU AI Act Annex III & GDPR Art. 17',
      summary:
        'Potential friction point between data retention and erasure mandates across jurisdictions. Under US NYC Local Law 144 and EEOC guidelines, employers using Automated Employment Decision Tools (AEDTs) frequently retain candidate scoring logs, applicant demographic distribution data, and evaluation history to conduct mandatory annual independent bias audits. Conversely, India\'s DPDP Act § 8(7) mandates erasure of personal data once the recruitment purpose is satisfied — with a statutory exception for retention required by law, which may or may not accommodate foreign municipal bias-audit obligations depending on legal interpretation. The EU AI Act prioritizes pre-market technical conformity documentation and risk management records under Chapter III.',
      architecturalGuidance:
        'Architectural Exploration for Legal Review: Development teams should flag this intersection for privacy and employment counsel. Engineering teams should decouple direct applicant identifiers (names, emails, contact info) from aggregated, pseudonymized statistical scoring distributions. Store decoupled statistical logs in an immutable, read-only audit vault with automated TTL purge of underlying resumes. Verify with counsel whether foreign bias-audit retention qualifies under the DPDP § 8(7) legal-compliance exception.',
      developerGuidance:
        'Architectural Exploration for Legal Review: Development teams should flag this intersection for privacy and employment counsel. Engineering teams may explore separating direct applicant identifiers from aggregated, pseudonymised statistical scoring distributions. Whether bias-audit retention qualifies as the DPDP § 8(7) legal-compliance exception should be verified with qualified legal counsel familiar with both jurisdictions.'
    });
  }

  // Tension 2: Model Training Disgorgement vs Continuous Post-Market Traceability
  if (signals.usesAi && (signals.personalData || signals.biometricData || signals.contentModerationDomain)) {
    tensions.push({
      id: 'algorithmic_disgorgement_vs_traceability',
      title: 'Potential Divergence for Review: Algorithmic Disgorgement (US FTC) vs Post-Market Traceability (EU AI Act)',
      severity: 'CRITICAL',
      likelihood: 'MEDIUM',
      impactDomain: 'AI Model Weights & Training Data Lineage',
      parties: 'US FTC Act Section 5 Enforcement Precedents ✕ EU AI Act (Articles 12 & 72) ✕ India DPDP Act § 8(5)',
      summary:
        'Irreversible tension between US algorithmic disgorgement remedies and EU regulatory audit continuity. In landmark enforcement orders (Everalbum, Kurbo, Rite Aid), the US FTC has ordered companies to permanently destroy AI models, weights, embeddings, and algorithms trained on improperly collected or deceptive consumer data. Conversely, the EU AI Act mandates continuous technical documentation, automatic event logging, and full version traceability over the entire operational lifecycle (Articles 12, 14, and 72). Deleting model weights or embeddings without maintaining lineage records can invalidate EU conformity certificates.',
      architecturalGuidance:
        'Architectural Exploration for Legal Review: Implement modular parameter architectures (e.g. LoRA adapters or decoupled RAG vector stores) rather than monolithic fine-tuned models. Maintain a cryptographically signed Data Lineage Manifest tracing training data provenance. If disgorgement is required or consent is revoked, engineering can prune and retrain specific parameter subsets or re-index vector collections without destroying base models or violating EU audit trails.',
      developerGuidance:
        'Architectural Exploration for Legal Review: Implement modular parameter architectures (e.g. LoRA adapters or decoupled RAG vector stores) rather than monolithic fine-tuned models. Maintain a cryptographically signed Data Lineage Manifest tracing training data provenance.'
    });
  }

  // Tension 3: Biometric Data Statutory Damages vs Unbundled Consent & Special Category Processing
  if (signals.biometricData) {
    tensions.push({
      id: 'biometric_damages_vs_unbundled_consent',
      title: 'Potential Divergence for Review: Statutory Damages (US BIPA) vs Special Category Processing (EU GDPR) vs Withdrawal Rights (India)',
      severity: 'CRITICAL',
      likelihood: 'HIGH',
      impactDomain: 'Biometric Identification & Computer Vision',
      parties: 'US Illinois BIPA (740 ILCS 14/ & 2024 SB 2979) ✕ EU GDPR Art. 9 & 35 ✕ India DPDP Act Sec. 6',
      summary:
        'Biometric processing triggers sharply differing enforcement regimes. US Illinois BIPA establishes strict liability with private rights of action for biometric capture without prior written release, with statutory liquidated damages of $1,000–$5,000 per violation (amended in 2024 under SB 2979 to per-person scan caps). EU GDPR Art. 9 treats biometric identification data as special category data requiring explicit exception and mandatory DPIA under Art. 35. India DPDP Section 6 stipulates that withdrawal of consent cannot penalize access to goods/services where processing is not strictly necessary.',
      architecturalGuidance:
        'Architectural Exploration for Legal Review: Evaluate isolating biometric feature extraction entirely to on-device hardware enclaves (e.g. client-side FaceID or local WebAssembly) so raw templates never transit to central cloud databases. Present standalone, unbundled written consent disclosures prior to camera activation. Provide a simple, zero-friction consent revocation API that purges biometric embeddings within 72 hours.',
      developerGuidance:
        'Architectural Exploration for Legal Review: Evaluate isolating biometric feature extraction entirely to on-device hardware enclaves to avoid central cloud retention. Present standalone, unbundled consent disclosures separate from general service terms. Verify which state BIPA equivalents apply based on the geographic location of users.'
    });
  }

  // Tension 4: Minor Protection Age Boundaries & Tracking Bans
  if (signals.childrenData || signals.educationDomain) {
    tensions.push({
      id: 'minor_tracking_ban_vs_commercial_consent',
      title: 'Potential Divergence for Review: Age Thresholds & Behavioral Tracking Restrictions (India DPDP vs US COPPA)',
      severity: 'HIGH',
      likelihood: 'HIGH',
      impactDomain: 'Children & Minor Data / Educational Technology',
      parties: 'India DPDP Act 2023 Sec. 9 ✕ US COPPA (15 U.S.C. § 6501 et seq.) ✕ EU GDPR Art. 8',
      summary:
        'Divergence in age thresholds and permissible processing. India\'s DPDP Act defines children as individuals under 18 and categorically prohibits behavioral monitoring, tracking, or targeted advertising (subject to government-notified exemptions under Sec. 9(4)), carrying statutory penalties up to ₹200 crore. US COPPA defines children as under 13 and allows data processing and analytics with verifiable commercial parental consent. EU GDPR sets member state thresholds between 13 and 16.',
      architecturalGuidance:
        'Architectural Exploration for Legal Review: Confirm the geographic deployment perimeter. If deploying globally without geo-fencing, adopt the most restrictive boundary (India DPDP Sec. 9): disable all telemetry, recommendation personalization, clickstream tracking, and targeted profiling for all users under 18. Build dual-consent verification workflows for minor onboarding.',
      developerGuidance:
        'Architectural Exploration for Legal Review: Confirm the geographic deployment perimeter. If deploying globally without geo-fencing, consider adopting the most restrictive boundary (disabling telemetry and recommendation personalisation for all users under 18), unless covered by a government-notified DPDP exemption.'
    });
  }

  // Tension 5: Cross-Border Sovereign Localization vs Global Distributed LLM Routing
  if (signals.crossBorderDomain || signals.financeCreditDomain || (signals.personalData && (signals.jurisdictionsMentioned.length > 1 || signals.largeScaleDomain))) {
    tensions.push({
      id: 'cross_border_localization_vs_distributed_cloud',
      title: 'Potential Divergence for Review: Sovereign Cloud Data Localization vs Global Multi-Region LLM Hosting',
      severity: 'HIGH',
      likelihood: 'MEDIUM',
      impactDomain: 'Cloud Infrastructure & Data Sovereignty',
      parties: 'India DPDP § 16 & RBI Digital Lending Mandates ✕ EU GDPR Chapter V (Schrems II) ✕ US CLOUD Act',
      summary:
        'Direct tension between multi-region frontier AI inference architectures and sovereign data residency mandates. India DPDP Section 16 empowers the Central Government to restrict transfers to notified foreign territories, while RBI digital lending guidelines strictly require borrower records to reside on servers located within India. EU GDPR Chapter V limits transfers to third countries without valid Adequacy Decisions or SCCs that protect against US CLOUD Act extraterritorial surveillance. Routing personal queries to US-hosted frontier LLM endpoints can create cross-border non-compliance.',
      architecturalGuidance:
        'Architectural Exploration for Legal Review: Partition system architecture into sovereign regional enclaves: store customer data, PII, and vector embeddings in domestic cloud regions (e.g. AWS ap-south-1 Mumbai for India, eu-central-1 Frankfurt for EU). For LLM inference, use dedicated regional enterprise endpoints with Zero Data Retention (ZDR) guarantees or deploy private, self-hosted open-weights models in sovereign VPCs.',
      developerGuidance:
        'Architectural Exploration for Legal Review: Partition system architecture into sovereign regional enclaves: store customer data, PII, and vector embeddings in domestic cloud regions. For LLM inference, use dedicated regional enterprise endpoints with Zero Data Retention guarantees.'
    });
  }

  // Tension 6: Automated Decision-Making Opt-Out vs Real-Time Algorithmic Execution
  if (signals.autonomousAction && (signals.financeCreditDomain || signals.employmentDomain || signals.personalData)) {
    tensions.push({
      id: 'automated_decision_optout_vs_realtime_inference',
      title: 'Potential Divergence for Review: Automated Decision Opt-Out (California CPRA & GDPR Art. 22) vs Real-Time Autonomous Inference',
      severity: 'MEDIUM',
      likelihood: 'HIGH',
      impactDomain: 'Autonomous Decision-Making & Consumer Profiling',
      parties: 'California CPRA (Cal. Civ. Code § 1798.185) ✕ EU GDPR Article 22 ✕ US Federal Baseline',
      summary:
        'Operational friction between low-latency autonomous algorithmic execution and statutory consumer opt-out mandates. Under California CPRA and draft CPPA regulations, consumers have explicit rights to opt out of Automated Decisionmaking Technology (ADMT) profiling concerning employment, credit, healthcare, or personal traits, with mandatory pre-use notices. EU GDPR Article 22 grants data subjects the right not to be subject to solely automated decisions having legal effects. Fully autonomous scoring or decision pipelines face operational stalling if human review queues are not provisioned.',
      architecturalGuidance:
        'Architectural Exploration for Legal Review: Implement an automated fallback tier: when a California or EU consumer opts out of automated decision-making, route the transaction to a deterministic heuristics queue or synchronous human review dashboard with explainability telemetry. Never present an automated rejection without offering a path for human review verification.',
      developerGuidance:
        'Architectural Exploration for Legal Review: Implement an automated fallback tier: when a California or EU consumer opts out of automated decision-making, route the transaction to a deterministic heuristics queue or synchronous human review dashboard.'
    });
  }

  return tensions;
}
