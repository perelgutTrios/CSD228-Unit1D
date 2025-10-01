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

### Complete Project Structure
```
Unit 1D/
├── index.html                    # HTML structure and layout
├── styles.css                    # CSS styling and responsive design
├── script.js                     # JavaScript logic and functionality
├── package.json                  # NPM configuration and test scripts
├── .gitignore                    # Git ignore patterns
├── Jenkinsfile                   # CI/CD pipeline configuration
├── README.md                     # Quick start guide and usage
├── PROJECT_DOCUMENTATION.md      # Comprehensive project documentation
├── TEST_EXECUTION_GUIDE.md       # Detailed testing instructions
└── tests/                        # Complete test suite
    ├── setup.js                  # Jest test environment configuration
    ├── unit.test.js              # Unit tests (25+ test cases)
    ├── integration.test.js       # Integration tests (15+ test cases)
    ├── ui.test.js               # UI interaction tests (20+ test cases)
    └── e2e.test.js              # End-to-end browser tests (15+ test cases)
```

### Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Testing**: Jest 29.7.0, JSDoc
- **CI/CD**: Jenkins Pipeline, NPM Scripts
- **Version Control**: Git with GitHub integration
- **Deployment**: Multi-environment (Dev/Staging/Production)
- **Monitoring**: Performance tracking, error reporting, analytics

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

### Testing Strategy Overview

The calculator application employs a comprehensive multi-layered testing approach designed to ensure reliability, performance, and cross-platform compatibility. The testing strategy encompasses:

1. **Unit Testing**: Isolated testing of individual Calculator class methods
2. **Integration Testing**: Component interaction and workflow validation
3. **User Interface Testing**: User interaction and visual feedback verification
4. **End-to-End Testing**: Complete application testing in real browser environments
5. **Cross-browser Testing**: Compatibility verification across different browsers
6. **Performance Testing**: Response time and memory usage validation
7. **Accessibility Testing**: Compliance with web accessibility standards

### Test Environment Architecture

```
Testing Environment Stack
┌─────────────────────────────────────────────────────────┐
│                    CI/CD Pipeline                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │   Jenkins   │  │    NPM      │  │   Coverage      │  │
│  │  Pipeline   │→ │   Scripts   │→ │   Reports       │  │
│  └─────────────┘  └─────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│                Test Framework Layer                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │    Jest     │  │    Jest     │  │    Manual       │  │
│  │Unit/Integr. │  │     UI      │  │   Testing       │  │
│  └─────────────┘  └─────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│                 Browser Test Matrix                     │
│  Chrome │ Firefox │ Safari │ Edge │ Mobile Chrome/Safari│
└─────────────────────────────────────────────────────────┘
```

### Test Framework Configuration

#### Jest Configuration (`package.json`)
```json
{
  "jest": {
    "testEnvironment": "jsdom",
    "setupFilesAfterEnv": ["<rootDir>/tests/setup.js"],
    "collectCoverageFrom": ["script.js"],
    "coverageReporters": ["text", "lcov", "html"],
    "coverageThreshold": {
      "global": {
        "branches": 90,
        "functions": 100,
        "lines": 95,
        "statements": 95
      }
    }
  }
}
```

#### Test Commands and Usage
```bash
# Complete test suite execution
npm test                    # Run all tests
npm run test:coverage      # Generate coverage reports
npm run test:unit          # Unit tests only (25+ tests)
npm run test:integration   # Integration tests (15+ tests)
npm run test:ui           # UI interaction tests (20+ tests)
npm run test:e2e          # End-to-end browser tests (15+ tests)
npm run test:watch        # Watch mode for development
```

### Detailed Test Categories

#### TC1: Number Entry Tests (Unit Level)
**Purpose**: Validate individual digit entry logic and number building functionality

**TC1.1: Single Digit Entry**
- **Description**: Test that clicking a single digit sets the current value correctly
- **Input**: Click digit 5
- **Expected**: currentValue = 5, display shows "5"
- **Implementation**: `tests/unit.test.js:25-32`

**TC1.2: Multiple Digit Entry**
- **Description**: Test number building through sequential digit entry
- **Input**: Click 3, then 6, then 9
- **Expected**: currentValue = 369, display shows "369"
- **Implementation**: `tests/unit.test.js:34-42`

