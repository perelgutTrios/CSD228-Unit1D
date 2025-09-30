# Test Execution Guide

This document provides instructions for running the comprehensive test suite for the Simple Calculator Application.

## Test Framework Overview

The testing strategy uses multiple frameworks and approaches:

- **Jest**: JavaScript unit and integration testing
- **Puppeteer**: End-to-end browser testing  
- **Jenkins**: Continuous integration and automated testing
- **Manual Testing**: Cross-browser and accessibility validation

## Prerequisites

### Software Requirements
```bash
# Node.js and npm
node --version  # Should be >= 14.0.0
npm --version   # Should be >= 6.0.0

# Git (for version control)
git --version

# Modern browsers for testing
# Chrome, Firefox, Safari, Edge
```

### Environment Setup
```bash
# Clone the repository
git clone https://github.com/perelgutTrios/CSD228-Unit1D.git
cd "CSD228 Fall 2025/Unit 1D"

# Install dependencies
npm install

# Verify installation
npm test --version
```

## Running Tests

### Quick Test Commands
```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test suites
npm run test:unit          # Unit tests only
npm run test:integration   # Integration tests only
npm run test:ui           # UI interaction tests only

# Watch mode (re-runs tests on file changes)
npm run test:watch
```

### Detailed Test Execution

#### 1. Unit Tests
```bash
npm run test:unit
```
**Purpose**: Test individual Calculator class methods in isolation
**Coverage**: Number entry, operators, calculations, display logic
**Expected Results**: All 25+ unit tests should pass

#### 2. Integration Tests
```bash
npm run test:integration
```
**Purpose**: Test component interactions and complete workflows
**Coverage**: User workflows, state management, error handling
**Expected Results**: All integration scenarios should pass

#### 3. UI Tests
```bash
npm run test:ui
```
**Purpose**: Test user interface interactions and visual feedback
**Coverage**: Button clicks, display updates, visual states
**Expected Results**: All UI interaction tests should pass

#### 4. End-to-End Tests
```bash
# Note: Requires browser installation
npm run test:e2e
```
**Purpose**: Test complete application in real browser environment
**Coverage**: Browser compatibility, keyboard support, performance
**Expected Results**: All E2E scenarios should pass

### Coverage Reports
```bash
# Generate comprehensive coverage report
npm run test:coverage

# View coverage report
# Open coverage/lcov-report/index.html in browser
```

**Coverage Targets**:
- Line Coverage: > 95%
- Branch Coverage: > 90%
- Function Coverage: 100%

## Test Categories and Expected Results

### TC1: Number Entry Tests (5 tests)
- ✅ Single digit entry
- ✅ Multiple digit building
- ✅ Zero handling
- ✅ Maximum digit limits
- ✅ Overflow prevention

### TC2: Operator Tests (5 tests)
- ✅ Addition operator state
- ✅ Subtraction operator state
- ✅ Operator chaining
- ✅ Visual feedback
- ✅ Invalid sequences

### TC3: Calculation Tests (5 tests)
- ✅ Basic addition
- ✅ Basic subtraction
- ✅ Result overflow handling
- ✅ Negative results
- ✅ Chain calculations

### TC4: Reset Functionality Tests (5 tests)
- ✅ Reset during entry
- ✅ Reset during operator selection
- ✅ Reset after calculation
- ✅ Reset during errors
- ✅ Complete state cleanup

### TC5: Display Tests (5 tests)
- ✅ Number formatting
- ✅ Overflow messages
- ✅ Error messages
- ✅ Display alignment
- ✅ Character limits

### TC6: User Interface Tests (5 tests)
- ✅ Button responsiveness
- ✅ Visual feedback
- ✅ Animation effects
- ✅ Touch interface
- ✅ Accessibility features

### TC7: Edge Case Tests (5 tests)
- ✅ Rapid interactions
- ✅ Invalid sequences
- ✅ Memory limits
- ✅ State persistence
- ✅ Error recovery

### TC8: Browser Compatibility Tests (5 tests)
- ✅ Chrome compatibility
- ✅ Firefox compatibility
- ✅ Safari compatibility
- ✅ Edge compatibility
- ✅ Mobile browsers

