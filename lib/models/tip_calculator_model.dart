import 'package:flutter/foundation.dart';
import '../utils/currency_formatter.dart';
import '../utils/smart_rounding.dart';

/// Screen states for navigation
enum AppScreen { input, results }

/// Tip adjustment modes
enum TipAdjustmentMode { tipPerPerson, exactTip, roundOut }

/// Model class that handles all tip calculation logic and state management
class TipCalculatorModel extends ChangeNotifier {
  // Input values
  double _billAmount = 0.0;
  double _taxAmount = 0.0;
  int _numberOfGuests = 1;
  
  // Tip rate presets
  static const Map<String, TipRate> tipRates = {
    'excellent': TipRate(
      key: 'excellent',
      rate: 0.20,
      label: '💯 Excellent Service',
      description: '20%',
    ),
    'good': TipRate(
      key: 'good',
      rate: 0.16,
      label: '😊 Good Service',
      description: '16%',
    ),
    'standard': TipRate(
      key: 'standard',
      rate: 0.125,
      label: '👌 Standard Service',
      description: '12.5%',
    ),
    'custom': TipRate(
      key: 'custom',
      rate: 0.05,
      label: '💰 Custom Rate',
      description: '5%',
    ),
  };
  
  // Screen state
  AppScreen _currentScreen = AppScreen.input;
  
  // Current state
  String? _selectedTipOption;
  double _customTipRate = 5.0; // percentage
  final Map<String, double> _userTipOverrides = {};
  final List<TipRecommendation> _recommendations = [];
  PaymentBreakdown? _paymentBreakdown;
  
  // Getters
  double get billAmount => _billAmount;
  double get taxAmount => _taxAmount;
  int get numberOfGuests => _numberOfGuests;
  String? get selectedTipOption => _selectedTipOption;
  double get customTipRate => _customTipRate;
  List<TipRecommendation> get recommendations => _recommendations;
  PaymentBreakdown? get paymentBreakdown => _paymentBreakdown;
  
  double get totalBill => _billAmount + _taxAmount;
  bool get hasValidBill => _billAmount > 0;
  bool get hasRecommendations => _recommendations.isNotEmpty;
  AppScreen get currentScreen => _currentScreen;
  
  // Setters with validation
  void setBillAmount(double amount) {
    if (_billAmount != amount) {
      _billAmount = amount.clamp(0, 999999);
      _clearRecommendations();
      notifyListeners();
    }
  }
  
  void setTaxAmount(double amount) {
    if (_taxAmount != amount) {
      _taxAmount = amount.clamp(0, 999999);
      _clearRecommendations();
      notifyListeners();
    }
  }
  
  void setNumberOfGuests(int guests) {
    if (_numberOfGuests != guests) {
      _numberOfGuests = guests.clamp(1, 50);
      _updatePaymentBreakdown();
      notifyListeners();
    }
  }
  
  void setCustomTipRate(double rate) {
    if (_customTipRate != rate) {
      _customTipRate = rate.clamp(0, 50);
      if (_recommendations.isNotEmpty) {
        generateRecommendations();
      }
      notifyListeners();
    }
  }
  
  void setUserTipOverride(String tipOption, double amount) {
    _userTipOverrides[tipOption] = amount;
    if (_selectedTipOption == tipOption) {
      _updatePaymentBreakdown();
    }
    notifyListeners();
  }
  
  /// Generate tip recommendations with smart rounding
  void generateRecommendations() {
    if (!hasValidBill) {
      _clearRecommendations();
      return;
    }
    
    _recommendations.clear();
    
    for (final entry in tipRates.entries) {
      final tipRate = entry.value;
      final rate = tipRate.key == 'custom' ? (_customTipRate / 100) : tipRate.rate;
      
      final exactTip = _billAmount * rate;
      final exactTotal = _billAmount + _taxAmount + exactTip;
      
      // Apply smart rounding to the total bill
      final roundingResult = SmartRounding.smartRoundBill(
        exactTotal, 
        exactTip, 
        _billAmount, 
        _taxAmount,
      );
      
      final userTip = _userTipOverrides[tipRate.key] ?? roundingResult.adjustedTip;
      
      _recommendations.add(TipRecommendation(
        tipRate: tipRate,
        exactTip: exactTip,
        exactTotal: exactTotal,
        suggestedTip: roundingResult.adjustedTip,
        suggestedTotal: roundingResult.roundedTotal,
        userTip: userTip,
        roundingInfo: roundingResult,
        isOverridden: (userTip - roundingResult.adjustedTip).abs() > 0.01,
      ),);
    }
    
    notifyListeners();
  }
  
