import { SCENARIOS } from './data/scenarios.js';

// DOM Elements
const presetsContainer = document.getElementById('presets-container');
const featureInput = document.getElementById('feature-input');
const charCount = document.getElementById('char-count');
const btnClear = document.getElementById('btn-clear');
const btnAnalyze = document.getElementById('btn-analyze');
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

  btnCopyMcpSchema.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(mcpSchemaCode.textContent);
      showToast('MCP Tool Schema copied to clipboard!');
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
});
