const token = process.env.BREVO_MCP_TOKEN || process.env.BREVO_MCP_API_KEY || process.env.BREVO_API_KEY;
const endpoint = "https://mcp.brevo.com/v1/brevo_contacts/mcp";

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

const callTool = async (name, args, sessionId, id) => {
  const result = await callMcp(
    {
      jsonrpc: "2.0",
      id,
      method: "tools/call",
      params: {
        name,
        arguments: args,
      },
    },
    sessionId,
  );
  return { session: result.session, parsed: parseMcpText(result.text) };
};

const collectListIds = (value, set = new Set()) => {
  if (!value || typeof value !== "object") return set;

  if (Array.isArray(value)) {
    value.forEach((item) => collectListIds(item, set));
    return set;
  }

  for (const [key, nested] of Object.entries(value)) {
    if (/^listIds?$/i.test(key) && Array.isArray(nested)) {
      nested.forEach((id) => {
        const numeric = Number(id);
        if (Number.isInteger(numeric) && numeric > 0) set.add(numeric);
      });
    } else {
      collectListIds(nested, set);
    }
  }

  return set;
};

const initialized = await callMcp({
  jsonrpc: "2.0",
  id: 1,
  method: "initialize",
  params: {
    protocolVersion: "2025-03-26",
    capabilities: {},
    clientInfo: { name: "innocorner-newsletter-list-finder", version: "1.0.0" },
  },
});

const contacts = await callTool(
  "get_contacts",
  {
    limit: 50,
    offset: 0,
    sort: "desc",
  },
  initialized.session,
  2,
);

const listIds = Array.from(collectListIds(contacts.parsed)).sort((a, b) => a - b);
const serialized = JSON.stringify(contacts.parsed);
const contactCount =
  Number(serialized.match(/"count"\s*:\s*(\d+)/)?.[1]) ||
  Number(serialized.match(/"total"\s*:\s*(\d+)/)?.[1]) ||
  "unknown";

console.log(`Brevo contacts visible: ${contactCount}`);
console.log(`Brevo list IDs found on contacts: ${listIds.length ? listIds.join(", ") : "none"}`);
