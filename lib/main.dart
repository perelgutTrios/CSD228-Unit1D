import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'models/tip_calculator_model.dart';
import 'widgets/tip_calculator_screen.dart';

void main() {
  runApp(const TipCalculatorApp());
}

class TipCalculatorApp extends StatelessWidget {
  const TipCalculatorApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => TipCalculatorModel(),
      child: MaterialApp(
        title: 'Tip Calculator - Smart Rounding & Bill Splitting',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(
            seedColor: const Color(0xFF2196F3),
            brightness: Brightness.dark,
          ),
          useMaterial3: true,
          fontFamily: 'Roboto',
          
          // Custom theme for dark mode tip calculator
          scaffoldBackgroundColor: const Color(0xFF1A1A1A),
          cardTheme: const CardTheme(
            color: Color(0xFF2C3E50),
            elevation: 8,
            shadowColor: Colors.black54,
          ),
          
          // Input decoration theme
          inputDecorationTheme: InputDecorationTheme(
            filled: true,
            fillColor: const Color(0xFF34495E),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide.none,
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: const BorderSide(color: Color(0xFF3498DB), width: 2),
            ),
            labelStyle: const TextStyle(color: Color(0xFFECF0F1)),
            hintStyle: const TextStyle(color: Color(0xFF7F8C8D)),
          ),
          
          // Elevated button theme
          elevatedButtonTheme: ElevatedButtonThemeData(
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF3498DB),
              foregroundColor: Colors.white,
              elevation: 4,
              padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
          ),
          
          // Text theme
          textTheme: const TextTheme(
            headlineLarge: TextStyle(
              color: Color(0xFFECF0F1),
              fontWeight: FontWeight.bold,
            ),
            headlineMedium: TextStyle(
              color: Color(0xFFECF0F1),
              fontWeight: FontWeight.w600,
            ),
            bodyLarge: TextStyle(color: Color(0xFFECF0F1)),
            bodyMedium: TextStyle(color: Color(0xFFBDC3C7)),
            labelLarge: TextStyle(
              color: Color(0xFFECF0F1),
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
        
        home: const TipCalculatorScreen(),
        
        // Web-specific configuration
        builder: (context, child) {
          return MediaQuery(
            data: MediaQuery.of(context).copyWith(
              // Ensure text scaling doesn't go below readable levels
              textScaler: TextScaler.linear(MediaQuery.of(context).textScaler.scale(1.0).clamp(0.8, 1.5)),
            ),
            child: child!,
          );
        },
      ),
    );
  }
}