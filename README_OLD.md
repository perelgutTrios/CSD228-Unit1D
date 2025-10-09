# Flutter Web Tip Calculator

A sophisticated cross-platform tip calculator built with Flutter Web, featuring Material Design 3 UI, advanced tip adjustment modes, and smart navigation. Originally developed for CSD228 Fall 2025, this project showcases modern web application development practices.

## 🚀 Features

### Core Functionality
- **Three-Mode Tip Adjustment**: Tip Per Person, Exact Tip, and Round Out Bill options
- **Smart Rounding Algorithms**: Context-aware rounding for convenient payment amounts
- **Screen-Based Navigation**: Clean workflow from input to results with intuitive back navigation
- **Real-Time Calculations**: Instant updates with reactive state management via Provider pattern
- **Responsive Design**: Optimized layouts for mobile, tablet, and desktop with LayoutBuilder

### Advanced Features
- **Material Design 3**: Modern UI with dark theme and elevated components
- **Cross-Platform**: Single Flutter codebase works on web, mobile, and desktop
- **PWA Capabilities**: Progressive Web App with service worker support
- **Accessibility**: Full keyboard navigation, screen reader support, and high contrast
- **Smart Bill Splitting**: Handles uneven splits and complex group payment scenarios

## 🎯 Quick Start

