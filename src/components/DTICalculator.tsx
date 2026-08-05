import React, { useState } from 'react';
import { PieChart, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { CurrencySymbol, DTIInput } from '../types';
import { calculateDTI, formatCurrency } from '../utils/loanCalculations';

interface DTICalculatorProps {
  currency: CurrencySymbol;
}

export const DTICalculator: React.FC<DTICalculatorProps> = ({ currency }) => {
  const [input, setInput] = useState<DTIInput>({
    grossMonthlyIncome: 8500,
    monthlyRentMortgage: 2200,
    monthlyAutoLoan: 450,
    monthlyCreditCards: 150,
    monthlyStudentLoans: 300,
    monthlyOtherDebt: 0,
    currency,
  });

  const result = calculateDTI(input);

  const handleNumChange = (field: keyof DTIInput, value: number) => {
    setInput({ ...input, [field]: isNaN(value) ? 0 : value });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-sky-500/30 bg-slate-900/90 p-5 sm:p-6 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/20 text-sky-400">
            <PieChart className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">
              Debt-to-Income (DTI) Ratio Calculator
            </h2>
            <p className="text-xs text-slate-300">
              Lenders analyze your DTI ratio to evaluate mortgage, loan, and credit card approval eligibility.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Income & Housing */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-3">
            <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider border-b border-slate-800 pb-2">
              Monthly Income & Housing
            </h3>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Gross Monthly Income (Before Taxes) ({currency})
              </label>
              <input
                type="number"
                step="250"
                value={input.grossMonthlyIncome}
                onChange={(e) => handleNumChange('grossMonthlyIncome', parseFloat(e.target.value))}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Monthly Rent or Proposed Mortgage ({currency})
              </label>
              <input
                type="number"
                step="100"
                value={input.monthlyRentMortgage}
                onChange={(e) => handleNumChange('monthlyRentMortgage', parseFloat(e.target.value))}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Recurring Debt Obligations */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-3">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider border-b border-slate-800 pb-2">
              Other Recurring Monthly Debts
            </h3>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Auto Loans ({currency})
                </label>
                <input
                  type="number"
                  value={input.monthlyAutoLoan}
                  onChange={(e) => handleNumChange('monthlyAutoLoan', parseFloat(e.target.value))}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Credit Cards ({currency})
                </label>
                <input
                  type="number"
                  value={input.monthlyCreditCards}
                  onChange={(e) => handleNumChange('monthlyCreditCards', parseFloat(e.target.value))}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Student Loans ({currency})
                </label>
                <input
                  type="number"
                  value={input.monthlyStudentLoans}
                  onChange={(e) => handleNumChange('monthlyStudentLoans', parseFloat(e.target.value))}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Other Obligations ({currency})
                </label>
                <input
                  type="number"
                  value={input.monthlyOtherDebt}
                  onChange={(e) => handleNumChange('monthlyOtherDebt', parseFloat(e.target.value))}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DTI Score Output Cards */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Front End DTI */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Front-End DTI (Housing Ratio)
          </span>
          <span className="text-3xl font-extrabold font-mono text-sky-400">
            {result.frontEndRatio.toFixed(1)}%
          </span>
          <p className="mt-2 text-xs text-slate-400">
            Lenders prefer housing expenses under 28% of gross monthly income.
          </p>
        </div>

        {/* Back End DTI */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Back-End DTI (Total Debt Ratio)
          </span>
          <span
            className={`text-3xl font-extrabold font-mono ${
              result.backEndRatio <= 35
                ? 'text-emerald-400'
                : result.backEndRatio <= 43
                ? 'text-amber-400'
                : 'text-rose-400'
            }`}
          >
            {result.backEndRatio.toFixed(1)}%
          </span>
          <p className="mt-2 text-xs text-slate-400">
            Total monthly debt obligations relative to total gross monthly income.
          </p>
        </div>

        {/* Maximum Borrowing Capacity */}
        <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/90 p-5 shadow-xl">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">
            Max Recommended Mortgage Payment
          </span>
          <span className="text-2xl font-extrabold font-mono text-indigo-300">
            {formatCurrency(result.maxRecommendedMortgagePayment, currency)}/mo
          </span>
          <p className="mt-2 text-xs text-slate-400">
            Maximum housing payment under conventional 43% total debt benchmark.
          </p>
        </div>
      </div>
    </div>
  );
};
