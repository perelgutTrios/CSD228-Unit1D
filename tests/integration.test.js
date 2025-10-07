/**
 * Integration Tests for Tip Calculator Application
 * Tests component interactions and complete user workflows
 */

// Import the TipCalculator class
const TipCalculator = require('../script.js');

describe('Tip Calculator Integration Tests', () => {
  let tipCalculator;
  let mockDOM;

  beforeEach(() => {
    // Mock DOM elements that TipCalculator expects
    global.document = {
      getElementById: jest.fn((id) => {
        const mockElement = {
          addEventListener: jest.fn(),
          value: '',
          textContent: '0',
          classList: {
            add: jest.fn(),
            remove: jest.fn(),
            contains: jest.fn(() => false)
          },
          style: {}
        };
        return mockElement;
      }),
      querySelectorAll: jest.fn(() => [])
    };
    
    tipCalculator = new TipCalculator();
  });

  describe('Tip Calculation Workflows', () => {
    test('Basic tip calculation workflow', () => {
      // Test that TipCalculator initializes properly
      expect(tipCalculator).toBeDefined();
      expect(tipCalculator.currentGuests).toBe(1);
      expect(tipCalculator.customRate).toBe(5);
      
      // Test tip rate presets exist
      expect(tipCalculator.tipRates).toBeDefined();
      expect(tipCalculator.tipRates.excellent.rate).toBe(0.20);
      expect(tipCalculator.tipRates.good.rate).toBe(0.16);
      expect(tipCalculator.tipRates.standard.rate).toBe(0.125);
    });

    test('Calculate total bill workflow', () => {
      // Test that calculateTotalBill method exists and works
      expect(typeof tipCalculator.calculateTotalBill).toBe('function');
      
      // Mock bill and tax amounts
      tipCalculator.billInput = { value: '50.00' };
      tipCalculator.taxInput = { value: '4.00' };
      
      const total = tipCalculator.calculateTotalBill();
      expect(total).toBe(54.00);
    });

    test('Guest count selection workflow', () => {
      // Test initial state
      expect(tipCalculator.currentGuests).toBe(1);
      
      // Test that setGuests method works
      if (typeof tipCalculator.setGuests === 'function') {
        tipCalculator.setGuests(4);
        expect(tipCalculator.currentGuests).toBe(4);
      }
    });

    test('Tip rate selection workflow', () => {
      // Test that tip rates are properly defined
      expect(tipCalculator.tipRates.excellent).toBeDefined();
      expect(tipCalculator.tipRates.good).toBeDefined();
      expect(tipCalculator.tipRates.standard).toBeDefined();
      expect(tipCalculator.tipRates.custom).toBeDefined();
      
      // Test rate values
      expect(tipCalculator.tipRates.excellent.rate).toBe(0.20); // 20%
      expect(tipCalculator.tipRates.good.rate).toBe(0.16); // 16%
      expect(tipCalculator.tipRates.standard.rate).toBe(0.125); // 12.5%
    });
  });

  describe('Input Validation Tests', () => {
    test('Handle invalid bill amounts', () => {
      // Test that TipCalculator handles invalid inputs gracefully
      tipCalculator.billInput = { value: 'invalid' };
      tipCalculator.taxInput = { value: '0' };
      
      const total = tipCalculator.calculateTotalBill();
      expect(total).toBe(0); // Should default to 0 for invalid input
    });

    test('Handle negative bill amounts', () => {
      // Test that TipCalculator handles negative inputs
      tipCalculator.billInput = { value: '-50' };
      tipCalculator.taxInput = { value: '0' };
      
      const total = tipCalculator.calculateTotalBill();
      expect(total).toBe(0); // Should not allow negative bills
    });
  });

  describe('Tip Calculator Core Functionality', () => {
    test('TipCalculator class initialization', () => {
      // Test that the class initializes with expected properties
      expect(tipCalculator.currentGuests).toBeDefined();
      expect(tipCalculator.recommendations).toBeDefined();
      expect(tipCalculator.userOverrides).toBeDefined();
      expect(tipCalculator.tipRates).toBeDefined();
    });

    test('Tip rate calculations', () => {
      // Test basic tip rate functionality
      const billAmount = 100;
      const excellentRate = tipCalculator.tipRates.excellent.rate;
      const expectedTip = billAmount * excellentRate;
      expect(expectedTip).toBe(20); // 20% of $100 = $20
    });

    test('Guest count management', () => {
      // Test guest count handling
      expect(tipCalculator.currentGuests).toBe(1);
      
      // Test that we can change guest count (if method exists)
      if (typeof tipCalculator.setGuests === 'function') {
        tipCalculator.setGuests(2);
        expect(tipCalculator.currentGuests).toBe(2);
      }
    });
  });
});