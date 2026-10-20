import { SCENARIOS } from './data/scenarios.js';
import { orchestrateCompliance, MANDATORY_LEGAL_DISCLAIMER } from './engine/orchestrator.js';

// Theme Toggle
const htmlEl = document.documentElement;
const btnThemeToggle = document.getElementById('btn-theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Prompt & Input Elements
const featureInput = document.getElementById('feature-input');
const charCount = document.getElementById('char-count');
const btnClear = document.getElementById('btn-clear');
const btnAnalyze = document.getElementById('btn-analyze');
const presetsContainer = document.getElementById('presets-container');

// View Containers
const welcomeEmptyState = document.getElementById('welcome-empty-state');
const artifactContainer = document.getElementById('artifact-container');
const artifactQuerySummary = document.getElementById('artifact-query-summary');
const blueprintBody = document.getElementById('blueprint-body');
const mcpBody = document.getElementById('mcp-body');
const tabVisualView = document.getElementById('tab-visual-view');
const tabMcpView = document.getElementById('tab-mcp-view');

// Sections
const signalsSection = document.getElementById('signals-section');
const signalsContainer = document.getElementById('signals-container');
const signalCountBadge = document.getElementById('signal-count-badge');

const tensionSection = document.getElementById('tension-section');
const tensionTitle = document.getElementById('tension-title');
const tensionParties = document.getElementById('tension-parties');
const tensionSummary = document.getElementById('tension-summary');
const tensionGuidance = document.getElementById('tension-guidance');

const guidanceSection = document.getElementById('guidance-section');
const euRulesContainer = document.getElementById('eu-rules-container');
const inRulesContainer = document.getElementById('in-rules-container');
const usRulesContainer = document.getElementById('us-rules-container');

const euStatusBadge = document.getElementById('eu-status-badge');
const inStatusBadge = document.getElementById('in-status-badge');
const usStatusBadge = document.getElementById('us-status-badge');

const checklistSection = document.getElementById('checklist-section');
const checklistItemsContainer = document.getElementById('checklist-items');
const checklistProgress = document.getElementById('checklist-progress');
const btnCopyChecklist = document.getElementById('btn-copy-checklist');

// MCP Modals & Inspector
const btnOpenMcp = document.getElementById('btn-open-mcp');
const btnCloseMcp = document.getElementById('btn-close-mcp');
const mcpDialog = document.getElementById('mcp-dialog');
const mcpSchemaCode = document.getElementById('mcp-schema-code');
const btnCopyMcpSchema = document.getElementById('btn-copy-mcp-schema');
const mcpInlineCode = document.getElementById('mcp-inline-code');
const btnCopyMcpPayload = document.getElementById('btn-copy-mcp-payload');

// Toast
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

// Current State
let currentReport = null;

// ============================================================================
// Theme Management (Light / Dark Mode)
// ============================================================================
function initTheme() {
  const savedTheme = localStorage.getItem('jurismcp_theme') || 'light';
  applyTheme(savedTheme);

  btnThemeToggle.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('jurismcp_theme', newTheme);
  });
}

function applyTheme(theme) {
  htmlEl.setAttribute('data-theme', theme);
  if (theme === 'dark') {
    themeIcon.textContent = '☀️';
    btnThemeToggle.title = 'Switch to Claude Light Mode';
  } else {
    themeIcon.textContent = '🌙';
    btnThemeToggle.title = 'Switch to Claude Dark Mode';
  }
}

// ============================================================================
// Scenario Preset Chips
// ============================================================================
function initPresets() {
  presetsContainer.innerHTML = '';
  SCENARIOS.forEach((scenario) => {
    const pill = document.createElement('button');
    pill.type = 'button';
    pill.className = 'scenario-pill';
    pill.dataset.id = scenario.id;
    pill.innerHTML = `
      <span class="scenario-pill-icon">${scenario.title.split(' ')[0]}</span>
      <span class="scenario-pill-text">${scenario.title.split(' ').slice(1).join(' ')}</span>
      <span class="scenario-pill-tag">${scenario.subtitle.split('&')[0].trim()}</span>
    `;

    pill.addEventListener('click', () => {
      document.querySelectorAll('.scenario-pill').forEach(c => c.classList.remove('active'));
      pill.classList.add('active');
      featureInput.value = scenario.description;
      updateCharCount();
      featureInput.focus();
      runAnalysis();
    });

    presetsContainer.appendChild(pill);
  });
}

// Character Count Helper
function updateCharCount() {
  const len = featureInput.value.length;
  charCount.textContent = `${len} character${len === 1 ? '' : 's'}`;
  
  if (len > 0) {
    btnAnalyze.classList.add('has-text');
  } else {
    btnAnalyze.classList.remove('has-text');
  }
}

