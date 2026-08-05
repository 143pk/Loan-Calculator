import React, { useState } from 'react';
import { Zap, DollarSign, Calendar, Sparkles, TrendingDown, ArrowRight } from 'lucide-react';
import { CurrencySymbol, LoanInputState } from '../types';
import { calculateLoan, formatCurrency } from '../utils/loanCalculations';

interface ExtraPaymentCalculatorProps {
  initialInput: LoanInputState;
  currency: CurrencySymbol;
}

export const ExtraPaymentCalculator: React.FC<ExtraPaymentCalculatorProps> = ({
  initialInput,
  currency,
}) => {
  const [amount, setAmount] = useState(initialInput.amount || 250000);
  const [rate, setRate] = useState(initialInput.interestRate || 6.5);
  const [years, setYears] = useState(initialInput.termYears || 30);
  const [extraMonthly, setExtraMonthly] = useState(200);
  const [lumpSum, setLumpSum] = useState(5000);
  const [lumpSumMonth, setLumpSumMonth] = useState(12);

  // Baseline without extra payment
  const baseInput: LoanInputState = {
    ...initialInput,
    amount,
    interestRate: rate,
    termYears: years,
    termMonths: 0,
    extraPaymentMonthly: 0,
    extraPaymentLumpSum: 0,
    lumpSumMonth: 0,
  };
  const baseResult = calculateLoan(baseInput);

  // Accelerated with extra payment
  const extraInput: LoanInputState = {
    ...initialInput,
    amount,
    interestRate: rate,
    termYears: years,
    termMonths: 0,
    extraPaymentMonthly: extraMonthly,
    extraPaymentLumpSum: lumpSum,
    lumpSumMonth: lumpSumMonth,
  };
  const acceleratedResult = calculateLoan(extraInput);

  const interestSavings = Math.max(0, baseResult.totalInterest - acceleratedResult.totalInterest);
  const monthsSaved = Math.max(
    0,
    baseResult.totalPaymentsCount - acceleratedResult.totalPaymentsCount
  );
  const yearsSaved = Math.floor(monthsSaved / 12);
  const remMonthsSaved = monthsSaved % 12;

  return (
    <div className="space-y-6">
      {/* Header Description */}
      <div className="rounded-2xl border border-sky-500/30 bg-slate-900/90 p-5 sm:p-6 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/20 text-sky-400">
            <Zap className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">
              Extra Payment & Early Payoff Calculator
            </h2>
            <p className="text-xs text-slate-300">
              Model how small extra monthly or lump-sum principal payments shave years off your loan and save thousands in interest.
            </p>
          </div>
        </div>

        {/* Input Parameters Grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Loan Balance ({currency})
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-sm text-white focus:border-sky-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Interest Rate (APR %)
            </label>
            <input
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-sm text-white focus:border-sky-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Term (Years)
            </label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(parseInt(e.target.value) || 0)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-sm text-white focus:border-sky-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Extra Contribution Strategy */}
        <div className="mt-5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
          <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Sparkles className="h-4 w-4" />
            Accelerated Payoff Strategy
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-slate-200 block mb-1">
                Extra Monthly Payment ({currency})
              </label>
              <input
                type="number"
                step="25"
                value={extraMonthly}
                onChange={(e) => setExtraMonthly(parseFloat(e.target.value) || 0)}
                className="w-full rounded-xl border border-emerald-600/50 bg-slate-950 px-3 py-2 font-mono text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-200 block mb-1">
                One-Time Extra Lump Sum ({currency}) & Month #
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="500"
                  value={lumpSum}
                  onChange={(e) => setLumpSum(parseFloat(e.target.value) || 0)}
                  className="w-full rounded-xl border border-emerald-600/50 bg-slate-950 px-3 py-2 font-mono text-sm text-white focus:border-emerald-500 focus:outline-none"
                  placeholder="Amount"
                />
                <input
                  type="number"
                  min="1"
                  max="360"
                  value={lumpSumMonth}
                  onChange={(e) => setLumpSumMonth(parseInt(e.target.value) || 1)}
                  className="w-24 rounded-xl border border-emerald-600/50 bg-slate-950 px-2 py-2 font-mono text-sm text-white text-center focus:border-emerald-500 focus:outline-none"
                  placeholder="Month #"
                  title="Month #"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Cards: Standard vs Accelerated */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Standard Schedule */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Standard Loan Schedule
          </span>
          <div className="mt-3 space-y-3 font-mono">
            <div className="flex justify-between text-xs border-b border-slate-800/80 pb-2">
              <span className="text-slate-400">Monthly Payment:</span>
              <span className="font-bold text-white">
                {formatCurrency(baseResult.monthlyPayment, currency)}
              </span>
            </div>
            <div className="flex justify-between text-xs border-b border-slate-800/80 pb-2">
              <span className="text-slate-400">Total Interest:</span>
              <span className="font-bold text-amber-400">
                {formatCurrency(baseResult.totalInterest, currency)}
              </span>
            </div>
            <div className="flex justify-between text-xs border-b border-slate-800/80 pb-2">
              <span className="text-slate-400">Total Repayment:</span>
              <span className="font-bold text-white">
                {formatCurrency(baseResult.totalCost, currency)}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Payoff Date:</span>
              <span className="font-bold text-slate-300">{baseResult.originalPayoffDate}</span>
            </div>
          </div>
        </div>

        {/* Accelerated Schedule */}
        <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950/60 to-slate-900 p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Accelerated Early Payoff
            </span>
            <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
              SAVINGS ACTIVE
            </span>
          </div>

          <div className="mt-3 space-y-3 font-mono">
            <div className="flex justify-between text-xs border-b border-emerald-900/50 pb-2">
              <span className="text-slate-300">New Monthly Total:</span>
              <span className="font-bold text-emerald-300">
                {formatCurrency(baseResult.monthlyPayment + extraMonthly, currency)}
              </span>
            </div>
            <div className="flex justify-between text-xs border-b border-emerald-900/50 pb-2">
              <span className="text-slate-300">New Total Interest:</span>
              <span className="font-bold text-emerald-300">
                {formatCurrency(acceleratedResult.totalInterest, currency)}
              </span>
            </div>
            <div className="flex justify-between text-xs border-b border-emerald-900/50 pb-2">
              <span className="text-slate-300">Interest Saved:</span>
              <span className="font-bold text-emerald-400 text-sm">
                {formatCurrency(interestSavings, currency)}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">New Payoff Date:</span>
              <span className="font-bold text-emerald-300">{acceleratedResult.payoffDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
