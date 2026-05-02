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

const editionDate = "2026-05-02";
const articleUrl = "https://innocorner.com/articles/programmable-biology-transferable-robotics-readiness-gap.html";

const htmlContent = `<!doctype html>
<html>
  <body style="margin:0;background:#fbfcfe;color:#172033;font-family:Arial,sans-serif;line-height:1.6;">
    <main style="max-width:760px;margin:0 auto;padding:32px 20px;">
      <p style="color:#0e8f72;font-weight:700;text-transform:uppercase;font-size:12px;margin:0 0 12px;">InnoCorner Future Briefing</p>
      <h1 style="font-size:32px;line-height:1.14;margin:0 0 16px;">Programmable biology, transferable robotics, and the next readiness gap</h1>
      <p style="font-size:17px;color:#415067;">The next wave of innovation is not just about smarter software. It is about systems that can read hidden patterns, adapt across different environments, and turn specialized knowledge into repeatable capability.</p>
      <p>Biology is becoming more programmable, robotics is becoming more transferable, and companies are being forced to think beyond short-term automation into long-term operating readiness. The practical question is no longer whether AI and advanced automation will matter. The harder question is whether organizations are building the governance, data foundations, cyber resilience, and workforce habits needed to use these technologies responsibly over the next 10 to 20 years.</p>

      <h2 style="font-size:22px;line-height:1.2;margin-top:28px;">1. Biology is moving from broad intervention to precision targeting</h2>
      <p>A CRISPR variant called ThermoCas9 shows how biotechnology is shifting toward more selective, context-aware intervention. Researchers engineered ThermoCas9 to distinguish malignant cells by methylation signatures, which are chemical patterns that can separate tumor DNA from normal cellular material.</p>
      <p>The important idea is not simply that CRISPR can cut DNA. It is that the system can use epigenetic fingerprints as a targeting layer. In the reported work, ThermoCas9 demonstrated selective DNA cleavage in cultured human cancer cells while avoiding healthy cells because methylation-sensitive recognition disrupted the PAM sequences needed for binding in normal tissue. If this direction matures clinically, it could reduce one of the biggest concerns in gene-editing medicine: collateral damage to healthy cells.</p>
      <p>Several related biotech developments point in the same direction. Daraxonrasib, a RAS-targeting drug, reported Phase III results in metastatic pancreatic ductal adenocarcinoma with median overall survival of 13.2 months versus 6.7 months for standard chemotherapy. AIRNA also dosed the first patient in the RepAIR1 Phase 1 clinical trial for AIR-001, an RNA-editing therapy for alpha-1 antitrypsin deficiency. The trial is expected to enroll approximately 54 patients with PiZZ genotype AATD across about 20 international sites.</p>
      <p>There were also signals around neurological and aging-related medicine. Solengepras, an investigational Parkinson's therapy, showed Phase 2 reductions in daily OFF time by targeting GPR6 receptors instead of relying on traditional dopamine pathways. Ghrelin receptor inhibition in aging mice improved endurance and mitochondrial function, while another primate study connected vitamin C with inhibition of ACSL4, an enzyme linked to ferro-aging.</p>
      <p><strong>InnoCorner view:</strong> medicine is becoming more like a control system: sense the right signal, target the right mechanism, adjust the intervention, and reduce unwanted side effects. For companies in healthcare, insurance, data platforms, cybersecurity, and compliance, more personalized medicine means more sensitive data, more complex consent requirements, and a greater need for secure data workflows.</p>

      <h2 style="font-size:22px;line-height:1.2;margin-top:28px;">2. Rare medical breakthroughs are becoming operational lessons</h2>
      <p>A 63-year-old patient known as the Oslo patient appears to have been cured of HIV after receiving a bone marrow transplant from his brother. The transplant was originally intended to treat a life-threatening blood disorder, but it also removed signs of HIV after 14 years of infection. This is not a general cure path for most HIV patients, because bone marrow transplantation is high-risk and usually reserved for severe cancer or blood disorders.</p>
      <p>Still, the case matters because it deepens the evidence that immune-system replacement, donor genetics, and viral reservoir control can change the boundaries of what is possible. In medicine, even rare cases can become maps: they reveal mechanisms that may later become safer, more scalable therapies.</p>
      <p>The same pattern appears in immune engineering. A reported one-shot intervention for severe autoimmune disease described a patient with a rare anemia whose B cells were attacking oxygen-carrying red blood cells, followed by two additional autoimmune disorders. The promise of this kind of work is not simply symptom control; it is immune reset.</p>
      <p><strong>InnoCorner view:</strong> future healthcare will depend on data continuity, long-term monitoring, and secure collaboration between labs, hospitals, insurers, and technology providers. Organizations that prepare early will need privacy-by-design architecture, strong identity controls, auditability, and AI systems that can explain their recommendations.</p>

      <h2 style="font-size:22px;line-height:1.2;margin-top:28px;">3. AI exposure is not translating into simple job destruction</h2>
      <p>A striking economic signal challenges the most simplistic AI narrative. Industries most exposed to AI are reportedly seeing not only productivity gains, but also job and wage growth. This does not mean AI has no labor risk. It means the early pattern is more complex: when AI increases the value of output, organizations may expand rather than simply cut.</p>
      <p>AI that is deployed only as a cost-cutting tool creates fear and resistance. AI that is deployed as a capability multiplier can increase throughput, improve decision quality, and shift employees toward higher-value work. For business leaders, this is a governance issue as much as a technology issue.</p>
      <p><strong>InnoCorner view:</strong> AI readiness should include internal knowledge architecture, secure automation workflows, employee training, monitoring, and clear rules for what AI can and cannot touch. For sensitive information, that may mean self-hosted systems, private RAG, controlled access, and tools such as self-hosted <a href="https://n8n.io/" style="color:#0d9be6;font-weight:700;">n8n</a> or monitored <a href="https://www.make.com/" style="color:#0d9be6;font-weight:700;">Make</a> workflows. For operational reliability, it also means observability through tools such as <a href="https://www.zabbix.com/" style="color:#0d9be6;font-weight:700;">Zabbix</a>.</p>

      <h2 style="font-size:22px;line-height:1.2;margin-top:28px;">4. Robots are learning to transfer skills across different bodies</h2>
      <p>A robotics development this week shows why physical automation may accelerate faster than many companies expect. Robots with different designs can now share skills more effectively, addressing one of the long-standing problems in robotics: a skill trained on one machine often does not transfer cleanly to another.</p>
      <p>Traditional robot teaching often relies on demonstration. A human physically guides the robot, teleoperates it, or provides examples so the machine can learn a task. The problem is that robots vary widely in body shape, joint configuration, sensors, grippers, and movement limits. A task learned by one robot may be useless to another if the physical embodiment is too different.</p>
      <p>The new work suggests a path toward more general skill transfer. If robots can translate a learned action from one body to another, automation becomes less dependent on custom programming for every device. That matters for warehouses, manufacturing, laboratories, healthcare support, and field operations where mixed fleets are likely to become normal.</p>
      <p><strong>InnoCorner view:</strong> companies should start treating robotics readiness like cloud readiness or cybersecurity readiness. The questions are practical: do we have standardized processes, instrumented environments, failure monitoring, safe human intervention, documented workflows, maintenance planning, security rules, and liability boundaries?</p>

      <h2 style="font-size:22px;line-height:1.2;margin-top:28px;">5. Brain interfaces and quantum risk are planning requirements</h2>
      <p>Scientists have demonstrated a method for growing flexible electronic structures inside the brains of living mice. The concept involved injected chemicals being transformed by biological processes into a soft electrode-like mesh that could interface with neurons. Light pulses aimed at the mesh were used to quiet hyperactive cells while the mice continued normal behavior.</p>
      <p>This is still experimental, but it shows how boundaries between biology, electronics, and computation are becoming more porous. Over time, such approaches could affect neuroscience research, neuroprosthetics, and treatment for neurological disorders. They also raise ethical, cybersecurity, and governance questions that cannot be postponed until products are already mainstream.</p>
      <p>At the same time, quantum computing is again pressing on cybersecurity planning. Even if practical attacks are not immediate, the harvest-now-decrypt-later problem is already relevant: sensitive data captured today could be decrypted in the future if it remains valuable long enough.</p>
      <p><strong>InnoCorner view:</strong> organizations should begin inventorying cryptographic dependencies, identifying long-lived sensitive data, and preparing migration paths toward <a href="https://www.nist.gov/cybersecurity-and-privacy/what-post-quantum-cryptography" style="color:#0d9be6;font-weight:700;">post-quantum cryptography</a>. For regulated industries, healthcare, finance, public sector suppliers, and companies holding intellectual property, waiting until quantum attacks are practical will be too late.</p>

      <h2 style="font-size:22px;line-height:1.2;margin-top:28px;">What companies should do now</h2>
      <ul style="padding-left:20px;">
        <li>Identify which processes are ready for automation and which need redesign first.</li>
        <li>Classify sensitive information before connecting it to AI, RAG, automation, or external tools.</li>
        <li>Decide what should be self-hosted, what can be cloud-based, and what requires strict segmentation.</li>
        <li>Monitor AI, automation, infrastructure, and energy failures in real time.</li>
        <li>Train employees so AI increases capability rather than confusion.</li>
        <li>Start a post-quantum security inventory for systems that protect long-life confidential data.</li>
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
    name: `InnoCorner Future Briefing - ${editionDate}`,
    sender: {
      name: "InnoCorner",
      email: "newsletter@innocorner.com",
    },
    replyTo: "info@innocorner.com",
    subject: "InnoCorner Future Briefing: Programmable biology and transferable robotics",
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
