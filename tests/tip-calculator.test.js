/**
 * Simple Unit Tests for TipCalculator Class
 * Basic functionality tests to ensure deployment works
 */

// Import the TipCalculator class
const TipCalculator = require('../script.js');

describe('TipCalculator Basic Tests', () => {
  let tipCalculator;

  beforeEach(() => {
    // Mock minimal DOM elements that TipCalculator expects
    global.document = {
      getElementById: jest.fn((id) => ({
        addEventListener: jest.fn(),
        value: '0',
        textContent: '0',
        classList: {
          add: jest.fn(),
          remove: jest.fn(),
          contains: jest.fn(() => false)
        },
        style: {},
        click: jest.fn()
      })),
      querySelectorAll: jest.fn(() => [])
    };
    
    tipCalculator = new TipCalculator();
  });

  test('TipCalculator class exists and can be instantiated', () => {
    expect(tipCalculator).toBeDefined();
    expect(tipCalculator).toBeInstanceOf(TipCalculator);
  });

  test('TipCalculator has required properties', () => {
    expect(tipCalculator.currentGuests).toBe(1);
    expect(tipCalculator.customRate).toBe(5);
    expect(tipCalculator.tipRates).toBeDefined();
  });

  test('Tip rates are properly configured', () => {
    expect(tipCalculator.tipRates.excellent.rate).toBe(0.20);
    expect(tipCalculator.tipRates.good.rate).toBe(0.16);
    expect(tipCalculator.tipRates.standard.rate).toBe(0.125);
  });

  test('updateTotalBill method exists', () => {
    expect(typeof tipCalculator.updateTotalBill).toBe('function');
  });

  test('formatCurrency method works correctly', () => {
    expect(tipCalculator.formatCurrency(100.55)).toBe('$100.55');
    expect(tipCalculator.formatCurrency(0)).toBe('$0.00');
    expect(tipCalculator.formatCurrency(1234.56)).toBe('$1,234.56');
  });
});