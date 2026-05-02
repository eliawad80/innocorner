const brevoApiKey = process.env.BREVO_API_KEY;
const brevoBaseUrl = "https://api.brevo.com/v3";

if (!brevoApiKey) {
  console.error("Missing BREVO_API_KEY. Use a normal Brevo REST API key, not the Brevo MCP token.");
  process.exit(1);
}

const listIds = (process.env.BREVO_LIST_IDS || process.env.BREVO_LIST_ID || "")
  .split(",")
  .map((value) => Number(value.trim()))
  .filter((value) => Number.isInteger(value) && value > 0);
const testEmails = (process.env.BREVO_TEST_EMAILS || "info@innocorner.com")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

const articleUrl = "https://innocorner.com/articles/quantum-risk-faster-batteries-ai-automation.html";

const htmlContent = `<!doctype html>
<html>
  <body style="margin:0;background:#fbfcfe;color:#172033;font-family:Arial,sans-serif;line-height:1.6;">
    <main style="max-width:760px;margin:0 auto;padding:32px 20px;">
      <p style="color:#0e8f72;font-weight:700;text-transform:uppercase;font-size:12px;margin:0 0 12px;">InnoCorner Future Briefing</p>
      <h1 style="font-size:32px;line-height:1.14;margin:0 0 16px;">Quantum risk, faster batteries, and the next automation frontier</h1>
      <p style="font-size:17px;color:#415067;">Technology change is arriving from several directions at once. Quantum security is becoming a practical planning issue, fast-charging batteries are reshaping infrastructure assumptions, biotech is becoming more data-driven, and AI is moving beyond chat into physical workflows.</p>
      <p>For business leaders, the useful question is not whether every announcement becomes mainstream immediately. The useful question is where preparation has a long lead time. Security migrations, infrastructure planning, data governance, and operational automation all take time because they touch systems, vendors, policies, training, and budget cycles. Waiting until the pressure is obvious usually makes the response more expensive and less controlled.</p>
      <h2 style="font-size:22px;line-height:1.2;margin-top:28px;">1. Quantum security is now a planning issue</h2>
      <p>Post-quantum security is no longer a distant research topic. The issue is practical because cryptography is buried throughout business infrastructure: certificates, VPNs, TLS, identity providers, endpoint tools, databases, payment flows, file stores, backups, vendor integrations, connected devices, and long-term archives. Even when a company is not running advanced cryptography directly, it depends on products and suppliers that do.</p>
      <p>The risk is not only a future quantum computer decrypting traffic on the day it becomes powerful enough. Some information can be copied today and decrypted later if it must stay confidential for many years. That matters for legal files, healthcare data, financial records, industrial designs, customer identity data, intellectual property, and strategic documents with a long confidentiality life.</p>
      <p><strong>InnoCorner view:</strong> start with visibility. Identify where RSA and elliptic-curve cryptography exist, which vendors are involved, which systems hold long-life sensitive information, and which platforms support crypto-agility. The goal is not panic; it is a controlled migration path. Official background: <a href="https://www.nist.gov/cybersecurity-and-privacy/what-post-quantum-cryptography" style="color:#0d9be6;font-weight:700;">NIST on post-quantum cryptography</a>.</p>
      <h2 style="font-size:22px;line-height:1.2;margin-top:28px;">2. Fast-charging batteries change operations</h2>
      <p>Fast-charging battery progress points toward EV charging that feels closer to fuel-like convenience. The details of rollout, price, charging infrastructure, battery lifetime, and real-world availability still matter, but the direction is important: charging time is becoming a smaller operational barrier.</p>
      <p>For companies, that affects more than vehicle choice. Faster charging can change fleet scheduling, depot layout, driver planning, customer service promises, charging queue assumptions, energy procurement, peak-demand exposure, maintenance routines, and monitoring requirements. The faster the charging cycle becomes, the more important orchestration and observability become.</p>
      <p><strong>InnoCorner view:</strong> model charging scenarios before replacing assets. Ask what happens if part of the fleet can charge in minutes rather than hours. Where do bottlenecks move: grid capacity, charger availability, staff planning, maintenance, or software coordination? Connect energy and infrastructure monitoring to tools such as <a href="https://www.zabbix.com/" style="color:#0d9be6;font-weight:700;">Zabbix</a>, and automate recurring operational steps through <a href="https://n8n.io/" style="color:#0d9be6;font-weight:700;">n8n</a>, <a href="https://www.make.com/" style="color:#0d9be6;font-weight:700;">Make</a>, or custom workflows where the process becomes business-critical.</p>
      <h2 style="font-size:22px;line-height:1.2;margin-top:28px;">3. Health and biotech are becoming data systems</h2>
      <p>Precision health and biotech signals continue to move in the same direction: biology is increasingly treated as a measurable, programmable, data-rich system. Environmental exposure, metabolic health, diagnostics, mitochondria research, synthetic biology, and personalized care all depend on better data collection and more careful interpretation.</p>
      <p>The business implication reaches beyond healthcare. As more industries touch biometric, environmental, behavioral, or sensitive operational data, governance becomes part of the product. Consent, provenance, retention, auditability, explainability, and privacy-by-design need to be built in from the beginning, especially when AI is used to classify, recommend, summarize, or route sensitive information.</p>
      <h2 style="font-size:22px;line-height:1.2;margin-top:28px;">4. AI is moving into physical workflows</h2>
      <p>The next automation frontier is not only chat, documents, and dashboards. AI is moving toward robotics, physical task learning, and more efficient computing architectures. That does not mean every company should buy robots tomorrow. It means companies should start identifying repetitive physical processes, inspection routines, facility tasks, logistics handoffs, quality checks, and safety routines that could become candidates for AI-assisted automation.</p>
      <p>Physical AI raises a different risk profile from office automation. It needs observability, human override, safety controls, access management, documented escalation, and clear accountability. The companies that benefit first will usually be the ones that already understand their processes well enough to automate one controlled workflow at a time.</p>
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

const brevoRequest = async (path, options = {}) => {
  const response = await fetch(`${brevoBaseUrl}${path}`, {
    ...options,
    headers: {
      accept: "application/json",
      "api-key": brevoApiKey,
      "content-type": "application/json",
      ...options.headers,
    },
  });
  const text = await response.text();
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}\n${text}`);
  return text ? JSON.parse(text) : null;
};

const campaign = await brevoRequest("/emailCampaigns", {
  method: "POST",
  body: JSON.stringify({
    name: "InnoCorner Future Briefing - 2026-05-01",
    sender: {
      name: "InnoCorner",
      email: "newsletter@innocorner.com",
    },
    replyTo: "info@innocorner.com",
    subject: "InnoCorner Future Briefing: Quantum risk, faster batteries, and AI automation",
    htmlContent,
    ...(listIds.length ? { recipients: { listIds } } : {}),
  }),
});

if (!campaign?.id) {
  console.error("Created campaign, but could not determine campaign ID.");
  console.error(JSON.stringify(campaign));
  process.exit(1);
}

console.log(`Created Brevo campaign ${campaign.id}.`);

if (listIds.length) {
  await brevoRequest(`/emailCampaigns/${campaign.id}/sendNow`, { method: "POST", body: "" });
  console.log(`Sent Brevo campaign ${campaign.id} to list IDs: ${listIds.join(", ")}.`);
} else {
  await brevoRequest(`/emailCampaigns/${campaign.id}/sendTest`, {
    method: "POST",
    body: JSON.stringify({ emailTo: testEmails }),
  });
  console.log(`Sent Brevo test email to: ${testEmails.join(", ")}.`);
}
