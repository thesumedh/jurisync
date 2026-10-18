import assert from 'node:assert';
import { extractSignals } from '../src/engine/signalExtractor.js';
import { evaluateRules } from '../src/engine/ruleEngine.js';

console.log('--- Running Slice 3 Verification: Sourced Rule Engine ---');

// Test Case 1: HR Resume Ranking
const hrText = "An AI recruitment system that parses employee resumes and scores candidates for interview rejection.";
const hrSignals = extractSignals(hrText);
const hrGuidance = evaluateRules(hrSignals);

console.log('EU Matched Rules:', hrGuidance.EU.rules.map(r => `[${r.status}] ${r.instrument}`));
assert.ok(hrGuidance.EU.hasBinding, 'EU must have binding legislation rules');
assert.ok(hrGuidance.EU.rules.some(r => r.instrument.includes('EU AI Act')), 'EU rules must cite EU AI Act');

console.log('India Matched Rules:', hrGuidance.IN.rules.map(r => `[${r.status}] ${r.instrument}`));
assert.ok(hrGuidance.IN.hasBinding, 'India must have binding legislation rules');
assert.ok(hrGuidance.IN.rules.some(r => r.instrument.includes('DPDP Act 2023')), 'India rules must cite DPDP Act 2023');

console.log('US Matched Rules:', hrGuidance.US.rules.map(r => `[${r.status}] ${r.instrument}`));
assert.ok(hrGuidance.US.rules.some(r => r.status === 'voluntary'), 'US must include voluntary framework rule');
assert.ok(hrGuidance.US.rules.some(r => r.instrument.includes('NIST AI RMF')), 'US must reference NIST AI RMF');

// Test Case 2: Biometric Photo Matcher
const bioText = "A mobile photo app that uploads user selfies to the cloud and extracts facial biometric recognition embeddings.";
const bioSignals = extractSignals(bioText);
const bioGuidance = evaluateRules(bioSignals);

console.log('Biometric EU Rules:', bioGuidance.EU.rules.map(r => r.instrument));
assert.ok(bioGuidance.EU.rules.some(r => r.instrument.includes('GDPR (Article 9')), 'Biometric must trigger GDPR Article 9 special category');

console.log('Biometric US Rules:', bioGuidance.US.rules.map(r => r.instrument));
assert.ok(bioGuidance.US.rules.some(r => r.instrument.includes('Biometric Information Privacy Act') || r.instrument.includes('BIPA')), 'Biometric US must cite Illinois BIPA');

console.log('✓ All Slice 3 verification tests PASSED successfully!');