  /// Select a tip option and navigate to results screen
  void selectTipOption(String tipOptionKey) {
    _selectedTipOption = tipOptionKey;
    _updatePaymentBreakdown();
    _currentScreen = AppScreen.results;
    notifyListeners();
  }
  
  /// Navigate back to input screen
  void goBackToInput() {
    _currentScreen = AppScreen.input;
    notifyListeners();
  }
  
  /// Update tip amount from results screen with different modes
  void updateTipAmount(double amount, TipAdjustmentMode mode) {
    if (_selectedTipOption == null) return;
    
    switch (mode) {
      case TipAdjustmentMode.tipPerPerson:
        // Treat amount as tip per person, multiply by number of guests
        final totalTip = amount * _numberOfGuests;
        _userTipOverrides[_selectedTipOption!] = totalTip;
        _updatePaymentBreakdownExact(totalTip);
        break;
        
      case TipAdjustmentMode.exactTip:
        // Use exact tip amount, no rounding
        _userTipOverrides[_selectedTipOption!] = amount;
        _updatePaymentBreakdownExact(amount);
        break;
        
      case TipAdjustmentMode.roundOut:
        // Use smart rounding (current behavior)
        _userTipOverrides[_selectedTipOption!] = amount;
        _updatePaymentBreakdown();
        break;
    }
    
    notifyListeners();
  }
  
  /// Clear current selection
  void clearSelection() {
    _selectedTipOption = null;
    _paymentBreakdown = null;
    notifyListeners();
  }
  
  /// Reset all values for a new calculation
  void resetCalculation() {
    _billAmount = 0.0;
    _taxAmount = 0.0;
    _numberOfGuests = 1;
    _selectedTipOption = null;
    _userTipOverrides.clear();
    _clearRecommendations();
    notifyListeners();
  }
  
  void _clearRecommendations() {
    _recommendations.clear();
    _selectedTipOption = null;
    _paymentBreakdown = null;
  }
  
  void _updatePaymentBreakdown() {
    if (_selectedTipOption == null) return;
    
    // Find the recommendation safely
    TipRecommendation? recommendation;
    try {
      recommendation = _recommendations
          .firstWhere((rec) => rec.tipRate.key == _selectedTipOption);
    } catch (e) {
      // Recommendation not found - this shouldn't happen but let's handle it gracefully
      return;
    }
    
    // Use user override tip if available, otherwise use recommendation tip
    final actualTip = _userTipOverrides[_selectedTipOption] ?? recommendation.userTip;
    final originalTotal = _billAmount + _taxAmount + actualTip;
    final originalPerPerson = originalTotal / _numberOfGuests;
    
    // Apply smart per-person rounding
    final roundedPerPerson = SmartRounding.smartRoundPerPerson(originalPerPerson);
    final adjustedTotal = roundedPerPerson * _numberOfGuests;
    final adjustedTip = adjustedTotal - _billAmount - _taxAmount;
    
    // Calculate actual tip percentage
    final actualTipPercentage = _billAmount > 0 ? (adjustedTip / _billAmount) * 100.0 : 0.0;
    
    _paymentBreakdown = PaymentBreakdown(
      billAmount: _billAmount,
      taxAmount: _taxAmount,
      originalTip: recommendation.userTip,
      adjustedTip: adjustedTip,
      originalTotal: originalTotal,
      adjustedTotal: adjustedTotal,
      originalPerPerson: originalPerPerson,
      roundedPerPerson: roundedPerPerson,
      actualTipPercentage: actualTipPercentage,
      numberOfGuests: _numberOfGuests,
      tipOptionLabel: recommendation.tipRate.label,
      isAdjusted: (adjustedTip - recommendation.userTip).abs() > 0.01 ||
          (roundedPerPerson - originalPerPerson).abs() > 0.01,
    );
  }
  
