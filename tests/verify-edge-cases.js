/**
 * JuriSync Edge Case & Enhanced Feature Verification Test Suite
 * Tests negation suppression, new statutory rules, confidence scoring, and tension severity.
 */

import assert from 'node:assert';
import { extractSignals } from '../src/engine/signalExtractor.js';
import { evaluateRules } from '../src/engine/ruleEngine.js';
import { detectTensions } from '../src/engine/tensionEngine.js';
import { orchestrateCompliance } from '../src/engine/orchestrator.js';

console.log('--- Running JuriSync Advanced Features & Edge Cases Verification ---');

// Test 1: Negation Handling
console.log('[Test 1] Negation Handling:');
const negatedQuery = 'An AI recruitment platform that scores candidate resumes but does not process biometric data or facial scans.';
const signals1 = extractSignals(negatedQuery);

assert.ok(signals1.activeTriggers.includes('employment'), 'Must detect employment trigger');
assert.ok(signals1.activeTriggers.includes('ai_decision'), 'Must detect ai_decision trigger');
assert.ok(!signals1.activeTriggers.includes('biometric'), 'Must NOT activate biometric trigger due to negation');
assert.ok(signals1.negatedTriggers.length > 0, 'Must record negatedTriggers');
assert.strictEqual(signals1.negatedTriggers[0].id, 'biometric', 'Negated trigger must be biometric');
console.log('✓ Negation correctly suppressed "biometric" while preserving "employment" and "ai_decision"');

// Test 2: Signal Confidence Scoring
console.log('[Test 2] Confidence Scoring Metrics:');
assert.ok(typeof signals1.confidenceScore === 'number' && signals1.confidenceScore >= 0 && signals1.confidenceScore <= 100, 'Score must be 0-100');
assert.ok(['HIGH', 'MEDIUM', 'LOW'].includes(signals1.confidenceLevel), 'Level must be HIGH, MEDIUM, or LOW');
assert.ok(signals1.confidenceRationale.length > 10, 'Rationale must be descriptive');
console.log(`✓ Confidence computed: ${signals1.confidenceScore}% (${signals1.confidenceLevel})`);

// Test 3: Education & Minor High-Risk Rules
console.log('[Test 3] Education & Minor High-Risk Assessment:');
const eduQuery = 'An AI tutor and automated exam grading platform for K-12 students in EU schools and India.';
const reportEdu = orchestrateCompliance(eduQuery);
const euEduRule = reportEdu.guidance.EU.rules.find(r => r.id === 'eu_ai_act_education_high_risk');
const inChildRule = reportEdu.guidance.IN.rules.find(r => r.id === 'in_dpdp_children_tracking_ban');

assert.ok(euEduRule, 'EU AI Act Education High-Risk rule must match');
assert.ok(inChildRule, 'India DPDP Children tracking ban rule must match');
console.log('✓ Education & Minor rules verified:');
console.log('  - EU:', euEduRule.instrument);
console.log('  - India:', inChildRule.instrument);

// Test 4: Fintech Loan Underwriting & Credit Scoring
console.log('[Test 4] Fintech Credit Underwriting & Adverse Action:');
const loanQuery = 'An automated loan underwriting algorithm that evaluates borrower credit risk and bank transactions in the US and India.';
const reportLoan = orchestrateCompliance(loanQuery);
const euCreditRule = reportLoan.guidance.EU.rules.find(r => r.id === 'eu_ai_act_credit_scoring_essential_services');
const inRbiRule = reportLoan.guidance.IN.rules.find(r => r.id === 'in_rbi_digital_lending_ai_underwriting');
const usFcraRule = reportLoan.guidance.US.rules.find(r => r.id === 'us_fcra_automated_credit_adverse_action');

assert.ok(euCreditRule, 'EU AI Act Credit Scoring High-Risk rule must match');
assert.ok(inRbiRule, 'India RBI Digital Lending rule must match');
assert.ok(usFcraRule, 'US FCRA Adverse Action rule must match');
console.log('✓ Fintech & Credit rules verified:');
console.log('  - EU:', euCreditRule.instrument);
console.log('  - India:', inRbiRule.instrument);
console.log('  - US:', usFcraRule.instrument);

// Test 5: Tension Engine Severity & Likelihood
console.log('[Test 5] Cross-Jurisdictional Tension Severity & Modeling:');
assert.ok(reportEdu.tensions.length > 0, 'Education query must produce tensions');
reportEdu.tensions.forEach(t => {
  assert.ok(['CRITICAL', 'HIGH', 'MEDIUM'].includes(t.severity), `Tension ${t.id} must have valid severity`);
  assert.ok(['HIGH', 'MEDIUM', 'LOW'].includes(t.likelihood), `Tension ${t.id} must have valid likelihood`);
  assert.ok(t.architecturalGuidance, `Tension ${t.id} must have architecturalGuidance`);
});
console.log(`✓ Verified ${reportEdu.tensions.length} tensions with severity & architectural explorations`);

// Test 6: California Watermarking & Content Moderation
console.log('[Test 6] Content Moderation & AI Watermarking:');
const modQuery = 'A multimodal platform deploying automated deepfake detection and AI content watermarking in California and India.';
const reportMod = orchestrateCompliance(modQuery);
const usWatermarkRule = reportMod.guidance.US.rules.find(r => r.id === 'us_california_ai_transparency_watermarking');
const inIntermediaryRule = reportMod.guidance.IN.rules.find(r => r.id === 'in_it_rules_intermediary_due_diligence_ai');

assert.ok(usWatermarkRule, 'California AB 2013 / AB 3211 watermarking rule must match');
assert.ok(inIntermediaryRule, 'India IT Rules Intermediary AI rule must match');
console.log('✓ Content Moderation & Watermarking rules verified:');
console.log('  - US:', usWatermarkRule.instrument);
console.log('  - India:', inIntermediaryRule.instrument);

console.log('\n🎉 ALL EDGE CASES AND ENHANCED CAPABILITIES VERIFIED 100%!');
