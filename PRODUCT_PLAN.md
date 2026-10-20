# JurisMCP: Production Platform Engineering & Product Plan
**From Hackathon Proof-of-Concept to Enterprise Cross-Jurisdictional AI Compliance Platform**

*Document Version:* 2.0.0-PROD-PLAN  
*Target Release:* Enterprise Beta v1.0  
*Author:* Antigravity AI Engineering & Research Team  
*Status:* Ready for Architecture & External Review (ChatGPT / Technical Advisors)

---

## Executive Summary & Vision

Modern software engineering teams write and ship AI applications in hours using agentic workflows (Claude, Cursor, Copilot, Antigravity) and the **Model Context Protocol (MCP)**. However, cross-border regulatory compliance remains manual, disjointed, and reactive. A team deploying in the US, Europe, and India often learns about statutory violations (e.g., EU AI Act Annex III high-risk classification, GDPR Article 22 automated scoring restrictions, India DPDP Act purpose limitations, or NYC Local Law 144 bias audit rules) only during legal audits or after receiving regulatory inquiries.

**JurisMCP** bridges this gap by creating the **world's first IDE-native, CI/CD-enforced, and agentic (MCP) compliance orchestration layer**. It acts like `ESLint` and `Snyk` for international AI and data regulations:
1. **Development-Time & In-Editor:** Evaluates natural language feature specifications, API contracts, and codebases *before* deployment.
2. **Deterministic & Sourced:** Unlike generic LLMs that hallucinate legal text, JurisMCP matches against a curated, traceable statutory knowledge base with verified statutory citations.
3. **Statutory Tension Detection:** Flags incompatible requirements across international borders (e.g., ex-ante conformity vs retrospective audits vs data erasure mandates) and generates actionable reconciliation strategies.
4. **Developer-Native Deliverables:** Translates legalese into prioritized markdown checklists, test specifications, and architectural requirements directly consumable by developers.

---

## 1. Product Requirements & Feature Matrix

| Capability | Hackathon POC (Current) | Production Platform (Target) |
| :--- | :--- | :--- |
| **Ingestion Interfaces** | Web UI (Vite) + Basic JSON-RPC stdio | Web Studio + Official `@modelcontextprotocol/sdk` (stdio + SSE) + CLI tool + CI/CD Scanner + REST API |
| **Risk Detection Engine** | Regex / Lexical keyword matching | Hybrid: Lexical Matcher + AST Static Code Scanner (Babel/Tree-sitter) + Semantic Policy Vector Search |
| **Statutory Knowledge Base** | 12 hardcoded static rules | Versioned Statutory Knowledge Graph (60+ rules across EU, India, US, UK, Singapore, Canada) |
| **Cross-Border Tensions** | 2 hardcoded tension scenarios | Graph-based regulatory conflict solver with conflict-of-laws prioritization algorithms |
| **Code-Level Awareness** | Text descriptions only | Scans repository source code (detects AI library imports, model configurations, PII pipelines, storage calls) |
| **Developer Deliverables** | Basic Markdown Checklist | Interactive Checklist + JIRA / Linear issue export + GitHub PR compliance badge + SARIF compliance reports |
| **Enterprise Governance** | None | Cryptographic audit logs, zero-data-retention mode, custom corporate policy overlays, team RBAC |
| **DevOps & Quality** | Basic Node scripts | Full GitHub Actions CI/CD (matrix test on Node 18/20/22, ESLint, Prettier, MCP test suite, NPM publishing) |

---

## 2. Technical Architecture & System Design

