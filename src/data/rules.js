/**
 * Curated Rule Library (JavaScript ES Module representation)
 * Matches src/data/rules.json exactly for seamless cross-platform execution.
 */

export const RULES = [
  {
    "id": "eu_ai_act_employment_high_risk",
    "triggers": ["employment", "ai_decision"],
    "jurisdiction": "EU",
    "status": "binding",
    "instrument": "EU AI Act (Regulation 2024/1689, Annex III, Point 4)",
    "finding": "Potentially high-risk AI use in employment context. AI systems intended to be used for recruitment or selection of natural persons, notably for screening or filtering applications and evaluating candidates, are classified as High-Risk.",
    "recommendation": "Investigate whether the system falls within EU AI Act employment-related high-risk categories. Assess technical documentation and quality management requirements under Chapter III.",
    "action": "Implement human-in-the-loop oversight mechanism allowing qualified HR staff to verify and override AI recommendations before any rejection is communicated.",
    "source_url": "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689",
    "source_note": "EU AI Act Annex III, Point 4(a) (Recruitment and selection)"
  },
  {
    "id": "eu_gdpr_employment_automated_decisions",
    "triggers": ["employment", "personal_data", "autonomous_action"],
    "jurisdiction": "EU",
    "status": "binding",
    "instrument": "EU GDPR (Regulation 2016/679, Article 22)",
    "finding": "Solely automated candidate scoring or filtering that produces legal effects triggers GDPR Article 22 prohibitions against automated decision-making without human intervention.",
    "recommendation": "Assess GDPR requirements for candidate data. Determine lawful basis under Article 6 (contractual necessity vs consent) and provide transparency notice.",
    "action": "Ensure candidate evaluation includes meaningful human review, and establish a mechanism for candidates to contest automated scoring.",
    "source_url": "https://eur-lex.europa.eu/eli/reg/2016/679/oj",
    "source_note": "GDPR Article 22(1) (Automated individual decision-making, including profiling)"
  },
  {
    "id": "eu_gdpr_biometric_special_category",
    "triggers": ["biometric", "personal_data"],
    "jurisdiction": "EU",
    "status": "binding",
    "instrument": "EU GDPR (Article 9 & Article 35)",
    "finding": "Biometric face recognition or physical embedding processing constitutes Special Category Data, strictly prohibited unless explicit consent or statutory necessity is established.",
    "recommendation": "Conduct a mandatory Data Protection Impact Assessment (DPIA) under Article 35 prior to deployment.",
    "action": "Obtain standalone explicit consent decoupled from service terms, and store biometric vectors in client-side or hardware-isolated enclaves.",
    "source_url": "https://eur-lex.europa.eu/eli/reg/2016/679/oj",
    "source_note": "GDPR Article 9(1) (Processing of special categories of personal data)"
  },
  {
    "id": "eu_ai_act_transparency_chatbots",
    "triggers": ["ai_decision", "personal_data"],
    "jurisdiction": "EU",
    "status": "binding",
    "instrument": "EU AI Act (Article 50 - Transparency)",
    "finding": "AI systems intended to interact directly with natural persons (chatbots, RAG assistants) must be designed to inform individuals that they are interacting with an AI system.",
    "recommendation": "Review user interface disclosures and ensure automated responses are marked as synthetic or AI-assisted.",
    "action": "Add an unambiguous visual badge indicating AI generation and expose system capabilities and limitation summaries.",
    "source_url": "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689",
    "source_note": "EU AI Act Article 50(1) (Transparency obligations for providers and deployers)"
  },
  {
    "id": "in_dpdp_candidate_data_fiduciary",
    "triggers": ["employment", "personal_data"],
    "jurisdiction": "IN",
    "status": "binding",
    "instrument": "India DPDP Act 2023 (Section 4, 5 & 6)",
    "finding": "Personal data processing of job candidates likely triggers Data Fiduciary obligations under India's Digital Personal Data Protection Act 2023.",
    "recommendation": "Assess applicability of DPDP framework: determine purpose limitation, notice delivery, and lawful processing basis.",
    "action": "Map data collection, purpose, access, retention, and applicable duties before ingesting applicant resumes.",
    "source_url": "https://www.meity.gov.in/content/digital-personal-data-protection-act-2023",
    "source_note": "DPDP Act 2023 Section 5 (Notice) & Section 6 (Consent)"
  },
  {
    "id": "in_dpdp_retention_erasure_mandate",
    "triggers": ["personal_data"],
    "jurisdiction": "IN",
    "status": "binding",
    "instrument": "India DPDP Act 2023 (Section 8(7) - Data Erasure)",
    "finding": "A Data Fiduciary must erase personal data upon withdrawal of consent, or as soon as it is reasonable to assume the specified purpose is no longer being served, whichever is earlier — unless retention is required for compliance with any law in force (Section 8(7) statutory exception). This exception may partially accommodate retention needed for legally mandated audit obligations, but requires legal verification.",
    "recommendation": "Establish explicit data lifecycle policies. Map every data collection to a documented legal basis and retention schedule. Where statutory retention is claimed, identify the specific law authorising it.",
    "action": "Implement automated database TTL purge jobs to delete personal data once purpose is served. Document any ongoing retention under the statutory legal-compliance exception with the specific authorising law citation.",
    "source_url": "https://www.meity.gov.in/content/digital-personal-data-protection-act-2023",
    "source_note": "DPDP Act 2023 Section 8(7) (Erasure upon purpose fulfilment, subject to legal retention exceptions)"
  },
  {
    "id": "in_dpdp_children_tracking_ban",
    "triggers": ["children", "personal_data"],
    "jurisdiction": "IN",
    "status": "binding",
    "instrument": "India DPDP Act 2023 (Section 9 - Processing Children's Data)",
    "finding": "Section 9(3) prohibits tracking, behavioural monitoring, or targeted advertising directed at children (under 18). Section 9(1) requires verifiable parental consent before processing children's personal data. Note: Section 9(4) allows the Central Government to prescribe exemptions for specific classes of Data Fiduciaries or purposes by notification.",
    "recommendation": "Verify user age thresholds for all data flows. Prohibit behavioural telemetry and targeted advertising pipelines for underage accounts by default, unless covered by a government-notified exemption.",
    "action": "Deploy verifiable parental consent gates and strip recommendation-tracking cookies for minor users. Confirm whether any government-notified age exemptions under Section 9(5) apply to the specific service.",
    "source_url": "https://www.meity.gov.in/content/digital-personal-data-protection-act-2023",
    "source_note": "DPDP Act 2023 Section 9(1)-(4) (Special obligations for children's data and government-notified exemptions)"
  },
  {
    "id": "in_dpdp_multilingual_notice_grievance",
    "triggers": ["personal_data"],
    "jurisdiction": "IN",
    "status": "binding",
    "instrument": "India DPDP Act 2023 (Section 5(3) & Section 12)",
    "finding": "Data Fiduciaries must give data principals the option to view notice and privacy terms in English or any of the 22 scheduled Indian languages, and provide a grievance officer.",
    "recommendation": "Provide clear, itemized notice with details of personal data sought, specified purpose, and grievance redressal channels.",
    "action": "Add a language toggle for privacy notices and publish contact info for a designated Data Protection / Grievance Officer.",
    "source_url": "https://www.meity.gov.in/content/digital-personal-data-protection-act-2023",
    "source_note": "DPDP Act 2023 Section 5(3) (Notice in 22 languages) and Section 12 (Grievance)"
  },
  {
    "id": "us_nist_employment_bias_testing",
    "triggers": ["employment", "ai_decision"],
    "jurisdiction": "US",
    "status": "voluntary",
    "instrument": "NIST AI RMF 1.0 (Measure 2.5) & EEOC Guidance",
    "finding": "Employment + AI ranking raises fairness and transparency expectations. Automated candidate ranking can produce unintended disparate impact across protected demographic categories.",
    "recommendation": "Consider NIST AI RMF-style risk documentation and bias testing even where federal regulation is not yet codified into a single binding statute.",
    "action": "Keep a simple decision log and bias testing notes documenting selection ratios across demographic subgroups.",
    "source_url": "https://www.nist.gov/itl/ai-risk-management-framework",
    "source_note": "NIST AI RMF 1.0 Measure 2.5 (AI systems evaluated for bias and equity)"
  },
  {
    "id": "us_nyc_local_law_144_aedt",
    "triggers": ["employment", "ai_decision", "autonomous_action"],
    "jurisdiction": "US",
    "status": "binding",
    "instrument": "NYC Local Law 144 (AEDT Regulation)",
    "finding": "Automated Employment Decision Tools (AEDT) used in New York City are subject to mandatory annual independent bias audits and candidate notice rules.",
    "recommendation": "Check whether candidates reside in NYC or covered jurisdictions before deploying automated ranking or scoring algorithms.",
    "action": "Publish an annual independent bias audit summary on website and provide candidates with 10 business days advance notice prior to AEDT evaluation.",
    "source_url": "https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page",
    "source_note": "NYC Admin. Code § 20-870 et seq."
  },
  {
    "id": "us_ftc_act_sec5_algorithmic_truth",
    "triggers": ["ai_decision"],
    "jurisdiction": "US",
    "status": "binding",
    "instrument": "FTC Act Section 5 (Unfair or Deceptive Practices)",
    "finding": "The Federal Trade Commission actively enforces against deceptive claims regarding AI accuracy, hidden bias, or undisclosed commercial use of user prompts for model training.",
    "recommendation": "Ensure marketing and product documentation accurately reflects model limitations, potential hallucinations, and evaluation benchmarks.",
    "action": "Maintain verifiable test benchmarks for all accuracy claims, and disclose whether user data is retained for secondary model training.",
    "source_url": "https://www.ftc.gov/business-guidance/blog/2023/02/keep-your-ai-claims-check",
    "source_note": "FTC Policy Statement on Deceptive AI and Algorithmic Claims"
  },
  {
    "id": "us_illinois_bipa_biometric_release",
    "triggers": ["biometric"],
    "jurisdiction": "US",
    "status": "binding",
    "instrument": "Illinois Biometric Information Privacy Act (740 ILCS 14/)",
    "finding": "Capturing or storing biometric identifiers (facial geometry, photo embeddings) without prior informed written consent triggers private right of action with statutory damages.",
    "recommendation": "Establish written biometric privacy policy and written releases before collecting user selfies or facial scans.",
    "action": "Obtain executed written release from users specifying purpose and retention schedule; publish written destruction guidelines.",
    "source_url": "https://www.ilga.gov/legislation/ilcs/ilcs3.asp?ActID=3004",
    "source_note": "740 ILCS 14/15 (Retention, collection, disclosure, destruction)"
  },
  {
    "id": "eu_ai_act_health_high_risk",
    "triggers": ["health", "ai_decision"],
    "jurisdiction": "EU",
    "status": "binding",
    "instrument": "EU AI Act (Article 6 & Annex I — Medical Device AI)",
    "finding": "AI systems used for clinical decision support, diagnostic triage, or health risk assessment that qualify as Software as a Medical Device (SaMD) under EU MDR (Regulation 2017/745) are automatically classified as high-risk AI systems under EU AI Act Article 6(1). Obligations include mandatory human oversight (Article 14), automatic event logging (Article 12), and technical documentation before market placement (Article 11 & Annex IV).",
    "recommendation": "Determine whether the health AI system constitutes SaMD under EU MDR or triggers Annex III Section 5 (essential public services). If so, Notified Body conformity assessment and CE marking are required before EU deployment.",
    "action": "Implement physician override mechanisms for all AI-generated clinical recommendations, enable automatic event logging over the system lifecycle, and prepare and maintain technical documentation per EU AI Act Annex IV before any clinical deployment.",
    "source_url": "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689",
    "source_note": "EU AI Act Article 6(1) & Annex I (Medical Devices Regulation 2017/745 cross-reference)"
  },
  {
    "id": "in_it_spdi_health_records",
    "triggers": ["health", "personal_data"],
    "jurisdiction": "IN",
    "status": "binding",
    "instrument": "IT Act 2000 (Section 43A) & IT (SPDI) Rules 2011",
    "finding": "Health records constitute Sensitive Personal Data or Information (SPDI) under Rule 3(1) of the Information Technology (Reasonable Security Practices and Procedures and SPDI) Rules 2011, made under Section 43A of the IT Act 2000. Any body corporate collecting or processing patient health data must maintain reasonable security practices, publish a written privacy policy, and obtain prior written consent before collection.",
    "recommendation": "Implement ISO/IEC 27001 or equivalent information security standard for systems holding health records. Ensure a written privacy policy covering data categories, purpose, and disclosure is publicly available.",
    "action": "Obtain written (or electronic) patient consent before collecting health data. Publish a comprehensive privacy policy per Rule 4 of IT (SPDI) Rules 2011. Implement IS/ISO/IEC 27001 technical and organisational controls for health record storage.",
    "source_url": "https://www.meity.gov.in/sites/upload_files/dit/files/GSR313E_10511%281%29.pdf",
    "source_note": "IT (SPDI) Rules 2011, Rule 3(1) — Health Records as Sensitive Personal Data"
  },
  {
    "id": "us_hipaa_phi_ai_systems",
    "triggers": ["health", "personal_data"],
    "jurisdiction": "US",
    "status": "binding",
    "instrument": "HIPAA Privacy & Security Rules (45 CFR Parts 160 & 164)",
    "finding": "AI systems processing Protected Health Information (PHI) — including patient symptoms, diagnostic reports, treatment history, or drug prescriptions — must comply with the HIPAA Privacy Rule and Security Rule if the developer or deployer qualifies as a Covered Entity or Business Associate. Failure to implement required Technical Safeguards constitutes a HIPAA violation subject to tiered civil monetary penalties.",
    "recommendation": "Determine whether the AI system qualifies as a Business Associate by processing PHI on behalf of a HIPAA Covered Entity. If so, execute a Business Associate Agreement (BAA) and implement all required Security Rule technical safeguards.",
    "action": "Execute a BAA with the healthcare provider. Implement encryption at rest and in transit for PHI, establish audit controls and user access logs per 45 CFR 164.312, and conduct a formal Security Risk Analysis before deployment.",
    "source_url": "https://www.hhs.gov/hipaa/for-professionals/security/laws-regulations/index.html",
    "source_note": "HIPAA Security Rule 45 CFR 164.312 (Technical Safeguards for Protected Health Information)"
  }
];