// Show Claude Toast Notification
export function showToast(message) {
  toastMessage.textContent = message;
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3200);
}

// ============================================================================
// Render 01: Risk Signals Badge Flow
// ============================================================================
export function renderSignals(signalVector) {
  signalsSection.classList.remove('hidden');
  signalsContainer.innerHTML = '';

  const activeCount = signalVector.tags.filter(t => t.id !== 'minimal_footprint').length;
  signalCountBadge.textContent = `${activeCount} risk signal${activeCount === 1 ? '' : 's'} identified`;

  signalVector.tags.forEach(tag => {
    const chip = document.createElement('div');
    const isMinimal = tag.id === 'minimal_footprint';
    chip.className = `signal-badge-item ${!isMinimal ? 'active-signal' : ''}`;
    chip.title = tag.description;
    chip.innerHTML = `
      <span class="signal-badge-icon">${tag.icon}</span>
      <span>${tag.label}</span>
    `;
    signalsContainer.appendChild(chip);
  });
}

// ============================================================================
// Render 02: Regulatory Tension Callout
// ============================================================================
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

// ============================================================================
// Render 03: Curated Statutory Guidance by Jurisdiction
// ============================================================================
export function renderJurisdictions(guidance) {
  guidanceSection.classList.remove('hidden');

  // EU Rules
  renderJurisdictionRules(euRulesContainer, euStatusBadge, guidance.EU);

  // India Rules
  renderJurisdictionRules(inRulesContainer, inStatusBadge, guidance.IN);

  // US Rules
  renderJurisdictionRules(usRulesContainer, usStatusBadge, guidance.US);
}