```
                     ┌────────────────────────────────────────────────────────┐
                     │                   CONSUMPTION LAYER                    │
                     │                                                        │
  Claude Desktop /   │    CI/CD Pipelines     │   Claude-Style Web Studio     │    Enterprise API
   Cursor / IDE      │   (GitHub Actions)     │   (Dashboard & Dossier)       │   (REST / Webhook)
        │            │          │             │              │                │          │
        ▼            │          ▼             │              ▼                │          ▼
 ┌──────────────┐    │   ┌──────────────┐     │      ┌───────────────┐        │   ┌──────────────┐
 │  MCP Server  │    │   │  CLI Engine  │     │      │ Web Client UI │        │   │  Fastify API │
 │ (stdio/SSE)  │    │   │ (@jurismcp/  │     │      │ (Vite/Vanilla │        │   │   Gateway    │
 │ (Official SDK)    │   │     cli)     │     │      │   Claude UI)  │        │   │              │
 └──────┬───────┘    │   └──────┬───────┘     │      └───────┬───────┘        │   └──────┬───────┘
        │            └──────────┼─────────────┴──────────────┼────────────────┴──────────┼─────┘
        │                       │                            │                           │
        └───────────────────────┼────────────────────────────┼───────────────────────────┘
                                ▼                            ▼
                     ┌────────────────────────────────────────────────────────┐
                     │              ORCHESTRATION & ENGINE CORE               │
                     │                    (@jurismcp/core)                    │
                     │                                                        │
                     │  ┌───────────────────────┐  ┌───────────────────────┐  │
                     │  │ Feature & Spec Parser │  │  AST Static Analyzer  │  │
                     │  └───────────┬───────────┘  └───────────┬───────────┘  │
                     │              │                          │              │
                     │              ▼                          ▼              │
                     │  ┌──────────────────────────────────────────────────┐  │
                     │  │            Risk Signal Extractor v2              │  │
                     │  │ (Lexical Pattern Triggers + Code Import Scanner) │  │
                     │  └──────────────────────────┬───────────────────────┘  │
                     │                             ▼                          │
                     │  ┌──────────────────────────────────────────────────┐  │
                     │  │           Deterministic Rule Matcher             │  │
                     │  │  (Status: Binding Legislation vs Voluntary Stds) │  │
                     │  └──────────────────────────┬───────────────────────┘  │
                     │                             ▼                          │
                     │  ┌──────────────────────────────────────────────────┐  │
                     │  │       Cross-Border Regulatory Tension Engine     │  │
                     │  │   (Conflict Graph & Divergence Resolution)       │  │
                     │  └──────────────────────────┬───────────────────────┘  │
                     │                             ▼                          │
                     │  ┌──────────────────────────────────────────────────┐  │
                     │  │      Dossier & Actionable Checklist Generator    │  │
                     │  │  (Markdown, SARIF, JIRA/Linear payload, JSON)    │  │
                     │  └──────────────────────────────────────────────────┘  │
                     └─────────────────────────────┬──────────────────────────┘
                                                   ▼
                     ┌────────────────────────────────────────────────────────┐
                     │             VERSIONED REGULATORY REPOSITORY            │
                     │                                                        │
                     │   [EU AI Act]       [EU GDPR]         [India DPDP]     │
                     │  Reg 2024/1689    Reg 2016/679         Act 2023        │
                     │                                                        │
                     │  [NIST AI RMF]    [FTC Section 5]    [NYC LL 144]      │
                     │     v1.0             Enforcement       AEDT Audit      │
                     │                                                        │
                     │  [Illinois BIPA]  [FDA SaMD AI/ML]   [CERT-In Direct]  │
                     │    740 ILCS 14/      Action Plan        2022 Mandate   │
                     └────────────────────────────────────────────────────────┘
```

---

## 3. Package Structure & Monorepo Organization

To achieve clean separation of concerns and production maintainability, the project will be organized into an enterprise monorepo using npm workspaces:

