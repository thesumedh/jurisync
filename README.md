# JuriSync ⚖️⚡

> **A Development-Time Cross-Jurisdictional Compliance Orchestration Layer for AI-Assisted Application Development**  
> *Built for the Devpost "Build With AI: Basics" Hackathon (October 2026)*

[![MCP Protocol v1.0](https://img.shields.io/badge/MCP-Protocol_v1.0-6366f1.svg)](https://modelcontextprotocol.io/)
[![EU AI Act Compliant](https://img.shields.io/badge/EU_AI_Act-Reg_2024%2F1689-blue.svg)](https://eur-lex.europa.eu/)
[![India DPDP 2023](https://img.shields.io/badge/India_DPDP-Act_22_of_2023-orange.svg)](https://www.meity.gov.in/)
[![NIST AI RMF 1.0](https://img.shields.io/badge/NIST-AI_RMF_1.0-red.svg)](https://www.nist.gov/itl/ai-risk-management-framework)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📌 Executive Summary & Research Background

### The Research Question
> *"How can development-time orchestration provide dynamic, cross-jurisdictional compliance guidance to developers and autonomous AI coding agents before architectural lock-in?"*

AI coding assistants and autonomous agentic workflows increasingly use protocols such as the **Model Context Protocol (MCP)** to generate software and interact with tools. However, modern applications are deployed globally across divergent, conflicting regulatory regimes:

* **Binding Legislation**: EU AI Act (Regulation 2024/1689), EU GDPR (Regulation 2016/679), India's Digital Personal Data Protection Act 2023 (DPDP Act).
* **Voluntary & Sectoral Regimes**: US NIST AI Risk Management Framework 1.0, FTC Act Section 5 enforcement, state statutes (NYC Local Law 144, Illinois BIPA).

### The Gap
Existing solutions either:
1. Focus only on **MCP security / runtime access control** (can this agent call this tool?), or
2. Focus only on **single-jurisdiction compliance** (e.g. EU AI Act checkers), or
3. Provide passive **regulatory knowledge retrieval** (RAG databases) without delivering concrete, actionable guidance *during development*.

**JuriSync** implements a development-time compliance intelligence layer. It extracts regulatory triggers from plain-language feature descriptions, maps them against international legal frameworks, identifies potential cross-border statutory tensions for review, and delivers structured developer checklists—both through an interactive dashboard and directly to AI coding agents via the Model Context Protocol.

---

## 🚀 Key Features

* ⚡ **Natural Language Feature Input & 1-Click Presets**:
  Type any software feature or load pre-configured scenarios (*HR Resume Ranker*, *Biometric Cloud Photos*, *Customer Support RAG Chatbot*, *Clinical Triage Agent*).
* 🔍 **High-Level Signal Radar**:
  Lexical pattern matching automatically detects regulatory triggers: `AI System`, `Personal Data (PII)`, `Biometric Data (GDPR Art 9)`, `Employment Domain (AI Act Annex III)`, `Clinical/Health Data`, and `Autonomous Decisions`.
* 🌐 **Multi-Country Statutory Guidance (15 Curated Rules)**:
  * **🇪🇺 European Union**: EU AI Act risk tiers (Prohibited, High Risk / Annex III, Specific Transparency / Art. 50, Minimal) and GDPR mandates (lawful basis, purpose limitation, DPIA requirements).
  * **🇮🇳 India**: DPDP Act 2023 obligations (Data Fiduciary responsibilities, notice in 22 languages, Section 8(7) retention erasure, Section 9 child tracking prohibitions).
  * **🇺🇸 United States**: NIST AI RMF core functions (Govern, Map, Measure, Manage), FTC deceptive AI scrutiny, and state laws (NYC Local Law 144 AEDT bias audits, Illinois BIPA).
* ⚠️ **Potential Cross-Jurisdictional Divergence Alerts**:
  Surfaces explicit potential regulatory tensions where meeting one country's standard may conflict with another's (e.g., US retrospective bias audit retention vs. India DPDP data erasure mandates), providing exploratory architectural guidance for developer and legal review without claiming premature legal certainty.
* 🔎 **Inspectable Statutory Evidence**:
  Each finding includes an interactive evidence drawer detailing exact statutory provisions, legislative authority, classification (binding vs voluntary), and direct official gazette links.
* 📋 **One-Click Markdown Checklist Exporter**:
  Instantly copies formatted markdown action items to clipboard for inclusion in GitHub issues, PR templates, or sprint boards.
* 🤖 **Standalone MCP Stdio Server (`mcp-server.js`)**:
  Fully functional Model Context Protocol tool endpoint (`analyze_compliance`) allowing AI assistants (Claude Desktop, Cursor, Antigravity) to query compliance programmatically via JSON-RPC 2.0.

---

## 🛠️ System Architecture

```
[ Developer / AI Coding Agent ]
              │
              ├── (Browser UI: http://localhost:5173)
              └── (Stdio JSON-RPC: node mcp-server.js)
              │
              ▼
    [ Feature Input Console ]
              │
              ▼
   [ Signal Extraction Engine ] ──> extracts: AI?, PII?, Biometric?, Employment?, Autonomy?
              │
              ├───► [ EU Knowledge Engine ]    ──> EU AI Act + GDPR rules
              ├───► [ India Knowledge Engine ] ──> DPDP Act 2023 rules
              └───► [ US Knowledge Engine ]    ──> NIST AI RMF + FTC + State rules
              │
              ▼
   [ Tension Detection Engine ] ──> flags cross-border statutory friction & dual-path strategy
              │
              ▼
   [ Structured Compliance Report ]
              ├── Live Visual Dashboard Cards
              ├── Markdown Developer Checklist (Exportable)
              └── JSON-RPC Tool Result (MCP Agent Ready)
```

---

## 📂 Repository File Structure

```
├── index.html                   # High-aesthetic dark-mode dashboard entrypoint
├── package.json                 # Project manifest & dev scripts (Vite)
├── vite.config.js               # Dev server configuration
├── mcp-server.js                # Standalone Model Context Protocol stdio server
├── src/
│   ├── main.js                  # Application controller, DOM binder & event dispatcher
│   ├── styles/
│   │   └── main.css             # Glassmorphic dark-mode design system
│   ├── engine/
│   │   ├── signalExtractor.js   # Lexical tokenizer & regulatory signal detection
│   │   ├── knowledgeBase.js     # Statutory rulesets for EU, India, and US
│   │   ├── tensionEngine.js     # Cross-jurisdictional divergence & conflict engine
│   │   └── orchestrator.js      # Central orchestration pipeline & markdown generator
│   └── data/
│       └── scenarios.js         # Curated real-world presets for 1-click demos
├── tests/
│   ├── verify-slice2.js         # Verification for signal extraction
│   ├── verify-slice3.js         # Verification for multi-jurisdiction engine
│   ├── verify-slice4.js         # Verification for tension detection & checklist
│   └── verify-slice5.js         # Verification for MCP stdio JSON-RPC protocol
├── devpost/                     # Devpost Learn Hackathon Artifacts
│   ├── learner-profile.md       # Learner profile (ignored by Git)
│   ├── scope.md                 # Scope definition document
│   ├── prd.md                   # Product requirements document
│   ├── spec.md                  # Technical specification document
│   ├── checklist.md             # Verified build checklist
│   └── app-map.html             # Interactive architecture map & code tour
├── scope.md                     # Root scope artifact
├── prd.md                       # Root PRD artifact
├── spec.md                      # Root technical specification artifact
└── README.md                    # Project documentation & pitch guide
```

---

## 💻 Quick Start & Running Locally

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher

### 1. Run the Interactive Web Dashboard
```bash
# Clone the repository
git clone <your-repo-url>
cd MCP

# Install dependencies
npm install

# Start Vite development server
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 2. Run Headless MCP Agent Tool (CLI Mode)
You can query the compliance engine directly from your terminal using a piped JSON-RPC call:
```bash
# Linux / macOS
echo '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"analyze_compliance","arguments":{"feature_description":"An AI chatbot that answers HR questions using internal employee documents"}}}' | node mcp-server.js

# Windows PowerShell
$req = '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"analyze_compliance","arguments":{"feature_description":"An AI chatbot that answers HR questions"}}}'
$req | node mcp-server.js
```

### 3. Run as an MCP Server in Claude Desktop / Cursor
Add JuriSync to your Claude Desktop configuration (`claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "jurisync": {
      "command": "node",
      "args": ["F:/Projects/Devpost/MCP/mcp-server.js"]
    }
  }
}
```
Now, whenever your AI coding agent helps you write software, it can invoke `analyze_compliance` to check multi-country compliance in real time!

### 4. Run the Automated Test Suite
```bash
node tests/verify-target-flow.js
node tests/verify-slice2.js
node tests/verify-slice3.js
node tests/verify-slice4.js
node tests/verify-slice5.js
```

---

## 🎥 1–3 Minute Demo Video Script (For Judges)

* **0:00 - 0:25 (The Problem)**:
  *"Developers building AI apps face an impossible challenge: their code deploys globally, but compliance rules are fragmented. The EU has the binding AI Act, India has the DPDP Act, and the US has NIST guidelines and state-level bias laws. Today, developers get compliance feedback late—after architectural lock-in."*
* **0:25 - 0:50 (The Solution & Signal Detection)**:
  *Open the browser at `http://localhost:5173`.*
  *"JuriSync is a development-time compliance orchestration mesh. Watch what happens when I click 'HR Candidate Ranking': the signal radar instantly detects AI usage, sensitive employment domain, and autonomous rejection."*
* **0:50 - 1:30 (Multi-Country Guidance & Inspectable Evidence)**:
  *Scroll down to the 3 jurisdiction cards and tension alert.*
  *"In seconds, JuriSync synthesizes three regimes: EU AI Act Annex III High-Risk classification, India DPDP Data Fiduciary rules, and US NYC Local Law 144 AEDT bias audit requirements. Crucially, JuriSync flags a potential cross-jurisdictional tension for legal review: US law requires retaining candidate scoring telemetry for annual bias audits, while India DPDP Section 8(7) requires data erasure upon hiring completion! JuriSync surfaces architectural exploration considerations to help engineers and legal teams reconcile these requirements. And every finding includes an inspectable evidence drawer linking directly to official legislative texts."*
* **1:30 - 2:00 (Checklist & MCP Protocol Integration)**:
  *Click 'Copy Checklist' and open the 'MCP Protocol' dialog.*
  *"With one click, the developer gets an actionable markdown checklist for their repository. And because JuriSync implements the Model Context Protocol, AI agents in Cursor or Claude can call this tool over stdio while writing code. JuriSync proves that development-time regulatory intelligence is practical, essential, and ready for modern AI engineering."*

---

## 📜 Devpost Hackathon Deliverables

- [x] **Project started from an empty folder** during the event window.
- [x] **Devpost Learn Skill Pack integrated** (`1-start`, `2-scope`, `3-prd`, `4-spec`, `5-build`, `6-ship`).
- [x] Public planning documents included: [`scope.md`](file:///f:/Projects/Devpost/MCP/scope.md), [`prd.md`](file:///f:/Projects/Devpost/MCP/prd.md), [`spec.md`](file:///f:/Projects/Devpost/MCP/spec.md), and [`app-map.html`](file:///f:/Projects/Devpost/MCP/devpost/app-map.html).
- [x] Complete runnable proof of concept with passing automated test suite.
- [x] Functional Model Context Protocol (MCP) stdio server implementation.

---

## ⚖️ Legal Disclaimer
*JuriSync is an automated regulatory intelligence proof-of-concept designed to assist software developers in identifying potential compliance considerations during early-stage architecture. It does not provide formal legal advice, legal representation, or a guarantee of compliance.*
