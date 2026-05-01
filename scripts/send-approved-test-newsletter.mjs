const token = process.env.BREVO_MCP_TOKEN || process.env.BREVO_MCP_API_KEY || process.env.BREVO_API_KEY;
const endpoint = "https://mcp.brevo.com/v1/brevo_email_campaign_management/mcp";

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

const htmlContent = `<!doctype html>
<html>
  <body style="margin:0;background:#fbfcfe;color:#172033;font-family:Arial,sans-serif;line-height:1.6;">
    <main style="max-width:720px;margin:0 auto;padding:32px 20px;">
      <p style="color:#0e8f72;font-weight:700;text-transform:uppercase;font-size:12px;">InnoCorner Future Briefing</p>
      <h1 style="font-size:30px;line-height:1.12;margin:0 0 16px;">Quantum risk, faster batteries, and the next automation frontier</h1>
      <p>This briefing was prepared from three approved source emails and highlights a shared strategic signal: the future is arriving unevenly.</p>
      <h2>1. Quantum security is becoming a board-level readiness topic</h2>
      <p>Recent quantum research suggests the cost and scale needed to threaten RSA and elliptic-curve cryptography may be falling faster than many organizations expected. The practical takeaway is preparation: companies should start inventorying cryptographic dependencies, vendor exposure, certificates, VPNs, payment flows, identity systems, and sensitive data that must remain confidential for years.</p>
      <h2>2. EV charging is moving toward operational parity with fuel</h2>
      <p>Battery innovation is compressing the convenience gap between electric and combustion vehicles. Logistics, facility planning, fleet strategy, and energy monitoring will need automation and observability as charging becomes faster and more distributed.</p>
      <h2>3. Health and biotech are becoming more data-driven and programmable</h2>
      <p>Environmental inputs, precision health, mitochondria research, and synthetic biology all point to the same direction: biology is becoming a data and engineering domain. That raises the importance of privacy, consent, and governance.</p>
      <h2>4. AI is moving from chat into robots and energy-efficient computing</h2>
      <p>AI value is moving into physical-world workflows and cheaper inference. Companies should map which operational tasks could benefit from AI-assisted physical automation while tracking infrastructure cost and energy constraints.</p>
      <h2>Recommended action</h2>
      <ul>
        <li>Start a post-quantum cryptography inventory.</li>
        <li>Identify one workflow where AI automation could produce measurable savings.</li>
        <li>Review whether monitoring tools can handle more electrified and automated operations.</li>
        <li>Treat health, biotech, and AI data as sensitive by design.</li>
        <li>Build a 10-year technology readiness roadmap.</li>
      </ul>
      <p><a href="https://innocorner.com/insights.html" style="color:#0d9be6;font-weight:700;">Read the published archive edition</a></p>
      <hr style="border:0;border-top:1px solid #d9e0e8;margin:28px 0;" />
      <p style="color:#5e6b7f;font-size:13px;">Test email for InnoCorner newsletter workflow. Sender: newsletter@innocorner.com. Reply-to: info@innocorner.com.</p>
    </main>
  </body>
</html>`;

const initialized = await callMcp({
  jsonrpc: "2.0",
  id: 1,
  method: "initialize",
  params: {
    protocolVersion: "2025-03-26",
    capabilities: {},
    clientInfo: { name: "innocorner-newsletter-test-send", version: "1.0.0" },
  },
});

const created = await callTool(
  "create_email_campaign",
  {
    name: "InnoCorner Future Briefing Test - 2026-05-01",
    sender: {
      name: "InnoCorner",
      email: "newsletter@innocorner.com",
    },
    subject: "InnoCorner Future Briefing: Quantum risk, faster batteries, and AI automation",
    htmlContent,
    tag: "innocorner-test-newsletter",
  },
  initialized.session,
  2,
);

const createdText = JSON.stringify(created.parsed);
const campaignIdMatch = createdText.match(/"id"\s*:\s*(\d+)/) || createdText.match(/\b(\d{3,})\b/);
const campaignId = campaignIdMatch ? Number(campaignIdMatch[1]) : null;

if (!campaignId) {
  console.error("Created campaign, but could not determine campaign ID.");
  console.error(createdText);
  process.exit(1);
}

console.log(`Created Brevo campaign ${campaignId}.`);

await callTool(
  "send_test_email",
  {
    campaignId,
    emailTo: ["info@innocorner.com"],
  },
  created.session,
  3,
);

console.log("Sent Brevo test email to info@innocorner.com.");
