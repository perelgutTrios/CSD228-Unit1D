// Calculator Application
class Calculator {
    constructor() {
        this.screen = document.getElementById('screen');
        this.currentValue = 0;
        this.previousValue = null;
        this.operator = null;
        this.waitingForNewValue = false;
        this.maxDigits = 8;
        this.maxNegativeDigits = 7;
        
        this.initializeButtons();
    }
    
    initializeButtons() {
        // Number buttons
        for (let i = 0; i <= 9; i++) {
            const btn = document.getElementById(`num${i}`);
            btn.addEventListener('click', () => this.inputNumber(i));
        }
        
        // Operator buttons
        document.getElementById('plus').addEventListener('click', () => this.inputOperator('+'));
        document.getElementById('minus').addEventListener('click', () => this.inputOperator('-'));
        
        // Function buttons
        document.getElementById('calculate').addEventListener('click', () => this.calculate());
        document.getElementById('reset').addEventListener('click', () => this.reset());
        
        // Add button press animation
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mousedown', () => btn.classList.add('btn-pressed'));
            btn.addEventListener('mouseup', () => btn.classList.remove('btn-pressed'));
            btn.addEventListener('mouseleave', () => btn.classList.remove('btn-pressed'));
        });
    }
    
    inputNumber(digit) {
        if (this.waitingForNewValue) {
            this.currentValue = digit;
            this.waitingForNewValue = false;
        } else {
            // Check for overflow before adding digit
            const newValue = this.currentValue * 10 + digit;
            
            // Check if the new value would exceed display limits
            if (this.wouldOverflow(newValue)) {
                this.displayOverflow();
                return;
            }
            
            this.currentValue = newValue;
        }
        
        this.updateDisplay();
        this.clearOperatorSelection();
    }
    
    inputOperator(op) {
        // Clear any error states
        if (this.screen.textContent === 'ERROR' || this.screen.textContent === 'OVERFLOW') {
            return;
        }
        
        // If we already have an operator and aren't waiting for a new value, calculate first
        if (this.operator && !this.waitingForNewValue) {
            this.calculate();
        }
        
        this.previousValue = this.currentValue;
        this.operator = op;
        this.waitingForNewValue = true;
        
        this.highlightOperator(op);
    }
    
    calculate() {
        if (this.operator === null || this.previousValue === null || this.waitingForNewValue) {
            return;
        }
        
        let result;
        
        try {
            switch (this.operator) {
                case '+':
                    result = this.previousValue + this.currentValue;
                    break;
                case '-':
                    result = this.previousValue - this.currentValue;
                    break;
                default:
                    return;
            }
            
            // Check for overflow in result
            if (this.wouldOverflow(result)) {
                this.displayOverflow();
                return;
            }
            
            this.currentValue = result;
            this.previousValue = null;
            this.operator = null;
            this.waitingForNewValue = true;
            
            this.updateDisplay();
            this.clearOperatorSelection();
            
        } catch (error) {
            this.displayError();
        }
    }
    
    reset() {
        this.currentValue = 0;
        this.previousValue = null;
        this.operator = null;
        this.waitingForNewValue = false;
        
        this.updateDisplay();
        this.clearOperatorSelection();
        this.clearErrorStates();
    }
    
    wouldOverflow(value) {
        // Check if the value would exceed display limits
        const valueStr = value.toString();
        
        if (value < 0) {
            // For negative numbers: "-" + 7 digits max
            return valueStr.length > this.maxNegativeDigits + 1;
        } else {
            // For positive numbers: 8 digits max
            return valueStr.length > this.maxDigits;
        }
    }
    
    updateDisplay() {
        let displayValue = this.currentValue.toString();
        
        // Check if current display would overflow
        if (this.currentValue < 0 && displayValue.length > this.maxNegativeDigits + 1) {
            this.displayOverflow();
            return;
        } else if (this.currentValue >= 0 && displayValue.length > this.maxDigits) {
            this.displayOverflow();
            return;
        }
        
        this.screen.textContent = displayValue;
        this.clearErrorStates();
    }
    
    displayOverflow() {
        this.screen.textContent = 'OVERFLOW';
        this.screen.classList.add('overflow');
        
        // Reset calculator state
        this.currentValue = 0;
        this.previousValue = null;
        this.operator = null;
        this.waitingForNewValue = true;
    }
    
    displayError() {
        this.screen.textContent = 'ERROR';
        this.screen.classList.add('error');
        
        // Reset calculator state
        this.currentValue = 0;
        this.previousValue = null;
        this.operator = null;
        this.waitingForNewValue = true;
    }
    
    clearErrorStates() {
        this.screen.classList.remove('error', 'overflow');
    }
    
    highlightOperator(operator) {
        // Clear previous selections
        this.clearOperatorSelection();
        
        // Highlight current operator
        const operatorBtn = operator === '+' ? 
            document.getElementById('plus') : 
            document.getElementById('minus');
        
        operatorBtn.classList.add('selected');
    }
    
    clearOperatorSelection() {
        document.getElementById('plus').classList.remove('selected');
        document.getElementById('minus').classList.remove('selected');
    }
}

// Initialize calculator when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});

// Add keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    // Prevent default behavior for calculator keys
    if ('0123456789+-=Enter'.includes(key) || key === 'Escape' || key === 'Backspace') {
        event.preventDefault();
    }
    
    // Number keys
    if ('0123456789'.includes(key)) {
        document.getElementById(`num${key}`).click();
    }
    
    // Operator keys
    if (key === '+') {
        document.getElementById('plus').click();
    } else if (key === '-') {
        document.getElementById('minus').click();
    }
    
    // Function keys
    if (key === '=' || key === 'Enter') {
        document.getElementById('calculate').click();
    } else if (key === 'Escape' || key === 'Backspace') {
        document.getElementById('reset').click();
    }
});