**TC1.3: Zero Handling**
- **Description**: Validate proper zero handling in various contexts
- **Input**: Various zero scenarios (leading, trailing, standalone)
- **Expected**: Correct value calculation and display
- **Implementation**: `tests/unit.test.js:44-58`

**TC1.4: Maximum Digit Limits**
- **Description**: Enforce 8-digit limit for positive numbers
- **Input**: Enter 8 digits, attempt 9th digit
- **Expected**: 8 digits accepted, 9th triggers overflow
- **Implementation**: `tests/unit.test.js:60-72`

**TC1.5: Overflow Prevention**
- **Description**: Test overflow detection algorithm
- **Input**: Various numbers near and exceeding limits
- **Expected**: Accurate overflow detection, appropriate handling
- **Implementation**: `tests/unit.test.js:74-82`

#### TC2: Operator Tests (Unit Level)
**Purpose**: Validate operator state management and visual feedback

**TC2.1: Addition Operator State**
- **Description**: Test addition operator state changes
- **Input**: Enter number, click +
- **Expected**: previousValue set, operator = '+', waitingForNewValue = true
- **Implementation**: `tests/unit.test.js:88-96`

**TC2.2: Subtraction Operator State**
- **Description**: Test subtraction operator state changes
- **Input**: Enter number, click -
- **Expected**: previousValue set, operator = '-', waitingForNewValue = true
- **Implementation**: `tests/unit.test.js:98-106`

**TC2.3: Operator Chaining**
- **Description**: Test consecutive operator usage (5+3-2)
- **Input**: Number, operator, number, operator
- **Expected**: Intermediate calculation performed automatically
- **Implementation**: `tests/unit.test.js:108-118`

**TC2.4: Operator Visual Feedback**
- **Description**: Test operator button highlighting
- **Input**: Click various operators
- **Expected**: Correct button highlighted, others cleared
- **Implementation**: `tests/unit.test.js:120-132`

**TC2.5: Invalid Operator Sequences**
- **Description**: Test operator handling during error states
- **Input**: Attempt operator during ERROR/OVERFLOW states
- **Expected**: Operator ignored, state unchanged
- **Implementation**: `tests/unit.test.js:134-144`

#### TC3: Calculation Tests (Unit Level)
**Purpose**: Validate arithmetic operations and result handling

**TC3.1: Basic Addition Calculations**
- **Description**: Test fundamental addition operations
- **Input**: 5 + 3, calculate
- **Expected**: Result = 8, proper state reset
- **Implementation**: `tests/unit.test.js:150-160`

**TC3.2: Basic Subtraction Calculations**
- **Description**: Test fundamental subtraction operations
- **Input**: 10 - 4, calculate
- **Expected**: Result = 6, proper state reset
- **Implementation**: `tests/unit.test.js:162-172`

**TC3.3: Result Overflow Handling**
- **Description**: Test calculation result overflow detection
- **Input**: Large number + large number
- **Expected**: OVERFLOW displayed, calculator reset
- **Implementation**: `tests/unit.test.js:174-186`

**TC3.4: Negative Result Handling**
- **Description**: Test negative result calculation and display
- **Input**: 3 - 8, calculate
- **Expected**: Result = -5, proper negative display
- **Implementation**: `tests/unit.test.js:188-198`

**TC3.5: Chain Calculations**
- **Description**: Test multiple consecutive calculations
- **Input**: 10 + 5 = 15, - 3 = 12
- **Expected**: Each step calculated correctly, final result = 12
- **Implementation**: `tests/unit.test.js:200-214`

#### TC4: Reset Functionality Tests (Unit Level)
**Purpose**: Validate complete state reset functionality

**TC4.1-TC4.5**: Comprehensive reset testing in various calculator states
- **Coverage**: Reset during entry, operator selection, after calculation, during errors
- **Validation**: All state variables cleared, display reset to "0", visual indicators cleared
- **Implementation**: `tests/unit.test.js:220-280`

#### TC5: Display Tests (Unit Level)
**Purpose**: Validate display formatting and state visualization

