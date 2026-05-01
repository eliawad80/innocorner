const token = process.env.BREVO_MCP_TOKEN || process.env.BREVO_MCP_API_KEY || process.env.BREVO_API_KEY;
const endpoint = process.env.BREVO_MCP_ENDPOINT || "https://mcp.brevo.com/v1/brevo_email_campaign_management/mcp";
const names = (process.env.BREVO_TOOL_NAMES || "").split(",").map((name) => name.trim()).filter(Boolean);

if (!token) {
  console.error("Missing Brevo MCP token. Set BREVO_MCP_TOKEN, BREVO_MCP_API_KEY, or BREVO_API_KEY.");
  process.exit(1);
}

const callMcp = async (payload, sessionId) => {
  const headers = {
    accept: "application/json, text/event-stream",
    authorization: `Bearer ${token}`,
    "content-type": "application/json",
  };

  if (sessionId) headers["mcp-session-id"] = sessionId;

  const response = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  const text = await response.text();
  const session = response.headers.get("mcp-session-id") || sessionId;
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}\n${text}`);
  return { session, text };
};

const parseMcpText = (text) => {
  const dataLine = text.split(/\r?\n/).find((line) => line.startsWith("data:"));
  return JSON.parse(dataLine ? dataLine.replace(/^data:\s*/, "") : text);
};

const initialized = await callMcp({
  jsonrpc: "2.0",
  id: 1,
  method: "initialize",
  params: {
    protocolVersion: "2025-03-26",
    capabilities: {},
    clientInfo: { name: "innocorner-newsletter-tool-describe", version: "1.0.0" },
  },
});

const listed = await callMcp({ jsonrpc: "2.0", id: 2, method: "tools/list", params: {} }, initialized.session);
const tools = parseMcpText(listed.text).result?.tools || [];
const selected = names.length ? tools.filter((tool) => names.includes(tool.name)) : tools;

for (const tool of selected) {
  console.log(JSON.stringify({ name: tool.name, description: tool.description, inputSchema: tool.inputSchema }, null, 2));
}
