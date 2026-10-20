# Model Context Protocol (MCP) Integration Guide
**Connecting the Regulatory Compliance Server to AI Coding Assistants**

The platform exposes its cross-jurisdictional compliance engine as a standard **Model Context Protocol (MCP)** server over stdio. This enables AI assistants (such as Claude Desktop, Cursor AI, Antigravity, and Windsurf) to proactively analyze feature designs, review pull requests, and enforce regulatory guardrails during coding sessions.

---

## 1. Quick Verification (Terminal Test)

Verify that the local MCP server initializes and responds to JSON-RPC 2.0 requests:

```bash
# In the repository root
node mcp-server.js
```

You can send a test initialization handshake via standard input:
```json
{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test-client","version":"1.0.0"}}}
```

The server will respond with its protocol capabilities and tool catalog.

---

## 2. Integration with Claude Desktop

1. Open your Claude Desktop configuration file:
   - **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
   - **Linux:** `~/.config/Claude/claude_desktop_config.json`

2. Add the compliance server to `mcpServers`:

```json
{
  "mcpServers": {
    "juris-compliance": {
      "command": "node",
      "args": [
        "F:/Projects/Devpost/MCP/mcp-server.js"
      ]
    }
  }
}
```
*(Replace `F:/Projects/Devpost/MCP/mcp-server.js` with your absolute repository path).*

3. Restart Claude Desktop. The hammer icon (🛠️) will appear with the `analyze_compliance`, `get_statutory_rule`, and `list_supported_regulations` tools available.

---

## 3. Integration with Cursor AI

1. Open Cursor Settings (`Ctrl+Shift+J` or `Cmd+Shift+J`).
2. Navigate to **Features > MCP Servers**.
3. Click **Add New MCP Server**:
   - **Name:** `juris-compliance`
   - **Type:** `command`
   - **Command:** `node F:/Projects/Devpost/MCP/mcp-server.js`
4. Alternatively, add to your project's `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "juris-compliance": {
      "command": "node",
      "args": ["./mcp-server.js"]
    }
  }
}
```

---

## 4. Integration with Google Antigravity IDE

Add the server to your Antigravity MCP configuration (`mcp_config.json` or `.gemini/antigravity-ide/mcp/`):

```json
{
  "mcpServers": {
    "juris-compliance": {
      "command": "node",
      "args": ["${workspaceFolder}/mcp-server.js"]
    }
  }
}
```

---

## 5. Tool Specifications & Usage Examples

### Tool 1: `analyze_compliance`
Evaluates natural language feature specifications against the curated international rule library.

**Parameters:**
- `feature_description` (string, required): Description of the software architecture, user data flow, or AI component.
- `jurisdictions` (array of strings, optional): Filter by jurisdictions (e.g. `["EU", "IN", "US"]`). Defaults to all.

**Example Agent Invocation:**
```json
{
  "name": "analyze_compliance",
  "arguments": {
    "feature_description": "We are building an AI microservice that takes job applicants' resumes, computes fit scores, and automatically sends rejection emails for low-scoring applicants in Germany and India."
  }
}
```

**Returned Output Structure:**
- `text`: Human-readable markdown report and prioritized developer checklist.
- `structuredReport`:
  - `signals`: Extracted risk indicators (`usesAi`, `employmentDomain`, `personalData`, `autonomousAction`).
  - `tension`: Cross-border friction analysis (e.g., US NYC LL144 bias audit retention vs India DPDP Section 8(7) erasure).
  - `jurisdictions`: Sourced statutory findings labeled by binding vs voluntary status with citations.
  - `disclaimer`: Mandatory legal notice.

---

### Tool 2: `get_statutory_rule`
Retrieves the full statutory text, classification, and recommended engineering action for a specific rule ID.

**Parameters:**
- `rule_id` (string, required): Identifier (e.g. `eu_ai_act_employment_high_risk`, `in_dpdp_retention_erasure_mandate`, `us_nyc_local_law_144_aedt`).

---

### Tool 3: `list_supported_regulations`
Lists all statutory instruments, jurisdictions, and effective dates currently tracked in the curated rule library.

---

## 6. Real-World Agent Prompt Examples

Try prompting your AI coding assistant with:

1. *"I'm designing a new facial recognition feature for our mobile app. Use the compliance tool to check what legal requirements apply if we launch in the US and the EU."*
2. *"We're implementing an AI customer support bot that uses previous chat logs to improve answers. What data privacy and AI transparency rules apply in India and Europe?"*
3. *"Review our HR recruitment service PRD for potential regulatory tensions between US bias audit laws and India's DPDP Act."*
