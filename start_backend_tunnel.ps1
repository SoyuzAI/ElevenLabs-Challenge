# Start Backend and Tunnel
Write-Host "Starting Backend..."
Start-Process -FilePath "uvicorn" -ArgumentList "backend.main:app --port 8000 --reload" -NoNewWindow
Start-Sleep -Seconds 5
Write-Host "Backend started. Starting Tunnel..."
npx localtunnel --port 8000
