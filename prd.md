---
doc: prd
status: approved
---

# JurisMesh — Product Requirements

A development-time compliance decision-support tool that transforms plain-language AI feature descriptions into transparent risk signals, maps them against a curated JSON rule library across multiple jurisdictions (EU, India, US), labels binding legislation vs voluntary frameworks, and outputs an actionable developer checklist.
Source: `scope.md > The Unique Kernel` and `scope.md > Who It's For`.

## Decision-Support Pipeline
1. **Feature Description** (natural language prompt or 1-click preset)
2. **Detected Risk Signals** (visible chips: AI-Assisted decisions, employment/hiring, personal data, biometrics, multi-jurisdiction)
3. **Curated Rule Library** (`rules.json`: traceable triggers, instruments, legal status, findings, actions, source URLs)
4. **Sourced Findings** (EU AI Act & GDPR, India DPDP Act 2023, US NIST AI RMF & Sectoral/State laws; clearly labelled Binding vs Voluntary)
5. **Actionable Developer Checklist** (copyable checklist with core architectural tasks and statutory actions)
6. **Mandatory Disclaimer** ("Illustrative output for development support only. Not a verified legal assessment.")
1. **Arrival**: The developer opens the JurisMesh web dashboard. They see a clean, high-performance interface with an intuitive prompt console, four quick-load real-world scenario presets, and an architectural overview explaining the MCP integration angle.
2. **Input**: The developer either types a custom feature description (e.g., *"A facial verification microservice that indexes customer selfie uploads for cloud identity checks"*) or clicks a preloaded scenario button (*"HR Resume Ranker"*, *"Biometric Cloud Photos"*, *"Customer Support RAG Chatbot"*, or *"Autonomous Medical Triage"*).
3. **Trigger**: The developer clicks **"Orchestrate Compliance"** (or presses `Ctrl+Enter`).
4. **Signal Extraction**: The interface displays real-time signal badges identified by the analysis layer: detected AI system status, sensitive data classifications, biometric signals, employment domain triggers, and automated decision-making scope.
5. **Multi-Jurisdiction Synthesis**: Three structured cards appear side by side (or responsive stack):
   - **European Union**: EU AI Act risk classification (Prohibited / High-Risk / Limited / Minimal), applicable articles, and GDPR data protection mandates (legal basis, purpose limitation, DPO requirement).
   - **India**: DPDP Act 2023 obligations (Data Fiduciary obligations, verifiable consent, notice requirements, legitimate uses, child data handling, data principal rights).
   - **United States**: NIST AI RMF framework alignment (Govern, Map, Measure, Manage), FTC truth-in-AI principles, and applicable sector/state statutes (e.g., NYC Local Law 144 for hiring, Illinois BIPA for biometrics).
6. **Cross-Border Tensions**: A dedicated **"Cross-Jurisdictional Divergence Callout"** highlights where legal expectations conflict or diverge across regions (e.g., strict GDPR purpose limitation vs US flexible innovation sandboxes, or DPDP absolute prohibition on child behavioral tracking vs US COPPA parental consent thresholds).
7. **Actionable Checklist**: The developer clicks **"Copy Developer Checklist"** to copy a formatted Markdown checklist of immediate architecture and coding tasks directly to their clipboard for insertion into GitHub issues, PR descriptions, or sprint tickets.
8. **Agent Protocol Verification**: A toggle view allows the developer to inspect the raw JSON schema payload compatible with the Model Context Protocol (MCP), demonstrating how an AI coding assistant (like Claude Desktop or Cursor) calls this tool autonomously.

