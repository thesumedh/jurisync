#!/usr/bin/env node

/**
 * JurisMCP — Model Context Protocol (MCP) Stdio Server
 * Exposes cross-jurisdictional compliance decision support as a standard MCP tool
 * for AI coding assistants (Claude Desktop, Cursor, Antigravity, etc.).
 */

import readline from 'node:readline';
import { orchestrateCompliance, MANDATORY_LEGAL_DISCLAIMER } from './src/engine/orchestrator.js';

const TOOL_DEFINITION = {
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

/**
 * Handles JSON-RPC 2.0 requests
 */
function handleRequest(req) {
  const { id, method, params } = req;

  if (method === 'initialize') {
    return {
      jsonrpc: '2.0',
      id,
      result: {
        protocolVersion: '2024-11-05',
        capabilities: {
          tools: {}
        },
        serverInfo: {
          name: 'jurismcp-compliance-server',
          version: '1.0.0'
        }
      }
    };
  }

  if (method === 'tools/list') {
    return {
      jsonrpc: '2.0',
      id,
      result: {
        tools: [
          TOOL_DEFINITION,
          // Backward-compatible alias
          { ...TOOL_DEFINITION, name: 'get_compliance_guidance' }
        ]
      }
    };
  }

  if (method === 'tools/call') {
    const toolName = params?.name;
    const args = params?.arguments || {};

    if (toolName !== 'analyze_compliance' && toolName !== 'get_compliance_guidance') {
      return {
        jsonrpc: '2.0',
        id,
        error: {
          code: -32601,
          message: `Unknown tool: ${toolName}`
        }
      };
    }

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

    // Run the decision-support orchestration pipeline
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
          cross_border_tension: report.tension,
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

  if (method === 'notifications/initialized') {
    return null;
  }

  return {
    jsonrpc: '2.0',
    id,
    error: {
      code: -32601,
      message: `Method not found: ${method}`
    }
  };
}

// Check CLI Arguments for standalone / direct invocation
const cliArgs = process.argv.slice(2);
if (cliArgs.length > 0 && !cliArgs[0].startsWith('--stdio')) {
  const query = cliArgs.join(' ');
  console.log('--- JurisMCP Decision Support CLI ---');
  const report = orchestrateCompliance(query);
  console.log(report.checklist);
  process.exit(0);
}

// Start stdio JSON-RPC listener
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;

  try {
    const req = JSON.parse(trimmed);
    const res = handleRequest(req);
    if (res) {
      process.stdout.write(JSON.stringify(res) + '\n');
    }
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
