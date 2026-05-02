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

const articleUrl = "https://innocorner.com/articles/quantum-risk-faster-batteries-ai-automation.html";
const listIds = (process.env.BREVO_LIST_IDS || "")
  .split(",")
  .map((value) => Number(value.trim()))
  .filter((value) => Number.isInteger(value) && value > 0);
const testEmails = (process.env.BREVO_TEST_EMAILS || "info@innocorner.com")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

const htmlContent = `<!doctype html>
<html>
  <body style="margin:0;background:#fbfcfe;color:#172033;font-family:Arial,sans-serif;line-height:1.6;">
    <main style="max-width:760px;margin:0 auto;padding:32px 20px;">
      <p style="color:#0e8f72;font-weight:700;text-transform:uppercase;font-size:12px;margin:0 0 12px;">InnoCorner Future Briefing</p>
      <h1 style="font-size:32px;line-height:1.14;margin:0 0 16px;">Quantum risk, faster batteries, and the next automation frontier</h1>
      <p style="font-size:17px;color:#415067;">Technology change is arriving from several directions at once. Quantum security is becoming a practical planning issue, fast-charging batteries are reshaping infrastructure assumptions, biotech is becoming more data-driven, and AI is moving beyond chat into physical workflows.</p>
      <p>For business leaders, the useful question is not whether every announcement becomes mainstream immediately. The useful question is where preparation has a long lead time. If a company waits until quantum-safe migration, electrified operations, private AI workflows, or robotics become urgent, it will be forced to act under pressure.</p>

      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:24px 0;">
        <div style="padding:16px;border:1px solid #d9e0e8;border-radius:8px;background:#f7fafc;"><strong>Security</strong><br /><span style="color:#5e6b7f;">Inventory cryptography before the migration becomes urgent.</span></div>
        <div style="padding:16px;border:1px solid #d9e0e8;border-radius:8px;background:#f7fafc;"><strong>Infrastructure</strong><br /><span style="color:#5e6b7f;">Model fleet, charging, and monitoring scenarios early.</span></div>
        <div style="padding:16px;border:1px solid #d9e0e8;border-radius:8px;background:#f7fafc;"><strong>Data governance</strong><br /><span style="color:#5e6b7f;">Treat health, biotech, and AI data as sensitive by design.</span></div>
        <div style="padding:16px;border:1px solid #d9e0e8;border-radius:8px;background:#f7fafc;"><strong>Automation</strong><br /><span style="color:#5e6b7f;">Move from experiments to controlled operational workflows.</span></div>
      </div>

      <h2 style="font-size:22px;line-height:1.2;margin-top:28px;">1. Quantum security is now a planning issue</h2>
      <p>Post-quantum security is no longer a distant research topic. NIST finalized its first post-quantum cryptography standards in 2024, and organizations are being encouraged to begin transition planning because cryptography is embedded deep inside certificates, VPNs, identity systems, payment flows, backups, vendor integrations, connected devices, and long-term archives.</p>
      <p>The risk is not only a future quantum computer breaking encryption on the day it becomes powerful enough. Some sensitive information can be copied today and decrypted later if it must remain confidential for many years. That changes the timeline for legal, financial, medical, defense, industrial, and strategic business data.</p>
      <p><strong>InnoCorner view:</strong> start with visibility. Identify where RSA and elliptic-curve cryptography exist, which vendors are involved, which data must remain confidential for five to twenty years, and which systems need crypto-agility before standards and vendor support fully mature.</p>

      <h2 style="font-size:22px;line-height:1.2;margin-top:28px;">2. Fast-charging batteries change operations, not only driving</h2>
      <p>CATL's third-generation Shenxing battery announcement points toward EV charging that feels much closer to fuel-like convenience. Real-world availability, charging infrastructure, pricing, battery life, and geographic rollout will still matter, but the strategic direction is clear: charging time is becoming a smaller barrier.</p>
      <p>For companies, this is an operational signal. Faster charging affects fleet schedules, depot design, energy procurement, monitoring, maintenance planning, and customer promises. It can make electric fleets more practical, but it also creates higher peak energy demand and more dependency on reliable charging infrastructure.</p>
      <p><strong>InnoCorner view:</strong> model charging scenarios before replacing assets. Connect energy and infrastructure monitoring to tools such as Zabbix, and automate recurring operational steps through n8n, Make, or custom workflows where the process becomes business-critical.</p>

      <h2 style="font-size:22px;line-height:1.2;margin-top:28px;">3. Health and biotech are becoming data systems</h2>
      <p>Precision health and biotech signals continue to move in the same direction: biology is increasingly treated as a measurable, programmable, data-rich system. Environmental exposure, metabolic health, diagnostics, mitochondria research, synthetic biology, and personalized care all depend on better data collection and more careful interpretation.</p>
      <p>The business implication reaches beyond healthcare. As more industries touch biometric, environmental, behavioral, or sensitive operational data, governance becomes part of the product. Consent, provenance, retention, auditability, explainability, and privacy-by-design cannot be added at the end.</p>

      <h2 style="font-size:22px;line-height:1.2;margin-top:28px;">4. AI is moving into physical workflows</h2>
      <p>The next automation frontier is not only chat, documents, and dashboards. AI is moving toward robotics, physical task learning, and more efficient computing architectures. That does not mean every company should buy robots tomorrow. It means companies should start identifying repetitive physical processes, inspection routines, facility tasks, logistics handoffs, and safety checks that could become candidates for AI-assisted automation.</p>
      <p>Physical AI needs observability, human override, safety controls, access management, and clear accountability. The companies that benefit first will usually be the ones that understand their processes well enough to automate one controlled workflow at a time.</p>

      <h2 style="font-size:22px;line-height:1.2;margin-top:28px;">What companies should do this quarter</h2>
      <ul style="padding-left:20px;">
        <li>Start a cryptography inventory and identify systems that handle long-life confidential data.</li>
        <li>Ask critical software and infrastructure vendors for their post-quantum security roadmap.</li>
        <li>Choose one AI automation workflow with measurable time savings and clear human approval points.</li>
        <li>Review monitoring coverage for energy, infrastructure, fleet, and operational alerts.</li>
        <li>Classify sensitive data before connecting it to AI, RAG, automation, or external tools.</li>
        <li>Create a 10-year readiness map for security, automation, data governance, and infrastructure change.</li>
      </ul>

      <p style="margin-top:28px;"><a href="${articleUrl}" style="display:inline-block;padding:13px 18px;border-radius:8px;background:#f46f22;color:#ffffff;font-weight:700;text-decoration:none;">Read the full article on InnoCorner</a></p>
      <hr style="border:0;border-top:1px solid #d9e0e8;margin:28px 0;" />
      <p style="color:#5e6b7f;font-size:13px;">InnoCorner Future Briefing helps business leaders prepare for AI, security, automation, and long-term technology change. You can reply to this email at info@innocorner.com.</p>
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
    name: "InnoCorner Future Briefing - 2026-05-01",
    sender: {
      name: "InnoCorner",
      email: "newsletter@innocorner.com",
    },
    subject: "InnoCorner Future Briefing: Quantum risk, faster batteries, and AI automation",
    htmlContent,
    ...(listIds.length ? { recipients: { listIds } } : {}),
    tag: "innocorner-future-briefing",
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

if (listIds.length) {
  await callTool(
    "send_email_campaign_now",
    {
      campaignId,
    },
    created.session,
    3,
  );

  console.log(`Sent Brevo campaign ${campaignId} to list IDs: ${listIds.join(", ")}.`);
} else {
  await callTool(
    "send_test_email",
    {
      campaignId,
      emailTo: testEmails,
    },
    created.session,
    3,
  );

  console.log(`Sent Brevo test email to: ${testEmails.join(", ")}.`);
}