  /// Update payment breakdown with exact tip amount (no smart rounding)
  void _updatePaymentBreakdownExact(double exactTipAmount) {
    if (_selectedTipOption == null) return;
    
    // Find the recommendation safely
    TipRecommendation? recommendation;
    try {
      recommendation = _recommendations
          .firstWhere((rec) => rec.tipRate.key == _selectedTipOption);
    } catch (e) {
      return;
    }
    
    // Use exact tip amount with no rounding
    final adjustedTotal = _billAmount + _taxAmount + exactTipAmount;
    final roundedPerPerson = adjustedTotal / _numberOfGuests;
    
    // Calculate actual tip percentage
    final actualTipPercentage = _billAmount > 0 ? (exactTipAmount / _billAmount) * 100.0 : 0.0;
    
    _paymentBreakdown = PaymentBreakdown(
      billAmount: _billAmount,
      taxAmount: _taxAmount,
      originalTip: recommendation.userTip,
      adjustedTip: exactTipAmount,
      originalTotal: _billAmount + _taxAmount + recommendation.userTip,
      adjustedTotal: adjustedTotal,
      originalPerPerson: (_billAmount + _taxAmount + recommendation.userTip) / _numberOfGuests,
      roundedPerPerson: roundedPerPerson,
      actualTipPercentage: actualTipPercentage,
      numberOfGuests: _numberOfGuests,
      tipOptionLabel: recommendation.tipRate.label,
      isAdjusted: (exactTipAmount - recommendation.userTip).abs() > 0.01,
    );
  }
}

/// Represents a tip rate option
class TipRate {
  
  const TipRate({
    required this.key,
    required this.rate,
    required this.label,
    required this.description,
  });
  final String key;
  final double rate;
  final String label;
  final String description;
}

/// Represents a tip recommendation with rounding information
class TipRecommendation {
  
  const TipRecommendation({
    required this.tipRate,
    required this.exactTip,
    required this.exactTotal,
    required this.suggestedTip,
    required this.suggestedTotal,
    required this.userTip,
    required this.roundingInfo,
    required this.isOverridden,
  });
  final TipRate tipRate;
  final double exactTip;
  final double exactTotal;
  final double suggestedTip;
  final double suggestedTotal;
  final double userTip;
  final SmartRoundingResult roundingInfo;
  final bool isOverridden;
}

/// Represents the final payment breakdown with per-person amounts
class PaymentBreakdown {
  
  const PaymentBreakdown({
    required this.billAmount,
    required this.taxAmount,
    required this.originalTip,
    required this.adjustedTip,
    required this.originalTotal,
    required this.adjustedTotal,
    required this.originalPerPerson,
    required this.roundedPerPerson,
    required this.actualTipPercentage,
    required this.numberOfGuests,
    required this.tipOptionLabel,
    required this.isAdjusted,
  });
  final double billAmount;
  final double taxAmount;
  final double originalTip;
  final double adjustedTip;
  final double originalTotal;
  final double adjustedTotal;
  final double originalPerPerson;
  final double roundedPerPerson;
  final double actualTipPercentage;
  final int numberOfGuests;
  final String tipOptionLabel;
  final bool isAdjusted;
  
  String generateSummaryText() {
    return '''Payment Breakdown:
Bill: ${CurrencyFormatter.format(billAmount)}
Tax: ${CurrencyFormatter.format(taxAmount)}
Tip: ${CurrencyFormatter.format(adjustedTip)}
Total: ${CurrencyFormatter.format(adjustedTotal)}
Per person ($numberOfGuests guests): ${CurrencyFormatter.format(roundedPerPerson)}

The actual tip percentage is ${actualTipPercentage.toStringAsFixed(1)}% with a total tip of ${CurrencyFormatter.format(adjustedTip)}''';
  }
}