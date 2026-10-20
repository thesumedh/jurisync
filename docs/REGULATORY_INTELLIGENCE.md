# Regulatory Intelligence Dossier
**Cross-Jurisdictional Statutory Compendium for AI-Assisted Application Development**

*Document Classification:* Engineering & Regulatory Reference  
*Target Frameworks:* European Union (EU AI Act & GDPR), India (DPDP Act 2023 & CERT-In), United States (Federal & State Legislation)  
*Status:* Verified Statutory Grounding  

---

## 1. Regulatory Overview & Enforcement Matrix

| Jurisdiction | Primary Instrument | Type | Effective / Enforcement Date | Statutory Penalty Ceiling | Regulatory Authority |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **European Union** | **EU AI Act**<br>*(Regulation 2024/1689)* | **Binding** | Staggered: Prohibited (Feb 2025), GPAI (Aug 2025), High-Risk (Aug 2026/2027) | Up to **€35,000,000** or **7% of global turnover** | European AI Office & National Competent Authorities |
| **European Union** | **EU GDPR**<br>*(Regulation 2016/679)* | **Binding** | In effect (May 25, 2018) | Up to **€20,000,000** or **4% of global turnover** | National Data Protection Authorities (CNIL, DPC, BfDI) |
| **India** | **DPDP Act 2023**<br>*(Act No. 22 of 2023)* | **Binding** | Enacted Aug 2023; Rules & Board notification 2024–2025 | Up to **₹250 Crore (~$30M USD)** per violation | Data Protection Board of India (DPBI) |
| **India** | **CERT-In Directions**<br>*(No. 20(3)/2022-CERT-In)* | **Binding** | In effect (June 28, 2022) | Imprisonment up to 1 year or fines under IT Act § 70B | Indian Computer Emergency Response Team (CERT-In) |
| **United States** | **NIST AI RMF 1.0**<br>*(NIST SP 1270)* | **Voluntary** | Released January 2023 | Non-statutory (contractual / procurement adoption) | National Institute of Standards and Technology (NIST) |
| **United States** | **FTC Act Section 5**<br>*(15 U.S.C. § 45)* | **Binding** | In effect; active AI enforcement | Injunctions, civil penalties ($51,744/violation), **algorithmic disgorgement** | Federal Trade Commission (FTC) |
| **United States (NYC)**| **NYC Local Law 144**<br>*(NYC Admin. Code § 20-870)*| **Binding** | In effect (July 5, 2023) | Civil penalties $500–$1,500 per day/violation | NYC Department of Consumer and Worker Protection (DCWP)|
| **United States (IL)** | **Illinois BIPA**<br>*(740 ILCS 14/)* | **Binding** | In effect; 2024 per-person damages amendment | **$1,000** (negligent) to **$5,000** (intentional/reckless) | Private Right of Action (Individual/Class Litigation) |
| **United States (CA)** | **California AB 2013**<br>*(Cal. Civ. Code § 1798.500)*| **Binding** | **January 1, 2026** (applies to AI released since 2022)| Enforced under Cal. Unfair Competition Law | California Attorney General / CPPA |

---

## 2. European Union: The Risk-Tiered Regime

### 2.1 EU AI Act (Regulation (EU) 2024/1689)
The EU AI Act introduces a strict classification pyramid:

1. **Unacceptable Risk (Prohibited Practices - Article 5):**
   - Subliminal manipulation causing physical or psychological harm.
   - Exploitation of vulnerabilities based on age, disability, or socio-economic situation.
   - Social scoring systems evaluating trustworthiness over time.
   - Untargeted scraping of facial images from the internet or CCTV footage to expand facial recognition databases.
   - Workplace emotion-recognition systems (except strictly verified medical/safety use cases).

2. **High-Risk AI Systems (Article 6 & Annex III):**
   - **Annex III, Point 4 (Employment & Workers Management):** AI systems used for recruitment, candidate filtering, CV scoring, performance monitoring, or termination recommendations.
   - **Annex III, Point 1 (Biometrics):** Remote biometric identification, emotion recognition, and biometric categorization.
   - **Annex III, Point 2 (Critical Infrastructure):** Safety components in road traffic, water, gas, heating, and electricity management.
   - **Annex III, Point 5 (Access to Essential Services):** Credit scoring, risk assessment in life/health insurance, evaluation of social assistance benefits.
   - *Statutory Requirements for High-Risk Systems:*
     - Continuous Risk Management System (Article 9).
     - Data Governance & Training Data Bias Controls (Article 10).
     - Technical Documentation & Record Keeping (Articles 11 & 12).
     - Human Oversight / Human-in-the-Loop Architecture (Article 14).
     - Accuracy, Robustness, and Cybersecurity by Design (Article 15).
     - Fundamental Rights Impact Assessment - FRIA (Article 27 for public bodies and designated deployers).

3. **Transparency Obligations for Specific Systems (Article 50):**
   - **Article 50(1) (Direct Human Interaction):** Natural persons must be explicitly informed that they are interacting with an AI system (e.g. conversational agents, chatbots), unless obvious from the context.
   - **Article 50(2) & 50(4) (Synthetic / Manipulated Media):** Generated audio, image, video, or text content must be marked in a machine-readable format and detectable as artificially generated.