## Screens and Layout
- **Single-Page Application (SPA)** optimized for desktop and tablet screens during development.
  - **Header**: Logo, title, tagline, link to research statement, and an indicator badge: `MCP Protocol v1.0 Compatible`.
  - **Control Bar / Input Surface**:
    - Multi-line textarea for free-text app/feature description.
    - Quick-load Scenario preset buttons.
    - Action button with loading state.
  - **Signal Detection Bar**: Visual tags showing active detected signals (e.g., `⚡ AI-Driven`, `👤 Personal Data`, `👁️ Biometric Verification`, `💼 Employment / Hiring Domain`, `🤖 Autonomous Decision-Making`).
  - **Regulatory Guidance Grid**: Three distinct, high-contrast jurisdiction panels:
    - **EU Card**: Flag icon, risk classification pill, key legal findings, concrete developer action list, legal citation footer.
    - **India Card**: Flag icon, risk tier, DPDP Data Fiduciary obligations, consent & localization findings, actionable recommendations.
    - **US Card**: Flag icon, risk framework tier, NIST AI RMF mappings, federal & state compliance notes, actionable tasks.
  - **Tension & Conflict Matrix**: An alert drawer highlighting regulatory friction and cross-border data transfer complexities.
  - **Export & Action Bar**: One-click "Copy as Markdown Checklist" button with animated confirmation, and an "Inspect MCP Tool Call" dialog.

## Look and Feel
- **Visual Aesthetic**: Sleek developer-first dark mode inspired by modern IDEs and tools like Linear, Vercel, and Raycast.
- **Color Palette**:
  - Background: Deep slate/obsidian (`#0b0f19`, `#111827`) with subtle glassmorphic backdrop filters.
  - Accents: Electric Indigo (`#6366f1`) for primary actions.
  - Jurisdictions: EU Blue & Gold (`#3b82f6`, `#eab308`), India Saffron & Emerald (`#f97316`, `#10b981`), US Crimson & Slate (`#ef4444`, `#64748b`).
- **Typography**: Inter for crisp interface text; JetBrains Mono for code snippets, citations, and signal tags.
- **Tone**: Authoritative, pragmatic, non-alarmist developer guidance. Clearly disclaims formal legal representation while providing high-utility technical direction.

## Features and Behavior

### 1. Free-Text Description & Quick Scenario Library
- Developer can input any arbitrary text describing an AI application or microservice.
- 4 instant preset scenarios provided for 1-click testing and 30-second demo recording:
  1. *HR Hiring & Resume Screener* (High risk in EU, sensitive employment context in US, personal data fiduciary in India).
  2. *Biometric Photo Storage & Face Matcher* (High risk/strict safeguards globally, explicit biometric consent in India & GDPR Art. 9, BIPA in US).
  3. *Customer Support RAG Chatbot* (Limited risk / transparency obligations in EU, standard consent & retention in India, NIST Manage function).
  4. *Autonomous Clinical / Health Advice Agent* (High risk in EU, sensitive health data rules in DPDP, FDA / FTC scrutiny in US).
- Acceptance criteria:
  - [x] Clicking any preset populates the text field and automatically executes analysis.
  - [x] Clear button resets state to default.

### 2. High-Level Signal Extraction Engine
- Deterministic heuristic tokenizer and keyword/pattern classifier detecting:
  - `uses_ai`: LLM, neural network, predictive model, chatbot, generative AI.
  - `personal_data`: PII, email, names, phone numbers, customer records, profiles.
  - `biometric_data`: Faces, voice, fingerprint, photos, retina, physical traits.
  - `employment_domain`: Resume, candidates, hiring, workplace evaluation, firing, promotion.
  - `sensitive_domain`: Healthcare, financial credit, critical infrastructure, law enforcement.
  - `autonomous_action`: Automated rejection, autonomous actions, unmonitored decisions.
- Acceptance criteria:
  - [x] Extracted signals visually render as active badges within < 100ms.
  - [x] If no risk factors are detected, shows "Minimal Risk / Low Regulatory Footprint".

### 3. Multi-Jurisdiction Regulatory Guidance Engine
- **EU Module**:
  - Classifies into EU AI Act tiers (Annex III High-Risk vs Article 50 Transparency).
  - Triggers GDPR requirements (Lawful basis, DPIA requirement, Art. 22 automated decision safeguards).
