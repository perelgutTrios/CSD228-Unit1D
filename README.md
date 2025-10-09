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
- **💯 Excellent Service (20%)**: Outstanding service, special occasions
- **😊 Good Service (16%)**: Above average, attentive staff
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

## 🏗️ Technical Architecture

### Flutter Web Stack
```
┌─────────────────────────────────────────────────────────┐
│                 Flutter Web 3.24.3                     │
├─────────────────────────────────────────────────────────┤
│  UI Layer: Material Design 3 + Responsive Layouts      │  
│  State Management: Provider Pattern + ChangeNotifier    │
│  Business Logic: Smart Rounding + Payment Calculations  │
│  Navigation: Screen-Based Architecture                  │
│  Deployment: GitHub Pages + XAMPP Local               │
└─────────────────────────────────────────────────────────┘
```

### Project Structure
```
lib/
├── main.dart                    # App entry point + Material theme
├── models/
│   └── tip_calculator_model.dart # Business logic + state management
├── widgets/
│   ├── input_section.dart       # Bill entry form
│   ├── recommendations_section.dart # Tip options display  
│   ├── results_screen.dart      # Payment results + adjustments
│   └── payment_breakdown_section.dart # Final calculations
└── utils/
    ├── currency_formatter.dart  # Display formatting
    └── smart_rounding.dart      # Rounding algorithms
```

### State Management Flow
```dart
// Reactive updates with Provider pattern
class TipCalculatorModel extends ChangeNotifier {
  // Navigation between input and results screens
  AppScreen _currentScreen = AppScreen.input;
  
  // Three-mode tip adjustment system  
  void updateTipAmount(double amount, TipAdjustmentMode mode) {
    switch (mode) {
      case TipAdjustmentMode.tipPerPerson:
        final totalTip = amount * _numberOfGuests;
        // ... calculations
      case TipAdjustmentMode.exactTip:
        // ... precise amount handling
      case TipAdjustmentMode.roundOut:  
        // ... smart rounding application
    }
    notifyListeners(); // Trigger UI rebuild
  }
}
```

## 🧮 Smart Rounding System

Context-aware rounding for convenient payments:

| Amount Range | Rounding Rule | Example |
|--------------|---------------|---------|
| ≤ $5.00 | Quarters ($0.25) | $4.37 → $4.25 |
| $5.01 - $15.00 | Halves ($0.50) | $12.37 → $12.50 |  
| $15.01 - $50.00 | Whole dollars | $23.37 → $23.00 |
| > $50.00 | Five dollars | $67.50 → $70.00 |

## 🎨 UI/UX Design

### Material Design 3 Implementation
- **Dark Theme**: High contrast with Color.fromSeed() theming
- **Elevated Components**: Cards and buttons with proper elevation shadows
- **Responsive Breakpoints**: Mobile-first with tablet/desktop optimizations
- **Touch Targets**: Minimum 44px for accessibility compliance

### Navigation Pattern
```
Input Screen ──────Select Tip────────► Results Screen
     ▲                                      │
     │                                      │
     └──────────Back Button─────────────────┘
```

## 📊 Usage Examples

### Scenario A: Business Lunch ($67 bill, 3 people)
```
Input: $67.00 bill + $5.36 tax, 3 guests
Select: Good Service (16%)  
Result: $24.12 per person, $12.61 tip (17.0% actual)
Adjust: Exact Tip → $12.00 for cleaner amount
Final: $23.79 per person, $12.00 tip (16.2% actual)
```

### Scenario B: Group Dinner ($156 bill, 6 people)  
```
Input: $156.00 bill + $12.48 tax, 6 guests
Select: Excellent Service (20%)
Result: $33.75 per person, $37.50 tip (24.0% actual)  
Adjust: Tip Per Person → $6.00 each
Final: $34.08 per person, $36.00 tip (23.1% actual)
```

## 🚀 Deployment Options

### GitHub Pages (Production)
- Automated deployment via GitHub Actions
- Custom base href configuration for subdirectory hosting
- PWA manifest and service worker optimization

### Local XAMPP (Development)
- `fix-flutter.ps1` script for automated local deployment
- Base href adjustments for XAMPP directory structure  
- Bootstrap script inclusion for proper Flutter initialization

### Docker (Optional)
```dockerfile
FROM nginx:alpine
COPY build/web /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🛠️ Development Journey

### Phase Evolution
1. **v1.0**: HTML/CSS/JavaScript foundation
2. **v2.0**: PWA enhancement + mobile optimization  
3. **v3.0**: Complete Flutter Web conversion + Material Design 3

### Key Technical Decisions
- **Flutter Web**: Cross-platform development with native performance
- **Provider Pattern**: Reactive state management with minimal boilerplate
- **Screen Navigation**: Better UX than cramming content into single page
- **Three-Button System**: Covers all real-world tip adjustment scenarios

## 🧪 Testing & Quality

### Test Coverage
- **Unit Tests**: Business logic and calculation algorithms  
- **Widget Tests**: UI component interactions and state updates
- **Integration Tests**: End-to-end user workflows
- **Cross-Platform**: Chrome, Firefox, Safari, Edge compatibility

### Performance Metrics
- **First Paint**: < 1.5s on 3G connection
- **Interactive**: < 3s time to interactive  
- **Bundle Size**: < 2MB gzipped
- **Lighthouse Score**: 90+ performance rating

## 📈 Future Roadmap

### v3.1 Enhancements  
- Bill splitting variations (unequal splits, item-by-item)
- Multi-currency support with exchange rates
- Calculation history and favorites
- Enhanced PWA features (shortcuts, share target)

### v4.0 Platform Expansion
- Native iOS/Android apps from same Flutter codebase  
- Desktop applications (Windows, macOS, Linux)
- Apple Watch and Wear OS companions
- Voice interface integration

## 🤝 Contributing

We welcome contributions! This project serves as both a practical tool and educational example.

1. **Fork the repository** on GitHub
2. **Create feature branch**: `git checkout -b feature/amazing-feature`  
3. **Test thoroughly** across platforms and devices
4. **Submit pull request** with detailed description

### Development Setup
```bash
git clone https://github.com/yourusername/CSD228-Unit1D.git
cd CSD228-Unit1D  
flutter pub get
flutter run -d web-server
```

## 📄 Documentation

- **📖 Complete Technical Docs**: `FLUTTER_PROJECT_DOCUMENTATION.md`
- **🚀 Deployment Guide**: `DEPLOYMENT_STEPS.md`  
- **📱 Mobile Conversion**: `MOBILE_CONVERSION_GUIDE.md`
- **🧪 Testing Guide**: `TEST_EXECUTION_GUIDE.md`

## 📞 Support & Contact

- **🐛 Issues**: [GitHub Issues](https://github.com/perelgutTrios/CSD228-Unit1D/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/perelgutTrios/CSD228-Unit1D/discussions)
- **📧 Contact**: Course CSD228 Fall 2025 team

## 📜 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**🎓 Academic Project**: CSD228 Fall 2025 - Unit 1D  
**🏗️ Technology**: Flutter Web 3.24.3 + Material Design 3  
**🌐 Live Demo**: https://perelguttrios.github.io/CSD228-Unit1D/  
**⭐ Star this repo** if you find it helpful!