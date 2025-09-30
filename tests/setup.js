/**
 * Jest Test Setup
 * Configures the testing environment for the Simple Calculator Application
 */

// Import Jest DOM matchers for better assertions
require('@testing-library/jest-dom');

// Mock DOM methods that might not be available in test environment
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock console methods to reduce test noise
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};

// Setup DOM structure that tests can use
beforeEach(() => {
  document.body.innerHTML = '';
  
  // Create basic DOM structure
  const calculatorHTML = `
    <div class="calculator">
      <div class="display">
        <div id="screen">0</div>
      </div>
      <div class="buttons">
        <button class="btn reset-btn" id="reset">Reset</button>
        <button class="btn operator-btn" id="plus">+</button>
        <button class="btn operator-btn" id="minus">-</button>
        <button class="btn number-btn" id="num7">7</button>
        <button class="btn number-btn" id="num8">8</button>
        <button class="btn number-btn" id="num9">9</button>
        <button class="btn calculate-btn" id="calculate">Calculate</button>
        <button class="btn number-btn" id="num4">4</button>
        <button class="btn number-btn" id="num5">5</button>
        <button class="btn number-btn" id="num6">6</button>
        <button class="btn number-btn" id="num1">1</button>
        <button class="btn number-btn" id="num2">2</button>
        <button class="btn number-btn" id="num3">3</button>
        <button class="btn number-btn zero-btn" id="num0">0</button>
      </div>
    </div>
  `;
  
  document.body.innerHTML = calculatorHTML;
});

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
});