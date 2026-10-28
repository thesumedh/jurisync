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
* **Full Documentation Portal**: [https://jurisync-one.vercel.app/docs.html](https://jurisync-one.vercel.app/docs.html)
* **npm Registry**: [https://www.npmjs.com/package/jurisync](https://www.npmjs.com/package/jurisync) (`npx -y jurisync`)
* **GitHub Repository**: [https://github.com/thesumedh/jurisync](https://github.com/thesumedh/jurisync)
* **Model Context Protocol (MCP) Stdio Server**: [`mcp-server.js`](mcp-server.js)
* **Automated Test Suite**: `npm test` (6 verification suites covering signals, negations, 32 rules, tensions, and MCP)

---

## 🎯 Executive Summary & The Problem

As autonomous AI coding assistants (such as Claude Desktop, Cursor, and agentic IDEs) become ubiquitous, developers are building and deploying software at unprecedented speeds. However, these systems operate in a regulatory vacuum:

1. **Regulatory Fragmentation**: AI governance is not unified. The European Union enforces the binding **EU AI Act (Regulation 2024/1689)** and **GDPR**; India mandates strict data handling under the **Digital Personal Data Protection (DPDP) Act 2023**; while the United States relies on a mosaic of voluntary guidance (**NIST AI RMF 1.0**), federal enforcement (**FTC Act Section 5**, **FCRA**), and state statutes (**California CCPA/CPRA**, **AB 2013/3211**, **NYC Local Law 144**, **Illinois BIPA**, **HIPAA**).
2. **Architectural Lock-In**: Discovering regulatory non-compliance during post-launch legal audits is catastrophic. Rewriting database schemas to accommodate erasure mandates or retrofitting human-in-the-loop workflows after system delivery costs orders of magnitude more than designing for compliance upfront.
3. **The Hallucination Danger in Legal AI**: Generic, ungrounded Large Language Models frequently hallucinate statutory sections, invent non-existent precedents, or fail to distinguish between binding statutory mandates and voluntary frameworks. In high-stakes enterprise compliance, unverified model output is a severe liability.

**JuriSync** resolves this problem at the architectural inception phase. By pairing a deterministic signal extraction engine (featuring compound clause negation detection and signal fidelity scoring) with a curated, gazette-grounded statutory knowledge base of **32 authoritative rules**, JuriSync evaluates natural language feature descriptions, outputs structured multi-jurisdiction requirements, flags cross-border tensions with severity ratings, and generates actionable developer checklists.

```
┌─────────────────────────┐     ┌────────────────────────┐     ┌────────────────────────┐
│ Plain-Language Feature  │ ──► │ Smart Signal Radar     │ ──► │ 32 Curated Statutory   │
│ Description / PR Prompt │     │ (N-Grams + Negations)  │     │ Rules (EU, IN, US)     │
└─────────────────────────┘     └────────────────────────┘     └────────────────────────┘
                                                                             │
┌─────────────────────────┐     ┌────────────────────────┐                  │
│ Actionable Developer    │ ◄── │ Tension Engine         │ ◄────────────────┘
│ Checklist & MCP Output  │     │ (6 Divergences+Severity│
└─────────────────────────┘     └────────────────────────┘
```

---

## 🏛️ Responsible AI & Governance Principles

JuriSync is engineered with strict ethical and operational guardrails:

* **Strict Non-Hallucinatory Guarantee**: Findings are not dynamically hallucinated by an ungrounded model. Every requirement maps deterministically to a verified statutory rule ID and links directly to official government gazettes (EU Official Journal, MeitY Gazette of India, US Federal Register, NYC Administrative Code).
* **Binding vs. Voluntary Explicit Classification**: In international compliance, conflating voluntary guidance with statutory mandates causes confusion. JuriSync strictly tags every finding as either **`[BINDING]`** (mandatory law carrying statutory penalties) or **`[VOLUNTARY]`** (industry risk-management frameworks and best practices).
* **Compound Clause Negation Awareness**: System correctly respects explicit developer exclusions (e.g., *"processes resumes but does not store biometric data or facial scans"*), automatically suppressing false-positive triggers and displaying honored negations.
* **Signal Fidelity Scoring**: Automatically calculates a **0–100% confidence rating** (`HIGH`, `MEDIUM`, `LOW`) based on keyword specificity, signal density, and domain alignment.
* **Zero-Telemetry Privacy-by-Design**: The web dashboard runs 100% client-side in the user's browser, and the MCP server runs locally over stdio. No feature descriptions, candidate data, or proprietary prompts are ever transmitted to third-party servers.
* **Human-in-the-Loop Decision Support**: JuriSync does not replace legal counsel. It serves as an architectural bridge between engineering teams and compliance officers, surfacing friction points before technical lock-in occurs.

---

## ⚡ Core Capabilities

| Capability | Technical Mechanism | Impact |
|---|---|---|
| **Smart Signal Radar** | 15 regulatory trigger dictionaries with n-gram phrase matching, compound clause negation handling, and signal weighting | Exposes the complete statutory surface area while eliminating false positives from negated features |
| **Confidence Scoring** | Quantitative signal fidelity assessment (0–100%) returning `HIGH`, `MEDIUM`, or `LOW` confidence with rationales | Informs engineering and legal teams on the fidelity and depth of the input description |
| **32 Sourced Statutory Rules** | Deterministic evaluation across 11 EU, 11 India, and 10 US provisions with direct official gazette citations | Delivers verifiable global compliance intelligence without model hallucination |
| **Cross-Border Tension Engine** | Models 6 known statutory divergences across jurisdictions with severity ratings (`CRITICAL`, `HIGH`, `MEDIUM`) and likelihood | Surfaces irreconcilable legal conflicts (e.g. US bias audit log retention vs India DPDP purpose-completion erasure) |
| **Traceable Evidence Drawers** | Persistent citations linking directly to official government gazettes, EUR-Lex, and MeitY notifications | Empowers legal teams to immediately verify the exact statutory section and paragraph |
| **Developer Action Checklist** | Automatic synthesis of Markdown `- [ ]` tasks grouped by architectural domain and sovereign law | Ready to copy directly into GitHub Issues, PR descriptions, or Jira sprint tickets |
| **Model Context Protocol (MCP)** | Headless JSON-RPC 2.0 stdio server (`mcp-server.js` / `npx jurisync`) | Enables autonomous AI coding assistants (Claude Desktop, Cursor, Antigravity) to query compliance in real time |

---

## 💼 Real-World Presets & Evaluated Domains

JuriSync comes preloaded with 7 production scenarios illustrating complex cross-border compliance tensions:

| Preset Scenario | Primary Domain Signals | Cross-Jurisdictional Finding & Tension Highlight |
|---|---|---|
| **💼 HR Candidate Ranking & CV Screening** | `ai_decision`, `employment`, `personal_data`, `autonomous_action` | **EU AI Act Annex III** classifies CV filtering as High-Risk requiring human oversight. **NYC Local Law 144** mandates annual bias audits and log retention, creating high-severity tension with **India DPDP § 8(7)** purpose-completion erasure mandates. |
| **💳 Fintech Loan Underwriting & Credit Scoring** | `ai_decision`, `finance_credit`, `personal_data`, `autonomous_action` | **EU AI Act Annex III.5(b)** classifies credit scoring as High-Risk. **RBI Digital Lending Guidelines** require domestic data storage. **US FCRA** mandates actionable adverse action explanations. |
| **🎓 Adaptive Education AI Tutor** | `ai_decision`, `education`, `children`, `personal_data` | **EU AI Act Annex III.3** high-risk education assessment rules. **India DPDP § 9** absolute ban on behavioral tracking or profiling for all minors under 18 vs **US COPPA** under-13 commercial consent threshold. |
| **🎬 Content Moderation & Deepfake Detection** | `ai_decision`, `content_moderation`, `emotion_biometric` | **California AB 2013 / AB 3211** mandatory AI training data transparency and provenance watermarking. **India IT Rules 2021** intermediary due diligence for synthetic deepfakes. |
| **👁️ Biometric Face Clustering & Photos** | `ai_decision`, `personal_data`, `biometric` | **GDPR Article 9 & 35** requires explicit standalone consent and a formal DPIA. **Illinois BIPA (740 ILCS 14/)** introduces strict statutory liability ($1,000–$5,000 per violation) for unreleased biometric embeddings. |
| **🩺 Clinical Triage & Diagnostic Assistant** | `ai_decision`, `health`, `personal_data` | **EU AI Act Article 6 / MDR** classifies SaMD as high risk. **HIPAA Security Rule (45 CFR § 164.312)** demands BAAs and technical encryption. **India IT (SPDI) Rules 2011** mandates written consent for medical records. |
| **💬 Enterprise Support RAG & Chatbot** | `ai_decision`, `personal_data` | **EU AI Act Article 50** mandates conspicuous synthetic AI disclosure. **FTC Act Section 5** enforces against undisclosed secondary model training on user prompts. **India DPDP § 5(3)** requires notices in 22 languages. |

---

## ⏱️ Performance & System Benchmarks

* **Deterministic Execution Speed**: `< 5 ms` end-to-end evaluation latency across all 3 jurisdictions.
* **Network & Privacy Footprint**: `0 KB` external egress. Zero remote API dependencies, zero prompt exfiltration, and 100% offline-operable via stdio or client-side WASM/ESM.
* **Package Footprint**: `41.7 kB` total tarball on npm (`jurisync@1.0.1`).
* **Test Verification**: 100% test pass rate across 6 modular integration and protocol verification suites (`npm test`).

---

## 📊 Curated Statutory Coverage Matrix (32 Rules)

JuriSync tracks 32 specific statutory provisions covering key AI deployment domains:

### 🇪🇺 European Union (11 Rules)

| Rule ID | Instrument & Provision | Status | Core Mandate / Finding |
|---|---|---|---|
| `eu_ai_act_employment_high_risk` | EU AI Act (Annex III, Point 4) | **BINDING** | Recruitment, CV filtering, and candidate evaluation AI is classified as High-Risk; requires human oversight and quality management. |
| `eu_gdpr_employment_automated_decisions` | GDPR (Article 22) | **BINDING** | Prohibits solely automated decisions producing significant legal effects without human intervention. |
| `eu_gdpr_biometric_special_category` | GDPR (Article 9 & 35) | **BINDING** | Biometric data processing requires explicit consent and mandatory Data Protection Impact Assessment (DPIA). |
| `eu_ai_act_transparency_chatbots` | EU AI Act (Article 50) | **BINDING** | AI systems interacting with natural persons must inform individuals they are interacting with an AI system. |
| `eu_ai_act_health_high_risk` | EU AI Act (Article 6 & Annex I) | **BINDING** | AI diagnostic software qualifying as Medical Device (MDR 2017/745) requires conformity assessment. |
| `eu_ai_act_education_high_risk` | EU AI Act (Annex III, Point 3) | **BINDING** | AI used in admissions, automated grading, or student assessment in educational institutions is High-Risk. |
| `eu_ai_act_critical_infrastructure` | EU AI Act (Annex III, Point 2) | **BINDING** | AI safety components in digital infrastructure, water, gas, electricity, or transport networks are High-Risk. |
| `eu_ai_act_credit_scoring_essential_services` | EU AI Act (Annex III, Point 5(b)) | **BINDING** | AI evaluating natural persons for creditworthiness or access to essential financial services is High-Risk. |
| `eu_ai_act_prohibited_emotion_recognition` | EU AI Act (Article 5(1)(f)) | **BINDING** | Strict prohibition on deploying AI emotion recognition systems in workplaces and educational institutions. |
| `eu_ai_act_law_enforcement_public_biometric` | EU AI Act (Annex III, Point 6) | **BINDING** | Law enforcement AI for polygraphs, recidivism prediction, and public biometrics requires strict authorization. |
| `eu_gdpr_cross_border_data_transfer` | GDPR (Articles 44–49) | **BINDING** | Cross-border personal data transfers outside the EEA require Adequacy Decisions, SCCs, or BCRs. |

### 🇮🇳 India (11 Rules)

| Rule ID | Instrument & Provision | Status | Core Mandate / Finding |
|---|---|---|---|
| `in_dpdp_candidate_data_fiduciary` | DPDP Act 2023 (Sections 4, 5 & 6) | **BINDING** | Processing applicant personal data establishes Data Fiduciary duties; requires itemized notice and verifiable consent. |
| `in_dpdp_retention_erasure_mandate` | DPDP Act 2023 (Section 8(7)) | **BINDING** | Mandatory data erasure once recruitment or interaction purpose is satisfied, subject to legal retention exceptions. |
| `in_dpdp_children_tracking_ban` | DPDP Act 2023 (Section 9) | **BINDING** | Prohibits tracking, behavioral monitoring, or targeted ads directed at children under 18; requires parental consent. |
| `in_dpdp_multilingual_notice_grievance` | DPDP Act 2023 (Sections 5(3) & 12) | **BINDING** | Notice must be offered in English and any of the 22 scheduled Indian languages, alongside a designated Grievance Officer. |
| `in_it_spdi_health_records` | IT Act 2000 § 43A / SPDI Rules 2011 | **BINDING** | Health and medical records constitute Sensitive Personal Data (SPDI); requires reasonable security standards (ISO 27001). |
| `in_dpdp_significant_data_fiduciary` | DPDP Act 2023 (Section 10) | **BINDING** | Significant Data Fiduciaries must appoint an Indian-resident DPO, conduct periodic DPIAs, and undergo audits. |
| `in_dpdp_cross_border_transfer_restrictions` | DPDP Act 2023 (Section 16) | **BINDING** | Transfers permitted to foreign jurisdictions unless blacklisted by Central Government notification. |
| `in_dpdp_breach_reporting_dpbi` | DPDP Act 2023 (Section 8(6)) | **BINDING** | Mandatory notification of personal data breaches to the Data Protection Board of India (DPBI) and affected users. |
| `in_dpdp_reasonable_security_safeguards` | DPDP Act 2023 (Section 8(5)) | **BINDING** | Duty to maintain reasonable technical security safeguards; penalties up to ₹250 crore for failure to prevent breach. |
| `in_rbi_digital_lending_ai_underwriting` | RBI Digital Lending Guidelines 2022 | **BINDING** | Regulated lenders must ensure algorithmic underwriting is auditable, explainable, and stored on servers in India. |
| `in_it_rules_intermediary_due_diligence_ai` | IT (Intermediary) Rules 2021 & Advisories | **BINDING** | Intermediaries must label AI-generated synthetic media/deepfakes and deploy automated takedown workflows. |

### 🇺🇸 United States (10 Rules)

| Rule ID | Instrument & Provision | Status | Core Mandate / Finding |
|---|---|---|---|
| `us_nist_employment_bias_testing` | NIST AI RMF 1.0 (Measure 2.5) & EEOC | **VOLUNTARY** | Recommends bias testing, selection ratio tracking, and disparate impact evaluations under Title VII four-fifths rule. |
| `us_nyc_local_law_144_aedt` | NYC Admin Code § 20-870 (AEDT) | **BINDING** | Automated Employment Decision Tools used in NYC require annual independent bias audits and 10-day advance notice. |
| `us_ftc_act_sec5_algorithmic_truth` | FTC Act Section 5 (15 U.S.C. § 45) | **BINDING** | Prohibits deceptive claims regarding AI accuracy, undisclosed commercial use of user data, and hidden algorithmic bias. |
| `us_illinois_bipa_biometric_release` | Illinois BIPA (740 ILCS 14/) | **BINDING** | Strict private right of action for capturing facial geometry or biometric embeddings without prior written release. |
| `us_hipaa_phi_ai_systems` | HIPAA Security Rule (45 CFR § 164.312) | **BINDING** | AI processing Protected Health Information (PHI) requires Business Associate Agreements (BAAs) and audit controls. |
| `us_ccpa_cpra_automated_decision_making` | California CCPA/CPRA (Cal. Civ. Code § 1798.185) | **BINDING** | Consumers have explicit rights to opt out of Automated Decision-Making Technology (ADMT) profiling. |
| `us_california_ai_transparency_watermarking` | California AB 2013 & AB 3211 | **BINDING** | Mandatory public documentation of training data sources and tamper-evident metadata watermarking for synthetic media. |
| `us_ftc_algorithmic_disgorgement_remedy` | FTC Section 5 Enforcement Precedents | **BINDING** | Enforcement remedy mandating permanent destruction of AI models and weights trained on improperly collected data. |
| `us_fcra_automated_credit_adverse_action` | Fair Credit Reporting Act (15 U.S.C. § 1681m) | **BINDING** | AI credit scoring denying loans requires specific, actionable key factor disclosures explaining the denial. |
| `us_illinois_bipa_damages_per_scan_amendment` | Illinois BIPA § 20 & 2024 SB 2979 | **BINDING** | Caps statutory damages for repeated biometric captures to a single recovery per person, retaining private class actions. |

---

## 🤖 Model Context Protocol (MCP) Integration

JuriSync implements the open **Model Context Protocol (v1.0)** standard, allowing AI coding assistants to invoke regulatory compliance tools autonomously during system design or code generation.

### Exposed MCP Tools

| Tool Name | Parameters | Description |
|---|---|---|
| `analyze_compliance` | `feature_description` (string, required), `jurisdictions` (array, optional) | Full orchestration pipeline: extracts signals, evaluates 32 statutory rules, detects cross-border tensions with severity ratings, and generates a structured checklist. |
| `get_statutory_rule` | `rule_id` (string, required) | Retrieves full statutory citation, legal status, gazette link, and developer action for a specific rule. |
| `list_supported_regulations` | *(none)* | Returns the complete library of supported statutory instruments and tracked regulations. |

### Configuration for AI Assistants

Configure JuriSync in your editor with **zero local installation** using `npx`:

#### Claude Desktop Configuration
Add to `claude_desktop_config.json`:
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

#### Cursor IDE Configuration
In **Cursor Settings → Features → MCP → Add New MCP Server**:
* **Name**: `jurisync`
* **Type**: `command`
* **Command**: `npx -y jurisync`

#### CLI / Headless Verification
Query the server directly via stdio JSON-RPC 2.0 without cloning:

```bash
# Query compliance via npx (Linux / macOS / Git Bash)
echo '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"analyze_compliance","arguments":{"feature_description":"Fintech AI loan underwriting model that scores credit risk in the US and India without facial recognition"}}}' | npx -y jurisync
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

The web console is available at `http://localhost:5173`. The documentation portal is available at `http://localhost:5173/docs.html`.

### 3. Build for Production

```bash
npm run build
```

Generates optimized multi-page static bundles in `dist/` ready for deployment on Vercel, Netlify, or Cloudflare Pages.

### 4. Execute the Test Suite

```bash
npm test
```

Runs 6 automated verification suites:
1. `tests/verify-target-flow.js` — End-to-end pipeline execution and checklist generation.
2. `tests/verify-slice2.js` — Risk signal extraction boundary tests.
3. `tests/verify-slice3.js` — Statutory rule engine mapping across all 3 jurisdictions.
4. `tests/verify-slice4.js` — Cross-border tension detection and markdown synthesis.
5. `tests/verify-slice5.js` — MCP JSON-RPC protocol compliance and tool invocation.
6. `tests/verify-edge-cases.js` — Compound clause negations, confidence scoring, 32 rules, and tension severity.

---

## 🔮 Future Scope & Engineering Roadmap

* **Phase 1: AST Parsers for Python & TypeScript**: Build static code analyzers (leveraging Tree-sitter / Babel) that inspect repository source code to detect compliance triggers automatically (e.g. absent TTL purge routines, automated decision branches without human gates).
* **Phase 2: Formal Verification of Statutory Incompatibilities (SMT / Z3)**: Formalize multi-jurisdictional constraints using Satisfiability Modulo Theories (SMT) via Z3 to mathematically verify pseudonymization solutions.
* **Phase 3: Expanded Jurisdictions**: Add dedicated coverage for Singapore (PDPA & AI Verify), Japan (APPI & METI), United Kingdom (DSIT Framework), and Brazil (LGPD).
* **Phase 4: Automated CI/CD Compliance Gatekeeper**: A lightweight GitHub Action (`jurisync-action`) that scans PR descriptions and diffs on every commit to block merges if an architectural change introduces an unreviewed High-Risk obligation.
* **Phase 5: EU AI Act Annex IV Technical Documentation Generator**: Compile machine-readable compliance dossiers in JSON-LD and PDF formats with cryptographic SBOM-style attestations signed via Sigstore / Cosign.

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
