# System Architecture Specification
**Cross-Jurisdictional Regulatory Orchestration Engine**

*Version:* 2.0.0-PROD  
*Classification:* Technical Architecture & System Design  
*Author:* Antigravity AI Engineering Team  

---

## 1. High-Level Architectural Model

The platform operates as a deterministic regulatory decision-support layer positioned between developer feature authoring (in IDEs or web interfaces) and deployment pipelines:

```
                        ┌────────────────────────────────────────────────────────┐
                        │                   DEVELOPER CONTEXT                    │
                        │                                                        │
                        │   Feature Specs (Text)  │  Source Code (AST Imports)   │
                        └───────────────────┬─────┴─────┬────────────────────────┘
                                            │           │
                     ┌──────────────────────┼───────────┼────────────────────────┐
                     │ INGESTION INTERFACES │           │                        │
                     │                      ▼           ▼                        │
                     │  ┌────────────────────────┐  ┌─────────────────────────┐  │
                     │  │   Claude Web Studio    │  │  Model Context Protocol │  │
                     │  │  (Editorial Dashboard) │  │  (Stdio JSON-RPC Server)│  │
                     │  └───────────┬────────────┘  └───────────┬─────────────┘  │
                     └──────────────┼───────────────────────────┼────────────────┘
                                    │                           │
                                    └─────────────┬─────────────┘
                                                  ▼
                     ┌───────────────────────────────────────────────────────────┐
                     │                DECISION-SUPPORT PIPELINE                  │
                     │                                                           │
                     │  1. Signal Extraction Engine                              │
                     │     - Lexical Pattern Scanner                             │
                     │     - Trigger Weights & Normalization                     │
                     │     - Domain Tagging (AI, Biometric, Hiring, Minors)      │
                     │                                                           │
                     │  2. Deterministic Rule Matcher                            │
                     │     - Curated Statutory Ruleset Matching                  │
                     │     - Binding vs Voluntary Stratification                 │
                     │     - Jurisdiction Partitioning (EU, India, US)           │
                     │                                                           │
                     │  3. Cross-Border Tension Engine                           │
                     │     - Conflict Matrix Identification                      │
                     │     - Statutory Friction Evaluation                       │
                     │     - Exploratory Architectural Guidance                  │
                     │                                                           │
                     │  4. Deliverables & Serialization                          │
                     │     - Inspectable Evidence Dossiers                       │
                     │     - Actionable Markdown Developer Checklist             │
                     │     - Standard MCP JSON-RPC 2.0 Response Payload          │
                     └────────────────────────────┬──────────────────────────────┘
                                                  ▼
                     ┌───────────────────────────────────────────────────────────┐
                     │                     DELIVERY OUTPUTS                      │
                     │                                                           │
                     │  ┌───────────────────────┐   ┌─────────────────────────┐  │
                     │  │   Interactive UI      │   │  AI Agent Context (MCP) │  │
                     │  │   - Signal Badges     │   │  - Tools:               │  │
                     │  │   - Jurisdiction Cards│   │    * analyze_compliance │  │
                     │  │   - Evidence Drawers  │   │    * get_statutory_rule │  │
                     │  │   - Strikethrough List│   │  - Prompt templates     │  │
                     │  └───────────────────────┘   └─────────────────────────┘  │
                     └───────────────────────────────────────────────────────────┘
```

---

## 2. Core Subsystems

### 2.1 Smart Signal Extractor (`src/engine/signalExtractor.js`)
- **Objective:** Detect regulatory risk indicators with phrase n-gram matching, clause-level negation awareness, and confidence scoring.
- **Mechanism:** Weighted lexical dictionaries (`strong` weight 1.0 vs `weak` weight 0.5) with sentence/clause negation boundary detection (`getNegatedSpans`).
- **Extracted Signal Attributes (15 Domains):**
  - `usesAi`: Machine learning, neural networks, LLMs, computer vision, predictive scoring.
  - `personalData`: Identifies PII, user identifiers, contact information, records.
  - `biometricData`: Facial recognition, fingerprints, voice embeddings, retina scans.
  - `employmentDomain`: Hiring, recruitment, CV ranking, interview evaluation, worker termination.
  - `childrenData`: Minors, kids, parental consent, schools, underage users under 18.
  - `autonomousAction`: Automated rejections, self-executing triggers, direct decision-making.
  - `educationDomain`: Admissions, automated grading, student behavioral evaluation.
  - `infrastructureDomain`: Safety components in energy, water, gas, digital networks.
  - `financeCreditDomain`: Credit scoring, loan underwriting, borrower solvency assessments.
  - `emotionBiometricDomain`: Workplace/education emotion recognition and mood inference.
  - `lawEnforcementDomain`: Predictive policing, public camera surveillance, suspect evaluation.
  - `crossBorderDomain`: International cloud transfers, offshore hosting, trans-border flows.
  - `largeScaleDomain`: Significant Data Fiduciary thresholds, high-volume processing.
  - `contentModerationDomain`: Deepfake detection, AI media watermarking, intermediary due diligence.
  - `multiJurisdiction`: Detects cross-border deployment triggers (EU, India, US).
- **Negation Handling:** Automatically suppresses false-positive triggers when negative clauses are detected (e.g. *"does not process biometric data or facial scans"*).
- **Confidence Scoring:** Computes quantitative signal fidelity score (0–100%) and level (`HIGH`, `MEDIUM`, `LOW`) with explanatory rationale.

