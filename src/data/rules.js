/**
 * Curated Rule Library (JavaScript ES Module representation)
 * Matches src/data/rules.json exactly for seamless cross-platform execution.
 * 32 Granular, Traceable International Statutory Rules (EU, India, US).
 */

export const RULES = [
  // ==========================================================================
  // EUROPEAN UNION (11 Rules)
  // ==========================================================================
  {
    "id": "eu_ai_act_employment_high_risk",
    "triggers": ["employment", "ai_decision"],
    "jurisdiction": "EU",
    "status": "binding",
    "instrument": "EU AI Act (Regulation 2024/1689, Annex III, Point 4)",
    "finding": "Potentially high-risk AI use in employment and workforce management. AI systems intended to be used for recruitment or selection of natural persons, notably for placing targeted job ads, screening or filtering applications, and evaluating candidates during interviews or tests, are classified as High-Risk.",
    "recommendation": "Investigate whether the system falls within EU AI Act employment-related high-risk categories under Chapter III. Implement pre-deployment accuracy, robustness, and cybersecurity benchmarks per Article 15.",
    "action": "Implement a human-in-the-loop oversight portal where qualified HR recruiters must explicitly review and sign off on candidate recommendations before any automated rejection email is triggered. Maintain continuous logging of input variables, model confidence, and demographic selection distributions under EU AI Act Article 12.",
    "source_url": "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689",
    "source_note": "EU AI Act Annex III, Point 4(a) (Recruitment and selection of workers)"
  },
  {
    "id": "eu_gdpr_employment_automated_decisions",
    "triggers": ["employment", "personal_data", "autonomous_action"],
    "jurisdiction": "EU",
    "status": "binding",
    "instrument": "EU GDPR (Regulation 2016/679, Article 22)",
    "finding": "Solely automated candidate scoring, ranking, or filtering that produces legal effects or similarly significantly affects candidates triggers GDPR Article 22 prohibitions against automated decision-making without human intervention.",
    "recommendation": "Determine the lawful basis under Article 6 (contractual necessity vs explicit consent). Provide candidates with clear pre-assessment information regarding the algorithmic logic involved and its envisaged consequences.",
    "action": "Ensure candidate evaluation workflows include meaningful, non-rubber-stamp human review. Establish an explicit mechanism for candidates to express their point of view and contest automated scoring.",
    "source_url": "https://eur-lex.europa.eu/eli/reg/2016/679/oj",
    "source_note": "GDPR Article 22(1) & (3) (Automated individual decision-making, including profiling)"
  },
  {
    "id": "eu_gdpr_biometric_special_category",
    "triggers": ["biometric", "personal_data"],
    "jurisdiction": "EU",
    "status": "binding",
    "instrument": "EU GDPR (Article 9 & Article 35)",
    "finding": "Biometric face recognition, facial geometry extraction, or physical embedding processing constitutes Special Category Data, strictly prohibited unless an Article 9(2) exception (such as explicit, freely given consent) is established.",
    "recommendation": "Conduct a mandatory Data Protection Impact Assessment (DPIA) under Article 35 prior to deployment, consulting your designated Data Protection Officer (DPO).",
    "action": "Obtain standalone explicit consent decoupled from general terms of service. Isolate biometric feature extraction to client-side hardware enclaves (e.g. Secure Enclave / WebCrypto) to eliminate central vector retention.",
    "source_url": "https://eur-lex.europa.eu/eli/reg/2016/679/oj",
    "source_note": "GDPR Article 9(1) (Processing of special categories) & Article 35 (DPIA)"
  },
  {
    "id": "eu_ai_act_transparency_chatbots",
    "triggers": ["ai_decision", "personal_data"],
    "jurisdiction": "EU",
    "status": "binding",
    "instrument": "EU AI Act (Article 50 - Transparency)",
    "finding": "AI systems intended to interact directly with natural persons (conversational chatbots, RAG assistants, virtual avatars) must be designed to inform individuals that they are interacting with an AI system, unless obvious from the context.",
    "recommendation": "Review user interface disclosures and ensure automated responses are marked as synthetic or AI-assisted per Article 50(1).",
    "action": "Render a persistent visual indicator (e.g., '⚡ AI Assistant') in the UI viewport, embed synthetic content disclosure in HTTP response headers (`X-Generated-By: AI`), and surface confidence indicators with a one-click disclaimer covering model hallucination risk.",
    "source_url": "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689",
    "source_note": "EU AI Act Article 50(1) (Transparency obligations for providers and deployers)"
  },
  {
    "id": "eu_ai_act_health_high_risk",
    "triggers": ["health", "ai_decision"],
    "jurisdiction": "EU",
    "status": "binding",
    "instrument": "EU AI Act (Article 6 & Annex I — Medical Device AI)",
    "finding": "AI systems used for clinical decision support, diagnostic triage, or health risk assessment that qualify as Software as a Medical Device (SaMD) under EU MDR (Regulation 2017/745) are automatically classified as high-risk AI systems under EU AI Act Article 6(1).",
    "recommendation": "Determine whether the health AI system constitutes SaMD under EU MDR or triggers Annex III Section 5 (essential public services). If so, Notified Body conformity assessment and CE marking are required before EU deployment.",
    "action": "Deploy a mandatory clinician sign-off modal preventing automated execution of diagnostic or treatment suggestions without licensed physician authorization. Implement immutable FHIR-compliant audit logging of clinical inference inputs and maintain a CE-marked ISO 13485 / MDR technical dossier.",
    "source_url": "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689",
    "source_note": "EU AI Act Article 6(1) & Annex I (Medical Devices Regulation 2017/745 cross-reference)"
  },
  {
    "id": "eu_ai_act_education_high_risk",
    "triggers": ["education", "ai_decision"],
    "jurisdiction": "EU",
    "status": "binding",
    "instrument": "EU AI Act (Regulation 2024/1689, Annex III, Point 3)",
    "finding": "AI systems used in education and vocational training—notably for determining admission or assignment to educational institutions, evaluating learning outcomes, scoring tests, or monitoring and detecting student behavior during exams—are classified as High-Risk.",
    "recommendation": "Conduct rigorous bias and accuracy evaluations across student demographic cohorts. Establish technical documentation and human intervention capabilities for educators per Chapter III.",
    "action": "Deploy an algorithmic grading appeal and dispute-resolution workflow allowing students to request human teacher re-assessment within 14 days. Enforce AES-256 encryption on remote exam proctoring video streams with a 30-day automated TTL deletion schedule. Maintain feature-attribution logs (e.g. Shapley values) for every admission and examination recommendation.",
    "source_url": "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689",
    "source_note": "EU AI Act Annex III, Point 3 (Education and vocational training)"
  },
  {
    "id": "eu_ai_act_critical_infrastructure",
    "triggers": ["infrastructure", "ai_decision"],
    "jurisdiction": "EU",
    "status": "binding",
    "instrument": "EU AI Act (Regulation 2024/1689, Annex III, Point 2)",
    "finding": "AI systems intended to be used as safety components in the management and operation of critical digital infrastructure, road traffic, and the supply of water, gas, heating, or electricity are classified as High-Risk.",
    "recommendation": "Assess resilience against cyber threats, adversarial perturbations, and unexpected failure modes. Align with the EU Network and Information Security (NIS2) Directive.",
    "action": "Deploy hardwired or air-gapped manual override interlocks allowing human operators to disconnect autonomous AI controllers within < 500ms. Maintain an ISO/IEC 42001 and IEC 61508 safety-integrity-level (SIL-2/SIL-3) technical risk management file documenting edge-case anomaly mitigation.",
    "source_url": "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689",
    "source_note": "EU AI Act Annex III, Point 2 (Management and operation of critical infrastructure)"
  },
  {
    "id": "eu_ai_act_credit_scoring_essential_services",
    "triggers": ["finance_credit", "ai_decision"],
    "jurisdiction": "EU",
    "status": "binding",
    "instrument": "EU AI Act (Regulation 2024/1689, Annex III, Point 5(b))",
    "finding": "AI systems intended to be used to evaluate the creditworthiness of natural persons or establish their credit score are classified as High-Risk (except AI systems used for the purpose of detecting financial fraud).",
    "recommendation": "Conduct statistical parity and disparate impact testing to prevent socio-economic discrimination. Prepare Chapter III technical documentation covering model training data governance.",
    "action": "Integrate model explainability libraries (e.g., TreeSHAP) to isolate the top 4 primary financial variables contributing to adverse credit decisions. Expose an automated appeal queue enabling manual re-underwriting by human loan officers upon consumer request, and document training data anti-bias audits per Article 10.",
    "source_url": "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689",
    "source_note": "EU AI Act Annex III, Point 5(b) (Access to essential private services - Creditworthiness)"
  },
  {
    "id": "eu_ai_act_prohibited_emotion_recognition",
    "triggers": ["emotion_biometric", "ai_decision"],
    "jurisdiction": "EU",
    "status": "binding",
    "instrument": "EU AI Act (Article 5(1)(f) & Article 50(3))",
    "finding": "The placing on the market, putting into service, or use of AI systems to infer emotions of a natural person in the areas of workplace and education institutions is strictly PROHIBITED, unless intended for medical or safety reasons.",
    "recommendation": "Audit feature roadmap to identify and eliminate any emotion-recognition, sentiment-from-facial-video, or stress-detection pipelines deployed in employment or academic contexts.",
    "action": "Audit inference graph and remove any facial action coding (FACS), pupil dilation, or voice inflection sentiment classifiers deployed in employment or education endpoints. Add CI/CD gating tests that assert zero affective computing models are packaged in candidate or student pipelines.",
    "source_url": "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689",
    "source_note": "EU AI Act Article 5(1)(f) (Prohibited AI practices - Emotion recognition in workplace/education)"
  },
  {
    "id": "eu_ai_act_law_enforcement_public_biometric",
    "triggers": ["law_enforcement", "biometric"],
    "jurisdiction": "EU",
    "status": "binding",
    "instrument": "EU AI Act (Article 5(1)(d) & Annex III, Point 1)",
    "finding": "Real-time remote biometric identification systems in publicly accessible spaces for law enforcement are prohibited under Article 5(1)(d), except under strictly circumscribed statutory judicial authorizations.",
    "recommendation": "Establish strict boundary fences preventing remote biometric surveillance from operating in publicly accessible physical or digital spaces.",
    "action": "Hardcode architectural fences that reject real-time RTSP/video camera streams from publicly accessible spaces. Enforce judicial warrant metadata verification and strict ex-post forensic audit logging before permitting any asynchronous biometric identification query.",
    "source_url": "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689",
    "source_note": "EU AI Act Article 5(1)(d) (Prohibited remote biometric identification in public spaces)"
  },
  {
    "id": "eu_gdpr_cross_border_data_transfer",
    "triggers": ["cross_border", "personal_data"],
    "jurisdiction": "EU",
    "status": "binding",
    "instrument": "EU GDPR (Regulation 2016/679, Articles 44–49)",
    "finding": "Transfers of personal data to third countries or international organizations outside the European Economic Area (EEA) require an adequacy decision, Standard Contractual Clauses (SCCs), or Binding Corporate Rules (BCRs).",
    "recommendation": "Review cloud infrastructure topology. Ensure EU user data is processed within EEA regions or protected by valid Standard Contractual Clauses with Transfer Impact Assessments (TIAs).",
    "action": "Pin EU tenant databases and inference models to EU cloud regions (e.g., AWS `eu-west-1` Dublin / Azure Frankfurt). Execute Module 2/3 Standard Contractual Clauses (SCCs) alongside a documented Transfer Impact Assessment (TIA) if telemetry or backup replicas cross third-country borders.",
    "source_url": "https://eur-lex.europa.eu/eli/reg/2016/679/oj",
    "source_note": "GDPR Chapter V (Transfers of personal data to third countries or international organisations)"
  },

  // ==========================================================================
  // INDIA (11 Rules)
  // ==========================================================================
  {
    "id": "in_dpdp_candidate_data_fiduciary",
    "triggers": ["employment", "personal_data"],
    "jurisdiction": "IN",
    "status": "binding",
    "instrument": "India DPDP Act 2023 (Section 4, 5 & 6)",
    "finding": "Personal data processing of job candidates triggers Data Fiduciary obligations under India's Digital Personal Data Protection Act 2023. Processing must be for a lawful purpose with clear itemized notice and verifiable consent.",
    "recommendation": "Assess applicability of DPDP framework: determine purpose limitation, notice delivery, and lawful processing basis.",
    "action": "Implement an explicit itemized candidate consent notice (Section 5) in ATS candidate portals with granular toggles for resume parsing and reference checks. Configure automated deletion TTLs (e.g., 180 days post-rejection) under Section 8(7) unless ongoing statutory record-keeping is documented.",
    "source_url": "https://www.meity.gov.in/content/digital-personal-data-protection-act-2023",
    "source_note": "DPDP Act 2023 Section 5 (Notice) & Section 6 (Consent)"
  },
  {
    "id": "in_dpdp_retention_erasure_mandate",
    "triggers": ["personal_data"],
    "jurisdiction": "IN",
    "status": "binding",
    "instrument": "India DPDP Act 2023 (Section 8(7) - Data Erasure)",
    "finding": "A Data Fiduciary must erase personal data upon withdrawal of consent, or as soon as it is reasonable to assume the specified purpose is no longer being served, whichever is earlier — unless retention is required for compliance with any law in force.",
    "recommendation": "Establish explicit data lifecycle policies. Map every data collection to a documented legal basis and retention schedule. Where statutory retention is claimed, identify the specific law authorising it.",
    "action": "Deploy automated cron-based database deletion workers that soft-delete and purge personal data records within 30 days of consent withdrawal or purpose fulfillment. Maintain a legal-hold metadata table specifying the explicit Indian statutory exception (e.g., Companies Act, Income Tax Act) for any non-erased record.",
    "source_url": "https://www.meity.gov.in/content/digital-personal-data-protection-act-2023",
    "source_note": "DPDP Act 2023 Section 8(7) (Erasure upon purpose fulfilment, subject to legal retention exceptions)"
  },
  {
    "id": "in_dpdp_children_tracking_ban",
    "triggers": ["children", "personal_data"],
    "jurisdiction": "IN",
    "status": "binding",
    "instrument": "India DPDP Act 2023 (Section 9 - Processing Children's Data)",
    "finding": "Section 9(3) prohibits tracking, behavioural monitoring, or targeted advertising directed at children (defined as natural persons under 18 years). Section 9(1) requires verifiable parental consent before processing children's personal data.",
    "recommendation": "Verify user age thresholds for all data flows. Prohibit behavioural telemetry and targeted recommendation pipelines for underage accounts by default, unless covered by a government-notified exemption.",
    "action": "Implement cryptographic or government-ID backed verifiable parental consent (VPC) before account creation for users under 18. Hard-disable tracking cookies, behavioral ad-targeting pixels, and predictive engagement algorithms on verified minor sessions to comply with the strict Section 9(3) ban.",
    "source_url": "https://www.meity.gov.in/content/digital-personal-data-protection-act-2023",
    "source_note": "DPDP Act 2023 Section 9(1)-(4) (Special obligations for children's data)"
  },
  {
    "id": "in_dpdp_multilingual_notice_grievance",
    "triggers": ["personal_data"],
    "jurisdiction": "IN",
    "status": "binding",
    "instrument": "India DPDP Act 2023 (Section 5(3) & Section 12)",
    "finding": "Data Fiduciaries must give data principals the option to view notice and privacy terms in English or any of the 22 scheduled Indian languages, and provide a grievance officer.",
    "recommendation": "Provide clear, itemized notice with details of personal data sought, specified purpose, and grievance redressal channels.",
    "action": "Deploy a client-side localized notice selector supporting English and the 22 Eighth Schedule languages (Hindi, Bengali, Tamil, etc.) with standardized DPDP notice fields. Expose a dedicated grievance ticketing endpoint with an assigned Grievance Officer SLA (resolution within 30 days) per Section 12.",
    "source_url": "https://www.meity.gov.in/content/digital-personal-data-protection-act-2023",
    "source_note": "DPDP Act 2023 Section 5(3) (Notice in 22 languages) and Section 12 (Grievance)"
  },
  {
    "id": "in_it_spdi_health_records",
    "triggers": ["health", "personal_data"],
    "jurisdiction": "IN",
    "status": "binding",
    "instrument": "IT Act 2000 (Section 43A) & IT (SPDI) Rules 2011",
    "finding": "Health records constitute Sensitive Personal Data or Information (SPDI) under Rule 3(1) of the Information Technology (Reasonable Security Practices and Procedures and SPDI) Rules 2011, made under Section 43A of the IT Act 2000.",
    "recommendation": "Implement ISO/IEC 27001 or equivalent information security standard for systems holding health records. Ensure a written privacy policy covering data categories, purpose, and disclosure is publicly available.",
    "action": "Obtain written (or electronic) patient consent before collecting health data. Publish a comprehensive privacy policy per Rule 4 of IT (SPDI) Rules 2011. Implement technical and organisational controls for health record storage.",
    "source_url": "https://www.meity.gov.in/sites/upload_files/dit/files/GSR313E_10511%281%29.pdf",
    "source_note": "IT (SPDI) Rules 2011, Rule 3(1) — Health Records as Sensitive Personal Data"
  },
  {
    "id": "in_dpdp_significant_data_fiduciary",
    "triggers": ["large_scale_data", "personal_data"],
    "jurisdiction": "IN",
    "status": "binding",
    "instrument": "India DPDP Act 2023 (Section 10 — Significant Data Fiduciary)",
    "finding": "Entities designated as Significant Data Fiduciaries (SDFs) by the Central Government based on data volume, sensitivity, or risk to electoral democracy/public order face enhanced compliance mandates.",
    "recommendation": "Assess whether large-scale user data ingestion or high-volume algorithmic processing will trigger Section 10 SDF notification criteria.",
    "action": "Formally designate an India-resident Data Protection Officer (DPO) reporting directly to the Board of Directors, establish an automated quarterly Data Protection Impact Assessment (DPIA) workflow for algorithmic updates, and retain a CERT-In empanelled auditor for mandatory annual compliance audits under Section 10(2).",
    "source_url": "https://www.meity.gov.in/content/digital-personal-data-protection-act-2023",
    "source_note": "DPDP Act 2023 Section 10 (Significant Data Fiduciary obligations)"
  },
  {
    "id": "in_dpdp_cross_border_transfer_restrictions",
    "triggers": ["cross_border", "personal_data"],
    "jurisdiction": "IN",
    "status": "binding",
    "instrument": "India DPDP Act 2023 (Section 16 — Cross-Border Transfers)",
    "finding": "The Central Government may notify countries or territories outside India to which personal data transfers are restricted (negative list/blacklist). Sector-specific localization mandates (such as RBI payment data storage directives) remain preserved under Section 16(2).",
    "recommendation": "Maintain a dynamic registry of external cloud hosting regions and verify destinations against MeitY blacklists and sectoral localization circulars.",
    "action": "Implement geolocation routing rules in cloud storage and LLM inference pipelines ensuring Indian user personal data is not transmitted to restricted jurisdictions or offshore servers without satisfying sectoral storage mandates (e.g. RBI payments data directives).",
    "source_url": "https://www.meity.gov.in/content/digital-personal-data-protection-act-2023",
    "source_note": "DPDP Act 2023 Section 16 (Transfer of personal data outside India)"
  },
  {
    "id": "in_dpdp_breach_reporting_dpbi",
    "triggers": ["personal_data"],
    "jurisdiction": "IN",
    "status": "binding",
    "instrument": "India DPDP Act 2023 (Section 8(6) — Breach Notification)",
    "finding": "In the event of a personal data breach, the Data Fiduciary must give intimation of such breach to the Data Protection Board of India (DPBI) and to each affected Data Principal in such form and manner as may be prescribed.",
    "recommendation": "Establish automated security incident detection, forensic logging, and standardized customer notification templates.",
    "action": "Build automated incident response pipelines with CERT-In 6-hour cybersecurity reporting and DPBI personal data breach notification workflows.",
    "source_url": "https://www.meity.gov.in/content/digital-personal-data-protection-act-2023",
    "source_note": "DPDP Act 2023 Section 8(6) (Mandatory personal data breach notification)"
  },
  {
    "id": "in_dpdp_reasonable_security_safeguards",
    "triggers": ["personal_data"],
    "jurisdiction": "IN",
    "status": "binding",
    "instrument": "India DPDP Act 2023 (Section 8(5) & Schedule Penalties)",
    "finding": "A Data Fiduciary must protect personal data in its possession or under its control by taking reasonable security safeguards to prevent personal data breach. Failure to take reasonable safeguards carries statutory penalties under the Schedule up to ₹250 crore.",
    "recommendation": "Implement end-to-end encryption, strict role-based access control (RBAC), and continuous vulnerability testing across all data stores.",
    "action": "Enforce AES-256-GCM encryption with Customer-Managed Encryption Keys (CMEK) at rest and TLS 1.3 with Perfect Forward Secrecy in transit across all candidate and user databases. Implement immutable append-only WORM audit logs for admin access, and establish a continuous CERT-In 6-hour incident escalation path to avert ₹250 crore statutory liability.",
    "source_url": "https://www.meity.gov.in/content/digital-personal-data-protection-act-2023",
    "source_note": "DPDP Act 2023 Section 8(5) & Schedule item 1 (Penalties up to ₹250 crore)"
  },
  {
    "id": "in_rbi_digital_lending_ai_underwriting",
    "triggers": ["finance_credit", "ai_decision"],
    "jurisdiction": "IN",
    "status": "binding",
    "instrument": "Reserve Bank of India (RBI) Digital Lending Guidelines 2022",
    "finding": "Regulated Entities (REs) and Lending Service Providers (LSPs) utilizing automated scoring or algorithmic credit assessments must ensure algorithmic transparency, auditability, and non-discriminatory lending practices.",
    "recommendation": "Ensure algorithmic loan assessment models maintain comprehensive audit trails and cannot be modified without formal credit risk committee approval.",
    "action": "Strip all device-level mobile app permissions (contacts, call logs, media, biometric storage) from digital lending SDKs per RBI Chapter IV. Bind loan decisioning to auditable algorithmic credit parameters, pin lending data storage strictly within Indian borders (AWS ap-south-1 / Azure Central India), and generate standardized Key Fact Statements (KFS) itemizing interest, fees, and algorithmically determined credit limits.",
    "source_url": "https://www.rbi.org.in/scripts/BS_CircularIndexDisplay.aspx?Id=12382",
    "source_note": "RBI Guidelines on Digital Lending (DOR.CRE.REC.66/21.07.001/2022-23)"
  },
  {
    "id": "in_it_rules_intermediary_due_diligence_ai",
    "triggers": ["content_moderation", "ai_decision"],
    "jurisdiction": "IN",
    "status": "binding",
    "instrument": "IT (Intermediary Guidelines) Rules 2021 & MeitY AI Advisory 2024",
    "finding": "Online intermediaries and platforms deploying AI for content moderation, synthetic media, or conversational generation must exercise due diligence to prevent hosting misinformation, deepfakes, or unlawful content under Rule 3(1)(b).",
    "recommendation": "Deploy conspicuous metadata labelling on AI-generated or synthetically altered audio-visual media. Establish an expedited 24-hour take-down mechanism for non-consensual deepfakes.",
    "action": "Inject C2PA-compliant cryptographically signed provenance metadata into synthesized audio-visual media headers. Deploy an automated Grievance Portal with an SLA-backed 24-hour expedited takedown queue for non-consensual deepfakes, impersonation, or child sexual abuse material (CSAM) per Rule 3(2)(b).",
    "source_url": "https://www.meity.gov.in/writereaddata/files/Information%20Technology%20%28Intermediary%20Guidelines%20and%20Digital%20Media%20Ethics%20Code%29%20Rules%2C%202021.pdf",
    "source_note": "IT Rules 2021, Rule 3(1)(b) & MeitY Advisory on Deepfakes / Unlawful Content (2024)"
  },

  // ==========================================================================
  // UNITED STATES (10 Rules)
  // ==========================================================================
  {
    "id": "us_nist_employment_bias_testing",
    "triggers": ["employment", "ai_decision"],
    "jurisdiction": "US",
    "status": "voluntary",
    "instrument": "NIST AI RMF 1.0 (Measure 2.5) & EEOC Guidance",
    "finding": "Employment + AI ranking raises fairness and transparency expectations. Automated candidate ranking can produce unintended disparate impact across protected demographic categories under Title VII of the Civil Rights Act.",
    "recommendation": "Consider NIST AI RMF-style risk documentation and bias testing even where federal regulation is not yet codified into a single binding statute.",
    "action": "Maintain an automated candidate score logging pipeline and execute quarterly disparate impact audits calculating the Adverse Impact Ratio (AIR) across race, gender, and age cohorts under EEOC Uniform Guidelines (4/5ths rule).",
    "source_url": "https://www.nist.gov/itl/ai-risk-management-framework",
    "source_note": "NIST AI RMF 1.0 Measure 2.5 (AI systems evaluated for bias and equity)"
  },
  {
    "id": "us_nyc_local_law_144_aedt",
    "triggers": ["employment", "ai_decision", "autonomous_action"],
    "jurisdiction": "US",
    "status": "binding",
    "instrument": "NYC Local Law 144 (AEDT Regulation)",
    "finding": "Automated Employment Decision Tools (AEDT) used in New York City to screen or rank candidates for employment or promotion are subject to mandatory annual independent bias audits and candidate notice rules.",
    "recommendation": "Check whether candidates reside in NYC or covered jurisdictions before deploying automated ranking or scoring algorithms.",
    "action": "Commission an independent auditor to publish an annual bias audit table showing selection rates and Impact Ratios across EEO-1 demographic groups on the public careers portal. Provide NYC candidates with written notice 10 business days before evaluation offering an alternative selection process or accommodation.",
    "source_url": "https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page",
    "source_note": "NYC Admin. Code § 20-870 et seq. (AEDT Audit & Notice Requirements)"
  },
  {
    "id": "us_ftc_act_sec5_algorithmic_truth",
    "triggers": ["ai_decision"],
    "jurisdiction": "US",
    "status": "binding",
    "instrument": "FTC Act Section 5 (Unfair or Deceptive Practices)",
    "finding": "The Federal Trade Commission actively enforces against deceptive claims regarding AI accuracy, hidden algorithmic bias, or undisclosed commercial use of user prompts for model training.",
    "recommendation": "Ensure marketing and product documentation accurately reflects model limitations, potential hallucinations, and evaluation benchmarks.",
    "action": "Maintain verifiable empirical benchmark test suites (evaluating latency, hallucination rate, and failure modes) for all public capability claims, and enforce an explicit opt-in checkbox before utilizing enterprise prompt payloads for secondary foundation model training.",
    "source_url": "https://www.ftc.gov/business-guidance/blog/2023/02/keep-your-ai-claims-check",
    "source_note": "FTC Policy Statement on Deceptive AI and Algorithmic Claims"
  },
  {
    "id": "us_illinois_bipa_biometric_release",
    "triggers": ["biometric"],
    "jurisdiction": "US",
    "status": "binding",
    "instrument": "Illinois Biometric Information Privacy Act (740 ILCS 14/)",
    "finding": "Capturing, collecting, purchasing, or storing biometric identifiers (facial geometry scans, retina, fingerprints) without prior informed written consent triggers strict private rights of action with statutory damages.",
    "recommendation": "Establish written biometric privacy policy and written releases before collecting user selfies or facial scans from Illinois residents.",
    "action": "Deploy an explicit, unbundled written consent click-through prior to camera access, specifying the exact biometric algorithm, purpose, and destruction timetable (within 3 years or purpose fulfillment). Publish a public, downloadable Biometric Data Retention and Destruction Schedule per 740 ILCS 14/15(a).",
    "source_url": "https://www.ilga.gov/legislation/ilcs/ilcs3.asp?ActID=3004",
    "source_note": "740 ILCS 14/15 (Retention, collection, disclosure, destruction)"
  },
  {
    "id": "us_hipaa_phi_ai_systems",
    "triggers": ["health", "personal_data"],
    "jurisdiction": "US",
    "status": "binding",
    "instrument": "HIPAA Privacy & Security Rules (45 CFR Parts 160 & 164)",
    "finding": "AI systems processing Protected Health Information (PHI)—including patient symptoms, diagnostic reports, treatment history, or drug prescriptions—must comply with the HIPAA Privacy Rule and Security Rule if the entity qualifies as a Covered Entity or Business Associate.",
    "recommendation": "Determine whether the AI system qualifies as a Business Associate by processing PHI on behalf of a HIPAA Covered Entity. If so, execute a Business Associate Agreement (BAA).",
    "action": "Execute a formal BAA with healthcare providers. Implement zero-data-retention (ZDR) API agreements with third-party LLM providers, enforce client-side PHI de-identification (Safe Harbor / Expert Determination) before inference, and log all queries under 45 CFR 164.312.",
    "source_url": "https://www.hhs.gov/hipaa/for-professionals/security/laws-regulations/index.html",
    "source_note": "HIPAA Security Rule 45 CFR 164.312 (Technical Safeguards for Protected Health Information)"
  },
  {
    "id": "us_ccpa_cpra_automated_decision_making",
    "triggers": ["personal_data", "autonomous_action"],
    "jurisdiction": "US",
    "status": "binding",
    "instrument": "California Consumer Privacy Act / CPRA (Cal. Civ. Code § 1798.185)",
    "finding": "Under CPRA and draft CPPA regulations, California consumers possess explicit rights to opt out of Automated Decision-Making Technology (ADMT) profiling concerning work performance, economic situation, health, or personal behavior, and right to pre-use notices.",
    "recommendation": "Audit automated decision logic to confirm whether decisions produce legal or similarly significant effects regarding financial, housing, education, or employment access.",
    "action": "Expose an affirmative 'Do Not Process via Automated Decision-Making' API flag and account toggle, honor Global Privacy Control (GPC) signals in HTTP headers, and route opting-out California consumers to an asynchronous human review queue with equivalent turnaround time SLAs.",
    "source_url": "https://oag.ca.gov/privacy/ccpa",
    "source_note": "Cal. Civ. Code § 1798.185(a)(16) & CPPA Automated Decisionmaking Technology Framework"
  },
  {
    "id": "us_california_ai_transparency_watermarking",
    "triggers": ["ai_decision", "content_moderation"],
    "jurisdiction": "US",
    "status": "binding",
    "instrument": "California Generative AI Transparency Acts (AB 2013 & AB 3211)",
    "finding": "California statutes mandate that developers of generative AI models publicly disclose high-level summaries of training data datasets and implement cryptographic watermarks / C2PA provenance metadata into AI-generated audio, video, and text.",
    "recommendation": "Document dataset sources, copyright status, and custodial data provenance. Integrate digital provenance standards (e.g. C2PA Coalition for Content Provenance and Authenticity).",
    "action": "Implement C2PA Content Credentials manifest signing on all generated media containers (PNG, MP4, WebM) detailing model version and synthesis timestamp. Publish a public-facing AB 2013 dataset disclosure detailing dataset sources, whether copyrighted works were used, and whether personal data was scrubbed.",
    "source_url": "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2013",
    "source_note": "California AB 2013 (Training Data Transparency) & AB 3211 (Digital Content Provenance)"
  },
  {
    "id": "us_ftc_algorithmic_disgorgement_remedy",
    "triggers": ["ai_decision", "personal_data"],
    "jurisdiction": "US",
    "status": "binding",
    "instrument": "FTC Algorithmic Disgorgement Enforcement Precedents",
    "finding": "In multiple enforcement actions (Everalbum, Kurbo/Weight Watchers, Rite Aid), the FTC has mandated 'algorithmic disgorgement'—requiring companies to permanently destroy AI models, weights, and algorithms trained on improperly collected or deceptive consumer data.",
    "recommendation": "Maintain strict provenance linking every training dataset to its explicit consent authorization to mitigate existential model destruction risk.",
    "action": "Architect model training pipelines using modular Low-Rank Adaptation (LoRA) adapters and maintain cryptographic DVC/MLflow data lineage manifests. Ensure any model adapter trained on non-consensual or deceptive data can be surgically disgorged and retrained within 14 days without scrapping foundational base model weights.",
    "source_url": "https://www.ftc.gov/business-guidance/blog/2021/05/you-cant-build-ai-stolen-data-ftc-orders-model-destruction",
    "source_note": "FTC Policy on Algorithmic Disgorgement (Mandatory Model & Weight Destruction Orders)"
  },
  {
    "id": "us_fcra_automated_credit_adverse_action",
    "triggers": ["finance_credit", "ai_decision"],
    "jurisdiction": "US",
    "status": "binding",
    "instrument": "Fair Credit Reporting Act (15 U.S.C. § 1681m) & CFPB Circular 2022-03",
    "finding": "When an AI system or algorithmic model denies credit, sets less favorable loan terms, or limits credit lines, the creditor must issue an Adverse Action Notice stating specific, accurate key reasons. The CFPB has confirmed that model complexity or black-box opacity is not a legal defense.",
    "recommendation": "Implement explainable AI methods (e.g., TreeSHAP, integrated gradients) capable of isolating the top negative score factors for each individual applicant.",
    "action": "Implement TreeSHAP or Integrated Gradients on credit-scoring neural nets / gradient-boosted trees to isolate the exact top 4 adverse factors. Automatically generate CFPB-compliant Adverse Action Notices stating specific reasons (e.g., 'delinquency on accounts', 'debt-to-income ratio too high') rather than generic algorithmic opacity claims.",
    "source_url": "https://www.consumerfinance.gov/compliance/circulars/circular-2022-03-adverse-action-notification-requirements-in-connection-with-credit-decisions-based-on-complex-algorithms/",
    "source_note": "CFPB Circular 2022-03 (Adverse action requirements in complex algorithm credit decisions)"
  },
  {
    "id": "us_illinois_bipa_damages_per_scan_amendment",
    "triggers": ["biometric"],
    "jurisdiction": "US",
    "status": "binding",
    "instrument": "Illinois BIPA (740 ILCS 14/20) & 2024 SB 2979 Amendment",
    "finding": "Illinois General Assembly enacted SB 2979 (effective 2024), establishing that multiple biometric collections of the same person using the same method constitutes a single statutory violation, capping run-away per-scan damages while reaffirming strict liability for unconsented capture.",
    "recommendation": "Review biometric capture mechanisms to ensure electronic consent execution occurs before the very first frame of biometric data is captured.",
    "action": "Implement a mandatory click-through written release gate and maintain an immutable cryptographic log of user consent timestamp before initializing camera or biometric sensors, ensuring compliance with the SB 2979 single-violation threshold.",
    "source_url": "https://www.ilga.gov/legislation/BillStatus.asp?DocNum=2979&GAID=17&DocTypeID=SB&LegId=152781&SessionID=112",
    "source_note": "Illinois Public Act 103-0769 (SB 2979 BIPA Damages Per-Person Clarification)"
  }
];
