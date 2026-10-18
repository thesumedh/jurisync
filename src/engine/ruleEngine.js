/**
 * Curated Rule Engine
 * Evaluates detected signals against the traceable JSON rule library (rules.json).
 */

import { RULES } from '../data/rules.js';

/**
 * Evaluates matched rules from the curated library for the active signals
 * @param {object} signalVector - Result from signalExtractor
 * @returns {object} Grouped findings by jurisdiction { EU: [], IN: [], US: [] }
 */
export function evaluateRules(signalVector) {
  const activeTriggerSet = new Set(signalVector.activeTriggers || []);

  const matchedRules = RULES.filter(rule => {
    // A rule matches if every required trigger is in activeTriggerSet
    return rule.triggers.every(trig => activeTriggerSet.has(trig));
  });

  const grouped = {
    EU: [],
    IN: [],
    US: []
  };

  matchedRules.forEach(rule => {
    if (grouped[rule.jurisdiction]) {
      grouped[rule.jurisdiction].push(rule);
    }
  });

  // Provide fallback baseline for jurisdictions with 0 matched rules
  if (grouped.EU.length === 0) {
    grouped.EU.push({
      id: "eu_baseline_minimal",
      triggers: [],
      jurisdiction: "EU",
      status: "binding",
      instrument: "EU AI Act & GDPR",
      finding: "No high-risk Annex III or transparency triggers identified under current EU AI Act thresholds. General GDPR data protection principles apply if personal data is later collected.",
      recommendation: "Ensure general software due diligence and cybersecurity measures per EU NIS2 Directive.",
      action: "Document system boundary and monitor for additions of personal data or automated decision pipelines.",
      source_url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689",
      source_note: "EU AI Act Title I (General Provisions) & Chapter I"
    });
  }

  if (grouped.IN.length === 0) {
    grouped.IN.push({
      id: "in_baseline_minimal",
      triggers: [],
      jurisdiction: "IN",
      status: "binding",
      instrument: "Information Technology Act 2000 & DPDP Act 2023",
      finding: "No specific personal data processing or children's tracking triggers identified under India DPDP Act definitions.",
      recommendation: "Follow standard intermediary guidelines and cybersecurity compliance as per CERT-In directives.",
      action: "Maintain standard terms of service and acceptable use policies.",
      source_url: "https://www.meity.gov.in/content/digital-personal-data-protection-act-2023",
      source_note: "DPDP Act 2023 Chapter II & IT Act 2000"
    });
  }

  if (grouped.US.length === 0) {
    grouped.US.push({
      id: "us_baseline_minimal",
      triggers: [],
      jurisdiction: "US",
      status: "voluntary",
      instrument: "NIST AI Risk Management Framework 1.0",
      finding: "No mandatory federal AI licensing required for this classification. Standard commercial warranties and state consumer protections apply.",
      recommendation: "Adopt baseline NIST AI RMF 'Govern' core principles to track algorithmic inventory and accountability.",
      action: "Establish internal organizational governance regarding acceptable AI software development practices.",
      source_url: "https://www.nist.gov/itl/ai-risk-management-framework",
      source_note: "NIST AI RMF 1.0 Govern Function (GOVERN 1.1)"
    });
  }

  return {
    EU: {
      jurisdiction: 'European Union',
      flag: '🇪🇺',
      primaryLaw: 'EU AI Act & GDPR',
      hasBinding: grouped.EU.some(r => r.status === 'binding'),
      rules: grouped.EU
    },
    IN: {
      jurisdiction: 'India',
      flag: '🇮🇳',
      primaryLaw: 'DPDP Act 2023',
      hasBinding: grouped.IN.some(r => r.status === 'binding'),
      rules: grouped.IN
    },
    US: {
      jurisdiction: 'United States',
      flag: '🇺🇸',
      primaryLaw: 'NIST AI RMF 1.0 & State Laws',
      hasBinding: grouped.US.some(r => r.status === 'binding'),
      rules: grouped.US
    }
  };
}
