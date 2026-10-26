# JuriSync ⚖️⚡

> **A Development-Time Cross-Jurisdictional Compliance Orchestration Layer for AI-Assisted Application Development**  
> *Built for the Devpost "Build With AI: Basics" Hackathon (October 2026)*

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-black.svg?logo=vercel)](https://jurisync.vercel.app)
[![MCP Protocol v1.0](https://img.shields.io/badge/MCP-Protocol_v1.0-6366f1.svg)](https://modelcontextprotocol.io/)
[![EU AI Act](https://img.shields.io/badge/EU_AI_Act-Reg_2024%2F1689-blue.svg)](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689)
[![India DPDP 2023](https://img.shields.io/badge/India_DPDP-Act_22_of_2023-orange.svg)](https://www.meity.gov.in/content/digital-personal-data-protection-act-2023)
[![NIST AI RMF 1.0](https://img.shields.io/badge/NIST-AI_RMF_1.0-red.svg)](https://www.nist.gov/itl/ai-risk-management-framework)
[![CI Tests](https://github.com/thesumedh/jurisync/actions/workflows/ci.yml/badge.svg)](https://github.com/thesumedh/jurisync/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🎯 What Is JuriSync?

**JuriSync** is a development-time compliance decision-support tool that turns plain-language AI feature descriptions into structured, multi-country regulatory guidance — before a single line of production code is written.

Instead of an ungrounded LLM generating legal-sounding text, JuriSync runs a **deterministic pipeline**:

```
Feature Description  →  Risk Signal Detection  →  Curated Statutory Rules  →  Sourced Findings  →  Actionable Developer Checklist
```

Every finding is traced to an exact statutory provision (EU Official Journal, MeitY Gazette, NIST publication), and explicitly labelled **BINDING** or **VOLUNTARY**. No guessing. No hallucinated law.

---

## 🔬 The Research Question

> *"How can development-time orchestration provide dynamic, cross-jurisdictional compliance guidance to developers and autonomous AI coding agents before architectural lock-in?"*

AI coding assistants increasingly use the **Model Context Protocol (MCP)** to generate software. But they operate without real-time awareness of international regulatory divergence. A feature that is fine under US voluntary frameworks may trigger mandatory conformity assessments under EU AI Act Annex III, or violate India's DPDP Act purpose-limitation rules — **before the developer even knows there is a problem.**

JuriSync solves this at the source: at design time, in the developer's own language.

---

## 🚀 Key Features

| Feature | Description |
|---|---|
| ⚡ **4 Real-World Presets** | HR Candidate Ranking, Biometric Face Clustering, Customer Support RAG, Clinical Triage Assistant |
| 🔍 **Risk Signal Radar** | Detects: AI/ML System, Personal Data (PII), Biometric Data, Employment Domain, Health/Clinical, Autonomous Decisions, Multi-Jurisdiction |
| 🇪🇺 **EU AI Act + GDPR** | Annex III High-Risk classification, GDPR Art. 22 automated decisions, Art. 9 biometric special-category, Art. 50 transparency, Art. 35 DPIA |
| 🇮🇳 **India DPDP Act 2023** | Data Fiduciary obligations, Section 8(7) erasure mandate, Section 9 children's tracking ban, Section 5(3) multilingual notice + IT Act SPDI |
| 🇺🇸 **US Laws** | NIST AI RMF 1.0, FTC Act Section 5, NYC Local Law 144 AEDT bias audits, Illinois BIPA, HIPAA Technical Safeguards |
| ⚠️ **Cross-Border Divergence Alerts** | Flags *potential* statutory tensions (e.g. US bias-audit retention vs India DPDP erasure) without claiming premature legal certainty |
| 🔎 **Inspectable Evidence Drawers** | Official gazette source links for every finding — EU Official Journal, MeitY, NIST, NYC Admin Code |
| 📋 **One-Click Markdown Checklist** | Exports developer-ready `- [ ]` action items for GitHub Issues, PRs, or sprint boards |
| 🤖 **Standalone MCP Stdio Server** | `node mcp-server.js` — 3 tools over JSON-RPC 2.0 for AI coding agents (Claude Desktop, Cursor, Antigravity) |

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
   [ Signal Extraction Engine ]  →  detects: AI?, PII?, Biometric?, Employment?, Health?, Autonomy?
              │
              ├───► [ EU Engine ]    →  EU AI Act (2024/1689) + GDPR (2016/679)
              ├───► [ India Engine ] →  DPDP Act 2023 + IT Act 2000 / SPDI Rules 2011
              └───► [ US Engine ]   →  NIST AI RMF + FTC + NYC LL144 + BIPA + HIPAA
              │
              ▼
   [ Tension Detection Engine ]  →  flags cross-border statutory friction for legal review
              │
              ▼
   [ Structured Compliance Report ]
              ├── Live Visual Dashboard Cards (web UI)
              ├── Markdown Developer Checklist (one-click export)
              └── JSON-RPC Tool Response (MCP agent-ready)
```

---

## 📂 File Structure

```
jurisync/
├── index.html                     # Dashboard entry point
├── package.json                   # Vite project manifest
├── vite.config.js                 # Dev server configuration
├── vercel.json                    # Vercel deployment config
├── mcp-server.js                  # Standalone MCP stdio server (JSON-RPC 2.0)
├── LICENSE                        # MIT License
├── src/
│   ├── main.js                    # App controller & DOM orchestrator
│   ├── styles/
│   │   └── main.css               # Design system (Claude-inspired aesthetic)
│   ├── engine/
│   │   ├── signalExtractor.js     # Lexical risk signal detection
│   │   ├── rules.js               # 15 curated statutory rules (EU, India, US)
│   │   ├── tensionEngine.js       # Cross-border divergence detection
│   │   └── orchestrator.js        # Pipeline orchestrator & checklist generator
│   └── data/
│       └── scenarios.js           # 4 real-world quick-load presets
├── tests/
│   ├── verify-target-flow.js      # End-to-end pipeline integration test
│   ├── verify-slice2.js           # Signal extraction unit tests
│   ├── verify-slice3.js           # Statutory rule engine tests
│   ├── verify-slice4.js           # Tension engine & checklist tests
│   └── verify-slice5.js           # MCP JSON-RPC protocol tests
├── devpost/                       # Devpost Learn Hackathon Artifacts
│   ├── scope.md                   # Scope definition
│   ├── prd.md                     # Product requirements
│   ├── spec.md                    # Technical specification
│   ├── checklist.md               # Verified build checklist (all 5 slices ✅)
│   └── app-map.html               # Interactive architecture code tour
├── scope.md                       # Root scope artifact
├── prd.md                         # Root PRD artifact
└── spec.md                        # Root technical specification
```

---

## 💻 Quick Start

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher

### 1. Run the Web Dashboard Locally

```bash
git clone https://github.com/thesumedh/jurisync.git
cd jurisync
npm install
npm run dev
```

Open **[http://localhost:5173](http://localhost:5173)** in your browser. Click any preset or type a custom feature description and hit **Ctrl+Enter**.

### 2. Run the Automated Test Suite

```bash
npm test
```

All 5 test suites run:  `verify-target-flow` → `slice2` → `slice3` → `slice4` → `slice5` (MCP JSON-RPC).

### 3. Run the MCP Stdio Server (Headless / Agent Mode)

Query the compliance engine directly from your terminal:

```bash
# Linux / macOS
echo '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"analyze_compliance","arguments":{"feature_description":"An AI system that ranks job applicants using CVs in the EU and India"}}}' | node mcp-server.js

# Windows PowerShell
$req = '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"analyze_compliance","arguments":{"feature_description":"An AI system that ranks job applicants using CVs in the EU and India"}}}'
$req | node mcp-server.js
```

### 4. Use as an MCP Server in Claude Desktop / Cursor / Antigravity

Add JuriSync to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "jurisync": {
      "command": "node",
      "args": ["/absolute/path/to/jurisync/mcp-server.js"]
    }
  }
}
```

Now your AI coding agent can invoke `analyze_compliance`, `get_statutory_rule`, and `list_supported_regulations` in real time while writing code.

**Available MCP Tools:**

| Tool | Description |
|---|---|
| `analyze_compliance` | Full pipeline: signals → EU/India/US findings → tensions → checklist |
| `get_statutory_rule` | Retrieve a single rule by ID with full statutory citation |
| `list_supported_regulations` | List all 15 curated rules across all jurisdictions |

---

## 📊 Regulatory Coverage (15 Curated Statutory Rules)

| Jurisdiction | Instrument | Rule ID |
|---|---|---|
| 🇪🇺 EU | EU AI Act (Reg. 2024/1689) — Annex III Employment High-Risk | `eu_ai_act_employment_high_risk` |
| 🇪🇺 EU | EU GDPR (Reg. 2016/679) — Art. 22 Automated Decision-Making | `eu_gdpr_employment_automated_decisions` |
| 🇪🇺 EU | EU GDPR — Art. 9 Biometric Special Category + Art. 35 DPIA | `eu_gdpr_biometric_special_category` |
| 🇪🇺 EU | EU AI Act — Art. 50 Chatbot Transparency | `eu_ai_act_transparency_chatbots` |
| 🇪🇺 EU | EU AI Act — Art. 6 / Annex I Medical Device AI (SaMD) | `eu_ai_act_health_high_risk` |
| 🇮🇳 India | DPDP Act 2023 — Sec. 4,5,6 Data Fiduciary Obligations | `in_dpdp_candidate_data_fiduciary` |
| 🇮🇳 India | DPDP Act 2023 — Sec. 8(7) Data Erasure Mandate | `in_dpdp_retention_erasure_mandate` |
| 🇮🇳 India | DPDP Act 2023 — Sec. 9 Children's Data Tracking Ban | `in_dpdp_children_tracking_ban` |
| 🇮🇳 India | DPDP Act 2023 — Sec. 5(3) & 12 Multilingual Notice | `in_dpdp_multilingual_notice_grievance` |
| 🇮🇳 India | IT Act 2000 Sec. 43A + IT (SPDI) Rules 2011 — Health Records | `in_it_spdi_health_records` |
| 🇺🇸 US | NIST AI RMF 1.0 — Measure 2.5 + EEOC Employment Bias | `us_nist_employment_bias_testing` |
| 🇺🇸 US | NYC Local Law 144 — AEDT Mandatory Bias Audit | `us_nyc_local_law_144_aedt` |
| 🇺🇸 US | FTC Act Section 5 — Deceptive AI Claims | `us_ftc_act_sec5_algorithmic_truth` |
| 🇺🇸 US | Illinois BIPA (740 ILCS 14/) — Biometric Data | `us_illinois_bipa_biometric_release` |
| 🇺🇸 US | HIPAA Security Rule (45 CFR 164.312) — PHI AI Systems | `us_hipaa_phi_ai_systems` |

---

## 🎥 Demo Video Script (For Judges)

* **0:00–0:25 (The Problem)**: *"Developers building AI apps face an impossible challenge: compliance rules are fragmented across borders. The EU has the binding AI Act, India has the DPDP Act, and the US has NIST guidelines and state-level bias laws. Developers discover violations post-launch — after architectural lock-in."*

* **0:25–0:50 (Signal Detection)**: *Click the HR Candidate Ranking preset.* *"Watch the Signal Radar: it instantly detects AI usage, Employment domain, Personal Data, and Autonomous Rejection — the exact triggers that determine which international laws apply."*

* **0:50–1:30 (Multi-Country Guidance & Evidence)**: *Scroll to the 3 jurisdiction cards.* *"JuriSync synthesizes EU AI Act Annex III High-Risk classification, India DPDP Data Fiduciary rules, and NYC Local Law 144 bias audit requirements. It flags a potential cross-border divergence: US law requires retaining candidate scoring logs for annual bias audits, while India DPDP Section 8(7) mandates erasure on purpose completion. Every finding includes a source drawer linking to the official gazette."*

* **1:30–2:00 (Checklist & MCP)**: *Click Copy Checklist, then open MCP Protocol.* *"One click exports a Markdown action checklist for your PR. And because JuriSync implements the Model Context Protocol, AI agents in Cursor or Claude can call this tool directly over stdio while writing code."*

---

## 🏗️ CI/CD Pipeline

JuriSync runs a full CI matrix on every push:

- **Node.js versions tested**: 18.x, 20.x, 22.x
- **OS matrix**: Ubuntu, Windows
- **Test suite**: 5 automated verification scripts + production Vite build

[![CI Status](https://github.com/thesumedh/jurisync/actions/workflows/ci.yml/badge.svg)](https://github.com/thesumedh/jurisync/actions)

---

## 📜 Devpost Hackathon Deliverables

- [x] **Project started from an empty folder** during the Devpost submission window.
- [x] **Devpost Learn Skill Pack integrated** (`1-start`, `2-scope`, `3-prd`, `4-spec`, `5-build`, `6-ship`).
- [x] **Planning documents** present: [`scope.md`](scope.md), [`prd.md`](prd.md), [`spec.md`](spec.md), [`devpost/app-map.html`](devpost/app-map.html).
- [x] **Complete runnable proof of concept** — all 5 test suites pass (`npm test`).
- [x] **Functional MCP stdio server** — 3 JSON-RPC 2.0 tools over stdio.
- [x] **CI/CD matrix** — GitHub Actions pipeline on Node 18/20/22 × Ubuntu/Windows.

---

## ⚖️ Legal Disclaimer

*JuriSync is an automated regulatory intelligence proof-of-concept designed to assist software developers in identifying potential compliance considerations during early-stage architecture. It does not provide formal legal advice, legal representation, or a guarantee of compliance. All findings are illustrative only and must be verified by qualified legal counsel before reliance.*
