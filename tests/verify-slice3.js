import assert from 'node:assert';
import { extractSignals } from '../src/engine/signalExtractor.js';
import { evaluateAllJurisdictions } from '../src/engine/knowledgeBase.js';

console.log('--- Running Slice 3 Verification: Multi-Jurisdiction Engine ---');

// Test Case 1: HR Resume Ranking
const hrText = "An AI recruitment system that parses employee resumes and scores candidates for interview rejection.";
const hrSignals = extractSignals(hrText);
const hrGuidance = evaluateAllJurisdictions(hrSignals);

console.log('EU Risk Tier:', hrGuidance.EU.riskTier);
assert.strictEqual(hrGuidance.EU.riskTier, 'HIGH RISK', 'EU AI Act should classify recruitment as HIGH RISK under Annex III');
assert.ok(hrGuidance.EU.citations.some(c => c.includes('Annex III')), 'EU citations must include Annex III');

console.log('India Risk Tier:', hrGuidance.IN.riskTier);
assert.ok(hrGuidance.IN.riskTier.includes('DATA FIDUCIARY'), 'India DPDP must assign Data Fiduciary obligations');
assert.ok(hrGuidance.IN.findings.some(f => f.includes('DPDP Act 2023')), 'India findings must mention DPDP Act 2023');

console.log('US Risk Tier:', hrGuidance.US.riskTier);
assert.ok(hrGuidance.US.citations.some(c => c.includes('NYC Local Law 144') || c.includes('EEOC')), 'US must reference NYC LL144 or EEOC for hiring');

// Test Case 2: Biometric Photo Matcher
const bioText = "A mobile photo app that uploads user selfies to the cloud and extracts facial biometric recognition embeddings.";
const bioSignals = extractSignals(bioText);
const bioGuidance = evaluateAllJurisdictions(bioSignals);

console.log('Biometric EU Risk Tier:', bioGuidance.EU.riskTier);
assert.strictEqual(bioGuidance.EU.riskTier, 'HIGH RISK', 'Biometric processing must be HIGH RISK under GDPR Art 9 / AI Act');

console.log('Biometric India Citations:', bioGuidance.IN.citations);
assert.ok(bioGuidance.IN.citations.some(c => c.includes('DPDP')), 'India biometric must cite DPDP');

console.log('Biometric US Citations:', bioGuidance.US.citations);
assert.ok(bioGuidance.US.citations.some(c => c.includes('BIPA')), 'US biometric must cite Illinois BIPA');

console.log('✓ All Slice 3 verification tests PASSED successfully!');
