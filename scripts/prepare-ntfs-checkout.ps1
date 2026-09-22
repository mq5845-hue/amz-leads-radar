[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [string]$SourceRoot,

  [string]$TargetRoot = (Join-Path $env:LOCALAPPDATA 'AMZ-Leads-Radar\checkout'),

  [string]$RemoteUrl = 'https://github.com/mq5845-hue/amz-leads-radar.git',

  [string]$RemoteBranch = 'main',

  [switch]$Install
)

$ErrorActionPreference = 'Stop'

function Get-FullPath([string]$Path) {
  return [System.IO.Path]::GetFullPath($Path)
}

function Invoke-Native([string]$Name, [string[]]$Arguments) {
  & $Name @Arguments
  if ($LASTEXITCODE -ne 0) {
    throw "$Name failed with exit code $LASTEXITCODE."
  }
}

$source = (Resolve-Path -LiteralPath $SourceRoot).Path
$target = Get-FullPath $TargetRoot

if ($source.TrimEnd('\') -ieq $target.TrimEnd('\')) {
  throw 'SourceRoot and TargetRoot must be different directories.'
}

if (-not (Test-Path -LiteralPath (Join-Path $source '.git'))) {
  throw "SourceRoot is not a Git checkout: $source"
}

if (Test-Path -LiteralPath $target) {
  throw "TargetRoot already exists. This script only creates a new checkout and will not overwrite it: $target"
}

$targetParent = Split-Path -Parent $target
New-Item -ItemType Directory -Path $targetParent -Force | Out-Null

Write-Host "Cloning $RemoteUrl ($RemoteBranch) to $target"
Invoke-Native 'git' @('clone', '--no-checkout', '--branch', $RemoteBranch, $RemoteUrl, $target)
Invoke-Native 'git' @('-C', $target, 'checkout', '--force', $RemoteBranch)

$corruptDependencyDirectories = Get-ChildItem -LiteralPath (Join-Path $source 'web-dashboard') -Directory -Filter 'node_modules.corrupt-*' -ErrorAction SilentlyContinue |
  Select-Object -ExpandProperty FullName

$excludeDirectories = @(
  (Join-Path $source '.git'),
  (Join-Path $source 'web-dashboard\node_modules'),
  (Join-Path $source 'web-dashboard\dist'),
  (Join-Path $source '.vercel')
)
$excludeDirectories += $corruptDependencyDirectories

$robocopyArguments = @(
  $source,
  $target,
  '/E',
  '/COPY:DAT',
  '/DCOPY:DAT',
  '/R:2',
  '/W:1',
  '/XJ',
  '/NP',
  '/NJH',
  '/NJS',
  '/XF',
  '.env',
  '.env.*',
  '*.pem',
  '*.key',
  '*.log',
  '.git'
)
$robocopyArguments += @('/XD')
$robocopyArguments += $excludeDirectories

Write-Host 'Overlaying source files without mirroring or deleting target files.'
& robocopy @robocopyArguments
$robocopyExitCode = $LASTEXITCODE
if ($robocopyExitCode -ge 8) {
  throw "robocopy failed with exit code $robocopyExitCode. The target was not deleted."
}

if ($Install) {
  $dashboard = Join-Path $target 'web-dashboard'
  if (-not (Test-Path -LiteralPath (Join-Path $dashboard 'package-lock.json'))) {
    throw "Dashboard lockfile is missing: $dashboard"
  }

  Push-Location $dashboard
  try {
    Write-Host 'Installing locked dashboard dependencies on NTFS.'
    Invoke-Native 'npm.cmd' @('ci', '--no-audit', '--no-fund')
  } finally {
    Pop-Location
  }
}

Write-Host ''
Write-Host 'NTFS checkout prepared:'
Write-Host "  $target"
Write-Host 'Review any source changes with:'
Write-Host "  git -C `"$target`" status --short --branch"
if (-not $Install) {
  Write-Host 'Install and verify with:'
  Write-Host "  .\scripts\verify-ntfs-workspace.ps1 -WorkspaceRoot `"$target`""
}