- **India Module**:
  - Triggers DPDP Act 2023 requirements (Section 4–6 Notice & Consent, Section 8 Data Fiduciary duties, Section 9 Children's data prohibition, Section 10 Significant Data Fiduciary criteria).
- **US Module**:
  - Maps to NIST AI RMF 1.0 (Govern 1.1, Map 1.2, Measure 2.3, Manage 3.1).
  - Highlights FTC Section 5 deceptive/unfair AI enforcement and state legislation (NYC Local Law 144, California CPRA).
- Acceptance criteria:
  - [x] Each card displays: Jurisdiction Name, Legal Framework, Risk Tier badge, Key Findings, and Bulleted Actionable Suggestions.
  - [x] Outputs use developer-native terminology (e.g., "Add audit log", "Store consent timestamp", "Expose human override toggle").

### 4. Cross-Jurisdictional Divergence Callout
- Specifically identifies where legal expectations between regions diverge:
  - *Example 1*: EU AI Act requires rigorous conformity assessments and technical documentation for employment tools, whereas US enforces through post-hoc FTC/EEOC disparate impact audits.
  - *Example 2*: India DPDP Act requires unconditional withdrawal of consent without penalizing normal access, with strict local grievance redressal within prescribed timeframes.
- Acceptance criteria:
  - [x] Visual highlight box clearly explains cross-border tension for detected combination of signals.

### 5. Developer Checklist Export
- Formats all actionable guidance into a clean, markdown checklist ready for developer workflow.
- Acceptance criteria:
  - [x] Clicking "Copy Markdown Checklist" copies formatted markdown to clipboard and displays a toast notification.

### 6. Model Context Protocol (MCP) Integration Specification
- The application exposes its orchestration logic via a runnable, standard MCP tool endpoint (`get_compliance_guidance`) conforming to the Model Context Protocol schema.
- Acceptance criteria:
  - [x] A standalone MCP script `mcp-server.js` or `server.py` can be executed over stdio and responds to standard JSON-RPC tool list and tool call requests.
  - [x] Web UI contains an "MCP Schema / Agent View" toggle displaying the exact JSON-RPC request and response payloads.

## States and Boundaries
- **Empty State**: Friendly invitation with scenario pills; results area shows a placeholder graphic with instructions.
- **Analyzing State**: Instant (<200ms) smooth transition showing analyzing signals.
- **Success State**: Rich display of signal tags, three jurisdiction cards, tension matrix, and checklist export button.
- **Invalid / Blank Input State**: Gentle inline prompt prompting the developer to provide a description or click a preset.
- **Persistence**: Remembers the last analyzed query in browser `localStorage` across page reloads.

## Product Decisions
- **Rule-Based Heuristic Core**: Chosen over unpredictable external cloud LLM API calls to ensure 100% offline reliability, instant sub-second response times during live video demos, zero API key requirements for judges, and reproducible compliance assessments.
- **3 Primary Jurisdictions (EU, India, US)**: Focuses on the three most commercially impactful and legally divergent regimes for AI builders, matching the proof-of-concept scope perfectly without cognitive overload.
- **Dual Interface (Web Dashboard + MCP Server Script)**: Enables stunning visual demo for human judges while technically honoring the research statement's core MCP protocol requirement.

## What We're Building
A self-contained web application (built with Vite + Vanilla JS/CSS for zero bloat, blazing fast launch, and rock-solid stability) paired with an MCP tool module that can be tested in terminal or connected to Claude Desktop / Cursor.

## Deferred From the POC
- Multi-user authentication and database persistence.
- Automated static code repository scanning.
- Dynamic PDF compliance certification report generation.

## Possible Later Enhancements
- Visual graph mapping cross-border data flows with latency/legal penalty costs.
- Pre-commit git hook (`husky`) running compliance checks automatically on commit.

## Non-Goals
- Providing binding legal advice or replacing human corporate legal counsel.
- Attempting to cover all 190+ countries in a initial POC.

## Open Questions
- None. The functional boundaries, jurisdictions, and execution paths are fully defined and ready for technical specification.
