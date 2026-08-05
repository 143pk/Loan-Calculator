import React from 'react';
import { Calculator, Scale, Zap, RefreshCw, PieChart, Printer, DollarSign } from 'lucide-react';
import { CurrencySymbol } from '../types';
import { CURRENCIES } from '../utils/loanCalculations';

export type ActiveTab = 'calculator' | 'compare' | 'extrapayment' | 'refinance' | 'dti';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  currency: CurrencySymbol;
  setCurrency: (c: CurrencySymbol) => void;
  onPrint: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currency,
  setCurrency,
  onPrint,
}) => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Branding */}
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-500 shadow-md shadow-sky-500/20">
              <Calculator className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                Loan Calculator <span className="rounded-md bg-sky-500/10 px-2 py-0.5 text-xs font-semibold text-sky-400 border border-sky-500/20">PRO</span>
              </span>
              <p className="hidden text-xs text-slate-400 sm:block">
                Free Monthly Payment & Amortization Estimator
              </p>
            </div>
          </div>

          {/* Right Tools: Currency & Print */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Currency Selector */}
            <div className="flex items-center rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1.5 text-xs text-slate-300">
              <DollarSign className="mr-1 h-3.5 w-3.5 text-sky-400" />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencySymbol)}
                className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
                aria-label="Select Currency"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.symbol} className="bg-slate-900 text-white">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Print Button */}
            <button
              onClick={onPrint}
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
              title="Print Calculation Report"
              aria-label="Print Calculation Report"
            >
              <Printer className="h-3.5 w-3.5 text-slate-400" />
              <span className="hidden sm:inline">Print</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav aria-label="Calculator Modes" className="flex overflow-x-auto space-x-1 py-2 border-t border-slate-800/60 no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-medium transition-all ${
              activeTab === 'calculator'
                ? 'bg-sky-600 text-white shadow-sm shadow-sky-500/30'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <Calculator className="h-4 w-4" />
            Loan Payment & Amortization
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('extrapayment')}
            className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-medium transition-all ${
              activeTab === 'extrapayment'
                ? 'bg-sky-600 text-white shadow-sm shadow-sky-500/30'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <Zap className="h-4 w-4" />
            Extra Payment Payoff
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('compare')}
            className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-medium transition-all ${
              activeTab === 'compare'
                ? 'bg-sky-600 text-white shadow-sm shadow-sky-500/30'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <Scale className="h-4 w-4" />
            Compare 2 Loans
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('refinance')}
            className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-medium transition-all ${
              activeTab === 'refinance'
                ? 'bg-sky-600 text-white shadow-sm shadow-sky-500/30'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <RefreshCw className="h-4 w-4" />
            Refinance Calculator
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('dti')}
            className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-medium transition-all ${
              activeTab === 'dti'
                ? 'bg-sky-600 text-white shadow-sm shadow-sky-500/30'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <PieChart className="h-4 w-4" />
            Debt-to-Income (DTI)
          </button>
        </nav>
      </div>
    </header>
  );
};
