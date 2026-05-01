const token = process.env.BREVO_MCP_TOKEN || process.env.BREVO_MCP_API_KEY || process.env.BREVO_API_KEY;

if (!token) {
  console.error("Missing Brevo MCP token. Set BREVO_MCP_TOKEN, BREVO_MCP_API_KEY, or BREVO_API_KEY.");
  process.exit(1);
}

const endpoint = "https://mcp.brevo.com/v1/brevo/mcp";

const callMcp = async (payload, sessionId) => {
  const headers = {
    accept: "application/json, text/event-stream",
    authorization: `Bearer ${token}`,
    "content-type": "application/json",
  };

  if (sessionId) {
    headers["mcp-session-id"] = sessionId;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  const text = await response.text();
  const session = response.headers.get("mcp-session-id") || sessionId;

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}\n${text}`);
  }

  return { session, text };
};

const parseMcpText = (text) => {
  const dataLine = text
    .split(/\r?\n/)
    .find((line) => line.startsWith("data:"));
  const jsonText = dataLine ? dataLine.replace(/^data:\s*/, "") : text;
  return JSON.parse(jsonText);
};

const initialized = await callMcp({
  jsonrpc: "2.0",
  id: 1,
  method: "initialize",
  params: {
    protocolVersion: "2025-03-26",
    capabilities: {},
    clientInfo: {
      name: "innocorner-newsletter-tool-list",
      version: "1.0.0",
    },
  },
});

const listed = await callMcp(
  {
    jsonrpc: "2.0",
    id: 2,
    method: "tools/list",
    params: {},
  },
  initialized.session,
);

const result = parseMcpText(listed.text).result;
const tools = result?.tools || [];

console.log(`Brevo MCP tools found: ${tools.length}`);
for (const tool of tools) {
  console.log(tool.name);
}
