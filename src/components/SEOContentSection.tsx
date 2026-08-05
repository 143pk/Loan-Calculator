import React from 'react';
import { BookOpen, HelpCircle, ShieldCheck, CheckCircle2, ChevronRight, Calculator } from 'lucide-react';

export const SEOContentSection: React.FC = () => {
  return (
    <section className="mt-12 space-y-10 border-t border-slate-800/80 pt-10 text-slate-300">
      {/* Comprehensive Loan Guide */}
      <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md">
        <header className="mb-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-400 border border-sky-500/20 mb-3">
            <BookOpen className="h-3.5 w-3.5" /> Financial Education Guide
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            How to Use an Online Loan Calculator for Smart Financial Planning
          </h1>
          <p className="mt-2 text-sm text-slate-400 leading-relaxed">
            Whether you are purchasing a home, buying a new or used automobile, consolidating credit card debt, funding higher education, or refinancing existing high-interest loans, calculating your exact monthly debt commitments is vital for budget stability.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm leading-relaxed">
          <div className="space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-sky-400" />
              Understanding the Loan Amortization Formula
            </h2>
            <p>
              Standard installment loans utilize an amortized payment schedule where each equal monthly payment is divided into two distinct components: <strong className="text-slate-100">interest charges</strong> paid to the lender and <strong className="text-slate-100">principal reduction</strong> applied directly toward paying off the loan balance.
            </p>
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-sky-300">
              P = [ r * A ] / [ 1 - (1 + r)^(-n) ]
            </div>
            <p className="text-slate-400 text-xs">
              Where <strong>P</strong> is monthly payment, <strong>A</strong> is total principal loan amount, <strong>r</strong> is periodic interest rate (APR / 12), and <strong>n</strong> is total number of monthly payment periods.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-sky-400" />
              Impact of Making Extra Principal Payments
            </h2>
            <p>
              Because interest fees are computed on your remaining principal balance each compounding period, contributing even modest additional payments directly reduces future interest accumulation.
            </p>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Shorten Term Length:</strong> Extra payments shave months or years off your repayment timeline.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Save Thousands in Interest:</strong> Every dollar paid above your required minimum avoids future interest charges.</span>
              </li>
            </ul>
          </div>
        </div>
      </article>

      {/* Frequently Asked Questions (FAQ) */}
      <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md">
        <header className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
            <HelpCircle className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">
              Frequently Asked Questions (FAQ)
            </h2>
            <p className="text-xs text-slate-400">
              Answers to common loan calculation and debt planning questions
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-2">
            <h3 className="text-xs font-bold text-white">
              What is the difference between APR and Interest Rate?
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              The nominal interest rate is the percentage fee charged on borrowed principal. The <strong>Annual Percentage Rate (APR)</strong> reflects the true annual cost of borrowing, incorporating upfront lender origination fees, closing costs, and points.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-2">
            <h3 className="text-xs font-bold text-white">
              How do bi-weekly payments accelerate payoff?
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Switching to bi-weekly payments results in 26 half-payments per calendar year, which equals 13 full monthly payments instead of 12. This extra annual payment significantly accelerates principal reduction.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-2">
            <h3 className="text-xs font-bold text-white">
              What is a good Debt-to-Income (DTI) ratio?
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Lenders generally prefer a total back-end DTI ratio under <strong>36% to 43%</strong>. A lower DTI ratio signals strong financial capacity and improves mortgage approval odds.
            </p>
          </div>
        </div>
      </article>
    </section>
  );
};