### Live Demo
🌐 **GitHub Pages**: [https://perelguttrios.github.io/CSD228-Unit1D/](https://perelguttrios.github.io/CSD228-Unit1D/)

### Local Development
```bash
# Prerequisites: Flutter 3.24.3+
flutter --version

# Clone and setup
git clone https://github.com/perelgutTrios/CSD228-Unit1D.git
cd CSD228-Unit1D
flutter pub get

# Development server
flutter run -d web-server --web-port 8080
# Access: http://localhost:8080

# Production build
flutter build web --web-renderer html
```

### XAMPP Local Deployment
```powershell
# Build and deploy with automated fixes
flutter build web --web-renderer html
.\fix-flutter.ps1
# Access: http://localhost/CSD228%20Fall%202025/Unit%201D/
```

## 📱 How to Use

### 1. Enter Bill Information
- **Bill Amount**: Pre-tax amount of your bill
- **Tax Amount**: Optional tax for accurate totals  
- **Party Size**: Number of people (1-6+ with custom entry)

### 2. Generate Recommendations  
Tap **"🎯 Show Recommended Tips"** to see four smart options:
- **� Excellent Service (20%)**: Outstanding service, special occasions
- **� Good Service (16%)**: Above average, attentive staff
- **👌 Standard Service (12.5%)**: Acceptable service baseline
- **💰 Custom Rate**: Your own percentage (5-30% range)

### 3. Navigate to Results
Select **"Calculate with this tip"** on your preferred option to navigate to the results screen with:
- Large, clear per-person payment amount
- Complete payment breakdown
- Actual tip percentage after rounding

### 4. Adjust Tips (Three-Button System)
Fine-tune your tip using three calculation modes:

**💚 Tip Per Person**: Enter amount per person, multiply by guests
- Example: $5 × 4 people = $20 total tip
- Use case: "Everyone chips in $5"

**🔵 Exact Tip**: Use precise amount with no rounding
- Example: Exactly $18.50 tip
- Use case: Specific tip amounts, no modifications

**🟣 Round Out Bill**: Apply smart rounding for convenience  
- Example: $19 tip → $19.25 for easier splitting
- Use case: Convenient payment amounts, reduce change

### Smart Rounding Algorithm
The tip calculator uses intelligent rounding to suggest convenient payment amounts:
- **Small Bills ($10-30)**: Rounds to nearest $0.50 or whole dollar
- **Medium Bills ($30-100)**: Optimizes for easy mental math
- **Large Bills ($100+)**: Focuses on standard tip percentages
- **Group Splitting**: Ensures even per-person amounts

### Mobile Features
- **Progressive Web App (PWA)**: Install as native app
- **Offline Capable**: Works without internet connection
- **Touch Optimized**: Large buttons and intuitive gestures
- **Responsive Design**: Adapts to all screen sizes

### Service Level Guidelines
- **💯 Excellent (20%)**: Outstanding service, special occasions
- **😊 Good (16%)**: Above average service, friendly staff
- **👌 Standard (12.5%)**: Acceptable service, nothing special
- **💰 Custom**: Set your own rate (5-30% range)

## File Structure
```
Unit 1D/
├── index.html           # Main HTML structure with PWA support
├── styles.css           # Mobile-optimized styling and animations
├── script.js            # TipCalculator class and smart algorithms
├── manifest.json        # PWA configuration
├── sw.js               # Service worker for offline functionality
├── icons/              # App icons for mobile installation
├── tests/              # Comprehensive test suite
└── README.md           # This documentation
```

## Technical Details

### Smart Algorithm Features
- **Bill Analysis**: Automatically detects bill patterns for optimal rounding
- **Group Mathematics**: Ensures even splits with minimal remainder amounts
- **Rate Validation**: Prevents unrealistic tip percentages (5-30% range)
- **Currency Precision**: Handles decimal calculations with proper rounding

### CSS Features
- **Mobile-First Design**: Optimized for touch interfaces and small screens
- **PWA Styling**: Native app-like appearance when installed
- **Animated Interactions**: Smooth transitions and hover effects
- **Accessibility**: High contrast ratios and readable fonts
- **Responsive Layout**: Adapts from mobile to desktop seamlessly

### JavaScript Features
- **TipCalculator Class**: Modern ES6+ object-oriented architecture
- **Real-time Calculations**: Live updates as user types
- **Smart Algorithms**: Intelligent rounding and optimization logic
- **State Management**: Maintains user preferences and overrides
- **Event-Driven**: Responsive to user interactions and input changes
- **PWA Integration**: Service worker and offline capabilities

### Browser Compatibility
- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **PWA Support**: Installable on iOS 11.3+, Android Chrome 70+
- **Offline Mode**: Full functionality without internet connection

## Example Usage Scenarios

### Scenario 1: Dinner for Two
1. Enter bill amount: $45.80
2. Enter tax: $3.66
3. Select 2 guests
4. Review recommendations (15-20% tips)
5. Each person pays: $24.73-$26.23

### Scenario 2: Group Celebration
1. Enter bill: $180.50
2. Enter tax: $14.44
3. Select "6+" guests, enter 8
4. Choose service level (excellent/good/standard)
5. Split evenly: $24.37-$29.24 per person

### Scenario 3: Quick Coffee
1. Enter bill: $8.45
2. No tax
3. 1 guest
4. Smart rounding suggests: $9.00 or $10.00

## Installation as Mobile App

### iOS (iPhone/iPad)
1. Open in Safari browser
2. Tap Share button (□↗)
3. Scroll and tap "Add to Home Screen"
4. Confirm installation
5. Launch from home screen like any app

### Android
1. Open in Chrome browser
2. Tap menu (⋮) → "Install app" 
3. Or look for "Add to Home Screen" banner
4. Confirm installation
5. Find in app drawer or home screen

## 🚀 Deployment & Access

### **📱 Live Mobile App**
- **URL**: https://perelgutTrios.github.io/CSD228-Unit1D/
- **QR Code**: Open `qr-code.html` for easy mobile access
- **GitHub Pages**: Automatically deployed from TipCalc branch

### **📋 Deployment Guides**
- **Mobile Deployment**: See `GITHUB_DEPLOYMENT.md`
- **iPhone Installation**: See `DEPLOYMENT_STEPS.md` 
- **PWA Configuration**: Manifest.json and service worker included

### **🔄 Automatic Updates**
- Commits to TipCalc branch trigger auto-deployment
- GitHub Actions handles testing and deployment
- Lighthouse audits ensure PWA compliance

### **📊 Technical Stack**
- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **PWA**: Manifest, Service Worker, Offline Support
- **Deployment**: GitHub Pages, GitHub Actions
- **Testing**: Jest test suite (57 tests)
- **Mobile**: iOS/Android installation support

---

**🎯 Project**: CSD228 Fall 2025 - Unit 1D Tip Calculator  
**👨‍💻 Author**: Mobile App Development Team  
**📱 Version**: 2.0 - PWA Smart Tip Calculator  
**🌐 Live Demo**: https://perelgutTrios.github.io/CSD228-Unit1D/  
**📅 Last Updated**: October 7, 2025