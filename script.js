/* ======================================
   TIP CALCULATOR APPLICATION
   ====================================== 
   
   This tip calculator supports:
   - Smart tip rounding based on bill amount
   - User override of recommended tips
   - Bill splitting with detailed breakdown
   - Real-time calculations and updates
   - Mobile-optimized interface
*/

/**
 * TipCalculator class - handles all tip calculation functionality
 */
class TipCalculator {
    /**
     * Constructor - initializes tip calculator state and sets up event listeners
     */
    constructor() {
        // Get references to input elements (with null checks for testing)
        this.billInput = document?.getElementById ? document.getElementById('billAmount') : null;
        this.taxInput = document?.getElementById ? document.getElementById('taxAmount') : null;
        this.totalDisplay = document?.getElementById ? document.getElementById('totalBill') : null;
        this.showTipsBtn = document?.getElementById ? document.getElementById('showTips') : null;
        
        // State variables
        this.currentGuests = 1;
        this.recommendations = {};
        this.userOverrides = {};
        this.selectedOption = null;
        this.customRate = 5; // Default custom rate percentage
        
        // Tip rate presets
        this.tipRates = {
            excellent: { rate: 0.20, label: "💯 Excellent Service", description: "20%" },
            good: { rate: 0.16, label: "😊 Good Service", description: "16%" },
            standard: { rate: 0.125, label: "👌 Standard Service", description: "12.5%" },
            custom: { rate: 0.05, label: "💰 Custom Rate", description: "5%" }
        };
        
        // Initialize event listeners (only if DOM is available)
        if (typeof document !== 'undefined' && document.getElementById) {
            this.initializeEventListeners();
            
            // Initial state
            this.updateTotalBill();
            this.updateShowTipsButton();
        }
    }
    
