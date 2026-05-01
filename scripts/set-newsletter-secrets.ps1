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

$brevoMcpApiKey = Read-SecretText "Paste BREVO_MCP_API_KEY"
if (-not $brevoMcpApiKey) {
  throw "BREVO_MCP_API_KEY is required."
}

$brevoMcpApiKey | gh secret set BREVO_MCP_API_KEY

$brevoApiKey = Read-SecretText "Paste BREVO_API_KEY, or press Enter to skip"
if ($brevoApiKey) {
  $brevoApiKey | gh secret set BREVO_API_KEY
}

Write-Host "Newsletter secrets saved to GitHub Actions. MCP token is the primary Brevo credential."
