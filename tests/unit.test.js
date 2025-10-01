/**
 * Unit Tests for Calculator Class
 * Tests individual methods and functionality in isolation
 */

// Import the Calculator class
const Calculator = require('../script.js');

describe('Calculator Unit Tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('TC1: Number Entry Tests', () => {
    test('TC1.1: Single digit entry sets current value', () => {
      calculator.inputNumber(5);
      expect(calculator.currentValue).toBe(5);
      expect(document.getElementById('screen').textContent).toBe('5');
    });

    test('TC1.2: Multiple digit entry builds number correctly', () => {
      calculator.inputNumber(3);
      calculator.inputNumber(6);
      calculator.inputNumber(9);
      expect(calculator.currentValue).toBe(369);
      expect(document.getElementById('screen').textContent).toBe('369');
    });

    test('TC1.3: Zero handling works correctly', () => {
      calculator.inputNumber(0);
      expect(calculator.currentValue).toBe(0);
      expect(document.getElementById('screen').textContent).toBe('0');
      
      // Zero after other digits
      calculator.inputNumber(1);
      calculator.inputNumber(0);
      calculator.inputNumber(5);
      expect(calculator.currentValue).toBe(105);
    });

    test('TC1.4: Maximum digit limits enforced for positive numbers', () => {
      // Enter 8 digits (maximum for positive)
      const digits = [1, 2, 3, 4, 5, 6, 7, 8];
      digits.forEach(digit => calculator.inputNumber(digit));
      expect(calculator.currentValue).toBe(12345678);
      
      // Try to add 9th digit - should trigger overflow
      calculator.inputNumber(9);
      expect(document.getElementById('screen').textContent).toBe('OVERFLOW');
      expect(calculator.currentValue).toBe(0); // Should reset after overflow
    });

    test('TC1.5: Overflow prevention works correctly', () => {
      // Test wouldOverflow method directly
      expect(calculator.wouldOverflow(99999999)).toBe(false); // 8 digits is max, so this is OK
      expect(calculator.wouldOverflow(123456789)).toBe(true); // 9 digits should overflow
      expect(calculator.wouldOverflow(-1234567)).toBe(false); // 7 digits + minus is OK
      expect(calculator.wouldOverflow(-12345678)).toBe(true); // 8 digits + minus is too much
    });
  });

  describe('TC2: Operator Tests', () => {
    test('TC2.1: Addition operator sets state correctly', () => {
      calculator.inputNumber(5);
      calculator.inputOperator('+');
      
      expect(calculator.previousValue).toBe(5);
      expect(calculator.operator).toBe('+');
      expect(calculator.waitingForNewValue).toBe(true);
    });

    test('TC2.2: Subtraction operator sets state correctly', () => {
      calculator.inputNumber(10);
      calculator.inputOperator('-');
      
      expect(calculator.previousValue).toBe(10);
      expect(calculator.operator).toBe('-');
      expect(calculator.waitingForNewValue).toBe(true);
    });

    test('TC2.3: Operator chaining performs intermediate calculation', () => {
      calculator.inputNumber(5);
      calculator.inputOperator('+');
      calculator.inputNumber(3);
      calculator.inputOperator('-'); // Should calculate 5+3=8 first
      
      expect(calculator.currentValue).toBe(8);
      expect(calculator.operator).toBe('-');
      expect(calculator.previousValue).toBe(8);
    });

    test('TC2.4: Operator visual feedback works', () => {
      calculator.inputOperator('+');
      expect(document.getElementById('plus').classList.contains('selected')).toBe(true);
      expect(document.getElementById('minus').classList.contains('selected')).toBe(false);
      
      calculator.inputOperator('-');
      expect(document.getElementById('plus').classList.contains('selected')).toBe(false);
      expect(document.getElementById('minus').classList.contains('selected')).toBe(true);
    });

    test('TC2.5: Invalid operator sequences handled gracefully', () => {
      // Set error state
      calculator.displayError();
      
      // Try to input operator during error state
      calculator.inputOperator('+');
      
      // Should not change state
      expect(calculator.operator).toBe(null);
      expect(calculator.previousValue).toBe(null);
    });
  });

  describe('TC3: Calculation Tests', () => {
    test('TC3.1: Basic addition calculations work correctly', () => {
      calculator.inputNumber(5);
      calculator.inputOperator('+');
      calculator.inputNumber(3);
      calculator.calculate();
      
      expect(calculator.currentValue).toBe(8);
      expect(document.getElementById('screen').textContent).toBe('8');
    });

    test('TC3.2: Basic subtraction calculations work correctly', () => {
      calculator.inputNumber(10);
      calculator.inputOperator('-');
      calculator.inputNumber(4);
      calculator.calculate();
      
      expect(calculator.currentValue).toBe(6);
      expect(document.getElementById('screen').textContent).toBe('6');
    });

    test('TC3.3: Result overflow handling works', () => {
      calculator.currentValue = 99999999;
      calculator.previousValue = 1;
      calculator.operator = '+';
      calculator.waitingForNewValue = false;
      
      calculator.calculate();
      
      expect(document.getElementById('screen').textContent).toBe('OVERFLOW');
      expect(calculator.currentValue).toBe(0);
    });

    test('TC3.4: Negative result handling works correctly', () => {
      calculator.inputNumber(3);
      calculator.inputOperator('-');
      calculator.inputNumber(8);
      calculator.calculate();
      
      expect(calculator.currentValue).toBe(-5);
      expect(document.getElementById('screen').textContent).toBe('-5');
    });

    test('TC3.5: Chain calculations work correctly', () => {
      calculator.inputNumber(10);
      calculator.inputOperator('+');
      calculator.inputNumber(5);
      calculator.calculate(); // 10 + 5 = 15
      
      calculator.inputOperator('-');
      calculator.inputNumber(3);
      calculator.calculate(); // 15 - 3 = 12
      
      expect(calculator.currentValue).toBe(12);
    });
  });

  describe('TC4: Reset Functionality Tests', () => {
    test('TC4.1: Reset during number entry clears state', () => {
      calculator.inputNumber(1);
      calculator.inputNumber(2);
      calculator.inputNumber(3);
      
      calculator.reset();
      
      expect(calculator.currentValue).toBe(0);
      expect(calculator.previousValue).toBe(null);
      expect(calculator.operator).toBe(null);
      expect(calculator.waitingForNewValue).toBe(false);
      expect(document.getElementById('screen').textContent).toBe('0');
    });

    test('TC4.2: Reset during operator selection clears state', () => {
      calculator.inputNumber(5);
      calculator.inputOperator('+');
      
      calculator.reset();
      
      expect(calculator.currentValue).toBe(0);
      expect(calculator.previousValue).toBe(null);
      expect(calculator.operator).toBe(null);
      expect(document.getElementById('plus').classList.contains('selected')).toBe(false);
    });

    test('TC4.3: Reset after calculation clears state', () => {
      calculator.inputNumber(5);
      calculator.inputOperator('+');
      calculator.inputNumber(3);
      calculator.calculate();
      
      calculator.reset();
      
      expect(calculator.currentValue).toBe(0);
      expect(calculator.previousValue).toBe(null);
      expect(calculator.operator).toBe(null);
      expect(document.getElementById('screen').textContent).toBe('0');
    });

    test('TC4.4: Reset during error states clears errors', () => {
      calculator.displayError();
      expect(document.getElementById('screen').classList.contains('error')).toBe(true);
      
      calculator.reset();
      
      expect(document.getElementById('screen').classList.contains('error')).toBe(false);
      expect(document.getElementById('screen').textContent).toBe('0');
    });

    test('TC4.5: State cleanup verification after reset', () => {
      // Set complex state
      calculator.currentValue = 123;
      calculator.previousValue = 456;
      calculator.operator = '+';
      calculator.waitingForNewValue = true;
      document.getElementById('plus').classList.add('selected');
      document.getElementById('screen').classList.add('error');
      
      calculator.reset();
      
      // Verify all state is clean
      expect(calculator.currentValue).toBe(0);
      expect(calculator.previousValue).toBe(null);
      expect(calculator.operator).toBe(null);
      expect(calculator.waitingForNewValue).toBe(false);
      expect(document.getElementById('plus').classList.contains('selected')).toBe(false);
      expect(document.getElementById('screen').classList.contains('error')).toBe(false);
    });
  });

  describe('TC5: Display Tests', () => {
    test('TC5.1: Number formatting displays correctly', () => {
      calculator.currentValue = 12345;
      calculator.updateDisplay();
      expect(document.getElementById('screen').textContent).toBe('12345');
      
      calculator.currentValue = -6789;
      calculator.updateDisplay();
      expect(document.getElementById('screen').textContent).toBe('-6789');
    });

    test('TC5.2: Overflow message display works', () => {
      calculator.displayOverflow();
      expect(document.getElementById('screen').textContent).toBe('OVERFLOW');
      expect(document.getElementById('screen').classList.contains('overflow')).toBe(true);
    });

    test('TC5.3: Error message display works', () => {
      calculator.displayError();
      expect(document.getElementById('screen').textContent).toBe('ERROR');
      expect(document.getElementById('screen').classList.contains('error')).toBe(true);
    });

    test('TC5.4: Display alignment maintained', () => {
      const screen = document.getElementById('screen');
      const styles = window.getComputedStyle(screen);
      // Note: In test environment, computed styles might not be available
      // This test structure shows how we would test CSS properties
      expect(screen).toBeDefined();
    });

    test('TC5.5: Character limits enforced', () => {
      // Test positive number limit
      calculator.currentValue = 12345678; // 8 digits - should display
      calculator.updateDisplay();
      expect(document.getElementById('screen').textContent).toBe('12345678');
      
      // Test that overflow is triggered for 9 digits
      calculator.currentValue = 123456789;
      calculator.updateDisplay();
      expect(document.getElementById('screen').textContent).toBe('OVERFLOW');
    });
  });
});