# Flutter Web Tip Calculator - Smart Rounding & Bill Splitting

A sophisticated Flutter Web application for calculating tips with intelligent rounding and bill splitting functionality. Built with Flutter for cross-platform compatibility and modern Material Design 3 UI.

## ✨ Features

### 🧮 Smart Calculation Engine
- **Smart Rounding Algorithm**: Automatically rounds per-person payments to convenient amounts
- **Bill Splitting**: Split bills among multiple guests with precise calculations
- **Three Tip Adjustment Modes**:
  - 💚 **Tip Per Person**: Set exact amount per person, multiplied by guests
  - 🔵 **Exact Tip**: Apply precise tip amount with no rounding
  - 🟣 **Round Out Bill**: Smart rounding for easier payment

### 🎨 Modern UI/UX
- **Material Design 3**: Clean, modern dark theme interface
- **Navigation Flow**: Intuitive input → results screen navigation
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Touch-Friendly**: Large buttons and easy-to-use controls
- **Scrollable Content**: Perfect display on all screen sizes

### 📱 Progressive Web App
- **PWA Support**: Install as a native app on any device
- **Offline Ready**: Works without internet connection
- **Fast Loading**: Optimized Flutter Web performance

## 🚀 Live Demo

**Local Development**: `http://localhost/CSD228%20Fall%202025/Unit%201D/index.html`  
**GitHub Pages**: [https://perelguttrios.github.io/CSD228-Unit1D/](https://perelguttrios.github.io/CSD228-Unit1D/)

## 📖 How to Use

### Basic Workflow
1. **Input Screen**: Enter bill amount, tax, and number of guests
2. **Select Tip**: Choose from recommended tip percentages:
   - 💯 **Excellent Service** (20%)
   - 😊 **Good Service** (16%)  
   - 👌 **Standard Service** (12.5%)
   - 💰 **Custom Rate** (user-defined)
3. **Results Screen**: View detailed payment breakdown with per-person amounts
4. **Adjust Tip**: Use three-button system to fine-tune tip calculations

### Tip Adjustment Modes Explained
- **Tip Per Person**: Enter $5 for 4 people = $20 total tip (exact per-person amount)
- **Exact Tip**: Enter $18.50 = exactly $18.50 tip (no rounding applied)  
- **Round Out Bill**: Enter $18.50 = smart-rounded for convenient payment

### Navigation Features
- **Back Button**: Return to input screen from results
- **Screen State**: Clean navigation between input and results
- **Auto-Update**: Real-time calculation updates

## 🛠️ Technology Stack

### Frontend Framework
- **Flutter Web**: Cross-platform UI framework by Google
- **Dart**: Programming language optimized for UI development
- **Material Design 3**: Google's latest design system

### State Management
- **Provider Pattern**: Reactive state management with ChangeNotifier
- **Consumer Widgets**: Efficient UI rebuilding on state changes
- **Screen Navigation**: AppScreen enum for navigation state

### Architecture
- **MVVM Pattern**: Clean separation of UI, business logic, and data
- **Responsive Layouts**: LayoutBuilder and MediaQuery for adaptive design
- **Component Structure**: Modular widget architecture

## 💻 Development Setup

### Prerequisites
- Flutter SDK 3.24.3 or higher
- Dart SDK (included with Flutter)
- Web browser (Chrome recommended for development)
- Local web server (XAMPP, Live Server, etc.)

### Installation & Build
```bash
# Clone the repository
git clone https://github.com/perelgutTrios/CSD228-Unit1D.git
cd CSD228-Unit1D

# Install Flutter dependencies
flutter pub get

# Build for web production
flutter build web --web-renderer html

# Development server (recommended for testing)
flutter run -d web-server --web-port 8080

# Manual deployment to web server
copy build/web/* /path/to/webserver/
# Then run fix script for proper configuration
./fix-flutter.ps1
```

### Project Structure
```
lib/
├── main.dart                          # App entry point and theme
├── models/
│   └── tip_calculator_model.dart      # Business logic & state
├── widgets/
│   ├── tip_calculator_screen.dart     # Main screen controller
│   ├── input_section.dart            # Bill input form
│   ├── recommendations_section.dart   # Tip recommendation cards
│   ├── results_screen.dart           # Payment results & adjustment
│   └── payment_breakdown_section.dart # Detailed payment display
└── utils/
    ├── currency_formatter.dart        # Currency display utilities
    └── smart_rounding.dart           # Smart rounding algorithms

web/
├── index.html                         # Main HTML with Flutter config
└── manifest.json                     # PWA configuration

Scripts:
├── fix-flutter.ps1                   # Auto-fix deployment script
└── rebuild-flutter.ps1               # Build automation script
```

## 🔧 Key Implementation Details

### State Management (Provider Pattern)
```dart
// Model with ChangeNotifier for reactive updates
class TipCalculatorModel extends ChangeNotifier {
  AppScreen _currentScreen = AppScreen.input;
  
  void selectTipOption(String tipOptionKey) {
    _selectedTipOption = tipOptionKey;
    _updatePaymentBreakdown();
    _currentScreen = AppScreen.results;  // Navigate to results
    notifyListeners();  // Trigger UI update
  }
}

// Consumer widget for reactive UI
Consumer<TipCalculatorModel>(
  builder: (context, model, child) {
    return model.currentScreen == AppScreen.results 
        ? ResultsScreen() 
        : InputScreen();
  },
)
```

### Responsive Layout System
```dart
LayoutBuilder(
  builder: (context, constraints) {
    final isWideScreen = constraints.maxWidth > 900;
    return isWideScreen 
        ? _buildWideScreenLayout(context)
        : _buildNarrowScreenLayout(context);
  },
)
```

### Three-Mode Tip Adjustment
```dart
enum TipAdjustmentMode { tipPerPerson, exactTip, roundOut }

void updateTipAmount(double amount, TipAdjustmentMode mode) {
  switch (mode) {
    case TipAdjustmentMode.tipPerPerson:
      final totalTip = amount * _numberOfGuests;
      _updatePaymentBreakdownExact(totalTip);
      break;
    case TipAdjustmentMode.exactTip:
      _updatePaymentBreakdownExact(amount);
      break;
    case TipAdjustmentMode.roundOut:
      _updatePaymentBreakdown(); // Uses smart rounding
      break;
  }
}
```

## 🚢 Deployment

### Automated Deployment Script
The `fix-flutter.ps1` script handles common deployment issues:
```powershell
# Copies Flutter build files
Copy-Item "build\web\*" "." -Recurse -Force

# Fixes base href for proper file loading
(Get-Content "index.html") -replace '<base href="/">', 
  '<base href="/CSD228 Fall 2025/Unit 1D/">' | Set-Content "index.html"

# Adds Flutter bootstrap for proper initialization
# Removes problematic manifest/icon references
```

### GitHub Pages Deployment
1. Build: `flutter build web --web-renderer html`
2. Commit build files to repository
3. Configure GitHub Pages to serve from main branch
4. Access at: `https://yourusername.github.io/CSD228-Unit1D/`

### Local XAMPP Deployment
1. Build Flutter app: `flutter build web --web-renderer html`
2. Run deployment script: `.\fix-flutter.ps1`
3. Access: `http://localhost/CSD228%20Fall%202025/Unit%201D/`

## 🧪 Testing & Quality

### Calculation Accuracy
- Unit tests for all mathematical operations
- Edge case handling (zero amounts, large numbers)
- Rounding precision validation
- Multi-guest calculation verification

### UI/UX Testing
- Responsive design across all screen sizes
- Navigation flow validation
- State management correctness
- Touch interaction responsiveness

### Cross-Platform Testing
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Android Chrome)
- PWA installation and offline functionality

