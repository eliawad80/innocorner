const apiKey = process.env.BREVO_API_KEY;

if (!apiKey) {
  console.error("Missing BREVO_API_KEY. Store it as an environment variable or GitHub secret before testing.");
  process.exit(1);
}

const response = await fetch("https://api.brevo.com/v3/account", {
  headers: {
    accept: "application/json",
    "api-key": apiKey,
  },
});

const text = await response.text();

if (!response.ok) {
  console.error(`Brevo API test failed: ${response.status} ${response.statusText}`);
  console.error(text);
  process.exit(1);
}

const account = JSON.parse(text);
console.log(`Brevo API key works for account: ${account.email || account.companyName || "authenticated account"}`);
