# Simple Calculator Application - Project Documentation

## Table of Contents
1. [Original Project Prompt](#original-project-prompt)
2. [Requirements and Specifications](#requirements-and-specifications)
3. [Solution Design](#solution-design)
4. [Implementation](#implementation)
5. [Test Plan](#test-plan)
6. [Deployment and Usage](#deployment-and-usage)

---

## Original Project Prompt

**Assignment**: Write a simple calculator application with the following requirements:

It should have a display window capable of showing up to 8 digits or "-" and 7 digits. You can also display OVERFLOW or ERROR. It should have 10 buttons for digits 0-9 and 2 buttons for + and – included. The application should also have these two buttons: Calculate and Reset.

**User Interaction Requirements**:

When a user enters a number:
- Tapping a button representing a digit enters that digit and sets the current value to that digit. For example, when you tap 3, the current value is set at 3.
- Subsequent taps multiply the current value by 10 and add the next digit, displaying the resulting new current value. Continuing the example above, tapping 6 results in a current value of 36.

When "+" or "-" are entered after a number has been entered:
- This must be followed by either entering a number or tapping Reset.
- If Reset is tapped, the current value and display are set to 0.
- If a number is tapped, display the number entered until either Reset or Calculate is tapped.
- Calculate performs the operation on the previous number and the current (new) number, setting the current number to the result and displaying it.

**Technical Considerations**:
- You must consider how to handle overflow issues (numbers exceed the display range).
- Use the CSS file to create an effective user interface and display.
- Assume that the calculator application will run in your browser.
- The URL might look like this: localhost/CSD223/Unit1D/index.html

---

## Requirements and Specifications

### Functional Requirements

#### FR1: Display Capabilities
- **FR1.1**: Display up to 8 digits for positive numbers
- **FR1.2**: Display up to 7 digits plus minus sign for negative numbers
- **FR1.3**: Display "OVERFLOW" when numbers exceed display limits
- **FR1.4**: Display "ERROR" when calculation errors occur
- **FR1.5**: Right-align numbers in display (standard calculator behavior)

#### FR2: Input Interface
- **FR2.1**: Provide 10 digit buttons (0-9)
- **FR2.2**: Provide 2 operator buttons (+ and -)
- **FR2.3**: Provide Calculate button for performing operations
- **FR2.4**: Provide Reset button for clearing calculator state

#### FR3: Number Entry Logic
- **FR3.1**: First digit entry sets current value to that digit
- **FR3.2**: Subsequent digit entries multiply current value by 10 and add new digit
- **FR3.3**: Prevent overflow during number entry
- **FR3.4**: Clear operator selection when entering numbers

#### FR4: Operator Handling
- **FR4.1**: Operator entry must be followed by number entry or Reset
- **FR4.2**: Highlight selected operator for visual feedback
- **FR4.3**: Support operator chaining (consecutive calculations)
- **FR4.4**: Prevent operator entry during error states

#### FR5: Calculation Logic
- **FR5.1**: Perform addition and subtraction operations
- **FR5.2**: Display result and make it available for further operations
- **FR5.3**: Handle overflow in calculation results
- **FR5.4**: Reset state after displaying result

#### FR6: Reset Functionality
- **FR6.1**: Clear all calculator state variables
- **FR6.2**: Set display to "0"
- **FR6.3**: Clear all visual indicators
- **FR6.4**: Available at any time during operation

### Non-Functional Requirements

#### NFR1: User Interface
- **NFR1.1**: Modern, responsive design that works on different screen sizes
- **NFR1.2**: Clear visual distinction between different button types
- **NFR1.3**: Intuitive layout following calculator conventions
- **NFR1.4**: Visual feedback for user interactions

#### NFR2: Performance
- **NFR2.1**: Instant response to button clicks
- **NFR2.2**: Smooth animations and transitions
- **NFR2.3**: Efficient memory usage

#### NFR3: Usability
- **NFR3.1**: Keyboard support for all calculator functions
- **NFR3.2**: Accessible color scheme and font sizes
- **NFR3.3**: Error recovery through Reset function

#### NFR4: Compatibility
- **NFR4.1**: Run in modern web browsers
- **NFR4.2**: Support for both desktop and mobile devices
- **NFR4.3**: No external dependencies required

---

## Solution Design

### Architecture Overview

The calculator application follows a **Model-View-Controller (MVC)** pattern implemented in vanilla JavaScript:

- **Model**: Calculator class manages state and business logic
- **View**: HTML/CSS provides user interface and display
- **Controller**: Event handlers manage user interactions

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Browser Environment                   │
├─────────────────────────────────────────────────────────┤
│  HTML Structure (View)                                  │
│  ┌─────────────────┐  ┌─────────────────────────────┐   │
│  │     Display     │  │         Button Grid         │   │
│  │   (#screen)     │  │  ┌─────┬─────┬─────┬─────┐  │   │
│  │                 │  │  │Reset│  +  │  -  │     │  │   │
│  └─────────────────┘  │  ├─────┼─────┼─────┤Calc │  │   │
│                       │  │  7  │  8  │  9  │     │  │   │
│  CSS Styling          │  ├─────┼─────┼─────┤     │  │   │
│  - Grid Layout        │  │  4  │  5  │  6  │     │  │   │
│  - Visual Feedback    │  ├─────┼─────┼─────┴─────┤  │   │
│  - Responsive Design  │  │  1  │  2  │  3  │     │  │   │
│                       │  ├─────┴─────┼─────┘     │  │   │
│                       │  │     0     │           │  │   │
│                       │  └───────────┴───────────┘  │   │
│                       └─────────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│  JavaScript Logic (Model + Controller)                  │
│  ┌─────────────────────────────────────────────────────┐ │
│  │              Calculator Class                       │ │
│  │                                                     │ │
│  │  State Management:                                  │ │
│  │  - currentValue: number                             │ │
│  │  - previousValue: number                            │ │
│  │  - operator: string                                 │ │
│  │  - waitingForNewValue: boolean                      │ │
│  │                                                     │ │
│  │  Methods:                                           │ │
│  │  - inputNumber(digit)                               │ │
│  │  - inputOperator(op)                                │ │
│  │  - calculate()                                      │ │
│  │  - reset()                                          │ │
│  │  - updateDisplay()                                  │ │
│  │  - wouldOverflow(value)                             │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                         │
│  Event Handlers:                                        │
│  - Button click events                                  │
│  - Keyboard input events                                │
│  - Visual feedback events                               │
└─────────────────────────────────────────────────────────┘
```

### Data Flow Design

#### State Variables
```javascript
{
  currentValue: 0,           // Currently displayed number
  previousValue: null,       // First operand in calculation
  operator: null,           // Current operator ('+' or '-')
  waitingForNewValue: false, // Flag for input state
  maxDigits: 8,             // Display limit for positive numbers
  maxNegativeDigits: 7      // Display limit for negative numbers
}
```

#### Workflow Diagrams

**Number Entry Workflow:**
```
Start → Digit Pressed → waitingForNewValue? 
                             ↓ Yes              ↓ No
                    Set currentValue = digit    Calculate newValue = currentValue * 10 + digit
                             ↓                          ↓
                    Set waitingForNewValue = false    Check overflow?
                             ↓                          ↓ Yes        ↓ No
                    Update Display ←─────────── Display OVERFLOW    Set currentValue = newValue
                             ↓                                              ↓
                    Clear Operator Selection ←────────────────────── Update Display
                             ↓
                    End
```

**Operator Entry Workflow:**
```
Start → Operator Pressed → Error State? → Yes → Exit
                ↓ No
        Has operator AND not waiting? → Yes → Calculate current operation
                ↓ No                              ↓
        Set previousValue = currentValue ←────────┘
                ↓
        Set operator = pressed operator
                ↓
        Set waitingForNewValue = true
                ↓
        Highlight operator button
                ↓
        End
```

**Calculate Workflow:**
```
Start → Calculate Pressed → Ready to calculate? → No → Exit
                                ↓ Yes
                        Perform operation (previousValue operator currentValue)
                                ↓
                        Check result overflow? → Yes → Display OVERFLOW → Reset State
                                ↓ No                          ↓
                        Set currentValue = result            End
                                ↓
                        Clear previousValue and operator
                                ↓
                        Set waitingForNewValue = true
                                ↓
                        Update Display
                                ↓
                        End
```

### Component Design

#### Calculator Class Structure
```javascript
class Calculator {
    // Properties
    screen: HTMLElement
    currentValue: number
    previousValue: number | null
    operator: string | null
    waitingForNewValue: boolean
    maxDigits: number
    maxNegativeDigits: number
    
    // Core Methods
    constructor()
    initializeButtons()
    
    // Input Handlers
    inputNumber(digit: number)
    inputOperator(op: string)
    
    // Operations
    calculate()
    reset()
    
    // Display Management
    updateDisplay()
    wouldOverflow(value: number): boolean
    displayOverflow()
    displayError()
    
    // UI State Management
    highlightOperator(operator: string)
    clearOperatorSelection()
    clearErrorStates()
}
```

### Error Handling Strategy

1. **Overflow Prevention**: Check limits before updating values
2. **Input Validation**: Prevent invalid state transitions
3. **Error Recovery**: Automatic reset after error display
4. **Graceful Degradation**: Continue operation where possible

---

## Implementation

### Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Build Tools**: None (vanilla implementation)
- **Version Control**: Git
- **Hosting**: Local XAMPP server

### File Structure
```
Unit 1D/
├── index.html          # HTML structure and layout
├── styles.css          # CSS styling and responsive design
├── script.js           # JavaScript logic and functionality
├── README.md           # Project documentation
└── PROJECT_DOCUMENTATION.md  # This file
```

### Key Implementation Details

#### HTML Structure
- Semantic HTML5 elements for accessibility
- Grid-based button layout for consistent spacing
- Proper button labeling and IDs for JavaScript binding

#### CSS Implementation
- **CSS Grid** for precise button layout
- **Flexbox** for display alignment
- **CSS Custom Properties** for consistent theming
- **Media queries** for responsive design
- **CSS animations** for user feedback

#### JavaScript Architecture
- **ES6 Classes** for organized code structure
- **Event delegation** for efficient event handling
- **Modular methods** for maintainable code
- **Error boundaries** for robust operation

### Code Quality Features

#### Documentation
- Comprehensive inline comments
- JSDoc-style method documentation
- Clear variable and function naming
- Sectioned code organization

#### Error Handling
- Input validation at all entry points
- Graceful error state management
- Automatic recovery mechanisms
- User-friendly error messages

#### Performance Optimizations
- Efficient DOM manipulation
- Minimal memory allocation
- Fast overflow detection algorithms
- Optimized event handler attachment

---

## Test Plan

### Testing Strategy

The calculator application will be tested using a multi-layered approach:

1. **Unit Testing**: Test individual functions and methods
2. **Integration Testing**: Test component interactions
3. **User Interface Testing**: Test user interactions and visual feedback
4. **Cross-browser Testing**: Ensure compatibility across browsers
5. **Responsive Testing**: Verify mobile and desktop functionality
6. **Accessibility Testing**: Ensure usable by all users

### Test Environment Setup

#### Prerequisites
- Node.js and npm for Jest testing framework
- Modern web browsers (Chrome, Firefox, Safari, Edge)
- Various screen sizes for responsive testing

#### Testing Frameworks
- **Jest**: JavaScript unit and integration testing
- **Puppeteer**: End-to-end browser testing
- **Browser DevTools**: Manual testing and debugging

### Test Categories

#### TC1: Number Entry Tests
- **TC1.1**: Single digit entry
- **TC1.2**: Multiple digit entry
- **TC1.3**: Zero handling
- **TC1.4**: Maximum digit limits
- **TC1.5**: Overflow prevention

#### TC2: Operator Tests
- **TC2.1**: Addition operations
- **TC2.2**: Subtraction operations
- **TC2.3**: Operator chaining
- **TC2.4**: Operator visual feedback
- **TC2.5**: Invalid operator sequences

#### TC3: Calculation Tests
- **TC3.1**: Basic addition calculations
- **TC3.2**: Basic subtraction calculations
- **TC3.3**: Result overflow handling
- **TC3.4**: Negative result handling
- **TC3.5**: Chain calculations

#### TC4: Reset Functionality Tests
- **TC4.1**: Reset during number entry
- **TC4.2**: Reset during operator selection
- **TC4.3**: Reset after calculation
- **TC4.4**: Reset during error states
- **TC4.5**: State cleanup verification

#### TC5: Display Tests
- **TC5.1**: Number formatting
- **TC5.2**: Overflow message display
- **TC5.3**: Error message display
- **TC5.4**: Display alignment
- **TC5.5**: Character limits

#### TC6: User Interface Tests
- **TC6.1**: Button responsiveness
- **TC6.2**: Visual feedback
- **TC6.3**: Keyboard shortcuts
- **TC6.4**: Mobile touch interface
- **TC6.5**: Screen reader compatibility

#### TC7: Edge Case Tests
- **TC7.1**: Rapid button clicking
- **TC7.2**: Invalid input sequences
- **TC7.3**: Memory limits
- **TC7.4**: Browser refresh handling
- **TC7.5**: Network disconnection (N/A for this app)

#### TC8: Browser Compatibility Tests
- **TC8.1**: Chrome compatibility
- **TC8.2**: Firefox compatibility
- **TC8.3**: Safari compatibility
- **TC8.4**: Edge compatibility
- **TC8.5**: Mobile browser compatibility

### Test Implementation Status
- ✅ Test framework setup complete
- ✅ Unit test suite implemented
- ✅ Integration tests created
- ✅ UI automation tests ready
- ✅ Cross-browser test plan defined

---

## Deployment and Usage

### Local Development Setup
1. Install XAMPP or similar local server
2. Clone repository to web server directory
3. Access via `localhost/CSD228%20Fall%202025/Unit%201D/index.html`

### Production Deployment
- Can be deployed to any web server
- No server-side requirements
- Static file hosting compatible

### Browser Support
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+
- Mobile browsers with ES6 support

### Accessibility Features
- Keyboard navigation support
- High contrast color scheme
- Large touch targets for mobile
- Screen reader compatible structure

---

## Conclusion

This calculator application successfully implements all required functionality with a focus on:
- **User Experience**: Intuitive interface with visual feedback
- **Code Quality**: Well-documented, maintainable code
- **Robustness**: Comprehensive error handling and edge case management
- **Compatibility**: Cross-browser and cross-device support
- **Testing**: Thorough test coverage ensuring reliability

The modular design allows for easy extension with additional operators or features while maintaining the core simplicity required by the specification.