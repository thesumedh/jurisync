import assert from 'node:assert';
import { orchestrateCompliance, MANDATORY_LEGAL_DISCLAIMER } from '../src/engine/orchestrator.js';

console.log('--- Verifying Target User Flow (End-to-End Decision Support) ---');

const inputPrompt = "A company is building an AI system that ranks job applicants using CVs and interview answers in the EU and India.";
const report = orchestrateCompliance(inputPrompt);

console.log('\n[1] Detected Risk Signals:');
const signalLabels = report.signals.tags.map(t => t.label);
console.log(signalLabels);

assert.ok(signalLabels.some(l => l.includes('AI-Assisted Decisions') || l.includes('AI')), 'Must detect AI-Assisted decisions');
assert.ok(signalLabels.some(l => l.includes('Employment / Hiring')), 'Must detect Employment / Hiring');
assert.ok(signalLabels.some(l => l.includes('Personal Data')), 'Must detect Personal data');
assert.ok(signalLabels.some(l => l.includes('Multiple Jurisdictions')), 'Must detect Multiple jurisdictions');

console.log('\n[2] European Union Findings:');
const euRules = report.guidance.EU.rules;
console.log('EU Matched Rules Count:', euRules.length);
euRules.forEach(r => {
  console.log(`- [${r.status.toUpperCase()}] ${r.instrument}`);
  console.log(`  Finding: ${r.finding}`);
  console.log(`  Action: ${r.action}`);
  console.log(`  Source: ${r.source_note} (${r.source_url})`);
});
assert.ok(euRules.some(r => r.status === 'binding'), 'EU must include binding legislation');
assert.ok(euRules.some(r => r.instrument.includes('EU AI Act')), 'EU must cite EU AI Act');

console.log('\n[3] India Findings:');
const inRules = report.guidance.IN.rules;
console.log('India Matched Rules Count:', inRules.length);
inRules.forEach(r => {
  console.log(`- [${r.status.toUpperCase()}] ${r.instrument}`);
  console.log(`  Finding: ${r.finding}`);
  console.log(`  Action: ${r.action}`);
  console.log(`  Source: ${r.source_note} (${r.source_url})`);
});
assert.ok(inRules.some(r => r.status === 'binding'), 'India must include binding legislation');
assert.ok(inRules.some(r => r.instrument.includes('DPDP Act 2023')), 'India must cite DPDP Act 2023');

console.log('\n[4] United States Findings:');
const usRules = report.guidance.US.rules;
console.log('US Matched Rules Count:', usRules.length);
usRules.forEach(r => {
  console.log(`- [${r.status.toUpperCase()}] ${r.instrument}`);
  console.log(`  Finding: ${r.finding}`);
  console.log(`  Action: ${r.action}`);
  console.log(`  Source: ${r.source_note} (${r.source_url})`);
});
assert.ok(usRules.some(r => r.status === 'voluntary'), 'US must include voluntary framework note');
assert.ok(usRules.some(r => r.instrument.includes('NIST AI RMF')), 'US must cite NIST AI RMF');

console.log('\n[5] Actionable Developer Checklist:');
console.log(report.checklist.slice(0, 450) + '...\n');
assert.ok(report.checklist.includes('Document intended use and affected users'));
assert.ok(report.checklist.includes('Review data handling and retention'));
assert.ok(report.checklist.includes('Test for bias and document human review'));
assert.ok(report.checklist.includes('Verify each recommendation against its cited source'));

console.log('\n[6] Mandatory Legal Disclaimer:');
console.log('Disclaimer:', report.disclaimer);
assert.strictEqual(
  report.disclaimer,
  "Illustrative output for development support only. Not a verified legal assessment. Exact applicability depends on the specific system and current law."
);

console.log('\n✅ Target user flow verification PASSED 100%!');
