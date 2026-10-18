---
doc: spec
status: approved
---

# JurisMCP — Technical Spec

A development-time compliance orchestration layer built with modern web technologies and a standalone Model Context Protocol (MCP) server, evaluating plain-language AI feature descriptions across EU, India, and US regulatory frameworks.
Implements: `prd.md` and `scope.md`.

## How This Works, In Plain Language
JurisMCP bridges the critical gap between software development and international AI regulation.
1. When a developer types an app idea or chooses a scenario, the **Signal Extractor** scans the text for regulatory triggers: whether it uses AI models, handles personal or biometric data, touches employment or healthcare, or executes autonomous decisions.
2. The **Knowledge Engine** matches these signals against legal matrices for three major regimes:
   - European Union (EU AI Act classification + GDPR articles),
   - India (Digital Personal Data Protection Act 2023),
   - United States (NIST AI Risk Management Framework + FTC / State laws).
3. The **Tension Engine** analyzes discrepancies between these jurisdictions, highlighting where one country's legal requirement directly conflicts with or requires different architectural decisions than another's.
4. The dashboard displays these insights in clear, color-coded jurisdiction cards with actionable developer tasks, enables one-click export into a Markdown checklist, and provides an active **MCP Server** interface allowing external AI agents (like Claude Desktop or Cursor) to call `get_compliance_guidance` via JSON-RPC.

## The Core Journey Through the System
Traced from `prd.md > The Core Journey`:
1. `User Input`: Developer enters text in the input console or clicks a quick-load preset button (`src/data/scenarios.js`).
2. `Signal Extraction`: `src/engine/signalExtractor.js` tokenizes and analyzes the text, returning a structured `SignalVector`.
3. `Compliance Orchestration`: `src/engine/orchestrator.js` passes the `SignalVector` to `src/engine/knowledgeBase.js` and `src/engine/tensionEngine.js`.
4. `UI Render`: `src/main.js` receives the orchestrated report and dynamically renders:
   - Signal indicator badges in the detection bar.
   - Three animated jurisdiction cards (EU, India, US) with risk tiers and actionable tasks.
   - Cross-jurisdictional tension alerts.
5. `Export Action`: User clicks "Copy Developer Checklist"; clipboard API copies formatted markdown to clipboard and displays an interactive toast notification.
6. `MCP Verification`: User can open the "MCP Agent Inspector" to see the exact JSON-RPC request and response format used when an AI coding agent queries `mcp-server.js` over stdio.

## Stack
- **Frontend Core**: HTML5, Vanilla JavaScript (ES2022 Modules), Vanilla CSS.
  - *Rationale*: Zero bloat, blistering fast load times, pristine browser compatibility, and complete styling freedom without CSS framework overhead.
