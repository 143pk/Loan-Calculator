import React, { useState } from 'react';
import { Scale, CheckCircle, ArrowRight, TrendingUp } from 'lucide-react';
import { CurrencySymbol, LoanInputState } from '../types';
import { calculateLoan, formatCurrency } from '../utils/loanCalculations';

interface LoanComparisonToolProps {
  initialInput: LoanInputState;
  currency: CurrencySymbol;
}

export const LoanComparisonTool: React.FC<LoanComparisonToolProps> = ({
  initialInput,
  currency,
}) => {
  const [loanA, setLoanA] = useState<LoanInputState>({
    ...initialInput,
    amount: 300000,
    interestRate: 6.8,
    termYears: 30,
  });

  const [loanB, setLoanB] = useState<LoanInputState>({
    ...initialInput,
    amount: 300000,
    interestRate: 6.2,
    termYears: 15,
  });

  const resultA = calculateLoan(loanA);
  const resultB = calculateLoan(loanB);

  const monthlyDiff = Math.abs(resultA.monthlyPayment - resultB.monthlyPayment);
  const interestDiff = Math.abs(resultA.totalInterest - resultB.totalInterest);
  const totalCostDiff = Math.abs(resultA.totalCost - resultB.totalCost);

  const cheapestTotal =
    resultA.totalCost < resultB.totalCost
      ? 'Option A'
      : resultB.totalCost < resultA.totalCost
      ? 'Option B'
      : 'Equal';

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="rounded-2xl border border-sky-500/30 bg-slate-900/90 p-5 sm:p-6 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/20 text-sky-400">
            <Scale className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">
              Side-by-Side Loan Comparison Tool
            </h2>
            <p className="text-xs text-slate-300">
              Evaluate two lender offers or term lengths (e.g. 30-Year vs 15-Year mortgage) to find the best option.
            </p>
          </div>
        </div>

        {/* Comparison Inputs */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Loan A */}
          <div className="rounded-xl border border-sky-500/40 bg-slate-950/80 p-4">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
              <span className="text-sm font-bold text-sky-400">Loan Option A</span>
              {cheapestTotal === 'Option A' && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                  <CheckCircle className="h-3 w-3" /> Lowest Total Cost
                </span>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Loan Amount ({currency})
                </label>
                <input
                  type="number"
                  value={loanA.amount}
                  onChange={(e) =>
                    setLoanA({ ...loanA, amount: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={loanA.interestRate}
                    onChange={(e) =>
                      setLoanA({ ...loanA, interestRate: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Term (Years)
                  </label>
                  <input
                    type="number"
                    value={loanA.termYears}
                    onChange={(e) =>
                      setLoanA({ ...loanA, termYears: parseInt(e.target.value) || 0 })
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Loan B */}
          <div className="rounded-xl border border-indigo-500/40 bg-slate-950/80 p-4">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
              <span className="text-sm font-bold text-indigo-400">Loan Option B</span>
              {cheapestTotal === 'Option B' && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                  <CheckCircle className="h-3 w-3" /> Lowest Total Cost
                </span>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Loan Amount ({currency})
                </label>
                <input
                  type="number"
                  value={loanB.amount}
                  onChange={(e) =>
                    setLoanB({ ...loanB, amount: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={loanB.interestRate}
                    onChange={(e) =>
                      setLoanB({ ...loanB, interestRate: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Term (Years)
                  </label>
                  <input
                    type="number"
                    value={loanB.termYears}
                    onChange={(e) =>
                      setLoanB({ ...loanB, termYears: parseInt(e.target.value) || 0 })
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Results Cards */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Option A Summary */}
        <div className="rounded-2xl border border-sky-500/30 bg-slate-900/90 p-5 shadow-xl">
          <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider mb-3">
            Option A Results
          </h3>
          <div className="space-y-2.5 font-mono text-xs">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Monthly Payment:</span>
              <span className="font-bold text-white">
                {formatCurrency(resultA.monthlyPayment, currency)}
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Total Interest:</span>
              <span className="font-bold text-amber-400">
                {formatCurrency(resultA.totalInterest, currency)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Total Cost:</span>
              <span className="font-bold text-white">
                {formatCurrency(resultA.totalCost, currency)}
              </span>
            </div>
          </div>
        </div>

        {/* Option B Summary */}
        <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/90 p-5 shadow-xl">
          <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider mb-3">
            Option B Results
          </h3>
          <div className="space-y-2.5 font-mono text-xs">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Monthly Payment:</span>
              <span className="font-bold text-white">
                {formatCurrency(resultB.monthlyPayment, currency)}
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Total Interest:</span>
              <span className="font-bold text-amber-400">
                {formatCurrency(resultB.totalInterest, currency)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Total Cost:</span>
              <span className="font-bold text-white">
                {formatCurrency(resultB.totalCost, currency)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Difference Banner */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl text-xs font-mono text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-slate-400 block mb-1 font-sans font-semibold">
            Comparison Takeaway
          </span>
          <p className="text-sm font-bold text-white font-sans">
            {cheapestTotal === 'Equal'
              ? 'Both loan options have identical total repayment costs.'
              : `${cheapestTotal} saves ${formatCurrency(interestDiff, currency)} in total interest!`}
          </p>
        </div>

        <div className="flex gap-4 text-center">
          <div className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2">
            <span className="text-[10px] text-slate-400 uppercase block font-sans">
              Monthly Payment Diff
            </span>
            <span className="font-bold text-sky-400 text-sm">
              {formatCurrency(monthlyDiff, currency)}
            </span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2">
            <span className="text-[10px] text-slate-400 uppercase block font-sans">
              Total Interest Savings
            </span>
            <span className="font-bold text-emerald-400 text-sm">
              {formatCurrency(interestDiff, currency)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
