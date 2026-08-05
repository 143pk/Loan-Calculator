import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { CurrencySymbol, RefinanceInput } from '../types';
import { calculateRefinance, formatCurrency } from '../utils/loanCalculations';

interface RefinanceCalculatorProps {
  currency: CurrencySymbol;
}

export const RefinanceCalculator: React.FC<RefinanceCalculatorProps> = ({ currency }) => {
  const [input, setInput] = useState<RefinanceInput>({
    currentBalance: 280000,
    currentRate: 7.2,
    remainingYears: 27,
    newRate: 5.8,
    newTermYears: 25,
    refinanceCosts: 4500,
    currency,
  });

  const result = calculateRefinance(input);

  const handleNumChange = (field: keyof RefinanceInput, value: number) => {
    setInput({ ...input, [field]: isNaN(value) ? 0 : value });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-sky-500/30 bg-slate-900/90 p-5 sm:p-6 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/20 text-sky-400">
            <RefreshCw className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">
              Mortgage & Loan Refinance Calculator
            </h2>
            <p className="text-xs text-slate-300">
              Find out if refinancing your current mortgage or loan at a lower rate covers your closing costs and saves money.
            </p>
          </div>
        </div>

        {/* Input Parameters Grid */}
        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Current Loan */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 border-b border-slate-800 pb-2">
              Existing Current Loan
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Current Loan Balance ({currency})
                </label>
                <input
                  type="number"
                  value={input.currentBalance}
                  onChange={(e) => handleNumChange('currentBalance', parseFloat(e.target.value))}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Current Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={input.currentRate}
                    onChange={(e) => handleNumChange('currentRate', parseFloat(e.target.value))}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Remaining Years
                  </label>
                  <input
                    type="number"
                    value={input.remainingYears}
                    onChange={(e) => handleNumChange('remainingYears', parseInt(e.target.value))}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* New Proposed Refinance */}
          <div className="rounded-xl border border-sky-500/40 bg-slate-950/80 p-4">
            <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-3 border-b border-slate-800 pb-2">
              New Refinance Offer
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    New Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={input.newRate}
                    onChange={(e) => handleNumChange('newRate', parseFloat(e.target.value))}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    New Term (Years)
                  </label>
                  <input
                    type="number"
                    value={input.newTermYears}
                    onChange={(e) => handleNumChange('newTermYears', parseInt(e.target.value))}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Estimated Closing Costs & Fees ({currency})
                </label>
                <input
                  type="number"
                  step="250"
                  value={input.refinanceCosts}
                  onChange={(e) => handleNumChange('refinanceCosts', parseFloat(e.target.value))}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Refinance Verdict & Savings Output */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Monthly Payment Savings */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Monthly Savings
          </span>
          <span className="text-2xl font-extrabold font-mono text-sky-400">
            {formatCurrency(result.monthlySavings, currency)}/mo
          </span>
          <div className="mt-3 text-xs text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>Current Payment:</span>
              <span className="text-white font-mono">{formatCurrency(result.currentMonthlyPayment, currency)}</span>
            </div>
            <div className="flex justify-between">
              <span>New Refi Payment:</span>
              <span className="text-sky-300 font-mono">{formatCurrency(result.newMonthlyPayment, currency)}</span>
            </div>
          </div>
        </div>

        {/* Break Even Period */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Closing Cost Break-Even
          </span>
          <span className="text-2xl font-extrabold font-mono text-amber-400">
            {result.breakEvenMonths > 0 ? `${result.breakEvenMonths} Months` : 'N/A'}
          </span>
          <p className="mt-3 text-xs text-slate-400">
            Time required for monthly payment savings to recover closing costs (
            {formatCurrency(input.refinanceCosts, currency)}).
          </p>
        </div>

        {/* Net Lifetime Savings */}
        <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950/60 to-slate-900 p-5 shadow-xl">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
            Net Lifetime Savings
          </span>
          <span className="text-2xl font-extrabold font-mono text-emerald-300">
            {formatCurrency(result.netLifetimeSavings, currency)}
          </span>
          <p className="mt-3 text-xs text-emerald-200/90 font-medium flex items-center gap-1.5">
            {result.isRecommended ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                Refinancing is financially beneficial!
              </>
            ) : (
              <>
                <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                Closing costs exceed long-term rate savings.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
