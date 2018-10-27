Param(
    [Parameter(Mandatory = $true)]
    $version = ""
)

# Change Version
Write-Host "## Set version to ${version}";
$manifest = Get-Content ".\app\manifest.json" -raw | ConvertFrom-Json
$manifest.version = "${version}"
$manifest | ConvertTo-Json -Depth 10 | set-content ".\app\manifest.json"

# BUILD
Write-Host "## Run NPM build";

$buildCmd = "npm run build:release"
Invoke-Expression -Command $buildCmd

Write-Host "## Build Success";

# PACK
Write-Host "## Pack Package";

$source = "app\dist", "app\img", ".\app\manifest.json", ".\app\*.html"
$dest = "packages\ReportJ.Chrome_${version}.zip"

Compress-Archive -Path $source -DestinationPath $dest -Update