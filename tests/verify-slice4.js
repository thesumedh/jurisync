import assert from 'node:assert';
import { orchestrateCompliance } from '../src/engine/orchestrator.js';

console.log('--- Running Slice 4 Verification: Tension Engine & Checklist Export ---');

// Test Case 1: HR Hiring (triggers US NYC LL144 vs India DPDP retention tension)
const hrText = "An AI recruitment system that parses employee resumes and scores candidates for interview rejection.";
const hrReport = orchestrateCompliance(hrText);

console.log('Detected Tension Title:', hrReport.tension?.title);
assert.ok(hrReport.tension, 'HR text must trigger a cross-jurisdictional tension');
assert.ok(hrReport.tension.parties.includes('EU AI Act'), 'Tension parties must cite EU AI Act');
assert.ok(hrReport.tension.parties.includes('India DPDP'), 'Tension parties must cite India DPDP');
assert.ok(hrReport.tension.developerGuidance.includes('Dual-Path Architecture'), 'Guidance must propose dual-path architecture');

// Verify Markdown Checklist
console.log('Checklist Sample Output:\n', hrReport.checklist.slice(0, 300), '...');
assert.ok(hrReport.checklist.includes('# JurisMCP Developer Compliance Checklist'), 'Checklist must have header');
assert.ok(hrReport.checklist.includes('## 🇪🇺 European Union'), 'Checklist must have EU section');
assert.ok(hrReport.checklist.includes('## 🇮🇳 India'), 'Checklist must have India section');
assert.ok(hrReport.checklist.includes('## 🇺🇸 United States'), 'Checklist must have US section');
assert.ok(hrReport.checklist.includes('- [ ]'), 'Checklist must contain markdown checkable items');

// Test Case 2: Biometric Photos
const bioText = "A mobile photo app that uploads user selfies to the cloud and extracts facial biometric embeddings.";
const bioReport = orchestrateCompliance(bioText);
assert.ok(bioReport.tension, 'Biometric text must trigger biometric divergence tension');
assert.ok(bioReport.tension.parties.includes('BIPA'), 'Biometric tension must mention US BIPA');

console.log('✓ All Slice 4 verification tests PASSED successfully!');
