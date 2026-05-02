$ErrorActionPreference = "Stop"

function Read-SecretText($Prompt) {
  $secure = Read-Host $Prompt -AsSecureString
  $ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
  try {
    return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr)
  } finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr)
  }
}

$brevoApiKey = Read-SecretText "Paste BREVO_API_KEY"
if (-not $brevoApiKey) {
  throw "BREVO_API_KEY is required."
}
$brevoApiKey | gh secret set BREVO_API_KEY

$brevoListId = Read-SecretText "Paste BREVO_LIST_ID"
if (-not $brevoListId) {
  throw "BREVO_LIST_ID is required."
}
$brevoListId | gh secret set BREVO_LIST_ID

$supabaseServiceRoleKey = Read-SecretText "Paste SUPABASE_SERVICE_ROLE_KEY"
if (-not $supabaseServiceRoleKey) {
  throw "SUPABASE_SERVICE_ROLE_KEY is required."
}
$supabaseServiceRoleKey | gh secret set SUPABASE_SERVICE_ROLE_KEY

Write-Host "Newsletter secrets saved to GitHub Actions for Brevo REST API sending."
