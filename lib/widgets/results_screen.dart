import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import '../models/tip_calculator_model.dart';
import '../utils/currency_formatter.dart';

class ResultsScreen extends StatefulWidget {
  const ResultsScreen({super.key});

  @override
  State<ResultsScreen> createState() => _ResultsScreenState();
}

class _ResultsScreenState extends State<ResultsScreen> {
  final TextEditingController _tipController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Consumer<TipCalculatorModel>(
      builder: (context, model, child) {
        final breakdown = model.paymentBreakdown;
        if (breakdown == null) {
          return const Center(child: Text('No calculation available'));
        }

        // Update tip amount in controller when breakdown changes
        final currentTipText = breakdown.adjustedTip.toStringAsFixed(2);
        if (_tipController.text != currentTipText) {
          _tipController.text = currentTipText;
        }

        return Scaffold(
          appBar: AppBar(
            title: const Text('💰 Tip Calculation Results'),
            leading: IconButton(
              icon: const Icon(Icons.arrow_back),
              onPressed: () => model.goBackToInput(),
            ),
          ),
          body: SingleChildScrollView(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Main Results Card
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(20.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '📋 Payment Summary',
                          style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 20),
                        
                        // Bill breakdown
                        _buildAmountRow('Bill Amount:', breakdown.billAmount),
                        const SizedBox(height: 8),
                        _buildAmountRow('Tax Amount:', breakdown.taxAmount),
                        const SizedBox(height: 8),
                        _buildAmountRow('Tip Amount:', breakdown.adjustedTip, isHighlight: true),
                        const Divider(height: 32),
                        _buildAmountRow('Total Amount:', breakdown.adjustedTotal, isTotal: true),
                        
                        const SizedBox(height: 24),
                        
                        // Per person breakdown
                        Container(
                          width: double.infinity,
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: const Color(0xFF2ECC71).withOpacity(0.1),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Column(
                            children: [
                              Text(
                                'Per Person (${model.numberOfGuests} guests)',
                                style: const TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.w600,
                                  color: Color(0xFF2ECC71),
                                ),
                              ),
                              const SizedBox(height: 8),
                              Text(
                                CurrencyFormatter.format(breakdown.roundedPerPerson),
                                style: const TextStyle(
                                  fontSize: 32,
                                  fontWeight: FontWeight.bold,
                                  color: Color(0xFF2ECC71),
                                  fontFamily: 'monospace',
                                ),
                              ),
                            ],
                          ),
                        ),
                        
                        const SizedBox(height: 16),
                        
                        // Tip percentage
                        Text(
                          'Actual tip: ${breakdown.actualTipPercentage.toStringAsFixed(1)}%',
                          style: const TextStyle(
                            fontSize: 16,
                            color: Color(0xFFBDC3C7),
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ],
                    ),
                  ),
                ),
                
                const SizedBox(height: 20),
                
                // Adjust Tip Card
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(20.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '✏️ Adjust Tip Amount',
                          style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 16),
                        
                        Column(
                          children: [
                            TextField(
                              controller: _tipController,
                              keyboardType: const TextInputType.numberWithOptions(decimal: true),
                              inputFormatters: [
                                FilteringTextInputFormatter.allow(RegExp(r'[0-9.]')),
                              ],
                              decoration: const InputDecoration(
                                labelText: 'Tip Amount',
                                prefixText: '\$ ',
                                border: OutlineInputBorder(),
                              ),
                              style: const TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                            const SizedBox(height: 16),
                            
                            // Three adjustment buttons
                            Row(
                              children: [
                                Expanded(
                                  child: ElevatedButton(
                                    onPressed: () {
                                      final amount = double.tryParse(_tipController.text) ?? 0.0;
                                      model.updateTipAmount(amount, TipAdjustmentMode.tipPerPerson);
                                    },
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: const Color(0xFF2ECC71),
                                      padding: const EdgeInsets.symmetric(vertical: 12),
                                    ),
                                    child: const Text(
                                      'Tip Per\nPerson',
                                      textAlign: TextAlign.center,
                                      style: TextStyle(
                                        fontSize: 14,
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                  ),
                                ),
                                const SizedBox(width: 8),
                                Expanded(
                                  child: ElevatedButton(
                                    onPressed: () {
                                      final amount = double.tryParse(_tipController.text) ?? 0.0;
                                      model.updateTipAmount(amount, TipAdjustmentMode.exactTip);
                                    },
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: const Color(0xFF3498DB),
                                      padding: const EdgeInsets.symmetric(vertical: 12),
                                    ),
                                    child: const Text(
                                      'Exact\nTip',
                                      textAlign: TextAlign.center,
                                      style: TextStyle(
                                        fontSize: 14,
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                  ),
                                ),
                                const SizedBox(width: 8),
                                Expanded(
                                  child: ElevatedButton(
                                    onPressed: () {
                                      final amount = double.tryParse(_tipController.text) ?? 0.0;
                                      model.updateTipAmount(amount, TipAdjustmentMode.roundOut);
                                    },
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: const Color(0xFF9B59B6),
                                      padding: const EdgeInsets.symmetric(vertical: 12),
                                    ),
                                    child: const Text(
                                      'Round Out\nBill',
                                      textAlign: TextAlign.center,
                                      style: TextStyle(
                                        fontSize: 14,
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
                
                const SizedBox(height: 20),
                
                // Back button
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () => model.goBackToInput(),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF95A5A6),
                      padding: const EdgeInsets.symmetric(vertical: 16),
                    ),
                    child: const Text(
                      'Calculate Different Tip',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildAmountRow(String label, double amount, {bool isTotal = false, bool isHighlight = false}) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          label,
          style: TextStyle(
            fontSize: isTotal ? 18 : 16,
            fontWeight: isTotal ? FontWeight.bold : FontWeight.w500,
            color: isTotal 
                ? const Color(0xFF2ECC71) 
                : isHighlight 
                    ? const Color(0xFF3498DB)
                    : const Color(0xFFBDC3C7),
          ),
        ),
        Text(
          CurrencyFormatter.format(amount),
          style: TextStyle(
            fontSize: isTotal ? 20 : 18,
            fontWeight: FontWeight.bold,
            color: isTotal 
                ? const Color(0xFF2ECC71) 
                : isHighlight 
                    ? const Color(0xFF3498DB)
                    : const Color(0xFFECF0F1),
            fontFamily: 'monospace',
          ),
        ),
      ],
    );
  }

  @override
  void dispose() {
    _tipController.dispose();
    super.dispose();
  }
}