### 2.2 EU GDPR (Regulation (EU) 2016/679)
- **Article 9 (Special Categories of Personal Data):** Processing biometric data for the purpose of uniquely identifying a natural person is prohibited unless explicit consent (Art. 9(2)(a)) or statutory derogation applies.
- **Article 22 (Automated Decision-Making & Profiling):** Data subjects have the absolute right not to be subject to a decision based solely on automated processing, including profiling, which produces legal effects or similarly significantly affects them. Requires meaningful human intervention, right to contest, and right to obtain an explanation.
- **Article 35 (Data Protection Impact Assessment - DPIA):** Mandatory prior to high-risk processing, especially systematic evaluation of personal aspects based on automated processing (profiling) or large-scale biometric processing.

---

## 3. India: The Digital Personal Data Protection Regime

### 3.1 DPDP Act 2023 (Act No. 22 of 2023)
India's data protection law adopts a principles-based statutory architecture with heavy financial penalties:

1. **Notice & Consent (Sections 5 & 6):**
   - **Section 5(1):** Data Fiduciaries must issue an itemized notice stating the specific personal data sought, specified purpose, grievance redressal channels, and the right to withdraw consent.
   - **Section 5(3):** Data Principals must be given the option to access the notice and privacy terms in **English or any of the 22 Scheduled Indian languages** (Hindi, Bengali, Tamil, Telugu, Marathi, etc.).
   - **Section 6(1):** Consent must be free, specific, informed, unconditional, and unambiguous with clear affirmative action.

2. **Data Retention & Purpose Fulfilment (Section 8(7)):**
   - A Data Fiduciary must erase personal data as soon as the specified purpose is fulfilled or upon withdrawal of consent, whichever is earlier.
   - *Statutory Exception:* Retention is permitted only if necessary for compliance with any law for the time being in force in India.

3. **Processing Children's Data (Section 9):**
   - **Age Threshold:** Strict definition of child as any individual under **18 years of age**.
   - **Mandatory Parental Consent:** Verifiable consent from parent or lawful guardian is required prior to processing.
   - **Absolute Behavioral Restrictions:** Section 9(3) outright bans any tracking, behavioral monitoring, or targeted advertising directed at children, and prohibits processing likely to cause detrimental effect on a child's well-being.

4. **Security Safeguards & Breach Reporting (Section 8(5) & 8(6)):**
   - Data Fiduciaries must implement reasonable security safeguards to prevent personal data breaches.
   - In the event of a breach, notification to the **Data Protection Board of India (DPBI)** and each affected Data Principal is mandatory.
   - *Penalties under the Schedule:* Failure to take reasonable security safeguards carries penalties up to **₹250 Crore (~$30M USD)**. Failure to notify breaches carries penalties up to **₹200 Crore**.

### 3.2 CERT-In Directions 2022
- **6-Hour Breach Reporting:** Cyber security incidents (unauthorized access to systems, data breaches, AI model compromises) must be reported to CERT-In within **6 hours** of notice.
- **180-Day System Logging:** All ICT service providers must securely maintain system logs for a rolling period of **180 days** within Indian jurisdiction.

---

## 4. United States: Sectoral, Federal & State AI Governance

### 4.1 Federal Trade Commission (FTC Act Section 5)
- **15 U.S.C. § 45:** Prohibits unfair or deceptive acts or practices in commerce.
- **Enforcement Focus:**
  - Deceptive claims regarding AI capabilities, accuracy, or automated testing benchmarks.
  - Secret algorithmic bias or failure to implement reasonable safety measures.
  - Undisclosed commercial reuse of user prompt data or customer photos for secondary model training without affirmative opt-in consent.
  - **Remedy - Algorithmic Disgorgement:** The FTC has repeatedly ordered companies to destroy algorithms, weights, and models trained on improperly gathered consumer data (*FTC v. Everalbum*, *FTC v. Kurbo/WW*, *FTC v. Rite Aid*).

### 4.2 NIST AI Risk Management Framework 1.0 (SP 1270)
A voluntary framework establishing four core risk governance functions:
1. **Govern:** Culture of risk management, organizational roles, and accountability.
2. **Map:** Contextualizing intended purpose, benefits, system boundaries, and societal risks.
3. **Measure:** Quantitative and qualitative evaluation of bias, security, robustness, and interpretability.
4. **Manage:** Prioritizing and executing risk treatment, continuous monitoring, and incident response.

### 4.3 Key State Statutes
- **NYC Local Law 144 of 2021 (Automated Employment Decision Tools - AEDT):**
  - Requires independent annual bias audits calculating selection rates and impact ratios across race, ethnicity, and sex.
  - Employers must post an audit summary publicly on their website.
  - Requires giving candidates 10 business days advance written notice prior to tool evaluation.
- **Illinois BIPA (740 ILCS 14/):**
  - Strict written notice and informed written release required before collecting biometric identifiers or biometric information.
  - Public written retention schedule and destruction guidelines required.
  - Private right of action with statutory damages ($1,000 for negligent, $5,000 for intentional/reckless violations per person).
