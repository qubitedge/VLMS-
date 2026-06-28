$lines = Get-Content "C:\Users\gjsjn\.gemini\antigravity-ide\brain\83c42692-5872-42d8-a4a4-0444cf08c631\.system_generated\logs\transcript.jsonl"
$count = 0
foreach ($line in $lines) {
    if ($line -match '"source":"USER_EXPLICIT"' -and $line -match '"type":"USER_INPUT"') {
        $count++
        $preview = $line.Substring(0, [Math]::Min(300, $line.Length))
        Write-Host "Step $count (len=$($line.Length)): $preview"
        Write-Host "---"
    }
}
Write-Host "Total user messages: $count"