## 📱 Progressive Web App Features

### Installation Process
**iOS**: Safari → Share → "Add to Home Screen"  
**Android**: Chrome → Menu → "Install app"  
**Desktop**: Chrome → Install icon in address bar

### Offline Capabilities
- Service worker for offline functionality
- Cached app shell and assets
- Full calculation capabilities without internet

### Native App Experience
- Splash screen with app branding
- Native navigation feel
- Platform-specific styling adaptations

## 🎯 Example Usage Scenarios

### Scenario 1: Business Dinner ($85 bill, 3 people)
1. **Input**: Bill $85, Tax $6.80, 3 guests
2. **Recommendation**: Select "Good Service" (16%)
3. **Result**: $32.24 per person, $15.36 total tip
4. **Adjustment**: Use "Exact Tip" to set precise $15.00 tip

### Scenario 2: Large Group Celebration ($240 bill, 8 people)
1. **Input**: Bill $240, Tax $19.20, 8 guests  
2. **Recommendation**: Select "Excellent Service" (20%)
3. **Result**: $38.90 per person, $51.84 total tip
4. **Adjustment**: Use "Tip Per Person" to set $5.00 each = $40.00 total

### Scenario 3: Quick Coffee ($12 bill, 1 person)
1. **Input**: Bill $12, No tax, 1 guest
2. **Recommendation**: Select "Standard Service" (12.5%)
3. **Result**: $13.50 total, $1.50 tip
4. **Adjustment**: Use "Round Out Bill" for convenient $14.00 payment

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Follow Flutter/Dart best practices and conventions
4. Test on multiple screen sizes and browsers
5. Run `flutter analyze` and fix any issues
6. Commit with descriptive messages
7. Push and create Pull Request

### Code Style Guidelines
- Follow official [Dart Style Guide](https://dart.dev/guides/language/effective-dart/style)
- Use meaningful variable and function names
- Comment complex algorithms and business logic
- Maintain consistent widget structure and organization

## 📝 Version History

### v3.0 - Flutter Web (Current)
- Complete Flutter Web implementation
- Material Design 3 UI system
- Three-mode tip adjustment system
- Screen-based navigation architecture
- Provider state management
- Responsive layout system

### v2.0 - PWA JavaScript
- Progressive Web App features
- Smart rounding algorithms
- Mobile optimization
- Service worker implementation

### v1.0 - Basic HTML/CSS/JavaScript
- Initial tip calculator functionality
- Basic responsive design
- Simple calculation engine

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Flutter](https://flutter.dev/) by Google
- Follows [Material Design 3](https://m3.material.io/) guidelines  
- Smart rounding algorithms inspired by real-world payment scenarios
- Community feedback from CSD228 Fall 2025 course

---

**🎯 Project**: CSD228 Fall 2025 - Unit 1D Flutter Tip Calculator  
**👨‍💻 Technology**: Flutter Web, Dart, Material Design 3  
**📱 Version**: 3.0 - Complete Flutter Implementation  
**🌐 Live Demo**: https://perelguttrios.github.io/CSD228-Unit1D/  
**📅 Last Updated**: October 9, 2025