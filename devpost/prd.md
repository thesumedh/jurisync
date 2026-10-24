---
doc: prd
status: approved
---

# JuriSync — Product Requirements

A development-time compliance decision-support tool that transforms plain-language AI feature descriptions into transparent risk signals, maps them against a curated JSON rule library across multiple jurisdictions (EU, India, US), labels binding legislation vs voluntary frameworks, and outputs an actionable developer checklist.
Source: `scope.md > The Unique Kernel` and `scope.md > Who It's For`.

## Decision-Support Pipeline
1. **Feature Description** (natural language prompt or 1-click preset)
2. **Detected Risk Signals** (visible chips: AI-Assisted decisions, employment/hiring, personal data, biometrics, multi-jurisdiction)
3. **Curated Rule Library** (`rules.json`: traceable triggers, instruments, legal status, findings, actions, source URLs)
4. **Sourced Findings** (EU AI Act & GDPR, India DPDP Act 2023, US NIST AI RMF & Sectoral/State laws; clearly labelled Binding vs Voluntary)
5. **Actionable Developer Checklist** (copyable checklist with core architectural tasks and statutory actions)
6. **Mandatory Disclaimer** ("Illustrative output for development support only. Not a verified legal assessment.")

## The Core Journey
1. **Arrival**: The developer opens the JuriSync web dashboard. They see a clean, high-performance interface with an intuitive prompt console, four quick-load real-world scenario presets, and an architectural overview explaining the MCP integration angle.
2. **Input**: The developer either types a custom feature description (e.g., *"A company is building an AI system that ranks job applicants using CVs and interview answers in the EU and India"*) or clicks a preloaded scenario button (*"HR Candidate Ranking"*, *"Biometric Face Clustering"*, *"Customer Support RAG Chatbot"*, or *"Clinical Triage Assistant"*).
3. **Trigger**: The developer clicks **"Analyze Compliance"** (or presses `Ctrl+Enter`).
4. **Signal Extraction**: The interface displays real-time signal badges identified by the analysis layer: detected AI system status, sensitive data classifications, biometric signals, employment domain triggers, and automated decision-making scope.
5. **Multi-Jurisdiction Synthesis**: Three structured cards appear side by side (or responsive stack):
   - **European Union**: EU AI Act risk classification (Prohibited / High-Risk / Limited / Minimal), applicable articles, and GDPR data protection mandates (legal basis, purpose limitation, DPO requirement).
   - **India**: DPDP Act 2023 obligations (Data Fiduciary obligations, verifiable consent, notice requirements, legitimate uses, child data handling, data principal rights).
   - **United States**: NIST AI RMF framework alignment (Govern, Map, Measure, Manage), FTC truth-in-AI principles, and applicable sector/state statutes (e.g., NYC Local Law 144 for hiring, Illinois BIPA for biometrics).
6. **Cross-Border Tensions**: A dedicated **"Cross-Jurisdictional Divergence Callout"** highlights where legal expectations conflict or diverge across regions (e.g., strict GDPR purpose limitation vs US flexible innovation sandboxes, or DPDP absolute prohibition on child behavioral tracking vs US COPPA parental consent thresholds).
7. **Actionable Checklist**: The developer clicks **"Copy Checklist"** to copy a formatted Markdown checklist of immediate architecture and coding tasks directly to their clipboard for insertion into GitHub issues, PR descriptions, or sprint tickets.
8. **Agent Protocol Verification**: A toggle view allows the developer to inspect the raw JSON schema payload compatible with the Model Context Protocol (MCP), demonstrating how an AI coding assistant (like Claude Desktop or Cursor) calls this tool autonomously.

## Screens and Layout
- **Single-Page Application (SPA)** optimized for desktop and tablet screens during development.
  - **Header**: Logo, title, tagline, link to research statement, and an indicator badge: `MCP Protocol v1.0 Compatible`.
  - **Pipeline Strip**: Transparent horizontal indicator displaying the 5 pipeline stages.
  - **Control Bar / Input Surface**:
    - Multi-line textarea for free-text app/feature description.
    - Quick-load Scenario preset buttons.
    - Action button with loading state.
  - **Signal Detection Bar**: Visual tags showing active detected signals (e.g., `⚡ AI-Assisted Decisions`, `👤 Personal Data`, `👁️ Biometric Data`, `💼 Employment / Hiring`, `🤖 Autonomous Actions`, `🌐 Multiple Jurisdictions`).
  - **Regulatory Guidance Grid**: Three distinct, high-contrast jurisdiction panels:
    - **EU Card**: Flag icon, legal status pill, key legal findings, concrete developer action list, legal citation footer.
    - **India Card**: Flag icon, legal status pill, DPDP Data Fiduciary obligations, consent & localization findings, actionable recommendations.
    - **US Card**: Flag icon, legal status pill, NIST AI RMF mappings, federal & state compliance notes, actionable tasks.
  - **Tension & Conflict Matrix**: An alert drawer highlighting regulatory friction and cross-border data transfer complexities.
  - **Export & Action Bar**: One-click "Copy Developer Checklist" button with animated confirmation, and an "Inspect MCP Tool Call" dialog.

## Look and Feel
- **Visual Aesthetic**: Sleek developer-first dark mode inspired by modern IDEs and tools like Linear, Vercel, and Raycast.
- **Color Palette**:
  - Background: Deep slate/obsidian (`#080c14`, `#0f172a`) with subtle glassmorphic backdrop filters.
  - Accents: Electric Indigo (`#6366f1`) for primary actions.
  - Jurisdictions: EU Blue & Gold (`#3b82f6`), India Saffron (`#f97316`), US Crimson (`#ef4444`).
  - Status Badges:
    - Binding Legislation: Solid Crimson/Red (`rgba(239, 68, 68, 0.18)`).
    - Voluntary Framework: Subtle Sky Blue/Amber (`rgba(56, 189, 248, 0.15)`).
- **Typography**: Inter for crisp interface text; JetBrains Mono for code snippets, citations, and signal tags.
- **Tone**: Authoritative, pragmatic, non-alarmist developer guidance. Clearly disclaims formal legal representation while providing high-utility technical direction.

## Mandatory Legal Disclaimer
*“Illustrative output for development support only. Not a verified legal assessment. Exact applicability depends on the specific system and current law.”*

## What We're Building
A self-contained web application (built with Vite + Vanilla JS/CSS for zero bloat, blazing fast launch, and rock-solid stability) paired with an MCP tool module that can be tested in terminal or connected to Claude Desktop / Cursor.