**TC5.1-TC5.5**: Display formatting, error states, overflow handling, character limits
- **Coverage**: Number formatting, error messages, overflow messages, display limits
- **Implementation**: `tests/unit.test.js:286-340`

### Integration Testing Suite

#### Complete User Workflows (`tests/integration.test.js`)
**Purpose**: Test end-to-end user scenarios and component interactions

**Addition Workflow Test (25 + 17 = 42)**
```javascript
// Test complete addition workflow
calculator.inputNumber(2); calculator.inputNumber(5);  // Enter 25
calculator.inputOperator('+');                         // Add operator
calculator.inputNumber(1); calculator.inputNumber(7);  // Enter 17
calculator.calculate();                                 // Calculate
// Expected: display shows "42", state properly reset
```

**Chain Calculation Test (10 + 5 - 3 = 12)**
- **Purpose**: Validate multiple operation sequences
- **Coverage**: State transitions, intermediate calculations, final result
- **Implementation**: `tests/integration.test.js:45-65`

**Error Recovery Integration**
- **Purpose**: Test recovery from error states
- **Coverage**: Overflow recovery, continued operation after errors
- **Implementation**: `tests/integration.test.js:67-95`

### User Interface Testing Suite

#### Button Interaction Tests (`tests/ui.test.js`)
**Purpose**: Validate all user interface interactions and visual feedback

**Button Responsiveness Testing**
- **Coverage**: All number buttons (0-9), operator buttons (+,-), function buttons
- **Validation**: Click events trigger correct methods, state changes occur
- **Implementation**: `tests/ui.test.js:15-35`

**Visual Feedback Testing**
- **Coverage**: Button press animations, operator highlighting, error state styling
- **Validation**: CSS classes applied/removed correctly, visual states synchronized
- **Implementation**: `tests/ui.test.js:37-65`

**Event Handler Validation**
- **Coverage**: All button event handlers, keyboard event handlers
- **Validation**: Correct method calls, proper parameter passing
- **Implementation**: `tests/ui.test.js:125-165`

### End-to-End Testing Suite

#### Browser Compatibility Tests (`tests/e2e.test.js`)
**Purpose**: Validate complete application functionality in real browser environments

**TC8.1: Calculator Loading Test**
- **Description**: Verify application loads correctly in browser
- **Validation**: All DOM elements present, initial state correct
- **Browser Matrix**: Chrome, Firefox, Safari, Edge
- **Implementation**: `tests/e2e.test.js:25-40`

**TC8.2: Complete Calculation Workflow**
- **Description**: End-to-end calculation testing in browser
- **Test Case**: 12 + 8 = 20
- **Validation**: Button clicks work, display updates, result correct
- **Implementation**: `tests/e2e.test.js:42-52`

**Keyboard Support Testing**
- **Coverage**: All keyboard shortcuts (0-9, +, -, Enter, Escape)
- **Validation**: Keyboard events trigger same functionality as mouse clicks
- **Implementation**: `tests/e2e.test.js:70-95`

**Performance Testing**
- **Coverage**: Response times, memory usage, rapid interactions
- **Benchmarks**: Button response < 100ms, stable memory usage
- **Implementation**: `tests/e2e.test.js:130-160`

**Mobile Responsiveness Testing**
- **Coverage**: Touch interactions, viewport scaling, button sizing
- **Test Viewports**: 375x667 (iPhone), 768x1024 (iPad), custom sizes
- **Implementation**: `tests/e2e.test.js:162-185`

### Test Coverage Metrics and Goals

#### Coverage Targets
```
Line Coverage:     > 95% (Target: 98%)
Branch Coverage:   > 90% (Target: 95%)
Function Coverage: 100% (All methods tested)
Statement Coverage:> 95% (Target: 98%)
```

#### Coverage Reporting
- **HTML Reports**: Generated in `coverage/lcov-report/index.html`
- **Console Output**: Summary displayed after test runs
- **CI Integration**: Coverage data sent to Jenkins for tracking
- **Threshold Enforcement**: Builds fail if coverage drops below targets

### Test Data and Scenarios

#### Valid Test Scenarios
```javascript
// Number entry scenarios
[0, 1, 123, 12345678, -1234567]

// Calculation scenarios
["5+3=8", "10-4=6", "100+200=300", "50-75=-25"]

// Edge cases
["0+0=0", "999-999=0", "99999999 (max digits)"]
```

