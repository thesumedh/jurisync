/**
 * Central Orchestration Pipeline
 * Composes signal extraction, JSON rule library evaluation,
 * cross-border tension detection, and markdown developer checklist generation.
 */

import { extractSignals } from './signalExtractor.js';
import { evaluateRules } from './ruleEngine.js';
import { detectTensions } from './tensionEngine.js';

export const MANDATORY_LEGAL_DISCLAIMER =
  "Illustrative output for development support only. Not a verified legal assessment. Exact applicability depends on the specific system and current law.";

/**
 * Generates an actionable Markdown checklist from matched rules and tensions array.
 * @param {string} query
 * @param {object} guidance
 * @param {Array<object>} tensions - Array of detected tensions (may be empty)
 * @returns {string} Markdown checklist
 */
export function generateChecklistMarkdown(query, guidance, tensions) {
  let md = `# JuriSync Developer Compliance Checklist\n\n`;
  md += `> Feature Description: "${query}"\n\n`;

  md += `## 📋 Core Architectural Tasks\n`;
  md += `- [ ] Document intended use and affected users\n`;
  md += `- [ ] Review data handling and retention\n`;
  md += `- [ ] Test for bias and document human review\n`;
  md += `- [ ] Verify each recommendation against its cited source\n\n`;

  if (tensions && tensions.length > 0) {
    md += `## ⚠️ Potential Cross-Jurisdictional Divergences for Review\n`;
    tensions.forEach(tension => {
      md += `### ${tension.title}\n`;
      md += `*Parties:* ${tension.parties}\n\n`;
      md += `*Architectural Exploration for Legal Review:* ${tension.developerGuidance}\n\n`;
    });
  }

  // European Union
  md += `## 🇪🇺 European Union (EU AI Act & GDPR)\n`;
  guidance.EU.rules.forEach(rule => {
    const statusLabel = rule.status === 'binding' ? '[BINDING LEGISLATION]' : '[VOLUNTARY GUIDANCE]';
    md += `### ${statusLabel} ${rule.instrument}\n`;
    md += `*Finding:* ${rule.finding}\n\n`;
    md += `*Recommendation:* ${rule.recommendation}\n\n`;
    md += `- [ ] **Action:** ${rule.action}\n`;
    md += `  *Source:* [${rule.source_note}](${rule.source_url})\n\n`;
  });

  // India
  md += `## 🇮🇳 India (DPDP Act 2023)\n`;
  guidance.IN.rules.forEach(rule => {
    const statusLabel = rule.status === 'binding' ? '[BINDING LEGISLATION]' : '[VOLUNTARY GUIDANCE]';
    md += `### ${statusLabel} ${rule.instrument}\n`;
    md += `*Finding:* ${rule.finding}\n\n`;
    md += `*Recommendation:* ${rule.recommendation}\n\n`;
    md += `- [ ] **Action:** ${rule.action}\n`;
    md += `  *Source:* [${rule.source_note}](${rule.source_url})\n\n`;
  });

  // United States
  md += `## 🇺🇸 United States (NIST AI RMF 1.0 & State Laws)\n`;
  guidance.US.rules.forEach(rule => {
    const statusLabel = rule.status === 'binding' ? '[BINDING LEGISLATION]' : '[VOLUNTARY GUIDANCE]';
    md += `### ${statusLabel} ${rule.instrument}\n`;
    md += `*Finding:* ${rule.finding}\n\n`;
    md += `*Recommendation:* ${rule.recommendation}\n\n`;
    md += `- [ ] **Action:** ${rule.action}\n`;
    md += `  *Source:* [${rule.source_note}](${rule.source_url})\n\n`;
  });

  md += `---\n`;
  md += `**Disclaimer:** *${MANDATORY_LEGAL_DISCLAIMER}*\n`;
  return md;
}

/**
 * Orchestrates full compliance analysis for a natural language feature description.
 * @param {string} text - Natural language query
 * @returns {object} Complete compliance report
 */
export function orchestrateCompliance(text) {
  const query = text ? text.trim() : '';
  const signals = extractSignals(query);
  const guidance = evaluateRules(signals);
  const tensions = detectTensions(signals, guidance);
  const checklist = generateChecklistMarkdown(query, guidance, tensions);

  return {
    timestamp: new Date().toISOString(),
    query,
    signals,
    guidance,
    tensions,                          // Full array of all applicable tensions
    tension: tensions[0] || null,      // First tension (backward compatibility)
    checklist,
    disclaimer: MANDATORY_LEGAL_DISCLAIMER
  };
}
