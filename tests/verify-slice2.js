import assert from 'node:assert';
import { extractSignals } from '../src/engine/signalExtractor.js';

console.log('--- Running Slice 2 Verification: Signal Extraction ---');

// Test Case 1: HR Resume Ranking
const hrText = "An AI recruitment system that parses employee resumes and scores candidates for interview rejection.";
const hrSignals = extractSignals(hrText);
console.log('HR Test Signals:', hrSignals.tags.map(t => t.label));
assert.strictEqual(hrSignals.usesAi, true, 'HR text should detect AI usage');
assert.strictEqual(hrSignals.employmentDomain, true, 'HR text should detect employment domain');
assert.strictEqual(hrSignals.autonomousAction, true, 'HR text should detect autonomous rejection');

// Test Case 2: Biometric Photo App
const bioText = "A cloud photo app that uses facial recognition and computer vision to index selfies of friends.";
const bioSignals = extractSignals(bioText);
console.log('Biometric Test Signals:', bioSignals.tags.map(t => t.label));
assert.strictEqual(bioSignals.biometricData, true, 'Bio text should detect biometric/facial data');
assert.strictEqual(bioSignals.usesAi, true, 'Bio text should detect AI/computer vision');

// Test Case 3: Customer Support RAG
const ragText = "A customer support chatbot using retrieval-augmented generation to answer questions and store user chat history.";
const ragSignals = extractSignals(ragText);
console.log('RAG Test Signals:', ragSignals.tags.map(t => t.label));
assert.strictEqual(ragSignals.usesAi, true, 'RAG text should detect AI/chatbot');
assert.strictEqual(ragSignals.personalData, true, 'RAG text should detect personal data');

// Test Case 4: Minimal / Non-sensitive input
const genericText = "A simple static HTML documentation website for open source libraries.";
const genericSignals = extractSignals(genericText);
console.log('Generic Test Signals:', genericSignals.tags.map(t => t.label));
assert.strictEqual(genericSignals.usesAi, false);
assert.strictEqual(genericSignals.tags[0].id, 'minimal_footprint');

console.log('✓ All Slice 2 verification tests PASSED successfully!');
