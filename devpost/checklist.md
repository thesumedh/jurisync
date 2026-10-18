---
doc: checklist
status: approved
---

# Build Checklist

Build mode: fast

## Slices

- [x] **1. Initialize Vite project with Input Console and scenario presets**
  Becomes usable: A running web app where the developer can view the interface, click quick-load scenario pills, or type feature descriptions into an active input console.
  Why now: Establishes the working frontend environment, build system, and basic input state needed by all subsequent compliance processing.
  PRD ref: `prd.md > 1. Free-Text Description & Quick Scenario Library`
  Spec ref: `spec.md > Components > 1. FeatureInputConsole`, `spec.md > File Structure`
  Build: Scaffold project with `package.json`, `vite.config.js`, `index.html`, `src/styles/main.css`, `src/data/scenarios.js`, and basic `src/main.js` controller.
  Verify (mechanical): Run `npm run build` with zero errors, confirm scenario presets load in HTML.
  Learner check: Open http://localhost:5173, click the preset scenario pills, and observe the input field populating with sample text.
  Commit: `Initialize Vite project with Input Console and scenario presets`

- [x] **2. Implement signal extraction engine and UI signal radar**
  Becomes usable: Typing an AI feature description and clicking "Orchestrate Compliance" extracts regulatory signals and renders animated badges in the Signal Radar bar.
  Why now: Signal detection is the essential foundation for cross-jurisdictional compliance evaluation.
  PRD ref: `prd.md > 2. High-Level Signal Extraction Engine`
  Spec ref: `spec.md > Components > 2. SignalExtractor`
  Build: Create `src/engine/signalExtractor.js` with lexical pattern matching for AI usage, personal data, biometrics, employment, health, and autonomy; wire into UI in `src/main.js`.
  Verify (mechanical): Execute node verification script checking that test cases for hiring, biometrics, and RAG chatbots output expected boolean signals.
  Learner check: Type "An AI system that ranks job applicants by analyzing resumes" and verify both "AI System" and "Employment / Hiring" badges light up.
  Commit: `Implement signal extraction engine and UI signal radar`

- [ ] **3. Add multi-jurisdiction compliance knowledge engine for EU, India, and US**
  Becomes usable: The system evaluates extracted signals against EU (AI Act + GDPR), India (DPDP Act 2023), and US (NIST AI RMF + FTC/State) rules, rendering 3 structured, responsive cards with risk tiers, findings, and suggestions.
  Why now: Delivers the core value proposition of multi-country regulatory guidance during development.
  PRD ref: `prd.md > 3. Multi-Jurisdiction Regulatory Guidance Engine`
  Spec ref: `spec.md > Components > 3. ComplianceKnowledgeEngine`
  Build: Create `src/engine/knowledgeBase.js`, implement rulesets for EU, India, and US with risk classifications, map to UI cards in `src/main.js` with customized glassmorphic styles.
  Verify (mechanical): Execute automated test script verifying high-risk EU AI Act classification and DPDP consent duties for hiring and biometric queries.
  Learner check: Click "HR Hiring Screener" and verify EU card shows "High Risk (Annex III)" while India card shows "Data Fiduciary Duties".
  Commit: `Add multi-jurisdiction compliance knowledge engine for EU, India, and US`

- [ ] **4. Implement cross-jurisdictional tension engine and checklist exporter**
  Becomes usable: The system detects cross-border regulatory divergences and displays a highlighted "Regulatory Tension Callout", plus a one-click "Copy Developer Checklist" button that copies formatted markdown to clipboard with toast notification.
  Why now: Solves the research problem of surfacing tensions across jurisdictions and gives the developer immediate utility (actionable checklist) in their workflow.
  PRD ref: `prd.md > 4. Cross-Jurisdictional Divergence Callout`, `prd.md > 5. Developer Checklist Export`
  Spec ref: `spec.md > Components > 4. TensionEngine`, `spec.md > Components > 5. ChecklistExporter`
  Build: Create `src/engine/tensionEngine.js`, create `src/engine/orchestrator.js`, integrate tension alert banner in UI, implement clipboard export with toast notification and fallback copy modal.
  Verify (mechanical): Run orchestrator verification script confirming tension detection and checklist formatting.
  Learner check: Click "Copy Developer Checklist" and paste into a scratchpad to see the formatted markdown checklist.
  Commit: `Implement cross-jurisdictional tension engine and checklist exporter`

- [ ] **5. Add Model Context Protocol (MCP) stdio server and UI agent inspector**
  Becomes usable: External AI coding agents (Claude Desktop, Cursor, Antigravity) can call `get_compliance_guidance` via stdio JSON-RPC using `node mcp-server.js`, and developers can inspect the live MCP JSON schema directly in the dashboard UI.
  Why now: Directly fulfills the research statement ("MCP-based Cross-Jurisdictional Compliance Orchestration Layer"), elevating the project to hackathon-winning quality.
  PRD ref: `prd.md > 6. Model Context Protocol (MCP) Integration Specification`
  Spec ref: `spec.md > Components > 6. McpProtocolModule`
  Build: Implement `mcp-server.js` with standard stdio JSON-RPC 2.0 handling `tools/list` and `tools/call`, add "Inspect MCP Protocol" modal/drawer in web UI.
  Verify (mechanical): Pipe a JSON-RPC request (`{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"get_compliance_guidance","arguments":{"feature_description":"HR resume scanner"}}}`) into `node mcp-server.js` and verify valid JSON-RPC compliance report response.
  Learner check: Click "Inspect MCP Protocol" in the UI to see the exact tool invocation payload.
  Commit: `Add Model Context Protocol stdio server and UI agent inspector`

## Hands-on Checkpoints

- [ ] Early usable behavior explored — Slices 1–3 (Scaffold, Signal Radar, and Multi-Jurisdiction Engine)
- [ ] Final kick-the-tires exploration and feedback completed

## Final Review

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [ ] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [ ] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: [to be recorded upon completion]
Route and stops: [to be recorded upon completion]
Edit outcome: [to be recorded upon completion]
Reflection: [to be recorded upon completion]
Activity mode: [to be recorded upon completion]

## Revisions