#### Invalid Test Scenarios
```javascript
// Overflow scenarios
["99999999+1", "123456789 (9 digits)"]

// Invalid sequences
["++", "--", "Calculate without operands"]

// Error recovery
["Operations after overflow", "Continue after error"]
```

### Manual Testing Procedures

#### Cross-Browser Testing Checklist
- [ ] Chrome (latest version) - Primary target
- [ ] Firefox (latest version) - Secondary target  
- [ ] Safari (latest version) - MacOS compatibility
- [ ] Edge (latest version) - Windows compatibility
- [ ] Mobile Chrome - Android compatibility
- [ ] Mobile Safari - iOS compatibility

#### Device Testing Matrix
```
Desktop:  1920x1080, 1366x768, 1440x900
Tablet:   768x1024, 1024x768, 834x1194
Mobile:   375x667, 414x896, 360x640
```

#### Accessibility Testing Protocol
- [ ] Keyboard navigation (Tab, Enter, Space, Arrow keys)
- [ ] Screen reader compatibility (NVDA, JAWS, VoiceOver)
- [ ] High contrast mode functionality
- [ ] Font size scaling (up to 200%)
- [ ] Color blindness testing (Deuteranopia, Protanopia, Tritanopia)

### Performance Benchmarks

#### Response Time Targets
```
Button Click Response:    < 100ms
Display Update:          < 50ms
Calculation Processing:  < 10ms
Page Load Time:          < 1s
Memory Usage (1hr):      < 50MB
```

#### Load Testing Scenarios
- **Rapid Button Clicking**: 100+ clicks/second for 10 seconds
- **Extended Usage**: 1000+ operations over 1 hour
- **Memory Stress**: Continuous operation monitoring
- **Browser Tab Switching**: State persistence validation

### Test Automation and CI Integration

#### Jenkins Pipeline Integration
The test suite is fully integrated with Jenkins CI/CD pipeline:

```groovy
stage('Unit Tests') {
    steps {
        sh 'npm run test:unit'
    }
    post {
        always {
            publishTestResults testResultsPattern: 'test-results/unit/*.xml'
        }
    }
}
```

#### Automated Test Execution Flow
1. **Code Commit** → Triggers Jenkins pipeline
2. **Environment Setup** → Install dependencies, configure browsers
3. **Unit Tests** → Execute isolated method tests
4. **Integration Tests** → Execute workflow tests  
5. **UI Tests** → Execute interface interaction tests
6. **E2E Tests** → Execute browser compatibility tests
7. **Coverage Analysis** → Generate and validate coverage reports
8. **Report Generation** → Create test results and artifacts

#### Test Result Reporting
- **JUnit XML**: Compatible with Jenkins test result publishing
- **HTML Reports**: Detailed test execution reports with screenshots
- **Coverage Reports**: Line-by-line coverage analysis
- **Performance Metrics**: Response time and memory usage tracking
- **Email Notifications**: Sent on test failures or coverage drops

---

## Deployment Guide

### Overview

The Simple Calculator Application supports multiple deployment scenarios, from local development to enterprise production environments. The deployment architecture is designed for scalability, maintainability, and continuous integration/continuous deployment (CI/CD) best practices.

### Deployment Architecture

```
Deployment Pipeline Architecture
┌─────────────────────────────────────────────────────────────────┐
│                        Source Control                          │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  GitHub Repository (perelgutTrios/CSD228-Unit1D)       │   │
│  │  ├── master branch (production-ready)                  │   │
│  │  ├── develop branch (integration)                      │   │
│  │  └── feature branches (development)                    │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────┐
│                     CI/CD Pipeline (Jenkins)                   │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐│
│  │   Build     │→│    Test     │→│   Package   │→│   Deploy    ││
│  │   Stage     │ │   Stage     │ │   Stage     │ │   Stage     ││
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘│
└─────────────────────────────────────────────────────────────────┘
                                 ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Deployment Environments                     │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐│
│  │Development  │ │   Staging   │ │   UAT       │ │ Production  ││
│  │Environment  │ │Environment  │ │Environment  │ │Environment  ││
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

### Local Development Environment

#### Prerequisites
```bash
# Required Software
Git 2.30+                    # Version control
Node.js 18+ with npm 8+      # Test framework and dependencies
Modern web browser           # Chrome 90+, Firefox 88+, Safari 14+
Text editor/IDE              # VS Code, Sublime, etc.

