# 💰 Flutter Web Tip Calculator

A smart tip calculator with bill splitting and rounding, built with **Flutter Web**. This PWA (Progressive Web App) provides intelligent rounding suggestions and per-person payment calculations.

![Flutter](https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white)
![Dart](https://img.shields.io/badge/Dart-0175C2?style=for-the-badge&logo=dart&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)

## 🌟 Features

### 🧠 Smart Rounding Logic
- **Total Bill Rounding**: Automatically rounds totals to convenient amounts
  - Under $10: Nearest $0.50
  - $10-$25: Nearest $0.75  
  - Over $25: Nearest $1.00

### 💡 Per-Person Payment Rounding
- **Under $5**: Round up to next $0.25
- **$5-$10**: Round up to next $0.50
- **Over $10**: Round to nearest $1.00

### 📊 Tip Recommendations
- **Excellent Service** (20%)
- **Good Service** (16%)
- **Standard Service** (12.5%)
- **Custom Rate** (adjustable)

### 🔧 Advanced Features
- Real-time tip percentage calculation
- Bill splitting for up to 50 guests
- User tip amount overrides
- Copy payment breakdown to clipboard
- Fully responsive Material Design 3 UI
- Progressive Web App (PWA) support

## 🚀 Live Demo

**[Try the Flutter Web App](https://perelguttrios.github.io/CSD228-Unit1D/)**

## 🛠️ Development Setup

### Prerequisites
- [Flutter SDK](https://flutter.dev/docs/get-started/install) (3.0.0 or higher)
- [Dart SDK](https://dart.dev/get-dart) (included with Flutter)
- Web browser for testing

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/perelgutTrios/CSD228-Unit1D.git
   cd CSD228-Unit1D
   git checkout TipCalcFlutter
   ```

2. **Install dependencies**
   ```bash
   flutter pub get
   ```

3. **Run in development mode**
   ```bash
   flutter run -d web-server --web-port 8080
   ```

4. **Build for production**
   ```bash
   flutter build web --web-renderer html
   ```

### 🪟 Windows Quick Build
```powershell
# Run the build script
./build-flutter.ps1
```

## 📁 Project Structure

```
lib/
├── main.dart                 # App entry point and theme
├── models/
│   └── tip_calculator_model.dart  # Business logic and state
├── widgets/
│   ├── tip_calculator_screen.dart # Main screen layout
│   ├── input_section.dart         # Bill input and guest selection
│   ├── recommendations_section.dart # Tip recommendations
│   └── payment_breakdown_section.dart # Final breakdown
└── utils/
    ├── currency_formatter.dart    # Currency formatting
    └── smart_rounding.dart        # Rounding algorithms

web/
├── index.html               # Web app HTML
└── manifest.json           # PWA configuration
```

## 🎨 Architecture

### State Management
- **Provider Pattern** for reactive state management
- **Single Source of Truth** with `TipCalculatorModel`
- **Immutable Data Models** for consistent state

### UI Components
- **Material Design 3** with custom dark theme
- **Responsive Layout** adapts to screen size
- **Accessibility** support with semantic widgets
- **Touch-Friendly** design for mobile devices

### Smart Algorithms
```dart
// Example: Per-person rounding logic
static double smartRoundPerPerson(double amount) {
  if (amount < 5) {
    return (amount / 0.25).ceil() * 0.25;  // Round up to $0.25
  } else if (amount <= 10) {
    return (amount / 0.50).ceil() * 0.50;  // Round up to $0.50
  } else {
    return amount.roundToDouble();         // Round to $1.00
  }
}
```

## 📱 PWA Features

- **Installable** on mobile and desktop
- **Offline Support** with service worker
- **Responsive Design** for all screen sizes
- **Native-like Experience** with app shell architecture

## 🧪 Testing

Run all tests:
```bash
flutter test
```

Run with coverage:
```bash
flutter test --coverage
```

## 🚀 Deployment

### GitHub Pages (Automated)
1. Push to `TipCalcFlutter` branch
2. GitHub Actions builds and deploys automatically
3. Available at: https://perelgutTrios.github.io/CSD228-Unit1D/

### Manual Deployment
```bash
# Build for web
flutter build web --base-href "/CSD228-Unit1D/"

# Deploy build/web/ contents to your hosting provider
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Flutter Team** for the excellent web framework
- **Material Design 3** for the beautiful design system
- **GitHub Pages** for free hosting

---

Made with ❤️ using Flutter Web