/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { LoanCalculatorForm } from './components/LoanCalculatorForm';
import { LoanResultsSummary } from './components/LoanResultsSummary';
import { AmortizationTable } from './components/AmortizationTable';
import { ExtraPaymentCalculator } from './components/ExtraPaymentCalculator';
import { LoanComparisonTool } from './components/LoanComparisonTool';
import { RefinanceCalculator } from './components/RefinanceCalculator';
import { DTICalculator } from './components/DTICalculator';
import { SEOContentSection } from './components/SEOContentSection';
import { AdBanner } from './components/AdBanner';
import { CurrencySymbol, LoanInputState } from './types';
import { calculateLoan } from './utils/loanCalculations';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('calculator');
  const [currency, setCurrency] = useState<CurrencySymbol>('$');

  const [loanInput, setLoanInput] = useState<LoanInputState>({
    amount: 250000,
    interestRate: 6.5,
    termYears: 30,
    termMonths: 0,
    startDate: new Date().toISOString().split('T')[0],
    paymentFrequency: 'monthly',
    extraPaymentMonthly: 0,
    extraPaymentLumpSum: 0,
    lumpSumMonth: 12,
    currency: '$',
    loanType: 'mortgage',
  });

  const calculationResult = calculateLoan({ ...loanInput, currency });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased">
      {/* Header & Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currency={currency}
        setCurrency={(c) => {
          setCurrency(c);
          setLoanInput((prev) => ({ ...prev, currency: c }));
        }}
        onPrint={handlePrint}
      />

      {/* Main App Container */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Ad Banner #1: Top Header Banner */}
        <AdBanner id={1} label="Sponsor Advertisement" />

        {/* Tab 1: Primary Loan Payment & Amortization Calculator */}
        {activeTab === 'calculator' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
              {/* Input Form Controls */}
              <div className="lg:col-span-5 space-y-6">
                <LoanCalculatorForm
                  input={loanInput}
                  onChange={setLoanInput}
                  currency={currency}
                />
                {/* Ad Banner #2: Under Input Form */}
                <AdBanner id={2} label="Featured Partner" />
              </div>

              {/* Payment Results Summary */}
              <div className="lg:col-span-7 space-y-6">
                {/* Ad Banner #3: Above Results */}
                <AdBanner id={3} label="Sponsored Rate Offers" />
                <LoanResultsSummary
                  result={calculationResult}
                  currency={currency}
                  loanAmount={loanInput.amount}
                />
              </div>
            </div>

            {/* Ad Banner #4: Between Summary and Amortization Schedule */}
            <AdBanner id={4} label="Mortgage & Finance Deals" />

            {/* Amortization Schedule Table */}
            <AmortizationTable
              schedule={calculationResult.schedule}
              yearlySummary={calculationResult.yearlySummary}
              currency={currency}
            />

            {/* Ad Banner #5: Above Additional Tools */}
            <AdBanner id={5} label="Special Refinance Rates" />
          </div>
        )}

        {/* Tab 2: Extra Payment Payoff Calculator */}
        {activeTab === 'extrapayment' && (
          <div className="space-y-6">
            <ExtraPaymentCalculator initialInput={loanInput} currency={currency} />
            {/* Ad Banner #6: Inside Extra Payment Module */}
            <AdBanner id={6} label="Early Payoff Partner Offers" />
          </div>
        )}

        {/* Tab 3: Compare 2 Loans Side-by-Side */}
        {activeTab === 'compare' && (
          <div className="space-y-6">
            <LoanComparisonTool initialInput={loanInput} currency={currency} />
            {/* Ad Banner #7: Inside Compare Loans Module */}
            <AdBanner id={7} label="Compare Top Lender Rates" />
          </div>
        )}

        {/* Tab 4: Refinance Calculator */}
        {activeTab === 'refinance' && (
          <div className="space-y-6">
            <RefinanceCalculator currency={currency} />
            {/* Ad Banner #8: Inside Refinance Module */}
            <AdBanner id={8} label="Refinance Lender Network" />
          </div>
        )}

        {/* Tab 5: Debt-to-Income (DTI) Calculator */}
        {activeTab === 'dti' && (
          <div className="space-y-6">
            <DTICalculator currency={currency} />
            {/* Ad Banner #9: Inside DTI Module */}
            <AdBanner id={9} label="Credit & Debt Solutions" />
          </div>
        )}

        {/* Technical SEO Content & FAQ Guide Section */}
        <SEOContentSection />

        {/* Ad Banner #10: Above Footer */}
        <AdBanner id={10} label="Financial Services Sponsor" />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-400">
        <div className="mx-auto max-w-7xl px-4 space-y-3">
          <p className="font-medium text-slate-300">
            © {new Date().getFullYear()} Loan Calculator. All Rights Reserved.
          </p>
          <p className="max-w-3xl mx-auto text-[11px] text-slate-400 leading-relaxed">
            Disclaimer: Calculations provided by this free online loan calculator are for estimation and educational purposes only. Actual interest rates, closing costs, and repayment terms are determined by individual financial institutions and mortgage lenders.
          </p>
          <div className="flex items-center justify-center gap-4 text-[11px] text-sky-400">
            <a href="./sitemap.xml" className="hover:underline">Sitemap</a>
            <span>•</span>
            <a href="./robots.txt" className="hover:underline">Robots.txt</a>
            <span>•</span>
            <a href="./google13c2e7412d3ff1b2.html" className="hover:underline font-mono">GSC Verification</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
