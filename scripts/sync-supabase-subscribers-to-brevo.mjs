const brevoApiKey = process.env.BREVO_API_KEY;
const brevoListId = Number(process.env.BREVO_LIST_ID || process.env.BREVO_LIST_IDS);
const supabaseUrl = process.env.SUPABASE_URL || "https://evhvmngwtruzdsfgcmii.supabase.co";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!brevoApiKey) {
  console.error("Missing BREVO_API_KEY. Use a normal Brevo REST API key, not the Brevo MCP token.");
  process.exit(1);
}

if (!Number.isInteger(brevoListId) || brevoListId <= 0) {
  console.error("Missing BREVO_LIST_ID. Create a Brevo list and save its numeric ID.");
  process.exit(1);
}

if (!supabaseServiceRoleKey) {
  console.error("Missing SUPABASE_SERVICE_ROLE_KEY. This server-side sync needs private read access to subscribers.");
  process.exit(1);
}

const requestJson = async (url, options = {}) => {
  const response = await fetch(url, options);
  const text = await response.text();
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}\n${text}`);
  return text ? JSON.parse(text) : null;
};

const subscribers = await requestJson(
  `${supabaseUrl}/rest/v1/newsletter_subscribers?select=email&status=in.(pending,active)&order=created_at.asc`,
  {
    headers: {
      apikey: supabaseServiceRoleKey,
      authorization: `Bearer ${supabaseServiceRoleKey}`,
    },
  },
);

const emails = [...new Set(subscribers.map((subscriber) => subscriber.email).filter(Boolean))];

if (!emails.length) {
  console.log("No Supabase newsletter subscribers to sync.");
  process.exit(0);
}

let synced = 0;

for (const email of emails) {
  await requestJson("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": brevoApiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      listIds: [brevoListId],
      updateEnabled: true,
      emailBlacklisted: false,
    }),
  });
  synced += 1;
}

console.log(`Synced ${synced} Supabase subscribers to Brevo list ${brevoListId}.`);