```
jurismcp/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml               # Test matrix (Node 18, 20, 22), linting, format
│   │   ├── mcp-conformance.yml  # Official MCP SDK protocol validation
│   │   ├── security-scan.yml    # CodeQL, npm audit, secret scanner
│   │   └── release.yml          # Semantic versioning, changelog, NPM publish
│   ├── ISSUE_TEMPLATE/          # Bug reports, rule contribution templates
│   └── PULL_REQUEST_TEMPLATE.md # Verification checklist for new legal rules
├── packages/
│   ├── core/                    # @jurismcp/core (Independent, zero-dependency logic)
│   │   ├── src/
│   │   │   ├── corpus/          # Versioned statutory rules by jurisdiction
│   │   │   │   ├── eu/          # EU AI Act, GDPR, DSA, Machinery Directive
│   │   │   │   ├── in/          # India DPDP Act 2023, CERT-In, MeitY
│   │   │   │   ├── us/          # NIST AI RMF, FTC, NYC LL144, BIPA, FDA
│   │   │   │   └── global/      # ISO/IEC 42001, OECD AI Principles
│   │   │   ├── engine/          # Extractor, Matcher, Tension, Checklist
│   │   │   ├── scanner/         # AST Code Scanner (extracts signals from source)
│   │   │   └── types/           # JSDoc / TypeScript schemas
│   │   ├── tests/               # Comprehensive unit & integration tests
│   │   └── package.json
│   ├── server/                  # @jurismcp/server (Official Model Context Protocol SDK)
│   │   ├── src/
│   │   │   ├── tools/           # analyze_compliance, scan_repository, get_rule
│   │   │   ├── resources/       # jurismcp://rules/{jurisdiction}/{id}
│   │   │   ├── prompts/         # compliance_review, pre_commit_audit
│   │   │   └── transports/      # StdioTransport and SSETransport (Express/Fastify)
│   │   ├── bin/jurismcp-server.js
│   │   └── package.json
│   ├── cli/                     # @jurismcp/cli (Command-line scanner for developers & CI)
│   │   ├── src/
│   │   │   ├── commands/        # scan, check, rules, export
│   │   │   └── reporters/       # terminal (chalk/tables), markdown, SARIF, JSON
│   │   ├── bin/jurismcp.js
│   │   └── package.json
│   └── web/                     # @jurismcp/web (Claude Editorial Web Studio)
│       ├── src/                 # Redesigned Claude UI (Light/Dark mode)
│       ├── public/
│       └── package.json
├── docs/                        # Production Documentation
│   ├── ARCHITECTURE.md          # Complete technical spec
│   ├── REGULATORY_CORPUS.md     # Legal grounding, verification methodology
│   ├── MCP_INTEGRATION.md       # Setup for Claude Desktop, Cursor, Antigravity
│   ├── CI_CD_INTEGRATION.md     # GitHub Actions, GitLab CI, Pre-commit hooks
│   └── CONTRIBUTING_RULES.md    # How legal scholars & engineers submit rules
├── README.md                    # Enterprise-grade product README with badges & demo
├── LICENSE                      # MIT / Enterprise Dual License
└── package.json                 # Monorepo root workspace
```

---

## 4. Phase-by-Phase Production Roadmap

### Phase 1: Formalized Regulatory Corpus & Legal Grounding
- **Goal:** Transform the current 12-rule dataset into a rigorous, peer-reviewed statutory ontology.
- **Deliverables:**
  - Standardized JSON schema for legal rules (`statuteId`, `jurisdiction`, `status: [binding | voluntary | standard]`, `effectiveDate`, `penaltyFramework`, `statutoryCitations`, `enforcementAuthority`, `actionableGuidance`).
  - Expanding to 24 critical rules covering:
    - **EU:** AI Act (Prohibited, High-Risk Annex III, Transparency Art 50), GDPR (Art 9 Biometrics, Art 22 ADM, Art 35 DPIA).
    - **India:** DPDP Act 2023 (Sec 4-6 Consent, Sec 8 Data Retention & Security, Sec 9 Children Data, Sec 16 Cross-border transfers), CERT-In 6-hour logging.
    - **US:** NIST AI RMF 1.0 (Map, Measure, Manage), FTC Act § 5 (Algorithmic Disgorgement), NYC Local Law 144 (Annual Bias Audits), Illinois BIPA (Written Consent), California CPRA / AB 2013 (Generative AI Training Data Transparency).
  - Traceable permalinks to Eur-Lex, India Code / Gazette, and Federal Register.
  - Formal Legal Disclaimer and Terms of Decision Support.

### Phase 2: Official Model Context Protocol (MCP) Server Upgrade
- **Goal:** Replace raw custom JSON-RPC with the official `@modelcontextprotocol/sdk`.
- **Deliverables:**
  - **Tools:**
    1. `analyze_compliance`: Evaluates natural language feature specifications.
    2. `scan_project_compliance`: Evaluates workspace files, dependencies, and architecture descriptions.
    3. `get_regulatory_rule`: Returns verified statutory text and developer actions for a rule ID.
    4. `resolve_statutory_tension`: Provides cross-border conflict reconciliation strategies.
  - **Resources:** Expose the statutory corpus via URI templates (`jurismcp://rules/{jurisdiction}/{category}`).
  - **Prompts:** Expose standard compliance review prompt templates for agentic assistants (`compliance_pre_commit_audit`, `architecture_review`).
  - **Transports:** Support standard `StdioServerTransport` (for local IDEs) and `SSEServerTransport` (for team servers).

