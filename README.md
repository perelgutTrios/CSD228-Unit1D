# Simple Calculator Application

A web-based calculator with basic arithmetic operations (addition and subtraction) built with HTML, CSS, and JavaScript.

## Features

- **Display**: Shows up to 8 digits for positive numbers or "-" and 7 digits for negative numbers
- **Error Handling**: Displays "OVERFLOW" or "ERROR" when appropriate
- **Buttons**: 
  - Digits 0-9
  - Operators: + and -
  - Calculate button
  - Reset button

## Usage

### Running the Application
1. Make sure you have XAMPP running
2. Open your browser and navigate to: `localhost/CSD228%20Fall%202025/Unit%201D/index.html`

### Calculator Operations

#### Entering Numbers
- Click digit buttons (0-9) to enter numbers
- First digit click sets the current value
- Subsequent clicks multiply current value by 10 and add the new digit
- Example: Clicking 3, then 6 results in display showing 36

#### Using Operators
- Click + or - after entering a number
- The operator button will be highlighted
- Must be followed by entering a number or clicking Reset

#### Calculating Results
- Click "Calculate" to perform the operation on the previous and current numbers
- Result becomes the new current value and is displayed

#### Resetting
- Click "Reset" to clear all values and return display to 0
- Can be used at any time to start over

### Keyboard Support
- **Number keys (0-9)**: Enter digits
- **+ key**: Addition operator
- **- key**: Subtraction operator
- **Enter or = key**: Calculate
- **Escape or Backspace**: Reset

### Error Handling
- **OVERFLOW**: Displayed when numbers exceed the display range
- **ERROR**: Displayed when calculation errors occur
- Calculator automatically resets after displaying error messages

## File Structure
```
Unit 1D/
├── index.html      # Main HTML structure
├── styles.css      # Styling and layout
├── script.js       # Calculator logic and functionality
└── README.md       # This documentation
```

## Technical Details

### Display Limits
- Positive numbers: Maximum 8 digits
- Negative numbers: Maximum 7 digits (plus minus sign)
- Overflow protection prevents display corruption

### CSS Features
- Responsive design that works on different screen sizes
- Modern gradient background
- Button hover and press animations
- Color-coded buttons (numbers, operators, functions)
- Digital-style display with monospace font

### JavaScript Features
- Object-oriented design using ES6 classes
- Comprehensive error handling
- Keyboard event support
- Visual feedback for operator selection
- Overflow detection and prevention