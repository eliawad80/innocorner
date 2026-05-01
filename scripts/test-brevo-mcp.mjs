const token = process.env.BREVO_MCP_TOKEN || process.env.BREVO_MCP_API_KEY || process.env.BREVO_API_KEY;

if (!token) {
  console.error("Missing Brevo MCP token. Set BREVO_MCP_TOKEN, BREVO_MCP_API_KEY, or BREVO_API_KEY.");
  process.exit(1);
}

const response = await fetch("https://mcp.brevo.com/v1/brevo/mcp", {
  method: "POST",
  headers: {
    accept: "application/json, text/event-stream",
    authorization: `Bearer ${token}`,
    "content-type": "application/json",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: {
      protocolVersion: "2025-03-26",
      capabilities: {},
      clientInfo: {
        name: "innocorner-newsletter-test",
        version: "1.0.0",
      },
    },
  }),
});

const body = await response.text();

if (!response.ok) {
  console.error(`Brevo MCP test failed: ${response.status} ${response.statusText}`);
  console.error(body);
  process.exit(1);
}

if (!body.includes("serverInfo") && !body.includes("Brevo")) {
  console.error("Brevo MCP endpoint responded, but the response did not look like an MCP initialize response.");
  console.error(body);
  process.exit(1);
}

console.log("Brevo MCP token works.");
