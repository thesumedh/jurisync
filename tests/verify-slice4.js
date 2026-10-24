import assert from 'node:assert';
import { orchestrateCompliance } from '../src/engine/orchestrator.js';

console.log('--- Running Slice 4 Verification: Tension Engine & Checklist Export ---');

// Test Case 1: HR Hiring (triggers employment tension)
const hrText = "An AI recruitment system that parses employee resumes and scores candidates for interview rejection.";
const hrReport = orchestrateCompliance(hrText);

console.log('Detected Tension Title:', hrReport.tension?.title);
assert.ok(hrReport.tension, 'HR text must trigger a cross-jurisdictional tension (backward compat .tension)');
assert.ok(Array.isArray(hrReport.tensions), 'report.tensions must be an array');
assert.ok(hrReport.tensions.length >= 1, 'HR text must trigger at least 1 tension in the array');
assert.ok(hrReport.tension.parties.includes('EU AI Act'), 'Tension parties must cite EU AI Act');
assert.ok(hrReport.tension.parties.includes('India DPDP'), 'Tension parties must cite India DPDP');
assert.ok(hrReport.tension.developerGuidance.includes('Architectural Exploration'), 'Guidance must propose architectural exploration for legal review');

// Verify Markdown Checklist
console.log('Checklist Sample Output:\n', hrReport.checklist.slice(0, 300), '...');
assert.ok(hrReport.checklist.includes('# JuriSync Developer Compliance Checklist'), 'Checklist must have header');
assert.ok(hrReport.checklist.includes('## 🇪🇺 European Union'), 'Checklist must have EU section');
assert.ok(hrReport.checklist.includes('## 🇮🇳 India'), 'Checklist must have India section');
assert.ok(hrReport.checklist.includes('## 🇺🇸 United States'), 'Checklist must have US section');
assert.ok(hrReport.checklist.includes('- [ ]'), 'Checklist must contain markdown checkable items');

// Test Case 2: Biometric Photos
const bioText = "A mobile photo app that uploads user selfies to the cloud and extracts facial biometric embeddings.";
const bioReport = orchestrateCompliance(bioText);
assert.ok(bioReport.tension, 'Biometric text must trigger biometric divergence tension');
assert.ok(bioReport.tension.parties.includes('BIPA'), 'Biometric tension must mention US BIPA');

// Test Case 3: Clinical Health Scenario (NEW — verifies health rules fire)
const healthText = "An AI healthcare app that takes patient reported medical symptoms, queries an AI diagnostic model, and generates immediate triage advice before a doctor consultation.";
const healthReport = orchestrateCompliance(healthText);
console.log('Clinical EU Rules:', healthReport.guidance.EU.rules.map(r => r.id));
console.log('Clinical IN Rules:', healthReport.guidance.IN.rules.map(r => r.id));
console.log('Clinical US Rules:', healthReport.guidance.US.rules.map(r => r.id));
assert.ok(
  healthReport.guidance.EU.rules.some(r => r.id === 'eu_ai_act_health_high_risk'),
  'Health scenario must fire EU AI Act health rule'
);
assert.ok(
  healthReport.guidance.IN.rules.some(r => r.id === 'in_it_spdi_health_records'),
  'Health scenario must fire India IT SPDI health records rule'
);
assert.ok(
  healthReport.guidance.US.rules.some(r => r.id === 'us_hipaa_phi_ai_systems'),
  'Health scenario must fire US HIPAA PHI rule'
);

// Test Case 4: Biometric scenario now fires GDPR Art. 9 rule (personal_data trigger fixed)
const faceOnlyText = "A face recognition system that generates facial geometry embeddings.";
const faceReport = orchestrateCompliance(faceOnlyText);
assert.ok(
  faceReport.signals.personalData === true,
  'Biometric-only description must now trigger personal_data signal (face is personal data)'
);
assert.ok(
  faceReport.guidance.EU.rules.some(r => r.id === 'eu_gdpr_biometric_special_category'),
  'Biometric-only description must match GDPR Art. 9 special category rule'
);

console.log('✓ All Slice 4 verification tests PASSED successfully!');
