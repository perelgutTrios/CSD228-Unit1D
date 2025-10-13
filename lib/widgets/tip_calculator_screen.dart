import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/tip_calculator_model.dart';
import 'input_section.dart';
import 'recommendations_section.dart';
import 'payment_breakdown_section.dart';
import 'results_screen.dart';

class TipCalculatorScreen extends StatelessWidget {
  const TipCalculatorScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<TipCalculatorModel>(
      builder: (context, model, child) {
        // Show results screen if a tip is selected
        if (model.currentScreen == AppScreen.results) {
          return const ResultsScreen();
        }
        
        // Otherwise show input screen
        return Scaffold(
          body: SafeArea(
            child: LayoutBuilder(
              builder: (context, constraints) {
                // Responsive layout based on screen width
                final isWideScreen = constraints.maxWidth > 900;
                
                return isWideScreen
                    ? _buildWideScreenLayout(context)
                    : _buildNarrowScreenLayout(context);
              },
            ),
          ),
        );
      },
    );
  }
  
  Widget _buildWideScreenLayout(BuildContext context) {
    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Left side - Input section
          Expanded(
            flex: 1,
            child: Card(
              child: Padding(
                padding: const EdgeInsets.all(24.0),
                child: Column(
                  mainAxisSize: MainAxisSize.max,
                  children: [
                    _buildHeader(context),
                    const SizedBox(height: 24),
                    const Expanded(child: InputSection()),
                  ],
                ),
              ),
            ),
          ),
          
          const SizedBox(width: 24),
          
          // Right side - Recommendations and breakdown
          Expanded(
            flex: 1,
            child: Column(
              children: [
                Consumer<TipCalculatorModel>(
                  builder: (context, model, child) {
                    if (!model.hasRecommendations) {
                      return Card(
                        child: Padding(
                          padding: const EdgeInsets.all(24.0),
                          child: Column(
                            children: [
                              Icon(
                                Icons.calculate,
                                size: 64,
                                color: Theme.of(context).colorScheme.primary.withValues(alpha: 0.5),
                              ),
                              const SizedBox(height: 16),
                              Text(
                                'Enter bill amount to see recommendations',
                                style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                                  color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.7),
                                ),
                                textAlign: TextAlign.center,
                              ),
                            ],
                          ),
                        ),
                      );
                    }
                    
                    return const Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        RecommendationsSection(),
                        SizedBox(height: 16),
                        PaymentBreakdownSection(),
                      ],
                    );
                  },
                ),
              ],
            ),
          ),
        ],
      ),
    ),
    );
  }
  
  Widget _buildNarrowScreenLayout(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        children: [
          Card(
            child: Padding(
              padding: const EdgeInsets.all(20.0),
              child: Column(
                children: [
                  _buildHeader(context),
                  const SizedBox(height: 20),
                  const InputSection(),
                ],
              ),
            ),
          ),
          
          const SizedBox(height: 16),
          
          Consumer<TipCalculatorModel>(
            builder: (context, model, child) {
              if (!model.hasRecommendations) {
                return const SizedBox.shrink();
              }
              
              return const Column(
                children: [
                  RecommendationsSection(),
                  SizedBox(height: 16),
                  PaymentBreakdownSection(),
                ],
              );
            },
          ),
        ],
      ),
    );
  }
  
  Widget _buildHeader(BuildContext context) {
    return Column(
      children: [
        Text(
          '💰 Tip Calculator',
          style: Theme.of(context).textTheme.headlineLarge?.copyWith(
            fontSize: 28,
            fontWeight: FontWeight.bold,
          ),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 8),
        Text(
          'Smart rounding & bill splitting',
          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
            fontSize: 16,
          ),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }
}