# Optional but Recommended
XAMPP 8.0+                   # Local web server
Git GUI client               # GitHub Desktop, SourceTree
Browser developer tools      # For debugging and testing
```

#### Setup Instructions
```bash
# 1. Clone the repository
git clone https://github.com/perelgutTrios/CSD228-Unit1D.git
cd "CSD228 Fall 2025/Unit 1D"

# 2. Install test dependencies
npm install

# 3. Verify installation
npm test
npm run test:coverage

# 4. Start local development server (Option A: XAMPP)
# Copy project to XAMPP htdocs folder
# Access: http://localhost/CSD228%20Fall%202025/Unit%201D/

# 4. Alternative: Use Node.js simple server (Option B)
npx http-server . -p 8080
# Access: http://localhost:8080/
```

#### Development Workflow
```bash
# 1. Create feature branch
git checkout -b feature/your-feature-name

# 2. Make changes and test frequently
npm run test:watch           # Continuous testing during development

# 3. Run complete test suite before committing
npm run test:all             # All test categories
npm run test:coverage        # Ensure coverage targets met

# 4. Commit and push changes
git add .
git commit -m "Description of changes"
git push origin feature/your-feature-name

# 5. Create pull request for code review
```

### Staging Environment

#### Infrastructure Requirements
```yaml
# Staging Environment Specifications
Server Requirements:
  OS: Linux Ubuntu 20.04+ / Windows Server 2019+
  CPU: 2 cores minimum
  RAM: 4GB minimum
  Storage: 20GB minimum
  Network: 100Mbps minimum

Web Server Options:
  - Apache HTTP Server 2.4+
  - Nginx 1.18+
  - IIS 10.0+ (Windows)
  - Node.js Express (containerized)

SSL Certificate:
  - Let's Encrypt (recommended for staging)
  - Self-signed certificate (development only)
```

#### Staging Deployment Process
```bash
# Automated deployment via Jenkins pipeline
# Manual deployment steps:

# 1. Pull latest code from master branch
git clone https://github.com/perelgutTrios/CSD228-Unit1D.git
cd "CSD228 Fall 2025/Unit 1D"

# 2. Run full test suite
npm install
npm run test:ci              # CI-optimized test execution
npm run test:coverage        # Verify coverage thresholds

# 3. Build production artifacts
mkdir -p build/
cp index.html build/
cp styles.css build/
cp script.js build/
cp README.md build/
cp PROJECT_DOCUMENTATION.md build/

