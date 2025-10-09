/// Smart rounding utility for tip calculations and per-person amounts
class SmartRounding {
  /// Smart rounding based on total bill amount (bill + tax + tip)
  /// 
  /// - Under $10: Round to nearest $0.50
  /// - $10-$25: Round to nearest $0.75
  /// - Over $25: Round to nearest $1.00
  static SmartRoundingResult smartRoundBill(
    double totalBill,
    double originalTip,
    double billAmount,
    double taxAmount,
  ) {
    late double roundedTotal;
    late String roundingLevel;
    late String roundingDescription;
    
    if (totalBill < 10) {
      // Round to nearest $0.50
      roundedTotal = (totalBill / 0.5).round() * 0.5;
      roundingLevel = "half-dollar";
      roundingDescription = "Total rounded to nearest 50¢ for small bills";
    } else if (totalBill < 25) {
      // Round to nearest $0.75
      roundedTotal = (totalBill / 0.75).round() * 0.75;
      roundingLevel = "seventy-five";
      roundingDescription = "Total rounded to nearest 75¢ for mid-range bills";
    } else {
      // Round to nearest $1.00
      roundedTotal = totalBill.roundToDouble();
      roundingLevel = "dollar";
      roundingDescription = "Total rounded to nearest dollar for large bills";
    }
    
    // Calculate the adjusted tip (rounded total - bill - tax)
    final adjustedTip = (roundedTotal - billAmount - taxAmount).clamp(0.0, double.infinity);
    
    return SmartRoundingResult(
      originalTotal: totalBill,
      roundedTotal: roundedTotal,
      originalTip: originalTip,
      adjustedTip: adjustedTip,
      roundingLevel: roundingLevel,
      roundingDescription: roundingDescription,
      difference: roundedTotal - totalBill,
    );
  }
  
  /// Smart rounding for per-person payment amounts
  /// 
  /// - Under $5: Round up to next $0.25
  /// - $5-$10: Round up to next $0.50
  /// - Over $10: Round to nearest $1.00
  static double smartRoundPerPerson(double amount) {
    if (amount < 5) {
      // Under $5: round up to next $0.25
      return (amount / 0.25).ceil() * 0.25;
    } else if (amount <= 10) {
      // $5-10: round up to next $0.50
      return (amount / 0.50).ceil() * 0.50;
    } else {
      // Over $10: round to nearest $1.00
      return amount.roundToDouble();
    }
  }
}

/// Result of smart rounding calculation
class SmartRoundingResult {
  final double originalTotal;
  final double roundedTotal;
  final double originalTip;
  final double adjustedTip;
  final String roundingLevel;
  final String roundingDescription;
  final double difference;
  
  const SmartRoundingResult({
    required this.originalTotal,
    required this.roundedTotal,
    required this.originalTip,
    required this.adjustedTip,
    required this.roundingLevel,
    required this.roundingDescription,
    required this.difference,
  });
  
  bool get wasRounded => difference.abs() > 0.01;
}