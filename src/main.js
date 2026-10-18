import { SCENARIOS } from './data/scenarios.js';
import { extractSignals } from './engine/signalExtractor.js';
import { evaluateAllJurisdictions } from './engine/knowledgeBase.js';

// DOM Elements
const presetsContainer = document.getElementById('presets-container');
const featureInput = document.getElementById('feature-input');
const charCount = document.getElementById('char-count');
const btnClear = document.getElementById('btn-clear');
const btnAnalyze = document.getElementById('btn-analyze');
const signalsSection = document.getElementById('signals-section');
const signalsContainer = document.getElementById('signals-container');
const signalCountBadge = document.getElementById('signal-count-badge');
const guidanceSection = document.getElementById('guidance-section');
const welcomeEmptyState = document.getElementById('welcome-empty-state');
const btnOpenMcp = document.getElementById('btn-open-mcp');
const btnCloseMcp = document.getElementById('btn-close-mcp');
const mcpDialog = document.getElementById('mcp-dialog');
const mcpSchemaCode = document.getElementById('mcp-schema-code');
const btnCopyMcpSchema = document.getElementById('btn-copy-mcp-schema');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

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
  }, 2800);
}

// Setup Event Listeners
function setupEventListeners() {
  featureInput.addEventListener('input', updateCharCount);

  btnClear.addEventListener('click', () => {
    featureInput.value = '';
    document.querySelectorAll('.preset-card').forEach(c => c.classList.remove('active'));
    updateCharCount();
    featureInput.focus();
  });

  featureInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      btnAnalyze.click();
    }
  });

  // MCP Dialog
  btnOpenMcp.addEventListener('click', () => {
    const sampleSchema = {
      name: "get_compliance_guidance",
      description: "Evaluates AI feature description across EU AI Act, GDPR, India DPDP, and US NIST AI RMF",
      inputSchema: {
        type: "object",
        properties: {
          feature_description: {
            type: "string",
            description: "Natural language description of the application or AI feature"
          }
        },
        required: ["feature_description"]
      }
    };
    mcpSchemaCode.textContent = JSON.stringify(sampleSchema, null, 2);
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

  // Analyze Button Click
  btnAnalyze.addEventListener('click', () => {
    const query = featureInput.value.trim();
    if (!query) {
      showToast('Please describe your feature or select a scenario above.');
      featureInput.focus();
      return;
    }

    const signalVector = extractSignals(query);
    renderSignals(signalVector);

    const guidance = evaluateAllJurisdictions(signalVector);
    renderJurisdictions(guidance);
  });
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

// Render Jurisdiction Cards
export function renderJurisdictions(guidance) {
  guidanceSection.classList.remove('hidden');

  const configs = [
    { prefix: 'eu', data: guidance.EU },
    { prefix: 'in', data: guidance.IN },
    { prefix: 'us', data: guidance.US }
  ];

  configs.forEach(({ prefix, data }) => {
    // Risk tier pill
    const tierEl = document.getElementById(`${prefix}-tier`);
    if (tierEl) {
      tierEl.textContent = data.riskTier;
      tierEl.className = `risk-tier-pill ${data.tierColor}`;
    }

    // Findings
    const findingsEl = document.getElementById(`${prefix}-findings`);
    if (findingsEl) {
      findingsEl.innerHTML = data.findings.map(f => `<p>${f}</p>`).join('');
    }

    // Suggestions
    const suggestionsEl = document.getElementById(`${prefix}-suggestions`);
    if (suggestionsEl) {
      suggestionsEl.innerHTML = data.suggestions.map(s => `<li>${s}</li>`).join('');
    }

    // Citations
    const citationsEl = document.getElementById(`${prefix}-citations`);
    if (citationsEl) {
      citationsEl.innerHTML = data.citations.map(c => `<span class="citation-tag">${c}</span>`).join('');
    }
  });
}

// Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  initPresets();
  setupEventListeners();
  updateCharCount();
});
