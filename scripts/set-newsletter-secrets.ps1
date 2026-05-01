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

$brevoMcpApiKey = Read-SecretText "Paste BREVO_MCP_API_KEY, or press Enter to skip"
if ($brevoMcpApiKey) {
  $brevoMcpApiKey | gh secret set BREVO_MCP_API_KEY
}

Write-Host "Newsletter secrets saved to GitHub Actions."