- **Build Tool / Dev Server**: [Vite](https://vitejs.dev/) (`^5.0.0` or latest).
  - *Rationale*: Sub-second hot-module replacement (HMR), zero config requirement, and instant local execution via `npm run dev`.
- **Styling Architecture**: Custom CSS Design System using CSS Custom Properties (variables), CSS Grid, and Glassmorphism techniques.
- **MCP Server**: Node.js executable script (`mcp-server.js`) implementing the standard JSON-RPC 2.0 stdio protocol used by Model Context Protocol (MCP) clients.
  - *Rationale*: Allows developers and judges to run the compliance engine both in the browser UI and as a headless MCP tool for AI agents.

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
  node mcp-server.js
  ```
- **Submission Requirements**:
  - Public repository containing `scope.md`, `prd.md`, `spec.md`, source code, and `README.md`.
  - 1–3 minute recorded video showing feature entry, scenario presets, multi-country results, tension callouts, checklist export, and MCP protocol interaction.

## Look and Feel
Implements `prd.md > Look and Feel`:
- **Palette**:
  - Background: Obsidian Night (`#080c14`, `#0f172a`) with subtle radial gradients.
  - Cards: Semi-transparent dark glass (`rgba(15, 23, 42, 0.75)`) with thin borders (`rgba(255, 255, 255, 0.08)`).
  - Jurisdiction Themes:
    - EU: Royal Blue (`#2563eb`), Gold accent (`#fbbf24`).
    - India: Saffron Orange (`#ea580c`), Emerald accent (`#10b981`).
    - United States: Crimson (`#dc2626`), Slate Blue accent (`#38bdf8`).
  - Risk Badges:
    - High / Unacceptable: Crimson (`#ef4444`).
    - Moderate / Specific Transparency: Amber (`#f59e0b`).
    - Minimal / Voluntary: Emerald (`#10b981`).
- **Typography**: `Inter` for interface elements and narrative text; `JetBrains Mono` for regulatory articles, signal tags, and JSON previews.
- **Density**: Compact, scannable developer HUD layout with smooth CSS transitions (`cubic-bezier(0.16, 1, 0.3, 1)`).

## Components

### 1. `FeatureInputConsole`
Implements `prd.md > 1. Free-Text Description & Quick Scenario Library`.
- Manages text input state, handles character count, triggers analysis on Enter/button click.
- Renders 4 scenario pills (HR Screener, Biometric Cloud, RAG Chatbot, Health Triage) with click-to-fill triggers.

### 2. `SignalExtractor`
Implements `prd.md > 2. High-Level Signal Extraction Engine`.
- Tokenizes input query and matches against curated domain dictionaries:
  - `AI_INDICATORS`: machine learning, llm, neural, gpt, classifier, algorithm, agent.
  - `PERSONAL_DATA_INDICATORS`: user, email, customer, profile, account, record, pii, identity.
  - `BIOMETRIC_INDICATORS`: face, facial, photo, selfie, image, voice, speech, fingerprint, scan.
  - `EMPLOYMENT_INDICATORS`: resume, candidate, hiring, job, employee, interview, workplace.
  - `HEALTH_INDICATORS`: patient, clinical, medical, symptom, health, diagnostic.
  - `AUTONOMOUS_INDICATORS`: automatic, reject, decide, approve, execute, unmonitored.
- Outputs boolean flags and active signal label array.

### 3. `ComplianceKnowledgeEngine`
Implements `prd.md > 3. Multi-Jurisdiction Regulatory Guidance Engine`.
- Evaluates extracted `SignalVector` against statutory and framework rules:
  - **EU Ruleset**: Classifies into EU AI Act Risk Tier (Prohibited: biometric categorization/social scoring; High-Risk: Annex III point 4 employment; Limited Risk: transparency for chatbots; Minimal Risk: other AI). Triggers GDPR Art. 6 (Lawful Basis), Art. 9 (Special Categories), Art. 22 (Automated Profiling), Art. 35 (DPIA).
  - **India Ruleset**: Digital Personal Data Protection Act 2023. Evaluates Section 5 (Notice in 22 languages), Section 6 (Consent & withdrawal), Section 8 (Fiduciary duties), Section 9 (Processing children's data), Section 10 (Significant Data Fiduciary thresholds).
  - **US Ruleset**: NIST AI RMF 1.0. Core functions (Govern 1.2, Map 1.5, Measure 2.4, Manage 3.2). FTC Act Section 5 algorithmic transparency. NYC Local Law 144 (Annual bias audit for automated employment tools).

### 4. `TensionEngine`
Implements `prd.md > 4. Cross-Jurisdictional Divergence Callout`.
- Cross-references multi-country obligations to surface real friction points:
  - *Conflict 1*: EU AI Act strict conformity assessment & technical documentation vs US post-market disparate impact audits.
  - *Conflict 2*: India DPDP Act prohibition on tracking/profiling children vs US COPPA verifiable parental consent mechanisms.
  - *Conflict 3*: GDPR strict purpose limitation vs US flexible innovation data re-use allowances.

### 5. `ChecklistExporter`
Implements `prd.md > 5. Developer Checklist Export`.
- Converts all action items into formatted Markdown with checkable task boxes (`- [ ]`).
- Integrates asynchronous Clipboard API with feedback tooltip.

### 6. `McpProtocolModule`
Implements `prd.md > 6. Model Context Protocol (MCP) Integration Specification`.
- Implements standard MCP Tool Definition:
  - Tool Name: `get_compliance_guidance`
  - Input Schema: `{ "type": "object", "properties": { "feature_description": { "type": "string" } }, "required": ["feature_description"] }`
- Provides stdio server in `mcp-server.js` and an in-browser JSON-RPC visualizer modal.

## Data Model
- **`SignalVector`**:
  ```ts
  interface SignalVector {
    usesAi: boolean;
    personalData: boolean;
    biometricData: boolean;
    employmentDomain: boolean;
    healthDomain: boolean;
    autonomousAction: boolean;
    tags: Array<{ id: string; label: string; icon: string }>;
  }
  ```
- **`JurisdictionGuidance`**:
  ```ts
  interface JurisdictionGuidance {
    jurisdiction: string;
    flag: string;
    primaryLaw: string;
    riskTier: 'UNACCEPTABLE' | 'HIGH RISK' | 'LIMITED RISK' | 'MINIMAL RISK' | 'VOLUNTARY / SECTORAL';
    tierColor: string;
    findings: string[];
    suggestions: string[];
    citations: string[];
  }
  ```
- **`RegulatoryTension`**:
  ```ts
  interface RegulatoryTension {
    title: string;
    parties: string;
    summary: string;
    developerGuidance: string;
  }
  ```
- **`ComplianceReport`**:
  ```ts
  interface ComplianceReport {
    timestamp: string;
    query: string;
    signals: SignalVector;
    guidance: Record<'EU' | 'IN' | 'US', JurisdictionGuidance>;
    tensions: RegulatoryTension[];
    checklist: string;
  }
  ```

## File Structure
```
f:\Projects\Devpost\MCP\
├── index.html                   # Dashboard shell and layout structure
├── package.json                 # Project manifest & dev scripts
├── vite.config.js               # Lightweight Vite configuration
├── src/
│   ├── main.js                  # Application controller, DOM binder, event dispatcher
│   ├── styles/
│   │   └── main.css             # High-aesthetic dark-mode glassmorphism design system
│   ├── engine/
│   │   ├── signalExtractor.js   # Lexical tokenizer & signal detection heuristics
│   │   ├── knowledgeBase.js     # Regulatory knowledge rules for EU, India, and US
│   │   ├── tensionEngine.js     # Cross-jurisdictional divergence and friction analyzer
│   │   └── orchestrator.js      # Core pipeline composing analysis, guidance, and checklist
│   └── data/
│       └── scenarios.js         # Curated real-world presets for testing and demos
├── mcp-server.js                # Standalone Model Context Protocol stdio server
├── devpost/                     # Devpost Learn Hackathon workflow files
│   ├── learner-profile.md       # Learner background & hackathon goals
│   ├── scope.md                 # Scope definition
│   ├── prd.md                   # Product requirements document
│   ├── spec.md                  # This technical specification
│   └── checklist.md             # Build checklist with verified steps
├── scope.md                     # Root public scope
├── prd.md                       # Root public PRD
├── spec.md                      # Root public technical spec
├── README.md                    # Project overview, research background, demo video guide
└── .gitignore                   # Safe Git ignore configuration
```

## External Services and Dependencies
- **Vite** (`npm:vite`): Dev server and bundler.
  - Version: `^5.4.0`
  - Docs: https://vitejs.dev
  - Cost: Free / Open Source.
  - Zero external cloud services, zero paid APIs, zero tracking cookies. 100% self-contained.

## Important Failure Modes
1. **Empty / White-space Only Input**:
   - *Behavior*: UI flashes an informative prompt ("Please describe your feature or select a scenario preset above") without crashing or making empty requests.
2. **Ambiguous / Low-Signal Input**:
   - *Behavior*: System defaults gracefully to "Minimal Risk / Baseline Due Diligence", advising standard software engineering best practices without false-positive alarms.
3. **Clipboard Write Access Blocked**:
   - *Behavior*: Fallback mechanism surfaces the raw checklist in an accessible modal with an easy `Ctrl+A, Ctrl+C` copy box.
4. **Invalid MCP JSON-RPC Payload**:
   - *Behavior*: Returns standard JSON-RPC 2.0 error response (`code: -32602, message: "Invalid params"`).

## What Was Simplified and Why
- **Deterministic Heuristic Knowledge Engine** instead of live cloud LLM calling:
  - Guarantees 0ms external latency, zero API rate limits, 100% offline uptime, and predictable high-quality output for judges during video review.
- **Three Strategic Jurisdictions (EU, India, US)** instead of all global jurisdictions:
  - EU represents the global benchmark for mandatory risk-tiered AI legislation (EU AI Act) and comprehensive privacy (GDPR).
  - India represents the newest emerging global south digital governance framework (DPDP Act 2023).
  - US represents market-driven sectoral enforcement (FTC, EEOC, NYC LL144) and voluntary risk standards (NIST AI RMF).
  - Together, they prove the cross-jurisdictional tension thesis without unnecessary cognitive bloat.

## Decisions and Open Issues
- **Decision 1**: Dual delivery model (Web UI + MCP Stdio Server). Both use the exact same core engine (`src/engine/orchestrator.js`).
- **Decision 2**: Plain CSS with CSS Custom Properties rather than TailwindCSS. Enables bespoke dark-mode glassmorphic styling with zero dependency friction and instant bundling.
- **Uncertainty Clarified**: Stdio-based MCP server formatting. Resolved by implementing standard JSON-RPC 2.0 protocol handling `tools/list` and `tools/call` for direct interoperability with modern AI coding harnesses.