## Manual Testing Checklist

### Cross-Browser Testing
- [ ] Chrome (latest version)
- [ ] Firefox (latest version)
- [ ] Safari (latest version)
- [ ] Edge (latest version)
- [ ] Mobile Chrome
- [ ] Mobile Safari

### Device Testing
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] Large Mobile (414x896)

### Accessibility Testing
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] High contrast mode
- [ ] Font size scaling
- [ ] Color blind testing

### Performance Testing
- [ ] Page load time < 1 second
- [ ] Button response time < 100ms
- [ ] Memory usage stability
- [ ] No memory leaks after extended use

## Continuous Integration with Jenkins

### Jenkins Pipeline Setup
```bash
# The Jenkinsfile defines a complete CI/CD pipeline
# Stages include:
# 1. Checkout source code
# 2. Install dependencies
# 3. Run unit tests
# 4. Run integration tests
# 5. Run UI tests
# 6. Run E2E tests
# 7. Generate coverage reports
# 8. Build artifacts
# 9. Deploy to staging
# 10. Deploy to production (with approval)
```

### Jenkins Configuration
1. Create new Pipeline job in Jenkins
2. Point to repository: `https://github.com/perelgutTrios/CSD228-Unit1D`
3. Set script path to `Jenkinsfile`
4. Configure webhooks for automatic builds

### Jenkins Test Reports
- Unit test results: Published as JUnit XML
- Coverage reports: Published as HTML
- Build artifacts: Archived for deployment
- Email notifications: On build status changes

## Troubleshooting

### Common Issues

#### Tests Fail to Start
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### Browser Tests Fail
```bash
# Install Puppeteer manually
npm install puppeteer --save-dev

# For Linux systems, install browser dependencies
sudo apt-get install -y chromium-browser
```

#### Coverage Reports Not Generated
```bash
# Ensure jest coverage is configured
npm run test:coverage -- --verbose
```

### Debug Mode
```bash
# Run tests with detailed output
npm test -- --verbose

# Run single test file
npm test -- unit.test.js

# Run with debugging
npm test -- --detectOpenHandles --forceExit
```

## Test Data and Scenarios

### Valid Test Cases
- Numbers: 0, 1, 123, 12345678, -1234567
- Operations: 5+3, 10-4, 100+200, 50-75
- Edge cases: 0+0, 999-999, maximum digits

### Invalid Test Cases
- Overflow: 99999999+1, 123456789 (9 digits)
- Invalid sequences: ++, --, Calculate without operands
- Error recovery: Operations after overflow/error

### Performance Test Cases
- Rapid button clicking (100+ clicks/second)
- Extended usage (1000+ operations)
- Memory stress testing
- Concurrent user simulation

## Reporting Issues

### Bug Report Template
```
**Test Case**: TC1.1 - Single digit entry
**Environment**: Chrome 119, Windows 11
**Steps to Reproduce**:
1. Open calculator
2. Click digit 5
3. Observe display

**Expected Result**: Display shows "5"
**Actual Result**: Display shows "0"
**Severity**: High
**Screenshots**: [Attach if applicable]
```

### Performance Issue Template
```
**Test Case**: Performance - Button Response
**Environment**: [Browser/OS]
**Metric**: Button click to display update
**Expected**: < 100ms
**Actual**: 500ms
**Load Conditions**: [Normal/Heavy]
**Steps to Reproduce**: [Detailed steps]
```

## Test Maintenance

### Adding New Tests
1. Create test file in `/tests/` directory
2. Follow naming convention: `feature.test.js`
3. Include comprehensive test documentation
4. Update this guide with new test cases
5. Ensure coverage targets are maintained

### Updating Existing Tests
1. Maintain backward compatibility
2. Update test documentation
3. Verify all related tests still pass
4. Update expected results if behavior changes

### Test Review Process
1. All tests must pass before merging
2. Code coverage must meet targets
3. Manual testing checklist completed
4. Cross-browser validation performed
5. Performance benchmarks maintained

---

**Last Updated**: September 30, 2025
**Test Framework Version**: Jest 29.7.0, Puppeteer 21.3.0
**Maintainer**: CSD228 Development Team