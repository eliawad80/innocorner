const brevoApiKey = process.env.BREVO_API_KEY;
const brevoListId = Number(process.env.BREVO_LIST_ID || process.env.BREVO_LIST_IDS);
const emails = (process.env.BREVO_TEST_EMAILS || "elias.awad80@gmail.com")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

if (!brevoApiKey) {
  console.error("Missing BREVO_API_KEY.");
  process.exit(1);
}

if (!Number.isInteger(brevoListId) || brevoListId <= 0) {
  console.error("Missing BREVO_LIST_ID. Save the Brevo newsletter list ID as a GitHub secret first.");
  process.exit(1);
}

const brevoRequest = async (path, body) => {
  const response = await fetch(`https://api.brevo.com/v3${path}`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": brevoApiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const text = await response.text();
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}\n${text}`);
  return text ? JSON.parse(text) : null;
};

for (const email of emails) {
  await brevoRequest("/contacts", {
    email,
    listIds: [brevoListId],
    updateEnabled: true,
    emailBlacklisted: false,
  });
  console.log(`Brevo contact ready: ${email}`);
}
