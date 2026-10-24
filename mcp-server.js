#!/usr/bin/env node

/**
 * Model Context Protocol (MCP) Stdio Server
 * Exposes cross-jurisdictional compliance decision support as standard MCP tools
 * for AI coding assistants (Claude Desktop, Cursor, Antigravity, Windsurf, etc.).
 */

import readline from 'node:readline';
import { orchestrateCompliance, MANDATORY_LEGAL_DISCLAIMER } from './src/engine/orchestrator.js';
import { RULES } from './src/data/rules.js';

// ============================================================================
// Tool Definitions
// ============================================================================

const TOOL_ANALYZE_COMPLIANCE = {
  name: 'analyze_compliance',
  description:
    'Evaluates a natural language description of an AI feature against a curated, traceable library of international statutory rules (EU AI Act, GDPR, India DPDP Act 2023, US NIST AI RMF). Returns explicit risk signals, sourced findings labeled by legal status (binding legislation vs voluntary framework), actionable recommendations, and a developer checklist.',
  inputSchema: {
    type: 'object',
    properties: {
      feature_description: {
        type: 'string',
        description: 'Plain-language description of the software feature or AI component being developed.'
      },
      jurisdictions: {
        type: 'array',
        items: { type: 'string' },
        description: "List of jurisdictions to evaluate (e.g. ['EU', 'IN', 'US']). Defaults to all."
      }
    },
    required: ['feature_description']
  }
};

const TOOL_GET_STATUTORY_RULE = {
  name: 'get_statutory_rule',
  description:
    'Retrieves detailed statutory text, legal classification (binding duty vs voluntary standard), official gazette source citation, and developer action for a specific rule ID.',
  inputSchema: {
    type: 'object',
    properties: {
      rule_id: {
        type: 'string',
        description: 'Exact rule identifier (e.g., eu_ai_act_employment_high_risk, in_dpdp_retention_erasure_mandate, us_nyc_local_law_144_aedt).'
      }
    },
    required: ['rule_id']
  }
};

const TOOL_LIST_SUPPORTED_REGULATIONS = {
  name: 'list_supported_regulations',
  description:
    'Lists all international statutory instruments, jurisdictions, and regulatory frameworks currently tracked in the curated statutory library.',
  inputSchema: {
    type: 'object',
    properties: {}
  }
};

// Available tools
const TOOLS = [
  TOOL_ANALYZE_COMPLIANCE,
  TOOL_GET_STATUTORY_RULE,
  TOOL_LIST_SUPPORTED_REGULATIONS,
  // Backward-compatible alias
  { ...TOOL_ANALYZE_COMPLIANCE, name: 'get_compliance_guidance' }
];

// ============================================================================
// Request Handlers
// ============================================================================

