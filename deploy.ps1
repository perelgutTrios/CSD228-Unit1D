# Simple deployment script for tip calculator
# Run this script to manually deploy changes to GitHub Pages

Write-Host "🚀 Deploying Tip Calculator to GitHub Pages..." -ForegroundColor Green

# Ensure we're on TipCalc branch
git checkout TipCalc
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to switch to TipCalc branch" -ForegroundColor Red
    exit 1
}

# Run tests first
Write-Host "🧪 Running tests..." -ForegroundColor Yellow
npm run test:all
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Tests failed! Deployment aborted." -ForegroundColor Red
    exit 1
}

# Switch to gh-pages branch
Write-Host "📦 Switching to gh-pages branch..." -ForegroundColor Yellow
git checkout gh-pages
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to switch to gh-pages branch" -ForegroundColor Red
    exit 1
}

# Merge latest changes from TipCalc
Write-Host "🔄 Merging latest changes from TipCalc..." -ForegroundColor Yellow
git merge TipCalc --no-edit
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to merge TipCalc changes" -ForegroundColor Red
    exit 1
}

# Push to GitHub Pages
Write-Host "🌐 Pushing to GitHub Pages..." -ForegroundColor Yellow
git push origin gh-pages
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to push to GitHub Pages" -ForegroundColor Red
    exit 1
}

# Switch back to TipCalc branch
git checkout TipCalc

Write-Host "✅ Deployment complete! Your tip calculator should be live at:" -ForegroundColor Green
Write-Host "🌐 https://perelguttrios.github.io/CSD228-Unit1D/" -ForegroundColor Cyan
Write-Host "ℹ️  Changes may take 1-2 minutes to appear." -ForegroundColor Yellow