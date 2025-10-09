import 'package:intl/intl.dart';

/// Utility class for formatting currency values
class CurrencyFormatter {
  static final NumberFormat _currencyFormat = NumberFormat.currency(
    locale: 'en_US',
    symbol: '\$',
    decimalDigits: 2,
  );
  
  /// Formats a double value as currency (e.g., 123.45 -> "$123.45")
  static String format(double amount) {
    return _currencyFormat.format(amount);
  }
  
  /// Parses a currency string to double (e.g., "$123.45" -> 123.45)
  static double parse(String currencyString) {
    // Remove currency symbols and commas
    final cleanString = currencyString
        .replaceAll('\$', '')
        .replaceAll(',', '')
        .trim();
    
    return double.tryParse(cleanString) ?? 0.0;
  }
  
  /// Validates if a string can be parsed as currency
  static bool isValid(String currencyString) {
    try {
      parse(currencyString);
      return true;
    } catch (e) {
      return false;
    }
  }
}