# 4. Deploy to web server
sudo cp -r build/* /var/www/html/calculator/
sudo chown -R www-data:www-data /var/www/html/calculator/
sudo systemctl reload apache2

# 5. Verify deployment
curl -I http://staging.yourdomain.com/calculator/
# Expected: HTTP/200 OK
```

#### Staging Environment Configuration
```nginx
# Nginx configuration example
server {
    listen 80;
    server_name staging-calculator.yourdomain.com;
    
    root /var/www/html/calculator;
    index index.html;
    
    # Enable gzip compression
    gzip on;
    gzip_types text/css application/javascript text/html;
    
    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    
    # Cache static assets
    location ~* \.(css|js|html)$ {
        expires 1d;
        add_header Cache-Control "public, immutable";
    }
    
    # Health check endpoint
    location /health {
        access_log off;
        return 200 "OK\n";
    }
}
```

### Production Environment

#### Infrastructure Architecture
```
Production Environment Architecture
┌─────────────────────────────────────────────────────────┐
│                    Load Balancer                        │
│            (HAProxy/Nginx/CloudFlare)                   │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                  Web Server Cluster                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │   Web       │  │   Web       │  │   Web       │    │
│  │  Server 1   │  │  Server 2   │  │  Server 3   │    │
│  │ (Primary)   │  │ (Secondary) │  │ (Tertiary)  │    │
│  └─────────────┘  └─────────────┘  └─────────────┘    │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                   Monitoring Stack                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │  Monitoring │  │   Logging   │  │  Analytics  │    │
│  │ (Prometheus)│  │ (ELK Stack) │  │ (Google)    │    │
│  └─────────────┘  └─────────────┘  └─────────────┘    │
└─────────────────────────────────────────────────────────┘
```

#### Production Deployment Requirements
```yaml
# Production Environment Specifications
High Availability:
  - Minimum 2 server instances
  - Load balancer with health checks
  - Automated failover capability
  - Geographic redundancy (optional)

Security Requirements:
  - SSL/TLS certificate (CA-signed)
  - WAF (Web Application Firewall)
  - DDoS protection
  - Security headers implementation
  - Regular security scanning

Performance Requirements:
  - CDN integration (CloudFlare/AWS CloudFront)
  - Gzip compression enabled
  - Browser caching configured
  - Page load time < 1 second
  - 99.9% uptime SLA

Monitoring Requirements:
  - Application performance monitoring
  - Error tracking and alerting
  - User analytics integration
  - Log aggregation and analysis
  - Automated backup procedures
```

#### Production Deployment Process
```bash
# Production deployment checklist

# Pre-deployment validation
□ All tests passing in staging environment
□ Security scan completed and passed
□ Performance benchmarks validated
□ Backup procedures verified
□ Rollback plan documented and tested

# Deployment steps (Blue-Green deployment recommended)
# 1. Prepare green environment
sudo mkdir -p /var/www/html/calculator-green/
sudo cp -r staging-artifacts/* /var/www/html/calculator-green/

# 2. Run smoke tests against green environment
curl -f http://green.yourdomain.com/calculator/health
npm run test:smoke -- --url=http://green.yourdomain.com/calculator/

# 3. Switch traffic to green environment
sudo ln -sfn /var/www/html/calculator-green /var/www/html/calculator
sudo systemctl reload nginx

# 4. Verify production deployment
curl -I https://yourdomain.com/calculator/
# Expected: HTTP/200 OK with proper headers

# 5. Monitor for 15 minutes, rollback if issues detected
# Rollback command: sudo ln -sfn /var/www/html/calculator-blue /var/www/html/calculator
```

### Complete CI/CD Pipeline

#### Jenkins Pipeline Configuration

The complete Jenkins pipeline (`Jenkinsfile`) implements the following stages:

```groovy
// Complete CI/CD Pipeline Overview
pipeline {
    agent any
    
    environment {
        NODE_VERSION = '18'
        PROJECT_NAME = 'simple-calculator'
        STAGING_URL = 'https://staging-calculator.yourdomain.com'
        PRODUCTION_URL = 'https://calculator.yourdomain.com'
    }
    
    stages {
        // 1. Source Code Management
        stage('Checkout') {
            // Pull source code from GitHub
            // Verify branch and commit integrity
        }
        
        // 2. Dependency Management
        stage('Install Dependencies') {
            // npm install
            // Verify package integrity
            // Cache dependencies for faster builds
        }
        
        // 3. Code Quality Analysis
        stage('Code Quality') {
            parallel {
                stage('Lint') {
                    // ESLint code analysis
                    // CSS validation
                    // HTML validation
                }
                stage('Security Scan') {
                    // npm audit for vulnerabilities
                    // Static security analysis
                    // Dependency vulnerability scanning
                }
            }
        }
        
        // 4. Test Execution
        stage('Unit Tests') {
            // Execute Jest unit tests
            // Generate JUnit XML reports
            // Fail build if tests fail
        }
        
        stage('Integration Tests') {
            // Execute component integration tests
            // Validate user workflows
            // Test error handling scenarios
        }
        
        stage('UI Tests') {
            // Execute UI interaction tests
            // Validate visual feedback
            // Test accessibility features
        }
        
        stage('UI Tests') {
            // Execute UI interaction tests
            // DOM manipulation validation
            // Visual state testing
        }
        
        // 5. Coverage Analysis
        stage('Code Coverage') {
            // Generate coverage reports
            // Enforce coverage thresholds
            // Publish coverage artifacts
        }
        
        // 6. Build Artifacts
        stage('Build') {
            // Create deployment package
            // Minify and optimize assets (optional)
            // Generate deployment manifest
        }
        
        // 7. Staging Deployment
        stage('Deploy to Staging') {
            when { branch 'master' }
            // Deploy to staging environment
            // Run smoke tests
            // Validate deployment health
        }
        
        // 8. User Acceptance Testing
        stage('UAT Validation') {
            when { branch 'master' }
            // Automated UAT test execution
            // Performance validation
            // Security verification
        }
        
        // 9. Production Deployment
        stage('Deploy to Production') {
            when { 
                allOf {
                    branch 'master'
                    environment name: 'DEPLOY_TO_PROD', value: 'true'
                }
            }
            // Manual approval gate
            // Blue-green deployment
            // Production smoke tests
            // Monitoring and alerting setup
        }
        
        // 10. Post-deployment Validation
        stage('Production Verification') {
            // Health check validation
            // Performance monitoring setup
            // User analytics initialization
            // Backup verification
        }
    }
    
    post {
        always {
            // Archive test results
            publishTestResults testResultsPattern: 'test-results/**/*.xml'
            
            // Publish coverage reports
            publishCoverage adapters: [istanbulCoberturaAdapter('coverage/cobertura-coverage.xml')]
            
            // Archive build artifacts
            archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
            
            // Clean workspace
            cleanWs()
        }
        
        success {
            // Send success notifications
            emailext (
                subject: "✅ Calculator Build ${env.BUILD_NUMBER} - SUCCESS",
                body: "Build successfully completed. Deployment ready.",
                to: "${env.DEVELOPER_EMAIL}"
            )
        }
        
        failure {
            // Send failure notifications
            emailext (
                subject: "❌ Calculator Build ${env.BUILD_NUMBER} - FAILED",
                body: "Build failed. Please check Jenkins logs.",
                to: "${env.DEVELOPER_EMAIL}"
            )
        }
    }
}
```

#### Pipeline Triggers and Automation
```yaml
# Automated Pipeline Triggers
Webhook Triggers:
  - GitHub push to master branch → Full pipeline execution
  - GitHub pull request → Test-only pipeline execution
  - GitHub tag creation → Release pipeline execution