- **California AB 2013 (Generative AI Training Data Transparency):**
  - Effective January 1, 2026.
  - Requires developers of generative AI models released or substantially modified on or after January 1, 2022 to publish detailed summaries of training data on their websites: sources, categories, volume, copyright ownership, synthetic data usage, and whether personal information was included.

---

## 5. Cross-Border Divergence Analysis & Conflict Matrix

```
                     CROSS-JURISDICTIONAL REGULATORY CONVERGENCE & FRICTION
                                                
    ┌─────────────────────────┐                 ┌─────────────────────────┐
    │     UNITED STATES       │                 │     EUROPEAN UNION      │
    │  - Retrospective Bias   │                 │  - Ex-Ante Conformity   │
    │    Audit Retention Logs │                 │    Assessments & FRIA   │
    │  - State BIPA Statutory │                 │  - Article 9 Special    │
    │    Damages (Private)    │                 │    Category Biometrics  │
    │  - CA AB 2013 Training  │                 │  - Article 22 Right to  │
    │    Data Disclosures     │                 │    Human Intervention   │
    └───────────┬─────────────┘                 └───────────┬─────────────┘
                │                                           │
                │        POTENTIAL FRICTIONS FOR REVIEW     │
                │  (1) Retention vs Erasure Mandates        │
                │  (2) Age Boundaries (13 vs 18)            │
                │  (3) Pre-Market vs Post-Market Audits     │
                │                                           │
                └─────────────────────┬─────────────────────┘
                                      │
                                      ▼
                        ┌───────────────────────────┐
                        │           INDIA           │
                        │  - Immediate Purpose      │
                        │    Erasure (§ 8(7))       │
                        │  - Strict Minor Boundary  │
                        │    (Age < 18, No Tracking)│
                        │  - 22 Scheduled Language  │
                        │    Consent Notices        │
                        └───────────────────────────┘
```

### Detailed Potential Friction Points:
1. **Candidate Evaluation Data: Retention vs Erasure:**
   - *Friction:* US NYC Local Law 144 & EEOC guidance expect historical applicant telemetry to calculate selection ratios in annual bias audits. India DPDP § 8(7) mandates immediate data erasure once recruitment concludes.
   - *Architectural Consideration:* Separate raw PII (names, contact info) from cryptographically anonymized, aggregate scoring distributions; evaluate whether foreign compliance qualifies under DPDP statutory retention exceptions.
2. **Minor Protection Thresholds & Behavioral Logging:**
   - *Friction:* US COPPA establishes age 13 as the threshold for verifiable parental consent and permits behavioral tracking once consented. India DPDP Section 9 sets the threshold at 18 and outright prohibits behavioral tracking or targeted advertising even with parental consent.
   - *Architectural Consideration:* Adopt a geo-partitioned identity service, or adopt the strictest global baseline (disabling behavioral tracking for all users under 18).
3. **Training Data Reuse vs Purpose Limitation:**
   - *Friction:* Rapid AI iteration relies on retraining models on production inference transcripts. EU GDPR Article 5(1)(b) prohibits processing beyond the initial purpose, and US FTC actively enforces against undisclosed training reuse.
   - *Architectural Consideration:* Architect explicit unbundled consent toggles for training data donation; decouple production query logs from model training pipelines.

---

## 6. Sourcing & Official Gazette References

1. **EU AI Act:** Official Journal of the European Union, Regulation (EU) 2024/1689. [https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689)
2. **EU GDPR:** Official Journal of the European Union, Regulation (EU) 2016/679. [https://eur-lex.europa.eu/eli/reg/2016/679/oj](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
3. **India DPDP Act 2023:** The Gazette of India, Ministry of Law and Justice, Act No. 22 of 2023. [https://www.meity.gov.in/content/digital-personal-data-protection-act-2023](https://www.meity.gov.in/content/digital-personal-data-protection-act-2023)
4. **India CERT-In:** Ministry of Electronics and Information Technology, Direction No. 20(3)/2022-CERT-In. [https://www.cert-in.org.in](https://www.cert-in.org.in)
5. **NIST AI RMF 1.0:** National Institute of Standards and Technology, SP 1270. [https://www.nist.gov/itl/ai-risk-management-framework](https://www.nist.gov/itl/ai-risk-management-framework)
6. **FTC Algorithmic AI Guidance:** Federal Trade Commission Policy Statements and Enforcement Orders. [https://www.ftc.gov/business-guidance/blog/2023/02/keep-your-ai-claims-check](https://www.ftc.gov/business-guidance/blog/2023/02/keep-your-ai-claims-check)
7. **NYC Local Law 144:** New York City Administrative Code § 20-870 et seq. [https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page](https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page)
8. **Illinois BIPA:** Illinois General Assembly, 740 ILCS 14/. [https://www.ilga.gov/legislation/ilcs/ilcs3.asp?ActID=3004](https://www.ilga.gov/legislation/ilcs/ilcs3.asp?ActID=3004)
9. **California AB 2013:** California Legislative Information, Assembly Bill No. 2013. [https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2013](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2013)
