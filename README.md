# JuriSync ⚖️⚡

> **A Development-Time Cross-Jurisdictional Compliance Orchestration Layer for AI-Assisted Software Engineering**  
> *Translating natural language system designs into deterministic, multi-jurisdiction regulatory intelligence before architectural lock-in.*

[![Live Deployment](https://img.shields.io/badge/Live_Deployment-Vercel-000000.svg?logo=vercel&logoColor=white)](https://jurisync-one.vercel.app/)
[![npm package](https://img.shields.io/npm/v/jurisync.svg?color=cb3837&logo=npm)](https://www.npmjs.com/package/jurisync)
[![MCP Protocol v1.0](https://img.shields.io/badge/MCP-Protocol_v1.0-6366f1.svg)](https://modelcontextprotocol.io/)
[![EU AI Act](https://img.shields.io/badge/EU_AI_Act-Reg_2024%2F1689-003399.svg)](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689)
[![India DPDP 2023](https://img.shields.io/badge/India_DPDP-Act_22_of_2023-FF9933.svg)](https://www.meity.gov.in/content/digital-personal-data-protection-act-2023)
[![NIST AI RMF 1.0](https://img.shields.io/badge/NIST-AI_RMF_1.0-red.svg)](https://www.nist.gov/itl/ai-risk-management-framework)
[![CI Matrix](https://github.com/thesumedh/jurisync/actions/workflows/ci.yml/badge.svg)](https://github.com/thesumedh/jurisync/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🌐 Quick Links

* **Live Interactive Console**: [https://jurisync-one.vercel.app/](https://jurisync-one.vercel.app/)
* **npm Registry**: [https://www.npmjs.com/package/jurisync](https://www.npmjs.com/package/jurisync) (`npx -y jurisync`)
* **GitHub Repository**: [https://github.com/thesumedh/jurisync](https://github.com/thesumedh/jurisync)
* **Model Context Protocol (MCP) Stdio Server**: [`mcp-server.js`](mcp-server.js)
* **Automated Test Suite**: `npm test` (5 verification suites covering signals, rules, tension, and MCP)

---

## 🎯 Executive Summary & The Problem

As autonomous AI coding assistants (such as Claude Desktop, Cursor, and agentic IDEs) become ubiquitous, developers are building and deploying software at unprecedented speeds. However, these systems operate in a regulatory vacuum:

1. **Regulatory Fragmentation**: AI governance is not unified. The European Union enforces the binding **EU AI Act (Regulation 2024/1689)** and **GDPR**; India mandates strict data handling under the **Digital Personal Data Protection (DPDP) Act 2023**; while the United States relies on a mosaic of voluntary guidance (**NIST AI RMF 1.0**), federal enforcement (**FTC Act Section 5**), and regional statutes (**NYC Local Law 144**, **Illinois BIPA**, **HIPAA**).
2. **Architectural Lock-In**: Discovering regulatory non-compliance during post-launch legal audits is catastrophic. Rewriting database schemas to accommodate erasure mandates or retrofitting human-in-the-loop workflows after system delivery costs orders of magnitude more than designing for compliance upfront.
3. **The Hallucination Danger in Legal AI**: Generic, ungrounded Large Language Models frequently hallucinate statutory sections, invent non-existent precedents, or fail to distinguish between binding statutory mandates and voluntary frameworks. In high-stakes enterprise compliance, unverified model output is a severe liability.

**JuriSync** resolves this problem at the architectural inception phase. By pairing a deterministic signal extraction engine with a curated, gazette-grounded statutory knowledge base, JuriSync evaluates natural language feature descriptions and outputs structured multi-jurisdiction requirements, flags potential cross-border tensions, and generates actionable developer checklists.

```
┌─────────────────────────┐     ┌────────────────────────┐     ┌────────────────────────┐
│ Plain-Language Feature  │ ──► │ Deterministic Signal   │ ──► │ Curated Statutory      │
│ Description / PR Prompt │     │ Extraction Radar       │     │ Knowledge Base         │
└─────────────────────────┘     └────────────────────────┘     └────────────────────────┘
                                                                            │
┌─────────────────────────┐     ┌────────────────────────┐                  │
│ Actionable Developer    │ ◄── │ Cross-Jurisdictional   │ ◄────────────────┘
│ Checklist & MCP Output  │     │ Tension Engine         │
└─────────────────────────┘     └────────────────────────┘
```

---

## 🏛️ Responsible AI & Governance Principles

JuriSync is engineered with strict ethical and operational guardrails:

* **Strict Non-Hallucinatory Guarantee**: Findings are not dynamically hallucinated by an ungrounded model. Every requirement maps deterministically to a verified statutory rule ID and links directly to official government gazettes (EU Official Journal, MeitY Gazette of India, US Federal Register, NYC Administrative Code).
* **Binding vs. Voluntary Explicit Classification**: In international compliance, conflating voluntary guidance with statutory mandates causes confusion. JuriSync strictly tags every finding as either **`[BINDING]`** (mandatory law carrying statutory penalties) or **`[VOLUNTARY]`** (industry risk-management frameworks and best practices).
* **Zero-Telemetry Privacy-by-Design**: The web dashboard runs 100% client-side in the user's browser, and the MCP server runs locally over stdio. No feature descriptions, candidate data, or proprietary prompts are ever transmitted to third-party servers.
* **Human-in-the-Loop Decision Support**: JuriSync does not replace legal counsel. It serves as an architectural bridge between engineering teams and compliance officers, surfacing friction points before technical lock-in occurs.

---

## ⚡ Core Capabilities

| Capability | Technical Mechanism | Impact |
|---|---|---|
| **Risk Signal Radar** | Lexical and semantic token extraction detecting: `AI System`, `Personal Data (PII)`, `Biometric Vectors`, `Employment/Hiring`, `Health/Clinical`, `Autonomous Decisions`, `Minor/Children Data` | Instantly exposes the regulatory surface area of any proposed feature |
| **Multi-Jurisdiction Synthesis** | Parallel evaluation against EU (AI Act + GDPR), India (DPDP Act + IT Act), and US (NIST + FTC + NYC LL144 + BIPA + HIPAA) frameworks | Delivers a unified global posture in sub-50 milliseconds |
| **Statutory Tension Engine** | Cross-jurisdictional conflict detection identifying opposing legal obligations across borders | Highlights friction points (e.g. US bias audit data retention vs India DPDP purpose-fulfillment erasure) |
| **Traceable Evidence Drawers** | Persistent citations linking directly to official government gazettes and statutory texts | Empowers legal teams to immediately verify the exact section and paragraph of law |
| **Developer Action Checklist** | Automatic synthesis of Markdown `- [ ]` tasks grouped by architectural domain | Ready to copy directly into GitHub Issues, PR descriptions, or Jira tickets |
| **Model Context Protocol (MCP)** | Headless JSON-RPC 2.0 stdio server (`mcp-server.js` / `npx jurisync`) | Enables autonomous AI coding assistants (Claude Desktop, Cursor, Antigravity) to query compliance in real time |

---

## 💼 Real-World Presets & Evaluated Domains

JuriSync comes preloaded with four production scenarios illustrating complex cross-border compliance tensions:

| Preset Scenario | Primary Domain Signals | Cross-Jurisdictional Finding & Tension Highlight |
|---|---|---|
| **HR Candidate Ranking & CV Screening** | `AI System`, `Employment`, `Personal Data`, `Autonomous Actions` | **EU AI Act Annex III** classifies CV filtering as High-Risk requiring human oversight. **NYC Local Law 144** mandates annual bias audits and log retention, creating tension with **India DPDP § 8(7)** purpose-completion erasure mandates. |
| **Biometric Face Clustering & Photos** | `AI System`, `Personal Data`, `Biometric Data` | **GDPR Article 9 & 35** requires explicit standalone consent and a formal DPIA. **Illinois BIPA (740 ILCS 14/)** introduces strict liability with private rights of action for unreleased biometric embeddings. |
| **Customer Support RAG & Chatbot** | `AI System`, `Personal Data` | **EU AI Act Article 50** mandates conspicuous synthetic AI disclosure. **FTC Act Section 5** enforces against undisclosed secondary model training on user prompts. **India DPDP § 5(3)** requires notices in 22 languages. |
| **Clinical Triage & Diagnostic Assistant** | `AI System`, `Health / Clinical`, `Personal Data` | **EU AI Act Article 6 / MDR** classifies SaMD as high risk. **HIPAA Security Rule (45 CFR § 164.312)** demands BAAs and technical encryption. **India IT (SPDI) Rules 2011** mandates written consent for medical records. |

---

## ⏱️ Performance & System Benchmarks

* **Deterministic Execution Speed**: `< 5 ms` end-to-end evaluation latency across all 3 jurisdictions.
* **Network & Privacy Footprint**: `0 KB` external egress. Zero remote API dependencies, zero prompt exfiltration, and 100% offline-operable via stdio or client-side WASM/ESM.
* **Package Footprint**: `41.7 kB` total tarball on npm (`jurisync@1.0.1`).
* **Test Verification**: 100% test pass rate across 5 modular integration and protocol verification suites (`npm test`).

---

## 📐 System Architecture

JuriSync operates as a modular, decoupled engine that can run as a client-side web application, a headless CLI pipeline, or an MCP server:

```
                          [ Client Interface ]
          ┌─────────────────────────┬─────────────────────────┐
          │  Web Application (Vite) │  AI Agent / IDE (MCP)   │
          │  jurisync-one.vercel.app│  Claude, Cursor, CLI    │
          └────────────┬────────────┴────────────┬────────────┘
                       │                         │
                       ▼                         ▼
             [ DOM Orchestrator ]      [ JSON-RPC 2.0 Stdio ]
             (src/main.js)             (mcp-server.js)
                       │                         │
                       └────────────┬────────────┘
                                    │
                                    ▼
                     [ Compliance Orchestrator ]
                     (src/engine/orchestrator.js)
                                    │
                       ┌────────────┴────────────┐
                       ▼                         ▼
            [ Signal Extractor ]       [ Rule Engine Evaluator ]
         (src/engine/signalExtractor)    (src/engine/ruleEngine.js)
                       │                         │
                       │           ┌─────────────┴─────────────┐
                       │           ▼                           ▼
                       │     [ Statutory DB ]        [ Domain Knowledge ]
                       │     (src/data/rules.js)  (src/engine/knowledgeBase)
                       │           │                           │
                       └───────────┼───────────────────────────┘
                                   │
                                   ▼
                   [ Cross-Border Tension Engine ]
                   (src/engine/tensionEngine.js)
                                   │
                                   ▼
                   [ Structured Compliance Dossier ]
              ┌────────────────────┼────────────────────┐
              ▼                    ▼                    ▼
     [ Visual Dashboard ]  [ Markdown Checklist ]  [ MCP Tool Output ]
```

### Module Breakdown

* **`src/engine/signalExtractor.js`**: Analyzes natural language strings using token matching, regex boundary guards, and domain heuristics to generate a structured `SignalVector`.
* **`src/data/rules.js` & `src/data/rules.json`**: The authoritative repository of 15 curated statutory rules across EU, India, and US jurisdictions with full citations, legal classifications, and actionable instructions.
* **`src/engine/knowledgeBase.js`**: Evaluates signal vectors to produce jurisdiction-specific risk postures, categorizing risk tiers and synthesizing findings.
* **`src/engine/tensionEngine.js`**: Analyzes multi-country findings to identify legal friction points where obligations in one jurisdiction create compliance challenges in another.
* **`src/engine/orchestrator.js`**: Top-level coordinator that runs the extraction, rule evaluation, tension analysis, and generates the consolidated developer checklist.
* **`mcp-server.js`**: Standalone, zero-dependency Node.js stdio server implementing the Model Context Protocol (JSON-RPC 2.0).

---

## 📊 Curated Statutory Coverage Matrix

JuriSync tracks 15 specific statutory provisions covering key AI deployment domains:

| Jurisdiction | Statutory Instrument | Rule ID | Legal Status | Core Mandate / Finding | Gazette Source |
|---|---|---|---|---|---|
| 🇪🇺 **EU** | **EU AI Act** (Reg. 2024/1689, Annex III.4) | `eu_ai_act_employment_high_risk` | **BINDING** | AI used in recruitment, candidate screening, or employee evaluation is classified as High-Risk; requires technical documentation, quality management, and human oversight. | [EU Official Journal](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689) |
| 🇪🇺 **EU** | **EU GDPR** (Reg. 2016/679, Article 22) | `eu_gdpr_employment_automated_decisions` | **BINDING** | Prohibits solely automated decision-making producing legal or similarly significant effects without human intervention and right to contest. | [EUR-Lex](https://eur-lex.europa.eu/eli/reg/2016/679/oj) |
| 🇪🇺 **EU** | **EU GDPR** (Article 9 & Article 35) | `eu_gdpr_biometric_special_category` | **BINDING** | Biometric data processing is Special Category; requires explicit consent or statutory exception, plus a mandatory Data Protection Impact Assessment (DPIA). | [EUR-Lex](https://eur-lex.europa.eu/eli/reg/2016/679/oj) |
| 🇪🇺 **EU** | **EU AI Act** (Article 50) | `eu_ai_act_transparency_chatbots` | **BINDING** | AI systems interacting with natural persons (chatbots, RAG systems) must provide clear disclosure that the user is interacting with AI. | [EU Official Journal](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689) |
| 🇪🇺 **EU** | **EU AI Act** (Article 6 & Annex I) | `eu_ai_act_health_high_risk` | **BINDING** | AI clinical decision support qualifying as Software as a Medical Device (SaMD) under EU MDR 2017/745 is high-risk; requires Notified Body assessment. | [EU Official Journal](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689) |
| 🇮🇳 **India** | **DPDP Act 2023** (Sections 4, 5 & 6) | `in_dpdp_candidate_data_fiduciary` | **BINDING** | Processing personal data establishes Data Fiduciary duties; requires clear itemized notice and verifiable consent before ingestion. | [MeitY Gazette](https://www.meity.gov.in/content/digital-personal-data-protection-act-2023) |
| 🇮🇳 **India** | **DPDP Act 2023** (Section 8(7)) | `in_dpdp_retention_erasure_mandate` | **BINDING** | Mandatory data erasure upon consent withdrawal or purpose completion, subject to statutory legal-compliance exceptions. | [MeitY Gazette](https://www.meity.gov.in/content/digital-personal-data-protection-act-2023) |
| 🇮🇳 **India** | **DPDP Act 2023** (Section 9) | `in_dpdp_children_tracking_ban` | **BINDING** | Prohibits tracking, behavioural monitoring, or targeted advertising directed at individuals under 18; requires verifiable parental consent. | [MeitY Gazette](https://www.meity.gov.in/content/digital-personal-data-protection-act-2023) |
| 🇮🇳 **India** | **DPDP Act 2023** (Sections 5(3) & 12) | `in_dpdp_multilingual_notice_grievance` | **BINDING** | Data principals must be provided notice in English or any of the 22 scheduled Indian languages, alongside a designated Grievance Officer. | [MeitY Gazette](https://www.meity.gov.in/content/digital-personal-data-protection-act-2023) |
| 🇮🇳 **India** | **IT Act 2000** § 43A / **SPDI Rules 2011** | `in_it_spdi_health_records` | **BINDING** | Medical/health records constitute Sensitive Personal Data (SPDI); requires reasonable security standards (ISO 27001) and privacy disclosure. | [MeitY Notification](https://www.meity.gov.in/sites/upload_files/dit/files/GSR313E_10511%281%29.pdf) |
| 🇺🇸 **US** | **NIST AI RMF 1.0** (Measure 2.5) & EEOC | `us_nist_employment_bias_testing` | **VOLUNTARY** | Voluntary risk management framework recommending empirical bias testing, selection ratio tracking, and disparate impact evaluations. | [NIST Publications](https://www.nist.gov/itl/ai-risk-management-framework) |
| 🇺🇸 **US** | **NYC Local Law 144** (Admin Code § 20-870) | `us_nyc_local_law_144_aedt` | **BINDING** | Automated Employment Decision Tools (AEDT) used in NYC require an annual independent bias audit and 10-day advance notice to candidates. | [NYC Consumer Affairs](https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page) |
| 🇺🇸 **US** | **FTC Act Section 5** (15 U.S.C. § 45) | `us_ftc_act_sec5_algorithmic_truth` | **BINDING** | Prohibits deceptive claims regarding AI accuracy, undisclosed commercial use of user prompts for training, and unsubstantiated safety claims. | [FTC Policy](https://www.ftc.gov/business-guidance/blog/2023/02/keep-your-ai-claims-check) |
| 🇺🇸 **US** | **Illinois BIPA** (740 ILCS 14/) | `us_illinois_bipa_biometric_release` | **BINDING** | Strict private right of action with statutory damages for capturing facial geometry or biometric embeddings without prior written release. | [Illinois General Assembly](https://www.ilga.gov/legislation/ilcs/ilcs3.asp?ActID=3004) |
| 🇺🇸 **US** | **HIPAA Security Rule** (45 CFR § 164.312) | `us_hipaa_phi_ai_systems` | **BINDING** | AI processing Protected Health Information (PHI) requires Business Associate Agreements (BAAs), end-to-end encryption, and audit controls. | [HHS Office for Civil Rights](https://www.hhs.gov/hipaa/for-professionals/security/laws-regulations/index.html) |

---

## 🤖 Model Context Protocol (MCP) Integration

JuriSync implements the open **Model Context Protocol (v1.0)** standard, allowing AI coding assistants to invoke regulatory compliance tools autonomously during system design or code generation.

### Exposed MCP Tools

| Tool Name | Parameters | Description |
|---|---|---|
| `analyze_compliance` | `feature_description` (string, required), `jurisdictions` (array, optional) | Full orchestration pipeline: extracts signals, evaluates statutory rules, detects cross-border tensions, and generates a structured checklist. |
| `get_statutory_rule` | `rule_id` (string, required) | Retrieves full statutory citation, legal status, gazette link, and developer action for a specific rule. |
| `list_supported_regulations` | *(none)* | Returns the complete library of supported statutory instruments and tracked regulations. |

### Configuration for Claude Desktop / Cursor / Antigravity

Because JuriSync is published to the npm registry, you can configure it with **zero local installation** using `npx`:

```json
{
  "mcpServers": {
    "jurisync": {
      "command": "npx",
      "args": ["-y", "jurisync"]
    }
  }
}
```

*(Alternatively, if running from a local git clone, specify `"command": "node"` with `"args": ["/absolute/path/to/jurisync/mcp-server.js"]`)*.

### CLI / Headless Verification

You can query the MCP server directly via stdio JSON-RPC 2.0 without cloning:

```bash
# Query compliance via npx (Linux / macOS / Git Bash)
echo '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"analyze_compliance","arguments":{"feature_description":"AI system filtering resume CVs and automatically rejecting candidates in the EU and India"}}}' | npx -y jurisync

# Windows PowerShell
$request = '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"analyze_compliance","arguments":{"feature_description":"AI system filtering resume CVs and automatically rejecting candidates in the EU and India"}}}'
$request | npx -y jurisync
```

### Programmatic SDK Usage (Node.js)

JuriSync can also be integrated directly into your backend services, CI linters, or custom compliance agents:

```bash
npm install jurisync
```

```javascript
import { orchestrateCompliance } from 'jurisync';

const result = orchestrateCompliance(
  'A medical triage chatbot that diagnoses patient symptoms and recommends treatments'
);

console.log('Detected Risk Signals:', result.signals);
console.log('EU Findings:', result.guidance.EU.findings);
console.log('Cross-Border Tensions:', result.tensions);
console.log('Action Checklist:\n', result.developerChecklist);
```

---

## 💻 Local Installation & Setup

### Prerequisites

* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/thesumedh/jurisync.git
cd jurisync
npm install
```

### 2. Launch Local Development Server

```bash
npm run dev
```

The web console is available at `http://localhost:5173`.

### 3. Build for Production

```bash
npm run build
```

Generates optimized static assets in the `dist/` directory ready for deployment on Vercel, Netlify, or any static host.

### 4. Execute the Test Suite

```bash
npm test
```

Runs 5 automated verification suites:
1. `tests/verify-target-flow.js` — End-to-end pipeline execution and checklist generation.
2. `tests/verify-slice2.js` — Risk signal extraction boundary tests.
3. `tests/verify-slice3.js` — Statutory rule engine mapping across all 3 jurisdictions.
4. `tests/verify-slice4.js` — Cross-border tension detection and markdown synthesis.
5. `tests/verify-slice5.js` — MCP JSON-RPC protocol compliance and tool invocation.

---

## 🔮 Future Scope & Engineering Roadmap

JuriSync is designed with an extensible modular foundation. The planned engineering roadmap includes:

### Phase 1: Static Codebase & AST Compliance Scanning
* **AST Parsers for Python & TypeScript/JavaScript**: Build static code analyzers (leveraging Tree-sitter / Babel) that inspect repository source code to detect compliance triggers automatically:
  * Scanning dependencies for biometric libraries (`face-api.js`, OpenCV, deepface).
  * Checking database schemas and ORMs (Prisma, TypeORM, SQLAlchemy) for absent TTL / automatic erasure routines required by India DPDP § 8(7).
  * Identifying automated decision branches (e.g. `rejectCandidate()` without human review gates) to flag EU GDPR Art. 22 triggers.
  * Detecting LLM API calls that transmit prompt payloads without explicit PII sanitization.

### Phase 2: Formal Verification of Statutory Incompatibilities (SMT / Z3)
* **Mathematical Modeling of Regulatory Divergence**: Formalize multi-jurisdictional constraints using Satisfiability Modulo Theories (SMT) via solvers like Z3:
  * Modeling retention minimums (e.g. NYC LL144 1-year bias audit trail retention) against maximum retention caps (e.g. DPDP purpose-completion erasure).
  * Automatically computing the mathematical solution space for legal data architectures (e.g. identifying whether mathematical pseudonymization / k-anonymity satisfies both sets of constraints).

### Phase 3: Global Regulatory Expansion
* **Asia-Pacific**:
  * **Singapore**: Personal Data Protection Act (PDPA) & AI Verify Governance Framework.
  * **Japan**: Act on the Protection of Personal Information (APPI) & METI AI Guidelines.
  * **South Korea**: Personal Information Protection Act (PIPA).
* **Americas**:
  * **Brazil**: Lei Geral de Proteção de Dados (LGPD).
  * **California**: CCPA / CPRA & California SB 1047 (Safe and Secure Innovation for Frontier AI Models Act).
  * **Canada**: Artificial Intelligence and Data Act (AIDA - Bill C-27).
* **EMEA**:
  * **United Kingdom**: UK AI Regulation Policy Framework (DSIT pro-innovation approach).
  * **United Arab Emirates**: UAE Artificial Intelligence Ethics Principles & Guidelines.

### Phase 4: Automated CI/CD Compliance Gatekeeper
* **GitHub Action & GitLab CI Pipeline Plugin**:
  * A lightweight `jurisync-action` that runs on every Pull Request.
  * Scans PR descriptions and diffs against the JuriSync rule engine.
  * Automatically generates compliance comments on PRs and blocks merges if an architectural change introduces an unreviewed High-Risk obligation.

### Phase 5: Cryptographic Audit Trails & Conformity Dossiers
* **EU AI Act Annex IV Technical Documentation Generator**:
  * Automatically compiles machine-readable compliance dossiers in JSON-LD and PDF formats.
  * Generates cryptographic SBOM-style attestations signed with Sigstore / Cosign, verifying that compliance checks were executed during design time.

### Phase 6: Multi-Tenant Enterprise Policy DSL
* **Custom Enterprise Rule Definitions**:
  * Provide an intuitive YAML / JSON-based Domain Specific Language (DSL) enabling enterprise legal and governance teams to define internal proprietary compliance policies alongside public statutes.

---

## ⚖️ Legal Disclaimer & Safe Harbor

**IMPORTANT NOTICE**:  
JuriSync is an automated technical decision-support and regulatory intelligence tool intended to assist software developers, system architects, and AI engineers in identifying potential compliance considerations during early-stage software design. 

* **Not Legal Advice**: JuriSync does not provide legal advice, legal representation, or formal statutory opinions.
* **No Guarantee of Conformity**: Utilizing JuriSync or implementing its generated checklists does not guarantee compliance with any municipal, state, federal, or international law, nor does it guarantee immunity from regulatory enforcement or statutory fines.
* **Independent Legal Verification Required**: All statutory references, findings, classifications, and tension flags must be reviewed, verified, and validated by qualified legal counsel admitted to practice in the relevant jurisdictions prior to deployment.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
