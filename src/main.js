import { SCENARIOS } from './data/scenarios.js';
import { orchestrateCompliance, MANDATORY_LEGAL_DISCLAIMER } from './engine/orchestrator.js';

// DOM Elements
const presetsContainer = document.getElementById('presets-container');
const featureInput = document.getElementById('feature-input');
const charCount = document.getElementById('char-count');
const btnClear = document.getElementById('btn-clear');
const btnAnalyze = document.getElementById('btn-analyze');

const signalsSection = document.getElementById('signals-section');
const signalsContainer = document.getElementById('signals-container');
const signalCountBadge = document.getElementById('signal-count-badge');

const tensionSection = document.getElementById('tension-section');
const tensionTitle = document.getElementById('tension-title');
const tensionParties = document.getElementById('tension-parties');
const tensionSummary = document.getElementById('tension-summary');
const tensionGuidance = document.getElementById('tension-guidance');

const guidanceSection = document.getElementById('guidance-section');
const checklistSection = document.getElementById('checklist-section');
const checklistItemsContainer = document.getElementById('checklist-items');
const btnCopyChecklist = document.getElementById('btn-copy-checklist');
const welcomeEmptyState = document.getElementById('welcome-empty-state');

const euRulesContainer = document.getElementById('eu-rules-container');
const inRulesContainer = document.getElementById('in-rules-container');
const usRulesContainer = document.getElementById('us-rules-container');

const euStatusBadge = document.getElementById('eu-status-badge');
const inStatusBadge = document.getElementById('in-status-badge');
const usStatusBadge = document.getElementById('us-status-badge');

const btnOpenMcp = document.getElementById('btn-open-mcp');
const btnCloseMcp = document.getElementById('btn-close-mcp');
const mcpDialog = document.getElementById('mcp-dialog');
const mcpSchemaCode = document.getElementById('mcp-schema-code');
const btnCopyMcpSchema = document.getElementById('btn-copy-mcp-schema');

const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

// Current State
let currentReport = null;

// Initialize Scenario Presets
function initPresets() {
  presetsContainer.innerHTML = '';
  SCENARIOS.forEach((scenario) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'preset-card';
    card.dataset.id = scenario.id;
    card.innerHTML = `
      <div class="preset-title">${scenario.title}</div>
      <div class="preset-sub">${scenario.subtitle}</div>
      <span class="preset-tag">${scenario.tag}</span>
    `;

    card.addEventListener('click', () => {
      document.querySelectorAll('.preset-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      featureInput.value = scenario.description;
      updateCharCount();
      featureInput.focus();
      // Auto-analyze on scenario selection for instant demo experience
      runAnalysis();
    });

    presetsContainer.appendChild(card);
  });
}

// Character Count Helper
function updateCharCount() {
  const len = featureInput.value.length;
  charCount.textContent = `${len} character${len === 1 ? '' : 's'}`;
}

// Show Toast
export function showToast(message) {
  toastMessage.textContent = message;
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3200);
}

// Render Signals
export function renderSignals(signalVector) {
  signalsSection.classList.remove('hidden');
  welcomeEmptyState.classList.add('hidden');
  signalsContainer.innerHTML = '';

  const activeCount = signalVector.tags.filter(t => t.id !== 'minimal_footprint').length;
  signalCountBadge.textContent = `${activeCount} signal${activeCount === 1 ? '' : 's'} detected`;
  signalCountBadge.className = activeCount > 0 ? 'badge mcp-badge' : 'badge';

  signalVector.tags.forEach(tag => {
    const chip = document.createElement('div');
    chip.className = `signal-chip ${tag.badgeClass || ''}`;
    chip.title = tag.description;
    chip.innerHTML = `
      <span>${tag.icon}</span>
      <span>${tag.label}</span>
    `;
    signalsContainer.appendChild(chip);
  });
}

// Render Regulatory Tension Banner
export function renderTension(tension) {
  if (!tension) {
    tensionSection.classList.add('hidden');
    return;
  }

  tensionSection.classList.remove('hidden');
  tensionTitle.textContent = tension.title;
  tensionParties.textContent = tension.parties;
  tensionSummary.textContent = tension.summary;
  tensionGuidance.textContent = tension.developerGuidance;
}

