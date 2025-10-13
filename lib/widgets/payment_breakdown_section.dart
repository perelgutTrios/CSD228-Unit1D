import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import '../models/tip_calculator_model.dart';
import '../utils/currency_formatter.dart';

class PaymentBreakdownSection extends StatelessWidget {
  const PaymentBreakdownSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<TipCalculatorModel>(
      builder: (context, model, child) {
        final breakdown = model.paymentBreakdown;
        if (breakdown == null) {
          return const SizedBox.shrink();
        }

        return Card(
          child: Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Header
                Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            '📋 Payment Breakdown',
                            style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                              fontSize: 22,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            'Selected: ${breakdown.tipOptionLabel}',
                            style: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w600,
                              color: Color(0xFF2ECC71),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),

                const SizedBox(height: 20),

                // Breakdown details
                _buildBreakdownLine('Bill (before tax):', breakdown.billAmount),
                const SizedBox(height: 8),
                _buildBreakdownLine('Tax:', breakdown.taxAmount),
                const SizedBox(height: 8),
                _buildBreakdownLine(
                  'Tip:',
                  breakdown.adjustedTip,
                  subtitle: _buildAdjustmentSubtitle(
                    breakdown.originalTip,
                    breakdown.adjustedTip,
                  ),
                ),

                const SizedBox(height: 12),

                // Separator
                const Divider(
                  color: Color(0xFF2C3E50),
                  thickness: 2,
                ),

                const SizedBox(height: 12),

                // Total
                _buildBreakdownLine(
                  'Total Payment:',
                  breakdown.adjustedTotal,
                  isTotal: true,
                ),

                const SizedBox(height: 20),

                // Per person section
                _buildPerPersonSection(breakdown),

                const SizedBox(height: 16),

                // Tip percentage info
                _buildTipPercentageInfo(breakdown),

                const SizedBox(height: 20),

                // Action buttons
                _buildActionButtons(context, model, breakdown),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildBreakdownLine(
    String label,
    double amount, {
    bool isTotal = false,
    Widget? subtitle,
  }) {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              label,
              style: TextStyle(
                fontSize: isTotal ? 18 : 16,
                fontWeight: isTotal ? FontWeight.bold : FontWeight.w500,
                color: isTotal ? const Color(0xFF2ECC71) : const Color(0xFFECF0F1),
              ),
            ),
            Text(
              CurrencyFormatter.format(amount),
              style: TextStyle(
                fontSize: isTotal ? 20 : 18,
                fontWeight: FontWeight.bold,
                color: isTotal ? const Color(0xFF2ECC71) : const Color(0xFFECF0F1),
                fontFamily: 'monospace',
              ),
            ),
          ],
        ),
        if (subtitle != null) ...[
          const SizedBox(height: 4),
          Align(
            alignment: Alignment.centerRight,
            child: subtitle,
          ),
        ],
      ],
    );
  }

  Widget? _buildAdjustmentSubtitle(double original, double adjusted) {
    if ((original - adjusted).abs() <= 0.01) return null;

    return Text(
      '(adjusted from ${CurrencyFormatter.format(original)})',
      style: const TextStyle(
        fontSize: 12,
        fontStyle: FontStyle.italic,
        color: Color(0xFF95A5A6),
      ),
    );
  }

  Widget _buildPerPersonSection(PaymentBreakdown breakdown) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF2ECC71).withValues(alpha: 0.1),
        border: Border.all(color: const Color(0xFF2ECC71), width: 1),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        children: [
          Row(
            children: [
              const Icon(
                Icons.group,
                color: Color(0xFFECF0F1),
                size: 20,
              ),
              const SizedBox(width: 8),
              Text(
                'For ${breakdown.numberOfGuests} guest${breakdown.numberOfGuests != 1 ? 's' : ''}:',
                style: const TextStyle(
                  fontSize: 16,
                  color: Color(0xFFECF0F1),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'Each person pays:',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF2ECC71),
                ),
              ),
              Text(
                CurrencyFormatter.format(breakdown.roundedPerPerson),
                style: const TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF2ECC71),
                  fontFamily: 'monospace',
                ),
              ),
            ],
          ),
          if ((breakdown.roundedPerPerson - breakdown.originalPerPerson).abs() > 0.01) ...[
            const SizedBox(height: 4),
            Align(
              alignment: Alignment.centerRight,
              child: Text(
                '(rounded from ${CurrencyFormatter.format(breakdown.originalPerPerson)})',
                style: const TextStyle(
                  fontSize: 12,
                  fontStyle: FontStyle.italic,
                  color: Color(0xFF95A5A6),
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildTipPercentageInfo(PaymentBreakdown breakdown) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF2ECC71).withValues(alpha: 0.1),
        border: Border.all(color: const Color(0xFF2ECC71), width: 1),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Text(
        'The actual tip percentage is ${breakdown.actualTipPercentage.toStringAsFixed(1)}% with a total tip of ${CurrencyFormatter.format(breakdown.adjustedTip)}',
        style: const TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.w600,
          color: Color(0xFF2ECC71),
          fontStyle: FontStyle.italic,
        ),
        textAlign: TextAlign.center,
      ),
    );
  }

  Widget _buildActionButtons(
    BuildContext context,
    TipCalculatorModel model,
    PaymentBreakdown breakdown,
  ) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final isWide = constraints.maxWidth > 400;
        
        if (isWide) {
          return Row(
            children: [
              Expanded(
                child: _buildCopyButton(context, breakdown),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _buildNewCalculationButton(context, model),
              ),
            ],
          );
        } else {
          return Column(
            children: [
              SizedBox(
                width: double.infinity,
                child: _buildCopyButton(context, breakdown),
              ),
              const SizedBox(height: 12),
              SizedBox(
                width: double.infinity,
                child: _buildNewCalculationButton(context, model),
              ),
            ],
          );
        }
      },
    );
  }

  Widget _buildCopyButton(BuildContext context, PaymentBreakdown breakdown) {
    return ElevatedButton.icon(
      onPressed: () => _copyBreakdown(context, breakdown),
      icon: const Icon(Icons.copy),
      label: const Text('Copy Breakdown'),
      style: ElevatedButton.styleFrom(
        backgroundColor: const Color(0xFF3498DB),
        foregroundColor: Colors.white,
        padding: const EdgeInsets.symmetric(vertical: 12),
      ),
    );
  }

  Widget _buildNewCalculationButton(BuildContext context, TipCalculatorModel model) {
    return ElevatedButton.icon(
      onPressed: () => _showResetConfirmation(context, model),
      icon: const Icon(Icons.refresh),
      label: const Text('New Calculation'),
      style: ElevatedButton.styleFrom(
        backgroundColor: const Color(0xFF95A5A6),
        foregroundColor: Colors.white,
        padding: const EdgeInsets.symmetric(vertical: 12),
      ),
    );
  }

  void _copyBreakdown(BuildContext context, PaymentBreakdown breakdown) async {
    await Clipboard.setData(ClipboardData(text: breakdown.generateSummaryText()));
    
    if (context.mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Row(
            children: [
              Icon(Icons.check_circle, color: Colors.white),
              SizedBox(width: 8),
              Text('Payment breakdown copied to clipboard!'),
            ],
          ),
          backgroundColor: Color(0xFF2ECC71),
          duration: Duration(seconds: 2),
        ),
      );
    }
  }

  void _showResetConfirmation(BuildContext context, TipCalculatorModel model) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('New Calculation'),
        content: const Text('Are you sure you want to start a new calculation? This will clear all current values.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              model.resetCalculation();
              Navigator.of(context).pop();
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF2ECC71),
            ),
            child: const Text('Start New'),
          ),
        ],
      ),
    );
  }
}