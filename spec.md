---
doc: spec
status: approved
---

# JuriSync — Technical Spec

A development-time compliance decision-support tool built with modern web technologies and a standalone Model Context Protocol (MCP) server, evaluating plain-language AI feature descriptions against a curated JSON rule library across EU, India, and US regulatory frameworks.
Implements: `prd.md` and `scope.md`.

## How This Works, In Plain Language
JuriSync bridges the critical gap between software development and international AI regulation.
1. When a developer types an app idea or chooses a scenario, the **Signal Extractor** scans the text for regulatory triggers: whether it uses AI models, handles personal or biometric data, touches employment or healthcare, executes autonomous decisions, or targets multiple jurisdictions.
2. The **Curated Rule Engine** evaluates these signals against a traceable library of rules (`src/data/rules.json` and `src/data/rules.js`):
   - **European Union**: EU Artificial Intelligence Act (Annex III High Risk, Article 50 Transparency) & GDPR (Articles 6, 9, 22, 35).
   - **India**: Digital Personal Data Protection Act 2023 (Sections 4-6 Notice/Consent, Section 8(7) Retention Erasure, Section 9 Children's Data Ban, Section 12 Grievance).
   - **United States**: NIST AI Risk Management Framework 1.0 (Govern, Map, Measure, Manage) & Sectoral/State laws (NYC Local Law 144 AEDT bias audits, FTC Act Section 5 algorithmic transparency, Illinois BIPA).
3. Every finding is explicitly labelled by its legal status: **`[BINDING LEGISLATION]`** vs **`[VOLUNTARY FRAMEWORK / GUIDANCE]`**.
4. The **Tension Engine** identifies discrepancies between these jurisdictions, highlighting where one country's legal requirement directly conflicts with another's (e.g. US retrospective bias retention vs India immediate erasure vs EU ex-ante conformity).
5. The dashboard outputs actionable developer tasks, enables one-click export into a Markdown checklist with the mandatory legal disclaimer, and provides an active **MCP Server** (`mcp-server.js`) allowing external AI coding agents (Claude Desktop, Cursor, Antigravity) to call `analyze_compliance` via JSON-RPC 2.0 stdio.

## The Core Journey Through the System
Traced from `prd.md > The Core Journey`:
1. `User Input`: Developer enters text in the input console or clicks a quick-load preset button (`src/data/scenarios.js`).
2. `Signal Extraction`: `src/engine/signalExtractor.js` tokenizes and analyzes the text, returning a structured `SignalVector`.
3. `Rule Evaluation`: `src/engine/ruleEngine.js` matches signals against `src/data/rules.json`.
4. `Tension Detection`: `src/engine/tensionEngine.js` surfaces international divergences.
5. `UI Render`: `src/main.js` receives the orchestrated report and dynamically renders:
   - Visible signal indicator badges.
   - Three animated jurisdiction cards (EU, India, US) with sourced rule items and legal status badges.
   - Cross-jurisdictional tension alerts.
   - Copyable developer checklist.
   - Mandatory disclaimer banner.
6. `Export Action`: User clicks "Copy Checklist"; clipboard API copies formatted markdown to clipboard.
7. `MCP Verification`: User can open the "Agent Protocol (MCP)" modal or run `node mcp-server.js` directly over stdio.

## Stack
- **Frontend Core**: HTML5, Vanilla JavaScript (ES2022 Modules), Vanilla CSS.
  - *Rationale*: Zero bloat, blistering fast load times, pristine browser compatibility, and complete styling freedom without CSS framework overhead.
- **Build Tool / Dev Server**: [Vite](https://vitejs.dev/) (`^5.4.0` or latest).
  - *Rationale*: Sub-second hot-module replacement (HMR), zero config requirement, and instant local execution via `npm run dev`.
- **Rule Library**: Pure JSON/JS dataset (`src/data/rules.json`, `src/data/rules.js`) containing traceable triggers, instruments, legal status, findings, actions, and source citations.
- **MCP Server**: Node.js executable script (`mcp-server.js`) implementing standard JSON-RPC 2.0 stdio protocol used by Model Context Protocol (MCP) clients.

## Where It Runs and How Someone Tries It
- **Runtime**: Node.js (v18.0.0 or later).
- **Setup & Run Instructions**:
  ```bash
  # 1. Install dependencies
  npm install

  # 2. Start the interactive dashboard
  npm run dev
  ```
- **Local URL**: `http://localhost:5173`
- **Headless MCP Agent Mode**:
  ```bash
  # Run directly via Node stdio
  node mcp-server.js "A company is building an AI system that ranks job applicants using CVs in the EU and India"
  ```
- **Test Suite**:
  ```bash
  node tests/verify-target-flow.js
  ```

## Components
1. `FeatureInputConsole`: Textarea, quick presets, character counter, hotkey trigger.
2. `SignalExtractor`: Tokenizes input query into explicit, visible risk signals.
3. `RuleEngine`: Traceable matcher mapping signals against `src/data/rules.json`.
4. `TensionEngine`: Analyzes international statutory divergences.
5. `ChecklistExporter`: Generates copyable Markdown checklist with core tasks and statutory actions.
6. `McpProtocolModule`: Exposes `analyze_compliance` via stdio JSON-RPC.

## File Structure
```
f:\Projects\Devpost\MCP\
├── index.html                   # Dashboard shell and layout structure
├── package.json                 # Project manifest & dev scripts
├── vite.config.js               # Lightweight Vite configuration
├── mcp-server.js                # Standalone Model Context Protocol stdio server
├── src/
│   ├── main.js                  # Application controller, DOM binder, event dispatcher
│   ├── styles/
│   │   └── main.css             # High-aesthetic dark-mode glassmorphism design system
│   ├── engine/
│   │   ├── signalExtractor.js   # Lexical tokenizer & signal detection heuristics
│   │   ├── ruleEngine.js        # Traceable rule matcher for rules.json
│   │   ├── tensionEngine.js     # Cross-jurisdictional divergence and friction analyzer
│   │   └── orchestrator.js      # Core pipeline composing analysis, guidance, and checklist
│   └── data/
│       ├── rules.json           # Curated statutory rule library
│       ├── rules.js             # ES Module export of curated rules
│       └── scenarios.js         # Curated real-world presets for testing and demos
├── tests/
│   ├── verify-target-flow.js    # End-to-end verification of target user flow
│   ├── verify-slice2.js         # Signal extraction tests
│   ├── verify-slice3.js         # Rule engine tests
│   ├── verify-slice4.js         # Tension & checklist tests
│   └── verify-slice5.js         # MCP stdio JSON-RPC tests
├── devpost/                     # Devpost Learn Hackathon workflow files
│   ├── learner-profile.md       # Learner background & hackathon goals
│   ├── scope.md                 # Scope definition
│   ├── prd.md                   # Product requirements document
│   ├── spec.md                  # This technical specification
│   ├── checklist.md             # Build checklist with verified steps
│   └── app-map.html             # Architecture map & code tour
├── scope.md                     # Root public scope
├── prd.md                       # Root public PRD
├── spec.md                      # Root public technical spec
├── README.md                    # Project overview, research background, demo video guide
└── .gitignore                   # Safe Git ignore configuration
```

## Mandatory Legal Disclaimer
*“Illustrative output for development support only. Not a verified legal assessment. Exact applicability depends on the specific system and current law.”*