// Render Sourced Jurisdiction Rules
export function renderJurisdictions(guidance) {
  guidanceSection.classList.remove('hidden');

  // Render EU Rules
  renderJurisdictionRules(euRulesContainer, euStatusBadge, guidance.EU);

  // Render India Rules
  renderJurisdictionRules(inRulesContainer, inStatusBadge, guidance.IN);

  // Render US Rules
  renderJurisdictionRules(usRulesContainer, usStatusBadge, guidance.US);
}

function renderJurisdictionRules(container, statusBadge, jurisdictionData) {
  if (!container) return;
  container.innerHTML = '';

  const isBinding = jurisdictionData.hasBinding;
  if (statusBadge) {
    statusBadge.textContent = isBinding ? 'Binding Legislation' : 'Voluntary Framework';
    statusBadge.className = isBinding
      ? 'jurisdiction-status-badge status-pill binding'
      : 'jurisdiction-status-badge status-pill voluntary';
  }

  jurisdictionData.rules.forEach(rule => {
    const card = document.createElement('div');
    card.className = 'rule-item-card';

    const statusBadgeHtml = rule.status === 'binding'
      ? `<span class="status-pill binding">🔒 Binding Legislation</span>`
      : `<span class="status-pill voluntary">📋 Voluntary Framework</span>`;

    const triggersHtml = rule.triggers.length > 0
      ? rule.triggers.map(t => `<span class="trigger-badge">${t}</span>`).join('')
      : `<span class="trigger-badge">general</span>`;

    card.innerHTML = `
      <div class="rule-header-row">
        <span class="rule-instrument">${rule.instrument}</span>
        ${statusBadgeHtml}
      </div>
      <div class="rule-block">
        <span class="rule-block-label">Finding:</span>
        <p class="rule-finding">${rule.finding}</p>
      </div>
      <div class="rule-block">
        <span class="rule-block-label">Recommendation:</span>
        <p class="rule-recommendation">${rule.recommendation}</p>
      </div>
      <div class="rule-action-box">
        <strong>Action:</strong> ${rule.action}
      </div>
      <div class="rule-footer-row">
        <a href="${rule.source_url}" target="_blank" rel="noopener noreferrer" class="rule-source-link">
          🔗 Source: ${rule.source_note}
        </a>
        <div class="rule-trigger-chips">
          ${triggersHtml}
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// Render Actionable Checklist
export function renderChecklist(report) {
  checklistSection.classList.remove('hidden');
  checklistItemsContainer.innerHTML = '';

  const coreTasks = [
    { text: "Document intended use, system boundaries, and affected user demographics", tag: "Architectural" },
    { text: "Review data handling, collection categories, and retention lifecycle policies", tag: "Data Governance" },
    { text: "Test for algorithmic bias and document human review / override protocols", tag: "Accountability" },
    { text: "Verify each recommendation against its cited statutory source instrument", tag: "Legal Diligence" }
  ];

  // Combine core tasks and matched rule actions
  const allTasks = [...coreTasks];

  ['EU', 'IN', 'US'].forEach(juris => {
    report.guidance[juris].rules.forEach(rule => {
      allTasks.push({
        text: `[${juris}] ${rule.action}`,
        tag: rule.instrument.split('(')[0].trim()
      });
    });
  });

  allTasks.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'checklist-item';
    const id = `chk-${index}`;
    row.innerHTML = `
      <input type="checkbox" id="${id}" class="checklist-checkbox" />
      <label for="${id}" class="checklist-text">${item.text}</label>
      <span class="checklist-meta">${item.tag}</span>
    `;
    checklistItemsContainer.appendChild(row);
  });
}

// Execute Orchestration Pipeline
function runAnalysis() {
  const query = featureInput.value.trim();
  if (!query) {
    showToast('Please describe your feature or select a scenario above.');
    featureInput.focus();
    return;
  }

  // Run central orchestrator
  currentReport = orchestrateCompliance(query);

  // Update UI components
  renderSignals(currentReport.signals);
  renderTension(currentReport.tension);
  renderJurisdictions(currentReport.guidance);
  renderChecklist(currentReport);

  // Persist query in localStorage
  try {
    localStorage.setItem('jurismcp_last_query', query);
  } catch {
    // Ignore storage errors in restricted contexts
  }
}

// Setup Event Listeners
function setupEventListeners() {
  featureInput.addEventListener('input', updateCharCount);

  btnClear.addEventListener('click', () => {
    featureInput.value = '';
    document.querySelectorAll('.preset-card').forEach(c => c.classList.remove('active'));
    updateCharCount();
    signalsSection.classList.add('hidden');
    tensionSection.classList.add('hidden');
    guidanceSection.classList.add('hidden');
    checklistSection.classList.add('hidden');
    welcomeEmptyState.classList.remove('hidden');
    currentReport = null;
    try {
      localStorage.removeItem('jurismcp_last_query');
    } catch {}
    featureInput.focus();
  });

  featureInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runAnalysis();
    }
  });

  btnAnalyze.addEventListener('click', runAnalysis);

  // Copy Developer Checklist
  btnCopyChecklist.addEventListener('click', async () => {
    if (!currentReport || !currentReport.checklist) {
      showToast('No active checklist to copy. Run analysis first.');
      return;
    }

    try {
      await navigator.clipboard.writeText(currentReport.checklist);
      showToast('✓ Markdown Checklist copied to clipboard!');
    } catch {
      window.prompt('Copy your developer compliance checklist below:', currentReport.checklist);
    }
  });

  // MCP Dialog
  btnOpenMcp.addEventListener('click', () => {
    const payload = currentReport
      ? {
          tool: "analyze_compliance",
          input: {
            feature_description: currentReport.query,
            jurisdictions: ["EU", "IN", "US"]
          },
          output: {
            detected_signals: currentReport.signals.tags.map(t => t.label),
            cross_border_tension: currentReport.tension ? currentReport.tension.title : "None",
            jurisdictions: {
              EU: currentReport.guidance.EU.rules.map(r => ({
                status: r.status,
                instrument: r.instrument,
                finding: r.finding,
                action: r.action,
                source: r.source_note
              })),
              India: currentReport.guidance.IN.rules.map(r => ({
                status: r.status,
                instrument: r.instrument,
                finding: r.finding,
                action: r.action,
                source: r.source_note
              })),
              UnitedStates: currentReport.guidance.US.rules.map(r => ({
                status: r.status,
                instrument: r.instrument,
                finding: r.finding,
                action: r.action,
                source: r.source_note
              }))
            },
            disclaimer: MANDATORY_LEGAL_DISCLAIMER
          }
        }
      : {
          name: "analyze_compliance",
          description: "Evaluates AI feature description against curated regulatory rules across EU AI Act, GDPR, India DPDP, and US NIST AI RMF",
          inputSchema: {
            type: "object",
            properties: {
              feature_description: {
                type: "string",
                description: "Natural language description of the application or AI feature"
              },
              jurisdictions: {
                type: "array",
                items: { type: "string" },
                description: "List of jurisdictions to evaluate (default: ['EU', 'IN', 'US'])"
              }
            },
            required: ["feature_description"]
          }
        };

    mcpSchemaCode.textContent = JSON.stringify(payload, null, 2);
    mcpDialog.showModal();
  });

  btnCloseMcp.addEventListener('click', () => {
    mcpDialog.close();
  });

  mcpDialog.addEventListener('click', (e) => {
    if (e.target === mcpDialog) {
      mcpDialog.close();
    }
  });

  btnCopyMcpSchema.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(mcpSchemaCode.textContent);
      showToast('MCP Schema / Payload copied to clipboard!');
    } catch {
      showToast('Failed to copy to clipboard.');
    }
  });
}

// Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  initPresets();
  setupEventListeners();
  updateCharCount();

  // Restore last query if available
  try {
    const saved = localStorage.getItem('jurismcp_last_query');
    if (saved) {
      featureInput.value = saved;
      updateCharCount();
      runAnalysis();
    }
  } catch {}
});
