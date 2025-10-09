import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import '../models/tip_calculator_model.dart';
import '../utils/currency_formatter.dart';

class RecommendationsSection extends StatelessWidget {
  const RecommendationsSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<TipCalculatorModel>(
      builder: (context, model, child) {
        if (!model.hasRecommendations) {
          return const SizedBox.shrink();
        }

        return Card(
          child: Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  '💡 Tip Recommendations',
                  style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                    fontSize: 22,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 8),
                if (model.recommendations.isNotEmpty)
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: const Color(0xFFF39C12),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      '${model.recommendations.first.roundingInfo.roundingDescription} (makes payment easier)',
                      style: const TextStyle(
                        color: Color(0xFF2C3E50),
                        fontWeight: FontWeight.w600,
                        fontSize: 14,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ),
                const SizedBox(height: 16),
                ...model.recommendations.map((recommendation) =>
                    _buildRecommendationCard(context, model, recommendation)),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildRecommendationCard(
    BuildContext context,
    TipCalculatorModel model,
    TipRecommendation recommendation,
  ) {
    final isSelected = model.selectedTipOption == recommendation.tipRate.key;
    final isCustom = recommendation.tipRate.key == 'custom';

    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      decoration: BoxDecoration(
        color: const Color(0xFF34495E),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: isSelected ? const Color(0xFF2ECC71) : const Color(0xFF2C3E50),
          width: 2,
        ),
        boxShadow: isSelected
            ? [
                BoxShadow(
                  color: const Color(0xFF2ECC71).withOpacity(0.2),
                  blurRadius: 12,
                  spreadRadius: 2,
                ),
              ]
            : null,
      ),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header with tip rate info
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Text(
                    recommendation.tipRate.label,
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w600,
                      color: Color(0xFFECF0F1),
                    ),
                  ),
                ),
                if (isCustom) ...[
                  _buildCustomRateInput(context, model),
                ] else ...[
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: const Color(0xFF3498DB),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Text(
                      recommendation.tipRate.description,
                      style: const TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                        fontSize: 14,
                      ),
                    ),
                  ),
                ],
              ],
            ),

            const SizedBox(height: 12),

            // Suggested tip and total
            _buildAmountRow(
              'Suggested tip:',
              recommendation.suggestedTip,
              subtitle: _buildAdjustmentSubtitle(recommendation.exactTip, recommendation.suggestedTip),
            ),

            const SizedBox(height: 8),

            _buildAmountRow(
              'Total payment:',
              recommendation.suggestedTotal,
              isTotal: true,
              subtitle: _buildAdjustmentSubtitle(recommendation.exactTotal, recommendation.suggestedTotal),
            ),

            const SizedBox(height: 12),

            // User tip override input
            _buildUserTipInput(context, model, recommendation),

            const SizedBox(height: 16),

            // Select button
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () => model.selectTipOption(recommendation.tipRate.key),
                style: ElevatedButton.styleFrom(
                  backgroundColor: isSelected ? const Color(0xFF2ECC71) : const Color(0xFF3498DB),
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 12),
                ),
                child: Text(
                  isSelected ? '✅ Selected' : 'Calculate with this tip',
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCustomRateInput(BuildContext context, TipCalculatorModel model) {
    return Container(
      width: 120,
      child: Row(
        children: [
          Expanded(
            child: TextField(
              keyboardType: const TextInputType.numberWithOptions(decimal: true),
              inputFormatters: [
                FilteringTextInputFormatter.allow(RegExp(r'[0-9.]')),
              ],
              decoration: const InputDecoration(
                contentPadding: EdgeInsets.symmetric(horizontal: 8, vertical: 8),
                isDense: true,
                border: OutlineInputBorder(),
              ),
              style: const TextStyle(fontSize: 14),
              controller: TextEditingController(text: model.customTipRate.toString()),
              onChanged: (value) {
                final rate = double.tryParse(value) ?? 5.0;
                model.setCustomTipRate(rate);
              },
            ),
          ),
          const Padding(
            padding: EdgeInsets.only(left: 4),
            child: Text(
              '%',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: Color(0xFFECF0F1),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAmountRow(
    String label,
    double amount, {
    bool isTotal = false,
    Widget? subtitle,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              label,
              style: TextStyle(
                fontSize: isTotal ? 16 : 14,
                fontWeight: isTotal ? FontWeight.bold : FontWeight.w500,
                color: isTotal ? const Color(0xFF2ECC71) : const Color(0xFFBDC3C7),
              ),
            ),
            Text(
              CurrencyFormatter.format(amount),
              style: TextStyle(
                fontSize: isTotal ? 18 : 16,
                fontWeight: FontWeight.bold,
                color: isTotal ? const Color(0xFF2ECC71) : const Color(0xFFECF0F1),
                fontFamily: 'monospace',
              ),
            ),
          ],
        ),
        if (subtitle != null) ...[
          const SizedBox(height: 2),
          subtitle,
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

  Widget _buildUserTipInput(
    BuildContext context,
    TipCalculatorModel model,
    TipRecommendation recommendation,
  ) {
    final controller = TextEditingController(
      text: recommendation.userTip.toStringAsFixed(2),
    );

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            const Expanded(
              child: Text(
                'Your tip:',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  color: Color(0xFFECF0F1),
                ),
              ),
            ),
            if (recommendation.isOverridden)
              const Text(
                '✏️ Modified',
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFFF39C12),
                ),
              ),
          ],
        ),
        const SizedBox(height: 8),
        Container(
          width: 140,
          child: TextField(
            controller: controller,
            keyboardType: const TextInputType.numberWithOptions(decimal: true),
            inputFormatters: [
              FilteringTextInputFormatter.allow(RegExp(r'[0-9.]')),
            ],
            decoration: const InputDecoration(
              prefixText: '\$ ',
              contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 12),
              isDense: true,
            ),
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
            ),
            onChanged: (value) {
              final amount = double.tryParse(value) ?? 0.0;
              model.setUserTipOverride(recommendation.tipRate.key, amount);
            },
          ),
        ),
      ],
    );
  }
}