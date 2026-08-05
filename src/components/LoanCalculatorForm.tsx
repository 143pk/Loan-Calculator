import React from 'react';
import { DollarSign, Calendar, Percent, Clock, Sliders, Sparkles, PlusCircle } from 'lucide-react';
import { CurrencySymbol, LoanInputState, LoanType, PaymentFrequency } from '../types';

interface LoanCalculatorFormProps {
  input: LoanInputState;
  onChange: (input: LoanInputState) => void;
  currency: CurrencySymbol;
}

export const LoanCalculatorForm: React.FC<LoanCalculatorFormProps> = ({
  input,
  onChange,
  currency,
}) => {
  const handleNumberChange = (field: keyof LoanInputState, value: number) => {
    onChange({ ...input, [field]: isNaN(value) ? 0 : value });
  };

  const setPreset = (amount: number, rate: number, years: number, type: LoanType) => {
    onChange({
      ...input,
      amount,
      interestRate: rate,
      termYears: years,
      termMonths: 0,
      loanType: type,
    });
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Sliders className="h-5 w-5 text-sky-400" />
          Loan Parameters
        </h2>
        <span className="text-xs text-slate-400 font-mono">Real-time Calculation</span>
      </div>

      {/* Quick Presets */}
      <div className="mt-4">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
          Quick Preset Scenarios
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <button
            type="button"
            onClick={() => setPreset(20000, 7.5, 5, 'auto')}
            className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all ${
              input.amount === 20000 && input.termYears === 5
                ? 'border-sky-500 bg-sky-500/10 text-sky-300'
                : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
            }`}
          >
            🚗 {currency}20k Auto (5yr @ 7.5%)
          </button>
          <button
            type="button"
            onClick={() => setPreset(15000, 11.2, 3, 'personal')}
            className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all ${
              input.amount === 15000 && input.termYears === 3
                ? 'border-sky-500 bg-sky-500/10 text-sky-300'
                : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
            }`}
          >
            💳 {currency}15k Personal (3yr @ 11.2%)
          </button>
          <button
            type="button"
            onClick={() => setPreset(350000, 6.5, 30, 'mortgage')}
            className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all ${
              input.amount === 350000 && input.termYears === 30
                ? 'border-sky-500 bg-sky-500/10 text-sky-300'
                : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
            }`}
          >
            🏡 {currency}350k Home (30yr @ 6.5%)
          </button>
          <button
            type="button"
            onClick={() => setPreset(45000, 5.8, 10, 'student')}
            className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all ${
              input.amount === 45000 && input.termYears === 10
                ? 'border-sky-500 bg-sky-500/10 text-sky-300'
                : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
            }`}
          >
            🎓 {currency}45k Student (10yr @ 5.8%)
          </button>
        </div>
      </div>

      <div className="mt-5 space-y-5">
        {/* Loan Amount */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="loan-amount" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <DollarSign className="h-3.5 w-3.5 text-sky-400" />
              Loan Amount ({currency})
            </label>
            <span className="text-xs font-mono font-bold text-sky-400">
              {currency}{input.amount.toLocaleString(currency === '₹' ? 'en-IN' : 'en-US')}
            </span>
          </div>
          <div className="relative rounded-xl border border-slate-700/80 bg-slate-950 px-3 py-2 focus-within:border-sky-500">
            <input
              id="loan-amount"
              type="number"
              min="500"
              max="5000000"
              step="500"
              value={input.amount}
              onChange={(e) => handleNumberChange('amount', parseFloat(e.target.value))}
              className="w-full bg-transparent font-mono text-base font-bold text-white focus:outline-none"
            />
          </div>
          <input
            type="range"
            min="1000"
            max="1000000"
            step="1000"
            value={input.amount}
            onChange={(e) => handleNumberChange('amount', parseFloat(e.target.value))}
            className="mt-2 w-full h-1.5 accent-sky-500 bg-slate-800 rounded-lg cursor-pointer"
            aria-label="Loan Amount Slider"
          />
        </div>

        {/* Interest Rate & Term */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Interest Rate */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="interest-rate" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Percent className="h-3.5 w-3.5 text-sky-400" />
                Interest Rate (APR %)
              </label>
              <span className="text-xs font-mono font-bold text-sky-400">{input.interestRate}%</span>
            </div>
            <div className="relative rounded-xl border border-slate-700/80 bg-slate-950 px-3 py-2 focus-within:border-sky-500">
              <input
                id="interest-rate"
                type="number"
                min="0"
                max="35"
                step="0.05"
                value={input.interestRate}
                onChange={(e) => handleNumberChange('interestRate', parseFloat(e.target.value))}
                className="w-full bg-transparent font-mono text-base font-bold text-white focus:outline-none"
              />
            </div>
            <input
              type="range"
              min="0.1"
              max="25"
              step="0.1"
              value={input.interestRate}
              onChange={(e) => handleNumberChange('interestRate', parseFloat(e.target.value))}
              className="mt-2 w-full h-1.5 accent-sky-500 bg-slate-800 rounded-lg cursor-pointer"
              aria-label="Interest Rate Slider"
            />
          </div>

          {/* Loan Term */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="term-years" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-sky-400" />
                Loan Term (Years)
              </label>
              <span className="text-xs font-mono font-bold text-sky-400">{input.termYears} Years</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative rounded-xl border border-slate-700/80 bg-slate-950 px-3 py-2">
                <input
                  id="term-years"
                  type="number"
                  min="0"
                  max="40"
                  value={input.termYears}
                  onChange={(e) => handleNumberChange('termYears', parseInt(e.target.value) || 0)}
                  className="w-full bg-transparent font-mono text-sm font-bold text-white focus:outline-none"
                  placeholder="Years"
                />
                <span className="text-[10px] text-slate-400">Years</span>
              </div>
              <div className="relative rounded-xl border border-slate-700/80 bg-slate-950 px-3 py-2">
                <input
                  id="term-months"
                  type="number"
                  min="0"
                  max="11"
                  value={input.termMonths}
                  onChange={(e) => handleNumberChange('termMonths', parseInt(e.target.value) || 0)}
                  className="w-full bg-transparent font-mono text-sm font-bold text-white focus:outline-none"
                  placeholder="Months"
                />
                <span className="text-[10px] text-slate-400">Months</span>
              </div>
            </div>
            <div className="mt-2 flex gap-1.5">
              {[3, 5, 10, 15, 20, 30].map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => handleNumberChange('termYears', y)}
                  className={`flex-1 rounded-md text-[10px] font-semibold py-1 border transition-all ${
                    input.termYears === y
                      ? 'bg-sky-500 border-sky-400 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {y}y
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Start Date & Payment Frequency */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Payment Frequency */}
          <div>
            <label htmlFor="payment-frequency" className="text-xs font-semibold text-slate-300 block mb-1.5">
              Payment Schedule
            </label>
            <select
              id="payment-frequency"
              value={input.paymentFrequency}
              onChange={(e) =>
                onChange({ ...input, paymentFrequency: e.target.value as PaymentFrequency })
              }
              className="w-full rounded-xl border border-slate-700/80 bg-slate-950 px-3 py-2 text-xs font-semibold text-white focus:border-sky-500 focus:outline-none"
            >
              <option value="monthly">Monthly (12 payments/yr)</option>
              <option value="biweekly">Bi-weekly (26 payments/yr)</option>
              <option value="weekly">Weekly (52 payments/yr)</option>
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label htmlFor="start-date" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5">
              <Calendar className="h-3.5 w-3.5 text-sky-400" />
              First Payment Date
            </label>
            <input
              id="start-date"
              type="date"
              value={input.startDate}
              onChange={(e) => onChange({ ...input, startDate: e.target.value })}
              className="w-full rounded-xl border border-slate-700/80 bg-slate-950 px-3 py-2 text-xs font-mono text-white focus:border-sky-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Optional Extra Payments Expansion */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
          <div className="flex items-center gap-2 mb-3">
            <PlusCircle className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Optional Extra Payments (Early Payoff)
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="extra-monthly" className="text-[11px] font-semibold text-slate-300 block mb-1">
                Extra Monthly Payment ({currency})
              </label>
              <input
                id="extra-monthly"
                type="number"
                min="0"
                step="25"
                value={input.extraPaymentMonthly || 0}
                onChange={(e) => handleNumberChange('extraPaymentMonthly', parseFloat(e.target.value))}
                className="w-full rounded-lg border border-slate-700/80 bg-slate-900 px-3 py-1.5 font-mono text-xs text-white focus:border-emerald-500 focus:outline-none"
                placeholder="0"
              />
            </div>

            <div>
              <label htmlFor="extra-lump-sum" className="text-[11px] font-semibold text-slate-300 block mb-1">
                One-Time Lump Sum Payment ({currency})
              </label>
              <div className="flex gap-2">
                <input
                  id="extra-lump-sum"
                  type="number"
                  min="0"
                  step="500"
                  value={input.extraPaymentLumpSum || 0}
                  onChange={(e) => handleNumberChange('extraPaymentLumpSum', parseFloat(e.target.value))}
                  className="w-full rounded-lg border border-slate-700/80 bg-slate-900 px-3 py-1.5 font-mono text-xs text-white focus:border-emerald-500 focus:outline-none"
                  placeholder="0"
                />
                <input
                  type="number"
                  min="1"
                  max="480"
                  value={input.lumpSumMonth || 12}
                  onChange={(e) => handleNumberChange('lumpSumMonth', parseInt(e.target.value))}
                  className="w-20 rounded-lg border border-slate-700/80 bg-slate-900 px-2 py-1.5 font-mono text-xs text-white focus:border-emerald-500 focus:outline-none text-center"
                  title="Month #"
                  placeholder="Month #"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
