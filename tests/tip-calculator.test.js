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

  test('smartRoundPerPerson method works correctly', () => {
    // Under $5: round up to next $0.25
    expect(tipCalculator.smartRoundPerPerson(3.10)).toBe(3.25);
    expect(tipCalculator.smartRoundPerPerson(4.76)).toBe(5.00);
    expect(tipCalculator.smartRoundPerPerson(4.00)).toBe(4.00);
    
    // $5-10: round up to next $0.50
    expect(tipCalculator.smartRoundPerPerson(6.25)).toBe(6.50);
    expect(tipCalculator.smartRoundPerPerson(9.76)).toBe(10.00);
    expect(tipCalculator.smartRoundPerPerson(7.50)).toBe(7.50);
    
    // Over $10: round to nearest $1.00
    expect(tipCalculator.smartRoundPerPerson(12.25)).toBe(12.00);
    expect(tipCalculator.smartRoundPerPerson(12.75)).toBe(13.00);
    expect(tipCalculator.smartRoundPerPerson(15.00)).toBe(15.00);
  });
});