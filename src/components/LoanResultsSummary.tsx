import React from 'react';
import { DollarSign, Calendar, TrendingDown, Award, Download, CheckCircle2, AlertCircle } from 'lucide-react';
import { CurrencySymbol, LoanCalculationResult } from '../types';
import { formatCurrency, exportToCSV } from '../utils/loanCalculations';

interface LoanResultsSummaryProps {
  result: LoanCalculationResult;
  currency: CurrencySymbol;
  loanAmount: number;
}

export const LoanResultsSummary: React.FC<LoanResultsSummaryProps> = ({
  result,
  currency,
  loanAmount,
}) => {
  const {
    monthlyPayment,
    effectivePayment,
    totalInterest,
    totalCost,
    payoffDate,
    originalPayoffDate,
    interestSavedWithExtra,
    monthsSavedWithExtra,
    schedule,
    principalPercentage,
    interestPercentage,
  } = result;

  const yearsSaved = Math.floor(monthsSavedWithExtra / 12);
  const remainingMonthsSaved = monthsSavedWithExtra % 12;

  return (
    <div className="space-y-5">
      {/* Primary Payment Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Monthly Payment */}
        <div className="relative overflow-hidden rounded-2xl border border-sky-500/30 bg-gradient-to-br from-sky-950/80 to-slate-900 p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
              Monthly Payment
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-extrabold font-mono text-white tracking-tight sm:text-3xl">
              {formatCurrency(monthlyPayment, currency)}
            </span>
            <p className="mt-1 text-[11px] text-slate-400">
              Principal & Interest payment
            </p>
          </div>
        </div>

        {/* Total Interest */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Interest
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
              <TrendingDown className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-extrabold font-mono text-amber-400 tracking-tight sm:text-3xl">
              {formatCurrency(totalInterest, currency)}
            </span>
            <p className="mt-1 text-[11px] text-slate-400">
              {interestPercentage.toFixed(1)}% of total repayment
            </p>
          </div>
        </div>

        {/* Total Cost */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Repayment
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400">
              <Award className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-extrabold font-mono text-slate-100 tracking-tight sm:text-3xl">
              {formatCurrency(totalCost, currency)}
            </span>
            <p className="mt-1 text-[11px] text-slate-400">
              Principal + Total Interest
            </p>
          </div>
        </div>

        {/* Payoff Date */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Payoff Date
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
              <Calendar className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-extrabold font-mono text-emerald-400 tracking-tight sm:text-3xl">
              {payoffDate}
            </span>
            <p className="mt-1 text-[11px] text-slate-400">
              {monthsSavedWithExtra > 0 ? (
                <span className="text-emerald-400 font-semibold">
                  Original: {originalPayoffDate}
                </span>
              ) : (
                `Total ${schedule.length} payments`
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Extra Payment Savings Highlight Banner */}
      {interestSavedWithExtra > 0 && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Early Payoff Savings Unlocked!
              </h3>
              <p className="text-xs text-emerald-200/90 mt-0.5">
                By making extra payments, you save{' '}
                <strong className="text-emerald-300 font-mono">
                  {formatCurrency(interestSavedWithExtra, currency)}
                </strong>{' '}
                in interest and pay off your loan{' '}
                <strong className="text-emerald-300">
                  {yearsSaved > 0 ? `${yearsSaved} yr ` : ''}
                  {remainingMonthsSaved > 0 ? `${remainingMonthsSaved} mos` : ''}
                </strong>{' '}
                sooner!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Principal vs Interest Cost Breakdown Bar */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Repayment Cost Distribution
          </h3>
          <button
            type="button"
            onClick={() => exportToCSV(schedule)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs font-medium text-sky-400 hover:bg-slate-800 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            Export Schedule (CSV)
          </button>
        </div>

        {/* Stacked Progress Bar */}
        <div className="mt-3 overflow-hidden rounded-xl bg-slate-950 h-5 flex p-1 border border-slate-800">
          <div
            style={{ width: `${principalPercentage}%` }}
            className="bg-gradient-to-r from-sky-600 to-sky-400 h-full rounded-l-lg transition-all duration-500"
            title={`Principal: ${principalPercentage.toFixed(1)}%`}
          />
          <div
            style={{ width: `${interestPercentage}%` }}
            className="bg-gradient-to-r from-amber-500 to-amber-400 h-full rounded-r-lg transition-all duration-500"
            title={`Interest: ${interestPercentage.toFixed(1)}%`}
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-sky-500" />
            <span className="text-slate-300">Principal Loan Amount</span>
            <span className="font-mono text-white font-bold">
              {formatCurrency(loanAmount, currency)} ({principalPercentage.toFixed(1)}%)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-amber-500" />
            <span className="text-slate-300">Total Interest Paid</span>
            <span className="font-mono text-amber-400 font-bold">
              {formatCurrency(totalInterest, currency)} ({interestPercentage.toFixed(1)}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
