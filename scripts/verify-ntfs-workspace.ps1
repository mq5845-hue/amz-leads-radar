[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [string]$WorkspaceRoot,

  [switch]$SkipInstall,

  [switch]$SkipAudit
)

$ErrorActionPreference = 'Stop'

function Invoke-Native([string]$Name, [string[]]$Arguments) {
  & $Name @Arguments
  if ($LASTEXITCODE -ne 0) {
    throw "$Name failed with exit code $LASTEXITCODE."
  }
}

$workspace = (Resolve-Path -LiteralPath $WorkspaceRoot).Path
$dashboard = Join-Path $workspace 'web-dashboard'
$packageLock = Join-Path $dashboard 'package-lock.json'

if (-not (Test-Path -LiteralPath $packageLock)) {
  throw "Dashboard package-lock.json is missing: $packageLock"
}

$workspaceRootName = [System.IO.Path]::GetPathRoot($workspace)
if ($workspaceRootName.StartsWith('\\')) {
  throw "Refusing to verify a UNC/synchronized path. Use a local NTFS drive: $workspace"
}

$driveLetter = $workspaceRootName.TrimEnd(':', '\')
try {
  $volume = Get-Volume -DriveLetter $driveLetter -ErrorAction Stop
  if ($volume.FileSystem -ne 'NTFS') {
    throw "Workspace drive $workspaceRootName uses $($volume.FileSystem), not NTFS."
  }
} catch [System.Management.Automation.CommandNotFoundException] {
  Write-Warning 'Get-Volume is unavailable; local-drive validation was skipped.'
}

Push-Location $dashboard
try {
  if (-not $SkipInstall) {
    Write-Host '=== npm ci (locked dependencies) ==='
    Invoke-Native 'npm.cmd' @('ci', '--no-audit', '--no-fund')
  }

  if (-not (Test-Path -LiteralPath (Join-Path $dashboard 'node_modules\.bin\vite.cmd'))) {
    throw 'Vite is unavailable. Run without -SkipInstall or install dependencies manually.'
  }

  Write-Host '=== complete contract smoke suite ==='
  Invoke-Native 'node.exe' @(
    '--test',
    '../api/server-contract.test.mjs',
    '../extension/content/amazon-copilot-contract.test.mjs',
    '../extension/content/reddit-copilot-security.test.mjs',
    '../extension/manifest-contract.test.mjs',
    '../scripts/ci-workflow-contract.test.mjs',
    '../scripts/live-preflight.test.mjs',
    '../supabase/ingest-contract.test.mjs',
    '../supabase/sql-contract.test.mjs',
    'tests/auth-contract.test.mjs',
    'tests/live-auth-smoke-contract.test.mjs',
    'tests/react-source-contract.test.mjs',
    'tests/review-draft-api.test.mjs',
    'tests/vite-proxy-contract.test.mjs'
  )

  Write-Host '=== production build ==='
  Invoke-Native 'npm.cmd' @('run', 'build')

  Write-Host '=== typecheck ==='
  Invoke-Native 'npx.cmd' @('tsc', '--noEmit')

  if (-not $SkipAudit) {
    Write-Host '=== audit ==='
    Invoke-Native 'npm.cmd' @('audit', '--audit-level=moderate')
  }
} finally {
  Pop-Location
}

Write-Host ''
if ($SkipInstall) {
  Write-Host 'NTFS verification PASS: local contracts, build, typecheck, and requested audit completed (install skipped).'
} else {
  Write-Host 'NTFS verification PASS: install, local contracts, build, typecheck, and requested audit completed.'
}
if ($SkipAudit) {
  Write-Host 'Audit was skipped by request.'
}
Write-Host 'This does not prove live Supabase, production deployment, Amazon Seller Central, or Chrome Web Store behavior.'
