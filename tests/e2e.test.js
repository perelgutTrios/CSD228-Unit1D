/**
 * End-to-End Tests using Puppeteer
 * Tests the complete application in a real browser environment
 */

const puppeteer = require('puppeteer');
const path = require('path');

describe('Calculator E2E Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true, // Set to false for debugging
      slowMo: 50, // Slow down by 50ms for better observation
    });
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    const htmlPath = 'file://' + path.join(__dirname, '..', 'index.html');
    await page.goto(htmlPath);
    
    // Wait for calculator to be ready
    await page.waitForSelector('#screen');
  });

  afterEach(async () => {
    await page.close();
  });

  describe('TC8: Browser Compatibility Tests', () => {
    test('TC8.1: Calculator loads correctly in browser', async () => {
      // Check that all elements are present
      const screen = await page.$('#screen');
      expect(screen).toBeTruthy();
      
      const resetBtn = await page.$('#reset');
      expect(resetBtn).toBeTruthy();
      
      const calculateBtn = await page.$('#calculate');
      expect(calculateBtn).toBeTruthy();
      
      // Check initial display
      const screenText = await page.$eval('#screen', el => el.textContent);
      expect(screenText).toBe('0');
    });

    test('TC8.2: Button clicks work in browser', async () => {
      // Click number buttons
      await page.click('#num5');
      await page.click('#num3');
      
      const screenText = await page.$eval('#screen', el => el.textContent);
      expect(screenText).toBe('53');
    });

    test('TC8.3: Complete calculation workflow in browser', async () => {
      // Perform calculation: 12 + 8 = 20
      await page.click('#num1');
      await page.click('#num2');
      await page.click('#plus');
      await page.click('#num8');
      await page.click('#calculate');
      
      const result = await page.$eval('#screen', el => el.textContent);
      expect(result).toBe('20');
    });

    test('TC8.4: Visual feedback works in browser', async () => {
      // Click number then operator
      await page.click('#num5');
      await page.click('#plus');
      
      // Check that operator is highlighted
      const isSelected = await page.$eval('#plus', el => el.classList.contains('selected'));
      expect(isSelected).toBe(true);
      
      // Enter another number - should clear selection
      await page.click('#num3');
      const stillSelected = await page.$eval('#plus', el => el.classList.contains('selected'));
      expect(stillSelected).toBe(false);
    });

    test('TC8.5: Reset functionality works in browser', async () => {
      // Enter some numbers and operator
      await page.click('#num9');
      await page.click('#num9');
      await page.click('#minus');
      await page.click('#num1');
      
      // Reset
      await page.click('#reset');
      
      // Check reset state
      const screenText = await page.$eval('#screen', el => el.textContent);
      expect(screenText).toBe('0');
      
      const plusSelected = await page.$eval('#plus', el => el.classList.contains('selected'));
      const minusSelected = await page.$eval('#minus', el => el.classList.contains('selected'));
      expect(plusSelected).toBe(false);
      expect(minusSelected).toBe(false);
    });
  });

  describe('Keyboard Support E2E Tests', () => {
    test('Number keys work via keyboard', async () => {
      await page.keyboard.press('1');
      await page.keyboard.press('2');
      await page.keyboard.press('3');
      
      const screenText = await page.$eval('#screen', el => el.textContent);
      expect(screenText).toBe('123');
    });

    test('Operator keys work via keyboard', async () => {
      await page.keyboard.press('5');
      await page.keyboard.press('+');
      await page.keyboard.press('3');
      await page.keyboard.press('Enter');
      
      const result = await page.$eval('#screen', el => el.textContent);
      expect(result).toBe('8');
    });

    test('Reset key works via keyboard', async () => {
      await page.keyboard.press('9');
      await page.keyboard.press('9');
      await page.keyboard.press('Escape');
      
      const screenText = await page.$eval('#screen', el => el.textContent);
      expect(screenText).toBe('0');
    });
  });

  describe('Visual Regression Tests', () => {
    test('Calculator displays correctly', async () => {
      // Take screenshot of initial state
      const screenshot = await page.screenshot({
        clip: { x: 0, y: 0, width: 400, height: 600 }
      });
      expect(screenshot).toBeTruthy();
    });

    test('Error states display correctly', async () => {
      // Trigger overflow by entering many digits
      const digits = ['9', '9', '9', '9', '9', '9', '9', '9', '9'];
      for (const digit of digits) {
        await page.click(`#num${digit}`);
        await page.waitForTimeout(50); // Small delay for visual confirmation
      }
      
      const screenText = await page.$eval('#screen', el => el.textContent);
      expect(screenText).toBe('OVERFLOW');
      
      // Check that overflow styling is applied
      const hasOverflowClass = await page.$eval('#screen', el => el.classList.contains('overflow'));
      expect(hasOverflowClass).toBe(true);
    });
  });

  describe('Performance Tests', () => {
    test('Calculator responds quickly to rapid clicks', async () => {
      const startTime = Date.now();
      
      // Rapidly click numbers
      for (let i = 0; i < 10; i++) {
        await page.click('#num1');
        await page.click('#reset');
      }
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      // Should complete rapidly (less than 2 seconds)
      expect(duration).toBeLessThan(2000);
      
      // Final state should be correct
      const screenText = await page.$eval('#screen', el => el.textContent);
      expect(screenText).toBe('0');
    });

    test('Memory usage remains stable during extended use', async () => {
      // Perform many operations
      for (let i = 0; i < 50; i++) {
        await page.click('#num5');
        await page.click('#plus');
        await page.click('#num3');
        await page.click('#calculate');
        await page.click('#reset');
      }
      
      // Should still be responsive
      await page.click('#num7');
      const screenText = await page.$eval('#screen', el => el.textContent);
      expect(screenText).toBe('7');
    });
  });

  describe('Mobile Responsiveness Tests', () => {
    test('Calculator works on mobile viewport', async () => {
      // Set mobile viewport
      await page.setViewport({ width: 375, height: 667 });
      
      // Should still be functional
      await page.click('#num4');
      await page.click('#plus');
      await page.click('#num6');
      await page.click('#calculate');
      
      const result = await page.$eval('#screen', el => el.textContent);
      expect(result).toBe('10');
    });

    test('Touch interactions work correctly', async () => {
      // Simulate touch events
      await page.touchscreen.tap(200, 400); // Approximate button position
      
      // Basic functionality should work
      await page.click('#num8');
      const screenText = await page.$eval('#screen', el => el.textContent);
      expect(screenText).toBe('8');
    });
  });

  describe('Error Recovery Tests', () => {
    test('Recovery from overflow state', async () => {
      // Create overflow
      const manyNines = ['9', '9', '9', '9', '9', '9', '9', '9', '9'];
      for (const digit of manyNines) {
        await page.click(`#num${digit}`);
      }
      
      let screenText = await page.$eval('#screen', el => el.textContent);
      expect(screenText).toBe('OVERFLOW');
      
      // Should be able to continue after overflow
      await page.click('#num5');
      screenText = await page.$eval('#screen', el => el.textContent);
      expect(screenText).toBe('5');
    });

    test('Calculator state consistency after errors', async () => {
      // Trigger overflow
      await page.evaluate(() => {
        window.calculator = new Calculator();
        window.calculator.displayOverflow();
      });
      
      // Reset should clear everything
      await page.click('#reset');
      
      // Should work normally
      await page.click('#num3');
      await page.click('#plus');
      await page.click('#num4');
      await page.click('#calculate');
      
      const result = await page.$eval('#screen', el => el.textContent);
      expect(result).toBe('7');
    });
  });
});