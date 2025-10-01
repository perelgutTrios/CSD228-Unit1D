/**
 * User Interface Tests for Calculator Application
 * Tests user interactions, button clicks, and visual feedback
 */

// Import the Calculator class
const Calculator = require('../script.js');

describe('Calculator UI Tests', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('TC6: User Interface Tests', () => {
    test('TC6.1: Button responsiveness - number buttons', () => {
      // Test each number button
      for (let i = 0; i <= 9; i++) {
        const btn = document.getElementById(`num${i}`);
        expect(btn).toBeDefined();
        
        // Simulate click
        btn.click();
        expect(calculator.currentValue).toBe(i);
        
        // Reset for next test
        calculator.reset();
      }
    });

    test('TC6.2: Visual feedback for button interactions', () => {
      const plusBtn = document.getElementById('plus');
      const minusBtn = document.getElementById('minus');
      
      // Test operator button visual feedback
      calculator.inputNumber(5);
      
      plusBtn.click();
      expect(plusBtn.classList.contains('selected')).toBe(true);
      expect(minusBtn.classList.contains('selected')).toBe(false);
      
      minusBtn.click();
      expect(plusBtn.classList.contains('selected')).toBe(false);
      expect(minusBtn.classList.contains('selected')).toBe(true);
    });

    test('TC6.3: Button press animation classes', () => {
      const btn = document.getElementById('num5');
      
      // Simulate mousedown event
      const mouseDownEvent = new MouseEvent('mousedown', { bubbles: true });
      btn.dispatchEvent(mouseDownEvent);
      expect(btn.classList.contains('btn-pressed')).toBe(true);
      
      // Simulate mouseup event
      const mouseUpEvent = new MouseEvent('mouseup', { bubbles: true });
      btn.dispatchEvent(mouseUpEvent);
      expect(btn.classList.contains('btn-pressed')).toBe(false);
    });

    test('TC6.4: Reset button functionality', () => {
      // Set up some state
      calculator.inputNumber(1);
      calculator.inputNumber(2);
      calculator.inputNumber(3);
      calculator.inputOperator('+');
      calculator.inputNumber(4);
      
      // Click reset button
      const resetBtn = document.getElementById('reset');
      resetBtn.click();
      
      // Verify reset
      expect(calculator.currentValue).toBe(0);
      expect(calculator.previousValue).toBe(null);
      expect(calculator.operator).toBe(null);
      expect(document.getElementById('screen').textContent).toBe('0');
    });

    test('TC6.5: Calculate button functionality', () => {
      calculator.inputNumber(8);
      calculator.inputOperator('+');
      calculator.inputNumber(7);
      
      // Click calculate button
      const calcBtn = document.getElementById('calculate');
      calcBtn.click();
      
      expect(calculator.currentValue).toBe(15);
      expect(document.getElementById('screen').textContent).toBe('15');
    });
  });

  describe('Button Layout and Accessibility Tests', () => {
    test('All required buttons exist in DOM', () => {
      // Number buttons
      for (let i = 0; i <= 9; i++) {
        expect(document.getElementById(`num${i}`)).toBeDefined();
      }
      
      // Operator buttons
      expect(document.getElementById('plus')).toBeDefined();
      expect(document.getElementById('minus')).toBeDefined();
      
      // Function buttons
      expect(document.getElementById('calculate')).toBeDefined();
      expect(document.getElementById('reset')).toBeDefined();
      
      // Display
      expect(document.getElementById('screen')).toBeDefined();
    });

    test('Button labels are correct', () => {
      expect(document.getElementById('num0').textContent).toBe('0');
      expect(document.getElementById('num5').textContent).toBe('5');
      expect(document.getElementById('num9').textContent).toBe('9');
      expect(document.getElementById('plus').textContent).toBe('+');
      expect(document.getElementById('minus').textContent).toBe('-');
      expect(document.getElementById('calculate').textContent).toBe('Calculate');
      expect(document.getElementById('reset').textContent).toBe('Reset');
    });

    test('Button CSS classes are applied correctly', () => {
      // Number buttons
      expect(document.getElementById('num5').classList.contains('number-btn')).toBe(true);
      expect(document.getElementById('num5').classList.contains('btn')).toBe(true);
      
      // Operator buttons
      expect(document.getElementById('plus').classList.contains('operator-btn')).toBe(true);
      expect(document.getElementById('minus').classList.contains('operator-btn')).toBe(true);
      
      // Function buttons
      expect(document.getElementById('calculate').classList.contains('calculate-btn')).toBe(true);
      expect(document.getElementById('reset').classList.contains('reset-btn')).toBe(true);
      
      // Special buttons
      expect(document.getElementById('num0').classList.contains('zero-btn')).toBe(true);
    });
  });

  describe('Display UI Tests', () => {
    test('Display shows initial value', () => {
      const screen = document.getElementById('screen');
      expect(screen.textContent).toBe('0');
    });

    test('Display updates with number input', () => {
      const screen = document.getElementById('screen');
      
      calculator.inputNumber(1);
      expect(screen.textContent).toBe('1');
      
      calculator.inputNumber(2);
      expect(screen.textContent).toBe('12');
      
      calculator.inputNumber(3);
      expect(screen.textContent).toBe('123');
    });

    test('Display shows error states correctly', () => {
      const screen = document.getElementById('screen');
      
      // Test overflow state
      calculator.displayOverflow();
      expect(screen.textContent).toBe('OVERFLOW');
      expect(screen.classList.contains('overflow')).toBe(true);
      
      // Test error state
      calculator.displayError();
      expect(screen.textContent).toBe('ERROR');
      expect(screen.classList.contains('error')).toBe(true);
      expect(screen.classList.contains('overflow')).toBe(false); // Should clear previous state
    });

    test('Display clears error states correctly', () => {
      const screen = document.getElementById('screen');
      
      // Set error state
      calculator.displayError();
      expect(screen.classList.contains('error')).toBe(true);
      
      // Clear error states
      calculator.clearErrorStates();
      expect(screen.classList.contains('error')).toBe(false);
      
      // Set overflow state
      calculator.displayOverflow();
      expect(screen.classList.contains('overflow')).toBe(true);
      
      // Clear error states
      calculator.clearErrorStates();
      expect(screen.classList.contains('overflow')).toBe(false);
    });
  });

  describe('Event Handler Tests', () => {
    test('Number button event handlers work correctly', () => {
      // Test that clicking number buttons triggers inputNumber
      const spy = jest.spyOn(calculator, 'inputNumber');
      
      document.getElementById('num7').click();
      expect(spy).toHaveBeenCalledWith(7);
      
      document.getElementById('num0').click();
      expect(spy).toHaveBeenCalledWith(0);
      
      spy.mockRestore();
    });

    test('Operator button event handlers work correctly', () => {
      const spy = jest.spyOn(calculator, 'inputOperator');
      
      document.getElementById('plus').click();
      expect(spy).toHaveBeenCalledWith('+');
      
      document.getElementById('minus').click();
      expect(spy).toHaveBeenCalledWith('-');
      
      spy.mockRestore();
    });

    test('Function button event handlers work correctly', () => {
      const calcSpy = jest.spyOn(calculator, 'calculate');
      const resetSpy = jest.spyOn(calculator, 'reset');
      
      document.getElementById('calculate').click();
      expect(calcSpy).toHaveBeenCalled();
      
      document.getElementById('reset').click();
      expect(resetSpy).toHaveBeenCalled();
      
      calcSpy.mockRestore();
      resetSpy.mockRestore();
    });

    test('Button press animation event handlers work', () => {
      const btn = document.getElementById('num1');
      
      // Test mousedown adds class
      const mouseDownEvent = new Event('mousedown');
      btn.dispatchEvent(mouseDownEvent);
      expect(btn.classList.contains('btn-pressed')).toBe(true);
      
      // Test mouseup removes class
      const mouseUpEvent = new Event('mouseup');
      btn.dispatchEvent(mouseUpEvent);
      expect(btn.classList.contains('btn-pressed')).toBe(false);
      
      // Test mouseleave also removes class
      btn.classList.add('btn-pressed');
      const mouseLeaveEvent = new Event('mouseleave');
      btn.dispatchEvent(mouseLeaveEvent);
      expect(btn.classList.contains('btn-pressed')).toBe(false);
    });
  });

  describe('State Synchronization Tests', () => {
    test('UI state matches calculator state after operations', () => {
      // Perform a series of operations
      calculator.inputNumber(1);
      calculator.inputNumber(5);
      expect(document.getElementById('screen').textContent).toBe('15');
      expect(calculator.currentValue).toBe(15);
      
      calculator.inputOperator('+');
      expect(document.getElementById('plus').classList.contains('selected')).toBe(true);
      expect(calculator.operator).toBe('+');
      
      calculator.inputNumber(2);
      calculator.inputNumber(5);
      expect(document.getElementById('screen').textContent).toBe('25');
      expect(calculator.currentValue).toBe(25);
      
      calculator.calculate();
      expect(document.getElementById('screen').textContent).toBe('40');
      expect(calculator.currentValue).toBe(40);
      expect(document.getElementById('plus').classList.contains('selected')).toBe(false);
    });

    test('Reset synchronizes all UI elements', () => {
      // Set up complex state
      calculator.inputNumber(9);
      calculator.inputNumber(9);
      calculator.inputOperator('-');
      calculator.inputNumber(1);
      
      // Reset
      calculator.reset();
      
      // Verify UI synchronization
      expect(document.getElementById('screen').textContent).toBe('0');
      expect(document.getElementById('plus').classList.contains('selected')).toBe(false);
      expect(document.getElementById('minus').classList.contains('selected')).toBe(false);
      expect(document.getElementById('screen').classList.contains('error')).toBe(false);
      expect(document.getElementById('screen').classList.contains('overflow')).toBe(false);
    });
  });
});