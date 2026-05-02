const mode = process.env.MODE || "scheduled";
const requiredSecrets = [
  "BREVO_API_KEY",
  "BREVO_LIST_ID",
  "SUPABASE_SERVICE_ROLE_KEY",
  "GMAIL_CLIENT_ID",
  "GMAIL_CLIENT_SECRET",
  "GMAIL_REFRESH_TOKEN",
];
const missingSecrets = requiredSecrets.filter((name) => !process.env[name]);

console.log(`Newsletter automation mode: ${mode}`);

if (missingSecrets.length) {
  console.log("Newsletter automation is not fully configured yet.");
  console.log(`Missing secrets: ${missingSecrets.join(", ")}`);
  console.log("No emails were read, no newsletter was sent, and no website changes were made.");
  process.exit(0);
}

console.log("Newsletter automation secrets are present.");
console.log("Next implementation step: connect Gmail collection, approval checks, Insights publishing, and Brevo sending.");
