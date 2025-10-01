/**
 * Integration Tests for Calculator Application
 * Tests component interactions and complete user workflows
 */

// Import the Calculator class
const Calculator = require('../script.js');

describe('Calculator Integration Tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('Complete User Workflows', () => {
    test('Complete addition workflow: 25 + 17 = 42', () => {
      // Enter first number: 25
      calculator.inputNumber(2);
      calculator.inputNumber(5);
      expect(document.getElementById('screen').textContent).toBe('25');
      
      // Enter operator: +
      calculator.inputOperator('+');
      expect(document.getElementById('plus').classList.contains('selected')).toBe(true);
      expect(calculator.waitingForNewValue).toBe(true);
      
      // Enter second number: 17
      calculator.inputNumber(1);
      calculator.inputNumber(7);
      expect(document.getElementById('screen').textContent).toBe('17');
      
      // Calculate result
      calculator.calculate();
      expect(document.getElementById('screen').textContent).toBe('42');
      expect(calculator.currentValue).toBe(42);
      expect(document.getElementById('plus').classList.contains('selected')).toBe(false);
    });

    test('Complete subtraction workflow: 100 - 33 = 67', () => {
      // Enter first number: 100
      calculator.inputNumber(1);
      calculator.inputNumber(0);
      calculator.inputNumber(0);
      expect(document.getElementById('screen').textContent).toBe('100');
      
      // Enter operator: -
      calculator.inputOperator('-');
      expect(document.getElementById('minus').classList.contains('selected')).toBe(true);
      
      // Enter second number: 33
      calculator.inputNumber(3);
      calculator.inputNumber(3);
      expect(document.getElementById('screen').textContent).toBe('33');
      
      // Calculate result
      calculator.calculate();
      expect(document.getElementById('screen').textContent).toBe('67');
      expect(calculator.currentValue).toBe(67);
    });

    test('Chain calculation workflow: 10 + 5 - 3 = 12', () => {
      // First operation: 10 + 5
      calculator.inputNumber(1);
      calculator.inputNumber(0);
      calculator.inputOperator('+');
      calculator.inputNumber(5);
      calculator.calculate();
      expect(calculator.currentValue).toBe(15);
      
      // Chain operation: result - 3
      calculator.inputOperator('-');
      calculator.inputNumber(3);
      calculator.calculate();
      expect(calculator.currentValue).toBe(12);
      expect(document.getElementById('screen').textContent).toBe('12');
    });

    test('Reset workflow during operation', () => {
      // Start calculation
      calculator.inputNumber(5);
      calculator.inputOperator('+');
      calculator.inputNumber(3);
      
      // Reset before calculating
      calculator.reset();
      
      // Verify clean state
      expect(calculator.currentValue).toBe(0);
      expect(calculator.previousValue).toBe(null);
      expect(calculator.operator).toBe(null);
      expect(document.getElementById('screen').textContent).toBe('0');
      
      // Should be able to start new calculation
      calculator.inputNumber(7);
      calculator.inputOperator('+');
      calculator.inputNumber(2);
      calculator.calculate();
      expect(calculator.currentValue).toBe(9);
    });
  });

  describe('Error Condition Integration Tests', () => {
    test('Overflow during number entry integration', () => {
      // Enter maximum digits
      const maxDigits = [9, 9, 9, 9, 9, 9, 9, 9]; // 8 digits
      maxDigits.forEach(digit => calculator.inputNumber(digit));
      expect(calculator.currentValue).toBe(99999999);
      
      // Try to add another digit
      calculator.inputNumber(9);
      expect(document.getElementById('screen').textContent).toBe('OVERFLOW');
      expect(calculator.currentValue).toBe(0);
      expect(calculator.waitingForNewValue).toBe(true);
      
      // Should be able to continue after overflow
      calculator.inputNumber(5);
      expect(calculator.currentValue).toBe(5);
      expect(document.getElementById('screen').textContent).toBe('5');
    });

    test('Overflow during calculation integration', () => {
      // Set up for overflow calculation
      calculator.currentValue = 50000000;
      calculator.previousValue = 50000000;
      calculator.operator = '+';
      calculator.waitingForNewValue = false;
      
      calculator.calculate();
      
      expect(document.getElementById('screen').textContent).toBe('OVERFLOW');
      expect(calculator.currentValue).toBe(0);
      
      // Should be able to continue after overflow
      calculator.inputNumber(3);
      expect(calculator.currentValue).toBe(3);
    });

    test('Negative result handling integration', () => {
      // Calculate negative result: 5 - 10 = -5
      calculator.inputNumber(5);
      calculator.inputOperator('-');
      calculator.inputNumber(1);
      calculator.inputNumber(0);
      calculator.calculate();
      
      expect(calculator.currentValue).toBe(-5);
      expect(document.getElementById('screen').textContent).toBe('-5');
      
      // Should be able to continue with negative result
      calculator.inputOperator('+');
      calculator.inputNumber(8);
      calculator.calculate();
      expect(calculator.currentValue).toBe(3);
    });
  });

  describe('State Management Integration Tests', () => {
    test('Operator selection state management', () => {
      calculator.inputNumber(5);
      
      // Select addition
      calculator.inputOperator('+');
      expect(document.getElementById('plus').classList.contains('selected')).toBe(true);
      expect(document.getElementById('minus').classList.contains('selected')).toBe(false);
      
      // Change to subtraction
      calculator.inputOperator('-');
      expect(document.getElementById('plus').classList.contains('selected')).toBe(false);
      expect(document.getElementById('minus').classList.contains('selected')).toBe(true);
      
      // Enter number should clear selection
      calculator.inputNumber(3);
      expect(document.getElementById('plus').classList.contains('selected')).toBe(false);
      expect(document.getElementById('minus').classList.contains('selected')).toBe(false);
    });

    test('WaitingForNewValue state transitions', () => {
      expect(calculator.waitingForNewValue).toBe(false);
      
      // After operator, should wait for new value
      calculator.inputNumber(5);
      calculator.inputOperator('+');
      expect(calculator.waitingForNewValue).toBe(true);
      
      // After number entry, should not wait
      calculator.inputNumber(3);
      expect(calculator.waitingForNewValue).toBe(false);
      
      // After calculation, should wait for new value
      calculator.calculate();
      expect(calculator.waitingForNewValue).toBe(true);
      
      // New number should clear waiting state
      calculator.inputNumber(7);
      expect(calculator.waitingForNewValue).toBe(false);
    });
  });

  describe('Edge Case Integration Tests', () => {
    test('Multiple operator presses integration', () => {
      calculator.inputNumber(5);
      calculator.inputOperator('+');
      calculator.inputOperator('-'); // Change operator
      calculator.inputOperator('+'); // Change again
      
      expect(calculator.operator).toBe('+');
      expect(calculator.previousValue).toBe(5);
      expect(document.getElementById('plus').classList.contains('selected')).toBe(true);
    });

    test('Calculate without complete operation', () => {
      // Just operator, no second operand
      calculator.inputNumber(5);
      calculator.inputOperator('+');
      calculator.calculate(); // Should do nothing
      
      expect(calculator.currentValue).toBe(5);
      expect(calculator.operator).toBe('+');
      expect(calculator.previousValue).toBe(5);
    });

    test('Zero handling in calculations', () => {
      // Addition with zero
      calculator.inputNumber(5);
      calculator.inputOperator('+');
      calculator.inputNumber(0);
      calculator.calculate();
      expect(calculator.currentValue).toBe(5);
      
      // Subtraction with zero
      calculator.reset();
      calculator.inputNumber(5);
      calculator.inputOperator('-');
      calculator.inputNumber(0);
      calculator.calculate();
      expect(calculator.currentValue).toBe(5);
      
      // Zero minus number
      calculator.reset();
      calculator.inputNumber(0);
      calculator.inputOperator('-');
      calculator.inputNumber(3);
      calculator.calculate();
      expect(calculator.currentValue).toBe(-3);
    });
  });

  describe('Display Update Integration Tests', () => {
    test('Display updates correctly throughout operation', () => {
      const screen = document.getElementById('screen');
      
      // Initial state
      expect(screen.textContent).toBe('0');
      
      // Number entry
      calculator.inputNumber(1);
      expect(screen.textContent).toBe('1');
      
      calculator.inputNumber(2);
      expect(screen.textContent).toBe('12');
      
      // Operator doesn't change display immediately
      calculator.inputOperator('+');
      expect(screen.textContent).toBe('12');
      
      // New number entry
      calculator.inputNumber(3);
      expect(screen.textContent).toBe('3');
      
      calculator.inputNumber(4);
      expect(screen.textContent).toBe('34');
      
      // Calculation updates display
      calculator.calculate();
      expect(screen.textContent).toBe('46');
    });

    test('Error state display integration', () => {
      const screen = document.getElementById('screen');
      
      // Trigger overflow
      calculator.currentValue = 999999999; // 9 digits
      calculator.updateDisplay();
      expect(screen.textContent).toBe('OVERFLOW');
      expect(screen.classList.contains('overflow')).toBe(true);
      
      // Reset should clear error state
      calculator.reset();
      expect(screen.textContent).toBe('0');
      expect(screen.classList.contains('overflow')).toBe(false);
    });
  });
});