### 2.2 Curated Rule Engine (`src/engine/ruleEngine.js`)
- **Objective:** Deterministically evaluate active signal vectors against 32 verified statutory provisions.
- **Stratification:**
  - `binding`: Legally enforceable statutory duties backed by administrative fines or statutory damages (e.g., EU AI Act, GDPR, India DPDP Act 2023, NYC Local Law 144, Illinois BIPA, FTC Act § 5, FCRA, California CPRA).
  - `voluntary`: Best-practice risk management frameworks, consensus standards, and guidance (e.g., NIST AI RMF 1.0).
- **Rule Data Schema:**
  ```typescript
  interface StatutoryRule {
    id: string;
    triggers: string[];
    jurisdiction: 'EU' | 'IN' | 'US';
    status: 'binding' | 'voluntary';
    instrument: string;
    finding: string;
    recommendation: string;
    action: string;
    source_url: string;
    source_note: string;
    penalty_framework?: string;
    effective_date?: string;
  }
  ```

### 2.3 Cross-Border Regulatory Tension Engine (`src/engine/tensionEngine.js`)
- **Objective:** Surface potential friction points across conflicting legal philosophies with explicit severity and likelihood ratings.
- **Philosophical Grounding:** Avoids claiming false legal certainty; frames conflicts as **"Potential Divergences for Review"** and outputs **"Architectural Considerations for Legal Review"**.
- **Conflict Topologies Covered (6 Modeled Divergences):**
  1. *Candidate Retention vs Erasure (HIGH SEVERITY):* US bias audit retention requirements (NYC LL144 / EEOC) vs India DPDP Section 8(7) purpose-fulfilment erasure mandates vs GDPR Art. 17.
  2. *Algorithmic Disgorgement vs Traceability (CRITICAL SEVERITY):* US FTC Section 5 model/weight destruction precedents vs EU AI Act continuous post-market audit logging (Articles 12 & 72).
  3. *Biometric Liability & Consent Conditioning (CRITICAL SEVERITY):* US Illinois BIPA statutory damages per person (SB 2979) vs EU GDPR Article 9/35 DPIA vs India DPDP Section 6 unbundled consent.
  4. *Minor Protection Age Boundaries & Tracking Bans (HIGH SEVERITY):* India DPDP Section 9 (strict age 18, absolute ban on behavioral tracking) vs US COPPA (age 13 commercial consent) vs EU GDPR Art. 8.
  5. *Cloud Data Localization vs Global Distributed LLMs (HIGH SEVERITY):* India DPDP Section 16 & RBI digital lending domestic residency vs EU GDPR Chapter V SCCs vs US CLOUD Act.
  6. *Automated Decision Opt-Out vs Real-Time Execution (MEDIUM SEVERITY):* California CPRA / CPPA ADMT pre-use opt-out and EU GDPR Art. 22 vs low-latency autonomous inference pipelines.

### 2.4 Orchestration Layer (`src/engine/orchestrator.js`)
- Composes the execution pipeline:
  1. Ingests query.
  2. Extracts signals.
  3. Evaluates jurisdiction rules.
  4. Detects tensions.
  5. Generates the formatted Markdown Developer Checklist.
  6. Attaches the mandatory statutory legal disclaimer.

---

## 3. Model Context Protocol (MCP) Server Architecture

### 3.1 Protocol Conformance
- Implements the standard Model Context Protocol over **stdio** via JSON-RPC 2.0.
- Handles standard lifecycle methods:
  - `initialize`: Protocol negotiation (`protocolVersion: '2024-11-05'`), server capabilities, and identity.
  - `tools/list`: Exposes available tools with comprehensive JSON Schema specifications.
  - `tools/call`: Executes compliance analysis, parameter validation, and structured output formatting.

### 3.2 Tool Catalog
1. **`analyze_compliance`**
   - *Description:* Evaluates a natural language feature specification across EU, India, and US statutory frameworks.
   - *Input Schema:*
     - `feature_description` (string, required): Plain text description of the feature or architecture.
     - `jurisdictions` (array of strings, optional): Subset of jurisdictions (`['EU', 'IN', 'US']`).
   - *Returns:* Markdown report, detected signals, cross-border tensions, and structured findings.
2. **`get_statutory_rule`**
   - *Description:* Fetches full statutory text, legal status, and developer guidance for a specific rule ID.
   - *Input Schema:*
     - `rule_id` (string, required): Identifier (e.g., `eu_ai_act_employment_high_risk`).
3. **`list_supported_regulations`**
   - *Description:* Returns the complete compendium of statutory instruments, jurisdictions, and effective dates.

---

## 4. Inspectable Evidence Architecture

To maintain transparent decision support, every finding in the UI is coupled with an interactive **Statutory Evidence Drawer**:
- Exposes:
  1. Full official legislative title and citation.
  2. Statutory legal status (Binding duty vs Voluntary standard).
  3. Specific article, section, or annex citation.
  4. Exact trigger signals that caused the rule to activate.
  5. Verified permalink to the Official Journal or Government Gazette.
  6. Decision-support applicability notice.

---

## 5. Security & Privacy Guarantees
- **Zero Data Retention:** Feature descriptions analyzed locally are never transmitted to third-party tracking servers.
- **Deterministic Reproducibility:** Fixed rule libraries ensure identical inputs yield identical findings.
- **Offline / Enclave Capable:** The engine has zero runtime dependencies and can execute inside air-gapped environments or local developer terminals.