    /**
     * Sets up all event listeners for the tip calculator
     */
    initializeEventListeners() {
        // Input field listeners for real-time updates
        if (this.billInput) {
            this.billInput.addEventListener('input', () => {
                this.updateTotalBill();
                this.updateShowTipsButton();
                this.hideRecommendations();
            });
        }
        
        if (this.taxInput) {
            this.taxInput.addEventListener('input', () => {
                this.updateTotalBill();
                this.updateShowTipsButton();
                this.hideRecommendations();
            });
        }
        
        // Guest selector buttons
        if (document.querySelectorAll) {
            document.querySelectorAll('.guest-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.selectGuests(e.target.dataset.guests);
                });
            });
        }
        
        // Custom guest input
        const customGuestsInput = document.getElementById('customGuests');
        if (customGuestsInput) {
            customGuestsInput.addEventListener('input', (e) => {
                const guests = parseInt(e.target.value) || 7;
                this.currentGuests = Math.max(7, Math.min(50, guests));
                this.updatePaymentBreakdown();
            });
        }
        
        // Show tips button
        if (this.showTipsBtn) {
            this.showTipsBtn.addEventListener('click', () => {
                this.generateRecommendations();
            });
        }
        
        // Keyboard support for accessibility
        if (document.addEventListener) {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && this.showTipsBtn && !this.showTipsBtn.disabled) {
                    this.generateRecommendations();
                }
            });
        }
    }
    
    /**
     * Updates the total bill display (bill + tax)
     */
    updateTotalBill() {
        const billAmount = parseFloat(this.billInput?.value) || 0;
        const taxAmount = parseFloat(this.taxInput?.value) || 0;
        const total = billAmount + taxAmount;
        
        if (this.totalDisplay) {
            this.totalDisplay.textContent = this.formatCurrency(total);
            
            // Update display styling based on whether values are entered
            if (total > 0) {
                this.totalDisplay.classList.add('has-value');
            } else {
                this.totalDisplay.classList.remove('has-value');
            }
        }
    }
    
    /**
     * Updates the show tips button state
     */
    updateShowTipsButton() {
        const billAmount = parseFloat(this.billInput?.value) || 0;
        const hasValidBill = billAmount > 0;
        
        if (this.showTipsBtn) {
            this.showTipsBtn.disabled = !hasValidBill;
            
            if (hasValidBill) {
                this.showTipsBtn.classList.add('ready');
            } else {
                this.showTipsBtn.classList.remove('ready');
            }
        }
    }
    
    /**
     * Handles guest selection
     * @param {string} guests - Number of guests or '6+' for custom
     */
    selectGuests(guests) {
        // Remove active class from all buttons
        if (document.querySelectorAll) {
            document.querySelectorAll('.guest-btn').forEach(btn => {
                btn.classList.remove('active');
            });
        }
        
        // Add active class to selected button (only in browser environment)
        if (typeof event !== 'undefined' && event.target) {
            event.target.classList.add('active');
        }
        
        if (guests === '6+') {
            // Show custom input
            const customGuestsSection = document.querySelector && document.querySelector('.custom-guests');
            if (customGuestsSection) {
                customGuestsSection.style.display = 'flex';
            }
            const customGuestsInput = document.getElementById && document.getElementById('customGuests');
            this.currentGuests = parseInt(customGuestsInput?.value) || 7;
        } else {
            // Hide custom input and set guests
            const customGuestsSection = document.querySelector && document.querySelector('.custom-guests');
            if (customGuestsSection) {
                customGuestsSection.style.display = 'none';
            }
            this.currentGuests = parseInt(guests);
        }
        
        // Update breakdown if visible
        if (this.selectedOption) {
            this.updatePaymentBreakdown();
        }
    }
    
    /**
     * Smart rounding based on total bill amount (bill + tax + tip)
     * @param {number} totalBill - The total bill amount (bill + tax + tip)
     * @param {number} originalTip - The calculated tip amount
     * @param {number} billAmount - The bill amount before tax
     * @param {number} taxAmount - The tax amount
     * @returns {object} - Object containing rounded totals and rounding info
     */
    smartRoundBill(totalBill, originalTip, billAmount, taxAmount) {
        let roundedTotal;
        let roundingLevel;
        let roundingDescription;
        
        if (totalBill < 10) {
            // Round to nearest $0.50
            roundedTotal = Math.round(totalBill * 2) / 2;
            roundingLevel = "half-dollar";
            roundingDescription = "Total rounded to nearest 50¢ for small bills";
        } else if (totalBill < 25) {
            // Round to nearest $0.75 
            // This means we round to .00, .75, 1.50, 2.25, etc.
            roundedTotal = Math.round(totalBill / 0.75) * 0.75;
            roundingLevel = "seventy-five";
            roundingDescription = "Total rounded to nearest 75¢ for mid-range bills";
        } else {
            // Round to nearest $1.00
            roundedTotal = Math.round(totalBill);
            roundingLevel = "dollar";
            roundingDescription = "Total rounded to nearest dollar for large bills";
        }
        
        // Calculate the adjusted tip (rounded total - bill - tax)
        const adjustedTip = roundedTotal - billAmount - taxAmount;
        
        return {
            originalTotal: totalBill,
            roundedTotal: roundedTotal,
            originalTip: originalTip,
            adjustedTip: Math.max(0, adjustedTip), // Ensure tip isn't negative
            roundingLevel: roundingLevel,
            roundingDescription: roundingDescription,
            difference: roundedTotal - totalBill
        };
    }
    
    /**
     * Generates tip recommendations with smart total bill rounding
     */
    generateRecommendations() {
        const billAmount = parseFloat(this.billInput.value) || 0;
        const taxAmount = parseFloat(this.taxInput.value) || 0;
        
        if (billAmount <= 0) return;
        
        // Calculate recommendations for each tip rate
        Object.keys(this.tipRates).forEach(key => {
            // Use custom rate for custom option, otherwise use preset rate
            const rate = key === 'custom' ? (this.customRate / 100) : this.tipRates[key].rate;
            const exactTip = billAmount * rate;
            const exactTotal = billAmount + taxAmount + exactTip;
            const roundingResult = this.smartRoundBill(exactTotal, exactTip, billAmount, taxAmount);
            
            this.recommendations[key] = {
                ...this.tipRates[key],
                exactTip: exactTip,
                exactTotal: exactTotal,
                suggestedTip: roundingResult.adjustedTip,
                suggestedTotal: roundingResult.roundedTotal,
                userTip: this.userOverrides[key] || roundingResult.adjustedTip,
                roundingInfo: roundingResult
            };
        });
        
        this.displayRecommendations();
        this.showRecommendations();
    }
    
    /**
     * Displays the tip recommendations with override inputs
     */
    displayRecommendations() {
        const container = document.getElementById('tipOptions');
        const roundingInfo = document.getElementById('roundingInfo');
        
        // Show rounding explanation
        const firstRec = Object.values(this.recommendations)[0];
        roundingInfo.textContent = firstRec.roundingInfo.roundingDescription + " (makes payment easier)";
        
        // Clear existing options
        container.innerHTML = '';
        
        Object.keys(this.recommendations).forEach(key => {
            const rec = this.recommendations[key];
            const isOverridden = Math.abs(rec.userTip - rec.suggestedTip) > 0.001;
            const isSelected = this.selectedOption === key;
            
            const optionDiv = document.createElement('div');
            optionDiv.className = `tip-option ${isSelected ? 'selected' : ''}`;
            optionDiv.dataset.option = key;
            
            optionDiv.innerHTML = `
                <div class="tip-header">
                    <span class="tip-label">${rec.label}</span>
                    <span class="tip-rate">${key === 'custom' ? `${this.customRate}%` : rec.description}</span>
                    ${key === 'custom' ? `
                        <div class="custom-rate-input">
                            <input type="number" 
                                   id="customRateInput" 
                                   value="${this.customRate}" 
                                   min="0" 
                                   max="50" 
                                   step="0.5"
                                   placeholder="5">
                            <span>%</span>
                        </div>
                    ` : ''}
                </div>
                
                <div class="tip-amounts">
                    <div class="suggested-tip">
                        Suggested tip: ${this.formatCurrency(rec.suggestedTip)}
                        ${Math.abs(rec.exactTip - rec.suggestedTip) > 0.001 ? 
                            `<small>(adjusted from ${this.formatCurrency(rec.exactTip)})</small>` : ''}
                    </div>
                    <div class="suggested-total">
                        <strong>Total payment: ${this.formatCurrency(rec.suggestedTotal)}</strong>
                        ${Math.abs(rec.exactTotal - rec.suggestedTotal) > 0.001 ? 
                            `<small>(rounded from ${this.formatCurrency(rec.exactTotal)})</small>` : ''}
                    </div>
                    
                    <div class="user-tip">
                        <label>Your tip:</label>
                        <div class="tip-input-wrapper">
                            <span class="currency-symbol">$</span>
                            <input type="number" 
                                   class="tip-override" 
                                   data-option="${key}"
                                   value="${rec.userTip.toFixed(2)}" 
                                   step="0.01" 
                                   min="0">
                        </div>
                        ${isOverridden ? '<span class="override-indicator">✏️ Modified</span>' : ''}
                    </div>
                </div>
                
                <button class="select-option" data-option="${key}">
                    ${isSelected ? '✅ Selected' : 'Calculate with this tip'}
                </button>
            `;
            
            container.appendChild(optionDiv);
        });
        
        // Add event listeners for overrides and selection
        this.attachRecommendationListeners();
    }
    
    /**
     * Attaches event listeners to recommendation elements
     */
    attachRecommendationListeners() {
        // Tip override inputs
        document.querySelectorAll('.tip-override').forEach(input => {
            input.addEventListener('input', (e) => {
                const option = e.target.dataset.option;
                const newTip = parseFloat(e.target.value) || 0;
                this.onTipOverride(option, newTip);
            });
        });
        
        // Option selection buttons
        document.querySelectorAll('.select-option').forEach(button => {
            button.addEventListener('click', (e) => {
                const option = e.target.dataset.option;
                this.selectOption(option);
            });
        });
        
        // Custom rate input
        const customRateInput = document.getElementById('customRateInput');
        if (customRateInput) {
            customRateInput.addEventListener('input', (e) => {
                const newRate = parseFloat(e.target.value) || 5;
                this.customRate = Math.max(0, Math.min(50, newRate)); // Clamp between 0-50%
                this.onCustomRateChange();
            });
        }
    }
    
    /**
     * Handles user tip override
     * @param {string} option - The tip option key
     * @param {number} newTipAmount - The new tip amount
     */
    onTipOverride(option, newTipAmount) {
        this.userOverrides[option] = newTipAmount;
        this.recommendations[option].userTip = newTipAmount;
        
        // Recalculate user's total (no rounding applied to overrides)
        const billAmount = parseFloat(this.billInput.value) || 0;
        const taxAmount = parseFloat(this.taxInput.value) || 0;
        this.recommendations[option].userTotal = billAmount + taxAmount + newTipAmount;
        
        // Update override indicator
        const optionDiv = document.querySelector(`[data-option="${option}"]`);
        const indicator = optionDiv.querySelector('.override-indicator');
        const suggestedTip = this.recommendations[option].suggestedTip;
        const isOverridden = Math.abs(newTipAmount - suggestedTip) > 0.001;
        
        if (isOverridden && !indicator) {
            const tipDiv = optionDiv.querySelector('.user-tip');
            tipDiv.insertAdjacentHTML('beforeend', '<span class="override-indicator">✏️ Modified</span>');
        } else if (!isOverridden && indicator) {
            indicator.remove();
        }
        
        // Update the total display in the option
        const totalDisplay = optionDiv.querySelector('.user-total');
        if (totalDisplay) {
            totalDisplay.textContent = `Total: ${this.formatCurrency(this.recommendations[option].userTotal)}`;
        }
        
        // Update payment breakdown if this option is selected
        if (this.selectedOption === option) {
            this.updatePaymentBreakdown();
        }
    }

    /**
     * Handles custom tip rate changes
     */
    onCustomRateChange() {
        // Recalculate recommendations with new custom rate
        this.generateRecommendations();
        this.displayRecommendations();
        this.attachRecommendationListeners();
        
        // Update payment breakdown if custom is selected
        if (this.selectedOption === 'custom') {
            this.updatePaymentBreakdown();
        }
    }
    
    /**
     * Selects a tip option and shows payment breakdown
     * @param {string} option - The tip option key
     */
    selectOption(option) {
        this.selectedOption = option;
        
        // Update UI to show selection
        document.querySelectorAll('.tip-option').forEach(div => {
            div.classList.remove('selected');
        });
        document.querySelector(`[data-option="${option}"]`).classList.add('selected');
        
        // Update button text
        document.querySelectorAll('.select-option').forEach(btn => {
            const btnOption = btn.dataset.option;
            btn.textContent = btnOption === option ? '✅ Selected' : 'Calculate with this tip';
        });
        
        // Show and update payment breakdown
        this.updatePaymentBreakdown();
        this.showPaymentBreakdown();
    }
    
    /**
     * Calculates and updates the payment breakdown
     */
    updatePaymentBreakdown() {
        if (!this.selectedOption) return;
        
        const billAmount = parseFloat(this.billInput.value) || 0;
        const taxAmount = parseFloat(this.taxInput.value) || 0;
        const tipAmount = this.recommendations[this.selectedOption].userTip;
        const totalPayment = billAmount + taxAmount + tipAmount;
        const perPerson = totalPayment / this.currentGuests;
        
        const breakdown = {
            billAmount: billAmount,
            taxAmount: taxAmount,
            tipAmount: tipAmount,
            totalPayment: totalPayment,
            perPerson: perPerson,
            guests: this.currentGuests,
            optionLabel: this.recommendations[this.selectedOption].label
        };
        
        this.displayPaymentBreakdown(breakdown);
    }
    
    /**
     * Displays the payment breakdown
     * @param {object} breakdown - The payment breakdown data
     */
    displayPaymentBreakdown(breakdown) {
        const container = document.getElementById('paymentBreakdown');
        
        container.innerHTML = `
            <div class="breakdown-header">
                <h3>📋 Payment Breakdown</h3>
                <p>Selected: ${breakdown.optionLabel}</p>
            </div>
            
            <div class="breakdown-details">
                <div class="breakdown-line">
                    <span>Bill (before tax):</span>
                    <span>${this.formatCurrency(breakdown.billAmount)}</span>
                </div>
                <div class="breakdown-line">
                    <span>Tax:</span>
                    <span>${this.formatCurrency(breakdown.taxAmount)}</span>
                </div>
                <div class="breakdown-line">
                    <span>Tip:</span>
                    <span>${this.formatCurrency(breakdown.tipAmount)}</span>
                </div>
                <div class="breakdown-separator"></div>
                <div class="breakdown-line total">
                    <span><strong>Total Payment:</strong></span>
                    <span><strong>${this.formatCurrency(breakdown.totalPayment)}</strong></span>
                </div>
                
                <div class="per-person-section">
                    <div class="guests-info">
                        <span>👥 For ${breakdown.guests} guest${breakdown.guests !== 1 ? 's' : ''}:</span>
                    </div>
                    <div class="per-person-amount">
                        <span><strong>Each person pays: ${this.formatCurrency(breakdown.perPerson)}</strong></span>
                    </div>
                </div>
            </div>
            
            <div class="breakdown-actions">
                <button class="copy-breakdown" onclick="tipCalc.copyBreakdown()">📋 Copy Breakdown</button>
                <button class="new-calculation" onclick="tipCalc.newCalculation()">🔄 New Calculation</button>
            </div>
        `;
    }
    
    /**
     * Shows the recommendations section
     */
    showRecommendations() {
        document.getElementById('recommendations').style.display = 'block';
        document.getElementById('recommendations').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    }
    
    /**
     * Hides the recommendations section
     */
    hideRecommendations() {
        document.getElementById('recommendations').style.display = 'none';
        document.getElementById('paymentBreakdown').style.display = 'none';
        this.selectedOption = null;
    }
    
    /**
     * Shows the payment breakdown section
     */
    showPaymentBreakdown() {
        document.getElementById('paymentBreakdown').style.display = 'block';
        document.getElementById('paymentBreakdown').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    }
    
    /**
     * Copies payment breakdown to clipboard
     */
    copyBreakdown() {
        if (!this.selectedOption) return;
        
        const billAmount = parseFloat(this.billInput.value) || 0;
        const taxAmount = parseFloat(this.taxInput.value) || 0;
        const tipAmount = this.recommendations[this.selectedOption].userTip;
        const totalPayment = billAmount + taxAmount + tipAmount;
        const perPerson = totalPayment / this.currentGuests;
        
        const text = `Payment Breakdown:
Bill: ${this.formatCurrency(billAmount)}
Tax: ${this.formatCurrency(taxAmount)}
Tip: ${this.formatCurrency(tipAmount)}
Total: ${this.formatCurrency(totalPayment)}
Per person (${this.currentGuests} guests): ${this.formatCurrency(perPerson)}`;
        
        navigator.clipboard.writeText(text).then(() => {
            // Show feedback
            const btn = document.querySelector('.copy-breakdown');
            const originalText = btn.textContent;
            btn.textContent = '✅ Copied!';
            setTimeout(() => {
                btn.textContent = originalText;
            }, 2000);
        });
    }
    
    /**
     * Starts a new calculation
     */
    newCalculation() {
        // Reset form
        this.billInput.value = '';
        this.taxInput.value = '';
        
        // Reset state
        this.userOverrides = {};
        this.selectedOption = null;
        
        // Reset guest selection to 1
        document.querySelectorAll('.guest-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector('[data-guests="1"]').classList.add('active');
        document.querySelector('.custom-guests').style.display = 'none';
        this.currentGuests = 1;
        
        // Update displays
        this.updateTotalBill();
        this.updateShowTipsButton();
        this.hideRecommendations();
        
        // Focus on first input
        this.billInput.focus();
    }
    
    /**
     * Formats a number as currency
     * @param {number} amount - The amount to format
     * @returns {string} - The formatted currency string
     */
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    }
}

/* ======================================
   APPLICATION INITIALIZATION
   ====================================== */

// Global tip calculator instance
let tipCalc;

/**
 * Initialize the tip calculator when the DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    tipCalc = new TipCalculator();
});

// Export TipCalculator class for Node.js testing environment (if module.exports exists)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TipCalculator;
}