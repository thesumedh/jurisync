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
  // 3. Tools Call (using analyze_compliance)
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
  assert.strictEqual(lines.length, 3, 'Must receive exactly 3 JSON-RPC responses');

  const initRes = JSON.parse(lines[0]);
  assert.strictEqual(initRes.id, 1);
  assert.strictEqual(initRes.result.serverInfo.name, 'jurismesh-compliance-server');

  const listRes = JSON.parse(lines[1]);
  assert.strictEqual(listRes.id, 2);
  assert.ok(listRes.result.tools.some(t => t.name === 'analyze_compliance'));

  const callRes = JSON.parse(lines[2]);
  assert.strictEqual(callRes.id, 3);
  assert.ok(callRes.result.content[0].text.includes('# JurisMesh Developer Compliance Checklist'));
  assert.strictEqual(callRes.result.structuredReport.jurisdictions.EU.has_binding_rules, true);
  assert.ok(callRes.result.structuredReport.disclaimer.includes('Illustrative output for development support only'));

  console.log('MCP Server Response verified successfully:');
  console.log('Tool Result Content length:', callRes.result.content[0].text.length, 'chars');
  console.log('EU Binding Rules count:', callRes.result.structuredReport.jurisdictions.EU.rules.length);
  console.log('India Binding Rules count:', callRes.result.structuredReport.jurisdictions.India.rules.length);
  console.log('US Rules count:', callRes.result.structuredReport.jurisdictions.UnitedStates.rules.length);
  console.log('✓ All Slice 5 verification tests PASSED successfully!');
});
