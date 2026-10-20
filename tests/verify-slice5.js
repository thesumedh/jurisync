import assert from 'node:assert';
import { spawn } from 'node:child_process';

console.log('--- Running Slice 5 Verification: MCP Stdio Protocol ---');

// Spawn mcp-server.js child process
const serverProcess = spawn('node', ['mcp-server.js'], {
  stdio: ['pipe', 'pipe', 'inherit']
});

let outputData = '';

serverProcess.stdout.on('data', (data) => {
  outputData += data.toString();
});

// Send JSON-RPC requests
const testSequence = [
  // 1. Initialize
  JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: { protocolVersion: '2024-11-05' }
  }),
  // 2. Tools List
  JSON.stringify({
    jsonrpc: '2.0',
    id: 2,
    method: 'tools/list',
    params: {}
  }),
  // 3. Tools Call (analyze_compliance)
  JSON.stringify({
    jsonrpc: '2.0',
    id: 3,
    method: 'tools/call',
    params: {
      name: 'analyze_compliance',
      arguments: {
        feature_description: 'A company is building an AI system that ranks job applicants using CVs in the EU and India.'
      }
    }
  }),
  // 4. Tools Call (get_statutory_rule)
  JSON.stringify({
    jsonrpc: '2.0',
    id: 4,
    method: 'tools/call',
    params: {
      name: 'get_statutory_rule',
      arguments: {
        rule_id: 'eu_ai_act_employment_high_risk'
      }
    }
  }),
  // 5. Tools Call (list_supported_regulations)
  JSON.stringify({
    jsonrpc: '2.0',
    id: 5,
    method: 'tools/call',
    params: {
      name: 'list_supported_regulations',
      arguments: {}
    }
  })
];

// Write requests to stdin
testSequence.forEach(req => {
  serverProcess.stdin.write(req + '\n');
});

serverProcess.stdin.end();

serverProcess.on('close', (code) => {
  assert.strictEqual(code, 0, `MCP server process exited with code ${code}`);

  const lines = outputData.trim().split('\n').filter(Boolean);
  assert.strictEqual(lines.length, 5, 'Must receive exactly 5 JSON-RPC responses');

  // Response 1: Initialize
  const initRes = JSON.parse(lines[0]);
  assert.strictEqual(initRes.id, 1);
  assert.strictEqual(initRes.result.serverInfo.name, 'jurismesh-compliance-server');

  // Response 2: Tools List
  const listRes = JSON.parse(lines[1]);
  assert.strictEqual(listRes.id, 2);
  assert.ok(listRes.result.tools.some(t => t.name === 'analyze_compliance'), 'Must expose analyze_compliance');
  assert.ok(listRes.result.tools.some(t => t.name === 'get_statutory_rule'), 'Must expose get_statutory_rule');
  assert.ok(listRes.result.tools.some(t => t.name === 'list_supported_regulations'), 'Must expose list_supported_regulations');

  // Response 3: analyze_compliance call
  const callRes = JSON.parse(lines[2]);
  assert.strictEqual(callRes.id, 3);
  assert.ok(callRes.result.content[0].text.includes('# JurisMesh Developer Compliance Checklist'));
  assert.strictEqual(callRes.result.structuredReport.jurisdictions.EU.has_binding_rules, true);
  assert.ok(callRes.result.structuredReport.disclaimer.includes('Illustrative output for development support only'));

  // Response 4: get_statutory_rule call
  const ruleRes = JSON.parse(lines[3]);
  assert.strictEqual(ruleRes.id, 4);
  assert.strictEqual(ruleRes.result.rule.id, 'eu_ai_act_employment_high_risk');
  assert.ok(ruleRes.result.content[0].text.includes('Regulation 2024/1689'));

  // Response 5: list_supported_regulations call
  const listRegsRes = JSON.parse(lines[4]);
  assert.strictEqual(listRegsRes.id, 5);
  assert.ok(listRegsRes.result.total_rules >= 12, 'Must list at least 12 curated rules');
  assert.ok(listRegsRes.result.rules.length >= 12);

  console.log('✓ All 5 MCP Server tools and responses verified successfully!');
  console.log('Tool 1 (analyze_compliance) content length:', callRes.result.content[0].text.length);
  console.log('Tool 2 (get_statutory_rule) retrieved rule:', ruleRes.result.rule.instrument);
  console.log('Tool 3 (list_supported_regulations) total rules:', listRegsRes.result.total_rules);
  console.log('✓ All Slice 5 verification tests PASSED successfully!');
});
