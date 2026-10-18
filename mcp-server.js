#!/usr/bin/env node

/**
 * JurisMCP — Model Context Protocol (MCP) Stdio Server
 * Exposes cross-jurisdictional compliance orchestration as a standard MCP tool
 * for AI coding assistants (Claude Desktop, Cursor, Antigravity, etc.).
 */

import readline from 'node:readline';
import { orchestrateCompliance } from './src/engine/orchestrator.js';

const TOOL_DEFINITION = {
  name: 'get_compliance_guidance',
  description:
    'Evaluates a natural language description of an AI application or feature against international regulatory frameworks (EU AI Act, GDPR, India DPDP Act 2023, US NIST AI RMF) and returns structured findings, risk classifications, cross-border tensions, and an actionable developer checklist.',
  inputSchema: {
    type: 'object',
    properties: {
      feature_description: {
        type: 'string',
        description: 'Plain-language description of the software feature or AI component being developed.'
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
        tools: [TOOL_DEFINITION]
      }
    };
  }

  if (method === 'tools/call') {
    const toolName = params?.name;
    const args = params?.arguments || {};

    if (toolName !== 'get_compliance_guidance') {
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

    // Run the orchestration pipeline
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
              risk_tier: report.guidance.EU.riskTier,
              findings: report.guidance.EU.findings,
              action_items: report.guidance.EU.suggestions,
              citations: report.guidance.EU.citations
            },
            India: {
              risk_tier: report.guidance.IN.riskTier,
              findings: report.guidance.IN.findings,
              action_items: report.guidance.IN.suggestions,
              citations: report.guidance.IN.citations
            },
            UnitedStates: {
              framework_tier: report.guidance.US.riskTier,
              findings: report.guidance.US.findings,
              action_items: report.guidance.US.suggestions,
              citations: report.guidance.US.citations
            }
          }
        }
      }
    };
  }

  if (method === 'notifications/initialized') {
    return null; // Notifications don't receive responses
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
  console.log('--- JurisMCP CLI Direct Mode ---');
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