function renderJurisdictionRules(container, statusBadge, jurisdictionData) {
  if (!container) return;
  container.innerHTML = '';

  const isBinding = jurisdictionData.hasBinding;
  if (statusBadge) {
    statusBadge.textContent = isBinding ? '🔒 Binding Legislation' : '📋 Voluntary Framework';
    statusBadge.className = isBinding
      ? 'status-pill binding'
      : 'status-pill voluntary';
  }

  jurisdictionData.rules.forEach(rule => {
    const card = document.createElement('div');
    card.className = 'rule-dossier-card';

    const statusBadgeHtml = rule.status === 'binding'
      ? `<span class="status-pill binding">Binding</span>`
      : `<span class="status-pill voluntary">Voluntary</span>`;

    const triggersHtml = rule.triggers.length > 0
      ? rule.triggers.map(t => `<span class="trigger-tag">${t}</span>`).join('')
      : `<span class="trigger-tag">general</span>`;

    card.innerHTML = `
      <div class="rule-top-row">
        <h5 class="rule-instrument-name">${rule.instrument}</h5>
        ${statusBadgeHtml}
      </div>
      <div class="rule-finding-block">
        <span class="rule-label">Statutory Finding</span>
        <p class="rule-finding-text">${rule.finding}</p>
      </div>
      <div class="rule-finding-block">
        <span class="rule-label">Architecture Guidance</span>
        <p class="rule-finding-text">${rule.recommendation}</p>
      </div>
      <div class="rule-action-callout">
        <strong>Mandatory Action:</strong> ${rule.action}
      </div>
      <div class="rule-footer-meta">
        <a href="${rule.source_url}" target="_blank" rel="noopener noreferrer" class="rule-source-citation">
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

// ============================================================================
// Render 04: Actionable Developer Checklist
// ============================================================================
export function renderChecklist(report) {
  checklistSection.classList.remove('hidden');
  checklistItemsContainer.innerHTML = '';

  const coreTasks = [
    { text: "Document intended use, system boundaries, and affected user demographics", tag: "Architectural" },
    { text: "Review data handling, collection categories, and retention lifecycle policies", tag: "Data Governance" },
    { text: "Test for algorithmic bias and document human review / override protocols", tag: "Accountability" },
    { text: "Verify each recommendation against its cited statutory source instrument", tag: "Legal Diligence" }
  ];

  const allTasks = [...coreTasks];

  ['EU', 'IN', 'US'].forEach(juris => {
    report.guidance[juris].rules.forEach(rule => {
      allTasks.push({
        text: `[${juris}] ${rule.action}`,
        tag: rule.instrument.split('(')[0].trim()
      });
    });
  });

  const total = allTasks.length;
  let checkedCount = 0;

  function updateProgress() {
    checklistProgress.textContent = `${checkedCount} / ${total} completed`;
  }

  allTasks.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'checklist-row';
    const id = `chk-${index}`;
    row.innerHTML = `
      <input type="checkbox" id="${id}" class="claude-checkbox" />
      <label for="${id}" class="checklist-label">${item.text}</label>
      <span class="checklist-tag">${item.tag}</span>
    `;

    const checkbox = row.querySelector('.claude-checkbox');
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        row.classList.add('completed');
        checkedCount++;
      } else {
        row.classList.remove('completed');
        checkedCount--;
      }
      updateProgress();
    });

    checklistItemsContainer.appendChild(row);
  });

  updateProgress();
}

// ============================================================================
// MCP JSON Payload Generator
// ============================================================================
function generateMcpPayload(report) {
  if (!report) {
    return {
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
  }

  return {
    jsonrpc: "2.0",
    result: {
      tool: "analyze_compliance",
      query: report.query,
      signals: report.signals.tags.map(t => ({
        id: t.id,
        label: t.label,
        matched: t.matched
      })),
      regulatory_divergence: report.tension ? {
        title: report.tension.title,
        parties: report.tension.parties,
        summary: report.tension.summary,
        guidance: report.tension.developerGuidance
      } : null,
      jurisdiction_rules: {
        EU: report.guidance.EU.rules.map(r => ({
          status: r.status,
          instrument: r.instrument,
          action: r.action,
          source_note: r.source_note,
          source_url: r.source_url
        })),
        India: report.guidance.IN.rules.map(r => ({
          status: r.status,
          instrument: r.instrument,
          action: r.action,
          source_note: r.source_note,
          source_url: r.source_url
        })),
        UnitedStates: report.guidance.US.rules.map(r => ({
          status: r.status,
          instrument: r.instrument,
          action: r.action,
          source_note: r.source_note,
          source_url: r.source_url
        }))
      },
      actionable_checklist_markdown: report.checklist,
      disclaimer: MANDATORY_LEGAL_DISCLAIMER
    }
  };
}

// ============================================================================
// Run Central Orchestration
// ============================================================================
function runAnalysis() {
  const query = featureInput.value.trim();
  if (!query) {
    showToast('Please describe your feature or select a scenario above.');
    featureInput.focus();
    return;
  }

  // Run central orchestrator
  currentReport = orchestrateCompliance(query);

  // Switch display from welcome guide to Claude Artifact
  welcomeEmptyState.classList.add('hidden');
  artifactContainer.classList.remove('hidden');

  // Set query summary
  artifactQuerySummary.textContent = `Feature: "${query.length > 90 ? query.slice(0, 90) + '...' : query}"`;

  // Update visual components
  renderSignals(currentReport.signals);
  renderTension(currentReport.tension);
  renderJurisdictions(currentReport.guidance);
  renderChecklist(currentReport);

  // Update raw MCP view
  const payload = generateMcpPayload(currentReport);
  mcpInlineCode.textContent = JSON.stringify(payload, null, 2);

  // Persist query in localStorage
  try {
    localStorage.setItem('jurismcp_last_query', query);
  } catch {}

  // Smooth scroll artifact into view gently
  artifactContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============================================================================
// Event Listeners
// ============================================================================
function setupEventListeners() {
  featureInput.addEventListener('input', updateCharCount);

  btnClear.addEventListener('click', () => {
    featureInput.value = '';
    document.querySelectorAll('.scenario-pill').forEach(c => c.classList.remove('active'));
    updateCharCount();
    artifactContainer.classList.add('hidden');
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

  // Tab switching inside Artifact (Visual Blueprint vs MCP Agent Payload)
  tabVisualView.addEventListener('click', () => {
    tabVisualView.classList.add('active');
    tabMcpView.classList.remove('active');
    blueprintBody.classList.remove('hidden');
    mcpBody.classList.add('hidden');
  });

  tabMcpView.addEventListener('click', () => {
    tabMcpView.classList.add('active');
    tabVisualView.classList.remove('active');
    mcpBody.classList.remove('hidden');
    blueprintBody.classList.add('hidden');
  });

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

  // Copy MCP Inline Payload
  btnCopyMcpPayload.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(mcpInlineCode.textContent);
      showToast('✓ MCP JSON-RPC Payload copied to clipboard!');
    } catch {
      showToast('Failed to copy to clipboard.');
    }
  });

  // MCP Top Modal Inspector
  btnOpenMcp.addEventListener('click', () => {
    const payload = generateMcpPayload(currentReport);
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
      showToast('✓ MCP Payload copied to clipboard!');
    } catch {
      showToast('Failed to copy to clipboard.');
    }
  });
}

// ============================================================================
// Bootstrap Application
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
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
