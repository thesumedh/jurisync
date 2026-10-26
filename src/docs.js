/**
 * JuriSync Documentation Portal Controller
 * Manages theme synchronization, search filtering, jurisdiction filters, and code block copying.
 */

import { RULES } from './data/rules.js';

// DOM Elements
const htmlEl = document.documentElement;
const btnThemeToggle = document.getElementById('btn-theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const docsSearchInput = document.getElementById('docs-search-input');
const rulesTableBody = document.getElementById('rules-table-body');
const rulesFilterBtns = document.querySelectorAll('.filter-btn');
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const tocLinks = document.querySelectorAll('.toc-link');

// 1. Theme Management (Shared with Web Console)
function initTheme() {
  const savedTheme = localStorage.getItem('jurisync_theme') || 'light';
  applyTheme(savedTheme);

  if (btnThemeToggle) {
    btnThemeToggle.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-theme') || 'light';
      const next = current === 'light' ? 'dark' : 'light';
      applyTheme(next);
      localStorage.setItem('jurisync_theme', next);
    });
  }
}

function applyTheme(theme) {
  htmlEl.setAttribute('data-theme', theme);
  if (themeIcon) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

// 2. Populate Statutory Rules Table from Authoritative Rules
function populateRulesTable(filterJurisdiction = 'ALL') {
  if (!rulesTableBody) return;
  rulesTableBody.innerHTML = '';

  const filtered = filterJurisdiction === 'ALL'
    ? RULES
    : RULES.filter(r => r.jurisdiction.toUpperCase() === filterJurisdiction.toUpperCase());

  filtered.forEach(rule => {
    const tr = document.createElement('tr');
    tr.className = `rule-row jurisdiction-${rule.jurisdiction.toLowerCase()}`;

    const flag = rule.jurisdiction === 'EU' ? '🇪🇺' : rule.jurisdiction === 'IN' ? '🇮🇳' : '🇺🇸';

    tr.innerHTML = `
      <td><strong>${flag} ${rule.jurisdiction}</strong></td>
      <td>
        <span class="status-tag ${rule.status}">${rule.status}</span>
      </td>
      <td>
        <strong>${rule.instrument}</strong><br>
        <code style="font-size:0.74rem; color:var(--text-muted);">${rule.id}</code>
      </td>
      <td>${rule.finding}</td>
      <td>${rule.action}</td>
      <td>
        <a href="${rule.source_url}" target="_blank" rel="noopener noreferrer" style="color:var(--accent-terracotta); font-size:0.78rem; text-decoration:none;">
          ${rule.source_note} ↗
        </a>
      </td>
    `;

    rulesTableBody.appendChild(tr);
  });
}

// 3. Setup Jurisdiction Filter Buttons
function setupRuleFilters() {
  rulesFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      rulesFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const jur = btn.getAttribute('data-jur') || 'ALL';
      populateRulesTable(jur);
    });
  });
}

// 4. Code Block Copy Buttons
function setupCodeCopy() {
  document.querySelectorAll('.btn-doc-copy').forEach(btn => {
    btn.addEventListener('click', async () => {
      const targetId = btn.getAttribute('data-copy-target');
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      const codeText = targetEl.textContent;
      try {
        await navigator.clipboard.writeText(codeText);
        const originalText = btn.textContent;
        btn.textContent = '✓ Copied!';
        btn.style.color = '#22C55E';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.color = '';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy', err);
      }
    });
  });
}

// 5. Documentation Search & Filtering
function setupSearch() {
  if (!docsSearchInput) return;

  docsSearchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    const sections = document.querySelectorAll('.doc-section');

    if (!term) {
      sections.forEach(s => s.style.display = '');
      return;
    }

    sections.forEach(section => {
      const text = section.textContent.toLowerCase();
      if (text.includes(term)) {
        section.style.display = '';
      } else {
        section.style.display = 'none';
      }
    });
  });
}

// 6. Scrollspy for Active Section
function setupScrollspy() {
  const sections = document.querySelectorAll('.doc-section');
  if (sections.length === 0) return;

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      sidebarLinks.forEach(link => {
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

      tocLinks.forEach(link => {
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }, { passive: true });
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  populateRulesTable('ALL');
  setupRuleFilters();
  setupCodeCopy();
  setupSearch();
  setupScrollspy();
});
