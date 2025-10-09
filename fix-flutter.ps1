# Flutter Web App Fix Script
# This script copies the Flutter build files and applies necessary fixes

Write-Host "Copying Flutter web files..."
Copy-Item "build\web\*" "." -Recurse -Force

Write-Host "Fixing base href..."
(Get-Content "index.html") -replace '<base href="/">', '<base href="/CSD228 Fall 2025/Unit 1D/">' | Set-Content "index.html"

Write-Host "Adding flutter_bootstrap.js..."
(Get-Content "index.html") -replace '  <script src="flutter.js" defer></script>', '  <script src="flutter.js" defer></script>
  <script src="flutter_bootstrap.js" defer></script>' | Set-Content "index.html"

Write-Host "Flutter web app ready!"
Write-Host "Access at: http://localhost/CSD228%20Fall%202025/Unit%201D/index.html"