Scheduled Triggers:
  - Nightly builds (2 AM UTC) → Full test suite + security scan
  - Weekly regression tests → Cross-browser testing
  - Monthly dependency updates → Security audit + update cycle

Manual Triggers:
  - Production deployment approval → Manual gate before production
  - Hotfix deployment → Emergency deployment procedure
  - Rollback procedure → Automated rollback to previous version
```

### Environment Management

#### Environment Configuration Matrix
```yaml
# Environment-specific configurations
Development:
  URL: http://localhost:8080/
  SSL: Disabled
  Monitoring: Console logging only
  Cache: Disabled
  Minification: Disabled
  Source Maps: Enabled

Staging:
  URL: https://staging-calculator.yourdomain.com/
  SSL: Let's Encrypt certificate
  Monitoring: Basic APM
  Cache: Short-term (1 hour)
  Minification: Enabled
  Source Maps: Enabled (restricted access)

Production:
  URL: https://calculator.yourdomain.com/
  SSL: CA-signed certificate with HSTS
  Monitoring: Full APM + analytics
  Cache: Long-term (1 day) with versioning
  Minification: Enabled
  Source Maps: Disabled
```

#### Deployment Artifacts
```
# Generated Deployment Package Structure
dist/
├── index.html                 # Main application file
├── styles.css                 # Compiled and minified CSS
├── script.js                  # Minified JavaScript
├── README.md                  # Project documentation
├── PROJECT_DOCUMENTATION.md   # Technical documentation
├── manifest.json              # Deployment manifest
├── health.html                # Health check endpoint
└── robots.txt                 # Search engine directives
```

### Monitoring and Maintenance

#### Application Monitoring
```javascript
// Health Check Implementation
// Added to index.html for production monitoring
function healthCheck() {
    return {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        uptime: performance.now(),
        features: {
            calculator: window.Calculator ? 'available' : 'unavailable',
            dom: document.getElementById('screen') ? 'available' : 'unavailable'
        }
    };
}

