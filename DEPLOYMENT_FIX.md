# Force Deploy TipCalc Branch to GitHub Pages

## Quick Fix Commands

### Option 1: Manual GitHub Settings (Recommended)
1. Visit: https://github.com/perelgutTrios/CSD228-Unit1D/settings/pages
2. Change Source Branch from "master" to "TipCalc"
3. Save settings
4. Wait 2-3 minutes for deployment

### Option 2: Command Line Fix
```bash
# Ensure you're on TipCalc branch
git checkout TipCalc

# Force push to trigger new deployment
git commit --allow-empty -m "Force deploy TipCalc branch to Pages"
git push origin TipCalc

# Check deployment status
git log --oneline -5
```

### Option 3: Create gh-pages branch from TipCalc
#### Windows PowerShell:
```powershell
# Create gh-pages branch from current TipCalc content
git checkout TipCalc
git branch -D gh-pages 2>$null; if ($?) { Write-Host "Deleted existing gh-pages branch" }
git checkout -b gh-pages
git push -f origin gh-pages

# Switch back to TipCalc for development
git checkout TipCalc
```

#### Linux/Mac/Git Bash:
```bash
# Create gh-pages branch from current TipCalc content
git checkout TipCalc
git branch -D gh-pages 2>/dev/null || true
git checkout -b gh-pages
git push -f origin gh-pages

# Switch back to TipCalc for development
git checkout TipCalc
```

## Verify Deployment

### Check Current Branch Content
- **Master Branch**: Original simple calculator (+ - = C buttons)
- **TipCalc Branch**: Tip calculator with smart rounding & bill splitting
- **Expected URL**: https://perelgutTrios.github.io/CSD228-Unit1D/

### Verification Steps
1. **Visit URL**: https://perelgutTrios.github.io/CSD228-Unit1D/
2. **Expected Content**: 
   - Title: "💰 Tip Calculator" 
   - Subtitle: "Smart rounding & bill splitting"
   - Input fields: Bill Amount, Tax Amount, Total Bill
   - Guest selector: 1, 2, 3, 4, 5, 6+ buttons
   - "🎯 Show Recommended Tips" button

3. **If Still Shows Original Calculator**:
   - GitHub Pages is still deploying from master branch
   - Follow "Option 1: Manual GitHub Settings" above

## Current Status Check

### Files in TipCalc Branch:
- ✅ index.html (Tip calculator interface)
- ✅ script.js (TipCalculator class)  
- ✅ styles.css (Mobile-optimized)
- ✅ manifest.json (PWA config)
- ✅ sw.js (Service worker)

### Files in Master Branch:
- ❌ index.html (Original simple calculator)
- ❌ script.js (Calculator class - basic +/-)
- ❌ No PWA features

## Troubleshooting

### If Deployment Fails:
1. **Check GitHub Actions**: Repository → Actions tab
2. **Check Pages Settings**: Repository → Settings → Pages
3. **Force Rebuild**: Empty commit + push to TipCalc branch
4. **Clear Cache**: Wait 5-10 minutes for CDN cache to clear

### If Wrong Content Appears:
- GitHub Pages is deploying from wrong branch
- Change Pages source from "master" to "TipCalc" in repository settings
- Wait 2-3 minutes for changes to take effect

---

**Target URL**: https://perelgutTrios.github.io/CSD228-Unit1D/  
**Expected Content**: Tip Calculator with PWA features from TipCalc branch  
**Current Issue**: Deploying from master branch (original calculator)