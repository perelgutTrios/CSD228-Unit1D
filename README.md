# Tip Calculator Application

A smart web-based tip calculator with intelligent rounding, bill splitting, and mobile optimization built with HTML, CSS, and JavaScript.

## Features

- **Smart Tip Calculation**: Automatically recommends optimal tip amounts with intelligent rounding
- **Bill Splitting**: Divide bills evenly among multiple guests with detailed per-person breakdown
- **Multiple Service Levels**: 
  - 💯 Excellent Service (20%)
  - 😊 Good Service (16%)
  - 👌 Standard Service (12.5%)
  - 💰 Custom Rate (user-defined)
- **Tax Integration**: Calculate tips on pre-tax or total amounts
- **Real-time Updates**: Live calculations as you type
- **Mobile Optimized**: PWA-enabled for smartphone installation
- **User Override**: Modify recommended amounts with custom values

## 🚀 Live Mobile App

### **📱 Install on Your Phone**
**Live URL**: https://perelgutTrios.github.io/CSD228-Unit1D/

**iPhone/iPad**: Safari → Share → "Add to Home Screen"  
**Android**: Chrome → Menu → "Install app"  
**Desktop**: Chrome → Install icon in address bar

### **🌐 Web Access**
Visit https://perelgutTrios.github.io/CSD228-Unit1D/ in any browser

## Usage

### Local Development
1. Make sure you have XAMPP running
2. Open your browser and navigate to: `localhost/CSD228%20Fall%202025/Unit%201D/index.html`
3. **Mobile Testing**: Access via mobile browser for PWA features

### Tip Calculator Operations

#### Step 1: Enter Bill Information
- **💵 Bill Amount**: Enter the pre-tax bill amount
- **📊 Tax Amount**: Enter the tax amount (optional)
- **🧾 Total Bill**: Automatically calculated (bill + tax)

#### Step 2: Select Party Size
- **👥 Number of Guests**: Choose 1-6 guests or select "6+" for custom amount
- For parties larger than 6, enter exact number in custom field
- Calculations automatically adjust for group size

#### Step 3: Get Recommendations
- Click "🎯 Show Recommended Tips" to see smart suggestions
- Algorithm analyzes bill amount and suggests optimal rounding
- Choose from preset service levels or use custom rate

#### Step 4: Review Breakdown
- **Per Person Amount**: See individual payment amount
- **Total with Tip**: View final amount including tip
- **Tip Percentage**: Confirm effective tip rate
- **Override Options**: Modify any recommended amount

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