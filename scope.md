---
doc: scope
status: approved
---

# JurisMesh

A development-time cross-jurisdictional compliance orchestration layer that analyzes AI application feature descriptions and surfaces multi-country regulatory guidance (EU, India, US) before architectural lock-in.

## The Unique Kernel
A development-time compliance intelligence engine that extracts risk and data signals from natural language feature descriptions, simultaneously evaluates them against diverging binding and voluntary international legal regimes (EU AI Act & GDPR, India DPDP Act 2023, US NIST AI RMF & FTC guidance), highlights potential cross-border regulatory tensions for review, and outputs actionable developer tasks ready for immediate coding workflows or agentic MCP tool invocation.

## Who It's For
Developers, AI engineers, and technical founders building AI-powered software for global deployment.
Today, they build without regulatory feedback until post-launch legal reviews or compliance audits, risking massive redesigns, regulatory fines, or blocked market access. With JurisMesh, they receive precise, context-aware compliance guardrails while authoring code and feature specs.

## The Core Loop
1. **Input**: The developer inputs a natural language description of an app or feature (or clicks a representative real-world preset like an HR resume ranker, a biometric cloud photo app, or a customer service RAG chatbot).
2. **Analysis**: The system parses the description, extracting signal vectors: AI system presence, high-risk domains (employment, biometrics, critical infrastructure), personal/sensitive data handling, and autonomous decision-making.
3. **Orchestration**: The engine evaluates detected signals against curated multi-jurisdiction rulesets:
   - **EU**: AI Act risk tier (Unacceptable, High Risk, Specific Transparency, Minimal) and GDPR articles (lawful basis, purpose limitation, special category data).
   - **India**: DPDP Act 2023 obligations (Data Fiduciary responsibilities, notice/consent mechanics, legitimate uses, child data rules).
   - **United States**: NIST AI RMF core functions (Govern, Map, Measure, Manage) and sector/state awareness (EEOC/FTC algorithmic bias, NYC LL144).
   - **Tension Matrix**: Flags potential cross-jurisdictional divergences where meeting one standard may conflict with or fall short of another.
4. **Actionable Output**: The developer reviews structured jurisdiction cards with concrete code/architecture actions, inspects underlying statutory evidence, and exports a one-click Markdown Checklist into their project repository or issue tracker.

## Inspiration & Identity
- **Mood**: Intellectual, calm, authoritative, fast, and empowering.
- **Visuals**: Claude-inspired warm parchment canvas and espresso dark mode, editorial serif typography (Newsreader + Plus Jakarta Sans + JetBrains Mono), terracotta accents, clear risk indicators, and instant responsiveness.
- **References**: Anthropic Claude Artifacts, Linear-like scannability and precision, and the Model Context Protocol (MCP) spec by Anthropic.

## Why This Matters to the Learner
This project represents a crucial practical slice of the learner's broader research: *“Development of an MCP-based Cross-Jurisdictional Compliance Orchestration Layer for Dynamic Multi-Country Regulatory Guidance during AI-Assisted Application Development.”* It demonstrates that development-time regulatory intelligence is viable, essential, and natural when integrated directly into the modern agentic developer workflow.

## What "Working" Looks Like
A polished, zero-friction web application running locally (`npm run dev`) that:
- Accepts arbitrary feature descriptions or instant pre-baked scenarios.
- Analyzes signals in milliseconds with visual chips (`High-Risk AI`, `Biometric Data`, `HR / Employment`).
- Renders responsive, structured cards across EU, India, and US with risk tiers, legal citations, findings, and developer suggestions.
- Highlights a "Regulatory Tension Callout" when international standards diverge.
- Features a "Copy as Markdown Checklist" button that yields immediate, actionable tasks.
- Includes a standalone, runnable Model Context Protocol (MCP) server script allowing AI coding agents to invoke the same compliance orchestration tool programmatically.

## The POC Boundary
- **In Scope**:
  - Web UI for feature input, signal classification, and multi-country guidance presentation.
  - Curated, high-fidelity compliance knowledge engine covering EU (AI Act & GDPR), India (DPDP Act), and US (NIST AI RMF / FTC / state hiring rules).
  - Cross-jurisdictional tension detection for common AI feature patterns.
  - One-click copy/export developer checklist.
  - Runnable MCP server script demonstrating agent tool-calling interoperability.
  - Required hackathon documentation (`scope.md`, `prd.md`, `spec.md`, and comprehensive `README.md`).

## Later
- Real-time LLM-powered dynamic rule synthesis for newly gazetted laws.
- Direct IDE extension and live background agent linting during file edits.
- Automated code repository scanning (AST parsing) to extract feature signals directly from code.
- Expansion to 20+ global jurisdictions (UK, Japan, Canada, Singapore, Brazil, Australia).

## Explicitly Cut
- **Live web scraping of legal databases**: Static curated rule engine guarantees determinism, sub-second latency, and zero flaky API dependencies for the demo.
- **User accounts, databases, and multi-tenancy**: Unnecessary complexity for a proof-of-concept; browser local state and standalone CLI/MCP server provide an optimal demo experience.
- **Binding legal guarantees**: System is framed strictly as developer guidance and risk-reduction checklists, not formal legal counsel.
