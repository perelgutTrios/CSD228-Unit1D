# Flutter Web Tip Calculator Build and Deploy Script
# Run this script to build and deploy the Flutter Web app

Write-Host "🚀 Building Flutter Web Tip Calculator..." -ForegroundColor Green

# Check if Flutter is installed
try {
    $flutterVersion = flutter --version
    Write-Host "✅ Flutter is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Flutter is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Flutter SDK from https://flutter.dev/docs/get-started/install" -ForegroundColor Yellow
    exit 1
}

# Clean previous builds
Write-Host "🧹 Cleaning previous builds..." -ForegroundColor Yellow
flutter clean

# Get dependencies
Write-Host "📦 Getting Flutter dependencies..." -ForegroundColor Yellow
flutter pub get

# Build for web
Write-Host "🔨 Building Flutter Web app..." -ForegroundColor Yellow
flutter build web --web-renderer html --base-href "/CSD228-Unit1D/"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Flutter Web build successful!" -ForegroundColor Green
    
    # Copy built files to root directory for GitHub Pages
    Write-Host "📁 Copying built files for deployment..." -ForegroundColor Yellow
    
    # Create backup of existing files
    if (Test-Path "index.html.backup") {
        Remove-Item "index.html.backup" -Force
    }
    if (Test-Path "index.html") {
        Rename-Item "index.html" "index.html.backup"
    }
    
    # Copy Flutter web build to root
    Copy-Item "build/web/*" "." -Recurse -Force
    
    Write-Host "🎉 Flutter Web app ready for deployment!" -ForegroundColor Green
    Write-Host "📋 Next steps:" -ForegroundColor Cyan
    Write-Host "1. Commit and push changes to GitHub" -ForegroundColor White
    Write-Host "2. The app will be available at: https://perelguttrios.github.io/CSD228-Unit1D/" -ForegroundColor White
    
} else {
    Write-Host "❌ Flutter Web build failed!" -ForegroundColor Red
    exit 1
}