function handleRequest(req) {
  const { id, method, params } = req;

  // 1. Initialize
  if (method === 'initialize') {
    return {
      jsonrpc: '2.0',
      id,
      result: {
        protocolVersion: '2024-11-05',
        capabilities: {
          tools: {},
          resources: {}
        },
        serverInfo: {
          name: 'jurisync-compliance-server',
          version: '1.0.0'
        }
      }
    };
  }

  // 2. Tools List
  if (method === 'tools/list') {
    return {
      jsonrpc: '2.0',
      id,
      result: {
        tools: TOOLS
      }
    };
  }

  // 3. Tools Call
  if (method === 'tools/call') {
    const toolName = params?.name;
    const args = params?.arguments || {};

    // Tool: analyze_compliance
    if (toolName === 'analyze_compliance' || toolName === 'get_compliance_guidance') {
      const featureDesc = args.feature_description || '';
      if (!featureDesc.trim()) {
        return {
          jsonrpc: '2.0',
          id,
          error: {
            code: -32602,
            message: 'Missing or empty required argument: feature_description'
          }
        };
      }

      const report = orchestrateCompliance(featureDesc);

      return {
        jsonrpc: '2.0',
        id,
        result: {
          content: [
            {
              type: 'text',
              text: report.checklist
            }
          ],
          structuredReport: {
            query: report.query,
            detected_signals: report.signals.tags.map(t => ({
              id: t.id,
              label: t.label,
              description: t.description
            })),
            regulatory_divergences: report.tensions && report.tensions.length > 0
              ? report.tensions.map(t => ({
                  title: t.title,
                  parties: t.parties,
                  summary: t.summary,
                  developer_guidance: t.developerGuidance
                }))
              : [],
            jurisdictions: {
              EU: {
                jurisdiction: report.guidance.EU.jurisdiction,
                has_binding_rules: report.guidance.EU.hasBinding,
                rules: report.guidance.EU.rules.map(r => ({
                  id: r.id,
                  status: r.status,
                  instrument: r.instrument,
                  finding: r.finding,
                  recommendation: r.recommendation,
                  action: r.action,
                  source_url: r.source_url,
                  source_note: r.source_note
                }))
              },
              India: {
                jurisdiction: report.guidance.IN.jurisdiction,
                has_binding_rules: report.guidance.IN.hasBinding,
                rules: report.guidance.IN.rules.map(r => ({
                  id: r.id,
                  status: r.status,
                  instrument: r.instrument,
                  finding: r.finding,
                  recommendation: r.recommendation,
                  action: r.action,
                  source_url: r.source_url,
                  source_note: r.source_note
                }))
              },
              UnitedStates: {
                jurisdiction: report.guidance.US.jurisdiction,
                has_binding_rules: report.guidance.US.hasBinding,
                rules: report.guidance.US.rules.map(r => ({
                  id: r.id,
                  status: r.status,
                  instrument: r.instrument,
                  finding: r.finding,
                  recommendation: r.recommendation,
                  action: r.action,
                  source_url: r.source_url,
                  source_note: r.source_note
                }))
              }
            },
            disclaimer: MANDATORY_LEGAL_DISCLAIMER
          }
        }
      };
    }

    // Tool: get_statutory_rule
    if (toolName === 'get_statutory_rule') {
      const ruleId = args.rule_id || '';
      if (!ruleId.trim()) {
        return {
          jsonrpc: '2.0',
          id,
          error: {
            code: -32602,
            message: 'Missing or empty required argument: rule_id'
          }
        };
      }

      const rule = RULES.find(r => r.id === ruleId);
      if (!rule) {
        return {
          jsonrpc: '2.0',
          id,
          error: {
            code: -32602,
            message: `Rule not found: '${ruleId}'. Call list_supported_regulations to inspect available rules.`
          }
        };
      }

      return {
        jsonrpc: '2.0',
        id,
        result: {
          content: [
            {
              type: 'text',
              text: `### [${rule.status.toUpperCase()}] ${rule.instrument}\n\n* **Provision:** ${rule.source_note}\n* **Jurisdiction:** ${rule.jurisdiction}\n* **Finding:** ${rule.finding}\n* **Architecture Recommendation:** ${rule.recommendation}\n* **Developer Action:** ${rule.action}\n* **Official Source:** ${rule.source_url}\n\n*Notice:* ${MANDATORY_LEGAL_DISCLAIMER}`
            }
          ],
          rule
        }
      };
    }

    // Tool: list_supported_regulations
    if (toolName === 'list_supported_regulations') {
      const instruments = Array.from(new Set(RULES.map(r => r.instrument)));
      const jurisdictions = ['EU (European Union)', 'IN (India)', 'US (United States)'];

      return {
        jsonrpc: '2.0',
        id,
        result: {
          content: [
            {
              type: 'text',
              text: `# Supported International Regulations (${RULES.length} Curated Rules)\n\n## Covered Jurisdictions\n${jurisdictions.map(j => `- ${j}`).join('\n')}\n\n## Primary Statutory Instruments\n${instruments.map(i => `- ${i}`).join('\n')}`
            }
          ],
          total_rules: RULES.length,
          rules: RULES.map(r => ({
            id: r.id,
            jurisdiction: r.jurisdiction,
            instrument: r.instrument,
            status: r.status,
            source_note: r.source_note
          }))
        }
      };
    }

    // Unknown tool
    return {
      jsonrpc: '2.0',
      id,
      error: {
        code: -32601,
        message: `Unknown tool: ${toolName}`
      }
    };
  }

  // Unknown method
  return {
    jsonrpc: '2.0',
    id,
    error: {
      code: -32601,
      message: `Method not supported: ${method}`
    }
  };
}

// ============================================================================
// Stdio Server Loop
// ============================================================================

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;

  try {
    const request = JSON.parse(trimmed);
    const response = handleRequest(request);
    process.stdout.write(JSON.stringify(response) + '\n');
  } catch (err) {
    const errorResponse = {
      jsonrpc: '2.0',
      id: null,
      error: {
        code: -32700,
        message: `Parse error: ${err.message}`
      }
    };
    process.stdout.write(JSON.stringify(errorResponse) + '\n');
  }
});
