/**
 * Preloaded real-world scenarios for instant 1-click testing and 30-second demo recordings.
 */
export const SCENARIOS = [
  {
    id: 'hr_screener',
    title: '💼 HR Hiring Screener',
    subtitle: 'Resume analysis & candidate ranking LLM',
    tag: 'High Risk (EU) / Sensitive (US)',
    description: 'An AI-powered recruitment microservice that analyzes candidate resumes, extracts work experience and education, ranks applicants against job descriptions, and automatically filters out candidates below a 75% compatibility score.'
  },
  {
    id: 'biometric_photos',
    title: '👁️ Biometric Cloud Photos',
    subtitle: 'Face recognition & cloud clustering app',
    tag: 'Special Category Data',
    description: 'A mobile photo gallery app that uploads user selfies to the cloud, generates facial biometric embeddings using a computer vision model, and groups photos by recognized family members and friends.'
  },
  {
    id: 'customer_rag',
    title: '💬 Customer Support RAG',
    subtitle: 'Internal docs chatbot with customer PII',
    tag: 'Transparency & DPDP Duties',
    description: 'An internal customer support assistant that uses retrieval-augmented generation (RAG) over company knowledge bases to answer user inquiries, logging customer emails, account numbers, and chat history for quality training.'
  },
  {
    id: 'clinical_agent',
    title: '🩺 Clinical Symptom Checker',
    subtitle: 'Autonomous patient triaging agent',
    tag: 'Critical Health & Safety',
    description: 'A health technology web application that takes patient reported medical symptoms, queries an AI diagnostic model, and generates immediate triage advice and drug interaction alerts before a doctor consultation.'
  }
];
