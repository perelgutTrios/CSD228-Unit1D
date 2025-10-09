import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import '../models/tip_calculator_model.dart';
import '../utils/currency_formatter.dart';

class InputSection extends StatefulWidget {
  const InputSection({super.key});

  @override
  State<InputSection> createState() => _InputSectionState();
}

class _InputSectionState extends State<InputSection> {
  final TextEditingController _billController = TextEditingController();
  final TextEditingController _taxController = TextEditingController();
  
  @override
  void dispose() {
    _billController.dispose();
    _taxController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<TipCalculatorModel>(
      builder: (context, model, child) {
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Bill Amount Input
            _buildAmountInput(
              label: '💵 a) Bill Amount (before tax)',
              controller: _billController,
              onChanged: (value) {
                model.setBillAmount(CurrencyFormatter.parse(value));
              },
            ),
            
            const SizedBox(height: 20),
            
            // Tax Amount Input
            _buildAmountInput(
              label: '📊 b) Tax Amount',
              controller: _taxController,
              onChanged: (value) {
                model.setTaxAmount(CurrencyFormatter.parse(value));
              },
            ),
            
            const SizedBox(height: 20),
            
            // Total Bill Display
            _buildTotalDisplay(context, model.totalBill),
            
            const SizedBox(height: 24),
            
            // Number of Guests Selector
            _buildGuestSelector(context, model),
            
            const SizedBox(height: 24),
            
            // Show Tips Button
            _buildShowTipsButton(context, model),
          ],
        );
      },
    );
  }
  
  Widget _buildAmountInput({
    required String label,
    required TextEditingController controller,
    required ValueChanged<String> onChanged,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: const TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w600,
            color: Color(0xFFECF0F1),
          ),
        ),
        const SizedBox(height: 8),
        TextField(
          controller: controller,
          keyboardType: const TextInputType.numberWithOptions(decimal: true),
          inputFormatters: [
            FilteringTextInputFormatter.allow(RegExp(r'[0-9.]')),
          ],
          decoration: const InputDecoration(
            prefixIcon: Icon(Icons.attach_money, color: Color(0xFFBDC3C7)),
            hintText: '0.00',
            contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 16),
          ),
          style: const TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.w600,
            color: Color(0xFFECF0F1),
          ),
          onChanged: onChanged,
        ),
      ],
    );
  }
  
  Widget _buildTotalDisplay(BuildContext context, double total) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          '🧾 c) Total Bill',
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w600,
            color: Color(0xFFECF0F1),
          ),
        ),
        const SizedBox(height: 8),
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: const Color(0xFF1A252F),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: total > 0 ? const Color(0xFF00FF41) : const Color(0xFF27AE60),
              width: 2,
            ),
            boxShadow: total > 0
                ? [
                    BoxShadow(
                      color: const Color(0xFF00FF41).withOpacity(0.3),
                      blurRadius: 8,
                      spreadRadius: 0,
                    ),
                  ]
                : null,
          ),
          child: Text(
            CurrencyFormatter.format(total),
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              fontFamily: 'monospace',
              color: total > 0 ? const Color(0xFF00FF41) : const Color(0xFF2ECC71),
              letterSpacing: 1.2,
            ),
            textAlign: TextAlign.center,
          ),
        ),
      ],
    );
  }
  
  Widget _buildGuestSelector(BuildContext context, TipCalculatorModel model) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          '👥 d) Number of Guests',
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w600,
            color: Color(0xFFECF0F1),
          ),
        ),
        const SizedBox(height: 12),
        LayoutBuilder(
          builder: (context, constraints) {
            // Responsive grid based on available width
            final crossAxisCount = constraints.maxWidth > 600 ? 6 : 
                                  constraints.maxWidth > 400 ? 4 : 3;
            
            return GridView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: crossAxisCount,
                crossAxisSpacing: 8,
                mainAxisSpacing: 8,
                childAspectRatio: 2.0,
              ),
              itemCount: 7, // 1-6 guests + custom
              itemBuilder: (context, index) {
                if (index < 6) {
                  final guestCount = index + 1;
                  final isSelected = model.numberOfGuests == guestCount;
                  
                  return _buildGuestButton(
                    context,
                    guestCount.toString(),
                    isSelected,
                    () => model.setNumberOfGuests(guestCount),
                  );
                } else {
                  // Custom guest count button
                  final isSelected = model.numberOfGuests > 6;
                  return _buildGuestButton(
                    context,
                    '6+',
                    isSelected,
                    () => _showCustomGuestDialog(context, model),
                  );
                }
              },
            );
          },
        ),
      ],
    );
  }
  
  Widget _buildGuestButton(
    BuildContext context,
    String label,
    bool isSelected,
    VoidCallback onTap,
  ) {
    return Material(
      color: isSelected ? const Color(0xFF3498DB) : const Color(0xFF2C3E50),
      borderRadius: BorderRadius.circular(8),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(8),
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(8),
            border: Border.all(
              color: isSelected ? const Color(0xFF2980B9) : const Color(0xFF34495E),
              width: 2,
            ),
            boxShadow: isSelected
                ? [
                    BoxShadow(
                      color: const Color(0xFF3498DB).withOpacity(0.4),
                      blurRadius: 8,
                      spreadRadius: 0,
                    ),
                  ]
                : null,
          ),
          child: Center(
            child: Text(
              label,
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w600,
                color: isSelected ? Colors.white : const Color(0xFFECF0F1),
              ),
            ),
          ),
        ),
      ),
    );
  }
  
  Widget _buildShowTipsButton(BuildContext context, TipCalculatorModel model) {
    return SizedBox(
      width: double.infinity,
      height: 56,
      child: ElevatedButton(
        onPressed: model.hasValidBill ? () => model.generateRecommendations() : null,
        style: ElevatedButton.styleFrom(
          backgroundColor: model.hasValidBill 
              ? const Color(0xFF2ECC71)
              : const Color(0xFF95A5A6),
          foregroundColor: Colors.white,
          disabledBackgroundColor: const Color(0xFF95A5A6),
          disabledForegroundColor: const Color(0xFF2C3E50),
          elevation: model.hasValidBill ? 4 : 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.calculate,
              size: 24,
              color: model.hasValidBill ? Colors.white : const Color(0xFF2C3E50),
            ),
            const SizedBox(width: 12),
            Text(
              '🎯 Show Recommended Tips',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: model.hasValidBill ? Colors.white : const Color(0xFF2C3E50),
              ),
            ),
          ],
        ),
      ),
    );
  }
  
  void _showCustomGuestDialog(BuildContext context, TipCalculatorModel model) {
    final controller = TextEditingController(text: model.numberOfGuests.toString());
    
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Custom Guest Count'),
        content: TextField(
          controller: controller,
          keyboardType: TextInputType.number,
          inputFormatters: [FilteringTextInputFormatter.digitsOnly],
          decoration: const InputDecoration(
            labelText: 'Number of guests (1-50)',
            hintText: '7',
          ),
          autofocus: true,
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              final guests = int.tryParse(controller.text) ?? 1;
              model.setNumberOfGuests(guests.clamp(1, 50));
              Navigator.of(context).pop();
            },
            child: const Text('Set'),
          ),
        ],
      ),
    );
  }
}