// Endpoint: /health.html or /health.json
```

#### Monitoring Stack Integration
```yaml
# Production Monitoring Setup
Application Performance Monitoring:
  - Response time tracking
  - Error rate monitoring
  - User interaction analytics
  - Performance benchmarking

Log Management:
  - Application logs collection
  - Error tracking and alerting
  - User behavior analytics
  - Security event monitoring

Infrastructure Monitoring:
  - Server resource utilization
  - Network performance metrics
  - SSL certificate expiration alerts
  - Backup verification status
```

#### Maintenance Procedures
```bash
# Regular Maintenance Tasks

# Weekly maintenance
□ Security update scanning
□ Performance metric review
□ Error log analysis
□ Backup verification

# Monthly maintenance
□ Dependency update review
□ Security audit execution
□ Performance optimization review
□ Documentation updates

# Quarterly maintenance
□ Full security penetration testing
□ Disaster recovery testing
□ Architecture review
□ Technology stack evaluation
```

### Rollback and Recovery Procedures

#### Automated Rollback
```bash
# Jenkins automated rollback pipeline
# Triggered by monitoring alerts or manual intervention

# 1. Detect deployment issues
if [[ $(curl -s -o /dev/null -w "%{http_code}" $PRODUCTION_URL) != "200" ]]; then
    echo "Production health check failed, initiating rollback"
    
    # 2. Execute rollback
    sudo ln -sfn /var/www/html/calculator-blue /var/www/html/calculator
    sudo systemctl reload nginx
    
    # 3. Verify rollback success
    sleep 30
    curl -f $PRODUCTION_URL/health || exit 1
    
    # 4. Send notifications
    echo "Rollback completed successfully" | mail -s "Production Rollback" $ALERT_EMAIL
fi
```

#### Manual Recovery Procedures
```bash
# Emergency recovery procedures
# For use when automated systems fail

# 1. Stop problematic deployment
sudo systemctl stop nginx

# 2. Restore from backup
sudo cp -r /backup/calculator-last-known-good/* /var/www/html/calculator/

# 3. Restart services
sudo systemctl start nginx

# 4. Verify restoration
curl -I https://yourdomain.com/calculator/

# 5. Document incident
# Create incident report with timeline, cause, and resolution
```

### Security Considerations

#### Security Implementation Checklist
```yaml
# Production Security Requirements
SSL/TLS Configuration:
  - TLS 1.2+ minimum
  - HSTS headers enabled
  - Secure cookie flags
  - Certificate pinning (optional)

Content Security Policy:
  - Strict CSP headers
  - No inline scripts/styles
  - Whitelist external resources
  - Report-only mode for testing

Security Headers:
  - X-Frame-Options: DENY
  - X-Content-Type-Options: nosniff
  - X-XSS-Protection: 1; mode=block
  - Referrer-Policy: strict-origin-when-cross-origin

Access Control:
  - Rate limiting on endpoints
  - Geographic restrictions (if required)
  - Bot protection measures
  - CORS policy configuration
```

### Performance Optimization

#### Production Performance Targets
```yaml
# Performance Benchmarks
Page Load Metrics:
  - First Contentful Paint: < 1.5s
  - Time to Interactive: < 2.0s
  - Cumulative Layout Shift: < 0.1
  - First Input Delay: < 100ms

Resource Optimization:
  - HTML minification and compression
  - CSS concatenation and minification  
  - JavaScript minification and tree-shaking
  - Image optimization (if applicable)

Caching Strategy:
  - Browser cache: 1 day for static assets
  - CDN cache: 1 week with versioning
  - Server cache: 1 hour for dynamic content
  - Service worker: Offline functionality (optional)
```

This comprehensive deployment guide ensures reliable, scalable, and maintainable deployment of the Simple Calculator Application across all environments with proper CI/CD integration, monitoring, and security measures.

---

## Conclusion

This calculator application successfully implements all required functionality with a focus on:
- **User Experience**: Intuitive interface with visual feedback
- **Code Quality**: Well-documented, maintainable code
- **Robustness**: Comprehensive error handling and edge case management
- **Compatibility**: Cross-browser and cross-device support
- **Testing**: Thorough test coverage ensuring reliability

The modular design allows for easy extension with additional operators or features while maintaining the core simplicity required by the specification.