### Phase 3: AST Static Code Scanner & Local Repo Analysis
- **Goal:** Enable developers to run `jurismcp scan .` to discover compliance risks directly from their code.
- **Deliverables:**
  - Lightweight AST parser searching for risk markers:
    - Facial recognition libraries (`@vladmandic/face-api`, `face-recognition`, `opencv`) -> Biometric signal.
    - Cloud AI API endpoints (`openai`, `anthropic`, `replicate`) -> AI & Transparency signal.
    - Scraping tools (`cheerio`, `puppeteer`, `playwright`) -> Data extraction & copyright signal.
    - Resume / HR candidate models -> Employment high-risk trigger.
  - Generating SARIF (Static Analysis Results Interchange Format) output to integrate into GitHub Security tab.

### Phase 4: Production CI/CD & DevOps Automation
- **Goal:** Enterprise-grade automation, validation, and delivery.
- **Deliverables:**
  - GitHub Actions Workflow:
    - Matrix testing on Node.js 18.x, 20.x, and 22.x on Ubuntu and Windows.
    - Linter & Code Formatter: ESLint 9 flat config + Prettier.
    - Protocol Conformance Test: Automated MCP client-server negotiation test.
    - Vulnerability Scanning: CodeQL security scanning and dependency review.
  - Release Automation: Semantic Release pipeline with automated changelogs.
  - Pre-commit Git Hook: Husky + lint-staged to run compliance checks locally.

### Phase 5: Production Documentation & Marketing Assets
- **Goal:** Professional open-source presence that inspires immediate confidence.
- **Deliverables:**
  - Comprehensive `README.md` with interactive badges, architecture diagram, 60-second video demo embed, and side-by-side comparison with generic LLMs.
  - `docs/ARCHITECTURE.md`: Deep technical design of the matching and tension resolution engines.
  - `docs/MCP_INTEGRATION.md`: Step-by-step setup guides with screenshots for:
    - Claude Desktop (`claude_desktop_config.json`)
    - Cursor AI (`.cursor/mcp.json`)
    - Google Antigravity IDE (`mcp_config.json`)
    - Windsurf
  - Devpost & Hackathon submission materials aligned with the learning journey and proof-of-concept objectives.

---

## 5. Risk Assessment & Mitigation Strategy

| Risk Category | Potential Issue | Production Mitigation Strategy |
| :--- | :--- | :--- |
| **Legal Reliability** | Developer relies on output as legal counsel | Prominent statutory notice in UI, MCP tool responses, CLI headers, and SARIF reports; disclaimer that JurisMCP is a technical decision-support tool. |
| **Statutory Drift** | Laws change or court interpretations evolve | Versioned rule schemas with `lastVerifiedDate`, `effectiveDate`, and an automated GitHub workflow that flags rules older than 180 days for legal review. |
| **Performance Overhead** | Code AST scanning slows down pre-commit | Fast single-pass scanner using regex-indexed heuristics before parsing full ASTs; sub-100ms scan target for typical repositories. |
| **Ecosystem Changes** | MCP specification updates | Utilizing official `@modelcontextprotocol/sdk` ensuring protocol compatibility as Anthropic updates specs. |

---

## 6. Review Questions for User & ChatGPT Evaluation

When reviewing this plan (or running it through ChatGPT / engineering advisors), consider the following questions:

1. **Architecture & Scope:** Does the separation into `@jurismcp/core`, `@jurismcp/server`, `@jurismcp/cli`, and `@jurismcp/web` match the desired product maturity, or should we keep everything in a streamlined single package with multi-entry points?
2. **Statutory Coverage:** Are there specific jurisdictions or regulations that should be prioritized beyond EU (AI Act, GDPR), India (DPDP, CERT-In), and US (NIST, FTC, NYC LL144, BIPA) — for example, UK AI Framework or California AB 2013?
3. **AST Static Scanning:** Is scanning source code for library imports (`openai`, `boto3`, biometrics) a compelling feature for the CLI and pre-commit checks?
4. **CI/CD Targets:** Are GitHub Actions with Node matrix (18, 20, 22) and SARIF export sufficient for your target developer workflow?
